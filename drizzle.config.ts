// drizzle.config.ts — 项目根目录
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  // D1 底层是 SQLite
  dialect: 'sqlite',

  // Schema 文件路径
  schema: './src/db/schema.ts',

  // 迁移 SQL 输出目录（必须和 wrangler.jsonc 的 migrations_dir 一致）
  out: './drizzle',

  // 推荐打开：每次生成迁移时严格校验
  strict: true,
  verbose: true,
});
