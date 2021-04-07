const path = require('path');
const { merge } = require('webpack-merge');
const tsImportPluginFactory = require('ts-import-plugin');

module.exports = {
  lintOnSave: false,
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  // indexPath: 'index.html',

  chainWebpack: config => {
    // const dir = path.resolve(__dirname, 'src/assets/icons');
    // config.module.rule('svg-sprite')
    //   .test(/\.svg$/)
    //   .include.add(dir).end() //包含icons目录
    //   .use('svg-sprite-loader').loader('svg-sprite-loader').options({ extract: false }).end()
    //   .use('svgo-loader').loader('svgo-loader').tap(options => ({
    //   ...options,
    //   plugins: [{ removeAttrs: { attrs: 'fill' } }]
    // })).end();
    // config.plugin('svg-sprite').use(require('svg-sprite-loader/plugin'), [{ plainSprite: true }]);
    // config.module.rule('svg').exclude.add(dir); //其他svg loader排除icons目录

    config.module.rule('ts').use('ts-loader').tap(options => {
      options = merge(options, {
        transpileOnly: true,
        getCustomTransformers: () => ({
          before: [
            tsImportPluginFactory({
              libraryName: 'vant',
              libraryDirectory: 'es',
              style: true
            })
          ]
        }),
        compilerOptions: {
          module: 'es2015'
        }
      });
      return options;
    });
  }
};
