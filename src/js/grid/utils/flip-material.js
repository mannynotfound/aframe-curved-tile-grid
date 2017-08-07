import {get} from 'lodash';

AFRAME.registerComponent('flip-material', {
  dependencies: ['material'],
  init() {
    const map = get(this, ['el', 'components', 'material', 'material', 'map']);
    if (map) {
      map.flipY = false;
    } else {
      console.warn(`No material map found for ${this.el}`);
    }
  },
});
