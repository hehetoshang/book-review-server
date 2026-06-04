import { d as defineEventHandler, r as readBody, c as createError, a as getPrisma, v as verifyProxyToken, s as signToken, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import bcrypt from 'bcryptjs';
import 'unified';
import 'remark-parse';
import 'remark-rehype';
import 'remark-mdc';
import 'remark-gfm';
import 'rehype-external-links';
import 'rehype-sort-attribute-values';
import 'rehype-sort-attributes';
import 'rehype-raw';
import 'detab';
import 'micromark-util-sanitize-uri';
import 'hast-util-to-string';
import 'github-slugger';
import 'crypto';
import 'dompurify';
import 'jsdom';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'jsonwebtoken';
import '@prisma/client';

const proxyLogin_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { appId, proxyToken: token, externalId, externalEmail, externalNick } = body;
  if (!appId || !token || !externalId) {
    throw createError({ statusCode: 400, statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570" });
  }
  const prisma = getPrisma();
  const app = await prisma.app.findUnique({ where: { appId } });
  if (!app || !app.isActive) {
    throw createError({ statusCode: 401, statusMessage: "\u5E94\u7528\u4E0D\u5B58\u5728\u6216\u5DF2\u7981\u7528" });
  }
  const payload = verifyProxyToken(app.secret, token);
  if (!payload) {
    throw createError({ statusCode: 401, statusMessage: "\u4EE3\u7406\u4EE4\u724C\u65E0\u6548" });
  }
  const nonce = payload.nonce;
  if (!nonce) {
    throw createError({ statusCode: 400, statusMessage: "\u7F3A\u5C11nonce" });
  }
  const existingNonce = await prisma.nonce.findUnique({ where: { nonce } });
  if (existingNonce) {
    throw createError({ statusCode: 400, statusMessage: "nonce\u5DF2\u88AB\u4F7F\u7528" });
  }
  const config = useRuntimeConfig();
  await prisma.nonce.create({
    data: {
      appId: app.id,
      nonce,
      expiresAt: new Date(Date.now() + config.proxyTokenTtl * 1e3)
    }
  });
  let thirdPartyUser = await prisma.thirdPartyUser.findUnique({
    where: { appId_externalId: { appId: app.id, externalId } },
    include: { internalUser: true }
  });
  let user = thirdPartyUser?.internalUser;
  if (!user) {
    const randomPassword = await bcrypt.hash(Math.random().toString(36), 10);
    user = await prisma.user.create({
      data: {
        email: externalEmail || `${externalId}@proxy.${appId}.local`,
        nickname: externalNick || `User_${externalId}`,
        password: randomPassword,
        role: "user",
        isActive: true
      }
    });
    thirdPartyUser = await prisma.thirdPartyUser.create({
      data: {
        appId: app.id,
        externalId,
        externalEmail: externalEmail || null,
        externalNick: externalNick || null,
        internalUserId: user.id
      }
    });
  } else {
    await prisma.thirdPartyUser.update({
      where: { id: thirdPartyUser.id },
      data: { lastLoginAt: /* @__PURE__ */ new Date() }
    });
  }
  const jwt = signToken(
    { userId: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    config.jwtExpiresIn
  );
  return {
    err: "ok",
    data: {
      token: jwt,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        role: user.role
      }
    }
  };
});

export { proxyLogin_post as default };
//# sourceMappingURL=proxy-login.post.mjs.map
