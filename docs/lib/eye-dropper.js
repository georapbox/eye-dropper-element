/*!
 * @georapbox/eye-dropper-element
 * A custom element that implements the EyeDropper API that allows the user to select colors from the screen.
 *
 * @version 3.0.0
 * @homepage https://github.com/georapbox/eye-dropper-element#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
var n=window,a=`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :host([hidden]),
  [hidden],
  ::slotted([hidden]) {
    display: none !important;
  }
`,r=document.createElement("template");r.innerHTML=`
  <style>${a}</style>
  <slot name="button">
    <button type="button" part="button">
      <slot name="button-label">Pick color</slot>
    </button>
  </slot>
`;var i=class d extends HTMLElement{#n=null;#o=[];constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open",delegatesFocus:!0}).appendChild(r.content.cloneNode(!0))}static get observedAttributes(){return["disabled"]}attributeChangedCallback(t,o,e){if(t==="disabled"&&o!==e){let s=this.#e();s&&(s instanceof HTMLButtonElement&&(s.disabled=this.disabled),s.setAttribute("aria-disabled",this.disabled.toString()),s.part&&s.part.contains("button")&&s.part.toggle("button--disabled",this.disabled))}}get disabled(){return this.hasAttribute("disabled")}set disabled(t){this.toggleAttribute("disabled",!!t)}get copy(){return this.hasAttribute("copy")}set copy(t){this.toggleAttribute("copy",!!t)}connectedCallback(){this.#r("disabled"),this.#r("copy");let t=this.#s(),o=this.#e();t?.addEventListener("slotchange",this.#i),o?.addEventListener("click",this.#t)}disconnectedCallback(){let t=this.#s(),o=this.#e();t?.removeEventListener("slotchange",this.#i),o?.removeEventListener("click",this.#t)}#t=async t=>{if(t.preventDefault(),this.disabled)return;if(typeof n.EyeDropper>"u"){this.dispatchEvent(new CustomEvent("eye-dropper:error",{bubbles:!0,composed:!0,detail:{error:new Error("The EyeDropper API is not supported by this platform.")}}));return}let o=this.#n??(this.#n=new n.EyeDropper);try{let e=await o.open();if(this.#o.includes(e.sRGBHex)||this.#o.push(e.sRGBHex),this.dispatchEvent(new CustomEvent("eye-dropper:success",{bubbles:!0,composed:!0,detail:{result:e,colors:this.#o}})),this.copy)try{await navigator.clipboard.writeText(e.sRGBHex),this.dispatchEvent(new CustomEvent("eye-dropper:copy",{bubbles:!0,composed:!0,detail:{value:e.sRGBHex}}))}catch{}}catch(e){e.name==="AbortError"?this.dispatchEvent(new Event("eye-dropper:abort",{bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("eye-dropper:error",{bubbles:!0,composed:!0,detail:{error:e}}))}};#i=t=>{let o=t.target;if(o instanceof HTMLSlotElement&&o.name==="button"){let e=this.#e();e&&(e.removeEventListener("click",this.#t),e.addEventListener("click",this.#t),e.nodeName!=="BUTTON"&&!e.hasAttribute("role")&&e.setAttribute("role","button"))}};#s(){return this.shadowRoot?.querySelector('slot[name="button"]')??null}#e(){let t=this.#s();return t?t.assignedElements({flatten:!0}).find(o=>o.nodeName==="BUTTON"||o.getAttribute("slot")==="button")??null:null}#r(t){let o=this;if(Object.prototype.hasOwnProperty.call(o,t)){let e=o[t];delete o[t],o[t]=e}}static defineCustomElement(t="eye-dropper"){typeof window<"u"&&!window.customElements.get(t)&&window.customElements.define(t,d)}};export{i as EyeDropperElement};
