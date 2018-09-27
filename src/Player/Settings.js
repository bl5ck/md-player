import React from 'react';
import { findDOMNode } from 'react-dom';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// Icons
import SettingsIcon from '@material-ui/icons/Settings';

class Settings extends React.Component {
  settingButton;

  render() {
    const {
      classes,
      ready,
      open,
      currentSrc,
      toggle,
      onResolutionChange,
      onMenuClose,
      container,
      ...res
    } = this.props;
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
        onClick={toggle}
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
        <SettingsIcon
          classes={{
            colorPrimary: classes.controlBarButtonPrimaryColor,
          }}
          color="primary"
        />
        <Menu
          anchorEl={this.settingButton}
          open={open}
          onClose={onMenuClose}
          classes={{ paper: classes.settingPaper }}
          container={container}
        >
          {supportedQualities.map(({ source, resolution }) => (
            <MenuItem
              key={resolution}
              selected={source === currentSrc}
              onClick={({ ...args }) => onResolutionChange(source, ...args)}
              className={classes.settingMenuItem}
            >
              {resolution}
            </MenuItem>
          ))}
        </Menu>
      </IconButton>
    );
  }
}

Settings.propTypes = {
  classes: PropTypes.shape({
    controlBarButtonPrimaryColor: PropTypes.string.isRequired,
    controlBarButton: PropTypes.string.isRequired,
    settingPaper: PropTypes.string.isRequired,
    settingMenuItem: PropTypes.string.isRequired,
  }).isRequired,
  ready: PropTypes.bool.isRequired,
  open: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
  currentSrc: PropTypes.string.isRequired,
  onResolutionChange: PropTypes.func.isRequired,
  container: PropTypes.object,
  onMenuClose: PropTypes.func,
};

Settings.defaultProps = {
  container: undefined,
  onMenuClose: undefined,
};

export default Settings;
