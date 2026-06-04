import { d as defineEventHandler, g as getQuery, c as createError, a as getPrisma } from '../../../nitro/nitro.mjs';
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
  const query = getQuery(event);
  const appId = query.appId;
  const chapterId = query.chapterId ? parseInt(query.chapterId, 10) : void 0;
  const bookId = query.bookId ? parseInt(query.bookId, 10) : void 0;
  const segmentId = query.segmentId ? parseInt(query.segmentId, 10) : void 0;
  const page = Math.max(1, parseInt(query.page, 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit, 10) || 20));
  if (!appId) {
    throw createError({ statusCode: 400, statusMessage: "\u7F3A\u5C11appId\u53C2\u6570" });
  }
  const prisma = getPrisma();
  const app = await prisma.app.findUnique({ where: { appId } });
  if (!app) {
    throw createError({ statusCode: 404, statusMessage: "\u5E94\u7528\u4E0D\u5B58\u5728" });
  }
  const where = { appId: app.id };
  if (chapterId !== void 0) where.chapterId = chapterId;
  if (bookId !== void 0) where.bookId = bookId;
  if (segmentId !== void 0) where.segmentId = segmentId;
  const total = await prisma.comment.count({ where });
  const comments = await prisma.comment.findMany({
    where,
    include: {
      user: {
        select: { id: true, email: true, nickname: true, avatar: true }
      }
    },
    orderBy: { createdAt: "desc" },
    skip: (page - 1) * limit,
    take: limit
  });
  return {
    err: "ok",
    data: {
      list: comments.map((c) => ({
        id: c.id,
        bookId: c.bookId,
        bookTitle: c.bookTitle,
        chapterId: c.chapterId,
        chapterName: c.chapterName,
        segmentId: c.segmentId,
        content: c.content,
        userId: c.userId,
        nickname: c.user.nickname,
        avatar: c.user.avatar,
        rootId: c.rootId,
        quoteId: c.quoteId,
        level: c.level,
        likeCount: c.likeCount,
        dislikeCount: c.dislikeCount,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt
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
