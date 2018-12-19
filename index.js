/**
 * Provides a collection of assertion tools for checking strict equality, type, and range of a set of values.
 *
 * @public
 * @module  cert-is
 * @func
 * @author  Justin Collier <jpcxist@gmail.com>
 * @license MIT
 * @see     {@link http://github.com/jpcx/cert-is|GitHub}
 * @prop {check}          check          - Constructs a new Checker instance.
 * @prop {ArgValueError}  ArgValueError  - Reference to the ArgValueError class.
 * @prop {ArgTypeError}   ArgTypeError   - Reference to the ArgTypeError class.
 * @prop {ArgRangeError}  ArgRangeError  - Reference to the ArgRangeError class.
 * @prop {CertValueError} CertValueError - Reference to the CertValueError class.
 * @prop {CertTypeError}  CertTypeError  - Reference to the CertTypeError class.
 * @prop {CertRangeError} CertRangeError - Reference to the CertRangeError class.
 * @param  {...*} values - Values used during construction of a new Certifier instance. Certifier methods will operate on these values.
 * @return {Certifier}   Instance of the {@link #certifier Certifier} class that contains methods for certifying the provided values.
 * @example
 * const cert = require('cert-is')
 *
 * const certifier = cert('foo', 'bar')
 * certifier.is('foo') // undefined
 * certifier.is('bar') // undefined
 * certifier.is('qux') // THROWS CertValueError
 * @example
 * const cert = require('cert-is')
 *
 * cert('foo').is('foo')                  // undefined
 * cert('foo').is('bar')                  // THROWS CertValueError
 * cert('foo').is('foo', 'bar')           // undefined
 * cert('foo').isNot('foo')               // THROWS CertValueError
 * cert('foo').isType('string')           // undefined
 * cert('foo').isType('number')           // THROWS CertTypeError
 * cert('foo').isType('string', 'number') // undefined
 * cert(new Map()).isType(Map)            // undefined
 * cert(new Map()).isType(Object)         // undefined
 * cert(new Map()).isType(Set)            // THROWS CertTypeError
 * cert(new Map()).isType(Map, Set)       // undefined
 * cert(15).isGT(2)                       // undefined
 * cert(15).isGT(15)                      // THROWS CertRangeError
 * cert(15).isGTE(15)                     // undefined
 * cert(15, 23).isGTE(15)                 // undefined
 * cert(15, 23).isGTE('foo')              // THROWS ArgTypeError
 * @example
 * const check = require('cert-is').check
 *
 * check('foo').is('foo')        // true
 * check('foo').is('bar')        // false
 * check('foo').isType('string') // true
 * check('foo').isType('bar')    // THROWS ArgTypeError
 * check('foo').isGT('')         // THROWS ArgTypeError
 */

/**
 * Any value that could potentially refer to a type or constructor.
 *
 * @public
 * @typedef {('boolean'|'undefined'|'number'|'string'|'symbol'|'object'|'function'|Function)} Type
 * @example
 * 'string'
 * @example
 * Array
 */

/**
 * Thrown when an argument's value is not an acceptable value.
 *
 * @public
 * @class
 * @name  ArgValueError
 * @extends Error
 * @param {string}  paramName  - Name of the parameter that caused the error.
 * @param {...*}    [valid=[]] - Optional list of valid values for the argument.
 * @prop  {'Error'} name       - Name of the error constructor.
 * @prop  {string}  message    - Message describing the issue. See examples below.
 * @prop  {'ERR_INVALID_ARG_VALUE'} code - Error code.
 * @prop  {Array}   [valid]    - Optional list of valid values for the argument. If none are provided to the constructor, this property will not be set.
 * @example
 * const e = new ArgValueError('foo')
 * e.name    // 'Error'
 * e.message // '[ERR_INVALID_ARG_VALUE]: "foo" has an invalid value'
 * e.code    // 'ERR_INVALID_ARG_VALUE'
 * @example
 * const e = new ArgValueError('foo', 'bar')
 * e.name    // 'Error'
 * e.message // '[ERR_INVALID_ARG_VALUE]: "foo" has an invalid value'
 * e.code    // 'ERR_INVALID_ARG_VALUE'
 * e.valid   // ['bar']
 */
class ArgValueError extends Error {
  constructor (paramName, ...valid) {
    const code = 'ERR_INVALID_ARG_VALUE'
    const message = 'has an invalid value'
    super(`[${code}]: "${paramName}" ${message}`)
    this.code = code
    if (valid.length > 0) {
      this.valid = valid
    }
  }
}

/**
 * Thrown when an argument's type is not an acceptable type.
 *
 * @public
 * @class
 * @name  ArgTypeError
 * @extends TypeError
 * @param {string}   paramName      - Name of the parameter that caused the error.
 * @param {...Type} [validTypes=[]] - Optional list of valid types for the argument.
 * @prop  {'TypeError'} name    - Name of the error constructor.
 * @prop  {string}      message - Message describing the issue. See examples below.
 * @prop  {'ERR_INVALID_ARG_TYPE'} code - Error code.
 * @prop  {Array}   [validTypes] - Optional list of valid types for the argument. If none are provided to the constructor, this property will not be set.
 * @example
 * const e = new ArgTypeError('foo')
 * e.name    // 'TypeError'
 * e.message // '[ERR_INVALID_ARG_TYPE]: "foo" has an invalid type'
 * e.code    // 'ERR_INVALID_ARG_TYPE'
 * @example
 * const e = new ArgTypeError('foo', 'string', 'number')
 * e.name       // 'TypeError'
 * e.message    // '[ERR_INVALID_ARG_TYPE]: "foo" has an invalid type'
 * e.code       // 'ERR_INVALID_ARG_TYPE'
 * e.validTypes // ['string', 'number']
 */
class ArgTypeError extends TypeError {
  constructor (paramName, ...validTypes) {
    const code = 'ERR_INVALID_ARG_TYPE'
    const message = 'has an invalid type'
    super(`[${code}]: "${paramName}" ${message}`)
    this.code = code
    if (validTypes.length > 0) {
      this.validTypes = validTypes
    }
  }
}

/**
 * Thrown when an argument's range is not within an acceptable range.
 *
 * @public
 * @class
 * @name  ArgRangeError
 * @extends RangeError
 * @param {string}  paramName - Name of the parameter that caused the error.
 * @param {number}  [lower]   - Optional lower bound of the range.
 * @param {number}  [upper]   - Optional upper bound of the range.
 * @param {boolean} [lowIncl] - Optional indicator of an inclusive lower bound.
 * @param {boolean} [upIncl]  - Optional indicator of an inclusive upper bound.
 * @prop  {'RangeError'} name - Name of the error constructor.
 * @prop  {string}  message   - Message describing the issue. See examples below.
 * @prop  {string} [range]    - Short description of the range. Only set if all four bound specifiers are provided to the constructor and are the correct types (`lower`: `number`; `upper`: `number`; `lowIncl`: `boolean`; `upIncl`: `boolean`).
 * @prop {'ERR_INVALID_ARG_RANGE'} code - Error code.
 * @example
 * const e = new ArgRangeError('foo')
 * e.name    // 'RangeError'
 * e.message // '[ERR_INVALID_ARG_RANGE]: "foo" has an invalid range'
 * e.code    // 'ERR_INVALID_ARG_RANGE'
 * @example
 * const e = new ArgRangeError('foo', 42)
 * e.name    // 'RangeError'
 * e.message // '[ERR_INVALID_ARG_RANGE]: "foo" has an invalid range'
 * e.code    // 'ERR_INVALID_ARG_RANGE'
 * @example
 * const e = new ArgRangeError('foo', 42, 84, true, false)
 * e.name    // 'RangeError'
 * e.message // '[ERR_INVALID_ARG_RANGE]: "foo" has an invalid range'
 * e.code    // 'ERR_INVALID_ARG_RANGE'
 * e.range   // `42 <= 'foo' < 84`
 */
class ArgRangeError extends RangeError {
  constructor (paramName, lower, upper, lowIncl, upIncl) {
    const code = 'ERR_INVALID_ARG_RANGE'
    const message = 'has an invalid range'
    super(`[${code}]: "${paramName}" ${message}`)
    this.code = code
    if (
      typeof lower === 'number' &&
      typeof upper === 'number' &&
      typeof lowIncl === 'boolean' &&
      typeof upIncl === 'boolean'
    ) {
      const lowSymbol = lowIncl ? '<=' : '<'
      const upSymbol = upIncl ? '<=' : '<'
      this.range = `${lower} ${lowSymbol} "${paramName}" ${upSymbol} ${upper}`
    }
  }
}

/**
 * Thrown when the certifier finds a value is either not expected or is explicitly forbidden.
 *
 * @public
 * @class
 * @name CertValueError
 * @extends Error
 * @prop {'Error'} name - Name of the error constructor.
 * @prop {'[ERR_INVALID_VALUE]: Value is invalid'}  message - Message describing the issue.
 * @prop {'ERR_INVALID_VALUE'} code    - Error code.
 * @example
 * const e = new CertValueError()
 * e.name    // 'Error'
 * e.message // '[ERR_INVALID_VALUE]: Value is invalid'
 * e.code    // 'ERR_INVALID_VALUE'
 */
class CertValueError extends Error {
  constructor () {
    const code = 'ERR_INVALID_VALUE'
    const message = 'Value is invalid'
    super(`[${code}]: ${message}`)
    this.code = code
  }
}

/**
 * Thrown when the certifier finds a value with a type that is either not expected or is explicitly forbidden.
 *
 * @public
 * @class
 * @name CertTypeError
 * @extends TypeError
 * @prop {'TypeError'} name - Name of the error constructor.
 * @prop {'[ERR_INVALID_TYPE]: Value is of an invalid type'} message - Message describing the issue.
 * @prop {'ERR_INVALID_TYPE'} code - Error code.
 * @example
 * const e = new CertTypeError()
 * e.name    // 'TypeError'
 * e.message // '[ERR_INVALID_TYPE]: Value is of an invalid type'
 * e.code    // 'ERR_INVALID_TYPE'
 */
class CertTypeError extends TypeError {
  constructor () {
    const code = 'ERR_INVALID_TYPE'
    const message = 'Value is of an invalid type'
    super(`[${code}]: ${message}`)
    this.code = code
  }
}

/**
 * Thrown when the certifier finds a value that is not within an expected range.
 *
 * @public
 * @class
 * @name    CertRangeError
 * @extends RangeError
 * @prop {'TypeError'} name - Name of the error constructor.
 * @prop {'[ERR_INVALID_RANGE]: Value is of a prohibited range'} message - Message describing the issue.
 * @prop {'ERR_INVALID_RANGE'} code - Error code.
 * @example
 * const e = new CertRangeError()
 * e.name    // 'RangeError'
 * e.message // '[ERR_INVALID_RANGE]: Value is of a prohibited range'
 * e.code    // 'ERR_INVALID_RANGE'
 */
class CertRangeError extends RangeError {
  constructor () {
    const code = 'ERR_INVALID_RANGE'
    const message = 'Value is of a prohibited range'
    super(`[${code}]: ${message}`)
    this.code = code
  }
}

/**
 * Checks all elements of `values` for inclusion or exclusion in the `valid` and `invalid` value sets.
 *
 * @private
 * @func   checkValues
 * @param  {*}            values  - Values to check for strict equality.
 * @param  {(Array|null)} valid   - Array of valid values to reference.
 * @param  {(Array|null)} invalid - Array of invalid values to reference.
 * @throws {CertValueError} Throws an CertValueError if none of the values strictly equal any of the allowed values, or if any of the values strictly equals a prohibited value.
 */
const checkValues = (values, valid, invalid) => {
  for (let value of values) {
    if (
      (valid !== null && !valid.includes(value)) ||
      (invalid !== null && invalid.includes(value))
    ) {
      throw new CertValueError()
    }
  }
}

/**
 * Checks the types of all elements of `values` for strict inclusion or exclusion in the `valid` and `invalid` type sets. Uses typeof if a valid / invalid type is a string; uses instanceof if the type is a function.
 *
 * @private
 * @func   checkTypes
 * @param  {*}            values       - Values to check for strict equality.
 * @param  {(Array|null)} validTypes   - Array of valid types to reference.
 * @param  {(Array|null)} invalidTypes - Array of invalid types to reference.
 * @throws {(CertTypeError|ArgTypeError)} Throws an CertTypeError if a value is  in `invalidTypes` or is not in `validTypes`. Throws an ArgTypeError if an element in the type sets is neither a string nor a function.
 */
const checkTypes = (values, validTypes, invalidTypes) => {
  const typeTypes = ['string', 'function', Function]
  const checkType = (value, type) => {
    if (typeof type === 'function' || type instanceof Function) {
      return value instanceof type
    } else if (typeof type === 'string') {
      // eslint-disable-next-line valid-typeof
      return typeof value === type
    } else {
      throw TypeError('ERR_INVALID_ARG_TYPE')
    }
  }
  const certValid = value => {
    for (let i = 0; i < validTypes.length; i++) {
      try {
        if (checkType(value, validTypes[i])) return
      } catch (err) {
        if (err.message === 'ERR_INVALID_ARG_TYPE') {
          throw new ArgTypeError(`validTypes[${i}]`, ...typeTypes)
        } else {
          throw err
        }
      }
    }
    throw new CertTypeError()
  }
  const certInvalid = value => {
    for (let i = 0; i < invalidTypes.length; i++) {
      try {
        if (checkType(value, invalidTypes[i])) {
          throw new CertTypeError()
        }
      } catch (err) {
        if (err.message === 'ERR_INVALID_ARG_TYPE') {
          throw new ArgTypeError(`invalidTypes[${i}]`, ...typeTypes)
        } else {
          throw err
        }
      }
    }
  }
  if (validTypes !== null) {
    for (let value of values) {
      certValid(value)
    }
  }
  if (invalidTypes !== null) {
    for (let value of values) {
      certInvalid(value)
    }
  }
}

/**
 * Checks all elements of `values` and their numerical relation to the provided bounds.
 *
 * @private
 * @func   checkRanges
 * @param  {number}  values  - Numbers to check for range adherence.
 * @param  {number}  lower   - Lower bound to use for reference.
 * @param  {number}  upper   - Upper bound to use for reference.
 * @param  {boolean} lowIncl - Whether or not the lower bound is inclusive.
 * @param  {booelan} upIncl  - Whether or not the upper bound is inclusive
 * @throws {(CertRangeError|ArgTypeError)} - Throws an CertRangeError if an element of `values` is outside of the given bound.
 */
const checkRanges = (values, lower, upper, lowIncl, upIncl) => {
  if (typeof lower !== 'number') {
    throw new ArgTypeError('lower', 'number')
  }
  if (typeof upper !== 'number') {
    throw new ArgTypeError('upper', 'number')
  }
  if (typeof lowIncl !== 'boolean') {
    throw new ArgTypeError('lowIncl', 'boolean')
  }
  if (typeof upIncl !== 'boolean') {
    throw new ArgTypeError('upIncl', 'boolean')
  }
  if (upper < lower) {
    throw new ArgRangeError('upper', upper, Infinity, lowIncl, true)
  }
  if (upper === lower && !(lowIncl && upIncl)) {
    throw new ArgRangeError('upper', lower, Infinity, false, true)
  }
  for (let valIndex = 0; valIndex < values.length; valIndex++) {
    const value = values[valIndex]
    if (typeof value !== 'number') {
      throw new ArgTypeError(`values[${valIndex}]`, 'number')
    }
    if (
      value < lower ||
      value > upper ||
      (value === lower && !lowIncl) ||
      (value === upper && !upIncl)
    ) {
      throw new CertRangeError()
    }
  }
}

/**
 * Given a set of values, provides a collection of assertion tools for checking strict equality, type, and range. Throws the appropriate error if a given test does not pass.
 *
 * @public
 * @class
 * @name   Certifier
 * @param  {...*}     values - Values to certify.
 */
class Certifier {
  constructor (...values) {
    /**
     * Certifies that ALL elements of `values` are strictly equal to any element of `allowed`. Throws if ANY element of `values` is NOT strictly equal to any valid value
     *
     * @public
     * @param  {...*} valid - Allowed values.
     * @throws {CertValueError} - Throws an CertValueError if the test fails.
     */
    this.is = (...valid) => checkValues(values, valid, null)
    /**
     * Certifies that All elements of `values` are not strictly equal to any element of `invalid`. Throws if the ANY element of `values` IS strictly equal to any invalid value.
     *
     * @public
     * @param  {...*} invalid - Prohibited values.
     * @throws {CertValueError} - Throws an CertValueError if the test fails.
     */
    this.isNot = (...invalid) => checkValues(values, null, invalid)
    /**
     * Certifies that ALL elements of `values` match any type in `validTypes`. Throws if the type of any element of `values` is NOT strictly equal to any valid type. If a given type is a string, checks using `typeof`. If a given type is a function, checks using instanceof.
     *
     * @public
     * @param  {...Type} validTypes - Allowed types.
     * @throws {(CertTypeError|ArgTypeError)} Throws an CertTypeError if the test fails. Throws an ArgTypeError if any element of `validTypes` is not a string or function.
     */
    this.isType = (...validTypes) => checkTypes(values, validTypes, null)
    /**
     * Certified that All elements of `values` DO NOT match any type in `invalidTypes`. Throws if the type of any element of `values` IS strictly equal to any invalid type. If a given type is a string, checks using `typeof`. If a given type is a function, checks using instanceof.
     *
     * @public
     * @param  {...Type} invalidTypes - Prohibited types.
     * @throws {(CertTypeError|ArgTypeError)} Throws an CertTypeError if the test fails. Throws an ArgTypeError if any element of `prohibitedTypes` is not a string or function.
     */
    this.isNotType = (...invalidTypes) => checkTypes(values, null, invalidTypes)
    /**
     * Certifies that ALL elements of `values` are within the provided range. Either bound may be inclusive or exclusive. Defaults to exclusive for both.
     *
     * @public
     * @param  {number}  lower   - Lower bound used for range checking.
     * @param  {number}  upper   - Upper bound used for range checking.
     * @param  {boolean} lowIncl - Whether or not the lower bound is inclusive.
     * @param  {boolean} upIncl  - Whether or not the upper bound is inclusive.
     * @throws {(CertRangeError|ArgTypeError)} Throws an CertRangeError if the test fails. Throws an ArgTypeError if any element of `values`, `lower`, or `upper` are not strict number types. Throws an ArgTypeError if either `lowIncl` or `upIncl` are not strict boolean types. Throws an ArgRangeError if `upper` is less than `lower`, or if `upper` is equal to `lower` and either are exclusive.
     */
    this.isRange = (lower, upper, lowIncl = false, upIncl = false) =>
      checkRanges(values, lower, upper, lowIncl, upIncl)
    /**
     * Certifies that ALL elements of `values` are greater than a provided lower bound. Throws if any element of `values` is NOT greater than the provided bound. Throws if any element of `values` is not a strict number type, or if `lower` is not a strict number type.
     *
     * @public
     * @param  {number} bound - Bound used for range checking
     * @throws {(CertRangeError|ArgTypeError)} Throws an CertRangeError if the test fails. Throws an ArgTypeError if `lower` is not a strict number type.
     */
    this.isGT = lower => checkRanges(values, lower, Infinity, false, true)
    /**
     * Certifies that ALL elements of `values` are greater than or equal to a provided lower bound. Throws if any element of `values` is NOT greater or equal to the provided bound. Throws if any element of `values` is not a strict number type or if `lower` is not a strict number type.
     *
     * @public
     * @param  {number} bound - Bound used for range checking
     * @throws {(CertRangeError|ArgTypeError)} Throws an CertRangeError if the test fails. Throws an ArgTypeError if `lower` is not a strict number type.
     */
    this.isGTE = lower => checkRanges(values, lower, Infinity, true, true)
    /**
     * Certifies that ALL elements of `values` are less than a provided upper bound. Throws if any element of `values` is NOT less than the provided bound. Throws if any element of `values` is not a strict number type or if `upper` is not a strict number type.
     *
     * @public
     * @param  {number} bound - Bound used for range checking
     * @throws {(CertRangeError|ArgTypeError)} Throws an CertRangeError if the test fails. Throws an ArgTypeError if `upper` is not a strict number type.
     */
    this.isLT = upper => checkRanges(values, -Infinity, upper, true, false)
    /**
     * Certifies that ALL elements of `values` are less than or equal to a provided upper bound. Throws if any element of `values` is NOT less than or equal to the provided bound. Throws if any element of `values` is not a strict number type or if `upper` is not a strict number type.
     *
     * @public
     * @param  {number} upper - Upper bound used for range checking
     * @throws {(CertRangeError|ArgTypeError)} Throws an CertRangeError if the test fails. Throws an ArgTypeError if `upper` is not a strict number type.
     */
    this.isLTE = upper => checkRanges(values, -Infinity, upper, true, true)
  }
}

/**
 * Provides an interface for the Certifier class that performs a given test on the values and returns the result as a boolean rather than throwing an error. Contains all methods associated with a Certifier instance. Methods return `true` if the test passes, and `false` if the test throws an error.
 *
 * @public
 * @class
 * @name    Checker
 * @extends Certifier
 * @param   {...*}         values - Values to certify.
 * @throws  {ArgTypeError} Throws an ArgTypeError if the supplied arguments are invalid.
 * @returns {boolean} Returns the result of the certification as a boolean.
 */
class Checker extends Certifier {
  constructor (...values) {
    super(...values)
    for (let fnName of Object.keys(this)) {
      const fn = this[fnName]
      this[fnName] = (...args) => {
        try {
          fn(...args)
          return true
        } catch (err) {
          if (
            err instanceof CertValueError ||
            err instanceof CertTypeError ||
            err instanceof CertRangeError
          ) {
            return false
          }
          throw err
        }
      }
    }
  }
}

module.exports = (...values) => new Certifier(...values)

/**
 * Constructs a new Checker instance in order to perform tests without throwing test errors.
 *
 * @public
 * @func   check
 * @param  {...*} values - Values used during construction of a new Certifier instance. Certifier methods will operate on these values.
 * @return {Checker} Returns a new Checker instance with Certifier instance methods capable of testing the supplied values.
 * @example
 * check('foo').is('bar')        // false
 * check('foo').is('bar', 'foo') // true
 * check(123).isGT(42)           // true
 * check(123).isGT('foo')        // THROWS ArgTypeError
 */
const check = (...values) => new Checker(...values)

module.exports.check = check
module.exports.ArgValueError = ArgValueError
module.exports.ArgTypeError = ArgTypeError
module.exports.ArgRangeError = ArgRangeError
module.exports.CertValueError = CertValueError
module.exports.CertTypeError = CertTypeError
module.exports.CertRangeError = CertRangeError
