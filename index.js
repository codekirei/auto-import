'use strict'

//----------------------------------------------------------
// modules
//----------------------------------------------------------
// node
const fs = require('fs')
const p = require('path')

// npm
const globby = require('globby')

//----------------------------------------------------------
// logic
//----------------------------------------------------------
function writeOut(dir, subdir) {
  return fs.writeFileSync(
    p.join(dir, `${subdir}.js`),
    globby.sync(p.join(dir, subdir, `*.js`))
      .map(file => file.replace(dir, '.'))
      .map(file => file.replace(`.js`, ''))
      .map(file => `import '${file}'`)
      .join('\n')
  )
}

function autoImport(dir, ignore) {
  if (ignore) {
    const formatter = toIgnore => p.join(dir, toIgnore, p.sep)
    ignore = typeof ignore === 'string'
      ? [formatter(ignore)]
      : ignore.map(toIgnore => formatter(toIgnore))
  }

  return globby.sync(p.join(dir, '*', p.sep))
    .filter(path => ignore ? ignore.every(_ => path !== _) : path)
    .map(path => writeOut(dir, p.basename(path)))
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = autoImport
