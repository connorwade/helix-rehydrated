import { makeSingle } from "../../utils";
import { getHTML } from "../getHTML";
import template from "./header.html";

export const Header = async (node) => {
  const html = await getHTML("/nav.plain.html");

  return makeSingle(
    node,
    template,
    () => ({
      content: html,
    }),
    "header"
  );
};
