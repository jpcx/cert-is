/**
 * @module cert-is
 */

/**
 * @author  Justin Collier <jpcxist@gmail.com>
 * @license MIT
 * @see {@link http://github.com/jpcx/cert-is|GitHub}
 */

/**
 * Thrown when the certifier finds a value that is not within an expected range.
 *
 * @public
 * @class
 * @name    RangeAssertionError
 * @extends RangeError
 * @param   {string}      message - Custom message to prepend with '
 * [ERR_INVALID_RANGE]: '.
 * @prop    {'RangeError'} name    - Name of the error constructor.
 * @prop    {string}      message - Message describing the issue.
 * @prop    {'ERR_INVALID_RANGE'} code - Error code.
 * @example
 * const e = new RangeAssertionError()
 * e.name    // 'RangeError'
 * e.message // '[ERR_INVALID_RANGE]: Value is of a prohibited range'
 * e.code    // 'ERR_INVALID_RANGE'
 * @example
 * const e = new RangeAssertionError('this is a custom message')
 * e.name    // 'Error'
 * e.message // '[ERR_INVALID_RANGE]: this is a custom message'
 * e.code    // 'ERR_INVALID_RANGE'
 */
export default class RangeAssertionError extends RangeError {
  public code: string;
  constructor(message = 'Value is of a prohibited range') {
    const code = 'ERR_INVALID_RANGE';
    super(`[${code}]: ${message}`);
    this.code = code;
  }
}
