# React Material Video Player

React Material video player

## Demo

Check [the demo](https://md-player.herokuapp.com/) out!

## Powered by

- Player's core: [react-player brough to you by CookPete](https://github.com/CookPete/react-player)
- Player's UI: [material-ui](http://material-ui.com)
- Framework: [react](https://reactjs.org/)

## Feature

Able to play video from several sources:

- Self-hosted
- YouTube
- Facebook
- Twitch
- SoundCloud
- Streamable
- Vimeo
- Wistia
- Mixcloud
- DailyMotion

## Usage

### Standalone

```html
<div
  data-player="md-player"
  data-src="https://www.facebook.com/facebook/videos/10153231379946729"
  data-src-240p=""
  data-src-360p=""
  data-src-720p=""
  data-src-360p=""
  data-src-480p=""
  data-src-720p=""
  data-src-1080p=""
  data-theme-primary="pink"
  data-theme-secondary="blue"></div>
```

### React

```jsx
import React from 'react';
import VideoPlayer from './VideoPlayer';
import withRoot from './withRoot';

const App = ({
  src,
  src240p,
  src360p,
  src720p,
  src360p,
  src480p,
  src720p,
  src1080p,
  themePrimary,
  themeSecondary,
  ...props
  }) => (
    <VideoPlayer src={src}
                 src240p={src240p}
                 src360p={src360p}
                 src720p={src720p}
                 src360p={src360p}
                 src480p={src480p}
                 src720p={src720p}
                 src1080p={src1080p}
                 themePrimary={themePrimary}
                 themeSecondary={themeSecondary}
                 {...props} />
  );

export default withRoot(App);
```
