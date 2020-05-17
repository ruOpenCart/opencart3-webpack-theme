let mix = require('laravel-mix');
require('mix-env-file');

const THEME_NAME = process.env.MIX_THEME_NAME;
const PROXY_URL = process.env.MIX_BROWSERSYNC_PROXY_URL;
const THEME_PATH = 'catalog/view/theme/' + THEME_NAME + '/';

mix.options({
  processCssUrls: false
});

mix.disableSuccessNotifications();
mix.setPublicPath(THEME_PATH);

mix.browserSync({
  proxy: PROXY_URL,
  open: false,
  notify: false,
  files: [
    THEME_PATH + 'css/*.css',
    THEME_PATH + 'js/*.js',
    THEME_PATH + 'template/**/*.twig',
    THEME_PATH + 'image/**/*'
  ]
});

mix
  .copy('node_modules/jquery/dist/jquery.min.js', THEME_PATH + 'js/jquery.min.js')
  .copy('node_modules/jquery/dist/jquery.min.map', THEME_PATH + 'js/jquery.min.map')
  .copy('node_modules/popper.js/dist/umd/popper.min.js', THEME_PATH + 'js/popper.min.js')
  .copy('node_modules/popper.js/dist/umd/popper.min.js.map', THEME_PATH + 'js/popper.min.js.map')
  .copy('node_modules/bootstrap/dist/js/bootstrap.min.js', THEME_PATH + 'js/bootstrap.min.js')
  .copy('node_modules/bootstrap/dist/js/bootstrap.min.js.map', THEME_PATH + 'js/bootstrap.min.js.map')
  .js('src/scripts/main.js', THEME_PATH + 'js/main.js')
  .copy('node_modules/@fortawesome/fontawesome-free/css/all.min.css', THEME_PATH + 'css/fontawesome.min.css')
  .copy('node_modules/bootstrap/dist/css/bootstrap.min.css', THEME_PATH + 'css/bootstrap.min.css')
  .copy('node_modules/bootstrap/dist/css/bootstrap.min.css.map', THEME_PATH + 'css/bootstrap.min.css.map')
  .sass('src/scss/main.scss', THEME_PATH + 'css/main.css')
  .copyDirectory('node_modules/@fortawesome/fontawesome-free/webfonts', THEME_PATH + 'webfonts')
  .copyDirectory('src/img', THEME_PATH + 'image')
  .copyDirectory('src/twig', THEME_PATH + 'template')
  .copy('src/css/custom.css', THEME_PATH + 'css/custom.css');
