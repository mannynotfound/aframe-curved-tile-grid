AFRAME.registerComponent('project-btn', {
  schema: {
    link: { default: '' },
  },
  init() {
    const {link} = this.data;
    this.el.id = 'project-btn';
    this.el.setAttribute('geometry', 'primitive: plane; width: auto; height: auto');
    this.el.setAttribute('material', 'color: #fff; opacity: 0');
    this.el.setAttribute('text', 'value: PROJECT PAGE; color: black; width: 1.2; wrapCount: 13; align: center; opacity: 0');
    this.el.setAttribute('position', '-0.05 -2.5 -5');
    this.el.setAttribute('removeable', 'durIn: 250; delayIn: 250; durOut: 0');
    this.el.setAttribute('removeable__text', 'property: text.opacity; durIn: 250; delayIn: 250');

    const url = link.startsWith('/')
      ? window.location.protocol + '//' + window.location.host + link
      : link;

    // TODO: make this a link when bugfix goes through
    //this.el.setAttribute('link', {
      //href: url,
      //visualAspectEnabled: false,
    //});

    this.el.addEventListener('click', () => {
      window.location.href = url;
    });
  },
});
