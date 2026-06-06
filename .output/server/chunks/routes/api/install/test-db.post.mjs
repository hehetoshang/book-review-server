import { d as defineEventHandler, r as readBody, c as createError } from '../../../nitro/nitro.mjs';
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

const testDb_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { type, host, port, user, password, database } = body;
  const dbType = (type || "").trim().toLowerCase();
  if (dbType === "sqlite") {
    return {
      err: "ok",
      data: {
        message: "SQLite \u65E0\u9700\u6D4B\u8BD5\u8FDE\u63A5\uFF0C\u5C06\u81EA\u52A8\u521B\u5EFA"
      }
    };
  }
  if (dbType === "mysql" || dbType === "postgresql") {
    throw createError({
      statusCode: 400,
      statusMessage: "\u5F53\u524D\u7248\u672C\u4EC5\u652F\u6301 SQLite \u6570\u636E\u5E93\uFF0C\u65E0\u9700\u6D4B\u8BD5\u8FDE\u63A5"
    });
  }
  throw createError({
    statusCode: 400,
    statusMessage: "\u4E0D\u652F\u6301\u7684\u6570\u636E\u5E93\u7C7B\u578B"
  });
});

export { testDb_post as default };
//# sourceMappingURL=test-db.post.mjs.map
