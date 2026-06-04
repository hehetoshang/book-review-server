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

const apps_get = defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650" });
  }
  const query = getQuery(event);
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 20));
  const search = query.search?.trim() || "";
  const prisma = getPrisma();
  const where = {};
  if (search) {
    where.OR = [
      { name: { contains: search } },
      { appId: { contains: search } }
    ];
  }
  const [apps, total] = await Promise.all([
    prisma.app.findMany({
      where,
      select: {
        id: true,
        appId: true,
        name: true,
        domains: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { comments: true } }
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.app.count({ where })
  ]);
  return {
    err: "ok",
    data: {
      list: apps,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    }
  };
});

export { apps_get as default };
//# sourceMappingURL=apps.get.mjs.map
