# Rehydrated AEM Edge

What if AEM Edge didn't have terrible hydration, development, and rendering services?

## What makes this rewrite so special?

- Not using cheats and still achieving roughly the same performance as AEM Edge was previously.
- The biggest improvement I've made is using the Mutation observer script at the top of the document. As the document is rendered by the browser, I intercept the element and do the work on it at render so that the time between render and correct render are basically the same

```js
// rehydrated.js
async function hydratePage() {
  const observer = new MutationObserver(async (mutations) => {
    for (let mutation of mutations) {
      for (let node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;
        // ... so on
```


- Modern JavaScript
- Reduce client work
- Adobe was making blocks like this:

```js
export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-card-image';
      else div.className = 'cards-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.textContent = '';
  block.append(ul);
}
// + the additional functions that made sense of this
```

- I subscribe to the belief that most of the work you do should be before it hits the client:

```js
class Card {
  imgSrc = "";
  imgAlt = "";
  imgWidth = "";
  title = "";
  description = "";

  constructor(title, description, imgSrc, imgAlt, imgWidth) {
    this.title = title;
    this.description = description;
    this.imgSrc = imgSrc;
    this.imgAlt = imgAlt;
    this.imgWidth = imgWidth;
    this.html = `
    <li>
        <div class="cards-card-image">
         <img src="${this.imgSrc}" alt="${this.imgAlt}" width="${this.imgWidth}" loading="lazy"/>
        </div>
        <div class="cards-card-body">
          <p><strong>${this.title}</strong></p>
          <p>${this.description}</p>
        </div>
      </li>
    `;
  }

  render() {
    return this.html;
  }
}

class Cards {
  children = [""];

  constructor(children) {
    this.children = children.map((card) => card.render());
    this.html = `
    <ul>
        ${this.children.join("")}
    </ul>
    `;
  }

  render() {
    return this.html;
  }
}

/**
 *
 * @param {HTMLDivElement} node
 */
export function makeCards(node) {
  let cards = [];
  node.querySelectorAll(":scope > div").forEach((card) => {
    let pNode = card.querySelectorAll("p");
    /**
     * @type {HTMLImageElement}
     */
    let imgNode = card.querySelector("img");

    cards.push(
      new Card(
        pNode[0].innerText,
        pNode[1].innerText,
        imgNode.src,
        imgNode.alt,
        750
      )
    );
  });
  return new Cards(cards);
}
```

- While mine might look "wordier", the render is significantly faster because we are doing string manipulation rather than creating nodes at runtime and manipulating them.
- The side-effect is that developers feel a lot more organized with this.

### What do I still need to do?
- [-] Resolve Static HTML fetching
- [-] Finish Block cleanup
- [-] Image optimization code
- [-] Manipulate the general text elements to match AEM Edge's output
- [-] Ensure we are optimizing code by walking down the tree (viewport elements first & then the rest)
- [-] Possibly push block creation to web-workers who push it back to the main thread. Though, it seems like there aren't any advantages to doing so right now.
- [-] Development bundling - minification is a must