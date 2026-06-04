import { d as defineEventHandler, c as createError, r as readBody, a as getPrisma } from '../../../nitro/nitro.mjs';
import crypto from 'crypto';
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

const apps_post = defineEventHandler(async (event) => {
  if (!event.context.user || event.context.user.role !== "admin") {
    throw createError({ statusCode: 403, statusMessage: "\u9700\u8981\u7BA1\u7406\u5458\u6743\u9650" });
  }
  const body = await readBody(event);
  const { name, domains } = body;
  if (!name || !name.trim()) {
    throw createError({ statusCode: 400, statusMessage: "\u5E94\u7528\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A" });
  }
  const prisma = getPrisma();
  const appId = `app_${crypto.randomBytes(12).toString("hex")}`;
  const secret = crypto.randomBytes(32).toString("hex");
  const app = await prisma.app.create({
    data: {
      appId,
      secret,
      name: name.trim(),
      domains: domains || "",
      isActive: true
    }
  });
  return {
    err: "ok",
    data: {
      id: app.id,
      appId: app.appId,
      secret: app.secret,
      name: app.name,
      domains: app.domains,
      isActive: app.isActive,
      createdAt: app.createdAt
    }
  };
});

export { apps_post as default };
//# sourceMappingURL=apps.post.mjs.map
