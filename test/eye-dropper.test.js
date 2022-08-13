import { elementUpdated, expect, fixture, fixtureCleanup, html } from '@open-wc/testing';
import { EyeDropperElement } from '../src/eye-dropper.js';

EyeDropperElement.defineCustomElement();

describe('<eye-dropper>', () => {
  it('passes accessibility test', async () => {
    const el = await fixture(html`<eye-dropper></eye-dropper>`);
    await expect(el).to.be.accessible();
  });

  it('default properties', async () => {
    const el = await fixture(html`<eye-dropper></eye-dropper>`);

    expect(el.disabled).to.be.false;
    expect(el.getAttribute('disabled')).to.be.null;

    expect(el.copy).to.be.false;
    expect(el.getAttribute('copy')).to.be.null;
  });

  it('change default properties', async () => {
    const el = await fixture(html`<eye-dropper disabled copy></eye-dropper>`);

    expect(el.disabled).to.be.true;
    expect(el.getAttribute('disabled')).to.equal('');

    expect(el.copy).to.be.true;
    expect(el.getAttribute('copy')).to.equal('');
  });

  it('change properties programmatically', async () => {
    const el = await fixture(html`<eye-dropper></eye-dropper>`);

    el.disabled = true;
    el.copy = true;

    await elementUpdated(el);

    expect(el.disabled).to.be.true;
    expect(el.getAttribute('disabled')).to.equal('');

    expect(el.copy).to.be.true;
    expect(el.getAttribute('copy')).to.equal('');

    el.disabled = false;
    el.copy = false;

    await elementUpdated(el);

    expect(el.disabled).to.be.false;
    expect(el.getAttribute('disabled')).to.be.null;

    expect(el.copy).to.be.false;
    expect(el.getAttribute('copy')).to.be.null;
  });

  it('change button slot', async () => {
    const el = await fixture(html`
      <eye-dropper>
        <button slot="button" type="button">Pick a color</button>
      </eye-dropper>
    `);

    expect(el).lightDom.to.equal('<button slot="button" type="button">Pick a color</button>');
  });

  it('change button slot with non button element', async () => {
    const el = await fixture(html`
      <eye-dropper>
        <a href="#" slot="button" role="button">Pick a color</a>
      </eye-dropper>
    `);

    expect(el).lightDom.to.equal('<a href="#" slot="button" role="button">Pick a color</a>');
  });

  it('role="button" is added on button slot if node is not button', async () => {
    const el = await fixture(html`
      <eye-dropper>
        <a href="#" slot="button">Pick a color</a>
      </eye-dropper>
    `);

    expect(el).lightDom.to.equal('<a href="#" slot="button" role="button">Pick a color</a>');
  });

  it('change button-label slot', async () => {
    const el = await fixture(html`
      <eye-dropper>
        <span slot="button-content">Pick a color</span>
      </eye-dropper>
    `);

    expect(el).lightDom.to.equal('<span slot="button-content">Pick a color</span>');
  });

  afterEach(() => {
    fixtureCleanup();
  });
});
