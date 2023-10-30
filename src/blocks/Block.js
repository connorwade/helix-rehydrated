export class Block {
  children = [""];
  type = "";

  constructor(type, children) {
    this.children = children.map((child) => child.render());
    this.type = type;
    this.html = `${this.children.join("")}`;
  }

  /**
   *
   * @param {HTMLElement} nodeToSwap
   */
  render(nodeToSwap) {
    const element = document.createElement("div");
    element.className = `${this.type}-wrapper`;
    element.innerHTML = this.html;
    nodeToSwap.replaceWith(element);
  }

  /**
   *
   * @param {HTMLElement} node
   * @param {HTMLElement[]} nodesToDelete
   */
  prepend(node, nodesToDelete) {
    const element = document.createElement("div");
    element.className = `${this.type}-wrapper`;
    element.innerHTML = this.html;
    nodesToDelete.forEach((nodeToDelete) => {
      nodeToDelete.remove();
    });
    node.prepend(element);
  }
}
