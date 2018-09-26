import React from 'react';
import VideoPlayer from './Player/VideoPlayer';
import withRoot from './withRoot';

const App = props => <VideoPlayer {...props} />;

export default withRoot(App);
