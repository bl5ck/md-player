import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import JSON5 from 'json5';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const parseProps = element => {
  const {
    src,
    srcDefault,
    screenlist,
    screenlistInterval,
    series,
    onSourceChange,
    onSeriesItemClick,
    ...props
  } = element.dataset;
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
    videoSeries = JSON5.parse(series).map(
      ({ src: videoSrc, srcDefault: videoSrcDefault, ...videoProps }) => ({
        ...videoProps,
        src: videoSrc || videoSrcDefault,
      }),
    );
  }

  let videoOnSourceChange;

  if (onSourceChange) {
    videoOnSourceChange = new Function(`return ${onSourceChange}`)();
  }

  let videoOnSeriesItemClick;

  if (onSeriesItemClick) {
    videoOnSeriesItemClick = new Function(`return ${onSeriesItemClick}`)();
  }
  return {
    src: src || srcDefault,
    screenlist: videoScreenlist,
    screenlistInterval: videoScreenlistInterval,
    series: videoSeries,
    onSourceChange: videoOnSourceChange,
    onSeriesItemClick: videoOnSeriesItemClick,
    ...playerProps,
  };
};
const el = document.querySelector('[data-player="md-player"]');
const { themePrimary, themeSecondary, ...props } = parseProps(el);
if (themePrimary && themeSecondary) {
  Promise.all([
    require(`@material-ui/core/colors/${themePrimary}`),
    require(`@material-ui/core/colors/${themeSecondary}`),
  ]).then(([{ default: primary }, { default: secondary }]) => {
    const muiTheme = createMuiTheme({ palette: { primary, secondary } });
    ReactDOM.render(<App {...props} theme={muiTheme} />, el);
  });
} else {
  ReactDOM.render(<App {...props} />, el);
}
registerServiceWorker();
