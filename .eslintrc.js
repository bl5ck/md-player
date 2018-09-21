module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 9,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'import/no-dynamic-require': 'off',
    'global-require': 'off',
    'react/jsx-filename-extension': 'off',
    'linebreak-style': 'off',
    'react/no-find-dom-node': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
  },
};
