import template from "./card.html";
import { getData, makeMany } from "../../utils";

export const Cards = (node) => {
  const Card = (card) => ({
    title: getData(card, "p:nth-of-type(1)"),
    description: getData(card, "p:nth-of-type(2)"),
    img: card.querySelector("picture").outerHTML,
  });

  return makeMany(node, template, Card);
};
