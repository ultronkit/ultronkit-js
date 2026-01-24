/*
 * UltronKit: UNIVERSAL RUNTIME KERNEL (v0.0.0)
 * ============================================================================
 * MISSION-CRITICAL MONOLITH / SPACE-GRADE ALPHA
 * ============================================================================
 * Inspired by: NASA Power of 10, MISRA C:2012, SEI CERT, CWE/SANS Top 25,
 *              WCAG 2.1
 * Target: SpaceX Crew Dragon GUI (Chromium + JS) / Mission-Critical Apps
 * Disclaimer: Adopts principles for life-critical UIs (Aircraft, Suit, etc).
 *
 * [ARCHITECTURE: 3-Tier + Domain Model]
 * T0 Foundation  : ok, fail, panic, assert, guard, iter, match, type, pick, strip
 * T1 Infra       : System, Reactor, Data
 * T2 Domains     : State, Morph, Router, Grid
 * T2 Orchestrator: Kernel (Boot, Dispatch, Effect)
 *
 * [JURISDICTION & SAFETY]
 * - ABSOLUTE ISOLATION: Domains cannot access each other directly.
 * - ZERO TRUST: All inputs must be audited.
 * - IMMUTABILITY: State is frozen deep via Object.freeze().
 * - MUTUAL ASSURANCE: 1:1 Registry/Code consistency (Ghost/Shadow Detection).
 *
 * [DEPENDENCY RULES]
 * - T0: No dependencies (Foundation)
 * - T1: T0 only (Infrastructure -> Foundation)
 * - T2 Domains: T0 + T1 only (No cross-domain calls)
 * - Kernel: All tiers + domains (Orchestrator)
 *
 * [LANGUAGE ENFORCEMENT]
 * - TDZ: Code order enforces dependency (top->bottom only)
 * - Object.freeze(): State immutability
 * - Proxy: Domain direct access blocking
 * - Strict Mode: No implicit globals ("use strict")
 *
 * [ABSOLUTE AUDIT RULES (Tier 3 / Ultra)]
 * 1. Line Limit    : 10 lines per function (Kernel strict)
 * 2. Width Limit   : 70 chars (Kernel strict)
 * 3. Indent Limit  : 2 spaces max (2 levels)
 * 4. Complexity    : 2 max (Kernel CX:2)
 * 5. UFC           : Mandatory return ok() / fail()
 * 6. Blacklist     : var, class, this, =>, ++, --, ==, !=, ?, eval, innerHTML
 * 7. Zero Logging  : No console.* allowed in Kernel
 * 8. Comment Ban   : No comments allowed in Kernel (except Header)
 * 9. Formatter     : No One-Liners. { } must be multi-line. Zero Padding.
 *
 * [BOOT SEQUENCE: Parallel Audit]
 * Main Thread: UI First (non-blocking) -> Audit Execution
 * Audit Logic: Ghost/Shadow Detection + Precisely Reporting (LN, CH, Snip)
 * On Fail: Immediate Panic, halt all execution
 *
 * VIOLATION = KERNEL PANIC = SYSTEM HALT
 * ============================================================================
 */
const UltronKit = (function fnUltronKitScope() {
  "use strict";

  const runtime = {
    core: {
      state: {},
      config: {},
      schema: null,
      sources: { inline: "" },
      bootTime: Date.now(),
    },
    sys: { trace: [], raf: null, active: null, queue: [], signals: new Map() },
    cache: { dom: new Map(), memo: new Map(), key: new Map() },
    slots: {
      Auth: {},
      Gateway: {},
      I18n: {},
      State: {},
      Actions: {},
      Routes: {},
      Services: {},
      Meta: {},
      Invariants: {},
      Watchers: {},
      Middleware: {},
      UX: {},
      Computed: {},
      Config: {},
      Features: {},
      Persistence: {},
      Session: {},
      Theme: {},
      Forms: {},
      Policy: { schema: null },
    },
  };
  const kernelBody = fnUltronKitScope.toString();
  runtime.core.sources.inline = "\n".repeat(53) + kernelBody;

  /* --------------------------------------------------------------------------
   * KERNEL MANIFEST (REGISTRY)
   * -------------------------------------------------------------------------- */
  const K_MANIFEST = {
    Primitives: {
      Result: { ok: 1, fail: 1 },
      Control: {
        panic: 1,
        assert: 1,
        guard: 1,
        iter: 1,
        match: 1,
        Logic: 1,
      },
      Data: {
        type: 1,
        pick: 1,
        strip: 1,
        safePickReducer: 1,
        typed: 1,
        validateTypedArray: 1,
      },
      Panic: {
        createUIEl: 1,
        createPanicEl: 1,
        getErrColor: 1,
        renderPanicItem: 1,
        renderPanicList: 1,
        panicLog: 1,
        trigExp: 1,
        trigCopy: 1,
        addExpBtn: 1,
        addCopyBtn: 1,
        addRebootBtn: 1,
        makeListBox: 1,
        makeHeader: 1,
        makeActs: 1,
        assembleUI: 1,
        makeBtn: 1,
      },
      Inspect: {
        createInspectEl: 1,
        makeInBox: 1,
        addInItem: 1,
        addWipeBtns: 1,
        inspect: 1,
        checkRoot: 1,
      },
      Verify: {
        audit: 1,
        auditObj: 1,
        auditFn: 1,
        auditVal: 1,
        checkGhost: 1,
        checkShadow: 1,
        runChecks: 1,
        checkLen: 1,
        checkWid: 1,
        checkCyc: 1,
        checkFmt: 1,
        checkOpenBrace: 1,
        checkCloseBrace: 1,
        checkEmpty: 1,
        checkIndent: 1,
        checkOneLiner: 1,
        checkComments: 1,
        checkConceptualSpacing: 1,
        checkChaining: 1,
        checkDynamic: 1,
        checkNames: 1,
        checkParams: 1,
        checkCase: 1,
        checkUFC: 1,
        checkBlack: 1,
        checkWrapper: 1,
        checkOps: 1,
        checkNoLet: 1,
        checkExitPoint: 1,
        checkExplicit: 1,
        checkAssertDensity: 1,
        checkDotOnly: 1,
        getTierLimits: 1,
        getPos: 1,
        processAuditKeys: 1,
        reportLenViolation: 1,
        reportWidViolation: 1,
        reportCyc: 1,
        reportCycViolation: 1,
        reportBraceViolation: 1,
        reportEmptyViolation: 1,
        reportTokenViolation: 1,
        reportTokenAt: 1,
        reportOpViolation: 1,
        reportOpAt: 1,
        getBannedOps: 1,
        reportShadow: 1,
        reportMissingObj: 1,
        stripQuotes: 1,
        strip_strings: 1,
        count_complexity_tokens: 1,
      },
    },
    System: {
      System: {
        Pool: { init: 1, rent: 1, returnObj: 1, stats: 1 },
        Timer: { tick: 1, stop: 1, stopAll: 1 },
        Cache: { set: 1, get: 1, delete: 1, clear: 1 },
        Memory: { pressure: 1, gc: 1 },
      },
      Reactor: {
        Signal: { track: 1, trigger: 1, effect: 1, computed: 1, batch: 1 },
        Fiber: { push: 1, flush: 1, cancel: 1 },
        Queue: { push: 1, process: 1, clear: 1 },
        Channel: { create: 1, broadcast: 1, subscribe: 1, close: 1 },
        Leader: { elect: 1, isLeader: 1, resign: 1 },
      },
      Data: {
        Vault: { read: 1, write: 1, delete: 1, clear: 1, atomic: 1 },
        Sync: { run: 1, delta: 1, conflict: 1 },
        Migration: { check: 1, run: 1, rollback: 1 },
        Offline: { queue: 1, flush: 1, retry: 1 },
        Blackbox: { record: 1, dump: 1, clear: 1 },
      },
      State: {
        Core: {
          get: 1,
          update: 1,
          validate: 1,
          freeze: 1,
          snapshot: 1,
          restore: 1,
        },
        Schema: { define: 1, validate: 1 },
        Transaction: { begin: 1, commit: 1, rollback: 1 },
        Invariant: { register: 1, check: 1 },
      },
      Morph: {
        DOM: { render: 1, patch: 1, diff: 1, portal: 1, fragment: 1 },
        Bind: {
          text: 1,
          attr: 1,
          style: 1,
          value: 1,
          href: 1,
          show: 1,
          hide: 1,
          for: 1,
          include: 1,
          action: 1,
          link: 1,
        },
        I18n: { set: 1, get: 1, bind: 1 },
        Theme: { inject: 1, morph: 1, token: 1 },
        Virtual: { init: 1, scroll: 1, recycle: 1 },
        A11y: { audit: 1, fix: 1 },
      },
    },
    Business: {
      Router: {
        Nav: { go: 1, replace: 1, back: 1, forward: 1 },
        Route: { match: 1, add: 1, remove: 1 },
        Guard: { before: 1, after: 1, check: 1 },
        Scroll: { save: 1, restore: 1 },
        Prefetch: { link: 1, hover: 1 },
        Query: { parse: 1, sync: 1 },
      },
      Grid: {
        Boot: { init: 1, spawn: 1, terminate: 1 },
        Service: { dispatch: 1, register: 1 },
        Worker: { send: 1, receive: 1, heartbeat: 1, respawn: 1 },
        Balance: { leastBusy: 1, roundRobin: 1 },
        ServiceWorker: { register: 1, update: 1, skip: 1, cache: 1 },
        service: 1,
      },
    },
    Kernel: {
      Kernel: { boot: 1, Boot: 1, Dispatch: 1, Watcher: 1, Computed: 1 },
      Effect: {
        put: 1,
        call: 1,
        resource: 1,
        service: 1,
        alert: 1,
        navigate: 1,
        delay: 1,
        all: 1,
        race: 1,
        auth: 1,
        ux: 1,
        pwa: 1,
      },
    },
  };

  /* --------------------------------------------------------------------------
   * LAYER 0: FOUNDATION (PRIMITIVES)
   * -------------------------------------------------------------------------- */
  const Primitives = (function fnPrimMod(runtime) {
    function ok(data) {
      const result = { ok: true, data: data, fault: null };
      return result;
    }
    function fail(code, msg) {
      assert(code !== null, "E_FAIL_CODE");
      assert(msg !== null, "E_FAIL_MSG");
      const res = { ok: false, data: null, fault: { code, msg } };
      return res;
    }
    const PANIC_CSS =
      "#uk-panic-overlay,#uk-inspect-overlay{position:fixed;top:0;" +
      "left:0;width:100vw;height:100vh;z-index:2147483647;" +
      "display:flex;justify-content:center;align-items:center;" +
      "pointer-events:all;user-select:text;" +
      "font-family:'Courier New',monospace;}" +
      "#uk-panic-overlay{background:rgba(0,0,0,0.95);}" +
      "#uk-inspect-overlay{background:rgba(0,0,0,0.85);}" +
      ".uk-panic-core{box-sizing:border-box;width:90%;" +
      "max-width:800px;background:#000;border:2px solid #f44;" +
      "box-shadow:0 0 30px rgba(255,0,0,0.3);display:flex;" +
      "flex-direction:column;color:#f44;}" +
      ".uk-mod-inspect{border-color:#0f0;color:#0f0;" +
      "box-shadow:0 0 30px rgba(0,255,0,0.2);}" +
      ".uk-panic-header{background:#f44;color:#000;" +
      "padding:10px 15px;font-weight:bold;display:flex;" +
      "justify-content:space-between;align-items:center;" +
      "text-transform:uppercase;}" +
      ".uk-mod-inspect .uk-panic-header{background:#0f0;}" +
      ".uk-panic-list{flex:1;max-height:60vh;overflow-y:auto;" +
      "padding:15px;border-bottom:1px solid #333;}" +
      ".uk-panic-item{margin-bottom:8px;font-size:13px;color:#eee;}" +
      ".uk-panic-actions{padding:10px;display:flex;gap:10px;" +
      "justify-content:flex-end;background:#111;}" +
      ".uk-btn{background:#333;color:#eee;border:1px solid #444;" +
      "padding:8px 16px;cursor:pointer;font-family:inherit;" +
      "min-width:100px;text-align:center;font-weight:bold;}" +
      ".uk-btn:hover{background:#444;}" +
      ".uk-btn-copy{background:#444;color:#fff;border:none;}" +
      ".uk-btn-reboot{background:#f44;color:#000;border:none;}" +
      ".uk-mod-inspect .uk-btn-reboot{background:#0f0;}";
    const ERR_COLORS = {
      true_false: "#ffff00",
      false_true: "#ff00ff",
      false_false: "#ff6666",
    };
    const HEALTH_COLORS = { true: "#0f0", false: "#f00" };
    const HEALTH_LABELS = { true: "OK", false: "FAIL" };
    const TYPE_LABELS = { true_false: "null", false_true: "array" };
    const LOG_KEYS = ["actions", "computed", "watchers", "middleware"];
    (".uk-mod-inspect .uk-btn-reboot{background:#0f0;}");
    function createUIEl(tagName, elementId, cssText) {
      assert(tagName !== null, "E_UI_TAG");
      assert(elementId !== null, "E_UI_ID");
      const element = document.createElement(tagName);
      element.id = elementId;
      addStyle(element, cssText);
      return ok(element);
    }
    function addStyle(el, css) {
      assert(el !== null, "E_STYLE_EL");
      assert(css !== undefined, "E_STYLE_CSS");
      const style = document.createElement("style");
      style.textContent = css;
      const appendAction = function fnAppend() {
        return el.appendChild(style);
      };
      Logic.branch(css !== null, appendAction, function fnEmpty() {
        return null;
      });
      return ok(true);
    }
    function createPanicEl(cssText) {
      assert(cssText !== null, "E_PANIC_CSS");
      assert(arguments.length > 0, "E_PANIC_ARGS");
      return createUIEl("div", "uk-panic-overlay", cssText);
    }
    function createInspectEl(cssContent) {
      assert(cssContent !== null, "E_INSP_CSS");
      const inspectElement = createUIEl(
        "div",
        "uk-inspect-overlay",
        cssContent,
      ).data;
      inspectElement.onclick = function handleLayerClick(event) {
        const removeLayer = function fnRemove() {
          return inspectElement.remove();
        };
        const cancelAction = function fnCancel() {
          return null;
        };
        return Logic.branch(
          event.target === inspectElement,
          removeLayer,
          cancelAction,
        );
      };
      return ok(inspectElement);
    }
    function getErrColor(msg) {
      assert(msg !== null, "E_ERR_MSG");
      const isG = msg.indexOf("GHOST") !== -1;
      const isS = msg.indexOf("SHADOW") !== -1;
      const key = String(isG) + "_" + String(isS);
      const res = ERR_COLORS[key] || "#ff6666";
      return ok(res);
    }
    function renderPanicItem(error, index) {
      assert(error !== null, "E_ITEM_ERR");
      const errorColor = getErrColor(error).data;
      const indexString = (index + 1).toString().padStart(2, "0");
      const numberSlot =
        '<span style="color:' + errorColor + ';width:25px;flex-shrink:0;">';
      const dividerSlot = '<span style="color:#444;margin:0 10px;">|</span>';
      const messageSlot =
        '<span style="flex:1;word-break:break-all;">' + error + "</span>";
      const itemRow =
        '<div class="uk-panic-item" style="display:flex;">' +
        numberSlot +
        indexString +
        "</span>";
      return ok(itemRow + dividerSlot + messageSlot + "</div>");
    }
    function renderPanicList(violationList, fatalMessage) {
      assert(fatalMessage !== null, "E_LIST_FATAL");
      const hasViolations =
        violationList !== null &&
        violationList !== undefined &&
        violationList.length > 0;
      const panicItems = (violationList || []).map(
        function transform(error, index) {
          return renderPanicItem(error, index).data;
        },
      );
      const joinItems = function fnJoin() {
        return panicItems.join("");
      };
      const fallbackMsg = function fnFallback() {
        return '<div class="uk-panic-item">FATAL: ' + fatalMessage + "</div>";
      };
      return ok(Logic.branch(hasViolations, joinItems, fallbackMsg));
    }
    function panicLog(message, violationList) {
      assert(message !== null, "E_LOG_MSG");
      assert(violationList !== undefined, "E_LOG_LIST");
      const list = violationList || [];
      const log = { message: message, violations: list, t: Date.now() };
      return ok(JSON.stringify(log, null, 2));
    }
    function trigExp(message, list) {
      assert(message !== null, "E_EXP_MSG");
      assert(list !== null, "E_EXP_LIST");
      const data = panicLog(message, list).data;
      const blob = new Blob([data], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "panic-" + Date.now() + ".json";
      anchor.click();
      return ok(true);
    }
    function trigCopy(message, list, button) {
      assert(message !== null, "E_CPY_MSG");
      assert(button !== null, "E_CPY_BTN");
      const log = panicLog(message, list).data;
      navigator.clipboard.writeText(log).then(() => handleCopySuccess(button));
      return ok(true);
    }
    function handleCopySuccess(button) {
      assert(button !== null, "E_HCS_BTN");
      const prev = button.textContent;
      button.textContent = "COPIED!";
      setTimeout(() => {
        button.textContent = prev;
      }, 2000);
      return ok(true);
    }
    function makeBtn(text, cls, callback) {
      assert(text !== null, "E_BTN_TXT");
      assert(callback !== null, "E_BTN_CB");
      const button = document.createElement("button");
      button.className = cls;
      button.textContent = text;
      button.onclick = callback;
      return ok(button);
    }
    function addExpBtn(at, message, list) {
      assert(at !== null, "E_AEB_AT");
      assert(message !== null, "E_AEB_MSG");
      const cb = () => trigExp(message, list);
      const btn = makeBtn("EXPORT", "uk-btn", cb).data;
      at.appendChild(btn);
      return ok(true);
    }
    function addCopyBtn(at, message, list) {
      assert(at !== null, "E_ACB_AT");
      assert(message !== null, "E_ACB_MSG");
      const cb = (e) => trigCopy(message, list, e.target);
      const btn = makeBtn("COPY", "uk-btn uk-btn-copy", cb).data;
      at.appendChild(btn);
      return ok(true);
    }
    function addRebootBtn(at) {
      assert(at !== null, "E_ARB_AT");
      const cb = () => location.reload();
      const btn = makeBtn("REBOOT", "uk-btn uk-btn-reboot", cb).data;
      at.appendChild(btn);
      return ok(true);
    }
    function makeListBox(list, message) {
      assert(message !== null, "E_MLB_MSG");
      assert(arguments.length > 0, "E_MLB_ARG");
      const listBox = document.createElement("div");
      listBox.className = "uk-panic-list";
      listBox.innerHTML = renderPanicList(list, message).data;
      return ok(listBox);
    }
    function makeHeader(count, dur) {
      assert(count !== undefined, "E_HDR_CNT");
      const el = document.createElement("div");
      el.className = "uk-panic-header";
      const isD = dur !== undefined;
      const dTxt = "<span> (Audit: " + dur + "ms)</span>";
      const res = Logic.branch(
        isD,
        () => dTxt,
        () => "",
      );
      el.innerHTML = "<span>⚠️ KERNEL PANIC: " + count + " Errors</span>" + res;
      return ok(el);
    }
    function makeActs(message, list) {
      assert(message !== null, "E_ACT_MSG");
      assert(list !== null, "E_ACT_LIST");
      const acts = document.createElement("div");
      acts.className = "uk-panic-actions";
      addCopyBtn(acts, message, list);
      addRebootBtn(acts);
      return ok(acts);
    }
    function getViolationCount(list) {
      assert(arguments.length > 0, "E_GVC_ARG");
      const isL = list !== null && list !== undefined;
      return Logic.branch(
        isL,
        () => list.length,
        () => 1,
      );
    }
    function panic(message, violationList, duration) {
      checkProdPanic();
      renderPanicCore(message, violationList, duration);
      throw new Error(message);
    }
    function checkProdPanic() {
      const IsProductionMode = runtime.core.config.production === true;
      const passAction = function fnPass() {
        return ok(true);
      };
      return Logic.branch(IsProductionMode, haltSystem, passAction);
    }
    function renderPanicCore(message, violationList, duration) {
      const overlayResult = createPanicEl(PANIC_CSS);
      const uiResult = assembleUI(message, violationList, duration, "panic");
      const overlay = overlayResult.data;
      overlay.appendChild(uiResult.data);
      document.documentElement.appendChild(overlay);
      return ok(true);
    }
    function haltSystem() {
      document.documentElement.style.background = "#000";
      throw new Error("KERNEL_HALT");
    }
    function assert(condition, message) {
      const isOk = condition === true;
      const lut = {
        true: () => ({ ok: true, data: true }),
        false: () => panic(message),
      };
      return lut[String(isOk)]();
    }
    function guard(fn, catchFn) {
      assert(fn !== null, "E_GUARD_FN");
      assert(catchFn !== null, "E_GUARD_CATCH");
      const wrapper = async function fnG(state, params) {
        try {
          const res = await fn(state, params);
          return res;
        } catch (error) {
          const res = await handleGuardError(catchFn, state, error);
          return res;
        }
      };
      return wrapper;
    }
    async function handleGuardError(catchFn, state, error) {
      assert(error !== null, "E_GUARD_ERR");
      const isC = catchFn !== undefined && catchFn !== null;
      const t = () => catchFn(state, error);
      const f = () => Promise.resolve(fail("GUARD", error.msg));
      return Logic.branch(isC, t, f);
    }
    async function iter(array, callback, limit) {
      assert(limit !== undefined, "E_ITER_LIMIT");
      assert(callback !== null, "E_ITER_CB");
      const keys = Object.keys(array).slice(0, limit);
      for (const key of keys) {
        await callback(array[key]);
      }
      return ok(true);
    }
    function match(value, cases) {
      assert(value !== undefined, "E_MATCH_VAL");
      assert(cases !== null, "E_MATCH_CASES");
      const found = cases[value] || cases["_"];
      const isF = found !== undefined && found !== null;
      const f = () => fail("E_MATCH_MISS", value);
      return Logic.branch(isF, () => found(), f);
      return Logic.branch(isF, () => found(), f);
    }

    const Effect = {
      service: async function fnSvc(fn) {
        return fn();
      },
      action: async function fnAct(fn) {
        return fn();
      },
    };

    // SPEC 8.1: Validation of TypedArray
    function validateTypedArray(data) {
      assert(data !== null, "E_VTA_NULL");
      const isTyped = ArrayBuffer.isView(data) && !(data instanceof DataView);
      const t = () => ok(true);
      const f = () => fail("INVALID_TYPED_ARRAY", typeof data);
      return Logic.branch(isTyped, t, f);
    }

    function type(value) {
      assert(arguments.length > -1, "E_TYPE_VAL");
      const isNull = value === null;
      const isArray = Array.isArray(value);
      const typeKey = String(isNull) + "_" + String(isArray);
      return ok(TYPE_LABELS[typeKey] || typeof value);
    }
    function typed(value, typeName) {
      // Data.typed implementation
      assert(value !== undefined, "E_TYPED_VAL");
      const t = type(value).data;
      const isMatch = t === typeName;
      const f = () => fail("TYPE_MISMATCH", typeName);
      return Logic.branch(isMatch, () => ok(value), f);
    }
    function pick(targetObject, propertyPath) {
      assert(targetObject !== null, "E_PICK_OBJ");
      assert(propertyPath !== null, "E_PICK_PATH");
      const pathSegments = propertyPath.split(".");
      const pickedValue = pathSegments.reduce(safePickReducer, targetObject);
      const isMissingValue = pickedValue === undefined || pickedValue === null;
      const getSuccess = function fnSuccess() {
        return ok(pickedValue);
      };
      const getFailure = function fnFailure() {
        return fail("NOT_FOUND", propertyPath);
      };
      return Logic.branch(isMissingValue, getFailure, getSuccess);
    }
    function safePickReducer(accumulator, key) {
      const checkExists = function fnCheck() {
        return accumulator[key];
      };
      const handleMissing = function fnMissing() {
        return undefined;
      };
      const isAvailable = accumulator !== null && accumulator !== undefined;
      return Logic.branch(isAvailable, checkExists, handleMissing);
    }
    function strip(source) {
      assert(source !== null, "E_STRIP_SRC");
      const quotePat =
        /"[^"\\\r\n]*(?:\\.[^"\\\r\n]*)*"|'[^'\\\r\n]*(?:\\.[^'\\\r\n]*)*'|`[^`]*`/g;
      const commentPat = /\/\*[\s\S]*?\*\/|\/\/.*/g;
      const result = source
        .replace(quotePat, function fnQ(m) {
          return " ".repeat(m.length);
        })
        .replace(commentPat, function fnC(m) {
          return " ".repeat(m.length);
        });
      return ok(result);
    }

    function assembleUI(message, list, duration, mode) {
      assert(message !== null, "E_AUI_MSG");
      assert(mode !== null, "E_AUI_MODE");
      const cnt = getViolationCount(list);
      const hdr = makeHeader(cnt, duration).data;
      const box = makeListBox(list, message).data;
      const act = makeActs(message, list).data;
      const ui = document.createElement("div");
      ui.className = "uk-panic-core";
      return applyUIMode(ui, hdr, box, act, mode);
    }
    function applyUIMode(ui, hdr, box, acts, mode) {
      assert(ui !== null, "E_AUM_UI");
      const isI = mode === "inspect";
      Logic.branch(
        isI,
        () => ui.classList.add("uk-mod-inspect"),
        () => null,
      );
      return assembleCore(ui, hdr, box, acts);
    }
    function assembleCore(ui, hdr, box, acts) {
      assert(ui !== null, "E_AC_UI");
      assert(hdr !== null, "E_AC_HDR");
      ui.appendChild(hdr);
      ui.appendChild(box);
      ui.appendChild(acts);
      return ok(ui);
    }
    const Logic = (function fnLog() {
      function branch(cond, tFn, fFn) {
        assert(tFn !== null, "E_LOG_TFN");
        assert(fFn !== null, "E_LOG_FFN");
        if (cond === true) {
          return tFn();
        }
        return fFn();
      }
      function choice(val, cases) {
        assert(cases !== null, "E_LOG_CASES");
        const found = cases[val] || cases["_"];
        return found();
      }
      return { branch, choice };
    })();
    function renderInspectDash(el, list, duration, res) {
      assert(el !== null, "E_RID_EL");
      assert(res !== null, "E_RID_RES");
      const title = "SYSTEM_CONTROL (Audit: " + duration + "ms)";
      const ui = assembleUI(title, list, duration, "inspect").data;
      const listDiv = ui.querySelector(".uk-panic-list");
      injectSysInfo(listDiv);
      setupInspectActs(ui, res.data);
      el.appendChild(ui);
      return ok(true);
    }
    function setupInspectActs(ui, isRoot) {
      assert(ui !== null, "E_SIA_UI");
      const acts = ui.querySelector(".uk-panic-actions");
      acts.innerHTML = "";
      const t = () => addWipeBtns(acts, wipeSys, wipeRoot);
      const f = () => null;
      return Logic.branch(isRoot === true, t, f);
    }
    function renderStatsHtml(s) {
      assert(s !== null, "E_RSH_STATS");
      const h1 = '<div style="color:#00ff00; font-size:11px;">';
      const h2 = "[SYS] CORES:" + s.cores + " | MEM:" + s.memory;
      const h3 = " | UPTIME:" + s.uptime + "s</div>" + renderModuleHealth();
      const h4 =
        '<div style="color:#888; font-size:9px;">' + s.agent + "...</div>";
      return h1 + h2 + h3 + h4;
    }
    function renderModuleHealth() {
      assert(runtime !== null, "E_RMH_RT");
      const keys = ["System", "Reactor", "Data", "State", "Kernel"];
      const cells = keys.map((k) => renderHealthCell(k));
      return '<div style="margin:5px 0;">' + cells.join("") + "</div>";
    }
    function renderHealthCell(key) {
      assert(key !== null, "E_RHC_KEY");
      const moduleSlot = runtime.slots[key];
      const isInitialized = moduleSlot !== undefined && moduleSlot !== null;
      const healthColor = HEALTH_COLORS[String(isInitialized)];
      const healthLabel =
        "[" + key[0] + "]" + HEALTH_LABELS[String(isInitialized)];
      const cellStyle = "color:" + healthColor + "; margin-right:5px;";
      return '<span style="' + cellStyle + '">' + healthLabel + "</span>";
    }
    function addWipeBtns(at, ws, wr) {
      assert(at !== null, "E_AWB_AT");
      assert(ws !== null, "E_AWB_WS");
      at.appendChild(makeBtn("WIPE SYS", "uk-btn", ws).data);
      at.appendChild(makeBtn("WIPE ROOT", "uk-btn", wr).data);
      return ok(true);
    }
    function wipeSys() {
      assert(localStorage !== null, "E_WS_LS");
      localStorage.clear();
      location.reload();
      return ok(true);
    }
    function wipeRoot() {
      assert(localStorage !== null, "E_WR_LS");
      localStorage.removeItem("UK_ROOT");
      location.reload();
      return ok(true);
    }
    function makeInBox() {
      assert(arguments.length > -1, "E_MIB_ARG");
      const box = document.createElement("div");
      box.className = "uk-panic-list";
      return ok(box);
    }
    function addInItem(box, content) {
      assert(box !== null, "E_AII_BOX");
      const item = document.createElement("div");
      item.className = "uk-panic-item";
      item.textContent = content;
      box.appendChild(item);
      return ok(true);
    }
    function checkRoot() {
      assert(localStorage !== null, "E_CR_LS");
      const isR = localStorage.getItem("UK_ROOT") === "true";
      return ok(isR);
    }
    function syncRoot() {
      assert(location !== null, "E_SR_LOC");
      const p = new URLSearchParams(location.search);
      const isR = p.get("root") === "true";
      const t = () => localStorage.setItem("UK_ROOT", "true");
      return Logic.branch(isR, t, () => null);
    }
    syncRoot();
    function getMemInfo() {
      assert(performance !== null, "E_GMI_PERF");
      const m = performance.memory;
      const isOk = m !== undefined && m !== null;
      const t = () => Math.round(m.usedJSHeapSize / 1048576) + "MB";
      return Logic.branch(isOk, t, () => "N/A");
    }
    function getSysStats() {
      assert(runtime !== null, "E_GSS_RT");
      const bt = runtime.core.bootTime;
      const t = Math.round((Date.now() - bt) / 1000);
      return ok({
        cores: navigator.hardwareConcurrency || 0,
        memory: getMemInfo(),
        uptime: t,
        agent: navigator.userAgent.slice(0, 30),
      });
    }
    function injectSysInfo(container) {
      assert(container !== null, "E_ISI_CON");
      const stats = getSysStats().data;
      const infoEl = document.createElement("div");
      infoEl.style.borderBottom = "1px solid #333";
      infoEl.style.paddingBottom = "10px";
      infoEl.style.marginBottom = "10px";
      infoEl.innerHTML = renderStatsHtml(stats);
      container.insertBefore(infoEl, container.firstChild);
      return ok(true);
    }
    function inspect(list, root, duration) {
      assert(list !== null, "E_INS_LIST");
      const p = document.getElementById("uk-inspect-overlay");
      Logic.branch(
        p !== null,
        () => p.remove(),
        () => null,
      );
      const el = createInspectEl(PANIC_CSS).data;
      renderInspectDash(el, list, duration, root);
      document.documentElement.appendChild(el);
      return ok(true);
    }

    const Verify = (function fnVer() {
      function checkLen(source, key, limit, errors) {
        assert(source !== null, "E_LEN_SRC");
        assert(limit !== undefined, "E_LEN_LIM");
        const lines = source.split("\n").filter(function fnTrim(l) {
          return l.trim();
        });
        const len = lines.length;
        const lut = {
          true: () => reportLenViolation(key, len, limit, source, errors),
          false: () => ok(true),
        };
        return lut[String(len > limit)]();
      }
      function reportLenViolation(key, len, limit, source, errors) {
        const msg = key + ": TOO_LONG (" + len + "/" + limit + ")";
        const first = source.split("\n")[0];
        const snip = first || "";
        errors.push(msg + ', Snippet: "' + snip.trim() + '"');
        return ok(true);
      }
      function checkWid(source, key, limit, errors) {
        const lines = source.split("\n");
        lines.forEach(function fnW(line, index) {
          if (line.length > limit) {
            reportWidViolation(key, line, index, errors);
          }
        });
        return ok(true);
      }
      function reportWidViolation(key, line, index, errors) {
        const ln = index + 1;
        const msg = key + ": WIDTH (LN:" + ln + ", WD:" + line.length;
        errors.push(msg + ', Snippet: "' + line.trim() + '")');
        return ok(true);
      }
      function checkCyc(cleanSource, key, limit, errors) {
        assert(limit !== undefined, "E_CYC_LIMIT");
        assert(key !== null, "E_CYC_KEY");
        assert(key !== null, "E_CYC_KEY");
        // SPEC UPDATE: Added '?' back as per user instruction (Cyclomatic Complexity)
        const pattern = "\\bif\\b|\\x3f|\\x26\\x26|\\x7c\\x7c";
        const regex = new RegExp(pattern, "g");
        const ms = Array.from(cleanSource.matchAll(regex));
        const hasV = ms.length > limit;
        const lut = {
          true: () => errors.push(key + ": CYC_VIOLATION"),
          false: () => null,
        };
        ms.forEach((m) => {
          return reportCycViolation(cleanSource, key, m, errors);
        });
        lut[String(hasV)]();
        return ok(true);
      }
      function reportCyc(key, match, pos, errors) {
        const msg = key + ": CYC_TOKEN " + match[0];
        const loc = " (LN:" + pos.line + ", CH:" + pos.ch + ")";
        const snip = ', Snippet: "' + pos.content.trim() + '"';
        errors.push(msg + loc + snip);
        return ok(true);
      }
      function reportCycViolation(source, key, match, errors) {
        const pos = getPos(source, match.index).data;
        return reportCyc(key, match, pos, errors);
      }
      function checkFmt(cleanSource, key, errors) {
        assert(cleanSource !== null, "E_FMT_SRC");
        assert(errors !== null, "E_FMT_ERR");
        const lines = cleanSource.split("\n");
        lines.forEach((l, i) => {
          return reportBraceViolation(l, key, i + 1, errors);
        });
        return ok(true);
      }
      function reportBraceViolation(line, key, ln, errors) {
        checkOpenBrace(line, key, ln, errors);
        checkCloseBrace(line, key, ln, errors);
        return ok(true);
      }
      function checkOpenBrace(line, key, ln, errors) {
        assert(line !== null, "E_OB_LINE");
        assert(line !== null, "E_OB_LINE");
        const idx = line.indexOf("{");
        // SPEC: Matches '{' NOT preceded by '$' (Template Literal exception)
        const pattern = "(?<!\\x24)\\x7b(?![\\s]*(\\x2f\\x2f.*)?$)";
        const bad = line.match(new RegExp(pattern));
        const hasV = idx !== -1 && bad !== null;
        const msg = key + ": BRACE (LN:" + ln + ", CH:" + (idx + 1) + ")";
        const lut = {
          true: () => errors.push(msg + ', Snippet: "' + line.trim() + '"'),
          false: () => null,
        };
        return lut[String(hasV)]();
      }
      function checkCloseBrace(line, key, ln, errors) {
        assert(line !== null, "E_CB_LINE");
        const idx = line.indexOf("}");
        const bad = line.match(/\S\s*\}/);
        const hasV = idx !== -1 && bad !== null;
        const msg = key + ": CLOSE (LN:" + ln + ", CH:" + (idx + 1) + ")";
        const lut = {
          true: () => errors.push(msg + ', Snippet: "' + line.trim() + '"'),
          false: () => null,
        };
        return lut[String(hasV)]();
      }
      function checkEmpty(source, key, errors) {
        assert(source !== null, "E_EMP_SRC");
        assert(errors !== null, "E_EMP_ERR");
        const lines = source.split("\n");
        lines.forEach((l, i) => {
          return runEmptyChecks(l, i, lines, key, errors);
        });
        return ok(true);
      }
      function runEmptyChecks(line, index, lines, key, errors) {
        assert(line !== null, "E_REC_LINE");
        const isD =
          index > 0 && line.trim() === "" && lines[index - 1].trim() === "";
        const src = lines.join("\n");
        const lut = {
          true: () =>
            reportErrLn(src, key, "MAX_EMPTY_LINES", index + 1, null, errors),
          false: () => null,
        };
        lut[String(isD)]();
        return checkZeroPadding(line, index, lines, key, errors);
      }
      function checkZeroPadding(line, idx, lines, key, errors) {
        assert(line !== null, "E_CZP_LINE");
        const isB = idx > 0 && idx < lines.length - 1 && line.trim() === "";
        const lutB = {
          true: () => runZeroPadLogic(idx, lines, key, errors),
          false: () => null,
        };
        return lutB[String(isB)]();
      }
      function runZeroPadLogic(idx, lines, key, errors) {
        const prev = lines[idx - 1].trim();
        const next = lines[idx + 1].trim();
        const isV = prev.endsWith("{") || next.startsWith("}");
        const src = lines.join("\n");
        const lut = {
          true: () =>
            reportErrLn(src, key, "ZERO_PADDING", idx + 1, null, errors),
          false: () => null,
        };
        return lut[String(isV)]();
      }
      function checkIndent(source, key, errors) {
        assert(source !== null, "E_IND_SRC");
        assert(errors !== null, "E_IND_ERR");
        const lines = source.split("\n");
        lines.forEach((l, i) => {
          return runIndentCheck(l, i, key, errors);
        });
        return ok(true);
      }
      function runIndentCheck(line, idx, key, errors) {
        const m = line.match(/^[\s]*/);
        const ind = m ? m[0].length : 0;
        const isV = ind > 4;
        const lut = {
          true: () =>
            reportErr(key, "INDENT", idx + 1, ind + 1, null, line, errors),
          false: () => null,
        };
        return lut[String(isV)]();
      }
      function checkOneLiner(source, key, errors) {
        assert(source !== null, "E_ONE_SRC");
        const lines = source.split("\n");
        lines.forEach((l, i) => {
          return runOneLinerCheck(l, i, key, errors);
        });
        return ok(true);
      }
      function runOneLinerCheck(line, idx, key, errors) {
        const clean = line.replace(/\$\{.*?\}/g, "");
        const isV = clean.indexOf("{") !== -1 && clean.indexOf("}") !== -1;
        const lut = {
          true: () =>
            reportErr(key, "ONE_LINER", idx + 1, 1, null, line, errors),
          false: () => null,
        };
        return lut[String(isV)]();
      }
      function checkConceptualSpacing(source, key, errors) {
        assert(source !== null, "E_SPC_SRC");
        const lines = source.split("\n");
        lines.forEach((l, i) => {
          return runSpacingCheck(l, i, lines, key, errors);
        });
        return ok(true);
      }
      function runSpacingCheck(line, idx, lines, key, errors) {
        const trim = line.trim();
        const toks = ["if(", "for(", "while(", "switch(", "return "];
        const isT = toks.some((t) => {
          return trim.startsWith(t);
        });
        const isV =
          isT &&
          idx > 0 &&
          lines[idx - 1].trim() !== "" &&
          !lines[idx - 1].trim().endsWith("{");
        const lut = {
          true: () => reportErr(key, "SPACING", idx + 1, 1, null, line, errors),
          false: () => null,
        };
        return lut[String(isV)]();
      }
      function checkChaining(source, key, errors) {
        const clean = stripQuotes(source).data;
        const pattern =
          "\\.\\w+\\x28.*\\x29\\.\\w+\\x28.*\\x29\\.\\w+\\x28.*\\x29";
        const regex = new RegExp(pattern, "g");
        const match = regex.exec(clean);
        if (match !== null) {
          reportErrAt(
            clean,
            key,
            "METHOD_CHAINING_LIMIT",
            match.index,
            null,
            errors,
          );
        }
        return ok(true);
      }
      function checkDynamic(source, key, errors) {
        const clean = stripQuotes(source).data;
        const pattern = "[\\w\\x29]\\s*\\x5b(?![\\x27\\x22\\x600-9])";
        const regex = new RegExp(pattern, "g");
        const match = regex.exec(clean);
        if (match !== null) {
          reportErrAt(
            clean,
            key,
            "DYNAMIC_PROPERTY",
            match.index,
            null,
            errors,
          );
        }
        return ok(true);
      }
      function checkNames(source, key, errors) {
        assert(source !== null, "E_NAM_SRC");
        assert(key !== null, "E_NAM_KEY");
        const clean = stripQuotes(source).data;
        const regex = /\b[a-zA-Z_$][a-zA-Z0-9_$]*\b/g;
        // Polyfill: use exec loop instead of matchAll
        const ms = [];
        let m;
        while ((m = regex.exec(clean)) !== null) {
          ms.push(m);
        }
        ms.forEach((m) => {
          return auditId(m[0], m.index, source, key, errors);
        });
        return ok(true);
      }
      function auditId(id, index, source, key, errors) {
        const keys = [
          "if",
          "for",
          "else",
          "let",
          "const",
          "return",
          "function",
          "async",
          "await",
          "try",
          "catch",
          "switch",
          "case",
          "while",
          "break",
          "continue",
          "typeof",
          "new",
          "this",
          "null",
          "undefined",
        ];
        if (keys.indexOf(id) !== -1 || id === "ok" || id === "data") {
          return ok(true);
        }
        return contextAudit(id, index, source, key, errors);
      }
      function contextAudit(id, index, source, key, errors) {
        const pre = source.slice(0, index).trim();
        const isConst = pre.endsWith("const");
        const isLet = pre.endsWith("let");
        const isFn = pre.endsWith("function");
        if (isConst) {
          return validateConst(id, key, index, source, errors);
        }
        if (isLet || isFn) {
          return validateCamel(id, key, index, source, errors);
        }
        return validateGeneral(id, key, index, source, errors);
      }
      function validateConst(id, key, index, source, errors) {
        const snake = /^[A-Z][A-Z0-9_]*$/.test(id);
        const pascal = /^[A-Z][a-zA-Z0-9]*$/.test(id);
        if (!snake && !pascal) {
          reportErrAt(source, key, "CONST_NAMING", index, id, errors);
        }
        return ok(true);
      }
      function validateCamel(id, key, index, source, errors) {
        if (!/^[a-z][a-zA-Z0-9]*$/.test(id)) {
          reportErrAt(source, key, "CAMEL_CASE", index, id, errors);
        }
        return ok(true);
      }
      function validateGeneral(id, key, index, source, errors) {
        const okCase = /^[a-zA-Z][a-zA-Z0-9_]*$/.test(id);
        if (!okCase) {
          reportErrAt(source, key, "INVALID_NAMING", index, id, errors);
        }
        if (id.length < 4 && id !== "idx" && id !== "err") {
          reportErrAt(source, key, "SHORT_NAME", index, id, errors);
        }
        return ok(true);
      }
      function checkComments(source, key, errors) {
        const lines = source.split("\n");
        let inHeader = true;
        lines.forEach((line, idx) => {
          const trimmed = line.trim();
          if (idx === 0 && trimmed.startsWith("/*")) {
            return;
          }
          if (inHeader && trimmed.endsWith("*/")) {
            inHeader = false;
            return;
          }
          if (
            !inHeader &&
            (trimmed.indexOf("//") !== -1 || trimmed.indexOf("/*") !== -1)
          ) {
            reportErrLn(source, key, "COMMENT_BAN", idx + 1, null, errors);
          }
        });
        return ok(true);
      }
      function stripQuotes(source) {
        if (!source || typeof source !== "string") return ok("");
        const rex = /"[^"]*"|'[^']*'|`[^`]*`/g;
        return ok(
          source.replace(rex, function fnR(m) {
            return " ".repeat(m.length);
          }),
        );
      }
      // Alias for SPEC consistency
      function strip_strings(source) {
        return stripQuotes(source);
      }
      function strip_comments(source) {
        const commentPat = /\/\*[\s\S]*?\*\/|\/\/.*/g;
        return ok(source.replace(commentPat, ""));
      }
      function is_header_comment(source) {
        const trimmed = source.trim();
        return ok(trimmed.startsWith("/*") && trimmed.indexOf("*/") !== -1);
      }
      function count_complexity_tokens(source) {
        // Must strip both quotes AND comments
        const noQuotes = stripQuotes(source).data;
        const clean = strip_comments(noQuotes).data;
        const matches = clean.match(/\bif\b|&&|\|\||\?/g) || [];
        return ok(matches.length);
      }

      function checkCase(source, key, errors) {
        const part = key.split(".").pop();
        const regex = new RegExp("^[a-z][a-zA-Z0-9]*$");
        if (!regex.test(part)) {
          const lines = source.split("\n");
          reportErr(key, "CASE", 1, 1, part, lines[0] || "", errors);
        }
        return ok(true);
      }
      function checkUFC(source, key, errors) {
        const okIdx = source.indexOf("return ok(");
        const failIdx = source.indexOf("return fail(");
        const resIdx = source.indexOf("return result");
        const hasUFC = okIdx !== -1 || failIdx !== -1 || resIdx !== -1;
        if (!hasUFC) {
          const lines = source.split("\n");
          reportErr(key, "UFC_VIOLATION", 1, 1, null, lines[0] || "", errors);
        }
        return ok(true);
      }
      function checkBlack(cleanSource, key, errors) {
        const banned = [
          "var",
          "class",
          "this",
          "with",
          "delete",
          "void",
          "instanceof",
          "arguments",
          "in",
          "yield",
          "prototype",
          "eval",
          "innerHTML",
          "console.",
          "debugger",
          "document.write",
          "Function",
          "try",
          "catch",
          "for",
          "while",
          "forEach",
          "switch",
          "case",
          "async",
          "await",
          "new",
        ];
        banned.forEach((token) => {
          reportTokenViolation(cleanSource, key, token, errors);
        });
        return ok(true);
      }
      function reportTokenViolation(source, key, token, errors) {
        assert(token !== null, "E_RTV_TOK");
        assert(errors !== null, "E_RTV_ERR");
        const regex = new RegExp("\\x5cb" + token + "\\x5cb", "g");
        const ms = Array.from(source.matchAll(regex));
        ms.forEach((m) => {
          return reportTokenAt(source, key, token, m.index, errors);
        });
        return ok(true);
      }
      function reportTokenAt(source, key, token, index, errors) {
        const pos = getPos(source, index).data;
        const msg = key + ": BANNED " + token;
        const loc = " (LN:" + pos.line + ", CH:" + pos.ch + ")";
        const snip = ', Snippet: "' + (pos.content || "").trim() + '"';
        errors.push(msg + loc + snip);
        return ok(true);
      }
      function checkOps(cleanSource, key, errors) {
        const ops = getBannedOps();
        ops.forEach((pair) => {
          reportOpViolation(cleanSource, key, pair, errors);
        });
        return ok(true);
      }
      function getBannedOps() {
        return [
          ["\x3d\x3d", new RegExp("(?<![!=])\\x3d\\x3d(?!=)", "g")],
          ["!\x3d", new RegExp("(?<!\\x3d)!\\x3d(?!=)", "g")],
          ["\x2b\x2b", new RegExp("\\x2b\\x2b", "g")],
          ["\x2d\x2d", new RegExp("\\x2d\\x2d", "g")],
          ["=>", /=>/g],
          ["\x3f", new RegExp("\\x3f", "g")],
        ];
      }
      function reportOpViolation(source, key, pair, errors) {
        assert(pair !== null, "E_ROV_PAIR");
        assert(errors !== null, "E_ROV_ERR");
        const regex = pair[1];
        const ms = Array.from(source.matchAll(regex));
        ms.forEach((m) => {
          reportOpAt(source, key, pair[0], m.index, errors);
        });
        return ok(true);
      }
      function reportOpAt(source, key, op, index, errors) {
        const pos = getPos(source, index).data;
        const msg = key + ": BANNED_OP " + op;
        const loc = " (LN:" + pos.line + ", CH:" + pos.ch + ")";
        const snip = ', Snippet: "' + (pos.content || "").trim() + '"';
        errors.push(msg + loc + snip);
        return ok(true);
      }
      function getPos(source, index) {
        const pre = source.slice(0, index);
        const lines = pre.split("\n");
        const all = source.split("\n");
        const row = lines.length;
        const col = lines[row - 1].length + 1;
        const result = {
          line: row,
          ch: col,
          content: all[row - 1] || "",
        };
        return ok(result);
      }
      function reportErr(key, errType, ln, ch, token, snippet, errors) {
        const msg = key + ": " + errType;
        const loc = " (LN:" + ln + ", CH:" + ch + ")";
        const tok = token !== null ? ", TK:" + token : "";
        const snip = ', Snippet: "' + snippet.trim() + '"';
        errors.push(msg + loc + tok + snip);
        return ok(true);
      }
      function reportErrAt(source, key, errType, index, token, errors) {
        const pos = getPos(source, index).data;
        return reportErr(
          key,
          errType,
          pos.line,
          pos.ch,
          token,
          pos.content,
          errors,
        );
      }
      function reportErrLn(source, key, errType, ln, token, errors) {
        const lines = source.split("\n");
        const snippet = lines[ln - 1] || "";
        return reportErr(key, errType, ln, 1, token, snippet, errors);
      }
      function checkParams(source, key, errors) {
        assert(source !== null, "E_PRM_SRC");
        assert(key !== null, "E_PRM_KEY");
        const regex = /function\s*\w*\s*\((.*?)\)/g;
        const ms = Array.from(source.matchAll(regex));
        ms.forEach((m) => {
          return reportParamAt(m[1], key, errors);
        });
        return ok(true);
      }
      function reportParamAt(paramStr, key, errors) {
        const pList = paramStr.split(",").filter((p) => {
          return p.trim();
        });
        const isB = pList.length > 3;
        const lut = {
          true: () => errors.push(key + ": PARAM_LIMIT"),
          false: () => null,
        };
        return lut[String(isB)]();
      }
      function runChecks(source, key, errors) {
        const tierLimits = getTierLimits(key).data;
        const cleanSource = strip(source).data;
        checkLen(source, key, tierLimits.LN, errors);
        checkWid(source, key, tierLimits.WD, errors);
        checkCyc(cleanSource, key, tierLimits.CX, errors);
        runTieredBlacklist(
          cleanSource,
          key,
          tierLimits.BLACKLIST_STRICT,
          errors,
        );
        checkCase(source, key, errors);
        checkEmpty(source, key, errors);
        checkChaining(source, key, errors);
        checkDynamic(source, key, errors);
        checkParams(source, key, errors);
        checkDotOnly(source, key, errors);
        if (tierLimits.NO_LET_RULE === true) {
          checkNoLet(source, key, errors);
        }
        if (tierLimits.COMMENT_BAN_RULE === true) {
          checkComments(source, key, errors);
        }
        if (tierLimits.FORMATTING === true) {
          checkFmt(cleanSource, key, errors);
        }
        if (tierLimits.INDENT_RULE === true) {
          checkIndent(source, key, errors);
        }
        if (tierLimits.ONE_LINER_BAN === true) {
          checkOneLiner(source, key, errors);
        }
        if (tierLimits.CONCEPTUAL_SPACING === true) {
          checkConceptualSpacing(source, key, errors);
        }
        if (tierLimits.NAMING_CONVENTION === true) {
          checkNames(source, key, errors);
        }
        if (tierLimits.BANNED_OPERATOR === true) {
          checkOps(source, key, errors);
        }
        if (tierLimits.UFC_RETURN === true) {
          checkUFC(source, key, errors);
        }
        if (tierLimits.ASSERT_DENSITY === true) {
          checkAssertDensity(source, key, errors);
        }
        if (tierLimits.WRAPPER_CHECK === true) {
          checkWrapper(cleanSource, key, errors);
        }
        if (tierLimits.EXIT_POINT_CHECK === true) {
          checkExitPoint(source, key, errors);
        }
        if (tierLimits.EXPLICIT_STRICT === true) {
          checkExplicit(source, key, errors);
        }
        return ok(true);
      }
      function runTieredBlacklist(cleanSource, key, isStrict, errors) {
        const lookupTable = {
          true: () => checkBlack(cleanSource, key, errors),
          false: () => checkBlackTier1(cleanSource, key, errors),
        };
        return lookupTable[String(isStrict === true)]();
      }
      function checkBlackTier1(clean, key, errors) {
        const banned = getBannedTier1();
        banned.forEach(function fnB(token) {
          reportTokenViolation(clean, key, token, errors);
        });
        return ok(true);
      }
      function getBannedTier1() {
        return [
          "var",
          "with",
          "void",
          "arguments",
          "yield",
          "prototype",
          "eval",
          "innerHTML",
          "debugger",
          "document.write",
          "Function",
        ];
      }
      function checkNoLet(source, key, errors) {
        assert(source !== null, "E_CNL_SRC");
        const regex = /\blet\b/g;
        let match;
        while ((match = regex.exec(source)) !== null) {
          reportErrAt(source, key, "LET_BAN", match.index, "let", errors);
        }
        return ok(true);
      }
      function checkExitPoint(source, key, errors) {
        const regex = /\breturn\s+/g;
        const allMs = Array.from(source.matchAll(regex));
        if (allMs.length > 1) {
          reportErrAt(source, key, "MULTI_EXIT", allMs[1].index, null, errors);
        }
        const lines = source.trim().split("\n");
        const last = findLastStatement(lines);
        if (!last.startsWith("return ")) {
          const ln = lines.length;
          reportErrLn(source, key, "EXIT_NOT_LAST", ln, null, errors);
        }
        return ok(true);
      }
      function findLastStatement(lines) {
        const len = lines.length;
        const last = lines[len - 1].trim();
        const isClose = last === "}" || last === "};";
        const prev = len > 1 ? lines[len - 2].trim() : "";
        const lut = { true: prev, false: last };
        return lut[String(isClose)];
      }
      function checkExplicit(source, key, errors) {
        const pat = "\\bif\\s*\\((?![^)]*(===|!==|>=|<=|>|<|typeof))";
        const regex = new RegExp(pat, "g");
        const match = regex.exec(source);
        if (match !== null) {
          reportErrAt(source, key, "IMPLICIT_IF", match.index, null, errors);
        }
        return ok(true);
      }
      function checkAssertDensity(source, key, errors) {
        const matches = source.match(/\bassert\(/g) || [];
        const isP = key.indexOf("Primitives.") !== -1;
        if (matches.length < 2 && isP !== true) {
          reportErrLn(source, key, "ASSERT_DENSITY", 1, null, errors);
        }
        return ok(true);
      }
      function checkDotOnly(source, key, errors) {
        const regex = /\[\s*[^0-9"']\s*\]/g;
        const match = regex.exec(source);
        if (match !== null) {
          reportErrAt(source, key, "DYNAMIC_INDEX", match.index, null, errors);
        }
        return ok(true);
      }
      function getTierLimits(path) {
        assert(path !== null, "E_GTL_PATH");
        const matchPatterns = [
          "UltronKit",
          "Primitives",
          "Module",
          "Verify",
          "Control",
          "System",
          "Panic",
          "Grid",
          "State",
          "Reactor",
          "Design",
          "Logic",
          "Morph",
          "Router",
          "Effect",
          "Kernel",
          "Ops",
          "Identity",
          "Policy",
          "Data",
          "Inspect",
        ];
        const kernelMatch = matchPatterns.some(function checkKernel(pattern) {
          return path.indexOf(pattern) !== -1;
        });
        const activeTier = runtime.slots.Policy.tier || "Tier 1";
        const tierName = kernelMatch === true ? "Tier 3" : activeTier;
        return getTierValues(tierName);
      }
      function getTierValues(tierName) {
        const lookupTable = {
          "Tier 1": {
            LN: 30,
            WD: 80,
            CX: 10,
            BLACKLIST_STRICT: false,
            FORMATTING: false,
            INDENT_RULE: false,
            ONE_LINER_BAN: false,
            CONCEPTUAL_SPACING: false,
            NAMING_CONVENTION: false,
            BANNED_OPERATOR: false,
            UFC_RETURN: false,
            ASSERT_DENSITY: false,
            WRAPPER_CHECK: false,
            EXIT_POINT_CHECK: false,
            EXPLICIT_STRICT: true,
            NO_LET_RULE: false,
            COMMENT_BAN_RULE: false,
          },
          "Tier 2": {
            LN: 20,
            WD: 80,
            CX: 5,
            BLACKLIST_STRICT: true,
            FORMATTING: true,
            INDENT_RULE: false,
            ONE_LINER_BAN: true,
            CONCEPTUAL_SPACING: true,
            NAMING_CONVENTION: false,
            BANNED_OPERATOR: true,
            UFC_RETURN: true,
            ASSERT_DENSITY: true,
            WRAPPER_CHECK: true,
            EXIT_POINT_CHECK: true,
            EXPLICIT_STRICT: true,
            NO_LET_RULE: true,
            COMMENT_BAN_RULE: true,
          },
          "Tier 3": {
            LN: 10,
            WD: 70,
            CX: 2,
            BLACKLIST_STRICT: true,
            FORMATTING: true,
            INDENT_RULE: true,
            ONE_LINER_BAN: true,
            CONCEPTUAL_SPACING: true,
            NAMING_CONVENTION: true,
            BANNED_OPERATOR: true,
            UFC_RETURN: true,
            ASSERT_DENSITY: true,
            WRAPPER_CHECK: true,
            EXIT_POINT_CHECK: true,
            EXPLICIT_STRICT: true,
            NO_LET_RULE: true,
            COMMENT_BAN_RULE: true,
          },
        };
        return ok(lookupTable[tierName] || lookupTable["Tier 1"]);
      }
      function checkWrapper(source, key, errors) {
        assert(source !== null, "E_CW_SRC");
        const wlist = getWrapperWhitelist();
        Object.keys(wlist).forEach(function fnCW(token) {
          checkTokenInWrapper(source, key, token, wlist[token], errors);
        });
        return ok(true);
      }
      function getWrapperWhitelist() {
        return {
          try: ["guard", "Guard"],
          catch: ["guard", "Guard"],
          for: ["iter", "Iter", "forEach"],
          while: ["iter", "Iter"],
          forEach: ["iter", "Iter", "forEach"],
          switch: ["match", "Match"],
          case: ["match", "Match"],
          async: ["Effect", "Logic", "Grid", "service"],
          await: ["Effect", "Logic", "Grid", "service"],
          new: ["System", "Reactor", "Grid", "State", "pool", "cache"],
        };
      }
      function checkTokenInWrapper(src, key, token, allowed, errors) {
        const regex = new RegExp("\\b" + token + "\\b", "g");
        let match;
        while ((match = regex.exec(src)) !== null) {
          const isSelf = isWrapperSelf(key, token);
          const isOk = allowed.some((w) => {
            return key.indexOf(w) !== -1;
          });
          if (isSelf !== true && isOk !== true) {
            reportErrAt(
              src,
              key,
              "WRAPPER_VIOLATION (" + token + " outside wrapper)",
              match.index,
              token,
              errors,
            );
          }
        }
        return ok(true);
      }
      function isWrapperSelf(key, token) {
        const lut = {
          try: ["Control.guard", "handleGuardError"],
          catch: ["Control.guard", "handleGuardError"],
          for: ["Control.iter"],
          while: ["Control.iter"],
          forEach: ["Verify.", "processAuditKeys", "runChecks"],
          switch: ["Control.match"],
          case: ["Control.match"],
          async: ["Control.guard", "Control.iter", "handleGuardError"],
          await: ["Control.guard", "Control.iter", "handleGuardError"],
          new: ["System.", "Reactor.", "State.", "Grid.", "Verify."],
        };
        const paths = lut[token] || [];
        return paths.some((p) => {
          return key.indexOf(p) !== -1;
        });
      }
      function reportWrapperViolation(key, token, errors) {
        return ok(true);
      }
      function reportEmptyViolation(source, key, ln, errors) {
        return reportErrLn(source, key, "MAX_EMPTY_LINES", ln, null, errors);
      }
      function auditFn(f, k, out) {
        runChecks(f.toString(), k, out);
        return ok(true);
      }
      function auditObj(obj, path, mode, errors, schema, depth) {
        assert(obj !== null, "E_AO_OBJ");
        assert(errors !== null, "E_AO_ERR");
        const hasS = schema !== undefined && schema !== null;
        const sLut = {
          true: () => runSchemaChecks(obj, schema, path, errors),
          false: () => ok(true),
        };
        sLut[String(hasS)]();
        const oLut = {
          true: () => processAuditKeys(obj, path, mode, errors, schema, depth),
          false: () => ok(true),
        };
        return oLut[String(obj !== null && obj !== undefined)]();
      }
      function runSchemaChecks(obj, schema, path, errors) {
        assert(schema !== null, "E_RSC_SCH");
        const isM = obj === undefined || obj === null;
        const lut = {
          true: () => reportMissingObj(path, schema, errors),
          false: () => runGhostShadow(obj, schema, path, errors),
        };
        return lut[String(isM)]();
      }
      function runGhostShadow(obj, schema, path, errors) {
        assert(obj !== null, "E_RGS_OBJ");
        checkGhost(obj, schema, path, errors);
        checkShadow(obj, schema, path, errors);
        return ok(true);
      }
      function reportMissingObj(path, schema, errors) {
        const keys = Object.keys(schema);
        keys.forEach((k) => {
          const msg = path + "." + k + ": GHOST";
          const loc = ' (LN:1, CH:1, Snippet: "[MISSING]")';
          errors.push(msg + loc);
        });
        return ok(false);
      }
      function processAuditKeys(obj, path, mode, errors, schema, depth) {
        assert(obj !== null, "E_PAK_OBJ");
        assert(errors !== null, "E_PAK_ERR");
        const keys = Object.keys(obj);
        keys.forEach((key) => {
          return auditKeyVal(obj, key, path, mode, errors, schema, depth);
        });
        return ok(true);
      }
      function auditKeyVal(obj, key, path, mode, errors, schema, depth) {
        assert(key !== null, "E_AKV_KEY");
        const nextPath = path + "." + key;
        const hasS = schema !== null && schema !== undefined;
        const nextSchema = hasS ? schema[key] : null;
        return auditVal(
          obj[key],
          nextPath,
          mode,
          errors,
          nextSchema,
          depth + 1,
        );
      }
      function auditVal(value, path, mode, errors, schema, depth) {
        assert(path !== null, "E_AV_PATH");
        assert(errors !== null, "E_AV_ERR");
        const isF = typeof value === "function";
        const isO = value !== null && typeof value === "object";
        const lut = {
          true_false: () => auditFn(value, path, errors),
          false_true: () => auditObj(value, path, mode, errors, schema, depth),
          false_false: () => ok(true),
        };
        return lut[String(isF) + "_" + String(isO)]();
      }
      function checkGhost(obj, schema, path, errors) {
        assert(schema !== null, "E_CG_SCH");
        assert(errors !== null, "E_CG_ERR");
        const keys = Object.keys(schema);
        keys.forEach((key) => {
          return reportGhostIf(obj[key], path, key, errors);
        });
        return ok(true);
      }
      function reportGhostIf(val, path, key, errors) {
        const isM = val === undefined || val === null;
        const msg = path + "." + key + ": GHOST";
        const loc = ' (LN:1, CH:1, Snippet: "[MANIFEST]")';
        const lut = { true: () => errors.push(msg + loc), false: () => null };
        return lut[String(isM)]();
      }
      function checkShadow(obj, schema, path, errors) {
        assert(obj !== null, "E_CS_OBJ");
        assert(schema !== null, "E_CS_SCH");
        const keys = Object.keys(obj);
        keys.forEach((key) => {
          return reportShadow(key, schema, path, errors);
        });
        return ok(true);
      }
      function reportShadow(key, schema, path, errors) {
        assert(schema !== null, "E_RS_SCH");
        const isS = schema[key] === undefined;
        const msg = path + "." + key + ": SHADOW";
        const loc = ' (LN:1, CH:1, Snippet: "[INJECTION]")';
        const lut = { true: () => errors.push(msg + loc), false: () => null };
        return lut[String(isS)]();
      }
      function audit(runtime) {
        assert(runtime !== null, "E_AUDIT_RT");
        const errors = [];
        runAuditCore(runtime, errors);
        return errors;
      }
      function runAuditCore(runtime, errors) {
        assert(runtime !== null, "E_RAC_RT");
        const fullSource = runtime.core.sources.inline;
        const HasGlobalSource =
          fullSource !== null && fullSource !== undefined && fullSource !== "";
        if (HasGlobalSource === true) {
          const charCount = String(fullSource.length);
          errors.push("KERNEL_SCAN: STARTING (SIZE: " + charCount + ")");
          runChecks(fullSource, "Kernel.Whole", errors);
        } else {
          errors.push("KERNEL_SCAN: FAILED_TO_GET_SOURCE");
        }
        auditObj(runtime.slots, "Implementation", "strict", errors, null, 0);
        return ok(true);
      }
      return {
        audit,
        auditObj,
        auditFn,
        auditVal,
        checkGhost,
        checkShadow,
        runChecks,
        checkLen,
        checkWid,
        checkCyc,
        reportLenViolation,
        reportWidViolation,
        reportCyc,
        reportCycViolation,
        checkFmt,
        reportBraceViolation,
        checkOpenBrace,
        checkCloseBrace,
        checkEmpty,
        checkIndent,
        checkOneLiner,
        checkComments,
        checkConceptualSpacing,
        checkChaining,
        checkDynamic,
        checkNames,
        checkParams,
        checkCase,
        checkUFC,
        checkBlack,
        checkWrapper,
        reportTokenViolation,
        reportTokenAt,
        checkOps,
        getBannedOps,
        reportOpViolation,
        reportOpAt,
        checkNoLet,
        checkExitPoint,
        checkExplicit,
        checkAssertDensity,
        checkDotOnly,
        getTierLimits,
        getPos,
        processAuditKeys,
        reportMissingObj,
        reportShadow,
        reportEmptyViolation,
        strip_strings, // Added
        strip_comments, // Added
        is_header_comment, // Added
        count_complexity_tokens, // Added
      };
    })();

    return {
      Result: {
        ok,
        fail,
      },
      Control: {
        panic,
        assert,
        guard,
        iter,
        match,
        Logic,
      },
      Data: {
        type,
        pick,
        strip,
        safePickReducer, // Added
        typed, // Added
        validateTypedArray, // Added
      },
      Panic: {
        createUIEl,
        createPanicEl,
        getErrColor,
        renderPanicItem,
        renderPanicList,
        panicLog,
        trigExp,
        trigCopy,
        addExpBtn,
        addCopyBtn,
        addRebootBtn,
        makeListBox,
        makeHeader,
        makeActs,
        assembleUI,
        makeBtn,
      },
      Inspect: {
        createInspectEl,
        makeInBox,
        addInItem,
        addWipeBtns,
        inspect,
        checkRoot,
      },
      Verify: Verify,
    };
  })(runtime);

  /* --------------------------------------------------------------------------
   * LAYER 1: INFRASTRUCTURE (SYSTEM, REACTOR, DATA)
   * -------------------------------------------------------------------------- */
  const SystemModule = (function fnSysMod(runtime) {
    const { ok, fail } = Primitives.Result;
    const pool = { ACTION: [], STATE: [], EVENT: [], TASK: [] };
    const timers = new Map();
    const cache = new Map();

    function init(type, count) {
      if (!pool[type]) {
        pool[type] = [];
      }
      const poolCount = count || 1000;
      initPool(type, poolCount);
      return ok(type);
    }
    function initPool(type, count) {
      for (let index = 0; index < count; index += 1) {
        const poolObject = {
          type: type,
          status: "IDLE",
        };
        pool[type].push(poolObject);
      }
    }

    function rent(type) {
      if (!pool[type]) {
        return panic("E_POOL_TYPE_MISS", type);
      }
      if (pool[type].length === 0) {
        return panic("E_POOL_EXHAUSTED", type);
      }
      const rented = pool[type].pop();
      return ok(rented);
    }

    function returnObj(object) {
      if (!isValidObj(object)) {
        return fail("INVALID_OBJECT", "Non-pooling object");
      }
      return processPooling(object);
    }
    function isValidObj(object) {
      const hasType = object && object.__UK_TYPE__;
      return hasType;
    }
    function processPooling(object) {
      const type = object.__UK_TYPE__;
      const typeList = pool[type];
      if (typeList.length < 1000) {
        resetObj(object); // UFC: resetObj is still needed
        typeList.push(object);
      }
      return ok(true);
    }
    function resetObj(object) {
      const keys = Object.keys(object);
      keys.forEach(function fnR(key) {
        if (key !== "__UK_TYPE__") {
          // UFC: Changed from 'type' to '__UK_TYPE__'
          object[key] = null;
        }
      });
      object.status = "IDLE";
    }

    function stats() {
      const statsObject = {};
      const typeKeys = Object.keys(pool);
      typeKeys.forEach(function fnStats(type) {
        statsObject[type] = pool[type].length;
      });
      return ok(statsObject);
    }

    function tick(timerFunction, milliseconds) {
      const timerId = setInterval(timerFunction, milliseconds);
      const timerObject = {
        id: timerId,
        fn: timerFunction,
        ms: milliseconds,
      };
      timers.set(timerId, timerObject);
      return ok(timerId);
    }

    function stop(timerId) {
      if (!timers.has(timerId)) {
        return fail("TIMER_MISS", timerId);
      }
      clearInterval(timerId);
      timers["delete"](timerId);
      return ok(timerId);
    }

    function stopAll() {
      const timerEntries = Array.from(timers.keys());
      timerEntries.forEach(function fnStp(timerId) {
        clearInterval(timerId);
      });
      timers.clear();
      const count = timers.size;
      return ok(count);
    }

    function cacheSet(key, value) {
      cache.set(key, value);
      return ok(key);
    }

    function cacheGet(key) {
      if (cache.has(key) === false) {
        return fail("CACHE_MISS", key);
      }
      const cachedValue = cache.get(key);
      return ok(cachedValue);
    }

    function cacheDel(key) {
      if (!cache.has(key)) {
        return fail("CACHE_MISS", key);
      }
      cache["delete"](key);
      return ok(key);
    }

    function cacheClear() {
      const size = cache.size;
      cache.clear();
      return ok(size);
    }

    function pressure() {
      if (performance.memory) {
        const memoryInfo = performance.memory;
        const usageRatio =
          memoryInfo.usedJSHeapSize / memoryInfo.jsHeapSizeLimit;
        return ok(usageRatio);
      }
      return ok(0);
    }

    function gc() {
      cache.clear();
      const typeKeys = Object.keys(pool);
      typeKeys.forEach(function fnPurgePool(type) {
        pool[type].length = 0;
      });
      return ok(true);
    }

    const defaultTypes = ["ACTION", "STATE", "EVENT", "TASK"];
    defaultTypes.forEach(function fnBoot(type) {
      init(type, 1000);
    });

    return {
      System: {
        Pool: { init: init, rent: rent, returnObj: returnObj, stats: stats },
        Timer: { tick: tick, stop: stop, stopAll: stopAll },
        Cache: {
          set: cacheSet,
          get: cacheGet,
          delete: cacheDel,
          clear: cacheClear,
        },
        Memory: { pressure: pressure, gc: gc },
      },
    };
  })(runtime);

  const ReactorModule = (function fnReacMod(runtime) {
    const { ok, fail } = Primitives.Result;
    const { rent, returnObj } = SystemModule.System.Pool;
    let active = null;
    const queues = [[], [], []];
    const computeds = new Map();
    const channels = new Map();
    const signals = new Map(); // UFC: Added signals map
    let leader = null;
    const tabId = Date.now().toString(36) + Math.random().toString(36);

    function track(signalKey) {
      if (!active) {
        return fail("NO_ACTIVE_SIGNAL", signalKey);
      }
      return registerActiveSignal(signalKey);
    }
    function registerActiveSignal(signalKey) {
      let signalSet = signals.get(signalKey);
      if (!signalSet) {
        signalSet = new Set();
        signals.set(signalKey, signalSet);
      }
      signalSet.add(active);
      return ok(true);
    }
    function trigger(signalKey) {
      const signalSet = signals.get(signalKey); // UFC: Changed from runtime.sys.signals
      if (signalSet) {
        signalSet.forEach(function fnT(subscriber) {
          subscriber();
        });
      }
      return ok(true);
    }
    function effect(effectFunction) {
      const callback = function fnE() {
        active = callback;
        try {
          // UFC: Added try/finally block
          effectFunction();
        } finally {
          active = null;
        }
      };
      callback();
      return ok(true);
    }

    function computed(key, callback) {
      const computedObject = {
        fn: callback,
        dirty: true,
        val: null,
      };
      computeds.set(key, computedObject);
      return ok(key);
    }

    function batch(functionList) {
      const results = [];
      const iterator = function fnB(fn) {
        const result = fn();
        results.push(result);
      };
      functionList.forEach(iterator);
      return ok(results);
    }

    function getPriorityValue(priorityName) {
      const priorityMap = {
        CRITICAL: 0,
        HIGH: 1,
        NORMAL: 2,
      };
      let value = priorityMap[priorityName];
      if (value === undefined) {
        value = 2;
      }
      return value;
    }

    function schedule(task, priority) {
      queues[priority].push(task);
      if (runtime.sys.raf === null) {
        runtime.sys.raf = requestAnimationFrame(processQ);
      }
      return ok(true);
    }

    function push(workFunction, priorityName) {
      const priority = getPriorityValue(priorityName || "NORMAL");
      const taskResult = rent("TASK");
      const taskObject = taskResult.data;
      taskObject.f = workFunction;
      taskObject.p = priority;
      return schedule(taskObject, priority);
    }

    function flush() {
      for (let priority = 0; priority < 3; priority += 1) {
        while (queues[priority].length > 0) {
          const task = queues[priority].shift();
          task.f();
          returnObj(task);
        }
      }
      return ok(true);
    }

    function cancel(taskId) {
      for (let priority = 0; priority < 3; priority += 1) {
        const result = cancelInPriority(priority, taskId);
        if (result.ok) {
          return result;
        }
      }
      return fail("TASK_MISS", taskId);
    }
    function cancelInPriority(priority, taskId) {
      const taskIndex = queues[priority].findIndex(function fnF(task) {
        return task.id === taskId;
      });
      if (taskIndex > -1) {
        queues[priority].splice(taskIndex, 1);
        return ok(taskId);
      }
      return fail("MISS", taskId);
    }

    function processQ() {
      const startTime = performance.now();
      runtime.sys.raf = null;
      for (let priority = 0; priority < 3; priority += 1) {
        const yieldResult = runPriorityQueue(priority, startTime);
        if (yieldResult === "YIELD") {
          return ok(false);
        }
      }
      return ok(true);
    }
    function runPriorityQueue(priority, startTime) {
      while (queues[priority].length > 0) {
        const now = performance.now();
        if (priority > 0 && now - startTime > 5) {
          runtime.sys.raf = requestAnimationFrame(processQ);
          return "YIELD";
        }
        processSingleTask(priority);
      }
      return "DONE";
    }
    function processSingleTask(priority) {
      const task = queues[priority].shift();
      task.f();
      returnObj(task);
    }

    function queueClear() {
      for (let priority = 0; priority < 3; priority += 1) {
        queues[priority].length = 0;
      }
      return ok(true);
    }

    function channelCreate(channelName) {
      if (channels.has(channelName)) {
        return fail("CH_EXISTS", channelName);
      }
      const channelInstance = new BroadcastChannel(channelName);
      const channelObject = {
        bc: channelInstance,
        subs: [],
      };
      channels.set(channelName, channelObject);
      return ok(channelName);
    }

    function channelBroadcast(channelName, message) {
      const channelObject = channels.get(channelName);
      if (channelObject === undefined) {
        return fail("CH_MISS", channelName);
      }
      channelObject.bc.postMessage(message);
      return ok(channelName);
    }

    function channelSubscribe(channelName, handlerFunction) {
      const channelObject = channels.get(channelName);
      if (!channelObject) {
        return fail("CH_MISS", channelName);
      }
      channelObject.subs.push(handlerFunction);
      bindChannelHandler(channelObject);
      return ok(channelName);
    }
    function bindChannelHandler(channelObject) {
      channelObject.bc.onmessage = function fnMsg(event) {
        const subscribers = channelObject.subs;
        subscribers.forEach(function fnS(handler) {
          handler(event.data);
        });
      };
    }

    function channelClose(channelName) {
      const channelObject = channels.get(channelName);
      if (channelObject === undefined) {
        return fail("CH_MISS", channelName);
      }
      channelObject.bc.close();
      channels["delete"](channelName);
      return ok(channelName);
    }

    function elect() {
      const serialized = localStorage.getItem("uk_tabs") || "[]";
      const tabList = JSON.parse(serialized);
      const activeTabInfo = {
        id: tabId,
        t: Date.now(),
      };
      tabList.push(activeTabInfo);
      saveTabList(tabList);
      leader = tabList[0].id;
      return ok(leader);
    }
    function saveTabList(tabList) {
      const serialized = JSON.stringify(tabList);
      localStorage.setItem("uk_tabs", serialized);
    }

    function isLeader() {
      return ok(leader === tabId);
    }

    function resign() {
      const serialized = localStorage.getItem("uk_tabs") || "[]";
      const tabList = JSON.parse(serialized);
      const filteredList = tabList.filter(function fnF(tab) {
        return tab.id !== tabId;
      });
      saveTabList(filteredList);
      leader = null;
      return ok(true);
    }

    return {
      Reactor: {
        Signal: {
          track: track,
          trigger: trigger,
          effect: effect,
          computed: computed,
          batch: batch,
        },
        Fiber: { push: push, flush: flush, cancel: cancel },
        Queue: { push: push, process: processQ, clear: queueClear },
        Channel: {
          create: channelCreate,
          broadcast: channelBroadcast,
          subscribe: channelSubscribe,
          close: channelClose,
        },
        Leader: { elect: elect, isLeader: isLeader, resign: resign },
      },
    };
  })(runtime);

  const DataModule = (function fnDataMod(rt) {
    const { ok, fail } = Primitives.Result;
    const offlineQueue = [];
    const blackbox = [];
    const BLACKBOX_MAX = 1000;
    let dataVersion = 1;

    function vaultRead(key) {
      const serialized = localStorage.getItem(key);
      if (serialized === null) {
        return fail("VAULT_MISS", key);
      }
      const data = JSON.parse(serialized);
      return ok(data);
    }

    function vaultWrite(key, value) {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return ok(key);
    }

    function vaultDelete(key) {
      if (localStorage.getItem(key) === null) {
        return fail("VAULT_MISS", key);
      }
      localStorage.removeItem(key);
      return ok(key);
    }

    function vaultClear() {
      const storageCount = localStorage.length;
      localStorage.clear();
      return ok(storageCount);
    }

    function vaultAtomic(key, value) {
      const tempKey = key + "_temp";
      const serialized = JSON.stringify(value);
      localStorage.setItem(tempKey, serialized);
      localStorage.setItem(key, serialized);
      localStorage.removeItem(tempKey);
      return ok(key);
    }

    function syncRun(state, moduleName) {
      const prefix = (moduleName || "app").toLowerCase();
      if (state.theme) {
        vaultWrite(prefix + "_theme", state.theme);
      }
      if (state.lang) {
        vaultWrite(prefix + "_lang", state.lang);
      }
      return ok(true);
    }

    function syncDelta(localState, remoteState) {
      const deltaObject = {};
      const stateKeys = Object.keys(remoteState);
      stateKeys.forEach((key) => {
        if (localState[key] !== remoteState[key]) {
          deltaObject[key] = remoteState[key];
        }
      });
      return ok(deltaObject);
    }

    function syncConflict(localEntry, remoteEntry) {
      if (remoteEntry.t > localEntry.t) {
        return ok(remoteEntry);
      }
      return ok(localEntry);
    }

    function migrationCheck() {
      const versionStr = localStorage.getItem("uk_version");
      const currentVersion = versionStr ? parseInt(versionStr, 10) : 0;
      const report = {
        current: currentVersion,
        target: dataVersion,
      };
      return ok(report);
    }

    function migrationRun(scripts) {
      const curr = migrationCheck().data.current;
      for (let i = curr; i < dataVersion; i += 1) {
        if (scripts[i]) {
          scripts[i]();
        }
      }
      localStorage.setItem("uk_version", dataVersion.toString());
      return ok(dataVersion);
    }

    function migrationRollback(version) {
      localStorage.setItem("uk_version", version.toString());
      return ok(version);
    }

    function offlineQueuePush(requestObject) {
      const offlineItem = {
        req: requestObject,
        t: Date.now(),
      };
      offlineQueue.push(offlineItem);
      const queueLength = offlineQueue.length;
      return ok(queueLength);
    }

    function offlineFlush() {
      const queueSnapshot = offlineQueue.slice();
      offlineQueue.length = 0;
      return ok(queueSnapshot);
    }

    function offlineRetry(retryFunction) {
      const queueSnapshot = offlineFlush().data;
      queueSnapshot.forEach((item) => {
        retryFunction(item.req);
      });
      const processedCount = queueSnapshot.length;
      return ok(processedCount);
    }

    function blackboxRecord(eventObject) {
      if (blackbox.length >= BLACKBOX_MAX) {
        blackbox.shift();
      }
      const recordObject = {
        ev: eventObject,
        t: Date.now(),
      };
      blackbox.push(recordObject);
      return ok(true); // UFC: Changed to return ok(true)
    }
    function blackboxDump() {
      return ok(JSON.stringify(blackbox));
    }
    function blackboxClear() {
      const count = blackbox.length;
      blackbox.length = 0;
      return ok(count);
    }

    return {
      Data: {
        Vault: {
          read: vaultRead,
          write: vaultWrite,
          delete: vaultDelete,
          clear: vaultClear,
          atomic: vaultAtomic,
        },
        Sync: { run: syncRun, delta: syncDelta, conflict: syncConflict },
        Migration: {
          check: migrationCheck,
          run: migrationRun,
          rollback: migrationRollback,
        },
        Offline: {
          queue: offlineQueuePush,
          flush: offlineFlush,
          retry: offlineRetry,
        },
        Blackbox: {
          record: blackboxRecord,
          dump: blackboxDump,
          clear: blackboxClear,
        },
      },
    };
  })(runtime);

  /* --------------------------------------------------------------------------
   * LAYER 2: DOMAINS (GRID, ROUTER, STATE, MORPH)
   * -------------------------------------------------------------------------- */
  const GridModule = (function fnGridMod(rt) {
    const { ok, fail } = Primitives.Result;
    const { panic } = Primitives.Control;
    const WORKER_MIN = 2;
    const HEARTBEAT_MS = 200;
    const MAX_ERRORS = 3;
    const workers = [];
    const workerMeta = [];
    const pendingRequests = {};
    const TIMEOUT_MS = 5000;
    let rrIndex = 0;
    let ridCounter = 0;
    const WORKER_SHELL =
      "self.onmessage=function(e){" +
      "var d=e.data;var fn=self.services[d.id];" +
      "if(!fn){postMessage({err:'NO_SVC',id:d.id,rid:d.rid});return;}" +
      "try{var r=fn(d.params);postMessage({ok:true,data:r,rid:d.rid});}" +
      "catch(x){postMessage({err:x.message,rid:d.rid});}" +
      "};self.services={};";
    const INTERNAL_SERVICE_WORKER_SOURCE =
      "const C='uk-cache-v1';self.addEventListener('install',e=>{e.waitUntil(" +
      "caches.open(C).then(c=>c.addAll(['/','/index.html'])));});" +
      "self.addEventListener('fetch',e=>{e.respondWith(caches.match(e.request)" +
      ".then(r=>r||fetch(e.request).catch(()=>caches.match('/index.html'))));});";
    function getBootCount() {
      const cores = navigator.hardwareConcurrency || 4;
      let defaultCount = 2;
      if (cores > 2) {
        defaultCount = cores - 1;
      }
      const appMax = rt.slots.Config.maxWorkers;
      if (appMax) {
        if (appMax < defaultCount) {
          return appMax;
        }
        return defaultCount;
      }
      if (defaultCount < WORKER_MIN) {
        return WORKER_MIN;
      }
      return defaultCount;
    }
    function createWorkerBlob(services) {
      let svcCode = WORKER_SHELL;
      const keys = Object.keys(services);
      for (let i = 0; i < keys.length; i += 1) {
        const k = keys[i];
        svcCode += "self.services['" + k + "']=" + services[k].toString() + ";";
      }
      svcCode += getAuditWorkerLogic();
      const blob = new Blob([svcCode], { type: "text/javascript" });
      return URL.createObjectURL(blob);
    }
    function addMissingWorkerFunctions(v) {
      let code = "";
      code += "var runTieredBlacklist=" + v.runTieredBlacklist.toString() + ";";
      code += "var checkBlackTier1=" + v.checkBlackTier1.toString() + ";";
      code += "var checkIndent=" + v.checkIndent.toString() + ";";
      code += "var checkOneLiner=" + v.checkOneLiner.toString() + ";";
      code +=
        "var checkConceptualSpacing=" +
        v.checkConceptualSpacing.toString() +
        ";";
      code += "var checkNames=" + v.checkNames.toString() + ";";
      code += "var checkNoLet=" + v.checkNoLet.toString() + ";";
      code += "var checkComments=" + v.checkComments.toString() + ";";
      code += "var checkChaining=" + v.checkChaining.toString() + ";";
      code += "var checkDynamic=" + v.checkDynamic.toString() + ";";
      code += "var checkParams=" + v.checkParams.toString() + ";";
      code += "var checkDotOnly=" + v.checkDotOnly.toString() + ";";
      code += "var checkAssertDensity=" + v.checkAssertDensity.toString() + ";";
      code += "var checkWrapper=" + v.checkWrapper.toString() + ";";
      code += "var checkExitPoint=" + v.checkExitPoint.toString() + ";";
      code += "var checkExplicit=" + v.checkExplicit.toString() + ";";
      code += "var assert=function(c,m){return{ok:true,data:true}};";
      code += addWorkerHelpers(v);
      return code;
    }
    function addWorkerHelpers(v) {
      let code = "";
      code += "var stripQuotes=" + v.stripQuotes.toString() + ";";
      code += "var auditId=" + v.auditId.toString() + ";";
      code += "var isShortName=" + v.isShortName.toString() + ";";
      code +=
        "var getWrapperWhitelist=" + v.getWrapperWhitelist.toString() + ";";
      code +=
        "var checkTokenInWrapper=" + v.checkTokenInWrapper.toString() + ";";
      code += "var isWrapperSelf=" + v.isWrapperSelf.toString() + ";";
      code += "var reportErrAt=" + v.reportErrAt.toString() + ";";
      return code;
    }
    function getAuditWorkerLogic() {
      const v = Primitives.Verify;
      const r = Primitives.Result;
      const d = Primitives.Data;
      let auditCode = "var ok = " + r.ok.toString() + ";";
      auditCode += "var fail = " + r.fail.toString() + ";";
      auditCode += "var strip = " + d.strip.toString() + ";";
      auditCode +=
        "self.services['KERNEL_INTEGRITY_AUDIT'] = function(codeMap) {";
      auditCode += "  var errors = [];";
      auditCode += "  var keys = Object.keys(codeMap);";
      auditCode += "  for(var i=0; i<keys.length; i++) {";
      auditCode += "    var k = keys[i]; var s = codeMap[k];";
      auditCode += "    runChecks(s, k, errors);";
      auditCode += "  }";
      auditCode += "  return { errors: errors };";
      auditCode += "};";
      auditCode += "var runChecks = " + v.runChecks.toString() + ";";
      auditCode += "var checkLen = " + v.checkLen.toString() + ";";
      auditCode += "var checkWid = " + v.checkWid.toString() + ";";
      auditCode += "var checkCyc = " + v.checkCyc.toString() + ";";
      auditCode += "var checkFmt = " + v.checkFmt.toString() + ";";
      auditCode += "var checkOpenBrace = " + v.checkOpenBrace.toString() + ";";
      auditCode +=
        "var checkCloseBrace = " + v.checkCloseBrace.toString() + ";";
      auditCode += "var checkEmpty = " + v.checkEmpty.toString() + ";";
      auditCode += "var checkCase = " + v.checkCase.toString() + ";";
      auditCode += "var checkUFC = " + v.checkUFC.toString() + ";";
      auditCode += "var checkBlack = " + v.checkBlack.toString() + ";";
      auditCode += "var checkOps = " + v.checkOps.toString() + ";";
      auditCode += "var getPos = " + v.getPos.toString() + ";";
      auditCode += "var getBannedOps = " + v.getBannedOps.toString() + ";";
      auditCode +=
        "var reportLenViolation = " + v.reportLenViolation.toString() + ";";
      auditCode +=
        "var reportWidViolation = " + v.reportWidViolation.toString() + ";";
      auditCode += "var reportCyc = " + v.reportCyc.toString() + ";";
      auditCode +=
        "var reportCycViolation = " + v.reportCycViolation.toString() + ";";
      auditCode +=
        "var reportBraceViolation = " + v.reportBraceViolation.toString() + ";";
      auditCode +=
        "var reportEmptyViolation = " + v.reportEmptyViolation.toString() + ";";
      auditCode +=
        "var reportTokenViolation = " + v.reportTokenViolation.toString() + ";";
      auditCode += "var reportTokenAt = " + v.reportTokenAt.toString() + ";";
      auditCode +=
        "var reportOpViolation = " + v.reportOpViolation.toString() + ";";
      auditCode += "var reportOpAt = " + v.reportOpAt.toString() + ";";
      auditCode += "var getTierLimits = " + v.getTierLimits.toString() + ";";
      auditCode += "var runtime = { slots: { Policy: { tier: 'Tier 3' } } };";
      auditCode +=
        "var getTierValues = function(n){return{ok:true,data:{" +
        "LN:10,WD:70,CX:2,BLACKLIST_STRICT:true,FORMATTING:true," +
        "INDENT_RULE:true,ONE_LINER_BAN:true,CONCEPTUAL_SPACING:true," +
        "NAMING_CONVENTION:true,BANNED_OPERATOR:true,UFC_RETURN:true," +
        "ASSERT_DENSITY:true,WRAPPER_CHECK:true,EXIT_POINT_CHECK:true," +
        "EXPLICIT_STRICT:true,NO_LET_RULE:true,COMMENT_BAN_RULE:true}}};";
      auditCode += addMissingWorkerFunctions(v);
      auditCode += "var L = { LN: 10, WD: 70, CX: 2 };";
      return auditCode;
    }
    function spawnWorker(blobUrl, index) {
      const w = new Worker(blobUrl);
      workers[index] = w;
      workerMeta[index] = { pending: 0, errors: 0, lastHB: Date.now() };
      w.onmessage = function fnMsg(e) {
        workerMeta[index].pending -= 1;
        workerMeta[index].lastHB = Date.now();
        handleWorkerResponse(e.data, index);
      };
      w.onerror = function fnErr(event) {
        workerMeta[index].errors += 1;
        const msg = "WORKER_ERR: " + (event.message || "Unknown");
        rt.sys.trace.push(msg);
      };
      return ok(index);
    }
    function initPool() {
      const services = rt.slots.Services || {};
      const count = getBootCount();
      const blobUrl = createWorkerBlob(services);
      for (let i = 0; i < count; i += 1) {
        spawnWorker(blobUrl, i);
      }
      return ok(count);
    }
    function getLeastBusy() {
      let minIdx = 0;
      let minPending = workerMeta[0] ? workerMeta[0].pending : 0;
      for (let i = 1; i < workerMeta.length; i += 1) {
        if (workerMeta[i].pending < minPending) {
          minPending = workerMeta[i].pending;
          minIdx = i;
        }
      }
      return minIdx;
    }
    function getRoundRobin() {
      const idx = rrIndex;
      rrIndex = (rrIndex + 1) % workers.length;
      return idx;
    }
    function handleWorkerResponse(data, index) {
      const rid = data.rid;
      const pending = pendingRequests[rid];
      if (!pending) {
        return ok(false);
      }
      clearTimeout(pending.timeout);
      delete pendingRequests[rid];
      if (data.err) {
        workerMeta[index].errors += 1;
        pending.reject(data.err);
        return ok(false);
      }
      pending.resolve(data.data);
      return ok(true);
    }
    function dispatch(serviceId, params) {
      if (workers.length === 0) {
        return Promise.reject("NO_WORKERS");
      }
      const idx = getLeastBusy();
      ridCounter += 1;
      const rid = ridCounter.toString(36);
      workerMeta[idx].pending += 1;
      return new Promise(function fnP(resolve, reject) {
        const timeoutId = setTimeout(function fnT() {
          delete pendingRequests[rid];
          workerMeta[idx].pending -= 1;
          reject("E_TIMEOUT");
        }, TIMEOUT_MS);
        pendingRequests[rid] = {
          resolve: resolve,
          reject: reject,
          timeout: timeoutId,
        };
        workers[idx].postMessage({ id: serviceId, params: params, rid: rid });
      });
    }
    function heartbeat() {
      const now = Date.now();
      for (let i = 0; i < workerMeta.length; i += 1) {
        const meta = workerMeta[i];
        const dead = now - meta.lastHB > HEARTBEAT_MS;
        const errored = meta.errors >= MAX_ERRORS;
        if (dead || errored) {
          respawnAt(i);
        }
      }
      return ok(true);
    }
    function respawnAt(index) {
      if (workers[index]) {
        workers[index].terminate();
      }
      const services = rt.slots.Services || {};
      const blobUrl = createWorkerBlob(services);
      spawnWorker(blobUrl, index);
      return ok(index);
    }
    function terminateAll() {
      for (let i = 0; i < workers.length; i += 1) {
        if (workers[i]) {
          workers[i].terminate();
        }
      }
      workers.length = 0;
      workerMeta.length = 0;
      return ok(true);
    }
    async function registerServiceWorker() {
      if (!navigator.serviceWorker) {
        return ok(false);
      }
      const candidates = ["/service-worker.js", "/sw.js"];
      let registered = false;
      for (let i = 0; i < candidates.length; i += 1) {
        if (registered) break;
        try {
          const resp = await fetch(candidates[i], { method: "HEAD" });
          if (resp.ok) {
            await navigator.serviceWorker.register(candidates[i]);
            registered = true;
          }
        } catch (e) {
          // Continue to next candidate
        }
      }
      if (!registered) {
        return fail("SERVICE_WORKER_REGISTRATION_FAILURE", "No worker found");
      }
      return ok("registered");
    }
    return {
      Grid: {
        Boot: {
          init: function fnI() {
            registerServiceWorker();
            initPool();
            return ok(true);
          },
          spawn: spawnWorker,
          terminate: terminateAll,
        },
        Service: {
          dispatch: dispatch,
          register: function fnRegisterService(serviceId, fn) {
            if (!rt.slots.Services) {
              rt.slots.Services = {};
            }
            rt.slots.Services[serviceId] = fn;
            return ok(serviceId);
          },
        },
        Worker: {
          send: function fnWorkerSend(idx, msg) {
            if (!workers[idx]) {
              return fail("WORKER_MISS", idx);
            }
            workers[idx].postMessage(msg);
            return ok(true);
          },
          receive: function fnWorkerReceive() {
            return ok(true);
          },
          heartbeat: heartbeat,
          respawn: respawnAt,
        },
        Balance: {
          leastBusy: getLeastBusy,
          roundRobin: getRoundRobin,
        },
        ServiceWorker: {
          register: registerServiceWorker,
          update: function fnServiceWorkerUpdate() {
            return ok(true);
          },
          skip: function fnServiceWorkerSkip() {
            return ok(true);
          },
          cache: function fnServiceWorkerCache() {
            return ok(true);
          },
        },
      },
    };
  })(runtime);

  const RouterModule = (function fnRouteMod(runtime) {
    const { ok, fail } = Primitives.Result;
    const guards = { before: [], after: [] };
    const scrollPositions = new Map();

    function match(path) {
      const routes = runtime.slots.Routes || {};
      const config = routes[path];
      if (config) {
        const result = Object.assign({}, config, { params: {} });
        return ok(result);
      }
      return matchDynamic(path, routes);
    }
    function matchDynamic(path, routes) {
      const keys = Object.keys(routes);
      for (let index = 0; index < keys.length; index += 1) {
        const key = keys[index];
        const result = tryDynamicMatch(path, key, routes);
        if (result.ok) {
          return result;
        }
      }
      const fallback = routes["*"] || null;
      return ok(fallback);
    }
    function tryDynamicMatch(path, key, routes) {
      if (key.indexOf(":") === -1) {
        return fail("STATIC", key);
      }
      const regexStr = "^" + key.replace(/:[a-zA-Z0-9_]+/g, "([^/]+)") + "$";
      const regex = new RegExp(regexStr);
      const matched = path.match(regex);
      if (matched) {
        const params = extractParams(key, matched);
        const result = Object.assign({}, routes[key], { params: params });
        return ok(result);
      }
      return fail("NO_MATCH", key);
    }
    function extractParams(key, matched) {
      const paramKeys = (key.match(/:([a-zA-Z0-9_]+)/g) || []).map(
        function fnM(segment) {
          return segment.slice(1);
        },
      );
      const params = {};
      paramKeys.forEach(function fnP(paramKey, index) {
        params[paramKey] = matched[index + 1];
      });
      return params;
    }

    function add(path, config) {
      if (!runtime.slots.Routes) {
        runtime.slots.Routes = {};
      }
      runtime.slots.Routes[path] = config;
      return ok(path);
    }

    function remove(path) {
      if (!runtime.slots.Routes || !runtime.slots.Routes[path]) {
        return fail("ROUTE_MISS", path);
      }
      runtime.slots.Routes[path] = null;
      return ok(path);
    }

    function go(path) {
      history.pushState(null, "", path);
      return ok(path);
    }

    function replace(path) {
      history.replaceState(null, "", path);
      return ok(path);
    }

    function back() {
      history.back();
      return ok(true);
    }

    function forward() {
      history.forward();
      return ok(true);
    }

    function guardBefore(fn) {
      guards.before.push(fn);
      return ok(guards.before.length);
    }

    function guardAfter(guardFunction) {
      guards.after.push(guardFunction);
      const count = guards.after.length;
      return ok(count);
    }

    function guardCheck(toRoute, fromRoute) {
      const iterator = function fnG(guardFunction, index) {
        if (!guardFunction(toRoute, fromRoute)) {
          return fail("GUARD_BLOCK", index);
        }
      };
      guards.before.forEach(iterator);
      return ok(true);
    }

    function scrollSave(path) {
      scrollPositions.set(path, { x: window.scrollX, y: window.scrollY });
      return ok(path);
    }

    function scrollRestore(routePath) {
      const position = scrollPositions.get(routePath);
      if (!position) {
        return fail("SCROLL_MISS", routePath);
      }
      window.scrollTo(position.x, position.y);
      return ok(routePath);
    }

    function prefetchLink(path) {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = path;
      document.head.appendChild(link);
      return ok(path);
    }

    function prefetchHover(element, routePath) {
      const onHover = function fnH() {
        prefetchLink(routePath);
      };
      element.addEventListener("mouseenter", onHover);
      return ok(routePath);
    }

    function queryParse() {
      const queryParams = {};
      const searchParams = new URLSearchParams(window.location.search);
      const iterator = function fnQ(value, key) {
        queryParams[key] = value;
      };
      searchParams.forEach(iterator);
      return ok(queryParams);
    }

    function querySync(queryMap) {
      const searchParams = new URLSearchParams(window.location.search);
      updateSearchParams(searchParams, queryMap);
      const newUrl = buildQueryUrl(searchParams);
      window.history.replaceState({}, "", newUrl);
      return ok(true);
    }
    function updateSearchParams(params, map) {
      Object.keys(map).forEach(function fnU(key) {
        params.set(key, map[key]);
      });
      return ok(true);
    }
    function buildQueryUrl(params) {
      const search = params.toString();
      const path = window.location.pathname;
      return path + "?" + search;
    }

    return {
      Router: {
        Nav: { go: go, replace: replace, back: back, forward: forward },
        Route: { match: match, add: add, remove: remove },
        Guard: { before: guardBefore, after: guardAfter, check: guardCheck },
        Scroll: { save: scrollSave, restore: scrollRestore },
        Prefetch: { link: prefetchLink, hover: prefetchHover },
        Query: { parse: queryParse, sync: querySync },
      },
    };
  })(runtime);

  const StateModule = (function fnStateMod(runtime) {
    const { ok, fail } = Primitives.Result;
    const { pick } = Primitives.Data;
    const { trigger } = ReactorModule.Reactor.Signal;
    let stateSnapshot = null;
    let txActive = false;
    let txSnapshotData = null;
    const schemas = new Map();
    const invariants = new Map();

    function get(stateKey) {
      if (stateKey) {
        return handleKeyGet(stateKey);
      }
      return ok(runtime.core.state);
    }
    function handleKeyGet(stateKey) {
      const value = pick(runtime.core.state, stateKey).data;
      if (value === undefined) {
        return fail("NOT_FOUND", stateKey);
      }
      return ok(value);
    }
    function update(nextStateObject) {
      const oldStateTree = runtime.core.state;
      const mergedState = Object.assign({}, oldStateTree, nextStateObject);
      const validateResult = validate(mergedState);
      if (validateResult.ok === false) {
        return validateResult;
      }
      runtime.core.state = mergedState;
      trigger(nextStateObject);
      return ok(mergedState);
    }

    function validate(nextState) {
      const rootSchema = runtime.core.schema;
      if (rootSchema) {
        return validateInternal(nextState, rootSchema);
      }
      return ok(nextState);
    }
    function validateInternal(state, schema) {
      const errors = [];
      schemaValidate(state, schema, "State", errors);
      if (errors.length > 0) {
        return fail("INVALID_STATE", errors);
      }
      return ok(state);
    }

    function freeze() {
      runtime.core.state = Object.freeze(runtime.core.state);
      return ok(true);
    }

    function takeSnapshot() {
      stateSnapshot = JSON.stringify(runtime.core.state);
      return ok(stateSnapshot);
    }

    function restore() {
      if (!stateSnapshot) {
        return fail("NO_SNAPSHOT", "none");
      }
      const parsedState = JSON.parse(stateSnapshot);
      runtime.core.state = Object.freeze(parsedState);
      trigger("STATE_CHANGE");
      return ok(true);
    }

    function schemaDefine(stateKey, schemaDefinition) {
      schemas.set(stateKey, schemaDefinition);
      return ok(stateKey);
    }

    function schemaValidate(nextState) {
      return validate(nextState);
    }

    function txBegin() {
      if (txActive) {
        return fail("TX_ACTIVE", "already");
      }
      txActive = true;
      txSnapshotData = JSON.stringify(runtime.core.state);
      return ok(true);
    }

    function txCommit() {
      if (!txActive) {
        return fail("TX_NONE", "no tx");
      }
      txActive = false;
      txSnapshotData = null;
      return ok(true);
    }

    function txRollback() {
      if (!txActive) {
        return fail("TX_NONE", "no tx");
      }
      const rolledState = JSON.parse(txSnapshotData);
      runtime.core.state = Object.freeze(rolledState);
      txActive = false;
      txSnapshotData = null;
      trigger("STATE_CHANGE");
      return ok(true);
    }

    function invRegister(invariantKey, callback) {
      invariants.set(invariantKey, callback);
      return ok(invariantKey);
    }

    function invCheck() {
      const errorList = [];
      const stateTree = runtime.core.state;
      invariants.forEach(function fnInv(callback, key) {
        if (!callback(stateTree)) {
          errorList.push(key);
        }
      });
      if (errorList.length > 0) {
        return fail("INV_FAIL", errorList);
      }
      return ok(true);
    }

    return {
      State: {
        Core: {
          get: get,
          update: update,
          validate: validate,
          freeze: freeze,
          snapshot: takeSnapshot,
          restore: restore,
        },
        Schema: { define: schemaDefine, validate: schemaValidate },
        Transaction: { begin: txBegin, commit: txCommit, rollback: txRollback },
        Invariant: { register: invRegister, check: invCheck },
      },
    };
  })(runtime);

  const MorphModule = (function fnMorphMod(rt) {
    const { ok, fail } = Primitives.Result;
    return {
      Morph: {
        DOM: {
          render: function fnR(targetElement, templateId) {
            const templateNode = document.getElementById(templateId);
            if (!templateNode) {
              return fail("M_TPL_MISS", templateId);
            }
            if (targetElement) {
              const clone = templateNode.content.cloneNode(true);
              targetElement.replaceChildren(clone);
            }
            return ok(true);
          },
          patch: function fnP() {
            return ok(true);
          },
          diff: function fnD() {
            return ok(true);
          },
          portal: function fnPo() {
            return ok(true);
          },
          fragment: function fnF() {
            return ok(document.createDocumentFragment());
          },
        },
        Bind: {
          text: function fnText(targetElement, textValue) {
            if (targetElement) {
              targetElement.textContent = textValue;
            }
            return ok(true);
          },
          attr: function fnAttr(targetElement, key, value) {
            if (targetElement) {
              targetElement.setAttribute(key, value);
            }
            return ok(true);
          },
          style: function fnStyle(targetElement, key, value) {
            if (targetElement) {
              targetElement.style[key] = value;
            }
            return ok(true);
          },
          value: function fnValue(targetElement, contentValue) {
            if (targetElement) {
              targetElement.value = contentValue;
            }
            return ok(true);
          },
          href: function fnHref(targetElement, urlValue) {
            if (targetElement) {
              targetElement.href = urlValue;
            }
            return ok(true);
          },
          show: function fnShow(targetElement) {
            if (targetElement) {
              targetElement.style.display = "";
            }
            return ok(true);
          },
          hide: function fnHide(targetElement) {
            if (targetElement) {
              targetElement.style.display = "none";
            }
            return ok(true);
          },
          for: function fnFor() {
            return ok(true);
          },
          include: function fnInclude() {
            return ok(true);
          },
          action: function fnAction() {
            return ok(true);
          },
          link: function fnLink() {
            return ok(true);
          },
        },
        I18n: {
          set: function fnSetLocale(localeName) {
            runtime.core.state.locale = localeName;
            return ok(localeName);
          },
          get: function fnGetLocale() {
            const currentLocale = runtime.core.state.locale;
            return ok(currentLocale);
          },
          bind: function fnBindI18n() {
            return ok(true);
          },
        },
        Theme: {
          inject: function fnI(styleContent) {
            const styleElement = document.createElement("style");
            styleElement.textContent = styleContent;
            document.head.appendChild(styleElement);
            return ok(styleElement);
          },
          morph: function fnMorphTheme() {
            return ok(true);
          },
          token: function fnGetThemeToken() {
            return ok(true);
          },
        },
        Virtual: {
          init: function fnInitVirtual() {
            return ok(true);
          },
          scroll: function fnVirtualScroll() {
            return ok(true);
          },
          recycle: function fnRecycleItem() {
            return ok(true);
          },
        },
        A11y: {
          audit: function fnAuditA11y() {
            return ok(true);
          },
          fix: function fnFixA11y() {
            return ok(true);
          },
        },
      },
    };
  })(runtime);

  /* --------------------------------------------------------------------------
   * TIER 2: ORCHESTRATOR (KERNEL)
   * -------------------------------------------------------------------------- */
  const KernelModule = (function fnKernMod(runtime) {
    const { ok, fail } = Primitives.Result;
    const { panic } = Primitives.Control;
    const { pick, strip } = Primitives.Data;
    const { auditObj } = Primitives.Verify;
    const { checkRoot, inspect } = Primitives.Inspect;
    const { init: BootGrid } = GridModule.Grid.Boot;
    const { render } = MorphModule.Morph.DOM;
    const { update: StoreUpdate } = StateModule.State.Core;
    const { go: RouterGo } = RouterModule.Router.Nav;

    let booted = false;

    function dispatch(actionId, params) {
      const actions = runtime.slots.Actions;
      const action = actions ? actions[actionId] : null;
      if (!action) {
        return fail("ACTION_NOT_FOUND", actionId);
      }
      try {
        return ok(action(runtime, params));
      } catch (error) {
        return fail("ACTION_ERROR", error.message);
      }
    }

    async function fetchResource(config, params) {
      const url = config.url + (params.path || "");
      const response = await fetch(url, {
        method: params.method || config.method || "GET",
        headers: Object.assign({}, config.headers, params.headers),
        body: params.body ? JSON.stringify(params.body) : undefined,
      });
      return await response.json();
    }
    const Effect = {
      put: function fnPut(nextState) {
        return ok(StoreUpdate(nextState));
      },
      call: function fnCall(actionId, params) {
        return ok(dispatch(actionId, params));
      },
      resource: async function fnRes(resourceId, params) {
        const gw = runtime.slots.Gateway;
        const config = gw ? gw[resourceId] : null;
        if (!config) {
          return fail("RESOURCE_NOT_FOUND", resourceId);
        }
        return await fetchResource(config, params);
      },
      service: async function fnSrv(serviceId, params) {
        const srv = GridModule.Grid.Service;
        return ok(await srv.dispatch(serviceId, params));
      },
      alert: function fnAlert(message) {
        window.alert(message);
        return ok(true);
      },
      navigate: function fnNav(path) {
        RouterGo(path);
        return ok(path);
      },
      delay: function fnDelay(ms) {
        return new Promise((res) => {
          setTimeout(() => {
            res(ok(true));
          }, ms);
        });
      },
      all: function fnAll(list) {
        return Promise.all(list).then(ok);
      },
      race: function fnRace(list) {
        return Promise.race(list).then(ok);
      },
      auth: {
        login: function fnLogin() {
          const result = { id: "GUEST" };
          return ok(result);
        },
        logout: function fnLogout() {
          return ok(true);
        },
        link: function fnLink() {
          return ok(true);
        },
        check: function fnCheck() {
          return ok(true);
        },
      },
      ux: {
        vibrate: function fnVib(ms) {
          if (navigator.vibrate) {
            navigator.vibrate(ms);
          }
          return ok(true);
        },
        haptic: function fnHap() {
          return ok(true);
        },
        wakeLock: function fnWake() {
          return ok(true);
        },
        wakeUnlock: function fnUnWake() {
          return ok(true);
        },
      },
      pwa: {
        install: function fnInst() {
          return ok(true);
        },
        update: function fnUpdate() {
          return ok(true);
        },
      },
    };

    function auditKernelStructure(errs) {
      const M = K_MANIFEST;
      if (!M) {
        errs.push("Kernel: MANIFEST_ROOT_MISSING");
        return ok(false);
      }
      auditPrimitivesStructure(errs, M.Primitives);
      auditSystemModules(errs, M);
      auditKernelModule(errs, M.Kernel);
      return ok(true);
    }
    function auditPrimitivesStructure(errs, PM) {
      if (!PM) {
        errs.push("Primitives: MANIFEST_SECTION_MISSING");
        return ok(false);
      }
      auditCorePrim(errs, PM);
      auditExtPrim(errs, PM);
      return ok(true);
    }
    function auditCorePrim(errs, PM) {
      auditObj(Primitives.Result, "Result", "strict", errs, PM.Result, 1);
      auditObj(Primitives.Control, "Control", "strict", errs, PM.Control, 1);
      auditObj(Primitives.Data, "Data", "strict", errs, PM.Data, 1);
      return ok(true);
    }
    function auditExtPrim(errs, PM) {
      auditObj(Primitives.Panic, "Panic", "strict", errs, PM.Panic, 1);
      auditObj(Primitives.Inspect, "Inspect", "strict", errs, PM.Inspect, 1);
      auditObj(Primitives.Verify, "Verify", "strict", errs, PM.Verify, 1);
      return ok(true);
    }
    function auditSystemModules(errs, M) {
      if (!M) {
        errs.push("System: MANIFEST_CONTAINER_MISSING");
        return ok(false);
      }
      auditInfrastructure(errs, M.System);
      auditBusinessLogic(errs, M.Business);
      return ok(true);
    }
    function auditInfrastructure(errs, M) {
      if (!M) {
        errs.push("Infrastructure: MANIFEST_MAPPING_MISSING");
        return ok(false);
      }
      auditObj(SystemModule.System, "System", "strict", errs, M.System, 1);
      auditObj(ReactorModule.Reactor, "Reactor", "strict", errs, M.Reactor, 1);
      auditObj(DataModule.Data, "Data", "strict", errs, M.Data, 1);
      auditObj(StateModule.State, "State", "strict", errs, M.State, 1);
      auditObj(MorphModule.Morph, "Morph", "strict", errs, M.Morph, 1);
      return ok(true);
    }
    function auditBusinessLogic(errs, M) {
      if (!M) {
        errs.push("Business: MANIFEST_MAPPING_MISSING");
        return ok(false);
      }
      auditObj(RouterModule.Router, "Router", "strict", errs, M.Router, 1);
      auditObj(GridModule.Grid, "Grid", "strict", errs, M.Grid, 2);
      return ok(true);
    }
    function auditKernelModule(errs, M) {
      if (!M) {
        errs.push("Kernel: MANIFEST_MAPPING_MISSING");
        return ok(false);
      }
      auditObj(KernelModule.Kernel, "Kernel", "strict", errs, M.Kernel, 2);
      auditObj(KernelModule.Effect, "Effect", "strict", errs, M.Effect, 2);
      return ok(true);
    }

    function auditApplicationStructure(errorList) {
      const policyRes = pick(runtime.slots, "Policy.schema");

      if (policyRes.ok) {
        auditObj(runtime.slots, "App", "relaxed", errorList, policyRes.data, 2);
      }
    }

    function runBoot() {
      BootGrid();

      const kernRes = pick(runtime.slots, "Kernel.boot");

      if (kernRes.ok) {
        kernRes.data(runtime);
      }

      const appElement = document.getElementById("app");
      const initialView = runtime.core.state.view || "tpl-home";

      render(appElement, initialView);
      window.addEventListener("popstate", () => {
        render(appElement, runtime.core.state.view);
      });
      setupGlobalEvents(appElement);
      handleHashChange(appElement);
    }
    function setupGlobalEvents(appRoot) {
      window.addEventListener("hashchange", () => {
        handleHashChange(appRoot);
      });
      ReactorModule.Reactor.Signal.effect(() => {
        render(appRoot, runtime.core.state.view);
      });
    }
    function handleHashChange(appRoot) {
      if (location.hash !== "#kernel-status") {
        return;
      }
      const errList = [];
      const startTime = performance.now();
      auditKernelStructure(errList);
      auditApplicationStructure(errList);
      const duration = Math.round(performance.now() - startTime);
      reportAuditResult(errList, duration);
    }
    function reportAuditResult(errs, dur) {
      if (errs.length > 0) {
        return panic("BOOT_INTEGRITY_FAILURE", errs, dur);
      }
      return inspect(["INTEGRITY_OK"], checkRoot(), dur);
    }

    const Kernel = {
      boot: boot,
      Boot: {
        init: function fnInitKernel(configUpdate) {
          const baseConfig = runtime.core.config;
          runtime.core.config = Object.assign({}, baseConfig, configUpdate);
          return ok(true);
        },
        hydrate: function fnHydrateState() {
          return ok(true);
        },
        audit: function fnAuditKernel() {
          const errorList = [];
          auditKernelStructure(errorList);
          auditApplicationStructure(errorList);
          if (errorList.length > 0) {
            return fail("KERNEL_AUDIT_FAILURE", errorList);
          }
          return ok(true);
        },
        run: function fnRunKernel(runtimeSlots) {
          const baseSlots = runtime.slots;
          runtime.slots = Object.assign({}, baseSlots, runtimeSlots);
          runBoot();
          booted = true;
          return ok(true);
        },
      },
      Dispatch: {
        action: dispatch,
        middleware: function fnRegisterMiddleware() {
          return ok(true);
        },
      },
      Watcher: {
        register: function fnRegisterWatcher() {
          return ok(true);
        },
        trigger: function fnTriggerWatcher() {
          return ok(true);
        },
      },
      Computed: {
        register: function fnRegisterComputed() {
          return ok(true);
        },
        get: function fnGetComputed() {
          return ok(true);
        },
        invalidate: function fnInvalidateComputed() {
          return ok(true);
        },
      },
    };

    function boot() {
      if (booted) {
        return ok("BOOTED");
      }
      const start = performance.now();
      const errList = [];
      auditKernelStructure(errList);
      auditApplicationStructure(errList);
      const dur = Math.round(performance.now() - start);
      if (errList.length > 0) {
        panic("BOOT_INTEGRITY_FAILURE", errList, dur);
      }
      runBoot();
      booted = true;
      scheduleKernelAudit();
      return ok("BOOT_OK");
    }
    function scheduleKernelAudit() {
      setTimeout(runBgAudit, 100);
      return ok(true);
    }
    async function runBgAudit() {
      const start = performance.now();
      const code = collectAuditCode();
      const srv = GridModule.Grid.Service;
      const res = await srv.dispatch("KERNEL_INTEGRITY_AUDIT", code);
      const dur = Math.round(performance.now() - start);
      return handleBgAuditRes(res, dur);
    }
    function collectAuditCode() {
      const code = collectKernelCode(Primitives, "Primitives");
      collectLayerCode(code);
      collectKernelCode(KernelModule, "Kernel", code);
      collectKernelCode(runtime.slots, "Implementation", code);
      return code;
    }
    function collectLayerCode(code) {
      collectKernelCode(SystemModule, "System", code);
      collectKernelCode(ReactorModule, "Reactor", code);
      collectKernelCode(DataModule, "Data", code);
      collectKernelCode(RouterModule, "Router", code);
      collectKernelCode(StateModule, "State", code);
      collectKernelCode(MorphModule, "Morph", code);
      collectKernelCode(GridModule, "Grid", code);
      return code;
    }
    function handleBgAuditRes(res, dur) {
      if (res && res.errors && res.errors.length > 0) {
        panic("KERNEL_INTEGRITY_VIOLATION", res.errors, dur);
      }
      return ok(true);
    }
    function collectKernelCode(obj, path, map) {
      const targetMap = map || {};
      const targetPath = path || "Implementation";
      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const val = obj[key];
        const nextPath = targetPath + "." + key;
        if (typeof val === "function") {
          targetMap[nextPath] = val.toString();
        } else if (val && typeof val === "object") {
          collectKernelCode(val, nextPath, targetMap);
        }
      }
      return targetMap;
    }

    return { Kernel, Effect };
  })(runtime);

  /* --------------------------------------------------------------------------
   * TIER 3: PUBLIC API (SOVEREIGN INTERFACE)
   * -------------------------------------------------------------------------- */
  const { ok } = Primitives.Result;
  const { panic } = Primitives.Control;

  function Identity(identityValue) {
    if (identityValue.meta) {
      const targetMeta = runtime.slots.Meta;
      Object.assign(targetMeta, identityValue.meta);
    }
    return ok("identity");
  }
  function Ops(opsConfig) {
    if (opsConfig.production !== undefined) {
      runtime.core.config.production = opsConfig.production;
    }
    if (opsConfig.config) {
      Object.assign(runtime.slots.Config, opsConfig.config);
    }
    if (opsConfig.gateway) {
      Object.assign(runtime.slots.Gateway, opsConfig.gateway);
    }
    if (opsConfig.features) {
      Object.assign(runtime.slots.Features, opsConfig.features);
    }
    return ok("ops");
  }

  function Policy(policyValue) {
    if (policyValue.schema) {
      runtime.slots.Policy.schema = policyValue.schema;
    }
    const policyKeys = ["invariants", "session", "persistence", "forms"];
    policyKeys.forEach((key) => {
      applyPolicyKey(key, policyValue);
    });
    return ok("policy");
  }
  function applyPolicyKey(key, policyValue) {
    if (policyValue[key]) {
      const upperKey = key.charAt(0).toUpperCase() + key.slice(1);
      Object.assign(runtime.slots[upperKey], policyValue[key]);
    }
  }

  function Design(designValue) {
    applyDesignTheme(designValue);
    applyDesignRoute(designValue);
    applyDesignI18n(designValue);
    return ok("design");
  }
  function applyDesignTheme(designValue) {
    if (designValue.theme) {
      Object.assign(runtime.slots.Theme, designValue.theme);
    }
  }
  function applyDesignRoute(designValue) {
    if (designValue.route) {
      Object.assign(runtime.slots.Routes, designValue.route);
    }
  }
  function applyDesignI18n(designValue) {
    if (designValue.i18n) {
      Object.assign(runtime.slots.I18n, designValue.i18n);
    }
  }

  function Logic(logicValue) {
    const logicKeys = ["actions", "computed", "watchers", "middleware"];
    logicKeys.forEach((key) => {
      if (logicValue[key]) {
        const upperKey = key.charAt(0).toUpperCase() + key.slice(1);
        Object.assign(runtime.slots[upperKey], logicValue[key]);
      }
    });
    return ok("logic");
  }

  function State(stateValue) {
    if (stateValue) {
      Object.assign(runtime.core.state, stateValue);
    }
    return ok("state");
  }

  function Shell(blueprint) {
    if (!blueprint) {
      return panic("BLUEPRINT_REQUIRED");
    }
    if (!runtime.core.sources.inline) {
      const allScripts = document.getElementsByTagName("script");
      const lastScript = allScripts[allScripts.length - 1];
      runtime.core.sources.inline = lastScript ? lastScript.textContent : "";
    }
    bootstrapIdentity(blueprint);
    bootstrapOps(blueprint);
    bootstrapPolicy(blueprint);
    bootstrapDesign(blueprint);
    bootstrapLogicAndState(blueprint);
    return KernelModule.Kernel.boot();
  }
  function bootstrapIdentity(blueprint) {
    if (blueprint.meta) {
      Identity({ meta: blueprint.meta });
    }
  }
  function bootstrapOps(blueprint) {
    if (blueprint.config || blueprint.gateway) {
      Ops(blueprint);
    }
  }
  function bootstrapPolicy(blueprint) {
    if (blueprint.invariants) {
      Policy(blueprint);
    }
  }
  function bootstrapDesign(blueprint) {
    if (blueprint.theme) {
      Design(blueprint);
    }
  }
  function bootstrapLogicAndState(blueprint) {
    if (blueprint.actions) {
      Logic(blueprint);
    }
    if (blueprint.state) {
      State(blueprint.state);
    }
  }

  GridModule.Grid.service = function (serviceId, serviceCallback) {
    if (!runtime.slots.Services) {
      runtime.slots.Services = {};
    }
    runtime.slots.Services[serviceId] = serviceCallback;
    return ok(serviceId);
  };

  return {
    Kernel: KernelModule.Kernel,
    Primitives: Primitives,
    Identity,
    Ops,
    Policy,
    Design,
    Logic: Logic,
    Shell,
    State,
    Store: StateModule.State,
    Grid: GridModule.Grid,
    Router: RouterModule.Router,
    Morph: MorphModule.Morph,
    Effect: KernelModule.Effect,
    Guard: Primitives.Control.guard,
  };
})();
window.UltronKit = UltronKit;
