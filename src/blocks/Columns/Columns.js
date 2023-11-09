import { makeMany } from "../../utils.js";
import template from "./column.html";

export const Columns = (node) => {
  return makeMany(node, template, (col) => ({
    content: col.innerHTML,
  }));
};
