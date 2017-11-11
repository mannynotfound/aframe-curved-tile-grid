import flatMapDeep from 'lodash.flatmapdeep';
import {loadImage} from './loaders';
import {createEl} from './utils';
import {desktopGrid, mobileGrid} from './layouts';

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

AFRAME.registerComponent('tile', {
  schema: {
    index: { type: 'number', parse: Number },
    radius: { type: 'number', parse: Number },
    height: { type: 'number', parse: Number },
    width: { type: 'number', parse: Number },
    opacity: { type: 'number', parse: Number, default: 0.9 },
    content: { parse: JSON.parse, default: '{}' },
    position: { parse: JSON.parse, default: '{}' },
    rotation: { parse: JSON.parse, default: '{}' },
  },
  init() {
    this.setupAttrs();
    this.setupClick();
    this.setupTexture();
  },
  setupAttrs() {
    const {height, width, position, rotation, radius, opacity, index} = this.data;
    const attributes = [
      ['data-index', index],
      ['radius', radius],
      ['height', height],
      ['theta-length', width],
      ['position', position],
      ['rotation', rotation],
      ['opacity', opacity],
      ['hover-fade', true],
    ];

    attributes.forEach(([p, v]) => this.el.setAttribute(p, v));
  },
  setupClick() {
    this.el.addEventListener('click', () => {
      window.location.href = `/${this.data.index}`;
    });
  },
  setupTexture() {
    this.setImageTexture(this.data.content);
  },
  setImageTexture({type, url}) {
    const isImg = type === 'photo' || type === 'gif';

    isImg && loadImage(url, false).then(({id}) => this.el.setAttribute('src', `#${id}`));
    type === 'gif' && this.el.setAttribute('shader', 'gif');
  },
});

AFRAME.registerComponent('grid', {
  schema: {
    content: {
      default: '[]',
      parse: JSON.parse
    },
  },
  init() {
    const isMobile = AFRAME.utils.device.isMobile();
    const gridType = isMobile ? mobileGrid : desktopGrid;

    const flattenedGrid = flatMapDeep(gridType, grid => (
      grid.rows.map((row, rowIdx) => (
        row.cols.map((col, colIdx) => ({row, rowIdx, col, colIdx}))
      ))
    ));

    const zDepth = isMobile ? -3 : 0;

    flattenedGrid.forEach(({row, rowIdx, col, colIdx}, index) => {
      createEl('a-curvedimage', [
        ['id', `tile__${rowIdx}_${colIdx}`],
        ['tile', {
          index,
          radius: row.radius,
          height: (col.height || row.rowHeight) - 0.1,
          width: col.width - 1,
          position: JSON.stringify({x: 0, y: col.posY || row.posY, z: zDepth}),
          rotation: JSON.stringify({x: 0, y: col.rotY, z: 0}),
          content: JSON.stringify(this.data.content[index]),
        }],
      ], this.el);
    });
  },
});
