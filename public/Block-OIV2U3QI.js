import{a as c}from"./chunk-GQSCBKA6.js";var s=class{constructor(r,t){c(this,"children",[""]);c(this,"type","");this.children=t.map(e=>e.render?e.render():e()),this.type=r,this.html=`${this.children.join("")}`}render(r){let t=document.createElement("div");t.className=`${this.type}-wrapper`,t.innerHTML=this.html,r.replaceWith(t)}renderWithPictures(r,t){let e=document.createElement("div");e.className=`${this.type}-wrapper`,e.innerHTML=this.html,e.querySelectorAll("picture").forEach((n,i)=>{n.replaceWith(t[i])}),r.replaceWith(e)}prepend(r,t,e){let n=document.createElement("div");n.className=`${this.type}-wrapper`,n.innerHTML=this.html,n.querySelector("picture").replaceWith(t),e.forEach(i=>{i.remove()}),r.prepend(n)}};export{s as Block};
//# sourceMappingURL=Block-OIV2U3QI.js.map
