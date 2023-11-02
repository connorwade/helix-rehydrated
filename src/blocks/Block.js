export class Block {
  children = [""];
  type = "";

  constructor(type, children) {
    this.children = children.map((child) => {
      if (child.render) {
        return child.render();
      } else {
        return child();
      }
    });
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
   * @param {HTMLElement} nodeToSwap
   * @param {HTMLPictureElement} pictureNodes
   */
  renderWithPictures(nodeToSwap, pictureNodes) {
    const element = document.createElement("div");
    element.className = `${this.type}-wrapper`;
    element.innerHTML = this.html;
    element.querySelectorAll("picture").forEach((el, i) => {
      el.replaceWith(pictureNodes[i]);
    });
    nodeToSwap.replaceWith(element);
  }

  /**
   *
   * @param {HTMLElement} node
   * @param {HTMLElement[]} nodesToDelete
   */
  prepend(node, picture, nodesToDelete) {
    const element = document.createElement("div");
    element.className = `${this.type}-wrapper`;
    element.innerHTML = this.html;
    element.querySelector("picture").replaceWith(picture);
    nodesToDelete.forEach((nodeToDelete) => {
      nodeToDelete.remove();
    });
    node.prepend(element);
  }
}
