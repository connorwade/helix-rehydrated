import {
  swapNode
} from "./chunk-YN3AOCO7.js";
import "./chunk-F3FYYIAV.js";

// src/blocks/getHTML.js
async function getHTML(path) {
  const res = await fetch(path);
  if (res.ok) {
    return await res.text();
  }
}

// src/blocks/Footer/Footer.js
var render = async (node) => {
  const html = await getHTML("/footer.plain.html");
  swapNode(node, html, "footer");
};
export {
  render
};
//# sourceMappingURL=Footer-CSUEMV3K.js.map
