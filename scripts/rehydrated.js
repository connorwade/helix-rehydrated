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

        if (node.matches("main p picture:first-of-type")) {
          buildLCPBlock();
        }

        if (node.matches(".cards") && !node.dataset.rendered) {
          flag = false;
          const { Block } = await import("../blocks-dev/Block.js");
          const { makeCards } = await import("../blocks-dev/Cards/Cards.js");
          loadCSS("/blocks/cards/cards.css");
          const cards = makeCards(node);
          const block = new Block("cards", [cards]);
          block.render(node);
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

function buildLCPBlock() {
  const h1 = document.querySelector("h1");
  const pic = document.querySelector("picture");
  console.log(h1, pic);
  const parent = h1.parentElement;
  const block = Object.assign(document.createElement("div"), {
    classList: ["hero block"],
  });
  const wrapper = Object.assign(document.createElement("div"), {
    classList: ["hero wrapper"],
  });
  const section = Object.assign(document.createElement("section"), {
    classList: ["section hero-container"],
  });

  block.append(...[pic, h1]);
  wrapper.append(block);
  section.append(wrapper);

  parent.prepend(section);
}

function createHTMLFromResponse(html) {
  let parser = new DOMParser();

  let element = parser.parseFromString(html, "text/html");
  return element;
}
