const path = require('path');

module.exports = {
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.less'],
  alias: {
    '@': path.resolve(__dirname, 'src'),
    icons: path.resolve(__dirname, 'src/icons'),
    utils: path.resolve(__dirname, 'src/utils'),
    components: path.resolve(__dirname, 'src/components'),
    pages: path.resolve(__dirname, 'src/pages'),
    styles: path.resolve(__dirname, 'src/styles')
  }
};
