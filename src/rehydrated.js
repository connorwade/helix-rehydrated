// Paint major content
// Attach styles
// Push only what needs to be pushed
document.querySelector("html").lang = "en";

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
          (node.matches('img[loading="lazy"]') &&
            elementOverlapsViewport(node)) ||
          node.matches(".columns img")
        ) {
          node.removeAttribute("loading");
        }

        if (
          !document.querySelector(".hero") &&
          node.matches("main > div:first-of-type")
        ) {
          const { Block } = await import("./blocks/Block.js");
          const { createHero } = await import("./blocks/Hero/Hero.js");
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
          const { Block } = await import("./blocks/Block.js");
          const { makeCards } = await import("./blocks/Cards/Cards.js");
          const cards = makeCards(node);
          const block = new Block("cards", [cards]);
          block.render(node);
        }

        if (node.matches(".columns") && !node.dataset.rendered) {
          const { makeColumns } = await import("./blocks/Columns/Columns.js");
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

        if (node.matches("footer")) {
          const { getHTML } = await import("./blocks/getHTML.js");
          const { Footer } = await import("./blocks/Footer/footer.js");
          await getHTML("/footer.plain.html", node, Footer);
        }

        if (node.matches("header")) {
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
          node.remove();
        }

        if (node.matches(".icon")) {
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

function createHTMLFromResponse(html) {
  let parser = new DOMParser();

  let element = parser.parseFromString(html, "text/html");
  return element;
}
