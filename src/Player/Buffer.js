import React from 'react';
import PropTypes from 'prop-types';
// Material components
import Slider from '@material-ui/lab/Slider';

const Buffer = ({
  progress,
  ready,
  screenlistShowing,
  currentScreenshot,
  classes,
  onDrag,
  onDragStart,
  onDragEnd,
}) => {
  const screenShot = !ready ? null : (
    <div
      className={classes.screenlist.concat(' animated ', !screenlistShowing ? 'fadeOut' : 'fadeIn')}
    >
      <div className={classes.screenlistImgWrapper}>
        <img
          key={currentScreenshot.replace(/\.(jpeg|jpg|png|gif|svg)$/, '')}
          alt={currentScreenshot}
          src={currentScreenshot}
        />
      </div>
    </div>
  );
  return (
    <Slider
      className={classes.bufferProgress}
      classes={{
        thumb: classes.bufferProgressThumb,
        trackBefore: classes.bufferProgressTrackBefore,
        trackAfter: classes.bufferProgressTrackAfter,
      }}
      value={progress}
      disabled={!ready}
      onChange={onDrag}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      thumb={screenShot}
    />
  );
};

Buffer.propTypes = {
  progress: PropTypes.number.isRequired,
  ready: PropTypes.bool.isRequired,
  screenlistShowing: PropTypes.bool.isRequired,
  currentScreenshot: PropTypes.string.isRequired,
  classes: PropTypes.shape({
    screenlist: PropTypes.string.isRequired,
    screenlistImgWrapper: PropTypes.string.isRequired,
    bufferProgress: PropTypes.string.isRequired,
    bufferProgressThumb: PropTypes.string.isRequired,
  }).isRequired,
  onDrag: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
};

export default Buffer;
