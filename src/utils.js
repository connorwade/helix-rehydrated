export function getData(node, selector, prop) {
  prop = prop || "textContent";
  const el = node.querySelector(selector);
  return el ? el[prop] : "";
}

export function gather(node, selector) {
  return [...node.querySelectorAll(`:scope ${selector}`)];
}

export const swapNode = (node, swapper, tag) => {
  const element = document.createElement(tag || "div");
  element.className = node.className;
  element.innerHTML = swapper;
  node.replaceWith(element);
  element.dataset.rendered = true;
};

export const renderTemplate = (template, data) => {
  let render = template;
  for (let key in data) {
    render = render.replace(new RegExp(`\\$\\{${key}\\}`, "g"), data[key]);
  }
  return render;
};

export const makeMany = (node, template, data, tag) => {
  tag = tag || "div";
  return swapNode(
    node,
    gather(node, ` > ${tag}`)
      .map((i) => renderTemplate(template, data(i)))
      .join(""),
    tag
  );
};

export const makeSingle = (node, template, data, tag) => {
  tag = tag || "div";
  return swapNode(node, renderTemplate(template, data(node)), tag);
};

export const fromManyMakeSingle = (nodes, template, data) => {
  const html = renderTemplate(template, data(nodes));

  nodes.forEach((node, i) => {
    if (i === 0) return;
    node.remove();
  });

  nodes[0].outerHTML = html;
  nodes[0].dataset.rendered = true;

  return nodes[0];
};

/**
 *
 * @param {HTMLDivElement} node
 */
export const applyMetaData = (node) => {
  const parent = node.parentElement;

  for (const block of [...node.children]) {
    const key = block.children[0].innerText;
    const val = block.children[1].innerText;
    switch (key.toLowerCase()) {
      case "style":
        parent.classList.add(val);
        break;
      default:
        console.error(`Unhandled metadata: KEY: ${key}, VAL: ${val}`);
    }
  }

  node.remove();
};
