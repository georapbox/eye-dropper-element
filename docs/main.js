// import 'https://unpkg.com/@georapbox/eye-dropper-element/dist/eye-dropper-defined.min.js';
import '../src/eye-dropper-defined.js';

const consoleEl = document.getElementById('console');
const pickedColorsEl = document.getElementById('picked-colors');

document.addEventListener('eye-dropper:success', evt => {
  console.log('eye-dropper:success -> ', evt.detail);
  consoleEl.innerHTML += `<div>$ <span class="success">eye-dropper:success</span> -> ${JSON.stringify(evt.detail)}</div>`;
  pickedColorsEl.innerHTML = evt.detail.colors.map(color => {
    return `<li><div style="background-color:${color};"></div> ${color}</li>`;
  }).join('');
});

document.addEventListener('eye-dropper:error', evt => {
  console.log('eye-dropper:error -> ', evt.detail);
  consoleEl.innerHTML += `<div>$ <span class="error">eye-dropper:error</span> -> ${evt.detail.error.name}: ${evt.detail.error.message}</div>`;
});

document.addEventListener('eye-dropper:abort', () => {
  console.log('eye-dropper:abort', 'Share is aborted');
  consoleEl.innerHTML += `<div>$ <span class="warning">eye-dropper:abort</span></div>`;
});

if (!window.EyeDropper) {
  const errorPlaceholder = document.querySelector('.not-supported-error');
  errorPlaceholder.hidden = false;
  errorPlaceholder.textContent = 'EyeDropper API is not supported by your browser.';
}
