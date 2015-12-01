'use strict'

const webpack = require('webpack')
const p = require('path')

module.exports = {
  context: p.join(__dirname, 'scripts'),
  entry: {
    bundle: './main.js',
    contact: './contact-page.js'
  },
  output: {
    path: 'dist',
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  }
}
