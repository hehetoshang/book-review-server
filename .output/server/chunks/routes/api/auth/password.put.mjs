import { d as defineEventHandler, c as createError, r as readBody, a as getPrisma } from '../../../nitro/nitro.mjs';
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

const password_put = defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "\u672A\u767B\u5F55" });
  }
  const body = await readBody(event);
  const { currentPassword, newPassword } = body;
  if (!currentPassword || !newPassword) {
    throw createError({ statusCode: 400, statusMessage: "\u5F53\u524D\u5BC6\u7801\u548C\u65B0\u5BC6\u7801\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  if (newPassword.length < 6 || newPassword.length > 50) {
    throw createError({ statusCode: 400, statusMessage: "\u5BC6\u7801\u957F\u5EA6\u9700\u57286-50\u4E2A\u5B57\u7B26\u4E4B\u95F4" });
  }
  const prisma = getPrisma();
  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser) {
    throw createError({ statusCode: 404, statusMessage: "\u7528\u6237\u4E0D\u5B58\u5728" });
  }
  const valid = await bcrypt.compare(currentPassword, dbUser.password);
  if (!valid) {
    throw createError({ statusCode: 400, statusMessage: "\u5F53\u524D\u5BC6\u7801\u9519\u8BEF" });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({
    where: { id: user.id },
    data: { password: hashedPassword }
  });
  return { err: "ok", msg: "\u5BC6\u7801\u4FEE\u6539\u6210\u529F" };
});

export { password_put as default };
//# sourceMappingURL=password.put.mjs.map
