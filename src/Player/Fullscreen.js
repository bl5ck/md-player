import React from 'react';
import PropTypes from 'prop-types';
// Material components
import IconButton from '@material-ui/core/IconButton';
// Icons
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';

const Fullscreen = ({
  classes, ready, onClick, fullscreen,
}) => (
  <IconButton className={classes.controlBarButton} disabled={!ready} onClick={onClick}>
    {!fullscreen ? (
      <FullscreenIcon
        classes={{
          colorPrimary: classes.controlBarButtonPrimaryColor,
        }}
        color="primary"
      />
    ) : (
      <FullscreenExit
        classes={{
          colorPrimary: classes.controlBarButtonPrimaryColor,
        }}
        color="primary"
      />
    )}
  </IconButton>
);

Fullscreen.propTypes = {
  classes: PropTypes.shape({
    controlBarButton: PropTypes.string.isRequired,
    controlBarButtonPrimaryColor: PropTypes.string.isRequired,
  }).isRequired,
  ready: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  fullscreen: PropTypes.bool.isRequired,
};

export default Fullscreen;
