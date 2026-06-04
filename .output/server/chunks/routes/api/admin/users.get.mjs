import { d as defineEventHandler, c as createError, g as getQuery, a as getPrisma } from '../../../nitro/nitro.mjs';
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

const users_get = defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650" });
  }
  const query = getQuery(event);
  const page = parseInt(query.page) || 1;
  const limit = Math.min(parseInt(query.limit) || 20, 100);
  const skip = (page - 1) * limit;
  const search = query.search;
  const prisma = getPrisma();
  const where = {};
  if (search) {
    where.OR = [
      { email: { contains: search } },
      { nickname: { contains: search } }
    ];
  }
  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
      select: {
        id: true,
        email: true,
        nickname: true,
        role: true,
        isActive: true,
        createdAt: true
      }
    }),
    prisma.user.count({ where })
  ]);
  return {
    err: "ok",
    data: {
      list: users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  };
});

export { users_get as default };
//# sourceMappingURL=users.get.mjs.map
