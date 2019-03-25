const Tom = require('test-runner').Tom
const util = require('../lib/util')
const a = require('assert')

const tom = module.exports = new Tom('deepMerge')

tom.test('simple', function () {
  const result = util.deepMerge(
    { port: 8000 },
    { stack: [ 'one' ] },
    { stack: [ 'two' ], help: true }
  )
  a.deepStrictEqual(result, {
    port: 8000,
    stack: [ 'two' ],
    help: true
  })
})

tom.test('arrays', function () {
  let result = util.deepMerge(
    { stack: [ 'one' ] },
    { stack: [] }
  )
  a.deepStrictEqual(result, {
    stack: [ 'one' ]
  })
})

tom.test('arrays 2', function () {
  let result = util.deepMerge(
    { stack: [] },
    { stack: [ 'one' ] }
  )
  a.deepStrictEqual(result, {
    stack: [ 'one' ]
  })
})

tom.test('arrays 3', function () {
  let result = util.deepMerge(
    { stack: [ 'two' ] },
    { stack: [ 'one' ] }
  )
  a.deepStrictEqual(result, {
    stack: [ 'one' ]
  })
})
