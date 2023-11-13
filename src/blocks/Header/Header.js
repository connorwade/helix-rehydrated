import { makeSingle, swapNode } from "../../utils";
import { getHTML } from "../getHTML";
import template from "./headerDropdown.html";

export const render = async (node) => {
  const html = await getHTML("/nav.plain.html");

  return swapNode(node, html, "header");
};
