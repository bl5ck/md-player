import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import screenfull from 'screenfull';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
// Material components
import Slider from '@material-ui/lab/Slider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
// Icons
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeOff from '@material-ui/icons/VolumeOff';
import VolumeMute from '@material-ui/icons/VolumeMute';
import Settings from '@material-ui/icons/Settings';
import Replay5 from '@material-ui/icons/Replay5';
import Forward5 from '@material-ui/icons/Forward5';
import Info from '@material-ui/icons/Info';
import 'animate.css/animate.min.css';

import CorePlayer from './CorePlayer';
import PlayPause from './PlayPause';

const progressSize = 80;
const progressMargin = -progressSize / 2;
const controlBarHeight = 30;
const styles = theme => {
  const primaryContrastColor = theme.palette.getContrastText(theme.palette.primary.main);
  const screenlistBorderColor = 'rgba(0,0,0,.5)';
  const screenlistBorderWidth = 10;
  const gradianFadeCover = {
    content: '""',
    display: 'block',
    position: 'absolute',
    left: 0,
    width: '100%',
    height: '15%',
    pointerEvents: 'none',
    zIndex: 1,
  };
  return {
    root: {
      width: '100%',
    },
    wrapper: {
      position: 'relative',
      '&:before': {
        content: '""',
        paddingBottom: '56.25%',
        display: 'block',
      },
    },
    progress: {
      margin: `${progressMargin}px 0 0 ${progressMargin}px`,
      position: 'absolute',
      top: '50%',
      left: '50%',
    },
    playerWrapper: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: 0,
      left: 0,
      cursor: 'pointer',
      '&> div': {
        pointerEvents: 'none',
      },
    },
    controlBar: {
      height: controlBarHeight,
      bottom: 0,
      top: 'auto',
    },
    controlBarButton: {
      marginTop: -35,
      marginLeft: -5,
      marginRight: -5,
      '&:first-child': {
        marginLeft: -30,
      },
      '&:last-child': {
        marginRight: -30,
      },
    },
    controlBarButtonPrimaryColor: {
      color: primaryContrastColor,
    },
    playPauseButton: {
      transform: 'translate(-50%, -50%)',
      fontSize: 100,
      height: 'auto',
      width: 'auto',
      position: 'absolute',
      top: '50%',
      left: '50%',
      pointerEvents: 'none',
      '&:not(.ended)::before': {
        content: '""',
        display: 'block',
        borderRadius: '50%',
        width: '50%',
        height: '50%',
        position: 'absolute',
        top: '25%',
        left: '25%',
        background: theme.palette.primary.main,
        zIndex: -1,
      },
    },
    prevNext5s: {
      position: 'absolute',
      top: '50%',
      transform: 'translate(0, -50%)',
      fontSize: 70,
    },
    prev5s: {
      left: 20,
      extend: 'prevNext5s',
      zIndex: 3,
    },
    next5s: {
      right: 20,
      extend: 'prevNext5s',
      zIndex: 3,
    },
    volumeControlButton: {
      marginLeft: -5,
      '&:first-child': {
        marginLeft: -5,
      },
      '&:last-child': {
        marginRight: -5,
      },
    },
    volumeControlWrapper: {
      position: 'relative',
    },
    volumeControl: {
      position: 'absolute',
      bottom: 35,
      height: 100,
      left: 5,
      width: 'auto',
      '&[role=slider]': {
        height: 70,
      },
    },
    volumeControlThumb: {
      background: primaryContrastColor,
    },
    volumeControlTrackBefore: {
      background: primaryContrastColor,
    },
    volumeControlTrackAfter: {
      background: primaryContrastColor,
    },
    bufferProgress: {
      marginTop: '-33px',
    },
    bufferProgressThumb: {
      background: primaryContrastColor,
    },
    bufferProgressTrackBefore: {
      background: primaryContrastColor,
    },
    bufferProgressTrackAfter: {
      background: primaryContrastColor,
    },
    screenlist: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 150,
      height: 90.5,
      transform: 'translate(-50%, calc(-100% - 20px))',
      padding: 7,
      background: screenlistBorderColor,
      '&::before': {
        content: '""',
        display: 'block',
        borderLeft: `${screenlistBorderWidth}px solid transparent`,
        borderRight: `${screenlistBorderWidth}px solid transparent`,
        borderTop: `10px solid ${screenlistBorderColor}`,
        width: 0,
        height: 0,
        position: 'absolute',
        left: `calc(50% - ${screenlistBorderWidth}px)`,
        bottom: -screenlistBorderWidth,
      },
    },
    screenlistImgWrapper: {
      overflow: 'hidden',
      width: '100%',
      height: '100%',
      '& > img': {
        width: '100%',
      },
    },
    settingPaper: {
      backgroundColor: theme.palette.primary.dark,
      fontSize: '80%',
      width: 100,
    },
    settingMenuItem: {
      color: theme.palette.getContrastText(theme.palette.primary.dark),
      paddingTop: 5,
      paddingBottom: 5,
    },
    series: {
      width: 320,
      height: '100%',
      position: 'absolute',
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: 'rgba(0,0,0,0.8)',
      paddingLeft: 10,
      paddingBottom: controlBarHeight,
      right: 0,
      top: 0,
      zIndex: 1,
      userSelect: 'none',
      '&::before': {
        extend: gradianFadeCover,
        top: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(255,255,255,0) 100%)',
      },
      '&::after': {
        extend: gradianFadeCover,
        bottom: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(255,255,255,0) 100%)',
      },
      '& img': {
        pointerEvents: 'none',
      },
    },
    seriesItem: {
      cursor: 'pointer',
    },
  };
};

class VideoPlayer extends React.Component {
  static propTypes = {
    controls: PropTypes.bool,
    src: PropTypes.string,
    'src-240p': PropTypes.string,
    'src-360p': PropTypes.string,
    'src-480p': PropTypes.string,
    'src-720p': PropTypes.string,
    'src-1080p': PropTypes.string,
    screenlist: PropTypes.arrayOf(PropTypes.string),
    screenlistInterval: PropTypes.number,
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
  };

  static defaultProps = {
    controls: true,
    src: '',
    'src-240p': '',
    'src-360p': '',
    'src-480p': '',
    'src-720p': '',
    'src-1080p': '',
    screenlist: [],
    screenlistInterval: 0,
    series: [],
    onSourceChange: null,
    onSeriesItemClick: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      playing: false,
      buffering: true,
      ended: false,
      // playedSeconds: 0,
      progress: 0,
      fullscreen: false,
      settingsOpening: false,
      controlBarHidden: false,
      muted: false,
      volume: 50,
      volumeControlOpening: false,
      currentSrc: props.src,
      currentScreenshot: props.screenlist[0] || '',
      screenlistShowing: false,
    };
  }

  settingButton;

  togglePlaying = () => {
    const { ready, playing, ended } = this.state;
    if (!ready) {
      return;
    }
    this.setState({ playing: !playing, ended: false });
    if (ended) {
      this.player.seekTo(0);
    }
  };

  onReady = ref => {
    this.player = ref;
    this.player.wrapper.querySelector('iframe').style.visibility = 'visible';
    this.setState({
      buffering: false,
      ready: true,
    });
  };

  onPlay = () => {
    this.setState({
      ended: false,
      buffering: false,
    });
  };

  onBuffer = () => {
    this.setState({ buffering: true });
  };

  onProgress = ({ playedSeconds, played }) => {
    const currentProgress = played * 100;
    const percentPerSec = currentProgress / playedSeconds;

    this.setState({
      // playedSeconds,
      progress: currentProgress,
      percentPerSec,
      buffering: false,
    });
  };

  onEnded = () => {
    this.setState({
      ended: true,
    });
  };

  onError = err => {
    console.error(err);
  };

  onMouseMove = () => {
    const { ready, controlBarHidden } = this.state;
    if (!ready) {
      return;
    }
    if (controlBarHidden) {
      this.setState({ controlBarHidden: false });
    }
  };

  onPlayerKeyDown = e => {
    const { progress, ready, percentPerSec } = this.state;
    if (!ready) {
      return;
    }
    let sectPerStep = 5;
    let next5s = true;
    let prev5s = false;
    if (e.key === 'ArrowLeft') {
      sectPerStep = -5;
      next5s = false;
      prev5s = true;
    }
    const nextProgress = Math.min(100, Math.max(0, progress + percentPerSec * sectPerStep));
    this.player.seekTo(nextProgress / 100);
    this.setState({
      next5s,
      prev5s,
    });
    setTimeout(() => {
      this.setState({
        next5s: false,
        prev5s: false,
      });
    }, 1000);
  };

  onVolumeControlToggle = () => {
    const { volumeControlOpening } = this.state;
    this.setState({
      volumeControlOpening: !volumeControlOpening,
    });
  };

  onVolumeMuteToggle = () => {
    const { muted } = this.state;
    this.setState({ muted: !muted });
  };

  player;

  renderPlayPauseButton = () => {
    const { classes } = this.props;
    const {
      buffering, ended, playing, ready,
    } = this.state;
    return (
      <PlayPause
        classes={classes}
        buffering={buffering}
        ended={ended}
        playing={playing}
        ready={ready}
        progressSize={progressSize}
      />
    );
  };

  renderVolumeController = () => {
    const { classes } = this.props;
    const {
      ready, muted, volume, volumeControlOpening,
    } = this.state;
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
          onClick={this.onVolumeControlToggle}
          onDoubleClick={this.onVolumeMuteToggle}
        >
          {icon}
        </IconButton>
        {!volumeControlOpening ? null : (
          <ClickAwayListener
            onClickAway={() => {
              this.setState({
                volumeControlOpening: false,
              });
            }}
          >
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
              onChange={(e, vol) => {
                if (!ready) {
                  return;
                }
                this.setState({
                  volume: vol,
                });
              }}
              onWheel={e => {
                const speed = Math.abs(e.deltaY / 100);
                let length = 10;
                if (e.deltaY > 0) {
                  // down
                  length = -10;
                }
                const totalLength = length * speed;
                this.setState({
                  volume: Math.max(0, Math.min(100, volume + totalLength)),
                });
              }}
            />
          </ClickAwayListener>
        )}
      </span>
    );
  };

  renderBufferProgress = () => {
    const { classes, screenlistInterval, screenlist } = this.props;
    const {
      progress, ready, screenlistShowing, currentScreenshot,
    } = this.state;
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
        onChange={(e, prog) => {
          if (!ready) {
            return;
          }
          const duration = this.player.getDuration();
          const screenshotExpectedNum = duration / screenlistInterval;
          const currentScreenshotIndex = Math.floor((screenshotExpectedNum / 100) * prog);
          if (screenlist[currentScreenshotIndex]) {
            this.setState({
              progress: prog,
              currentScreenshot: screenlist[currentScreenshotIndex],
            });
          } else {
            this.setState({
              progress: prog,
            });
          }
          this.player.seekTo(prog / 100);
        }}
        onDragStart={() => {
          this.setState({ screenlistShowing: true });
        }}
        onDragEnd={() => {
          this.setState({ screenlistShowing: false });
        }}
        thumb={
          !ready ? null : (
            <div
              className={classes.screenlist.concat(
                ' animated ',
                !screenlistShowing ? 'fadeOut' : 'fadeIn',
              )}
            >
              <div className={classes.screenlistImgWrapper}>
                <img
                  key={currentScreenshot.replace(/\.(jpeg|jpg|png|gif|svg)$/, '')}
                  alt={currentScreenshot}
                  src={currentScreenshot}
                />
              </div>
            </div>
          )
        }
      />
    );
  };

  renderPlayer = () => {
    const { classes } = this.props;
    const {
      currentSrc, playing, volume, muted,
    } = this.state;
    return (
      <CorePlayer
        currentSrc={currentSrc}
        playing={playing}
        volume={volume}
        muted={muted}
        classes={classes}
        togglePlaying={this.togglePlaying}
        onMouseMove={this.onMouseMove}
        onPlayerKeyDown={this.onPlayerKeyDown}
        onReady={this.onReady}
        onPlay={this.onPlay}
        onBuffer={this.onBuffer}
        onProgress={this.onProgress}
        onEnded={this.onEnded}
        onError={this.onError}
      />
    );
  };

  renderControlBarPlayPauseButton = () => {
    const { classes } = this.props;
    const { playing, ready } = this.state;
    return (
      <IconButton
        className={classes.controlBarButton}
        disabled={!ready}
        onClick={this.togglePlaying}
      >
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
  };

  renderPreviousNext5s = () => {
    const { classes } = this.props;
    const { prev5s, next5s } = this.state;
    return [
      !prev5s ? null : (
        <Replay5
          classes={{
            colorPrimary: classes.controlBarButtonPrimaryColor,
          }}
          key="video-previous-5s"
          color="primary"
          className={classes.prev5s.concat(' animated fadeOut delay-0.5s')}
        />
      ),
      !next5s ? null : (
        <Forward5
          classes={{
            colorPrimary: classes.controlBarButtonPrimaryColor,
          }}
          key="video-next-5s"
          color="primary"
          className={classes.next5s.concat(' animated fadeOut delay-0.5s')}
        />
      ),
    ];
  };

  renderSettings = () => {
    const { classes, onSourceChange, ...res } = this.props;
    const { ready, settingsOpening, currentSrc } = this.state;
    let supportedQualities = [
      {
        resolution: 'Auto',
        source: currentSrc,
      },
    ];
    Object.keys(res).forEach(key => {
      // src240p,
      // src360p,
      // src480p,
      // src720p,
      // src1080p,
      if (!res[key] || !/^src\d{3,}p$/.test(key)) {
        return;
      }
      const resolution = key.replace('src', '');
      const source = res[key];
      supportedQualities.push({
        resolution,
        source,
      });
    });
    // sort resolutions
    supportedQualities = supportedQualities.sort(
      ({ resolution }, { resolution: nextResolution }) => resolution > nextResolution,
    );
    return (
      <IconButton
        className={classes.controlBarButton}
        disabled={!ready}
        onClick={() => {
          this.setState({
            settingsOpening: !settingsOpening,
          });
        }}
        ref={ref => {
          if (!ref) {
            return;
          }
          const btn = findDOMNode(ref);
          if (!btn) {
            return;
          }
          this.settingButton = btn;
        }}
      >
        <Settings
          classes={{
            colorPrimary: classes.controlBarButtonPrimaryColor,
          }}
          color="primary"
        />
        <Menu
          anchorEl={this.settingButton}
          open={settingsOpening}
          onClose={this.handleClose}
          classes={{ paper: classes.settingPaper }}
          container={this.root}
        >
          {supportedQualities.map(({ source, resolution }) => (
            <MenuItem
              key={resolution}
              selected={source === currentSrc}
              onClick={() => {
                if (onSourceChange) {
                  onSourceChange(source);
                }
                this.setState({
                  settingsOpening: !settingsOpening,
                  currentSrc: source,
                });
              }}
              className={classes.settingMenuItem}
            >
              {resolution}
            </MenuItem>
          ))}
        </Menu>
      </IconButton>
    );
  };

  renderFullScreenButton = () => {
    const { classes } = this.props;
    const { ready, fullscreen } = this.state;
    return (
      <IconButton
        className={classes.controlBarButton}
        disabled={!ready}
        onClick={() => {
          screenfull.toggle(findDOMNode(this));
          this.setState({
            fullscreen: !fullscreen,
            controlBarHidden: true,
          });
        }}
      >
        {!fullscreen ? (
          <Fullscreen
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
  };

  renderControls = () => {
    const { classes, controls } = this.props;
    const { controlBarHidden, fullscreen } = this.state;
    return !controls ? null : (
      <AppBar
        position="absolute"
        classes={{
          root: classes.controlBar.concat(
            !controlBarHidden || !fullscreen ? '' : ' animated slideOutDown delay-1s',
          ),
        }}
      >
        <Toolbar>
          {this.renderControlBarPlayPauseButton()}
          {this.renderVolumeController()}
          {this.renderBufferProgress()}
          {this.renderSettings()}
          {this.renderFullScreenButton()}
        </Toolbar>
      </AppBar>
    );
  };

  renderSeries = () => {
    const {
      classes, series, onSourceChange, onSeriesItemClick,
    } = this.props;
    const { ready } = this.state;
    return !ready || !series.length ? null : (
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
    );
  };

  root;

  render() {
    const {
      classes,
      src,
      style,
      controls,
      className,
      screenlist,
      screenlistInterval,
      onSourceChange,
      onSeriesItemClick,
      ...res
    } = this.props;
    const { fullscreen } = this.state;

    return (
      <div
        className={classes.root.concat(' ', className || '')}
        ref={ref => {
          if (!ref) {
            return;
          }
          this.root = ref;
        }}
        style={
          !fullscreen
            ? style
            : {
              ...style,
              width: '100%',
              height: '100%',
            }
        }
        {...res}
      >
        <div className={classes.wrapper}>
          {this.renderPlayer()}
          {this.renderPlayPauseButton()}
          {this.renderPreviousNext5s()}
          {this.renderControls()}
          {this.renderSeries()}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VideoPlayer);
