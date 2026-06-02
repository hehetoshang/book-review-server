import { d as defineEventHandler, c as createError, r as readBody, h as sanitizeHtml, a as getPrisma, i as getRequestIP } from '../../../nitro/nitro.mjs';
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

const comments_post = defineEventHandler(async (event) => {
  const user = event.context.user;
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: "\u8BF7\u5148\u767B\u5F55" });
  }
  const body = await readBody(event);
  const { appId, bookId, chapterId, chapterName, segmentId, content, rootId, quoteId } = body;
  if (!appId || !chapterId || !content) {
    throw createError({ statusCode: 400, statusMessage: "\u7F3A\u5C11\u5FC5\u8981\u53C2\u6570" });
  }
  const sanitizedContent = sanitizeHtml(String(content)).slice(0, 1024);
  if (!sanitizedContent.trim()) {
    throw createError({ statusCode: 400, statusMessage: "\u8BC4\u8BBA\u5185\u5BB9\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const prisma = getPrisma();
  const app = await prisma.app.findUnique({ where: { appId } });
  if (!app || !app.isActive) {
    throw createError({ statusCode: 404, statusMessage: "\u5E94\u7528\u4E0D\u5B58\u5728\u6216\u5DF2\u7981\u7528" });
  }
  if (rootId) {
    const root = await prisma.comment.findUnique({ where: { id: parseInt(rootId) } });
    if (!root) {
      throw createError({ statusCode: 400, statusMessage: "\u6839\u8BC4\u8BBA\u4E0D\u5B58\u5728" });
    }
  }
  if (quoteId) {
    const quote = await prisma.comment.findUnique({ where: { id: parseInt(quoteId) } });
    if (!quote) {
      throw createError({ statusCode: 400, statusMessage: "\u5F15\u7528\u7684\u8BC4\u8BBA\u4E0D\u5B58\u5728" });
    }
  }
  let level = 1;
  if (rootId) {
    const rootComments = await prisma.comment.count({
      where: { appId: app.id, chapterId: parseInt(chapterId), rootId: parseInt(rootId) }
    });
    level = rootComments + 2;
  }
  const ip = getRequestIP(event, { xForwardedFor: true }) || "";
  const comment = await prisma.comment.create({
    data: {
      appId: app.id,
      bookId: parseInt(bookId) || 0,
      bookTitle: body.bookTitle || "",
      chapterId: parseInt(chapterId),
      chapterName: sanitizeHtml(String(chapterName || "")).slice(0, 255),
      segmentId: parseInt(segmentId) || 0,
      cfi: sanitizeHtml(String(body.cfi || "")).slice(0, 255),
      cfiBase: sanitizeHtml(String(body.cfiBase || "")).slice(0, 255),
      content: sanitizedContent,
      userId: user.id,
      rootId: rootId ? parseInt(rootId) : null,
      quoteId: quoteId ? parseInt(quoteId) : null,
      level,
      type: 1,
      geo: ip
    },
    include: {
      user: {
        select: { id: true, email: true, nickname: true, avatar: true }
      }
    }
  });
  return {
    err: "ok",
    data: {
      id: comment.id,
      bookId: comment.bookId,
      chapterId: comment.chapterId,
      chapterName: comment.chapterName,
      segmentId: comment.segmentId,
      content: comment.content,
      userId: comment.userId,
      nickname: comment.user.nickname,
      avatar: comment.user.avatar,
      rootId: comment.rootId,
      quoteId: comment.quoteId,
      level: comment.level,
      createdAt: comment.createdAt
    }
  };
});

export { comments_post as default };
//# sourceMappingURL=comments.post.mjs.map
