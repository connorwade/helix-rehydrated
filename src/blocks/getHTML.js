/**
 *
 * @param {string} path
 * @param {HTMLElement} node
 * @param {import("./Footer/Footer").Footer | import("./Header/Header").Header} elementClass
 */
export async function getHTML(path) {
  const res = await fetch(path);
  if (res.ok) {
    return await res.text();
  }
}
