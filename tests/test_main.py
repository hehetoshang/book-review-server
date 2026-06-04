#!/usr/bin/env python3
# -*- coding: UTF-8 -*-
"""FastAPI 后端完整测试用例

运行方式:
    cd backend && pytest ../tests/test_main.py -v
    cd backend && pytest ../tests/test_main.py -v -k test_auth
    cd backend && pytest ../tests/test_main.py -v -s  # 显示 print 输出
"""

import os
import sys
import time
import hmac
import hashlib
import pytest
import pytest_asyncio

# 确保 backend 目录在 sys.path 中
_backend_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backend")
sys.path.insert(0, _backend_dir)

# ============================================================
# 认证测试
# ============================================================


class TestAuth:
    """认证相关 API 测试"""

    @pytest.mark.asyncio
    async def test_register(self, client):
        """测试用户注册"""
        resp = await client.post(
            "/api/auth/register",
            json={
                "email": "newuser@test.com",
                "username": "newuser",
                "nickname": "新用户",
                "password": "password123",
            },
        )
        data = resp.json()
        assert resp.status_code == 200
        assert data["err"] == "ok"
        assert data["data"]["email"] == "newuser@test.com"
        assert data["data"]["username"] == "newuser"

    @pytest.mark.asyncio
    async def test_register_duplicate_email(self, client, normal_user):
        """测试注册重复邮箱"""
        resp = await client.post(
            "/api/auth/register",
            json={
                "email": "user@test.com",
                "username": "anotheruser",
                "nickname": "另一个用户",
                "password": "password123",
            },
        )
        data = resp.json()
        assert resp.status_code == 400
        assert "邮箱已注册" in data["message"]

    @pytest.mark.asyncio
    async def test_register_duplicate_username(self, client, normal_user):
        """测试注册重复用户名"""
        resp = await client.post(
            "/api/auth/register",
            json={
                "email": "another@test.com",
                "username": "testuser",
                "nickname": "另一个用户",
                "password": "password123",
            },
        )
        data = resp.json()
        assert resp.status_code == 400
        assert "用户名已存在" in data["message"]

    @pytest.mark.asyncio
    async def test_login_with_email(self, client, normal_user):
        """测试使用邮箱登录"""
        resp = await client.post(
            "/api/auth/login",
            json={"account": "user@test.com", "password": "user123"},
        )
        data = resp.json()
        assert resp.status_code == 200
        assert data["err"] == "ok"
        assert data["data"]["token"] is not None
        assert data["data"]["user"]["email"] == "user@test.com"
        assert data["data"]["user"]["username"] == "testuser"

    @pytest.mark.asyncio
    async def test_login_with_username(self, client, normal_user):
        """测试使用用户名登录"""
        resp = await client.post(
            "/api/auth/login",
            json={"account": "testuser", "password": "user123"},
        )
        data = resp.json()
        assert resp.status_code == 200
        assert data["err"] == "ok"
        assert data["data"]["user"]["username"] == "testuser"

    @pytest.mark.asyncio
    async def test_login_wrong_password(self, client, normal_user):
        """测试错误密码登录"""
        resp = await client.post(
            "/api/auth/login",
            json={"account": "user@test.com", "password": "wrongpassword"},
        )
        data = resp.json()
        assert resp.status_code == 401
        assert "账号或密码错误" in data["message"]

    @pytest.mark.asyncio
    async def test_login_nonexistent_user(self, client):
        """测试不存在的用户登录"""
        resp = await client.post(
            "/api/auth/login",
            json={"account": "nonexistent@test.com", "password": "password123"},
        )
        data = resp.json()
        assert resp.status_code == 401

    @pytest.mark.asyncio
    async def test_login_empty_fields(self, client):
        """测试空字段登录"""
        resp = await client.post("/api/auth/login", json={"account": "", "password": ""})
        assert resp.status_code == 400

    @pytest.mark.asyncio
    async def test_get_me(self, client, normal_user):
        """测试获取当前用户信息"""
        # 先登录获取 token
        login_resp = await client.post(
            "/api/auth/login",
            json={"account": "user@test.com", "password": "user123"},
        )
        token = login_resp.json()["data"]["token"]

        # 使用 token 获取用户信息
        resp = await client.get(
            "/api/auth/me", headers={"Authorization": f"Bearer {token}"}
        )
        data = resp.json()
        assert resp.status_code == 200
        assert data["data"]["email"] == "user@test.com"
        assert data["data"]["username"] == "testuser"

    @pytest.mark.asyncio
    async def test_get_me_unauthorized(self, client):
        """测试未登录时获取用户信息"""
        resp = await client.get("/api/auth/me")
        assert resp.status_code == 401

    @pytest.mark.asyncio
    async def test_change_password(self, client, normal_user):
        """测试修改密码"""
        # 先登录
        login_resp = await client.post(
            "/api/auth/login",
            json={"account": "user@test.com", "password": "user123"},
        )
        token = login_resp.json()["data"]["token"]

        # 修改密码
        resp = await client.put(
            "/api/auth/password",
            json={"oldPassword": "user123", "newPassword": "newpass456"},
            headers={"Authorization": f"Bearer {token}"},
        )
        data = resp.json()
        assert resp.status_code == 200
        assert data["err"] == "ok"

        # 用新密码登录
        login_resp2 = await client.post(
            "/api/auth/login",
            json={"account": "user@test.com", "password": "newpass456"},
        )
        assert login_resp2.status_code == 200

    @pytest.mark.asyncio
    async def test_logout(self, client):
        """测试登出"""
        resp = await client.post("/api/auth/logout")
        assert resp.status_code == 200


# ============================================================
# 安装向导测试
# ============================================================


class TestInstall:
    """系统安装向导测试"""

    @pytest.mark.asyncio
    async def test_setup(self, client):
        """测试系统初始化"""
        resp = await client.post(
            "/api/install/setup",
            json={
                "email": "admin@setup.com",
                "username": "setupadmin",
                "nickname": "安装管理员",
                "password": "setup123",
            },
        )
        data = resp.json()
        assert resp.status_code == 200
        assert data["err"] == "ok"
        assert "admin_id" in data["data"]

    @pytest.mark.asyncio
    async def test_setup_already_done(self, client):
        """测试重复初始化 - 由于数据库清理，我们先创建一个管理员然后测试"""
        # 先创建管理员（模拟已初始化状态）
        await client.post(
            "/api/install/setup",
            json={
                "email": "admin@setup2.com",
                "username": "setupadmin2",
                "nickname": "另一个管理员",
                "password": "setup123",
            },
        )
        # 再次尝试初始化
        resp = await client.post(
            "/api/install/setup",
            json={
                "email": "admin3@setup.com",
                "username": "setupadmin3",
                "nickname": "第三个管理员",
                "password": "setup123",
            },
        )
        data = resp.json()
        assert resp.status_code == 400
        assert "已初始化" in data["message"]

    @pytest.mark.asyncio
    async def test_setup_status(self, client):
        """测试查询安装状态"""
        resp = await client.get("/api/install/status")
        data = resp.json()
        assert resp.status_code == 200
        assert "is_setup" in data["data"]


# ============================================================
# 管理后台测试
# ============================================================


class TestAdmin:
    """管理后台 API 测试"""

    @pytest.mark.asyncio
    async def _get_admin_token(self, client, admin_user):
        """获取管理员 token"""
        resp = await client.post(
            "/api/auth/login",
            json={"account": "admin@test.com", "password": "admin123"},
        )
        return resp.json()["data"]["token"]

    @pytest.mark.asyncio
    async def test_admin_stats(self, client, admin_user):
        """测试管理后台统计信息"""
        token = await self._get_admin_token(client, admin_user)
        resp = await client.get(
            "/api/admin/stats", headers={"Authorization": f"Bearer {token}"}
        )
        data = resp.json()
        assert resp.status_code == 200
        assert "appCount" in data["data"]
        assert "commentCount" in data["data"]
        assert "userCount" in data["data"]

    @pytest.mark.asyncio
    async def test_admin_stats_forbidden(self, client, normal_user):
        """测试普通用户访问管理后台被禁止"""
        # 普通用户登录
        resp = await client.post(
            "/api/auth/login",
            json={"account": "user@test.com", "password": "user123"},
        )
        token = resp.json()["data"]["token"]

        resp = await client.get(
            "/api/admin/stats", headers={"Authorization": f"Bearer {token}"}
        )
        assert resp.status_code == 403

    @pytest.mark.asyncio
    async def test_create_app(self, client, admin_user):
        """测试创建应用"""
        token = await self._get_admin_token(client, admin_user)
        resp = await client.post(
            "/api/admin/apps",
            json={"name": "测试应用", "domains": "localhost"},
            headers={"Authorization": f"Bearer {token}"},
        )
        data = resp.json()
        assert resp.status_code == 200
        assert data["err"] == "ok"
        assert data["data"]["name"] == "测试应用"
        assert "appId" in data["data"]
        assert "secret" in data["data"]

    @pytest.mark.asyncio
    async def test_get_apps(self, client, admin_user):
        """测试获取应用列表"""
        token = await self._get_admin_token(client, admin_user)

        # 先创建一个应用
        await client.post(
            "/api/admin/apps",
            json={"name": "应用1", "domains": "localhost"},
            headers={"Authorization": f"Bearer {token}"},
        )

        resp = await client.get(
            "/api/admin/apps", headers={"Authorization": f"Bearer {token}"}
        )
        data = resp.json()
        assert resp.status_code == 200
        assert "list" in data["data"]
        assert "pagination" in data["data"]
        assert isinstance(data["data"]["list"], list)

    @pytest.mark.asyncio
    async def test_get_users(self, client, admin_user):
        """测试获取用户列表"""
        token = await self._get_admin_token(client, admin_user)
        resp = await client.get(
            "/api/admin/users", headers={"Authorization": f"Bearer {token}"}
        )
        data = resp.json()
        assert resp.status_code == 200
        assert "list" in data["data"]
        assert "pagination" in data["data"]

    @pytest.mark.asyncio
    async def test_update_user(self, client, admin_user, normal_user):
        """测试更新用户信息"""
        token = await self._get_admin_token(client, admin_user)
        resp = await client.put(
            f"/api/admin/users/{normal_user['id']}",
            json={"nickname": "更新后的昵称", "role": "user"},
            headers={"Authorization": f"Bearer {token}"},
        )
        data = resp.json()
        assert resp.status_code == 200
        assert data["data"]["nickname"] == "更新后的昵称"

    @pytest.mark.asyncio
    async def test_delete_comment(self, client, admin_user, test_app, normal_user):
        """测试删除评论"""
        from app.utils.jwt import create_access_token

        token = await self._get_admin_token(client, admin_user)

        # 先创建一条评论
        user_token = create_access_token(
            data={"userId": normal_user["id"], "email": normal_user["email"], "role": "user"}
        )
        await client.post(
            "/api/platform/comments",
            json={
                "appId": test_app["app_id"],
                "token": user_token,
                "bookId": 1,
                "chapterId": 1,
                "content": "这是一条测试评论",
            },
        )

        # 获取评论列表
        resp = await client.get(
            "/api/admin/comments", headers={"Authorization": f"Bearer {token}"}
        )
        comments = resp.json()["data"]["list"]
        assert len(comments) > 0

        # 删除评论
        comment_id = comments[0]["id"]
        resp = await client.delete(
            f"/api/admin/comments/{comment_id}",
            headers={"Authorization": f"Bearer {token}"},
        )
        data = resp.json()
        assert resp.status_code == 200
        assert data["err"] == "ok"


# ============================================================
# 开放平台测试
# ============================================================


class TestPlatform:
    """开放平台 API 测试"""

    @pytest.mark.asyncio
    async def test_get_comments_empty(self, client, test_app):
        """测试获取评论列表（空）"""
        resp = await client.get(
            "/api/platform/comments",
            params={"appId": test_app["app_id"], "bookId": 1},
        )
        data = resp.json()
        assert resp.status_code == 200
        assert data["err"] == "ok"
        assert data["data"]["list"] == []
        assert data["data"]["pagination"]["total"] == 0

    @pytest.mark.asyncio
    async def test_get_comments_nonexistent_app(self, client):
        """测试获取不存在应用的评论"""
        resp = await client.get(
            "/api/platform/comments",
            params={"appId": "nonexistent_app", "bookId": 1},
        )
        assert resp.status_code == 404

    @pytest.mark.asyncio
    async def test_create_comment(self, client, test_app, normal_user):
        """测试创建评论"""
        from app.utils.jwt import create_access_token

        user_token = create_access_token(
            data={"userId": normal_user["id"], "email": normal_user["email"], "role": "user"}
        )

        resp = await client.post(
            "/api/platform/comments",
            json={
                "appId": test_app["app_id"],
                "token": user_token,
                "bookId": 1,
                "chapterId": 1,
                "segmentId": 1,
                "cfi": "/6/4[chap01ref]!/4/2/1:0",
                "cfiBase": "/6/4[chap01ref]!/4/2",
                "content": "这是一条测试评论",
                "type": 1,
                "level": 0,
            },
        )
        data = resp.json()
        assert resp.status_code == 200
        assert data["err"] == "ok"
        assert data["data"]["content"] == "这是一条测试评论"

    @pytest.mark.asyncio
    async def test_create_comment_invalid_token(self, client, test_app):
        """测试使用无效 token 创建评论"""
        resp = await client.post(
            "/api/platform/comments",
            json={
                "appId": test_app["app_id"],
                "token": "invalid_token_string",
                "bookId": 1,
                "chapterId": 1,
                "content": "无效 token 评论",
            },
        )
        assert resp.status_code == 401

    @pytest.mark.asyncio
    async def test_create_comment_missing_fields(self, client, test_app):
        """测试创建评论缺少必填字段"""
        resp = await client.post(
            "/api/platform/comments",
            json={
                "appId": test_app["app_id"],
                "token": "some_token",
                # 缺少 content
            },
        )
        assert resp.status_code == 400

    @pytest.mark.asyncio
    async def test_create_and_query_comments(self, client, test_app, normal_user):
        """测试创建评论后查询"""
        from app.utils.jwt import create_access_token

        user_token = create_access_token(
            data={"userId": normal_user["id"], "email": normal_user["email"], "role": "user"}
        )

        # 创建 3 条评论
        for i in range(3):
            await client.post(
                "/api/platform/comments",
                json={
                    "appId": test_app["app_id"],
                    "token": user_token,
                    "bookId": 1,
                    "chapterId": 1,
                    "content": f"测试评论 {i+1}",
                },
            )

        # 查询评论
        resp = await client.get(
            "/api/platform/comments",
            params={"appId": test_app["app_id"], "bookId": 1},
        )
        data = resp.json()
        assert resp.status_code == 200
        assert len(data["data"]["list"]) >= 3
        assert data["data"]["pagination"]["total"] >= 3

    @pytest.mark.asyncio
    async def test_proxy_login(self, client, test_app):
        """测试第三方代理登录"""
        app_id = test_app["app_id"]
        secret = test_app["secret"]
        external_id = "external_user_001"
        timestamp = str(int(time.time()))
        nonce = "test_nonce_12345"

        # 生成 HMAC 签名（与 proxy_auth.py 中的 verify_proxy_signature 一致）
        message = f"{app_id}{timestamp}{nonce}"
        signature = hmac.new(
            secret.encode(), message.encode(), hashlib.sha256
        ).hexdigest()

        resp = await client.post(
            "/api/platform/proxy-login",
            json={
                "appId": app_id,
                "externalId": external_id,
                "externalEmail": "external@example.com",
                "externalNick": "外部用户",
                "timestamp": timestamp,
                "nonce": nonce,
                "signature": signature,
            },
        )
        data = resp.json()
        assert resp.status_code == 200
        assert data["err"] == "ok"
        assert "token" in data["data"]
        assert data["data"]["user"]["username"] == external_id.lower()

    @pytest.mark.asyncio
    async def test_proxy_login_invalid_signature(self, client, test_app):
        """测试代理登录签名验证失败"""
        resp = await client.post(
            "/api/platform/proxy-login",
            json={
                "appId": test_app["app_id"],
                "externalId": "external_user_002",
                "externalEmail": "external2@example.com",
                "externalNick": "恶意用户",
                "timestamp": str(int(time.time())),
                "nonce": "bad_nonce",
                "signature": "invalid_signature",
            },
        )
        assert resp.status_code == 401

    @pytest.mark.asyncio
    async def test_proxy_login_expired_timestamp(self, client, test_app):
        """测试代理登录时间戳过期"""
        app_id = test_app["app_id"]
        secret = test_app["secret"]
        old_timestamp = str(int(time.time()) - 600)  # 10 分钟前
        nonce = "old_nonce"

        message = f"{app_id}{old_timestamp}{nonce}"
        signature = hmac.new(
            secret.encode(), message.encode(), hashlib.sha256
        ).hexdigest()

        resp = await client.post(
            "/api/platform/proxy-login",
            json={
                "appId": app_id,
                "externalId": "external_user_003",
                "externalEmail": "expired@example.com",
                "externalNick": "过期用户",
                "timestamp": old_timestamp,
                "nonce": nonce,
                "signature": signature,
            },
        )
        assert resp.status_code == 401

    @pytest.mark.asyncio
    async def test_proxy_login_repeated(self, client, test_app):
        """测试代理登录重复用户（应返回已有用户）"""
        app_id = test_app["app_id"]
        secret = test_app["secret"]
        external_id = "external_user_001"  # 与之前创建的用户相同
        timestamp = str(int(time.time()))
        nonce = "repeat_nonce"

        message = f"{app_id}{timestamp}{nonce}"
        signature = hmac.new(
            secret.encode(), message.encode(), hashlib.sha256
        ).hexdigest()

        resp = await client.post(
            "/api/platform/proxy-login",
            json={
                "appId": app_id,
                "externalId": external_id,
                "externalEmail": "external@example.com",
                "externalNick": "外部用户",
                "timestamp": timestamp,
                "nonce": nonce,
                "signature": signature,
            },
        )
        data = resp.json()
        assert resp.status_code == 200
        assert data["err"] == "ok"


# ============================================================
# 用户 API 测试
# ============================================================


class TestUser:
    """用户 API 测试"""

    @pytest.mark.asyncio
    async def test_get_my_comments_empty(self, client, normal_user):
        """测试获取我的评论列表（空）"""
        # 先登录
        resp = await client.post(
            "/api/auth/login",
            json={"account": "user@test.com", "password": "user123"},
        )
        token = resp.json()["data"]["token"]

        resp = await client.get(
            "/api/user/comments", headers={"Authorization": f"Bearer {token}"}
        )
        data = resp.json()
        assert resp.status_code == 200
        assert data["data"]["list"] == []
        assert data["data"]["pagination"]["total"] == 0

    @pytest.mark.asyncio
    async def test_get_my_comments(self, client, normal_user, test_app):
        """测试获取我的评论列表"""
        from app.utils.jwt import create_access_token

        # 先登录
        resp = await client.post(
            "/api/auth/login",
            json={"account": "user@test.com", "password": "user123"},
        )
        token = resp.json()["data"]["token"]

        # 创建评论
        user_token = create_access_token(
            data={"userId": normal_user["id"], "email": normal_user["email"], "role": "user"}
        )
        await client.post(
            "/api/platform/comments",
            json={
                "appId": test_app["app_id"],
                "token": user_token,
                "bookId": 1,
                "chapterId": 1,
                "content": "我的测试评论",
            },
        )

        # 获取评论列表
        resp = await client.get(
            "/api/user/comments", headers={"Authorization": f"Bearer {token}"}
        )
        data = resp.json()
        assert resp.status_code == 200
        assert len(data["data"]["list"]) >= 1
        assert data["data"]["pagination"]["total"] >= 1
        assert "totalPages" in data["data"]["pagination"]
