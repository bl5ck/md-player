import React from 'react';
import PropTypes from 'prop-types';
// Material components
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
// Icons
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import Replay from '@material-ui/icons/Replay';

const PlayPause = ({
  classes, buffering, ended, playing, ready, progressSize,
}) => {
  if (!buffering) {
    let iconButtonClass;
    if (!ended) {
      iconButtonClass = !playing ? '' : ' animated fadeOut delay-0.5s';
    } else {
      iconButtonClass = ' ended';
    }
    let icon;
    if (!playing) {
      icon = (
        <PlayCircleFilled
          classes={{
            colorPrimary: classes.controlBarButtonPrimaryColor,
          }}
          color="primary"
          fontSize="inherit"
        />
      );
    } else {
      icon = !ended ? (
        <PauseCircleFilled
          classes={{
            colorPrimary: classes.controlBarButtonPrimaryColor,
          }}
          color="primary"
          fontSize="inherit"
        />
      ) : (
        <Replay
          classes={{
            colorPrimary: classes.controlBarButtonPrimaryColor,
          }}
          color="primary"
          fontSize="inherit"
        />
      );
    }
    return (
      <IconButton className={classes.playPauseButton.concat(iconButtonClass)} disabled={!ready}>
        {icon}
      </IconButton>
    );
  }
  return <CircularProgress className={classes.progress} thickness={5} size={progressSize} />;
};

PlayPause.propTypes = {
  classes: PropTypes.shape({
    playPauseButton: PropTypes.string.isRequired,
    controlBarButtonPrimaryColor: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired,
  }).isRequired,
  buffering: PropTypes.bool.isRequired,
  ended: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  progressSize: PropTypes.number.isRequired,
};
export default PlayPause;
