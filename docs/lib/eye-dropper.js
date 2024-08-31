/*!
 * @georapbox/eye-dropper-element
 * A custom element that implements the EyeDropper API that allows the user to select colors from the screen.
 *
 * @version 2.0.1
 * @homepage https://github.com/georapbox/eye-dropper-element#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
var a=`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  :host([hidden]) {
    display: none !important;
  }
`,i=document.createElement("template");i.innerHTML=`
  <style>${a}</style>
  <slot name="button">
    <button type="button" part="button">
      <slot name="button-label">Pick color</slot>
    </button>
  </slot>
`;var n=class r extends HTMLElement{#s=[];constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open",delegatesFocus:!0}).appendChild(i.content.cloneNode(!0))}static get observedAttributes(){return["disabled"]}attributeChangedCallback(t,e,s){if(t==="disabled"&&e!==s){let o=this.#e();o&&(o instanceof HTMLButtonElement&&(o.disabled=this.disabled),o.setAttribute("aria-disabled",this.disabled.toString()),o.part&&o.part.contains("button")&&o.part.toggle("button--disabled",this.disabled))}}get disabled(){return this.hasAttribute("disabled")}set disabled(t){this.toggleAttribute("disabled",!!t)}get copy(){return this.hasAttribute("copy")}set copy(t){this.toggleAttribute("copy",!!t)}connectedCallback(){this.#i("disabled"),this.#i("copy"),"EyeDropper"in window||(this.hidden=!0);let t=this.#o(),e=this.#e();t?.addEventListener("slotchange",this.#n),e?.addEventListener("click",this.#t)}disconnectedCallback(){let t=this.#o(),e=this.#e();t?.removeEventListener("slotchange",this.#n),e?.removeEventListener("click",this.#t)}#t=async t=>{if(t.preventDefault(),!("EyeDropper"in window)||this.disabled)return;let e=new window.EyeDropper,s;try{if(s=await e.open(),this.#s.includes(s.sRGBHex)||this.#s.push(s.sRGBHex),this.dispatchEvent(new CustomEvent("eye-dropper:success",{bubbles:!0,composed:!0,detail:{result:s,colors:this.#s}})),this.copy)try{await navigator.clipboard.writeText(s.sRGBHex),this.dispatchEvent(new CustomEvent("eye-dropper:copy",{bubbles:!0,composed:!0,detail:{value:s.sRGBHex}}))}catch{}}catch(o){o.name==="AbortError"?this.dispatchEvent(new Event("eye-dropper:abort",{bubbles:!0,composed:!0})):this.dispatchEvent(new CustomEvent("eye-dropper:error",{bubbles:!0,composed:!0,detail:{error:o}}))}};#n=t=>{let e=t.target;if(e instanceof HTMLSlotElement&&e.name==="button"){let s=this.#e();s&&(s.removeEventListener("click",this.#t),s.addEventListener("click",this.#t),s.nodeName!=="BUTTON"&&!s.hasAttribute("role")&&s.setAttribute("role","button"))}};#o(){return this.shadowRoot?.querySelector('slot[name="button"]')??null}#e(){let t=this.#o();return t?t.assignedElements({flatten:!0}).find(e=>e.nodeName==="BUTTON"||e.getAttribute("slot")==="button")??null:null}#i(t){let e=this;if(Object.prototype.hasOwnProperty.call(e,t)){let s=e[t];delete e[t],e[t]=s}}static defineCustomElement(t="eye-dropper"){typeof window<"u"&&!window.customElements.get(t)&&window.customElements.define(t,r)}};export{n as EyeDropperElement};
