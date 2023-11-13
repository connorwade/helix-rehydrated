document.querySelector("html").lang = "en";

async function loadModule(node, importStatement) {
  // Promise.all([importStatement]).then((modules) => {
  //   if (modules.length > 0 && modules[0].render) {
  //     modules[0].render(node);
  //   }
  // });
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
        if (!(node instanceof HTMLElement)) continue;

        if (node.matches("main") && !node.dataset.rendered) {
          // const { Main } = await import("./blocks/Main/Main.js");
          // Main(node);
          loadModule(node, import("./blocks/Main/Main.js"));
        }
        if (node.matches("header") && !node.dataset.rendered) {
          // const { Header } = await import("./blocks/Header/Header.js");
          // Header(node);
          const { header } = await import("./blocks/Svelte-Header/Header.js");
          node.dataset.rendered = "true";
        }
        if (
          node.matches("main > div:first-child > p:first-child") &&
          !node.dataset.rendered
        ) {
          // const { Hero } = await import("./blocks/Hero/Hero.js");
          // Hero(node);
          loadModule(node, import("./blocks/Hero/Hero.js"));
        }
        if (node.matches(".cards") && !node.dataset.rendered) {
          // const { Cards } = await import("./blocks/Cards/Cards.js");
          // Cards(node);
          loadModule(node, import("./blocks/Cards/Cards.js"));
        }
        if (node.matches(".columns") && !node.dataset.rendered) {
          // const { Columns } = await import("./blocks/Columns/Columns.js");
          // Columns(node);
          loadModule(node, import("./blocks/Columns/Columns.js"));
        }
        if (node.matches("footer") && !node.dataset.rendered) {
          // const { Footer } = await import("./blocks/Footer/Footer.js");
          // Footer(node);
          loadModule(node, import("./blocks/Footer/Footer.js"));
        }
        if (node.matches(".section-metadata")) {
          const { applyMetaData } = await import("./utils.js");
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

async function loadCSS(script) {
  const link = Object.assign(document.createElement("link"), {
    rel: "stylesheet",
    type: "text/css",
    href: `${script}`,
  });
  document.head.appendChild(link);
}
