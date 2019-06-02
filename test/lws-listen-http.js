const Tom = require('test-runner').Tom
const Lws = require('../')
const a = require('assert')
const fetch = require('node-fetch')

const tom = module.exports = new Tom('http')

tom.test('simple http', async function () {
  const port = 9100 + this.index
  class One {
    middleware (options) {
      return (ctx, next) => {
        ctx.body = 'one'
        next()
      }
    }
  }
  const lws = Lws.create({
    stack: [ One ],
    port: port
  })
  const response = await fetch(`http://127.0.0.1:${port}`)
  lws.server.close()
  a.strictEqual(response.status, 200)
  const body = await response.text()
  a.strictEqual(body, 'one')
})

tom.test('hostname', async function () {
  const port = 9100 + this.index
  class One {
    middleware (options) {
      return (ctx, next) => {
        const fs = require('fs')
        ctx.body = fs.createReadStream('package.json')
        next()
      }
    }
  }
  const lws = Lws.create({
    stack: [ One ],
    port: port,
    hostname: 'localhost'
  })

  try {
    await fetch(`http://127.0.0.1:${port}`)
    a.fail("shouldn't reach here")
  } catch (err) {
  }

  try {
    const response = await fetch(`http://localhost:${port}`)
    a.strictEqual(response.status, 200)
    lws.server.close()
  } catch (err) {
    a.fail("shouldn't reach here")
  }
})

tom.test('--max-connections, --keep-alive-timeout', async function () {
  const port = 9100 + this.index
  class One {
    middleware (options) {
      return (ctx, next) => {
        ctx.body = 'one'
      }
    }
  }
  const lws = Lws.create({
    stack: [ One ],
    port: port,
    maxConnections: 11,
    keepAliveTimeout: 10001
  })
  const server = lws.server
  a.strictEqual(server.keepAliveTimeout, 10001)
  a.strictEqual(server.maxConnections, 11)
  const url = require('url')
  const reqOptions = url.parse(`http://127.0.0.1:${port}`)
  reqOptions.rejectUnauthorized = false
  const response = await fetch(reqOptions)
  server.close()
  a.strictEqual(response.status, 200)
  const body = await response.text()
  a.strictEqual(body, 'one')
})
