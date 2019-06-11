/**
 * Formats documentation.js generated Table of Contents for brevity. Fixes source code links.
 *
 * @private
 * @author  Justin Collier <jpcxist@gmail.com>
 * @license MIT
 * @see {@link http://github.com/jpcx/cert-is|GitHub}
 */

const fs = require('fs')
const path = require('path')

const README_PATH = path.join(__dirname, '../README.md')

const README = fs.readFileSync(README_PATH, 'utf8').split('\n')

let section = ''
for (let i = 0; i < README.length; i++) {
  const ln = README[i]
  if (ln.match(/^#+/m)) {
    // Set the section identifier (heading)
    section = ln.match(/#+ (.*)/m)[1]
  }

  if (section === 'Table of Contents') {
    // Remove Table of Contents Parameters/Properties/Examples
    if (ln.match(/^ +- +\[(?:Parameters|Properties|Examples)]\(/m)) {
      // Splice README and decrement i
      README.splice(i--, 1)
    }
  } else {
    // Fix source code links
    const sourceCodeMatch = ln.match(
      /^\[.*?.js:(\d+)-(\d+)]\(https:\/\/github.com\/.*?#L(\d+)-L(\d+)/m
    )
    if (sourceCodeMatch) {
      // Line is a source code link
      if (sourceCodeMatch[1] !== sourceCodeMatch[3]) {
        // Invalid source code link; match with github
        README[i] = ln.replace(
          /^(\[.*?.js:)(\d+)/m,
          `$1${sourceCodeMatch[3]}`
        )
      }
      if (sourceCodeMatch[2] !== sourceCodeMatch[4]) {
        // Invalid source code link; match with github
        README[i] = ln.replace(
          /^(\[.*?.js:)(\d+)-(\d+)/m,
          `$1$2-${sourceCodeMatch[4]}`
        )
      }
      if (sourceCodeMatch[3] === sourceCodeMatch[4]) {
        // Unnecessary from and to line distinction; merge into one line
        README[i] = ln.replace(
          /^(\[.*?.js:)(\d+)-(\d+)(]\(https:\/\/github.com\/.*?#L)(\d+)-L(\d+)/m,
          '$1$2$4$5'
        )
      }
    }
  }
}

// Write the new README
fs.writeFileSync(README_PATH, README.join('\n'))
