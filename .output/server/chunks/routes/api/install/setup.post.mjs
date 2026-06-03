import { d as defineEventHandler, a as getPrisma, c as createError, r as readBody } from '../../../nitro/nitro.mjs';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
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

const setup_post = defineEventHandler(async (event) => {
  const prisma = getPrisma();
  const adminCount = await prisma.user.count({
    where: { role: "admin" }
  });
  if (adminCount > 0) {
    throw createError({ statusCode: 400, statusMessage: "\u7CFB\u7EDF\u5DF2\u5B89\u88C5\uFF0C\u65E0\u6CD5\u91CD\u590D\u5B89\u88C5" });
  }
  const body = await readBody(event);
  const { email, password, nickname, siteName } = body;
  if (!email || !password || !nickname) {
    throw createError({ statusCode: 400, statusMessage: "\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F" });
  }
  if (password.length < 6 || password.length > 50) {
    throw createError({ statusCode: 400, statusMessage: "\u5BC6\u7801\u957F\u5EA6\u9700\u57286-50\u4E2A\u5B57\u7B26\u4E4B\u95F4" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await prisma.user.create({
    data: {
      email: email.trim().toLowerCase(),
      nickname,
      password: hashedPassword,
      role: "admin",
      isActive: true
    }
  });
  const appId = `app_${crypto.randomBytes(8).toString("hex")}`;
  const secret = crypto.randomBytes(32).toString("hex");
  const app = await prisma.app.create({
    data: {
      appId,
      secret,
      name: siteName || "\u9ED8\u8BA4\u5E94\u7528",
      domains: "",
      isActive: true
    }
  });
  return {
    err: "ok",
    data: {
      admin: {
        id: admin.id,
        email: admin.email,
        nickname: admin.nickname
      },
      app: {
        appId: app.appId,
        name: app.name
      }
    }
  };
});

export { setup_post as default };
//# sourceMappingURL=setup.post.mjs.map
