import {emitGrid} from './utils';

AFRAME.registerComponent('back-btn', {
  init() {
    this.el.id = 'back-btn';
    this.el.setAttribute('geometry', 'primitive: plane; width: auto; height: auto');
    this.el.setAttribute('material', 'color: #fff; opacity: 0');
    this.el.setAttribute('text', 'value: BACK; color: black; width: 0.5; wrapCount: 5; align: center; opacity: 0');
    this.el.setAttribute('position', '-0.05 2.5 -5');
    this.el.setAttribute('removeable', 'durIn: 250; delayIn: 250');
    this.el.setAttribute('removeable__text', 'property: text.opacity; durIn: 250; delayIn: 250');

    this.el.addEventListener('click', () => {
      emitGrid('unfocus-tile');
      this.el.parentNode.removeChild(this.el);
    });
  },
});
