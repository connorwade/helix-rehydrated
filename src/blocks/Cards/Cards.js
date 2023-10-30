class Card {
  imgSrc = "";
  imgAlt = "";
  imgWidth = "";
  title = "";
  description = "";

  constructor(title, description, imgSrc, imgAlt, imgWidth) {
    this.title = title;
    this.description = description;
    this.imgSrc = imgSrc;
    this.imgAlt = imgAlt;
    this.imgWidth = imgWidth;
    this.html = `
    <li>
        <div class="cards-card-image">
         <img src="${this.imgSrc}" alt="${this.imgAlt}" width="${this.imgWidth}" loading="lazy"/>
        </div>
        <div class="cards-card-body">
          <p><strong>${this.title}</strong></p>
          <p>${this.description}</p>
        </div>
      </li>
    `;
  }

  render() {
    return this.html;
  }
}

class Cards {
  children = [""];

  constructor(children) {
    this.children = children.map((card) => card.render());
    this.html = `
    <div class="cards block">
    <ul>
        ${this.children.join("")}
    </ul>
    </div>
    `;
  }

  render() {
    return this.html;
  }
}

/**
 *
 * @param {HTMLDivElement} node
 */
export function makeCards(node) {
  let cards = [];
  node.querySelectorAll(":scope > div").forEach((card) => {
    let pNode = card.querySelectorAll("p");
    /**
     * @type {HTMLImageElement}
     */
    let imgNode = card.querySelector("img");

    cards.push(
      new Card(
        pNode[0].innerText,
        pNode[1].innerText,
        imgNode.src,
        imgNode.alt,
        750
      )
    );
  });
  return new Cards(cards);
}
