import { swapNode } from "../../utils";
import { getHTML } from "../getHTML";
import template from "./footer.html";

export const render = async (node) => {
  const html = await getHTML("/footer.plain.html");
  swapNode(node, html, "footer");
};
