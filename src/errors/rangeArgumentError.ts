/**
 * @module cert-is
 */

/**
 * @author  Justin Collier <jpcxist@gmail.com>
 * @license MIT
 * @see {@link http://github.com/jpcx/cert-is|GitHub}
 */

/**
 * Thrown when an argument's range is not within an acceptable range.
 *
 * @public
 * @class
 * @name  RangeArgumentError
 * @extends RangeError
 * @param {string}  paramName - Name of the parameter that caused the error.
 * @param {number}  [lower]   - Optional lower bound of the range.
 * @param {number}  [upper]   - Optional upper bound of the range.
 * @param {boolean} [lowerIsInclusive] - Optional indicator of an inclusive lower bound.
 * @param {boolean} [upperIsInclusive]  - Optional indicator of an inclusive upper bound.
 * @prop  {'RangeError'} name - Name of the error constructor.
 * @prop  {string}  message   - Message describing the issue. See examples below.
 * @prop  {string} [range]    - Short description of the range. Only set if all
 * four bound specifiers are provided to the constructor and are the correct
 * types (`lower`: `number`; `upper`: `number`; `lowerIsInclusive`: `boolean`;
 * `upperIsInclusive`: `boolean`).
 * @prop {'ERR_INVALID_ARG_RANGE'} code - Error code.
 * @example
 * const e = new RangeArgumentError('foo')
 * e.name    // 'RangeError'
 * e.message // '[ERR_INVALID_ARG_RANGE]: "foo" has an invalid range'
 * e.code    // 'ERR_INVALID_ARG_RANGE'
 * @example
 * const e = new RangeArgumentError('foo', 42)
 * e.name    // 'RangeError'
 * e.message // '[ERR_INVALID_ARG_RANGE]: "foo" has an invalid range'
 * e.code    // 'ERR_INVALID_ARG_RANGE'
 * @example
 * const e = new RangeArgumentError('foo', 42, 84, true, false)
 * e.name    // 'RangeError'
 * e.message // '[ERR_INVALID_ARG_RANGE]: "foo" has an invalid range'
 * e.code    // 'ERR_INVALID_ARG_RANGE'
 * e.range   // `42 <= 'foo' < 84`
 */
export default class RangeArgumentError extends RangeError {
  public code: string;
  public range?: string;
  constructor(
    paramName: string,
    lower: number,
    upper: number,
    lowerIsInclusive: boolean,
    upperIsInclusive: boolean
  ) {
    const code = 'ERR_INVALID_ARG_RANGE';
    const message = 'has an invalid range';
    super(`[${code}]: "${paramName}" ${message}`);
    this.code = code;
    if (
      typeof lower === 'number' &&
      typeof upper === 'number' &&
      typeof lowerIsInclusive === 'boolean' &&
      typeof upperIsInclusive === 'boolean'
    ) {
      const lowSymbol = lowerIsInclusive ? '<=' : '<';
      const upSymbol = upperIsInclusive ? '<=' : '<';
      this.range = `${lower} ${lowSymbol} "${paramName}" ${upSymbol} ${upper}`;
    }
  }
}
