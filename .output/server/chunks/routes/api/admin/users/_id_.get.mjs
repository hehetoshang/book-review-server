import { d as defineEventHandler, c as createError, a as getPrisma } from '../../../../nitro/nitro.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650" });
  }
  const id = parseInt(event.context.params?.id);
  if (isNaN(id)) {
    throw createError({ statusCode: 400, statusMessage: "\u65E0\u6548\u7684\u7528\u6237ID" });
  }
  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      nickname: true,
      role: true,
      isActive: true,
      createdAt: true,
      updatedAt: true,
      accessTime: true
    }
  });
  if (!user) {
    throw createError({ statusCode: 404, statusMessage: "\u7528\u6237\u4E0D\u5B58\u5728" });
  }
  return {
    err: "ok",
    data: user
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
