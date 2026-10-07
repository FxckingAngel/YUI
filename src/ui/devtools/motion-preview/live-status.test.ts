// @vitest-environment jsdom

import { afterEach, describe, expect, it, vi } from "vitest";
import type { MotionRegistry } from "../../../contract";
import { createLiveStatus } from "./live-status";
import type { MotionPreviewView } from "./view";

function viewFixture(): MotionPreviewView {
  const mount = document.createElement("div");
  mount.innerHTML = '<div id="idle-sub-line"></div>';
  const span = () => document.createElement("span");
  return {
    mount,
    vrmMount: document.createElement("div"),
    registryList: document.createElement("div"),
    cbLoop: document.createElement("input"),
    slSpeed: document.createElement("input"),
    slFade: document.createElement("input"),
    selCrossfade: document.createElement("select"),
    btnPlay: document.createElement("button"),
    btnStop: document.createElement("button"),
    btnIdle: document.createElement("button"),
    statusNow: span(),
    statusKind: span(),
    statusPriority: span(),
    statusElapsed: span(),
    statusFps: span(),
    viewportStatus: span(),
    emotionList: document.createElement("div"),
    slIntensity: document.createElement("input"),
    slTransition: document.createElement("input"),
    btnNeutral: document.createElement("button"),
    btnHold: document.createElement("button"),
    initialFpsLast: 0,
  };
}

describe("createLiveStatus", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("renders a variant filename as text", () => {
    const view = viewFixture();
    let frame: (() => void) | undefined;
    vi.stubGlobal("requestAnimationFrame", (callback: () => void) => {
      frame = callback;
      return 1;
    });
    vi.stubGlobal("cancelAnimationFrame", vi.fn());

    const registry = {
      idle: {
        vrma_path: "/motions/idle.vrma",
        variants: ["/motions/<img src=x onerror=alert(1)>.vrma", "/motions/idle_02.vrma"],
        kind: "ambient",
        loop: true,
        priority: 10,
        interrupt_policy: "replace",
      },
    } satisfies MotionRegistry;
    const current = {
      id: "idle",
      vrma_path: registry.idle.variants[0],
    };

    createLiveStatus(view, { id: null }).start(() => current, registry);
    frame?.();

    const subLine = view.mount.querySelector("#idle-sub-line")!;
    expect(subLine.querySelector("img")).toBeNull();
    expect(subLine.textContent).toContain("<img src=x onerror=alert(1)>");
  });
});
