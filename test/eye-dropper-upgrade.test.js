import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import { EyeDropperElement } from '../src/eye-dropper.js';

describe('<eye-dropper> upgrading', () => {
  it('default properties', async () => {
    const el = await fixture(html`<eye-dropper></eye-dropper>`);

    // Update properties before upgrading
    el.disabled = true;
    el.copy = true;

    // Upgrade custom element
    EyeDropperElement.defineCustomElement();

    await elementUpdated(el);

    expect(el.getAttribute('disabled')).to.equal('');
    expect(el.getAttribute('copy')).to.equal('');
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
