(0,globalThis.parcelRequiref822.register)("cRojU",function(e,r){Object.defineProperty(e.exports,"makeCards",{get:()=>s,set:void 0,enumerable:!0,configurable:!0});class t{title="";description="";constructor(e,r){this.title=e,this.description=r,this.html=`
    <li>
        <div class="cards-card-image">
         <picture></picture>
        </div>
        <div class="cards-card-body">
          <p><strong>${this.title}</strong></p>
          <p>${this.description}</p>
        </div>
      </li>
    `}render(){return this.html}}class i{children=[""];constructor(e){this.children=e.map(e=>e.render()),this.html=`
    <div class="cards block">
    <ul>
        ${this.children.join("")}
    </ul>
    </div>
    `}render(){return this.html}}function s(e){let r=[],s=[];return e.querySelectorAll(":scope > div").forEach(e=>{let i=e.querySelectorAll("p");/**
     * @type {HTMLImageElement}
     */s.push(e.querySelector("picture")),r.push(new t(i[0].innerText,i[1].innerText))}),{cards:new i(r),pics:s}}});//# sourceMappingURL=Cards.336b0733.js.map

//# sourceMappingURL=Cards.336b0733.js.map
