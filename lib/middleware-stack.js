const flatten = require('reduce-flatten')
const EventEmitter = require('events')
const mixInto = require('create-mixin')

/**
 * Array of Middleware instances
 * @module stack
 */

class MiddlewareStack extends mixInto(EventEmitter)(Array) {
  /**
   * Returns an array of middleware functions
   * @returns {function[]}
   */
  getMiddlewareFunctions (options) {
    return this
      .filter(mw => mw.middleware)
      .map(mw => mw.middleware(Object.assign({}, options)))
      .reduce(flatten, [])
      .filter(mw => mw)
  }

  /**
   * @return {OptionDefinition[]}
   */
  getOptionDefinitions () {
    return this
      .filter(mw => mw.optionDefinitions)
      .map(mw => mw.optionDefinitions())
      .reduce(flatten, [])
      .filter(def => def)
  }

  /**
   * @param {string[]|class[]} modules - Array of middleware classes or modules which export them.
   * @param [options] {object}
   * @param [options.paths] {string[]}
   * @param [options.prefix] {string}
   * @return {Middleware[]}
   */
  static from (modules = [], options) {
    const MiddlewareClasses = modules.map((moduleItem, index) => {
      if (typeof moduleItem === 'string') {
        const loadModule = require('load-module')
        return loadModule(moduleItem.toLowerCase(), options)
      } else {
        return moduleItem
      }
    })
    const stack = new this()
    for (const MiddlewareClass of MiddlewareClasses) {
      stack.push(new MiddlewareClass())
    }
    return stack
  }
}

module.exports = MiddlewareStack
