import content from '../fixtures/content';

export function startApp(aScene) {
  const container = document.getElementById('container');
  container.innerHTML = aScene({contentStr: JSON.stringify(content)});
}
