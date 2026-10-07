import { existsSync } from "node:fs";
import { join } from "node:path";

const windowsBashCandidates = [
  process.env.YUI_BASH,
  process.env.GIT_BASH,
  process.env.ProgramFiles && join(process.env.ProgramFiles, "Git/bin/bash.exe"),
  process.env.ProgramW6432 && join(process.env.ProgramW6432, "Git/bin/bash.exe"),
  process.env.LocalAppData && join(process.env.LocalAppData, "Programs/Git/bin/bash.exe"),
  process.env.SCOOP && join(process.env.SCOOP, "apps/git/current/bin/bash.exe"),
  process.env.USERPROFILE && join(process.env.USERPROFILE, "scoop/apps/git/current/bin/bash.exe"),
].filter((path): path is string => path !== undefined);

export const BASH =
  process.platform !== "win32"
    ? "bash"
    : (windowsBashCandidates.find((path) => existsSync(path)) ?? "bash");
