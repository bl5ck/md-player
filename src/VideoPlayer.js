import React from 'react';
import { findDOMNode } from 'react-dom'
import ReactPlayer from 'react-player';
import screenfull from 'screenfull'
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
// import LinearProgress from '@material-ui/core/LinearProgress';
import Slider from '@material-ui/lab/Slider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
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
const styles = {
  root: {
    width: '100%',
  },
  wrapper: {
    position: 'relative',
    '&:before': {
      content: '""',
      paddingBottom: '56.25%',
      display: 'block'
    }
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
      pointerEvents: 'none'
    }
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
      marginLeft: -30
    },
    '&:last-child': {
      marginRight: -30
    }
  },
  controlBarButtonPrimaryColor: {
    color: 'white'
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
      background: 'black',
      zIndex: -1
    },
  },
  prevNext5s: {
    position: 'absolute',
    top: '50%',
    transform: 'translate(0, -50%)',
    fontSize: 70
  },
  prev5s: {
    left: 20,
    extend: 'prevNext5s'
  },
  next5s: {
    right: 20,
    extend: 'prevNext5s'
  },
  volumeControlButton: {
    marginLeft: -5,
    '&:first-child': {
      marginLeft: -5
    },
    '&:last-child': {
      marginRight: -5
    }
  },
  volumeControlWrapper: {
    position: 'relative',
  },
  volumeControl: {
    position: 'absolute',
    bottom: 35,
    height: 100,
    left: -15,
    '&[role=slider]': {
      height: 70,
    }
  },
  volumeControlThumb: {
    background: 'white'
  },
  volumeControlTrackBefore: {
    background: 'white'
  },
  volumeControlTrackAfter: {
    background: 'white'
  },
  bufferProgress: {
    marginTop: '-33px',
  },
  bufferProgressThumb: {
    background: 'white'
  },
  bufferProgressTrackBefore: {
    background: 'white'
  },
  bufferProgressTrackAfter: {
    background: 'white'
  },
};

class VideoPlayer extends React.Component {
  static propTypes = {
    controls: PropTypes.bool
  }
  static defaultProps = {
    controls: true
  }
  state = {
    ready: false,
    playing: false,
    buffering: true,
    ended: false,
    playedSeconds: 0,
    progress: 0,
    fullscreen: false,
    hiddenControlBar: false,
    muted: false,
    volume: 50,
    volumeControlOpenning: false
  }
  player;
  togglePlaying = () => {
    if (!this.state.ready) {
      return;
    }
    this.setState({ playing: !this.state.playing, ended: false });
    if (this.state.ended) {
      this.player.seekTo(0);
    }
  }
  render() {
    const { classes, url, style, controls, className, ...res } = this.props;
    const { playing, buffering, ended, playedSeconds, progress, fullscreen, hiddenControlBar, ready, muted, volume, volumeControlOpenning, next5s, prev5s } = this.state;

    return <div className={classes.root.concat(' ', className || '')} style={!fullscreen ? style : {
      ...style,
      width: '100vw', height: '100vh'
    }} {...res}>
      <div className={classes.wrapper}>
        <div className={classes.playerWrapper}
          tabIndex={0}
          onClick={this.togglePlaying}
          onMouseMove={() => {
            if (hiddenControlBar) {
              this.setState({ hiddenControlBar: false });
            }
          }}
          onKeyDown={(e) => {
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
              prev5s
            });
            setTimeout(() => {
              this.setState({
                next5s: false,
                prev5s: false
              });
            }, 1000)
          }}>
          <ReactPlayer url={url}
            width={'100%'}
            height={'100%'}
            playing={playing}
            volume={volume / 100}
            muted={muted}
            onBuffer={() => {
              this.setState({ buffering: true })
            }}
            onPlay={() => {
              this.setState({
                ended: false,
                buffering: false
              })
            }}
            onReady={ref => {
              this.player = ref;
              this.player.wrapper.querySelector('iframe').style.visibility = 'visible';
              this.setState({
                buffering: false,
                ready: true,
              })
            }}
            onProgress={({ playedSeconds, played }) => {
              this.setState({
                playedSeconds,
                progress: played * 100,
                buffering: false,
              })
            }}
            onEnded={() => {
              this.setState({
                ended: true
              })
            }}
            onError={(err) => {
              console.error(err)
            }}
            progressInterval={100}
          />
        </div>
        {!buffering ?
          <IconButton className={classes.playPauseButton.concat(!ended ? !playing ? '' : ' animated fadeOut delay-0.5s' : ' ended')} disabled={!ready}>
            {!playing ?
              <PlayCircleFilled classes={{
                colorPrimary: classes.controlBarButtonPrimaryColor
              }} color="primary"
                fontSize="inherit" /> :
              !ended ?
                <PauseCircleFilled classes={{
                  colorPrimary: classes.controlBarButtonPrimaryColor
                }} color="primary"
                  fontSize="inherit" /> :
                <Replay classes={{
                  colorPrimary: classes.controlBarButtonPrimaryColor
                }} color="primary"
                  fontSize="inherit" />
            }
          </IconButton> :
          <CircularProgress className={classes.progress} thickness={5} size={progressSize} />}
        {!prev5s ? null : <Replay5 classes={{
          colorPrimary: classes.controlBarButtonPrimaryColor
        }} color="primary" className={classes.prev5s.concat(' animated fadeOut delay-0.5s')} />}
        {!next5s ? null : <Forward5 classes={{
          colorPrimary: classes.controlBarButtonPrimaryColor
        }} color="primary" className={classes.next5s.concat(' animated fadeOut delay-0.5s')} />}
        {!controls ? null :
          <AppBar position="absolute" classes={{
            root: classes.controlBar.concat(!hiddenControlBar || !fullscreen ? '' : ' animated slideOutDown delay-1s')
          }}><Toolbar>
              <IconButton className={classes.controlBarButton} disabled={!ready} onClick={this.togglePlaying}>
                {!playing ?
                  <PlayCircleFilled classes={{
                    colorPrimary: classes.controlBarButtonPrimaryColor
                  }} color="primary" /> :
                  <PauseCircleFilled classes={{
                    colorPrimary: classes.controlBarButtonPrimaryColor
                  }} color="primary" />
                }
              </IconButton>
              <span className={classes.volumeControlWrapper}>
                <IconButton className={classes.controlBarButton.concat(' ', classes.volumeControlButton)} disabled={!ready}
                  onClick={() => {
                    this.setState({
                      volumeControlOpenning: !volumeControlOpenning
                    })
                  }}
                  onDoubleClick={() => {
                    this.setState({ muted: !muted });
                  }}>
                  {
                    !muted ?
                      volume > 69 ?
                        <VolumeUp classes={{
                          colorPrimary: classes.controlBarButtonPrimaryColor
                        }} color="primary" /> :
                        volume > 0 ?
                          <VolumeDown classes={{
                            colorPrimary: classes.controlBarButtonPrimaryColor
                          }} color="primary" /> :
                          <VolumeMute classes={{
                            colorPrimary: classes.controlBarButtonPrimaryColor
                          }} color="primary" /> :
                      <VolumeOff classes={{
                        colorPrimary: classes.controlBarButtonPrimaryColor
                      }} color="primary" />
                  }
                </IconButton>
                {!volumeControlOpenning ? null :
                  <ClickAwayListener onClickAway={() => {
                    this.setState({
                      volumeControlOpenning: false
                    })
                  }}>
                    <Slider className={classes.volumeControl} classes={{
                      thumb: classes.volumeControlThumb,
                      trackBefore: classes.volumeControlTrackBefore,
                      trackAfter: classes.volumeControlTrackAfter
                    }} value={volume} disabled={!ready} vertical={true} reverse={true} onChange={(e, vol) => {
                      if (!ready) {
                        return;
                      }
                      this.setState({
                        volume: vol
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
                        this.setState({ volume: Math.max(0, Math.min(100, volume + totalLength)) });
                      }} />
                  </ClickAwayListener>
                }
              </span>
              <Slider className={classes.bufferProgress} classes={{
                thumb: classes.bufferProgressThumb,
                trackBefore: classes.bufferProgressTrackBefore,
                trackAfter: classes.bufferProgressTrackAfter
              }} value={progress} disabled={!ready} onChange={(e, prog) => {
                if (!ready) {
                  return;
                }
                this.setState({
                  progress: prog
                });
                this.player.seekTo(prog / 100);
              }} />
              <IconButton className={classes.controlBarButton} disabled={!ready} onClick={() => {

              }}>
                <Settings classes={{
                  colorPrimary: classes.controlBarButtonPrimaryColor
                }} color="primary" />
              </IconButton>
              <IconButton className={classes.controlBarButton} disabled={!ready} onClick={() => {
                screenfull.toggle(findDOMNode(this));
                this.setState({ fullscreen: !fullscreen, hiddenControlBar: true });
              }}>
                {(!fullscreen) ?
                  <Fullscreen classes={{
                    colorPrimary: classes.controlBarButtonPrimaryColor
                  }} color="primary" /> :
                  <FullscreenExit classes={{
                    colorPrimary: classes.controlBarButtonPrimaryColor
                  }} color="primary" />}
              </IconButton>
            </Toolbar></AppBar>}
      </div>
    </div>;
  }
}

export default withStyles(styles)(VideoPlayer);