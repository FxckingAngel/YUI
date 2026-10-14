import { join } from "node:path";

export const BASH =
  process.platform !== "win32"
    ? "bash"
    : (process.env.YUI_BASH ??
      join(process.env.ProgramFiles ?? "C:/Program Files", "Git/bin/bash.exe"));

export const PYTHON =
  process.env.YUI_PYTHON ?? (process.platform !== "win32" ? "python3" : "python");
