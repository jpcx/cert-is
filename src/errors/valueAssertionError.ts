/**
 * @module cert-is
 */

/**
 * @author  Justin Collier <jpcxist@gmail.com>
 * @license MIT
 * @see {@link http://github.com/jpcx/cert-is|GitHub}
 */

/**
 * Thrown when the certifier finds a value is either not expected or is explicitly forbidden.
 *
 * @public
 * @class
 * @name ValueAssertionError
 * @extends Error
 * @param {string} message - Custom message to prepend with '
 * [ERR_INVALID_VALUE]: '.
 * @prop {'Error'} name    - Name of the error constructor.
 * @prop {string}  message - Message describing the issue.
 * @prop {'ERR_INVALID_VALUE'} code - Error code.
 * @example
 * const e = new ValueAssertionError()
 * e.name    // 'Error'
 * e.message // '[ERR_INVALID_VALUE]: Value is invalid'
 * e.code    // 'ERR_INVALID_VALUE'
 * @example
 * const e = new ValueAssertionError('this is a custom message')
 * e.name    // 'Error'
 * e.message // '[ERR_INVALID_VALUE]: this is a custom message'
 * e.code    // 'ERR_INVALID_VALUE'
 */
export default class ValueAssertionError extends Error {
  public code: string;
  constructor(message = 'Value is invalid') {
    const code = 'ERR_INVALID_VALUE';
    super(`[${code}]: ${message}`);
    this.code = code;
  }
}
