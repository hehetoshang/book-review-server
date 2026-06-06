import { d as defineEventHandler, c as createError, a as getPrisma, r as readBody } from '../../../nitro/nitro.mjs';
import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import bcrypt from 'bcryptjs';
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

const SETUP_FLAG_FILE = path.resolve(".setup_complete");
const ENV_FILE = path.resolve(".env");
const ENV_TEMPLATE = `# \u6570\u636E\u5E93\u914D\u7F6E
DATABASE_TYPE="sqlite"
DATABASE_URL="sqlite+aiosqlite:///./data/chapter_comments.db"

# JWT \u914D\u7F6E
JWT_SECRET="{jwt_secret}"
JWT_EXPIRES_IN="7d"

# \u670D\u52A1\u5668\u914D\u7F6E
NODE_ENV="production"
HOST="0.0.0.0"
PORT=8000

# CORS \u914D\u7F6E\uFF08\u591A\u4E2A\u57DF\u540D\u7528\u9017\u53F7\u5206\u9694\uFF09
CORS_ORIGINS="*"
`;
const setup_post = defineEventHandler(async (event) => {
  if (fs.existsSync(SETUP_FLAG_FILE)) {
    throw createError({ statusCode: 400, statusMessage: "\u7CFB\u7EDF\u5DF2\u5B89\u88C5\uFF0C\u65E0\u6CD5\u91CD\u590D\u5B89\u88C5" });
  }
  const prisma = getPrisma();
  let adminCount = 0;
  try {
    adminCount = await prisma.user.count({
      where: { role: "admin" }
    });
  } catch (e) {
  }
  if (adminCount > 0) {
    throw createError({ statusCode: 400, statusMessage: "\u7CFB\u7EDF\u5DF2\u5B89\u88C5\uFF0C\u65E0\u6CD5\u91CD\u590D\u5B89\u88C5" });
  }
  const body = await readBody(event);
  const { username, email, password, nickname, siteName, databaseType, databaseUrl } = body;
  if (!username || !email || !password || !nickname) {
    throw createError({ statusCode: 400, statusMessage: "\u8BF7\u586B\u5199\u5B8C\u6574\u4FE1\u606F" });
  }
  const usernameRegex = /^[a-zA-Z0-9_]{2,20}$/;
  if (!usernameRegex.test(username.trim())) {
    throw createError({ statusCode: 400, statusMessage: "\u7528\u6237\u540D\u53EA\u80FD\u5305\u542B\u5B57\u6BCD\u3001\u6570\u5B57\u548C\u4E0B\u5212\u7EBF\uFF0C\u957F\u5EA62-20\u4F4D" });
  }
  if (password.length < 6 || password.length > 50) {
    throw createError({ statusCode: 400, statusMessage: "\u5BC6\u7801\u957F\u5EA6\u9700\u57286-50\u4E2A\u5B57\u7B26\u4E4B\u95F4" });
  }
  const dbType = (databaseType || "sqlite").trim().toLowerCase();
  if (dbType !== "sqlite") {
    throw createError({ statusCode: 400, statusMessage: "\u5F53\u524D\u7248\u672C\u4EC5\u652F\u6301 SQLite \u6570\u636E\u5E93" });
  }
  try {
    const dataDir = path.resolve("data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    try {
      execSync("npx prisma db push --accept-data-loss", { stdio: "pipe" });
    } catch (err) {
      console.error("Prisma push error:", err.message);
      throw createError({ statusCode: 500, statusMessage: "\u521D\u59CB\u5316\u6570\u636E\u5E93\u8868\u7ED3\u6784\u5931\u8D25" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await prisma.user.create({
      data: {
        username: username.trim().toLowerCase(),
        email: email.trim().toLowerCase(),
        nickname,
        password: hashedPassword,
        role: "admin",
        isActive: true
      }
    });
    const appId = `app_${crypto.randomBytes(8).toString("hex")}`;
    const secret = crypto.randomBytes(32).toString("hex");
    const app = await prisma.app.create({
      data: {
        appId,
        secret,
        name: siteName || "\u9ED8\u8BA4\u5E94\u7528",
        domains: "",
        isActive: true
      }
    });
    const jwtSecret = crypto.randomBytes(32).toString("hex");
    const envContent = ENV_TEMPLATE.replace("{jwt_secret}", jwtSecret);
    fs.writeFileSync(ENV_FILE, envContent, "utf-8");
    fs.writeFileSync(SETUP_FLAG_FILE, "setup complete", "utf-8");
    return {
      err: "ok",
      data: {
        admin: {
          id: admin.id,
          email: admin.email,
          nickname: admin.nickname
        },
        app: {
          appId: app.appId,
          name: app.name
        }
      }
    };
  } catch (err) {
    if (fs.existsSync(SETUP_FLAG_FILE)) {
      fs.unlinkSync(SETUP_FLAG_FILE);
    }
    throw createError({ statusCode: 500, statusMessage: err.message || "\u5B89\u88C5\u5931\u8D25" });
  }
});

export { setup_post as default };
//# sourceMappingURL=setup.post.mjs.map
