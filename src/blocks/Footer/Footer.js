import { makeSingle } from "../../utils";
import { getHTML } from "../getHTML";
import template from "./footer.html";

export const Footer = async (node) => {
  const html = await getHTML("/footer.plain.html");
  return makeSingle(
    node,
    template,
    () => ({
      content: html,
    }),
    "footer"
  );
};
