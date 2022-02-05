const path = require('path')

module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-each': {},
    'postcss-extend': {},
    'postcss-nested-ancestors': {},
    'postcss-nested': {},
    'postcss-css-variables': {},
    'postcss-preset-env': {},
    'postcss-move-props-to-bg-image-query': {},
    'postcss-inline-svg': {
      paths: [path.join(__dirname, './src/assets/img')],
      removeFill: true
    },
    'postcss-custom-media': {},
    cssnano: {
      preset: 'default'
    }
  }
}
