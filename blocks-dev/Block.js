export class Block {
  children = [""];
  type = "";

  constructor(type, children) {
    this.children = children.map((child) => child.render());
    this.type = type;
    this.html = `
            <div class="${this.type} block" data-rendered="true">
            ${this.children.join("")}
    `;
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
}
