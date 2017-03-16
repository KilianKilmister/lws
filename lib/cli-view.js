'use strict'

class CliView {
  log (msg) {
    process.stdout.write(msg)
  }
  start (config) {
    console.error(`START: ${this.constructor.name}`)
    console.error(require('util').inspect(config, { depth: 1, colors: true }))
  }
  msg () {}
  end () {}
  error () {}
}

module.exports = CliView

/**
 * create a nested table for deep object trees
 */
function objectToTable (object) {
  console.error(require('util').inspect(object, { depth: 6, colors: true }))
  const ansi = require('ansi-escape-sequences')
  const Table = require('table-layout')
  const t = require('typical')

  const data = Object.keys(object).map(key => {
    if (t.isPlainObject(object[key])) {
      return { key: ansi.format(key, 'bold'), value: objectToTable(object[key]) }
    } else {
      return { key: ansi.format(key, 'bold'), value: object[key] }
    }
  })
  const table = new Table(data, {
    padding: { left: '', right: ' ' },
    columns: [
      // { name: 'key', width: 18 },
      // { name: 'value', nowrap: true }
    ]
  })
  return table.toString()
}
