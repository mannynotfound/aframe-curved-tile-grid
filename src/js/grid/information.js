import {createEl, createContainer, removeExisting} from './utils';

AFRAME.registerComponent('information', {
  schema: {
    description: { default: '' },
    title: { default: '' },
    fadeIn: { type: 'boolean', default: true },
  },
  init() {
    this.createInformationHtml(this.data);

    this.el.addEventListener('update-information', e => {
      const newInfo = e.detail.information;
      this.titleEl.innerText = newInfo.title;
      this.descEl.innerText = newInfo.description;
      this.createInformationHtml({...newInfo, fadeIn: false});
    });
  },
  createInformationHtml({title, description, fadeIn}) {
    removeExisting('#information-html', '#information');

    this.infoEl = createEl('div', [
      ['id', 'information-html'],
      ['style', {
        'display': 'table',
        'height': '300px',
        'width': '500px',
        'background': 'rgba(255, 255, 255, 0.5)',
        'font-size': '20px',
        'font-family': 'Helvetica, arial, sans-serif',
        'padding-right': '20px',
      }]
    ], createContainer());

    const infoElInner = createEl('div', [
      ['id', 'information-html-inner'],
      ['style', {
        'display': 'table-cell',
        'vertical-align': 'middle',
      }],
    ], this.infoEl);

    this.titleEl = createEl('div', [
      ['id', 'title'],
      ['style', {
        'font-size': '36px',
        'font-weight': 'bold',
        'margin-bottom': '5px',
      }],
    ], infoElInner);
    this.titleEl.innerText = title;

    this.descEl = createEl('div', [
      ['id', 'description'],
      ['style', {'font-size': '20px'}],
    ], infoElInner);
    this.descEl.innerText = description;

    this.info = createEl('a-curvedimage', [
      ['id', 'information'],
      ['radius', 6],
      ['height', 3.9],
      ['theta-length', 50],
      ['position', '0 0 0'],
      ['rotation', '0 230.5 180'],
      ['material', 'opacity: 0; shader: html; target: #information-html'],
      ['flip-material', true],
    ], this.el);

    const fadeTime = fadeIn ? 250 : 1;
    const removeAttr = `durIn: ${fadeTime}; delayIn: ${fadeTime}`;
    this.info.setAttribute('removeable', removeAttr);
  },
});
