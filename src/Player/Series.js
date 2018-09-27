import React from 'react';
import PropTypes from 'prop-types';
// Material components
import IconButton from '@material-ui/core/IconButton';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
// Icons
import ArrowLeft from '@material-ui/icons/ArrowLeft';
import Info from '@material-ui/icons/Info';

const Series = ({
  classes,
  series,
  onSeriesItemClick,
  onSeriesToggleButtonMouseEnter,
  onSeriesToggleButtonMouseLeave,
  ready,
  open,
  toggleButtonShowing,
  toggle,
}) => {
  const renderVideoSubtitle = video => (
    // eslint-disable-next-line react/no-danger
    <span dangerouslySetInnerHTML={!video.subtitle ? null : { __html: video.subtitle }} />
  );
  const actionIcon = (
    <IconButton className={classes.icon}>
      <Info
        classes={{
          colorPrimary: classes.controlBarButtonPrimaryColor,
        }}
        color="primary"
      />
    </IconButton>
  );
  return !ready || !series.length ? null : (
    <div className={classes.series}>
      <IconButton
        className={classes.seriesToggleButton.concat(
          ' animated delay-0.3s ',
          !toggleButtonShowing ? 'fadeOut' : 'fadeIn',
        )}
        onClick={() => toggle(true)}
        onMouseEnter={onSeriesToggleButtonMouseEnter}
        onMouseLeave={onSeriesToggleButtonMouseLeave}
      >
        <ArrowLeft
          classes={{
            colorPrimary: classes.controlBarButtonPrimaryColor,
          }}
          color="primary"
        />
      </IconButton>
      <ClickAwayListener onClickAway={() => toggle(false)}>
        <div
          className={classes.seriesAnimationWrapper.concat(
            ' animated delay-0.3s ',
            !open ? 'slideOutRight' : 'slideInRight',
          )}
        >
          <GridList cellHeight={140} className={classes.gridList}>
            {series.map(video => (
              <GridListTile
                className={classes.seriesItem}
                key={video.thumbnail}
                cols={2}
                role="button"
                onClick={() => {
                  onSeriesItemClick(video);
                }}
              >
                <img
                  src={video.thumbnail || (video.screenlist && video.screenlist[0])}
                  alt={video.title}
                />
                <GridListTileBar
                  title={video.title}
                  subtitle={renderVideoSubtitle(video)}
                  actionIcon={actionIcon}
                />
              </GridListTile>
            ))}
          </GridList>
        </div>
      </ClickAwayListener>
    </div>
  );
};

Series.propTypes = {
  classes: PropTypes.shape({
    controlBarButtonPrimaryColor: PropTypes.string.isRequired,
    seriesAnimationWrapper: PropTypes.string.isRequired,
    seriesToggleButton: PropTypes.string.isRequired,
  }).isRequired,
  series: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      ItemComponent: PropTypes.func,
      src: PropTypes.string,
      'src-240p': PropTypes.string,
      'src-360p': PropTypes.string,
      'src-480p': PropTypes.string,
      'src-720p': PropTypes.string,
      'src-1080p': PropTypes.string,
      screenlist: PropTypes.arrayOf(PropTypes.string),
    }),
  ),
  onSeriesItemClick: PropTypes.func.isRequired,
  onSeriesToggleButtonMouseEnter: PropTypes.func.isRequired,
  onSeriesToggleButtonMouseLeave: PropTypes.func.isRequired,
  toggleButtonShowing: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
Series.defaultProps = {
  series: [],
};

export default Series;
