import { describe, expect, it } from "vitest";
import { packageManagerCommand } from "../scripts/process-command.mjs";

describe("package manager command", () => {
  it("uses the Windows shim on Windows", () => {
    expect(packageManagerCommand("win32")).toBe("pnpm.cmd");
  });

  it("uses the executable name on POSIX systems", () => {
    expect(packageManagerCommand("linux")).toBe("pnpm");
    expect(packageManagerCommand("darwin")).toBe("pnpm");
  });
});
