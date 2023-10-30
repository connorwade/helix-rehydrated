/**
 *
 * @param {HTMLDivElement} node
 */
export function makeColumns(node) {
  const cols = [...node.firstElementChild.children];
  node.classList.add(`columns-${cols.length}-cols`);
  node.classList.add("block");
  const pics = node.querySelectorAll("picture");

  for (const pic of pics) {
    const picWrapper = pic.closest("div");
    if (picWrapper && picWrapper.children.length === 1) {
      picWrapper.classList.add("columns-img-col");
    }
  }

  node.dataset.rendered = "true";
  console.log(node, node.parentElement);
}
