const path = require('path')

module.exports = {
  title: `UI Kit ${process.env.NODE_ENV} 05.ru`,
  components: 'src/components/**/index.vue',
  require: [
    path.join(__dirname, 'global.requires.js'),
    path.join(__dirname, 'src/assets/ui-kit.css'),
    path.join(__dirname, 'src/assets/font.css')
  ],
  usageMode: 'expand',
  exampleMode: 'expand',
  minimize: false,
  styleguideDir: 'dist/styleguide',
  dangerouslyUpdateWebpackConfig(webpackConfig, env) {
    // WARNING: inspect Vue styleguidist Webpack config before modifying it, otherwise you may break Vue styleguidist
    webpackConfig.resolve.alias = {
      '@src': path.resolve(__dirname, 'src/'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@img': path.resolve(__dirname, 'src/assets/img'),
      '@lib': path.resolve(__dirname, 'lib/'),
      ...webpackConfig.resolve.alias
    }
    return webpackConfig
  }
}
