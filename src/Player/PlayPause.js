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
  classes,
  buffering,
  ended,
  playing,
  ready,
  progressSize,
  container,
  togglePlaying,
}) => {
  // in control bar button
  if (container !== 'player') {
    return (
      <IconButton className={classes.controlBarButton} disabled={!ready} onClick={togglePlaying}>
        {!playing ? (
          <PlayCircleFilled
            classes={{
              colorPrimary: classes.controlBarButtonPrimaryColor,
            }}
            color="primary"
          />
        ) : (
          <PauseCircleFilled
            classes={{
              colorPrimary: classes.controlBarButtonPrimaryColor,
            }}
            color="primary"
          />
        )}
      </IconButton>
    );
  }
  // in player button
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
      <IconButton
        onClick={togglePlaying}
        className={classes.playPauseButton.concat(iconButtonClass)}
        disabled={!ready}
      >
        {icon}
      </IconButton>
    );
  }
  return <CircularProgress className={classes.progress} thickness={5} size={progressSize} />;
};

PlayPause.propTypes = {
  classes: PropTypes.shape({
    playPauseButton: PropTypes.string.isRequired,
    controlBarButton: PropTypes.string.isRequired,
    controlBarButtonPrimaryColor: PropTypes.string.isRequired,
    progress: PropTypes.string.isRequired,
  }).isRequired,
  buffering: PropTypes.bool.isRequired,
  ended: PropTypes.bool.isRequired,
  playing: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  progressSize: PropTypes.number.isRequired,
  togglePlaying: PropTypes.func.isRequired,
  container: PropTypes.oneOf(['player', 'controlBar']),
};

PlayPause.defaultProps = {
  container: 'player',
};

export default PlayPause;
