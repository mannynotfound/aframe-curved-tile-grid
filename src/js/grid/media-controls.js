import {createContainer, createEl, removeExisting, emitGrid} from './utils';

AFRAME.registerComponent('media-controls', {
  init() {
    removeExisting('#media-left', '#a-media-left', '#media-right', '#a-media-right');
    const ctrlStyles = {
      'height': '100px',
      'width': '100px',
      'font-size': '90px',
      'line-height': '115px',
      'text-align': 'center',
    };

    const ctrlAttrs = [
      ['radius', 6],
      ['height', 0.5],
      ['theta-length', 4.5],
      ['position', '0 -2.5 0'],
    ];

    const leftEl = createEl('div', [
      ['id', 'media-left'],
      ['style', ctrlStyles],
    ], createContainer());
    leftEl.innerText = '➜';

    const rightEl = createEl('div', [
      ['id', 'media-right'],
      ['style', ctrlStyles],
    ], createContainer());
    rightEl.innerText = '➜';

    const left = createEl('a-curvedimage', [
      ...ctrlAttrs,
      ['id', 'a-media-left'],
      ['rotation', '0 155 0'],
      ['material', 'opacity: 0; shader: html; target: #media-left'],
    ]);
    left.addEventListener('click', () => {
      emitGrid('media-move', 'previous');
    });

    const right = createEl('a-curvedimage', [
      ...ctrlAttrs,
      ['rotation', '0 152 180'],
      ['material', 'opacity: 0; shader: html; target: #media-right'],
      ['flip-material', true],
    ]);
    right.addEventListener('click', () => {
      emitGrid('media-move', 'next');
    });

    left.setAttribute('removeable', 'durIn: 250; delayIn: 250');
    right.setAttribute('removeable', 'durIn: 250; delayIn: 250');
  },
});
