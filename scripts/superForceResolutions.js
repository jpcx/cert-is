/**
 * @private
 * @author Justin Collier <jpcxme@gmail.com>
 * @license MIT
 * @see {@link http://github.com/jpcx/cert-is|GitHub}
 */

// This script forces all subdependencies to use versions listed in the
// package.json resolutions section using npm-force-resolutions. Further
// modifies package-lock.json in order to avoid any mention of bad versions.

const dp = require('deep-props')
const fs = require('fs')
const path = require('path')
const spawn = require('child_process').spawn

spawn('npx', ['npm-force-resolutions'])
const packageLock = require('../package-lock.json')
const pkgJson = require('../package.json')
const resolutions = pkgJson.resolutions || {}

dp.extract(packageLock).forEach(x => {
  const key = x.path.slice(-1)[0]
  if (Object.keys(resolutions).includes(key)) {
    dp.set(packageLock, x.path, resolutions[key])
  }
})

fs.writeFileSync(
  path.join(__dirname, '../package-lock.json'),
  JSON.stringify(packageLock, null, 2),
  'utf8'
)
