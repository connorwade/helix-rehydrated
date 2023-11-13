import {
  makeMany
} from "./chunk-YN3AOCO7.js";
import "./chunk-F3FYYIAV.js";

// src/blocks/Columns/column.html
var column_default = '<div class="column">${content}</div>\n';

// src/blocks/Columns/Columns.js
var render = (node) => {
  return makeMany(node, column_default, (col) => ({
    content: col.innerHTML
  }));
};
export {
  render
};
//# sourceMappingURL=Columns-B4V63FZ3.js.map
