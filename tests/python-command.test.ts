import { afterEach, describe, expect, it, vi } from "vitest";

const originalPython = process.env.YUI_PYTHON;

afterEach(() => {
  if (originalPython === undefined) delete process.env.YUI_PYTHON;
  else process.env.YUI_PYTHON = originalPython;
});

async function loadPythonCommand(): Promise<string> {
  vi.resetModules();
  const { PYTHON } = await import("./command-paths");
  return PYTHON;
}

describe("Python command path", () => {
  it("uses the platform default without probing at import time", async () => {
    delete process.env.YUI_PYTHON;
    await expect(loadPythonCommand()).resolves.toBe(
      process.platform === "win32" ? "python" : "python3",
    );
  });

  it("uses the explicit override", async () => {
    process.env.YUI_PYTHON = "C:/Python/python.exe";
    await expect(loadPythonCommand()).resolves.toBe("C:/Python/python.exe");
  });
});
