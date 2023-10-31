const fs = require("fs");

const head = fs.readFileSync("./public/head.html", "utf8");

const headWithPublic = head.replace(/(href|src)="(?!http)/g, '$1="/public');
fs.writeFileSync("./head.html", headWithPublic);
