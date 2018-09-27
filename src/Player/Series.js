import React from 'react';
import PropTypes from 'prop-types';
// Material components
import IconButton from '@material-ui/core/IconButton';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// Icons
import Info from '@material-ui/icons/Info';

const Series = ({
  classes, series, onSourceChange, onSeriesItemClick, ready,
}) => (!ready || !series.length ? null : (
  <div className={classes.series}>
    <GridList cellHeight={140} className={classes.gridList}>
      {series.map(video => (
        <GridListTile
          className={classes.seriesItem}
          key={video.thumbnail}
          cols={2}
          role="button"
          onClick={() => {
            if (onSeriesItemClick) {
              onSeriesItemClick(video);
            }
            if (onSourceChange) {
              onSourceChange(video.src);
            }
            this.setState({
              currentSrc: video.src,
            });
          }}
        >
          <img
            src={video.thumbnail || (video.screenlist && video.screenlist[0])}
            alt={video.title}
          />
          <GridListTileBar
            title={video.title}
            subtitle={(
              <span
                dangerouslySetInnerHTML={!video.subtitle ? null : { __html: video.subtitle }}
              />
            )}
            actionIcon={(
              <IconButton className={classes.icon}>
                <Info
                  classes={{
                    colorPrimary: classes.controlBarButtonPrimaryColor,
                  }}
                  color="primary"
                />
              </IconButton>
            )}
          />
        </GridListTile>
      ))}
    </GridList>
  </div>
));

Series.propTypes = {
  classes: PropTypes.shape({
    controlBarButtonPrimaryColor: PropTypes.string.isRequired,
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
  onSourceChange: PropTypes.func,
  onSeriesItemClick: PropTypes.func,
  ready: PropTypes.bool.isRequired,
};
Series.defaultProps = {
  series: [],
  onSourceChange: undefined,
  onSeriesItemClick: undefined,
};

export default Series;
