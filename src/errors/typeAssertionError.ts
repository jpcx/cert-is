/**
 * @module cert-is
 */

/**
 * @author  Justin Collier <jpcxist@gmail.com>
 * @license MIT
 * @see {@link http://github.com/jpcx/cert-is|GitHub}
 */

/**
 * Thrown when the certifier finds a value with a type that is either not expected or is explicitly forbidden.
 *
 * @public
 * @class
 * @name TypeAssertionError
 * @extends TypeError
 * @param   {string}      message - Custom message to prepend with '
 * [ERR_INVALID_TYPE]: '.
 * @prop    {'TypeError'} name    - Name of the error constructor.
 * @prop    {string}      message - Message describing the issue.
 * @prop    {'ERR_INVALID_TYPE'} code - Error code.
 * @example
 * const e = new TypeAssertionError()
 * e.name    // 'TypeError'
 * e.message // '[ERR_INVALID_TYPE]: Value is of an invalid type'
 * e.code    // 'ERR_INVALID_TYPE'
 * @example
 * const e = new TypeAssertionError('this is a custom message')
 * e.name    // 'Error'
 * e.message // '[ERR_INVALID_TYPE]: this is a custom message'
 * e.code    // 'ERR_INVALID_TYPE'
 */
export default class TypeAssertionError extends TypeError {
  public code: string;
  constructor(message = 'Value is of an invalid type') {
    const code = 'ERR_INVALID_TYPE';
    super(`[${code}]: ${message}`);
    this.code = code;
  }
}
