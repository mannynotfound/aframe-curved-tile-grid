import 'aframe';
import 'aframe-animation-component';
import 'aframe-gif-shader';
import 'aframe-html-shader';
import 'aframe-mouse-cursor-component';
import './grid';

import aScene from '../scene/index.hbs';
import {startApp} from './main';

window.isGearVR = AFRAME.utils.device.isGearVR();

document.addEventListener('DOMContentLoaded', () => {
  startApp(aScene);

  if (module.hot) {
    module.hot.accept();
  }
});
