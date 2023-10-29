class Hero {
  titleId = "";
  title = "";
  imgSrc = "";

  constructor(titleId, title, imgSrc) {
    this.titleId = titleId;
    this.title = title;
    this.imgSrc = imgSrc;
    this.html = `
    <div class="hero block" data-rendered="true">
      <picture>
        <source
          type="image/webp"
          srcset="
            ${this.imgSrc}
          media="(min-width: 600px)"
        />
        <source
          type="image/webp"
          srcset="
            ${this.imgSrc}
          "
        />
        <source
          type="image/jpeg"
          srcset="
            ${this.imgSrc}
          "
          media="(min-width: 600px)"
        />
        <img
          alt="Decorative double Helix"
          src="${this.imgSrc}
          width="1600"
          height="886"
        />
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
  const img = node.querySelector("img");

  return new Hero(h1.id, h1.innerText, img.src);
}
