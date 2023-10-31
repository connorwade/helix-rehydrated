const { readFileSync, writeFileSync } = require("node:fs");
const path = require("node:path");
const cheerio = require("cheerio");

const head = readFileSync(path.join(__dirname, `public/head.html`));
const $ = cheerio.load(head.toString());
const headTags = [];
$("link[href], script[src], meta").each(function (i, el) {
  if ("href" in el.attribs) {
    el.attribs["href"] = `public${el.attribs["href"]}`;
  } else if ("src" in el.attribs) {
    el.attribs["src"] = `public${el.attribs["src"]}`;
  }
  headTags.push(el.toString());
});
writeFileSync(__dirname + "/head.html", $.toString());
