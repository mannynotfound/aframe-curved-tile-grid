import makeGrid from './utils/make-grid';
import {
  addInfo, updateInfo, addControls, removeControls, getNextIdx
} from './utils';

import './utils/flip-material';
import './utils/hover-fade';
import './utils/removeable';
import './back-btn';
import './project-btn';
import './layout-controls';
import './media-controls';
import './information';
import './tile';

AFRAME.registerComponent('grid', {
  schema: {
    content: {default: '[]', parse: JSON.parse},
  },
  init() {
    makeGrid(this.data.content, this.el);
    this.setupFocus();
    this.setupControls();
  },
  setupFocus() {
    this.el.addEventListener('focus-tile', e => {
      if (this.active) { return; }
      const {tile, content} = e.detail;
      this.active = {tile, content};
      this.focusTile(tile.id);
      addInfo(content.information);
    });
    this.el.addEventListener('unfocus-tile', () => {
      if (!this.active) { return; }
      const activeId = this.active.tile.id;
      this.unfocusTile(activeId);
    });
  },
  setupControls() {
    this.el.addEventListener('layout-move', e => this.layoutMove(e.detail));
    this.el.addEventListener('media-move', e => this.mediaMove(e.detail));
  },
  layoutMove(dir) {
    const currIdx = Number(this.active.tile.getAttribute('data-index'));
    const nextIdx = getNextIdx(dir, currIdx, this.el.childNodes.length);

    const tile = this.el.childNodes[nextIdx];
    this.active.tile.emit('unfocus-instant');
    tile.emit('focus-instant');

    const content = this.data.content[nextIdx];
    updateInfo(content.information);

    this.active = {tile, content};
  },
  mediaMove(dir) {
    const tile = this.active.tile;
    tile.emit('media-move-tile', dir);
  },
  focusTile(activeId) {
    const emitTile = tile => tile.emit(tile.id === activeId ? 'focus' : 'hide');
    this.el.childNodes.forEach(emitTile);
    addControls(this.active.content.link);
  },
  unfocusTile(activeId) {
    const emitTile = tile => tile.emit(tile.id === activeId ? 'unfocus' : 'unhide');
    this.el.childNodes.forEach(emitTile);
    removeControls();
    setTimeout(() => { this.active = null; }, 500);
  }
});
