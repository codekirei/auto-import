# `auto-import`

[![Build Status][b-img]][b-url] [![Coverage Status][c-img]][c-url]

<b>[About](#about)</b> |
<b>[Why](#why)</b> |
<b>[Installation](#installation)</b> |
<b>[Usage](#usage)</b> |
<b>[Example](#example)</b> |
<b>[License](#license)</b>

## About

`auto-import` is a small Node.js module for automatically building an index file with `import` statements to every module (file) in a directory.
This is useful for specific ES6 workflows with [`webpack`](https://github.com/webpack/webpack), especially when combined with a task-runner with file watching capabilities (e.g. [`gulp`](https://github.com/gulpjs/gulp)).

From this:
```
source/
└── scripts/
    └── main
        ├── moduleA.js
        ├── moduleB.js
        └── moduleC.js
```

Create this:
```js
// source/scripts/main.js
import './main/moduleA.js'
import './main/moduleB.js'
import './main/moduleC.js'
```

## Why

I like using `gulp` and `webpack` in my build pipeline for front-end dev.
I have a `gulp watch` task that watches my source code and automatically rebuilds.
In my experience, webpack doesn't like it when you add or remove entries to the bundle during `gulp watch`.

To get around this, I began creating index files filled with `import` statements for my JS bundles.
For example, say I want webpack to bundle up all my scripts in `source/scripts/main/`.
So, I create a file `source/scripts/main.js` filled with `import` statements to the scripts in `source/scripts/main/`, use `./main.js` as the sole entry point for webpack, and watch `source/scripts/**/*.js` to trigger rebuilds.

With this workflow, I can add or remove modules inside `source/scripts/main/` without webpack barfing because webpack still has `source/scripts/main.js` as its sole entry point.
To actually add or remove a module from the bundle, though, I have to add or remove the `import` statment from `source/scripts/main.js`.

`auto-import` automatically creates `source/scripts/main.js` so I don't have to.
With `auto-import` in my workflow, I only have to add or remove a file in `source/scripts/main` for it to be added or removed from the bundle.
Very nice!

## Installation

**Install**
```
$ npm install --save-dev auto-import
```

**Require**
```js
var autoImport = require('auto-import')
```

## Usage

**autoImport(*directory*, *ignore*)**

Example source tree:
```
source/
└── scripts/
    ├── main
    │   ├── moduleA.js
    │   ├── moduleB.js
    │   └── moduleC.js
    └── vendor
        └── someFramework.js
```

- *directory* (string) -- The top level directory containing directories of source scripts.
  Given the example tree, this would be `source/scripts`.
- *ignore* (string or array of strings) -- Subdirectories inside *directory* that you do not want to create an index file for.
  For example, say you are importing `someFramework` in `moduleA`, so you don't need to bundle it separately.
  You can ignore `vendor` so `vendor.js` isn't created.

## Example

Check out the example with `gulp` and `webpack` [here](https://github.com/codekirei/auto-import/tree/master/example).

To test it out, `cd` into `example` and install the additional dependencies with `npm install`.
Start up the build process with `gulp watch`, then try adding, removing, and editing scripts in `example/scripts/main` and `example/scripts/contact-page`.
The respective bundles in `example/dist` will update accordingly.

## License

[MIT](https://github.com/codekirei/auto-import/blob/master/license)

<!--
  travis
  [b-url]: https://travis-ci.org/codekirei/auto-import
  [b-img]: https://travis-ci.org/codekirei/auto-import.svg?branch=master

  coveralls
  [c-url]: https://coveralls.io/github/codekirei/auto-import?branch=master
  [c-img]: https://coveralls.io/repos/codekirei/auto-import/badge.svg?branch=master&service=github
-->
