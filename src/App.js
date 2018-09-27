import React from 'react';
import Player from './Player/Player';
import withRoot from './withRoot';

const App = props => <Player {...props} />;

export default withRoot(App);
