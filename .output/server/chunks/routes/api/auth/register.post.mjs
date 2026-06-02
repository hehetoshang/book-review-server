import { d as defineEventHandler, r as readBody, c as createError, a as getPrisma, h as sanitizeHtml } from '../../../nitro/nitro.mjs';
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

const register_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, password, nickname } = body;
  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: "\u90AE\u7BB1\u548C\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    throw createError({ statusCode: 400, statusMessage: "\u90AE\u7BB1\u683C\u5F0F\u4E0D\u6B63\u786E" });
  }
  if (password.length < 6 || password.length > 50) {
    throw createError({ statusCode: 400, statusMessage: "\u5BC6\u7801\u957F\u5EA6\u9700\u57286-50\u4E2A\u5B57\u7B26\u4E4B\u95F4" });
  }
  const prisma = getPrisma();
  const existing = await prisma.user.findUnique({ where: { email: email.trim().toLowerCase() } });
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: "\u8BE5\u90AE\u7BB1\u5DF2\u88AB\u6CE8\u518C" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email: email.trim().toLowerCase(),
      nickname: sanitizeHtml(nickname || email.split("@")[0]).slice(0, 50),
      password: hashedPassword,
      role: "user",
      isActive: true
    }
  });
  return {
    err: "ok",
    data: {
      id: user.id,
      email: user.email,
      nickname: user.nickname
    }
  };
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
