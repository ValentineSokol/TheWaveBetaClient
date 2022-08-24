module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state',
      ],
    }],
    'react/button-has-type': 0,
    'import/no-cycle': 0,
    'react/no-danger': 0,
    'react/prop-types': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'react/destructuring-assignment': 0,
    'react/jsx-filename-extension': 0,
    'react/prefer-stateless-function': 0,
    'no-use-before-define': 0,
    'no-shadow': 0,
    'class-methods-use-this': 0,
    'react/sort-comp': 0,
    'max-len': 0,
    'import/order': 0,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'react/jsx-props-no-spreading': 0,

  },
};
