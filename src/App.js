import React, { Component } from 'react';
import VideoPlayer from './VideoPlayer';
import withRoot from './withRoot';

class App extends Component {
  render() {
    const { src, ...props } = this.props;
    return (
      <VideoPlayer url={src} {...props} />
    );
  }
}

export default withRoot(App);