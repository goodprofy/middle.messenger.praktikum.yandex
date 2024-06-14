const NAME_PATTERN = /^[a-z][A-Za-z0-9]+$/;

module.exports = {
  extends: ['stylelint-config-standard-scss'],
  plugins: ['stylelint-no-unsupported-browser-features', 'stylelint-order'],
  rules: {
    'order/order': [
      'custom-properties',
      'dollar-variables',
      'at-variables',
      'declarations',
      'rules',
      'at-rules',
      'less-mixins'
    ],
    'order/properties-order': ['width', 'height'],
    'plugin/no-unsupported-browser-features': [
      true,
      {
        ignore: ['css-nesting'],
        severity: 'warning'
      }
    ],
    'declaration-no-important': true,
    'font-family-name-quotes': 'always-unless-keyword',
    'font-weight-notation': 'numeric',
    'color-named': 'never',
    'color-function-notation': ['modern', { ignore: ['with-var-inside'] }]
  }
};
