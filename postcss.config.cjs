const path = require('path');

/** @type {import('postcss').Config} */
module.exports = {
  plugins: [
    require('postcss-import'),
    require('postcss-nesting'),
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
};
