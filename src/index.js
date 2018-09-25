import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import JSON5 from 'json5';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const el = document.querySelector('[data-player="md-player"]');
const {
  src,
  srcDefault,
  themePrimary,
  themeSecondary,
  screenlist,
  screenlistInterval,
  series,
  ...props
} = el.dataset;
// normalize all src keys
const playerProps = Object.keys(props).reduce(
  (obj, key) => ({
    ...obj,
    [!/^src-\d{3,}p$/.test(key) ? key : key.replace('-', '')]: props[key],
  }),
  {},
);
if (!src && !srcDefault) {
  throw new Error('You must set "data-src" attribute for the player');
}
let videoScreenlist = [];
let videoScreenlistInterval = 0;
if (screenlist) {
  videoScreenlist = JSON5.parse(screenlist);
  if (screenlistInterval) {
    videoScreenlistInterval = parseFloat(screenlistInterval);
  }
}

let videoSeries = [];
if (series) {
  videoSeries = JSON5.parse(series);
}

if (themePrimary && themeSecondary) {
  Promise.all([
    require(`@material-ui/core/colors/${themePrimary}`),
    require(`@material-ui/core/colors/${themeSecondary}`),
  ]).then(([{ default: primary }, { default: secondary }]) => {
    const muiTheme = createMuiTheme({ palette: { primary, secondary } });
    ReactDOM.render(
      <App
        src={src || srcDefault}
        theme={muiTheme}
        screenlist={videoScreenlist}
        screenlistInterval={videoScreenlistInterval}
        series={videoSeries}
        {...playerProps}
      />,
      el,
    );
  });
} else {
  ReactDOM.render(
    <App
      src={src || srcDefault}
      screenlist={videoScreenlist}
      screenlistInterval={videoScreenlistInterval}
      series={videoSeries}
      {...playerProps}
    />,
    el,
  );
}
registerServiceWorker();
