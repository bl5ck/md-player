import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import screenfull from 'screenfull';
import { withStyles } from '@material-ui/core/styles';
// Material components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
// Icons
import 'animate.css/animate.min.css';

import CorePlayer from './CorePlayer';
import PlayPause from './PlayPause';
import PreviousNext5s from './PreviousNext5s';
import Settings from './Settings';
import Series from './Series';
import Volume from './Volume';
import Buffer from './Buffer';
import Fullscreen from './Fullscreen';

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
      '&:not([disabled])': {
        cursor: 'pointer',
      },
      '&> div': {
        pointerEvents: 'none',
      },
    },
    controlBar: {
      height: controlBarHeight,
      bottom: 0,
      top: 'auto',
      animationDuration: '0.3s',
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
      paddingLeft: 10,
      paddingBottom: controlBarHeight,
      right: 0,
      top: 0,
      zIndex: 1,
      userSelect: 'none',
      pointerEvents: 'none',
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
    seriesAnimationWrapper: {
      backgroundColor: 'rgba(0,0,0,0.8)',
      animationDuration: '0.5s',
      pointerEvents: 'all',
      overflowY: 'auto',
      overflowX: 'hidden',
    },
    seriesToggleButton: {
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'all',
    },
    seriesItem: {
      cursor: 'pointer',
    },
    rightEdgeHelper: {
      width: '5%',
      height: '100%',
      position: 'absolute',
      top: 0,
      right: 0,
    },
  };
};

class Player extends React.Component {
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
    onSourceChange: undefined,
    onSeriesItemClick: undefined,
  };

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      playing: false,
      buffering: true,
      ended: false,
      prev5s: false,
      next5s: false,
      progress: 0,
      fullscreen: false,
      settingsShowing: false,
      controlBarHidden: false,
      muted: false,
      volume: 50,
      volumeControlOpening: false,
      currentSrc: props.src,
      currentScreenshot: props.screenlist[0] || '',
      screenlistShowing: false,
      seriesShowing: false,
      seriesToggleButtonShowing: false,
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
      setTimeout(() => {
        this.setState({ controlBarHidden: true });
      }, 3000);
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

  onResolutionChange = source => {
    const { onSourceChange } = this.props;
    const { settingsShowing } = this.state;
    if (onSourceChange) {
      onSourceChange(source);
    }
    this.setState({
      settingsShowing: !settingsShowing,
      currentSrc: source,
    });
  };

  onVolumeClickAway = () => {
    this.setState({
      volumeControlOpening: false,
    });
  };

  onVolumeSlide = (e, vol) => {
    const { ready } = this.state;
    if (!ready) {
      return;
    }
    this.setState({
      volume: vol,
    });
  };

  onVolumeWheel = e => {
    const { volume } = this.state;
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
  };

  onBufferDrag = (e, prog) => {
    const { screenlist, screenlistInterval } = this.props;
    const { ready } = this.state;
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
  };

  onBufferDragStart = () => {
    this.setState({ screenlistShowing: true });
  };

  onBufferDragEnd = () => {
    this.setState({ screenlistShowing: false });
  };

  onFullscreenClick = () => {
    const { fullscreen } = this.state;
    screenfull.toggle(findDOMNode(this));
    this.setState({
      fullscreen: !fullscreen,
      controlBarHidden: true,
    });
  };

  onSeriesItemClick = (video, ...args) => {
    const { onSourceChange, onSeriesItemClick } = this.props;
    this.setState({
      seriesShowing: false,
      currentSrc: video.src,
    });
    if (onSourceChange) {
      onSourceChange(video.src);
    }
    if (onSeriesItemClick) {
      onSeriesItemClick(video, ...args);
    }
  };

  onSeriesToggleButtonMouseEnter = () => {
    this.setState({ seriesToggleButtonShowing: true });
  };

  onSeriesToggleButtonMouseLeave = () => {
    this.setState({ seriesToggleButtonShowing: false });
  };

  toggleSeries = isSeriesShowing => {
    const { seriesShowing } = this.state;
    this.setState({
      seriesShowing: typeof isSeriesShowing !== 'undefined' ? isSeriesShowing : !seriesShowing,
    });
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
        togglePlaying={this.togglePlaying}
      />
    );
  };

  renderVolumeController = () => {
    const { classes } = this.props;
    const {
      ready, muted, volume, volumeControlOpening,
    } = this.state;
    return (
      <Volume
        classes={classes}
        ready={ready}
        muted={muted}
        volume={volume}
        open={volumeControlOpening}
        onControlToggle={this.onVolumeControlToggle}
        onMuteToggle={this.onVolumeMuteToggle}
        onClickAway={this.onVolumeClickAway}
        onSlide={this.onVolumeSlide}
        onWheel={this.onVolumeWheel}
      />
    );
  };

  renderBufferProgress = () => {
    const { classes } = this.props;
    const {
      progress, ready, screenlistShowing, currentScreenshot,
    } = this.state;
    return (
      <Buffer
        progress={progress}
        ready={ready}
        screenlistShowing={screenlistShowing}
        currentScreenshot={currentScreenshot}
        classes={classes}
        onDrag={this.onBufferDrag}
        onDragStart={this.onBufferDragStart}
        onDragEnd={this.onBufferDragEnd}
      />
    );
  };

  renderPlayer = () => {
    const { classes } = this.props;
    const {
      ready, currentSrc, playing, volume, muted,
    } = this.state;
    return (
      <CorePlayer
        ready={ready}
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
    const {
      playing, ready, buffering, ended,
    } = this.state;
    return (
      <PlayPause
        classes={classes}
        container="controlBar"
        buffering={buffering}
        ended={ended}
        playing={playing}
        ready={ready}
        progressSize={progressSize}
        togglePlaying={this.togglePlaying}
      />
    );
  };

  renderPreviousNext5s = () => {
    const { classes } = this.props;
    const { prev5s, next5s } = this.state;
    return <PreviousNext5s classes={classes} prev5s={prev5s} next5s={next5s} />;
  };

  renderSettings = () => {
    const { classes, onSourceChange, ...res } = this.props;
    const { ready, settingsShowing, currentSrc } = this.state;
    return (
      <Settings
        classes={classes}
        onResolutionChange={this.onResolutionChange}
        toggle={() => {
          this.setState({
            settingsShowing: !settingsShowing,
          });
        }}
        ready={ready}
        open={settingsShowing}
        currentSrc={currentSrc}
        container={this.root}
        {...res}
      />
    );
  };

  renderFullScreenButton = () => {
    const { classes } = this.props;
    const { ready, fullscreen } = this.state;
    return (
      <Fullscreen
        classes={classes}
        ready={ready}
        onClick={this.onFullscreenClick}
        fullscreen={fullscreen}
      />
    );
  };

  renderControls = () => {
    const { classes, controls } = this.props;
    const { controlBarHidden, fullscreen } = this.state;
    let controlBarClass = ' animated delay-0.5s';
    if (fullscreen) {
      if (!controlBarHidden) {
        controlBarClass = controlBarClass.concat(' ', 'slideInUp');
      } else {
        controlBarClass = controlBarClass.concat(' ', 'slideOutDown');
      }
    }
    return !controls ? null : (
      <AppBar
        position="absolute"
        classes={{
          root: classes.controlBar.concat(controlBarClass),
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
    const { classes, series, onSourceChange } = this.props;
    const { ready, seriesShowing, seriesToggleButtonShowing } = this.state;
    return [
      <div
        key="rightEdgeHelper"
        className={classes.rightEdgeHelper}
        onMouseEnter={() => {
          this.setState({ seriesToggleButtonShowing: true });
        }}
        onMouseLeave={() => {
          this.setState({ seriesToggleButtonShowing: false });
        }}
      />,
      <Series
        key="seriesPane"
        classes={classes}
        series={series}
        onSourceChange={onSourceChange}
        onSeriesItemClick={this.onSeriesItemClick}
        onSeriesToggleButtonMouseEnter={this.onSeriesToggleButtonMouseEnter}
        onSeriesToggleButtonMouseLeave={this.onSeriesToggleButtonMouseLeave}
        toggle={this.toggleSeries}
        ready={ready}
        open={seriesShowing}
        toggleButtonShowing={seriesToggleButtonShowing}
      />,
    ];
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

export default withStyles(styles)(Player);
