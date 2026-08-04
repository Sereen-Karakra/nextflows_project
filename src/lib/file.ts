import fs from "node:fs/promises";
import path from "node:path";

const DATA_DIR = path.resolve(process.cwd(), "data");

export async function readDataFile(fileName: string): Promise<string> {
  const resolvedPath = path.resolve(DATA_DIR, fileName);

  if (!resolvedPath.startsWith(DATA_DIR)) {
    throw new Error("Access outside the data directory is not allowed.");
  }

  return fs.readFile(resolvedPath, "utf-8");
}