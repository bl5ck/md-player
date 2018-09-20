import React from 'react';
import { create } from 'jss';
import jssPreset from 'jss-preset-default';
import JssProvider from 'react-jss/lib/JssProvider';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import CssBaseline from '@material-ui/core/CssBaseline';

// A theme with custom primary and secondary color.
// It's optional.
const defaultTheme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green,
  },
});

// Create a JSS instance with the default preset of plugins.
// It's optional.
const jss = create(jssPreset());

// The standard class name generator.
// It's optional.
const generateClassName = createGenerateClassName();

function withRoot(Component) {
  return props => (
    <JssProvider jss={jss} generateClassName={generateClassName}>
      {/* MuiThemeProvider makes the theme available down the React tree
          thanks to React context. */}
      <MuiThemeProvider theme={props.theme || defaultTheme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    </JssProvider>
  );
}

export default withRoot;
