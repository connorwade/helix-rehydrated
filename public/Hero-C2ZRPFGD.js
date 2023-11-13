import {
  fromManyMakeSingle
} from "./chunk-YN3AOCO7.js";
import "./chunk-F3FYYIAV.js";

// src/blocks/Hero/hero.html
var hero_default = '<div class="hero relative min-h-[300px]">\n  <div class="image-wrapper absolute top-0 left-0 right-0 bottom-0 -z-10">\n    ${img}\n  </div>\n  <div class="hero-content absolute top-1/4 left-5 md:left-[20%]">\n    <h1 class="text-white text-4xl font-bold leading-10">${title}</h1>\n  </div>\n</div>\n';

// src/blocks/Hero/Hero.js
var render = (node) => {
  const title = node.nextElementSibling;
  const picture = node.querySelector(":scope > picture");
  if (picture.lastElementChild.hasAttribute("loading") && picture.lastElementChild.getAttribute("loading") === "lazy") {
    picture.lastElementChild.setAttribute("loading", "eager");
  }
  return fromManyMakeSingle([node, title, picture], hero_default, (nodes) => ({
    title: nodes[1].textContent,
    id: nodes[1].id,
    img: nodes[2].outerHTML
  }));
};
export {
  render
};
//# sourceMappingURL=Hero-C2ZRPFGD.js.map
