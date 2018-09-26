import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';

const CorePlayer = ({
  currentSrc,
  playing,
  volume,
  muted,
  classes,
  togglePlaying,
  onMouseMove,
  onPlayerKeyDown,
  onReady,
  onPlay,
  onBuffer,
  onProgress,
  onEnded,
  onError,
}) => (
  <div
    role="button"
    className={classes.playerWrapper}
    tabIndex={0}
    onClick={togglePlaying}
    onMouseMove={onMouseMove}
    onKeyDown={onPlayerKeyDown}
  >
    <ReactPlayer
      url={currentSrc}
      width="100%"
      height="100%"
      playing={playing}
      volume={volume / 100}
      muted={muted}
      onBuffer={onBuffer}
      onPlay={onPlay}
      onReady={onReady}
      onProgress={onProgress}
      onEnded={onEnded}
      onError={onError}
      progressInterval={100}
    />
  </div>
);
CorePlayer.propTypes = {
  currentSrc: PropTypes.string.isRequired,
  playing: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  muted: PropTypes.bool.isRequired,
  classes: PropTypes.shape({ playerWrapper: PropTypes.string.isRequired }).isRequired,
  togglePlaying: PropTypes.func.isRequired,
  onMouseMove: PropTypes.func.isRequired,
  onPlayerKeyDown: PropTypes.func.isRequired,
  onReady: PropTypes.func.isRequired,
  onPlay: PropTypes.func.isRequired,
  onBuffer: PropTypes.func.isRequired,
  onProgress: PropTypes.func.isRequired,
  onEnded: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};
export default CorePlayer;
