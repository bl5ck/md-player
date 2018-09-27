import React from 'react';
import PropTypes from 'prop-types';
// Material components
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/lab/Slider';
// Icons
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeOff from '@material-ui/icons/VolumeOff';
import VolumeMute from '@material-ui/icons/VolumeMute';

const Volume = ({
  classes,
  ready,
  muted,
  volume,
  open,
  onControlToggle,
  onMuteToggle,
  onClickAway,
  onSlide,
  onWheel,
}) => {
  let icon;
  if (!muted) {
    if (volume > 69) {
      icon = (
        <VolumeUp
          classes={{
            colorPrimary: classes.controlBarButtonPrimaryColor,
          }}
          color="primary"
        />
      );
    } else {
      icon = volume > 0 ? (
        <VolumeDown
          classes={{
            colorPrimary: classes.controlBarButtonPrimaryColor,
          }}
          color="primary"
        />
      ) : (
        <VolumeMute
          classes={{
            colorPrimary: classes.controlBarButtonPrimaryColor,
          }}
          color="primary"
        />
      );
    }
  } else {
    icon = (
      <VolumeOff
        classes={{
          colorPrimary: classes.controlBarButtonPrimaryColor,
        }}
        color="primary"
      />
    );
  }
  return (
    <span className={classes.volumeControlWrapper}>
      <IconButton
        className={classes.controlBarButton.concat(' ', classes.volumeControlButton)}
        disabled={!ready}
        onClick={onControlToggle}
        onDoubleClick={onMuteToggle}
      >
        {icon}
      </IconButton>
      {!open ? null : (
        <ClickAwayListener onClickAway={onClickAway}>
          <Slider
            className={classes.volumeControl}
            classes={{
              thumb: classes.volumeControlThumb,
              trackBefore: classes.volumeControlTrackBefore,
              trackAfter: classes.volumeControlTrackAfter,
            }}
            value={volume}
            disabled={!ready}
            vertical
            reverse
            onChange={onSlide}
            onWheel={onWheel}
          />
        </ClickAwayListener>
      )}
    </span>
  );
};

Volume.propTypes = {
  classes: PropTypes.shape({
    controlBarButton: PropTypes.string.isRequired,
    controlBarButtonPrimaryColor: PropTypes.string.isRequired,
    volumeControlWrapper: PropTypes.string.isRequired,
    volumeControlTrackAfter: PropTypes.string.isRequired,
    volumeControlTrackBefore: PropTypes.string.isRequired,
    volumeControl: PropTypes.string.isRequired,
    volumeControlThumb: PropTypes.string.isRequired,
  }).isRequired,
  ready: PropTypes.bool.isRequired,
  muted: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  open: PropTypes.bool.isRequired,
  onControlToggle: PropTypes.func.isRequired,
  onMuteToggle: PropTypes.func.isRequired,
  onClickAway: PropTypes.func.isRequired,
  onSlide: PropTypes.func.isRequired,
  onWheel: PropTypes.func.isRequired,
};

export default Volume;
