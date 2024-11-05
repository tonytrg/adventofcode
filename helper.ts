import { fileURLToPath } from "url";
import { dirname } from "path";

// Get current file's directory
export function getRelativePath(importMetaUrl: string): string {
  const __filename = fileURLToPath(importMetaUrl);
  const __dirname = dirname(__filename);
  return __dirname;
}
