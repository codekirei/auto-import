'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// node
const fs = require('fs')

// npm
const assert = require('chai').assert
const sinon = require('sinon')
const mock = require('mock-fs')

// local
const autoImport = require('../')

//----------------------------------------------------------
// tests
//----------------------------------------------------------
const fakeFs = {
  fixtures: {
    main: {
      'a.js': '// a bold wish',
      'b.js': '// a dead run'
    },
    ignore: {
      'herring.js': '// a red fish'
    },
    meToo: {
      'chekhov.js': '// a cold gun'
    }
  }
}

describe('autoImport', () => {
  let spy
  before(() => mock(fakeFs))
  beforeEach(() => spy = sinon.spy(fs, 'writeFileSync'))
  afterEach(() => spy.restore())
  after(() => mock.restore())

  it('writes output', () => {
    autoImport('fixtures')
    const main = spy.args.filter(_ => _[0] === 'fixtures/main.js')
    const text = main[0][1]
    const expected =
      [ `import './main/a'`
      , `import './main/b'`
      ].join('\n').concat('\n')

    assert(spy.calledThrice)
    assert.equal(main.length, 1)
    assert.equal(text, expected)
  })

  it('ignores a dir (string)', () => {
    autoImport('fixtures', 'ignore')
    assert(spy.calledTwice)
  })

  it('ignores multiple dirs (array)', () => {
    autoImport('fixtures', ['ignore', 'meToo'])
    assert(spy.calledOnce)
  })
})
