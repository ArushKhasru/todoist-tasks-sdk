const fs = require('node:fs')
const path = require('node:path')
const license = path.resolve(__dirname, '../../LICENSE')
const text = fs.readFileSync(license, 'utf8')
const updated = text.replace(/Copyright \(c\) (\d{4}) Voxgig/, 'Copyright (c) $1 Arush Khasru')
if (updated === text && !/Copyright \(c\) \d{4} Arush Khasru/.test(text)) {
  throw new Error('Expected generated MIT copyright line was not found')
}
if (updated !== text) fs.writeFileSync(license, updated)