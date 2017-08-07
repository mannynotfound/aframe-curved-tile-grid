import {createEl, createContainer, removeExisting, emitGrid} from './utils';

AFRAME.registerComponent('layout-controls', {
  init() {
    removeExisting('#layout-left', '#a-layout-left', '#layout-right', '#a-layout-right');
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
      ['position', '0 0 0'],
    ];

    const leftEl = createEl('div', [
      ['id', 'layout-left'],
      ['style', ctrlStyles],
      ['font-size', '90px'],
      ['line-height', '115px'],
      ['text-align', 'center'],
    ], createContainer());
    leftEl.innerText = '➫';

    const rightEl = createEl('div', [
      ['id', 'layout-right'],
      ['style', ctrlStyles],
      ['font-size', '90px'],
      ['line-height', '115px'],
      ['text-align', 'center'],
    ], createContainer());
    rightEl.innerText = '➫';

    const left = createEl('a-curvedimage', [
      ...ctrlAttrs,
      ['id', 'a-layout-left'],
      ['rotation', '0 231 0'],
      ['material', 'opacity: 0; shader: html; target: #layout-left'],
    ]);
    left.removeAttribute('flip-material');
    left.addEventListener('click', () => {
      emitGrid('layout-move', 'previous');
    });

    const right = createEl('a-curvedimage', [
      ...ctrlAttrs,
      ['id', 'a-layout-right'],
      ['rotation', '0 129 180'],
      ['material', 'opacity: 0; shader: html; target: #layout-right'],
      ['flip-material', true],
    ]);
    right.addEventListener('click', () => {
      emitGrid('layout-move', 'next');
    });

    left.setAttribute('removeable', 'durIn: 250; delayIn: 250');
    right.setAttribute('removeable', 'durIn: 250; delayIn: 250');
  },
});
