/**
 * MiddlewareStack plugin API.
 * @module middleware-plugin
 * @example
 * class Greeter {
 *   middleware (options = {}) {
 *     return function (ctx, next) {
 *       ctx.body = `Hello Mr ${options.surname}`
 *       next()
 *     }
 *   }
 *
 *   optionDefinitions () {
 *     return [
 *       { name: 'surname', description: 'Your family name.' }
 *     ]
 *   }
 * }
 *
 * module.exports = Greeter
 */

/**
 * @alias module:middleware-plugin
 */
class MiddlewarePlugin {
  /**
   * A description to show in the usage guide.
   */
  description () {}

  /**
   * Return one or more options definitions to collect command-line input.
   * @returns {OptionDefinition|OptionDefinition[]}
   */
  optionDefinitions () {}

  /**
   * Return one of more Koa middleware functions. Optionally, emit `verbose` events to `ctx.app`.
   * @params [options] {object} - A config object.
   * @returns {function|function[]}
   */
  middleware (options) {}
}

module.exports = MiddlewarePlugin