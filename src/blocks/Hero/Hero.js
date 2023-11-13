import template from "./hero.html";
import { fromManyMakeSingle } from "../../utils";

export const render = (node) => {
  const title = node.nextElementSibling;
  /**
   * @type {HTMLPictureElement}
   */
  const picture = node.querySelector(":scope > picture");
  if (
    picture.lastElementChild.hasAttribute("loading") &&
    picture.lastElementChild.getAttribute("loading") === "lazy"
  ) {
    picture.lastElementChild.setAttribute("loading", "eager");
  }

  return fromManyMakeSingle([node, title, picture], template, (nodes) => ({
    title: nodes[1].textContent,
    id: nodes[1].id,
    img: nodes[2].outerHTML,
  }));
};
