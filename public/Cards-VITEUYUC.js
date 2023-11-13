import {
  getData,
  makeMany
} from "./chunk-YN3AOCO7.js";
import "./chunk-F3FYYIAV.js";

// src/blocks/Cards/card.html
var card_default = '<div\n  class="card bg-white overflow-hidden shadow rounded-lg flex flex-col justify-center items-center"\n>\n  <div class="image-wrapper h-full">${img}</div>\n  <div class="card-content px-4 py-8">\n    <h3 class="text-2xl font-bold mb-4">${title}</h3>\n    <p>${description}</p>\n  </div>\n</div>\n';

// src/blocks/Cards/Cards.js
var render = (node) => {
  const Card = (card) => ({
    title: getData(card, "p:nth-of-type(1)"),
    description: getData(card, "p:nth-of-type(2)"),
    img: card.querySelector("picture").outerHTML
  });
  return makeMany(node, card_default, Card);
};
export {
  render
};
//# sourceMappingURL=Cards-VITEUYUC.js.map
