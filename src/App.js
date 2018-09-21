import React from 'react';
import VideoPlayer from './VideoPlayer';
import withRoot from './withRoot';

const App = ({ src, ...props }) => <VideoPlayer src={src} {...props} />;

export default withRoot(App);
