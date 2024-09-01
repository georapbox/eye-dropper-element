const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/eye-dropper.js' : '../lib/eye-dropper.js';

const eyeDropperEl = document.querySelector('eye-dropper');
const consoleEl = document.getElementById('console');
const pickedColorsEl = document.getElementById('picked-colors');
const copyInput = document.getElementById('copyInput');
const disableInput = document.getElementById('disableInput');
const sourceCodeHTML = document.getElementById('sourceCodeHTML');

const renderSourceCode = (eyeDropperEl, sourceCodeEl) => {
  if (!eyeDropperEl || !sourceCodeEl) {
    return;
  }

  const attrs = Array.from(eyeDropperEl.attributes);
  const getDesiredAttrs = attr => ['copy', 'disabled'].includes(attr.name);
  const getAttrName = attr => attr.name;
  const attrNames = attrs.length > 0 ? attrs.filter(getDesiredAttrs).map(getAttrName).join(' ') : '';
  const code = `&lt;eye-dropper${attrNames ? ' ' + attrNames : ''}&gt;
  &lt;span slot="button-label"&gt;Pick a color&lt;/span&gt;
&lt;/eye-dropper&gt;`;
  sourceCodeEl.innerHTML = code;
  window.hljs.highlightBlock(sourceCodeEl);
};

document.addEventListener('DOMContentLoaded', () => {
  window.hljs.highlightAll();
});

document.addEventListener('eye-dropper:success', async evt => {
  console.log('eye-dropper:success -> ', evt.detail);
  consoleEl.innerHTML += `<div>$ eye-dropper:success -> ${JSON.stringify(evt.detail)}</div>`;
  consoleEl.scrollTop = consoleEl.scrollHeight;
  pickedColorsEl.innerHTML = evt.detail.colors
    .map(color => {
      return `<li><div style="background-color:${color};"></div> ${color}</li>`;
    })
    .join('');
});

document.addEventListener('eye-dropper:error', evt => {
  console.log('eye-dropper:error -> ', evt.detail);
  consoleEl.innerHTML += `<div>$ eye-dropper:error -> ${evt.detail.error.name}: ${evt.detail.error.message}</div>`;
  consoleEl.scrollTop = consoleEl.scrollHeight;
});

document.addEventListener('eye-dropper:abort', () => {
  console.log('eye-dropper:abort');
  consoleEl.innerHTML += `<div>$ eye-dropper:abort</div>`;
  consoleEl.scrollTop = consoleEl.scrollHeight;
});

document.addEventListener('eye-dropper:copy', evt => {
  console.log('eye-dropper:copy ->', evt.detail.value);
  consoleEl.innerHTML += `<div>$ eye-dropper:copy -> ${JSON.stringify(evt.detail)}</div>`;
  consoleEl.scrollTop = consoleEl.scrollHeight;
});

copyInput.addEventListener('change', evt => {
  eyeDropperEl.copy = evt.target.checked;
  renderSourceCode(eyeDropperEl, sourceCodeHTML);
});

disableInput.addEventListener('change', evt => {
  eyeDropperEl.disabled = evt.target.checked;
  renderSourceCode(eyeDropperEl, sourceCodeHTML);
});

if (!('EyeDropper' in window)) {
  const supportErrorEl = document.getElementById('supportError');

  if (supportErrorEl) {
    supportErrorEl.hidden = false;
  }
}

const { EyeDropperElement } = await import(componentUrl);
EyeDropperElement.defineCustomElement();
