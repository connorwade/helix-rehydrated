// Paint major content
// Attach styles
// Push only what needs to be pushed

const priorityQueue = [
  { task: hydratePage, withWorker: false },
  { task: buildLCPBlock, withWorker: false },
];

async function hydratePage() {
  const observer = new MutationObserver((mutations) => {
    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;

        if (node.matches('header')) {
            
        }

        if (
          node.matches('img[loading="lazy"]') &&
          elementOverlapsViewport(node)
        ) {
          node.removeAttribute("loading");
        }

        if (node.matches("main p picture:first-of-type")) {
          buildLCPBlock();
        }
      }
    }
  });

  observer.observe(document, { childList: true, subtree: true });
}

hydratePage();

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

// function runQueue() {
//   while (priorityQueue.length) {
//     const { task } = priorityQueue.shift();
//     task();
//   }
// }

// runQueue();
