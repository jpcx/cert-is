/**
 * @module cert-is
 */

/**
 * @author  Justin Collier <jpcxist@gmail.com>
 * @license MIT
 * @see {@link http://github.com/jpcx/cert-is|GitHub}
 */

import { AnyConstructorFunction } from '../certifier';

/**
 * Thrown when an argument's type is not an acceptable type.
 *
 * @public
 * @class
 * @name  TypeArgumentError
 * @extends TypeError
 * @param {string}   paramName      - Name of the parameter that caused the error.
 * @param {...Type} [validTypes=[]] - Optional list of valid types for the argument.
 * @prop  {'TypeError'} name    - Name of the error constructor.
 * @prop  {string}      message - Message describing the issue. See examples below.
 * @prop  {'ERR_INVALID_ARG_TYPE'} code - Error code.
 * @prop  {Array}   [validTypes] - Optional list of valid types for the
 * argument. If none are provided to the constructor, this property will not
 * be set.
 * @example
 * const e = new TypeArgumentError('foo')
 * e.name    // 'TypeError'
 * e.message // '[ERR_INVALID_ARG_TYPE]: "foo" has an invalid type'
 * e.code    // 'ERR_INVALID_ARG_TYPE'
 * @example
 * const e = new TypeArgumentError('foo', 'string', 'number')
 * e.name       // 'TypeError'
 * e.message    // '[ERR_INVALID_ARG_TYPE]: "foo" has an invalid type'
 * e.code       // 'ERR_INVALID_ARG_TYPE'
 * e.validTypes // ['string', 'number']
 */
export default class TypeArgumentError extends TypeError {
  public code: string;
  public validTypes?: Array<string | AnyConstructorFunction>;
  constructor(
    paramName: string,
    ...validTypes: Array<string | AnyConstructorFunction>
  ) {
    const code = 'ERR_INVALID_ARG_TYPE';
    const message = 'has an invalid type';
    super(`[${code}]: "${paramName}" ${message}`);
    this.code = code;
    if (validTypes.length > 0) {
      this.validTypes = validTypes;
    }
  }
}
