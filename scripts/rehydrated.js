// Paint major content
// Attach styles
// Push only what needs to be pushed
async function hydratePage() {
  const observer = new MutationObserver(async (mutations) => {
    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;

        // if (node.matches("header")) {
        //   const res = await fetch("/nav.plain.html");
        //   const html = await res.text();

        //   let header = document.querySelector("header");
        //   header.classList.add("header-wrapper");
        //   header.innerHTML = html;
        // }

        if (
          node.matches('img[loading="lazy"]') &&
          elementOverlapsViewport(node)
        ) {
          node.removeAttribute("loading");
        }

        if (
          !document.querySelector(".hero") &&
          node.matches("main > div:first-of-type")
        ) {
          const { Block } = await import("../blocks-dev/Block.js");
          const { createHero } = await import("../blocks-dev/Hero/Hero.js");
          const hero = new createHero(node);
          const block = new Block("hero", [hero]);
          block.prepend(node.parentElement, [
            node.firstElementChild,
            node.firstElementChild.nextElementSibling,
          ]);
          document
            .querySelector(".hero-wrapper")
            .classList.add("hero-container");
        }

        if (node.matches(".cards") && !node.dataset.rendered) {
          const { Block } = await import("../blocks-dev/Block.js");
          const { makeCards } = await import("../blocks-dev/Cards/Cards.js");
          loadCSS("/blocks/cards/cards.css");
          const cards = makeCards(node);
          const block = new Block("cards", [cards]);
          block.render(node);
        }

        if (node.matches(".columns") && !node.dataset.rendered) {
          const { makeColumns } = await import(
            "../blocks-dev/Columns/Columns.js"
          );
          loadCSS("/blocks/columns/columns.css");
          makeColumns(node);
        }

        if (node.matches(".columns > div")) {
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
          node.classList.add("section");
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

function elementOverlapsViewport(el) {
  let rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// function buildLCPBlock() {
//   block.append(...[pic, h1]);
//   wrapper.append(block);
//   section.append(wrapper);

//   parent.prepend(section);
// }

function createHTMLFromResponse(html) {
  let parser = new DOMParser();

  let element = parser.parseFromString(html, "text/html");
  return element;
}
