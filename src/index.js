import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const el = document.querySelector('[data-player="md-player"]');
const {
  src, srcDefault, themePrimary, themeSecondary, ...props
} = el.dataset;
if (!src && !srcDefault) {
  throw new Error('You must set "data-src" attribute for the player');
}
if (themePrimary && themeSecondary) {
  Promise.all([
    require(`@material-ui/core/colors/${themePrimary}`),
    require(`@material-ui/core/colors/${themeSecondary}`),
  ]).then(([{ default: primary }, { default: secondary }]) => {
    console.log(primary);
    const muiTheme = createMuiTheme({ palette: { primary, secondary } });
    ReactDOM.render(<App src={src || srcDefault} theme={muiTheme} {...props} />, el);
  });
} else {
  ReactDOM.render(<App src={src || srcDefault} {...props} />, el);
}
registerServiceWorker();
