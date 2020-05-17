const Tom = require('test-runner').Tom
const a = require('assert').strict
const CliView = require('../lib/view/cli-view.js')

const tom = module.exports = new Tom()

tom.test('verbose write', async function () {
  let logMsg = ''
  const view = new CliView({ log: function (msg) { logMsg = msg } })
  view.write('test', 'test', {
    verbose: true
  })
  a.ok(/test:/.test(logMsg))
})

tom.test('middleware.error write', async function () {
  let logMsg = ''
  const view = new CliView({ logError: function (msg) { logMsg = msg } })
  const err = new Error('test error')
  view.write('middleware.error', err)
  a.ok(/test error/.test(logMsg))
})

tom.test('resolvePrivateAddress no-private-address', async function () {
  let logMsg = ''
  const view = new CliView({ logError: function (msg) { logMsg = msg } })
  view.resolvePrivateAddress([])
  a.ok(/no network interfaces provided/.test(logMsg))
})

tom.test('resolvePrivateAddress corrupt-network-interfaces', async function () {
  let logMsg = ''
  const view = new CliView({ logError: function (msg) { logMsg = msg } })
  const corruptedMockIpList = [
    { name: 'en0', url: 'http://1.1.1.1:8888' },
    { name: 'en1', url: 'http://2.2.2.2:8888' },
    { name: 'en2', url: 'http://3.3.3.3:8888' }
  ]
  view.resolvePrivateAddress(corruptedMockIpList)
  a.ok(/does not have a valid IP address or name/.test(logMsg))
})

tom.test('resolvePrivateAddress partially-corrupt-address-network-interfaces', async function () {
  const view = new CliView()
  const corruptedMockIpList = [
    { name: 'en0', address: '1.1.1.1', url: 'http://1.1.1.1:8888' },
    { name: 'en1', url: 'http://2.2.2.2:8888' },
    { name: 'en2', address: '3.3.3.3', url: 'http://3.3.3.3:8888' }
  ]
  const ip = view.resolvePrivateAddress(corruptedMockIpList)
  a.ok(/1\.1\.1\.1/.test(ip.address))
})

tom.test('resolvePrivateAddress partially-corrupt-name-network-interfaces', async function () {
  const view = new CliView()
  const corruptedMockIpList = [
    { address: '192.168.1.0', url: 'http://192.168.1.0:8888' },
    { name: 'en1', address: '10.10.10.10', url: 'http://10.10.10.10:8888' },
    { name: 'en2', address: '3.3.3.3', url: 'http://3.3.3.3:8888' }
  ]
  const ip = view.resolvePrivateAddress(corruptedMockIpList)
  a.ok(/10\.10\.10\.10/.test(ip.address))
})

tom.test('resolvePrivateAddress resolve-private-network-interface', async function () {
  let logMsg = ''
  const view = new CliView({ logError: function (msg) { logMsg = msg } })

  const mockIpList = [
    { name: 'en0', address: '1.1.1.1', url: 'http://1.1.1.1:8888' },
    { name: 'en1', address: '172.17.1.1', url: 'http://2.2.2.2:8888' },
    { name: 'en2', address: '3.3.3.3', url: 'http://3.3.3.3:8888' }
  ]
  const ip = view.resolvePrivateAddress(mockIpList)
  a.ok(/172\.17\.1\.1/.test(ip.address))
})

tom.test('printAddressQRCode no-ipList', async function () {
  let logMsg = ''
  const view = new CliView({ logError: function (msg) { logMsg = msg } })
  view.printAddressQRCode(null, null)
  a.ok(/no available network interfaces/.test(logMsg))
})

tom.test('printAddressQRCode not-found-iface', async function () {
  let logMsg = ''
  const view = new CliView({ logError: function (msg) { logMsg = msg } })
  const mockIpList = [
    { name: 'en0', address: '1.1.1.1', url: 'http://1.1.1.1:8888' },
    { name: 'en1', address: '2.2.2.2', url: 'http://2.2.2.2:8888' },
    { name: 'en2', address: '3.3.3.3', url: 'http://3.3.3.3:8888' }
  ]
  view.printAddressQRCode('en-1', mockIpList)
  a.ok(/uknown --qr network_interface/.test(logMsg))
})

tom.test('printAddressQRCode automatically-iface-interface-not-found', async function () {
  let logMsg = ''
  const view = new CliView({ logError: function (msg) { logMsg = msg } })
  const corruptedMockIpList = [
    { name: 'en0', url: 'http://1.1.1.1:8888' },
    { name: 'en1', url: 'http://2.2.2.2:8888' },
    { name: 'en2', url: 'http://3.3.3.3:8888' }
  ]
  view.printAddressQRCode(null, corruptedMockIpList)
  a.ok(/could not find a network interface/.test(logMsg))
})

tom.test('printAddressQRCode valid-provided-interface', async function () {
  let logMsg = ''
  const view = new CliView({ log: function (msg) { logMsg += msg + ' ' } })
  const mockIpList = [
    { name: 'en0', address: '1.1.1.1', url: 'http://1.1.1.1:8888' },
    { name: 'en1', address: '2.2.2.2', url: 'http://2.2.2.2:8888' },
    { name: 'en2', address: '3.3.3.3', url: 'http://3.3.3.3:8888' }
  ]
  view.printAddressQRCode('en0', mockIpList)
  a.ok(/Scan this QR/.test(logMsg))
  a.ok(/QR Code URL: http:\/\/1\.1\.1\.1:8888/.test(logMsg))
})

tom.test('printAddressQRCode valid-not-provided-interface', async function () {
  let logMsg = ''
  const view = new CliView({ log: function (msg) { logMsg += msg + ' ' } })
  const mockIpList = [
    { name: 'en0', address: '1.1.1.1', url: 'http://1.1.1.1:8888' },
    { name: 'en1', address: '2.2.2.2', url: 'http://2.2.2.2:8888' },
    { name: 'en2', address: '3.3.3.3', url: 'http://3.3.3.3:8888' }
  ]
  view.printAddressQRCode(null, mockIpList)
  a.ok(/Scan this QR/.test(logMsg))
  a.ok(/QR Code URL: http:\/\/1\.1\.1\.1:8888/.test(logMsg))
})

tom.test('printAddressQRCode valid-not-provided-ordered-interface', async function () {
  let logMsg = ''
  const view = new CliView({ log: function (msg) { logMsg += msg + ' ' } })
  const mockIpList = [
    { name: 'en0', address: '1.1.1.1', url: 'http://1.1.1.1:8888' },
    { name: 'en1', address: '172.17.1.1', url: 'http://172.17.1.1:8888' },
    { name: 'en2', address: '3.3.3.3', url: 'http://3.3.3.3:8888' }
  ]
  view.printAddressQRCode(null, mockIpList)
  a.ok(/Scan this QR/.test(logMsg))
  a.ok(/QR Code URL: http:\/\/172\.17\.1\.1:8888/.test(logMsg))
})
