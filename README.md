# Rehydrated AEM Edge Delivery Services
**By Connor Wade with assistance from Austen Wade**

## "She's built like SSR, but it handles like CSR"

Originally this project started out as way for me to work on hydration with a SSR solution. It then grew out of that into a full rewrite of AEM Edge's scripts.

Upon viewing the AEM Edge demo I noted several defiencies that I thought should be addressed:

1. There is quite a bit of hacking to get around CLS and it irks me quite a bit. For those not in the know, AEM Edge hides the rendering of the page from the user using a `display: none` property which is unset once the page has loaded. My problem with this hack is that if a user is not using JavaScript, then the end result will be nothing but a blank white page. It also ignores the "why" behind the CLS - pages should be basically styled as soon as possible for the end user. CLS should be covered by proper CSS. What is proper CSS? In my opinion, the standard CSS workflow should start with two steps: 1) normalize CSS and 2) layout the page. Since AEM Edge comes with an HTML file that is populated, you should be able to cover a basic render with just the HTML and CSS. Don't rely on JavaScript for styling and don't load CSS in chunks.

2. The waterfall for the loading of the page is not asynchronous and only goes a single element at a time. This is because, most of the JavaScript used does not take blocking of the main thread into account. I have modified the rendering of the page by including a script tag in the head that uses a mutation observer that watches the rendering of the page and performs asynchronous actions as nodes are added to the DOM. This is basically the fastest possible on-the-fly rendering that can be achieved. Trying to access DOM elements before this function runs results in errors because the elements don't even exist yet.

3. No preloading of "plain html" that would be used across all pages. Headers and footers should be preloaded by the HTML headers so that upon fetching in the code, you are using an already loaded asset.

4. No bundling. This precludes allowing developers to have a better workflow and bring more functionality. With bundling we are able to add CSS processors, island architecture, and all sorts of functionality that greatly extend AEM Edge.

5. Building components by creating JavaScript nodes and replacing them is far more taxing on the browser main thread than simply manipulating strings or swapping components. It also creates a terrible developer experience. I don't think my way of handling this was <i>much</i> better, but I made an attempt. I also am of the opinion that the demo adds far too many structural nodes to the page. More divs do not make a better layout. We should be reducing the amount of work we do to as close to zero as we can. Finding clever ways of performing work is not better than not having to do it at all. Most of the issues can be solved with CSS instead.

6. Do as much work as you can before letting the code reach the browser. Along the lines of bundling and component building, reduce the amount of work that reaches the browser is always the best thing that you can do. 

## How does this rewrite compare to the original demo?

- At this point, my work and AEM Edge can't be honestly compared. It isn't fair to me or the Edge developers. At this point, my layout and CSS and page functionality are *quite* different. I consider my work to be an extension of AEM Edge - not a replacement.
- With that said, in terms of comparison, when looking at performance profiling, my demo page renders around ~50ms while AEM Edge tends to render around 250ms. Rehydrated tends to use CPU and network far more aggressively than AEM Edge does.  In terms of Lighthouse numbers, both are at the 100 performance score with some variance depending on the network it's tested on. Rehydrated tends to beat Edge in speed, but it depends on the Edge page.
- Edge probably handles a few more *edge* cases than I do. But my code could probably be easily upgraded to do so.

My hope would be that Adobe or Adobe Partners take an interest in my work and are interested in using it to guide the framework forward.

## What engineering went into Rehydrated?

1. Rehydrated started with using the mutation observer, similar to the qwik framework, to hydrate components and data for AEM Edge. Using the Mutation Observer like this allows us to watch the rendering of the page and make changes as it goes. Why was this such a game changer for an SSR page? Because AEM Edge behaves like a CSR. Therefore, it almost becomes like React where we are rendering nodes to the DOM as needed. So the mutation observer was a huge step forward. Now is there a way to beat the mutation observer in terms of raw performance? Probably honestly. Is there a way to write a replacement as a single guy working on a framework after hours as a hobby? Probably not.

2. The current Block code just doesn't mesh with me or any of the engineers I've spoken with. Also let's just observe some of the code:

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
```

* This is the code used to render the cards on a page. Just looking at this, there really isn't a way that I as a developer can make immediate sense of what I'm seeing. Another issue is that we are creating nodes to replace nodes. And we are doing that 1-by-1. This just isn't efficient. Now, I think we could argue all day about what is actually a good developer experience, but I think the haphazard solution me and Austen found is a good step in the right direction:

```html
<!--Cards.html-->
<div class="card bg-white overflow-hidden shadow rounded-lg flex flex-col justify-center items-center">
  <div class="image-wrapper h-full">
    ${img}
  </div>
  <div class="card-content px-4 py-8">
    <h3 class="text-2xl font-bold mb-4">${title}</h3>
    <p>${description}</p>
  </div>
</div>
```

```js
//Cards.js
import template from "./card.html";
import { getData, makeMany } from "../../utils";

export const Cards = (node) => {
  const Card = (card) => ({
    title: getData(card, "p:nth-of-type(1)"),
    description: getData(card, "p:nth-of-type(2)"),
    img: card.querySelector("picture").outerHTML,
  });

  return makeMany(node, template, Card);
};
```

* Rather than replace nodes 1-by-1, we focus on building the component we want, extract the data we want, and swap parent nodes instantly. In addition to working this way, I also introduced island architecture to the code. For instance, you could replace a component with a Svelte or React component. Does this affect performance? With Svelte, not really. Lots of smaller frontend frameworks are great for this.

3. Is CSS chunking worth it? I have an issue with CSS chunking. CSS Chunking more than any other form of code splitting comes down to the ole "it depends" non-answer. How often do you reuse a component? Does it pretty much show on every page? At what point does the network load needed to fetch a chunked CSS file exceed the amount of time it would've taken to parse the CSS file? My guess is that it is almost never. Networks are slow. Browser fetching is slow. Parsing is fast. Extremely fast. And once it is parsed, it should be cached by a proper browser and website. That's also true of chunked CSS. And given that, I think it comes down to analyzing whether your CSS file has become so large that the parsing of it is slowing down the render of the page. Even then, I would honestly urge developers to look at splitting by screen size - which is browser supported. (Have a mobile CSS and a desktop CSS.) Then if you still need it, look into code-splitting. Anyways - this long rant isn't to say that I think any developer on Edge was wrong for going this route, I'm just stating why I decided to go in the opposite direction. However, I'm also leaving it open to change as engineering demands.

4. What about the preprocessors we use? Currently we are using TailwindCSS and esbuild. This isn't really a recommendation or even an endorsement of these products (although I do really like esbuild and I have gotten plenty of productivity out of Tailwind). Rather it shows that we can have our cake and eat it too. You can roll your own build system and CSS processor if you'd like. Could we include TypeScript as well? Absolutely. I didn't because I find TypeScript isn't that great for a singular developer. However, this just goes to show you can bring a lot of really interesting functionality to AEM Edge.

5. When I started this project, I floated the idea of using Web Workers to do heavy computation tasks, however, this has really become quite a bit more difficult than we intended. I don't think Web Workers are a good trade off at this point. But I will keep them in my back pocket in the future. In particular, I have noticed with AEM Edge sites that some still have problems with third-party libraries taking up huge amounts of main thread processing power. I think something like Partytown could be an interesting solution for these problems. Unfortunately Partytown is still in beta.

## Problems still being solved

- [] Mostly we're still looking at how Block development should look, feel, and function
- [] Interoping all functionality with AEM Edge
- [] Building on github pushes - I just don't know much about github workflows :/

