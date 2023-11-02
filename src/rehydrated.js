document.querySelector("html").lang = "en";

async function createLCP(node) {
  const { Block } = await import("./blocks/Block.js");
  const { createHero } = await import("./blocks/Hero/Hero.js");
  const { hero, picture } = new createHero(node);
  const block = new Block("hero", [hero]);
  block.prepend(node.parentElement, picture, [
    node.firstElementChild,
    node.firstElementChild.nextElementSibling,
  ]);
  document.querySelector(".hero-wrapper").classList.add("hero-container");
}

async function hydratePage() {
  const observer = new MutationObserver((mutations) => {
    (async () => {
      for (let mutation of mutations) {
        for (let node of mutation.addedNodes) {
          if (!(node instanceof HTMLElement)) continue;

          if (node.matches('main') && !node.dataset.rendered) {
            const { Main } = await import("./blocks/Main/Main.js");
            Main(node);
          }
          if (node.matches('header') && !node.dataset.rendered) {
            const { Header } = await import("./blocks/Header/Header.js");
            Header(node);
          }
          if (node.matches("main > div:first-child > p:first-child") && !node.dataset.rendered) {
            const { Hero } = await import("./blocks/Hero/Hero.js");
            Hero(node);
          }
          if (node.matches(".cards") && !node.dataset.rendered) {
            const { Cards } = await import("./blocks/Cards/Cards.js");
            Cards(node);
          }
          if (node.matches(".columns") && !node.dataset.rendered) {
            const { Columns } = await import("./blocks/Columns/Columns.js");
            Columns(node);
          }
          if (node.matches('footer') && !node.dataset.rendered) {
            const { Footer } = await import("./blocks/Footer/Footer.js");
            Footer(node);
          }
          if (node.childNodes.length === 0 && node instanceof HTMLDivElement) {
            console.log("EMPTY NODES REMOVED");
            node.remove();
          }
        }
      }
    })();
  });

  observer.observe(document, { childList: true, subtree: true });
}

hydratePage();

function loadCSS(script) {
  const link = Object.assign(document.createElement("link"), {
    rel: "stylesheet",
    type: "text/css",
    href: `${script}`,
  });
  document.head.appendChild(link);
}
