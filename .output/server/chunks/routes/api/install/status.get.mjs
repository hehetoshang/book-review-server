import { d as defineEventHandler, a as getPrisma } from '../../../nitro/nitro.mjs';
import fs from 'fs';
import path from 'path';
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

const SETUP_FLAG_FILE = path.resolve(".setup_complete");
const status_get = defineEventHandler(async () => {
  if (fs.existsSync(SETUP_FLAG_FILE)) {
    return {
      err: "ok",
      data: {
        isInstalled: true
      }
    };
  }
  try {
    const prisma = getPrisma();
    const adminCount = await prisma.user.count({
      where: { role: "admin" }
    });
    return {
      err: "ok",
      data: {
        isInstalled: adminCount > 0
      }
    };
  } catch {
    return {
      err: "ok",
      data: {
        isInstalled: false
      }
    };
  }
});

export { status_get as default };
//# sourceMappingURL=status.get.mjs.map
