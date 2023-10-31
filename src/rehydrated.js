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
  const observer = new MutationObserver(async (mutations) => {
    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;

        if (
          node.matches('.hero img[loading="lazy"]') ||
          node.matches(".columns img")
        ) {
          console.log("REMOVED LOADING");
          node.removeAttribute("loading");
        }

        if (
          !document.querySelector(".hero") &&
          node.matches("main > div:first-of-type")
        ) {
          console.log("HERO CREATED");
          await createLCP(node);
        }

        if (node.matches(".cards") && !node.dataset.rendered) {
          console.log("CARDS CREATED");
          const { Block } = await import("./blocks/Block.js");
          const { makeCards } = await import("./blocks/Cards/Cards.js");
          const { cards, pics } = makeCards(node);
          const block = new Block("cards", [cards]);
          block.renderWithPictures(node, pics);
        }

        if (node.matches(".columns") && !node.dataset.rendered) {
          console.log("COLUMNS CREATED");
          const { makeColumns } = await import("./blocks/Columns/Columns.js");
          makeColumns(node);
        }

        if (node.matches(".columns > div")) {
          console.log("COLUMNS BUTTONS");
          const link = node.querySelector("a");
          link.classList.add("button");
          if (link.parentElement instanceof HTMLParagraphElement) {
            link.parentElement.classList.add("button-container");
          } else {
            link.parentElement.parentElement.classList.add("button-container");
            link.classList.add("secondary");
          }
          link.title = link.textContent;
        }

        if (node.matches(".section-metadata")) {
          console.log("METADATA PARSED");
          let children = [...node.children];

          children.forEach((obj) => {
            children = [...obj.children];
            let type = children[0].textContent;
            let value = children[1].textContent;
            node.parentElement.classList.add(value);
          });

          node.remove();
        }

        if (node.matches("main > div")) {
          console.log("SECTION ADDED");
          node.classList.add("section");
        }

        if (node.matches("footer")) {
          console.log("FOOTER RENDERED");
          const { getHTML } = await import("./blocks/getHTML.js");
          const { Footer } = await import("./blocks/Footer/footer.js");
          await getHTML("/footer.plain.html", node, Footer);
        }

        if (node.matches("header")) {
          console.log("HEADER ADDED");
          const { getHTML } = await import("./blocks/getHTML.js");
          const { Header } = await import("./blocks/Header/header.js");
          await getHTML("/nav.plain.html", node, Header);
          let icon = node.querySelector(".icon");
          let img = Object.assign(document.createElement("img"), {
            src: `src/static/icons/${icon.classList[1].split("-")[1]}.svg`,
            width: `50px`,
            alt: icon.classList[1].split("-")[1],
          });
          icon.append(img);
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

function loadCSS(script) {
  const link = Object.assign(document.createElement("link"), {
    rel: "stylesheet",
    type: "text/css",
    href: `${script}`,
  });
  document.head.appendChild(link);
}
