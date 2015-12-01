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
function writeFile(dir, subdir, ft) {
  return globby(p.join(dir, subdir, `*.${ft}`)).then(res => {
    fs.writeFileSync(
      p.join(dir, `${subdir}.js`),
      res.map(file => file.replace(dir, '.'))
        .map(file => file.replace(`.${ft}`, ''))
        .map(file => `import '${file}'`)
        .join('\n')
    )
  })
}

function autoImport(dir, ft, ignore) {
  ft = ft || 'js'

  if (ignore) {
    const formatter = toIgnore => p.join(dir, toIgnore, p.sep)
    ignore = typeof ignore === 'string'
      ? [formatter(ignore)]
      : ignore.map(toIgnore => formatter(toIgnore))
  }

  return globby(p.join(dir, '*', p.sep))
    .then(res => res
      .filter(path => ignore ? ignore.every(ignored => path !== ignored) : path)
      .map(path => writeFile(dir, p.basename(path), ft))
    )
}

//----------------------------------------------------------
// exports
//----------------------------------------------------------
module.exports = autoImport
