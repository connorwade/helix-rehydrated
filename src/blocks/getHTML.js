/**
 *
 * @param {string} path
 * @param {HTMLElement} node
 * @param {import("./Footer/Footer").Footer | import("./Header/Header").Header} elementClass
 */
export async function getHTML(path, node, elementClass) {
  const res = await fetch(path);
  if (res.ok) {
    const el = new elementClass(await res.text());
    el.render(node);
  }
}
