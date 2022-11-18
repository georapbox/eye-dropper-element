const eyeDropperUrl = window.location.href.includes('127.0.0.1') || window.location.href.includes('localhost')
  ? '../../dist/eye-dropper-defined.js'
  : 'https://unpkg.com/@georapbox/eye-dropper-element/dist/eye-dropper-defined.js';

import(eyeDropperUrl).then(() => {
  const eyeDropperEl = document.querySelector('eye-dropper');
  const consoleEl = document.getElementById('console');
  const pickedColorsEl = document.getElementById('picked-colors');
  const copyInput = document.getElementById('copyInput');
  const disableInput = document.getElementById('disableInput');

  document.addEventListener('eye-dropper:success', async evt => {
    console.log('eye-dropper:success -> ', evt.detail);
    consoleEl.innerHTML += `<div>$ eye-dropper:success -> ${JSON.stringify(evt.detail)}</div>`;
    pickedColorsEl.innerHTML = evt.detail.colors.map(color => {
      return `<li><div style="background-color:${color};"></div> ${color}</li>`;
    }).join('');
  });

  document.addEventListener('eye-dropper:error', evt => {
    console.log('eye-dropper:error -> ', evt.detail);
    consoleEl.innerHTML += `<div>$ eye-dropper:error -> ${evt.detail.error.name}: ${evt.detail.error.message}</div>`;
  });

  document.addEventListener('eye-dropper:abort', () => {
    console.log('eye-dropper:abort');
    consoleEl.innerHTML += `<div>$ eye-dropper:abort</div>`;
  });

  document.addEventListener('eye-dropper:copy', evt => {
    console.log('eye-dropper:copy ->', evt.detail.value);
    consoleEl.innerHTML += `<div>$ eye-dropper:copy -> ${JSON.stringify(evt.detail)}</div>`;
  });

  copyInput.addEventListener('change', evt => {
    eyeDropperEl.copy = evt.target.checked;
  });

  disableInput.addEventListener('change', evt => {
    eyeDropperEl.disabled = evt.target.checked;
  });

  if (!window.EyeDropper) {
    const errorPlaceholder = document.querySelector('.not-supported-error');
    errorPlaceholder.hidden = false;
    errorPlaceholder.textContent = 'EyeDropper API is not supported by your browser.';
  }
}).catch(err => console.error(err));
