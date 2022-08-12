// import 'https://unpkg.com/@georapbox/eye-dropper-element/dist/eye-dropper-defined.min.js';
import '../src/eye-dropper-defined.js';

const $console = document.getElementById('console');

document.addEventListener('eye-dropper:success', evt => {
  console.log('eye-dropper:success -> ', evt.detail);
  $console.innerHTML += `<div>$ <span class="success">eye-dropper:success</span> -> ${JSON.stringify(evt.detail)}</div>`;
});

document.addEventListener('eye-dropper:error', evt => {
  console.log('eye-dropper:error -> ', evt.detail);
  $console.innerHTML += `<div>$ <span class="error">eye-dropper:error</span> -> ${evt.detail.error.name}: ${evt.detail.error.message}</div>`;
});

document.addEventListener('eye-dropper:abort', () => {
  console.log('eye-dropper:abort', 'Share is aborted');
  $console.innerHTML += `<div>$ <span class="warning">eye-dropper:abort</span></div>`;
});

if (!window.EyeDropper) {
  const errorPlaceholder = document.querySelector('.not-supported-error');
  errorPlaceholder.hidden = false;
  errorPlaceholder.textContent = 'EyeDropper API is not supported by your browser.';
}
