import { spawnSync } from "node:child_process";
import { afterEach, describe, expect, it, vi } from "vitest";

vi.setConfig({ testTimeout: 15_000 });

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

function findPython(): string {
  const result = spawnSync("python", ["-c", "import sys; print(sys.executable)"], {
    encoding: "utf8",
    windowsHide: true,
  });
  expect(result.error).toBeUndefined();
  expect(result.status).toBe(0);
  const executable = result.stdout.trim().split(/\r?\n/)[0];
  expect(executable).not.toBe("");
  return executable;
}

function runPython(command: string): void {
  const result = spawnSync(command, ["-c", "import sys; raise SystemExit(0)"], {
    encoding: "utf8",
    windowsHide: true,
  });
  expect(result.error).toBeUndefined();
  expect(result.status).toBe(0);
}

describe.skipIf(process.platform !== "win32")("Windows Python command", () => {
  it("runs the default command with no override", async () => {
    delete process.env.YUI_PYTHON;
    const command = await loadPythonCommand();
    expect(command).toBe("python");
    runPython(command);
  });

  it("runs the explicit executable override", async () => {
    const executable = findPython();
    process.env.YUI_PYTHON = executable;
    const command = await loadPythonCommand();
    expect(command).toBe(executable);
    runPython(command);
  });
});
