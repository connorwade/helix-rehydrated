class Card {
  title = "";
  description = "";

  constructor(title, description) {
    this.title = title;
    this.description = description;
    this.html = `
    <li>
        <div class="cards-card-image">
         <picture></picture>
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
  let pictures = [];
  node.querySelectorAll(":scope > div").forEach((card) => {
    let pNode = card.querySelectorAll("p");
    /**
     * @type {HTMLImageElement}
     */
    pictures.push(card.querySelector("picture"));

    cards.push(new Card(pNode[0].innerText, pNode[1].innerText));
  });
  return { cards: new Cards(cards), pics: pictures };
}
