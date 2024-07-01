const NAME_PATTERN = /^[a-z0-9]+(_[a-z0-9]+)*$/;

// eslint-disable-next-line no-undef
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
    'selector-class-pattern': [
      NAME_PATTERN,
      {
        message: (selector) => `Expected class selector "${selector}" to be snake_case`
      }
    ],
    'selector-id-pattern': [
      NAME_PATTERN,
      {
        message: (selector) => `Expected id selector "${selector}" to be snake_case`
      }
    ],
    'scss/percent-placeholder-pattern': [
      NAME_PATTERN,
      {
        message: (placeholder) => `Expected placeholder ${placeholder} to be snake_case`
      }
    ],
    'declaration-no-important': true,
    'font-family-name-quotes': 'always-unless-keyword',
    'font-weight-notation': 'numeric',
    'color-named': 'never',
    'color-function-notation': ['modern', { ignore: ['with-var-inside'] }]
  }
};
