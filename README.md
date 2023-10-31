# Rehydrated AEM Edge

Originally this project started out as way for me to work on hydration with a SSR solution. It then grew out of that into a full rewrite of AEM Edge's scripts.

Upon viewing the AEM Edge demo I noted several defiencies that I thought should be addressed:

1. There is quite a bit of hacking to get around CLS and it irks me quite a bit. For those not in the know, AEM Edge hides the rendering of the page from the user using a `display: none` property which is unset once the page has loaded. My problem with this hack is that if a user is not using JavaScript, then the end result will be nothing but a blank white page. It also ignores the "why" behind the CLS - pages should be basically styled as soon as possible for the end user. My proposal for fixing CLS is therefore that we: A) perform a CSS reset in the header, B) load CSS files that layout the page beforehand, C) include any CSS updates in a minified CSS file. CSS is not that expensive. Generally once a browser parses CSS it really isn't a big deal. The instance on splitting the CSS and loading after the site has loaded doesn't really improve site performance.

2. The waterfall for the loading of the page is not asynchronous and only goes a single element at a time. This is because, most of the JavaScript used does not take blocking of the main thread into account. I have modified the rendering of the page by including a script tag in the head that uses a mutation observer that watches the rendering of the page and performs asynchronous actions as nodes are added to the DOM. This is basically the fastest possible on-the-fly rendering that can be achieved. Trying to access DOM elements before this function runs results in errors because the elements don't even exist yet.

3. No preloading of "plain html" that would be used across all pages. Headers and footers should be preloaded by the HTML headers so that upon fetching in the code, you are using an already loaded asset.

4. No bundling. I'm sorry, at this point, any web developers who fight against build steps in their coding do not understand web development. I don't know if Adobe is taking a stand against bundling or  if their demo just doesn't include it. Regardless, there is a lot of hacking in the demo to achieve code-splitting functionality and backwards compatibility that a bundler can achieve far better. Minification also leads to better data management especially for a system based on asynchronously loading data.

5. Building components by creating JavaScript nodes and replacing them is far more taxing on the browser main thread than simply manipulating strings or swapping components. It also creates a terrible developer experience. I don't think my way of handling this was <i>much</i> better, but I made an attempt. I also am of the opinion that the demo adds far too much structural nodes to the page. More divs do not make a better layout. We should be reducing the amount of work we do to as close to zero as we can. Finding clever ways of performing work is not better than not having to do it at all. Most of the issues can be solved with CSS instead.

6. Do as much work as you can before letting the code reach the browser. Along the lines of bundling and component building, reduce the amount of work that reaches the browser is always the best thing that you can do. 

## How does this rewrite compare to the original demo?

- It is probably dishonest to directly compare the demo of AEM Edge to my version, but for the most part, mine is faster and achieves roughly the same Lighthouse score.
- I have basically ignored mobile style rewrites as well as I changed how the header functions.
- I have completely bungled the images at this point and I am tired of fixing them.
- I have tried to work with the CSS as well as add my own which has lead to a lot of issues with getting a direct comparison.
- My attempts to use a bundler with my code, but this has lead to a lot of headaches. It probably didn't help that I chose Parcel, which is a great bundler. However, it just doesn't support nontraditional codebases. It'd probably be best to replace this with Vite, but I don't have the energy to do so currently.
- Edge probably handles a few more *edge* cases than I do. But my code could probably be easily upgraded to do so.

In conclusion, my rewrite is mostly for demonstration purposes, but I think it shows a path forward.

## A quick look at code

- The biggest improvement I've made is using the Mutation observer script at the top of the document. As the document is rendered by the browser, I intercept the element and do the work on it at render so that the time between render and "correct" render are basically the same

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
- AEM Edge's Block implementation looked like this:

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

- Here is how I organizaed my own components:

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
- Probably a lot of room for improvements
- Currenlty looks like the first version of React, at this rate I will reach React in 16 more versions!

## Bundling (work in progress)

- While I have installed parcel, there are a few issues that can't really be resolved at this time
- We need to have our `.git` file and our `head.html` in the same directory. Why? Because `aem cli` works a little funky.
- For some reason, nobody at Adobe thought it'd be a good idea to separate development from public code.
- Currently, the best way to resolve this issue is to grab your `head.html` file and copy it from `public` to the parent directory and change the file paths.
- If developing... I recommend just serving your development code. Parcel watch isn't going to work until we can work out how to copy head.html up

### What do I still need to do?
- [x] Resolve Static HTML fetching
- [x] Finish Block cleanup
- [ ] Image optimization code - images are loading in the wrong size and not respecting lazy loading (probably a shift in the layout caused by CSS)
- [x] Manipulate the general text elements to match AEM Edge's output
- [x] Ensure we are optimizing code by walking down the tree (viewport elements first & then the rest)
- [ ] On HTML fetch and render, we need to assign a new mutation observer to do work on the header
- [/] Development bundling - minification is a must