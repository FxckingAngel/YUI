import { describe, expect, it } from "vitest";

import { packageManagerCommand, quoteWindowsShellArg } from "../scripts/package-manager.mjs";

describe("package manager launcher", () => {
  it("uses a shell only on Windows", () => {
    expect(packageManagerCommand(["exec", "vite"], "win32")).toEqual({
      command: "pnpm",
      args: ['"exec"', '"vite"'],
      shell: true,
    });
    expect(packageManagerCommand(["exec", "vite"], "linux")).toEqual({
      command: "pnpm",
      args: ["exec", "vite"],
      shell: false,
    });
  });

  it("quotes Windows shell metacharacters without changing the value", () => {
    expect(quoteWindowsShellArg('a&b%c^d|e<f>g(h)"i')).toBe('"a^&b^%c^^d^|e^<f^>g^(h^)\\"i"');
  });
});
