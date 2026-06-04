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

const comments_get = defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "\u672A\u767B\u5F55" });
  }
  const query = getQuery(event);
  const page = parseInt(query.page) || 1;
  const limit = Math.min(parseInt(query.limit) || 20, 100);
  const skip = (page - 1) * limit;
  const prisma = getPrisma();
  const [comments, total] = await Promise.all([
    prisma.comment.findMany({
      where: { userId: user.id },
      include: {
        app: { select: { name: true } }
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit
    }),
    prisma.comment.count({ where: { userId: user.id } })
  ]);
  return {
    err: "ok",
    data: {
      list: comments.map((c) => ({
        id: c.id,
        appName: c.app?.name || "",
        chapterName: c.chapterName,
        content: c.content,
        createdAt: c.createdAt
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    }
  };
});

export { comments_get as default };
//# sourceMappingURL=comments.get.mjs.map
