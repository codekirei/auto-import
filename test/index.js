'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// npm
const assert = require('chai').assert
const sinon = require('sinon')

// local
const autoImport = require('../')

//----------------------------------------------------------
// tests
//----------------------------------------------------------
describe('autoImport', () => {
  it('builds array of dirs in target dir')
  describe('file types', () => {
    it('uses `js` by default')
    it('uses other type as specified')
  })
  describe('ignoring dirs', () => {
    it('ignores single dir (string)')
    it('ignores multiple dirs (array)')
  })
  describe('writing output', () => {
    it('builds array of files in subdir')
    it('creates import strings from array')
    it('writes to file in correct location')
  })
})
