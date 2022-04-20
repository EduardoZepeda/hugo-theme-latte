const path = require('path');

module.exports = {
  mode : 'production',
  entry: './assets/js/main.js',
  output: {
    path: path.resolve(__dirname, 'assets/js/'),
    filename: 'index.js',
  },
};