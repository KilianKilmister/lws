'use strict'

/**
 * @module middleware
 */

/**
 * @alias module:middleware
 */
class Middleware {
  constructor () {
    this.view = null
  }

  description () {
    return '[italic]{<description required>}'
  }

  /**
   * Return one or more options definitions to collect command-line input
   * @returns {OptionDefinition|OptionDefinition[]}
   */
  optionDefinitions () {}

  /**
   * Return one of more Koa middleware functions.
   * @returns {KoaMiddleware}
   */
  middleware (options) {
    throw new Error('Middleware not implemented')
  }

  static isInstance (module) {
    return module.prototype && module.prototype.middleware
  }

  /**
   * Load a module and verify it's of the correct type
   * @param modulePath {String}
   * @param options {Object} - load-module options
   * @returns {Middleware}
   */
  static load (modulePath, options) {
    const loadModule = require('load-module')
    const module = loadModule(modulePath.toLowerCase(), options)
    return module
  }
}

module.exports = Middleware
