/**
 * @module cert-is
 */

/**
 * @author  Justin Collier <jpcxist@gmail.com>
 * @license MIT
 * @see {@link http://github.com/jpcx/cert-is|GitHub}
 */

/**
 * Thrown when an argument's value is not an acceptable value.
 *
 * @public
 * @class
 * @name  ValueArgumentError
 * @extends Error
 * @param {string}  paramName  - Name of the parameter that caused the error.
 * @param {...*}    [valid=[]] - Optional list of valid values for the argument.
 * @prop  {'Error'} name       - Name of the error constructor.
 * @prop  {string}  message    - Message describing the issue. See examples below.
 * @prop  {'ERR_INVALID_ARG_VALUE'} code - Error code.
 * @prop  {Array}   [valid]    - Optional list of valid values for the
 * argument. If none are provided to the constructor, this property will not
 * be set.
 * @example
 * const e = new ValueArgumentError('foo')
 * e.name    // 'Error'
 * e.message // '[ERR_INVALID_ARG_VALUE]: "foo" has an invalid value'
 * e.code    // 'ERR_INVALID_ARG_VALUE'
 * @example
 * const e = new ValueArgumentError('foo', 'bar')
 * e.name    // 'Error'
 * e.message // '[ERR_INVALID_ARG_VALUE]: "foo" has an invalid value'
 * e.code    // 'ERR_INVALID_ARG_VALUE'
 * e.valid   // ['bar']
 */
export default class ValueArgumentError extends Error {
  public code: string;
  public valid?: any;
  constructor(paramName: string, ...valid: any) {
    const code = 'ERR_INVALID_ARG_VALUE';
    const message = 'has an invalid value';
    super(`[${code}]: "${paramName}" ${message}`);
    this.code = code;
    if (valid.length > 0) {
      this.valid = valid;
    }
  }
}
