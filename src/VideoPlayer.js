import React from 'react';
import { findDOMNode } from 'react-dom';
import ReactPlayer from 'react-player';
import screenfull from 'screenfull';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Slider from '@material-ui/lab/Slider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PauseCircleFilled from '@material-ui/icons/PauseCircleFilled';
import PlayCircleFilled from '@material-ui/icons/PlayCircleFilled';
import Replay from '@material-ui/icons/Replay';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import VolumeUp from '@material-ui/icons/VolumeUp';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeOff from '@material-ui/icons/VolumeOff';
import VolumeMute from '@material-ui/icons/VolumeMute';
import Settings from '@material-ui/icons/Settings';
import Replay5 from '@material-ui/icons/Replay5';
import Forward5 from '@material-ui/icons/Forward5';
import PropTypes from 'prop-types';
import 'animate.css/animate.min.css';

const progressSize = 80;
const progressMargin = -progressSize / 2;
const controlBarHeight = 30;
const styles = theme => {
  const primaryContrastColor = theme.palette.getContrastText(theme.palette.primary.main);
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
    },
    next5s: {
      right: 20,
      extend: 'prevNext5s',
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
  };

  static defaultProps = {
    controls: true,
    src: '',
    'src-240p': '',
    'src-360p': '',
    'src-480p': '',
    'src-720p': '',
    'src-1080p': '',
  };

  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      playing: false,
      buffering: true,
      ended: false,
      playedSeconds: 0,
      progress: 0,
      fullscreen: false,
      settingsOpening: false,
      hiddenControlBar: false,
      muted: false,
      volume: 50,
      volumeControlOpening: false,
      currentSrc: props.src,
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

  onMouseMove = () => {
    const { ready, hiddenControlBar } = this.state;
    if (!ready) {
      return;
    }
    if (hiddenControlBar) {
      this.setState({ hiddenControlBar: false });
    }
  };

  onPlayerKeyDown = e => {
    const { playedSeconds, progress, ready } = this.state;
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
    const percentPerSec = progress / playedSeconds;
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

  root;

  render() {
    const {
      classes, src, style, controls, className, ...res
    } = this.props;
    const {
      playing,
      progress,
      fullscreen,
      hiddenControlBar,
      ready,
      muted,
      volume,
      settingsOpening,
      next5s,
      prev5s,
      currentSrc,
    } = this.state;
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
              width: '100vw',
              height: '100vh',
            }
        }
        {...res}
      >
        <div className={classes.wrapper}>
          <div
            role="button"
            className={classes.playerWrapper}
            tabIndex={0}
            onClick={this.togglePlaying}
            onMouseMove={this.onMouseMove}
            onKeyDown={this.onPlayerKeyDown}
          >
            <ReactPlayer
              url={currentSrc}
              width="100%"
              height="100%"
              playing={playing}
              volume={volume / 100}
              muted={muted}
              onBuffer={() => {
                this.setState({ buffering: true });
              }}
              onPlay={() => {
                this.setState({
                  ended: false,
                  buffering: false,
                });
              }}
              onReady={ref => {
                this.player = ref;
                this.player.wrapper.querySelector('iframe').style.visibility = 'visible';
                this.setState({
                  buffering: false,
                  ready: true,
                });
              }}
              onProgress={({ playedSeconds, played }) => {
                this.setState({
                  playedSeconds,
                  progress: played * 100,
                  buffering: false,
                });
              }}
              onEnded={() => {
                this.setState({
                  ended: true,
                });
              }}
              onError={err => {
                console.error(err);
              }}
              progressInterval={100}
            />
          </div>
          {this.renderPlayPauseButton()}
          {!prev5s ? null : (
            <Replay5
              classes={{
                colorPrimary: classes.controlBarButtonPrimaryColor,
              }}
              color="primary"
              className={classes.prev5s.concat(' animated fadeOut delay-1s')}
            />
          )}
          {!next5s ? null : (
            <Forward5
              classes={{
                colorPrimary: classes.controlBarButtonPrimaryColor,
              }}
              color="primary"
              className={classes.next5s.concat(' animated fadeOut delay-1s')}
            />
          )}
          {!controls ? null : (
            <AppBar
              position="absolute"
              classes={{
                root: classes.controlBar.concat(
                  !hiddenControlBar || !fullscreen ? '' : ' animated slideOutDown delay-1s',
                ),
              }}
            >
              <Toolbar>
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
                {this.renderVolumeController()}
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
                    this.setState({
                      progress: prog,
                    });
                    this.player.seekTo(prog / 100);
                  }}
                />
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
                <IconButton
                  className={classes.controlBarButton}
                  disabled={!ready}
                  onClick={() => {
                    screenfull.toggle(findDOMNode(this));
                    this.setState({
                      fullscreen: !fullscreen,
                      hiddenControlBar: true,
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
              </Toolbar>
            </AppBar>
          )}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VideoPlayer);
