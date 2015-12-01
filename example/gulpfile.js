'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// gulp
const gulp = require('gulp')
const util = require('gulp-util')
const seq = require('run-sequence')

// webpack
const webpack = require('webpack')
const conf = require('./webpack.conf')

// local
const autoImport = require('../index')

//----------------------------------------------------------
// tasks
//----------------------------------------------------------
gulp.task('import', () => autoImport('scripts', 'vendor'))

gulp.task('webpack', cb => webpack(conf, (err, res) => {
  if (err) throw new util.PluginError('webpack', err)
  util.log('webpack', res.toString())
  cb()
}))

gulp.task('watch', ['default'], () => {
  gulp.watch('scripts/*/**/*.js', ['import'])
  gulp.watch('scripts/*.js', ['webpack'])
})

gulp.task('default', cb => seq('import', 'webpack', () => cb()))
