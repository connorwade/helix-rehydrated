(0,globalThis.parcelRequiref822.register)("eb3fU",function(e,t){Object.defineProperty(e.exports,"Block",{get:()=>r,set:void 0,enumerable:!0,configurable:!0});class r{children=[""];type="";constructor(e,t){this.children=t.map(e=>e.render()),this.type=e,this.html=`${this.children.join("")}`}/**
   *
   * @param {HTMLElement} nodeToSwap
   */render(e){let t=document.createElement("div");t.className=`${this.type}-wrapper`,t.innerHTML=this.html,e.replaceWith(t)}/**
   *
   * @param {HTMLElement} nodeToSwap
   * @param {HTMLPictureElement} pictureNodes
   */renderWithPictures(e,t){let r=document.createElement("div");r.className=`${this.type}-wrapper`,r.innerHTML=this.html,r.querySelectorAll("picture").forEach((e,r)=>{e.replaceWith(t[r])}),e.replaceWith(r)}/**
   *
   * @param {HTMLElement} node
   * @param {HTMLElement[]} nodesToDelete
   */prepend(e,t,r){let i=document.createElement("div");i.className=`${this.type}-wrapper`,i.innerHTML=this.html,i.querySelector("picture").replaceWith(t),r.forEach(e=>{e.remove()}),e.prepend(i)}}});//# sourceMappingURL=Block.580a6964.js.map

//# sourceMappingURL=Block.580a6964.js.map
