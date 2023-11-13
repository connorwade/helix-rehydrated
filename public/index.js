// src/rehydrated.js
document.querySelector("html").lang = "en";
async function loadModule(node, importStatement) {
  try {
    const [mod] = await Promise.all([importStatement]);
    if (mod && mod.render) {
      mod.render(node);
    }
  } catch (error) {
    console.error(`Error loading module: ${importStatement}:`, error);
  }
}
async function hydratePage() {
  const observer = new MutationObserver(async (mutations) => {
    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement))
          continue;
        if (node.matches("main") && !node.dataset.rendered) {
          loadModule(node, import("./Main-O5KX2J4B.js"));
        }
        if (node.matches("header") && !node.dataset.rendered) {
          const { header } = await import("./Header-BUDL72MX.js");
          node.dataset.rendered = "true";
        }
        if (node.matches("main > div:first-child > p:first-child") && !node.dataset.rendered) {
          loadModule(node, import("./Hero-C2ZRPFGD.js"));
        }
        if (node.matches(".cards") && !node.dataset.rendered) {
          loadModule(node, import("./Cards-VITEUYUC.js"));
        }
        if (node.matches(".columns") && !node.dataset.rendered) {
          loadModule(node, import("./Columns-B4V63FZ3.js"));
        }
        if (node.matches("footer") && !node.dataset.rendered) {
          loadModule(node, import("./Footer-CSUEMV3K.js"));
        }
        if (node.matches(".section-metadata")) {
          const { applyMetaData } = await import("./utils-WVMTVDLJ.js");
          applyMetaData(node);
        }
        if (node.childNodes.length === 0 && node instanceof HTMLDivElement) {
          console.log("EMPTY NODES REMOVED");
          node.remove();
        }
      }
    }
  });
  observer.observe(document, { childList: true, subtree: true });
}
hydratePage();

// src/RUM.js
function sampleRUM(checkpoint, data = {}) {
  sampleRUM.defer = sampleRUM.defer || [];
  const defer = (fnname) => {
    sampleRUM[fnname] = sampleRUM[fnname] || ((...args) => sampleRUM.defer.push({ fnname, args }));
  };
  sampleRUM.drain = sampleRUM.drain || ((dfnname, fn) => {
    sampleRUM[dfnname] = fn;
    sampleRUM.defer.filter(({ fnname }) => dfnname === fnname).forEach(({ fnname, args }) => sampleRUM[fnname](...args));
  });
  sampleRUM.always = sampleRUM.always || [];
  sampleRUM.always.on = (chkpnt, fn) => {
    sampleRUM.always[chkpnt] = fn;
  };
  sampleRUM.on = (chkpnt, fn) => {
    sampleRUM.cases[chkpnt] = fn;
  };
  defer("observe");
  defer("cwv");
  try {
    window.hlx = window.hlx || {};
    if (!window.hlx.rum) {
      const usp = new URLSearchParams(window.location.search);
      const weight2 = usp.get("rum") === "on" ? 1 : 100;
      const id2 = Array.from(
        { length: 75 },
        (_, i) => String.fromCharCode(48 + i)
      ).filter((a) => /\d|[A-Z]/i.test(a)).filter(() => Math.random() * 75 > 70).join("");
      const random = Math.random();
      const isSelected = random * weight2 < 1;
      const firstReadTime2 = Date.now();
      const urlSanitizers = {
        full: () => window.location.href,
        origin: () => window.location.origin,
        path: () => window.location.href.replace(/\?.*$/, "")
      };
      window.hlx.rum = {
        weight: weight2,
        id: id2,
        random,
        isSelected,
        firstReadTime: firstReadTime2,
        sampleRUM,
        sanitizeURL: urlSanitizers[window.hlx.RUM_MASK_URL || "path"]
      };
    }
    const { weight, id, firstReadTime } = window.hlx.rum;
    if (window.hlx && window.hlx.rum && window.hlx.rum.isSelected) {
      const knownProperties = [
        "weight",
        "id",
        "referer",
        "checkpoint",
        "t",
        "source",
        "target",
        "cwv",
        "CLS",
        "FID",
        "LCP",
        "INP"
      ];
      const sendPing = (pdata = data) => {
        const body = JSON.stringify(
          {
            weight,
            id,
            referer: window.hlx.rum.sanitizeURL(),
            checkpoint,
            t: Date.now() - firstReadTime,
            ...data
          },
          knownProperties
        );
        const url = `https://rum.hlx.page/.rum/${weight}`;
        navigator.sendBeacon(url, body);
        console.debug(`ping:${checkpoint}`, pdata);
      };
      sampleRUM.cases = sampleRUM.cases || {
        cwv: () => sampleRUM.cwv(data) || true,
        lazy: () => {
          const script = document.createElement("script");
          script.src = "https://rum.hlx.page/.rum/@adobe/helix-rum-enhancer@^1/src/index.js";
          document.head.appendChild(script);
          return true;
        }
      };
      sendPing(data);
      if (sampleRUM.cases[checkpoint]) {
        sampleRUM.cases[checkpoint]();
      }
    }
    if (sampleRUM.always[checkpoint]) {
      sampleRUM.always[checkpoint](data);
    }
  } catch (error) {
  }
}
function setup() {
  window.hlx = window.hlx || {};
  window.hlx.RUM_MASK_URL = "full";
  window.hlx.codeBasePath = "";
  window.hlx.lighthouse = new URLSearchParams(window.location.search).get("lighthouse") === "on";
}
function init() {
  setup();
  sampleRUM("top");
  window.addEventListener("load", () => sampleRUM("load"));
  window.addEventListener("unhandledrejection", (event) => {
    sampleRUM("error", {
      source: event.reason.sourceURL,
      target: event.reason.line
    });
  });
  window.addEventListener("error", (event) => {
    sampleRUM("error", { source: event.filename, target: event.lineno });
  });
}
init();
//# sourceMappingURL=index.js.map
