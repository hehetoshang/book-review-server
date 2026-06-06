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
  if (!event.context.user || event.context.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650" });
  }
  const query = getQuery(event);
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 20));
  const appId = query.appId;
  const chapterId = query.chapterId ? parseInt(query.chapterId, 10) : void 0;
  const search = query.search?.trim() || "";
  const prisma = getPrisma();
  const where = {};
  if (appId) {
    const app = await prisma.app.findUnique({ where: { appId } });
    if (app) {
      where.appId = app.id;
    }
  }
  if (chapterId !== void 0) where.chapterId = chapterId;
  if (search) {
    where.content = { contains: search };
  }
  const [comments, total] = await Promise.all([
    prisma.comment.findMany({
      where,
      include: {
        user: { select: { id: true, email: true, nickname: true } },
        app: { select: { id: true, appId: true, name: true } }
      },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.comment.count({ where })
  ]);
  return {
    err: "ok",
    data: {
      list: comments.map((c) => ({
        id: c.id,
        appId: c.app.appId,
        appName: c.app.name,
        bookId: c.bookId,
        bookTitle: c.bookTitle,
        chapterId: c.chapterId,
        chapterName: c.chapterName,
        segmentId: c.segmentId,
        content: c.content,
        userId: c.userId,
        nickname: c.user.nickname,
        level: c.level,
        createdAt: c.createdAt
      })),
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) }
    }
  };
});

export { comments_get as default };
//# sourceMappingURL=comments.get.mjs.map
