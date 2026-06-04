import { d as defineEventHandler, c as createError, a as getPrisma } from '../../../nitro/nitro.mjs';
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

const stats_get = defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650" });
  }
  const prisma = getPrisma();
  const today = /* @__PURE__ */ new Date();
  today.setHours(0, 0, 0, 0);
  const [appCount, commentCount, todayComments, userCount] = await Promise.all([
    prisma.app.count(),
    prisma.comment.count(),
    prisma.comment.count({ where: { createdAt: { gte: today } } }),
    prisma.user.count()
  ]);
  return {
    err: "ok",
    data: {
      appCount,
      commentCount,
      todayComments,
      userCount
    }
  };
});

export { stats_get as default };
//# sourceMappingURL=stats.get.mjs.map
