class Column {
  columnsContent = "";
  ctaHref = "";
  ctaText = "";
  picture = "";

  constructor(columnsContent, ctaHref, ctaText, picture, imgPos) {
    this.columnsContent = columnsContent;
    this.ctaHref = ctaHref;
    this.ctaText = ctaText;
    this.picture = picture;
    this.imgPos = imgPos;

    let contentEl = `
    <div>
    ${this.columnsContent}
        <p class="button-container">
            <a href="${this.ctaHref}" title="${this.ctaText}" class="button">${this.ctaText}</a>
        </p>
    </div>`;

    let pictureEl = `
        <div class="columns-img-col">
            <picture>
                ${this.picture}
            </picture>
        </div>`;

    this.html = `
    <div>
        ${imgPos === "left" ? pictureEl : contentEl}
        ${imgPos === "right" ? contentEl : pictureEl}
    </div>`;
  }

  render() {
    return this.html;
  }
}

// class Column2 {
//   content = "";
//   constructor(content) {
//     this.html = `
//         <div>
//             ${content}
//         </div>
//         `;
//   }

//   render() {
//     return this.html;
//   }
// }

class Columns {
  children = [""];
  constructor(children) {
    this.children = children.map((col) => col.render());
    this.html = `
        <div 
        class="columns block columns-${this.children.length}-cols"
        data-rendered="true">
            <div>${children.join("")}</div>
        </div>
    `;
  }
}

/**
 *
 * @param {HTMLDivElement} node
 */
export function makeColumns(node) {
  const cols = [...node.firstElementChild.children];
  node.classList.add(`columns-${cols.length}-cols`);
  node.classList.add("block");
  const pics = node.querySelectorAll("picture");

  for (const pic of pics) {
    const picWrapper = pic.closest("div");
    if (picWrapper && picWrapper.children.length === 1) {
      picWrapper.classList.add("columns-img-col");
    }
  }

  node.dataset.rendered = "true";
  console.log(node, node.parentElement);
}
