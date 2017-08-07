AFRAME.registerComponent('hover-fade', {
  dependencies: ['material'],
  init() {
    this._mouseEnter = this.mouseEnter.bind(this);
    this._mouseLeave = this.mouseLeave.bind(this);

    this.el.addEventListener('mouseenter', this._mouseEnter);
    this.el.addEventListener('mouseleave', this._mouseLeave);
  },
  mouseEnter() {
    this.el.setAttribute('material', {
      ...this.el.getAttribute('material'),
      opacity: 1,
    });
  },
  mouseLeave() {
    this.el.setAttribute('material', {
      ...this.el.getAttribute('material'),
      opacity: 0.9,
    });
  },
  remove() {
    this.el.removeEventListener('mouseenter', this._mouseEnter);
    this.el.removeEventListener('mouseleave', this._mouseLeave);
  },
});
