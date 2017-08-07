export function removeExisting(...selectors) {
  const existing = selectors.reduce((coll, s) => (
    coll.concat(...document.querySelectorAll(s))
  ), []);

  existing.forEach(e => {
    if (e && e.parentNode) e.parentNode.removeChild(e);
  });
}

export function emitGrid(event, detail = {}) {
  const grid = document.querySelector('[grid]');
  grid.emit(event, detail);
}

export function stringObj(obj = {}) {
  return Object.keys(obj).map(k => `${k}: ${obj[k]}`).join('; ');
}

export function addToScene(...els) {
  const scene = document.querySelector('a-scene');
  els.forEach(el => scene.appendChild(el));
}

function parseValue(val) {
  return typeof val === 'object' && !Array.isArray(val)
    ? stringObj(val)
    : val;
}

export function addInfo(information) {
  const existing = document.querySelector('[information]');
  if (existing) existing.parentNode.removeChild(existing);

  createEl('a-entity', [['information', information]]);
}

export function updateInfo(information) {
  const info = document.querySelector('[information]');
  info.emit('update-information', {information});
}

export function getNextIdx(dir, curr, total) {
  return dir === 'next'
    ? curr + 1 > total - 1 ? 0 : curr + 1
    : curr - 1 < 0 ? total - 1 : curr - 1;
}

export function removeControls() {
  const removeables = document.querySelectorAll('[removeable]');
  removeables.forEach(r => r.emit('remove'));
}

export function addControls(link) {
  createEl('a-entity', [['back-btn', true]]);
  createEl('a-entity', [['project-btn', `link: ${link}`]]);
  createEl('a-entity', [['layout-controls', true]]);
  createEl('a-entity', [['media-controls', true]]);
}

export function createEl(type, attributes = [], container) {
  const el = document.createElement(type);
  attributes.forEach(([p, v]) => el.setAttribute(p, parseValue(v)));
  container ? container.appendChild(el) : addToScene(el);
  return el;
}

export function createContainer() {
  const emptyContainers = document.querySelectorAll('.hide-html:empty');
  emptyContainers.forEach(e => e.parentNode.removeChild(e));
  const container = document.createElement('div');
  container.className = 'hide-html';
  document.body.appendChild(container);

  return container;
}
