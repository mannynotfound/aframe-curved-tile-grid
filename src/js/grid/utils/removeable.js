AFRAME.registerComponent('removeable', {
  dependencies: ['material'],
  multiple: true,
  schema: {
    property: { default: 'material.opacity' },
    durIn: { default: 500, type: 'number', parse: Number },
    delayIn: { default: 0, type: 'number', parse: Number },
    durOut: { default: 500, type: 'number', parse: Number },
    delayOut: { default: 0, type: 'number', parse: Number },
  },
  init() {
    const {durIn, delayIn, durOut, delayOut, property} = this.data;

    const inName = `animation__fade_in_${property}`;
    this.el.removeAttribute(inName);
    this.el.setAttribute(inName, {
      property,
      from: 0,
      to: 1,
      dur: durIn,
      delay: delayIn,
    });

    this.el.addEventListener('remove', e => {
      const outName = `animation__fade_out_${property}`;
      this.el.removeAttribute(outName);
      this.el.setAttribute(outName, {
        property,
        from: 1,
        to: 0,
        dur: durOut,
        delay: delayOut,
      });
      setTimeout(() => {
        if (this.el.parentNode) {
          this.el.parentNode.removeChild(this.el);
        }
      }, delayOut + durOut);
    });
  },
});
