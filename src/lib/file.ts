import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const PROJECT_ROOT = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

const DATA_DIR = path.resolve(PROJECT_ROOT, "data");

export async function readDataFile(fileName: string): Promise<string> {
  const resolvedPath = path.resolve(DATA_DIR, fileName);
  const relativePath = path.relative(DATA_DIR, resolvedPath);

  if (relativePath.startsWith("..") || path.isAbsolute(relativePath)) {
    throw new Error("Access outside the data directory is not allowed.");
  }

  return fs.readFile(resolvedPath, "utf-8");
}

export { DATA_DIR };