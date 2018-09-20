import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const el = document.querySelector('[data-player="remat-player"]');
const { src, srcDefault, ...props } = el.dataset;
if (!src && !srcDefault) {
  throw new Error('You must set "data-src" attribute for the player');
}
ReactDOM.render(<App src={src || srcDefault} {...props} />, el);
registerServiceWorker();
