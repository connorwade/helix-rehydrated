import { makeSingle, registerFunction, swapNode } from "../../utils";
import { getHTML } from "../getHTML";
import template from "./headerDropdown.html";

export const Header = async (node) => {
  const html = await getHTML("/nav.plain.html");

  return swapNode(node, html, "header");
};
