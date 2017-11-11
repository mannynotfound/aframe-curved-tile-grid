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

export function createEl(type, attributes = [], container) {
  const el = document.createElement(type);
  attributes.forEach(([p, v]) => el.setAttribute(p, parseValue(v)));
  container ? container.appendChild(el) : addToScene(el);
  return el;
}
