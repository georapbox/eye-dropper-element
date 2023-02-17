var t,e,n,s;function i(t,e,n){if(!e.has(t))throw new TypeError("attempted to "+n+" private field on non-instance");return e.get(t)}function o(t,e){return e.get?e.get.call(t):e.value}function r(t,e){return o(t,i(t,e,"get"))}function a(t,e){if(e.has(t))throw new TypeError("Cannot initialize the same private elements twice on an object")}function l(t,e,n){a(t,e),e.set(t,n)}function d(t,e,n){if(!e.has(t))throw new TypeError("attempted to get private field on non-instance");return n}function c(t,e){a(t,e),e.add(t)}t={},e="EyeDropperElement",n=function(){return v},Object.defineProperty(t,e,{get:n,set:s,enumerable:!0,configurable:!0});const h=document.createElement("template");h.innerHTML='\n  <style>\n    *,\n    *::before,\n    *::after {\n      box-sizing: border-box;\n    }\n    :host([hidden]) {\n      display: none !important;\n    }\n  </style>\n\n  <slot name="button">\n    <button type="button" part="button">\n      <slot name="button-label">Pick color</slot>\n    </button>\n  </slot>\n';var u=new WeakMap,b=new WeakMap,p=new WeakMap,m=new WeakSet,w=new WeakSet,f=new WeakSet;class v extends HTMLElement{static get observedAttributes(){return["disabled"]}attributeChangedCallback(t){if("disabled"===t){const t=d(this,w,E).call(this);t.disabled=this.disabled,t.setAttribute("aria-disabled",this.disabled),t.part&&t.part.contains("button")&&t.part.toggle("button--disabled",this.disabled)}}connectedCallback(){window.EyeDropper||(this.hidden=!0);const t=d(this,m,y).call(this),e=d(this,w,E).call(this);t&&t.addEventListener("slotchange",r(this,p)),e&&e.addEventListener("click",r(this,b)),d(this,f,g).call(this,"disabled")}disconnectedCallback(){const t=d(this,m,y).call(this),e=d(this,w,E).call(this);t&&t.removeEventListener("slotchange",r(this,p)),e&&e.removeEventListener("click",r(this,b))}get disabled(){return this.hasAttribute("disabled")}set disabled(t){t?this.setAttribute("disabled",""):this.removeAttribute("disabled")}get copy(){return this.hasAttribute("copy")}set copy(t){t?this.setAttribute("copy",""):this.removeAttribute("copy")}static defineCustomElement(t="eye-dropper"){"undefined"==typeof window||window.customElements.get(t)||window.customElements.define(t,v)}constructor(){super(),c(this,m),c(this,w),c(this,f),l(this,u,{writable:!0,value:[]}),l(this,b,{writable:!0,value:async t=>{if(t.preventDefault(),!window.EyeDropper||this.disabled)return;const e=new window.EyeDropper;let n;try{if(n=await e.open(),r(this,u).includes(n.sRGBHex)||r(this,u).push(n.sRGBHex),this.dispatchEvent(new CustomEvent("eye-dropper:success",{bubbles:!0,composed:!0,detail:{result:n,colors:r(this,u)}})),this.copy)try{await navigator.clipboard.writeText(n.sRGBHex),this.dispatchEvent(new CustomEvent("eye-dropper:copy",{bubbles:!0,composed:!0,detail:{value:n.sRGBHex}}))}catch{}}catch(t){"AbortError"===t.name?this.dispatchEvent(new Event("eye-dropper:abort",{bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("eye-dropper:error",{bubbles:!0,composed:!0,detail:{error:t}}))}}}),l(this,p,{writable:!0,value:t=>{if(t.target&&"button"===t.target.name){const t=d(this,w,E).call(this);t&&(t.removeEventListener("click",r(this,b)),t.addEventListener("click",r(this,b)),"BUTTON"===t.nodeName||t.hasAttribute("role")||t.setAttribute("role","button"))}}}),this.shadowRoot||(this.attachShadow({mode:"open"}),this.shadowRoot.appendChild(h.content.cloneNode(!0)))}}function y(){return this.shadowRoot.querySelector('slot[name="button"]')}function E(){const t=d(this,m,y).call(this);return t?t.assignedElements({flatten:!0}).find((t=>"BUTTON"===t.nodeName||"button"===t.getAttribute("slot"))):null}function g(t){if(Object.prototype.hasOwnProperty.call(this,t)){const e=this[t];console.log(t),delete this[t],this[t]=e}}v.defineCustomElement();export{v as EyeDropperElement};
//# sourceMappingURL=eye-dropper-defined.js.map
