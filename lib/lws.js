'use strict'

/**
 *Creating command-line web servers suitable for full-stack javascript development.
 * @module lws
 */

/**
 * @alias module:lws
 * @example
 * const Lws = require('lws')
 * const lws = new Lws()
 * lws.start({ https: true})
 */
class Lws {
  /**
   * @param [options] {object} - Server options
   * @param [options.port] {number} - Port
   * @param [options.hostname] {string} -The hostname (or IP address) to listen on. Defaults to 0.0.0.0.
   * @param [options.config-file] {string} - Config file, defaults to 'lws.config.js'.
   * @param [options.stack] {string[]|Features[]} - Array of feature classes, or filenames of modules exporting a feature class.
   * @param [options.module-dir] {string[]} - One or more directories to search for feature modules.
   * @param [options.https] {boolean} - Enable HTTPS using a built-in key and cert, registered to the domain 127.0.0.1.
   * @param [options.key] {string} - SSL key. Supply along with --cert to launch a https server.
   * @param [options.cert] {string} - SSL cert. Supply along with --key to launch a https server.
   */
  constructor (options) {
    const builtInDefaults = {
      port: 8000,
      'config-file': 'lws.config.js'
    }
    this.constructorOptions = Object.assign({}, builtInDefaults, options)

    const Commands = require('./commands')
    this.commands = new Commands()
    this.commands.set('serve', './command/serve')
    this.commands.set('help', './command/help')
    this.commands.set('show', './command/show')
  }

  /**
   * Start the app.
   */
  start () {
    this.commands.expand()

    /* complete help command */
    const helpCommand = this.commands.get('help')
    helpCommand._commands = this.commands

    return this.commands.start(this.constructorOptions)
  }
}

module.exports = Lws
