import React from 'react';
import PropTypes from 'prop-types';
// Icons
import Replay5 from '@material-ui/icons/Replay5';
import Forward5 from '@material-ui/icons/Forward5';

const PreviousNext5s = ({ classes, prev5s, next5s }) => [
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

PreviousNext5s.propTypes = {
  classes: PropTypes.shape({
    controlBarButtonPrimaryColor: PropTypes.string.isRequired,
  }).isRequired,
  prev5s: PropTypes.bool.isRequired,
  next5s: PropTypes.bool.isRequired,
};

export default PreviousNext5s;
