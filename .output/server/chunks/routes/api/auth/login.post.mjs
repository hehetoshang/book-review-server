import { d as defineEventHandler, r as readBody, c as createError, a as getPrisma, s as signToken, e as setCookie, u as useRuntimeConfig } from '../../../nitro/nitro.mjs';
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

const login_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { account, password } = body;
  if (!account || !password) {
    throw createError({ statusCode: 400, statusMessage: "\u8D26\u53F7\u548C\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const prisma = getPrisma();
  let user = null;
  if (account.includes("@")) {
    user = await prisma.user.findUnique({ where: { email: account.trim().toLowerCase() } });
  } else {
    user = await prisma.user.findUnique({ where: { username: account.trim().toLowerCase() } });
  }
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "\u8D26\u53F7\u6216\u5BC6\u7801\u9519\u8BEF" });
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw createError({ statusCode: 401, statusMessage: "\u8D26\u53F7\u6216\u5BC6\u7801\u9519\u8BEF" });
  }
  if (!user.isActive) {
    throw createError({ statusCode: 403, statusMessage: "\u8D26\u6237\u5DF2\u88AB\u7981\u7528" });
  }
  await prisma.user.update({
    where: { id: user.id },
    data: { accessTime: /* @__PURE__ */ new Date() }
  });
  const config = useRuntimeConfig();
  const token = signToken(
    { userId: user.id, email: user.email, role: user.role },
    config.jwtSecret,
    config.jwtExpiresIn
  );
  setCookie(event, "auth_token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60
  });
  return {
    err: "ok",
    data: {
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        nickname: user.nickname,
        role: user.role,
        avatar: user.avatar
      }
    }
  };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
