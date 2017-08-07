import {isEmpty, get} from 'lodash';
import {emitGrid} from './utils';
import {loadImage} from './utils/loaders';

function setAttr(el, property, value, animate = true) {
  if (animate) {
    el.removeAttribute(`animation__${property}`);
    el.setAttribute(`animation__${property}`, {
      property,
      to: value,
      dur: 500,
    });
  } else {
    el.setAttribute(property, value);
  }
}

const parsePosition = pos => ({
  x: Number(pos.x),
  y: Number(pos.y),
  z: Number(pos.z),
});

AFRAME.registerComponent('tile', {
  schema: {
    index: { type: 'number', parse: Number },
    radius: { type: 'number', parse: Number },
    ogHeight: { type: 'number', parse: Number },
    ogWidth: { type: 'number', parse: Number },
    opacity: { type: 'number', parse: Number, default: 0.9 },
    content: { parse: JSON.parse, default: '{}' },
    ogPos: { parse: JSON.parse, default: '{}' },
    ogRot: { parse: JSON.parse, default: '{}' },
  },
  init() {
    const {ogHeight, ogWidth, ogPos, ogRot, radius, opacity, index} = this.data;

    this.setAttrs([
      ['data-index', index],
      ['radius', radius],
      ['height', ogHeight],
      ['theta-length', ogWidth],
      ['position', ogPos],
      ['rotation', ogRot],
      ['opacity', opacity],
      ['hover-fade', true],
    ], false);

    this.setupClick();
    this.setupFocus();
    this.setupUnfocus();
    this.setupHide();
    this.setupTexture();
  },
  setupClick() {
    this.el.addEventListener('click', () => {
      emitGrid('focus-tile', {tile: this.el, content: this.data.content});
    });
  },
  setupFocus() {
    const focusAttrs = [
      ['position', '0 0 0'],
      ['rotation', '0 129.5 0'],
      ['height', 3.9],
      ['theta-length', 50],
    ];

    this.el.addEventListener('focus', () => {
      this.el.removeAttribute('hover-fade');
      this.setAttrs(focusAttrs);
    });

    this.el.addEventListener('focus-instant', () => {
      const currMat = this.el.getAttribute('material');
      this.setAttrs([
        ...focusAttrs,
        ['material', {...currMat, opacity: 1}],
      ], false);
    });
  },
  setupUnfocus() {
    const {ogHeight, ogWidth, ogPos, ogRot} = this.data;

    this.el.addEventListener('unfocus', () => {
      this.el.setAttribute('hover-fade', true);
      this.setAttrs([
        ['height', ogHeight],
        ['theta-length', ogWidth],
        ['position', ogPos],
        ['rotation', ogRot],
        ['material.opacity', 0.9],
      ]);
    });

    this.el.addEventListener('unfocus-instant', () => {
      this.setAttrs([
        ['position', {...ogPos, z: ogPos.z - 1}],
        ['material', {opacity: 0}],
        ['rotation', ogRot],
        ['height', ogHeight],
        ['theta-length', ogWidth],
      ], false);
    });
  },
  setupHide() {
    this.el.addEventListener('hide', () => {
      this.el.removeAttribute('hover-fade');
      const currPos = parsePosition(this.el.getAttribute('position'));
      this.setAttrs([
        ['position', {...currPos, z: currPos.z - 1}],
        ['material.opacity', 0],
      ]);
    });

    this.el.addEventListener('unhide', () => {
      this.el.setAttribute('hover-fade', true);
      const currPos = parsePosition(this.el.getAttribute('position'));
      this.setAttrs([
        ['position', {...currPos, z: currPos.z + 1}],
        ['material.opacity', 0.9],
      ]);
    });
  },
  mediaMove(dir) {
    const {content} = this.data;

    let currIdx = Number(this.el.getAttribute('data-gallery-index'));
    if (typeof currIdx !== 'number') currIdx = 0;

    const thumbMedia = {
      type: get(content, 'type'),
      url: get(content, 'url'),
    };

    const galleryMedia = get(content, 'media');
    if (isEmpty(galleryMedia)) {
      return console.warn('Found no media gallery for this content.');
    }

    const allMedia = [thumbMedia].concat(galleryMedia);
    const nextIdx = dir === 'next'
      ? currIdx + 1 > allMedia.length - 1 ? 0 : currIdx + 1
      : currIdx - 1 < 0 ? allMedia.length - 1 : currIdx - 1;

    this.setImageTexture(allMedia[nextIdx]);
    this.el.setAttribute('data-gallery-index', nextIdx);
  },
  setupTexture() {
    this.setImageTexture(this.data.content);
    this.el.addEventListener('media-move-tile', e => this.mediaMove(e.detail));
  },
  setImageTexture({type, url}) {
    const isImg = type === 'photo' || type === 'gif';

    isImg && loadImage(url, false).then(({id}) => this.el.setAttribute('src', `#${id}`));
    type === 'gif' && this.el.setAttribute('shader', 'gif');
  },
  setAttrs(attributes, animate = true) {
    attributes.forEach(([p, v]) => setAttr(this.el, p, v, animate));
  },
});
