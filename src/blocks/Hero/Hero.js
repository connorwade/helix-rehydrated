class Hero {
  titleId = "";
  title = "";

  constructor(titleId, title) {
    this.titleId = titleId;
    this.title = title;
    this.html = `
    <div class="hero block" data-rendered="true">
      <picture>
      </picture>
      <h1 id="${this.titleId}">${this.title}</h1>
      </div>
        `;
  }

  render() {
    return this.html;
  }
}

export function createHero(node) {
  /**
   * @type {HTMLTitleElement}
   */
  const h1 = node.querySelector("h1");
  const pic = node.querySelector("picture");

  return { hero: new Hero(h1.id, h1.innerText), picture: pic };
}
