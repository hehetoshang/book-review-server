import { d as defineEventHandler, a as getPrisma } from '../../../nitro/nitro.mjs';
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

const status_get = defineEventHandler(async () => {
  const prisma = getPrisma();
  const adminCount = await prisma.user.count({
    where: { role: "admin" }
  });
  const appCount = await prisma.app.count();
  const isInstalled = adminCount > 0;
  return {
    err: "ok",
    data: {
      isInstalled,
      hasApps: appCount > 0
    }
  };
});

export { status_get as default };
//# sourceMappingURL=status.get.mjs.map
