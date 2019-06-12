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
 * @prop {ValueArgumentError}  ValueArgumentError  - Reference to the ValueArgumentError class.
 * @prop {TypeArgumentError}   TypeArgumentError   - Reference to the TypeArgumentError class.
 * @prop {RangeArgumentError}  RangeArgumentError  - Reference to the RangeArgumentError class.
 * @prop {ValueAssertionError} ValueAssertionError - Reference to the ValueAssertionError class.
 * @prop {TypeAssertionError}  TypeAssertionError  - Reference to the TypeAssertionError class.
 * @prop {RangeAssertionError} RangeAssertionError - Reference to the RangeAssertionError class.
 * @param  {...*} values - Values used during construction of a new Certifier instance. Certifier methods will operate on these values.
 * @return {Certifier}   Instance of the {@link #certifier Certifier} class that contains methods for certifying the provided values.
 * @example
 * const cert = require('cert-is')
 *
 * const certifier = cert('foo', 'bar')
 * certifier.is('foo') // undefined
 * certifier.is('bar') // undefined
 * certifier.is('qux') // THROWS ValueAssertionError
 * @example
 * const cert = require('cert-is')
 *
 * cert('foo').is('foo')                      // returns cert() instance
 * cert('foo').is('bar')                      // THROWS ValueAssertionError
 * cert('foo').is('foo', 'bar')               // returns cert() instance
 * cert('foo').isNot('foo')                   // THROWS ValueAssertionError
 * cert('foo').isType('string')               // returns cert() instance
 * cert('foo').isType('number')               // THROWS TypeAssertionError
 * cert('foo').isType('string', 'number')     // returns cert() instance
 * cert(new Map()).isType(Map)                // returns cert() instance
 * cert(new Map()).isType(Object)             // returns cert() instance
 * cert(new Map()).isType(Set)                // THROWS TypeAssertionError
 * cert(new Map()).isType(Map, Set)           // returns cert() instance
 * cert(15).isGT(2)                           // returns cert() instance
 * cert(15).isGT(15)                          // THROWS RangeAssertionError
 * cert(15).isGTE(15)                         // returns cert() instance
 * cert(15, 23).isGTE(15)                     // returns cert() instance
 * cert(15, 23).isGTE('foo')                  // THROWS TypeArgumentError
 * cert(15, 23).isRange(14, 24, false, false) // returns cert() instance
 * cert(15, 23).isRange(15, 23, true, true)   // returns cert() instance
 * cert(15, 23).isRange(15, 23, true, false)  // THROWS RangeAssertionError
 * cert(15, 23).isRange(23, 15, true, true)   // THROWS RangeArgumentError
 * @example
 * const check = require('cert-is').check
 *
 * check('foo').is('foo')        // returns true
 * check('foo').is('bar')        // returns check() instance
 * check('foo').isType('string') // returns true
 * check('foo').isType('bar')    // THROWS TypeArgumentError
 * check('foo').isGT('')         // THROWS TypeArgumentError
 * @example
 * const cert = require('cert-is')
 * const check = cert.check
 *
 * cert(15).isGT(2).isLT(18).isType('number')     // returns cert() instance
 * cert(15).isGT(2).isLT(-9000).isType('number')  // throws RangeAssertionError
 * check(15).isGT(2).isLT(18).isType('number')    // returns check() instance
 * check(15).isGT(2).isLT(-9000).isType('number') // returns false
 */
Object.defineProperty(module, 'exports', {
  get: () => {
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
     * @name  ValueArgumentError
     * @extends Error
     * @param {string}  paramName  - Name of the parameter that caused the error.
     * @param {...*}    [valid=[]] - Optional list of valid values for the argument.
     * @prop  {'Error'} name       - Name of the error constructor.
     * @prop  {string}  message    - Message describing the issue. See examples below.
     * @prop  {'ERR_INVALID_ARG_VALUE'} code - Error code.
     * @prop  {Array}   [valid]    - Optional list of valid values for the argument. If none are provided to the constructor, this property will not be set.
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
    class ValueArgumentError extends Error {
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
     * @name  TypeArgumentError
     * @extends TypeError
     * @param {string}   paramName      - Name of the parameter that caused the error.
     * @param {...Type} [validTypes=[]] - Optional list of valid types for the argument.
     * @prop  {'TypeError'} name    - Name of the error constructor.
     * @prop  {string}      message - Message describing the issue. See examples below.
     * @prop  {'ERR_INVALID_ARG_TYPE'} code - Error code.
     * @prop  {Array}   [validTypes] - Optional list of valid types for the argument. If none are provided to the constructor, this property will not be set.
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
    class TypeArgumentError extends TypeError {
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
     * @name  RangeArgumentError
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
    class RangeArgumentError extends RangeError {
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
          this.range = `${lower} ${lowSymbol} "${paramName}" ${upSymbol} ${
            upper
          }`
        }
      }
    }

    /**
     * Thrown when the certifier finds a value is either not expected or is explicitly forbidden.
     *
     * @public
     * @class
     * @name ValueAssertionError
     * @extends Error
     * @prop {'Error'} name - Name of the error constructor.
     * @prop {'[ERR_INVALID_VALUE]: Value is invalid'}  message - Message describing the issue.
     * @prop {'ERR_INVALID_VALUE'} code    - Error code.
     * @example
     * const e = new ValueAssertionError()
     * e.name    // 'Error'
     * e.message // '[ERR_INVALID_VALUE]: Value is invalid'
     * e.code    // 'ERR_INVALID_VALUE'
     */
    class ValueAssertionError extends Error {
      constructor (message = 'Value is invalid') {
        const code = 'ERR_INVALID_VALUE'
        super(`[${code}]: ${message}`)
        this.code = code
      }
    }

    /**
     * Thrown when the certifier finds a value with a type that is either not expected or is explicitly forbidden.
     *
     * @public
     * @class
     * @name TypeAssertionError
     * @extends TypeError
     * @prop {'TypeError'} name - Name of the error constructor.
     * @prop {'[ERR_INVALID_TYPE]: Value is of an invalid type'} message - Message describing the issue.
     * @prop {'ERR_INVALID_TYPE'} code - Error code.
     * @example
     * const e = new TypeAssertionError()
     * e.name    // 'TypeError'
     * e.message // '[ERR_INVALID_TYPE]: Value is of an invalid type'
     * e.code    // 'ERR_INVALID_TYPE'
     */
    class TypeAssertionError extends TypeError {
      constructor (message = 'Value is of an invalid type') {
        const code = 'ERR_INVALID_TYPE'
        super(`[${code}]: ${message}`)
        this.code = code
      }
    }

    /**
     * Thrown when the certifier finds a value that is not within an expected range.
     *
     * @public
     * @class
     * @name    RangeAssertionError
     * @extends RangeError
     * @prop {'TypeError'} name - Name of the error constructor.
     * @prop {'[ERR_INVALID_RANGE]: Value is of a prohibited range'} message - Message describing the issue.
     * @prop {'ERR_INVALID_RANGE'} code - Error code.
     * @example
     * const e = new RangeAssertionError()
     * e.name    // 'RangeError'
     * e.message // '[ERR_INVALID_RANGE]: Value is of a prohibited range'
     * e.code    // 'ERR_INVALID_RANGE'
     */
    class RangeAssertionError extends RangeError {
      constructor (message = 'Value is of a prohibited range') {
        const code = 'ERR_INVALID_RANGE'
        super(`[${code}]: ${message}`)
        this.code = code
      }
    }

    /**
     * Checks all elements of `__.values` for inclusion or exclusion in the `valid` and `invalid` value sets.
     *
     * @private
     * @func   checkValues
     * @param  {PrivateEnv}   __      - Certifier private storage.
     * @param  {(Array|null)} valid   - Array of valid values to reference.
     * @param  {(Array|null)} invalid - Array of invalid values to reference.
     * @throws {ValueAssertionError} Throws an ValueAssertionError if none of the values strictly equal any of the allowed values, or if any of the values strictly equals a prohibited value.
     */
    const checkValues = (__, valid, invalid) => {
      for (let value of __.values) {
        if (
          (valid !== null && !valid.includes(value)) ||
          (invalid !== null && invalid.includes(value))
        ) {
          throw new ValueAssertionError(__.messageBody)
        }
      }
    }

    /**
     * Checks the types of all elements of `__.values` for strict inclusion or exclusion in the `valid` and `invalid` type sets. Uses typeof if a valid / invalid type is a string; uses instanceof if the type is a function.
     *
     * @private
     * @func   checkTypes
     * @param  {PrivateEnv}   __           - Certifier private storage.
     * @param  {(Array|null)} validTypes   - Array of valid types to reference.
     * @param  {(Array|null)} invalidTypes - Array of invalid types to reference.
     * @throws {(TypeAssertionError|TypeArgumentError)} Throws an TypeAssertionError if a value is  in `invalidTypes` or is not in `validTypes`. Throws an TypeArgumentError if an element in the type sets is neither a string nor a function.
     */
    const checkTypes = (__, validTypes, invalidTypes) => {
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
              throw new TypeArgumentError(`validTypes[${i}]`, ...typeTypes)
            } else {
              throw err
            }
          }
        }
        throw new TypeAssertionError(__.messageBody)
      }
      const certInvalid = value => {
        for (let i = 0; i < invalidTypes.length; i++) {
          try {
            if (checkType(value, invalidTypes[i])) {
              throw new TypeAssertionError(__.messageBody)
            }
          } catch (err) {
            if (err.message === 'ERR_INVALID_ARG_TYPE') {
              throw new TypeArgumentError(`invalidTypes[${i}]`, ...typeTypes)
            } else {
              throw err
            }
          }
        }
      }
      if (validTypes !== null) {
        for (let value of __.values) {
          certValid(value)
        }
      }
      if (invalidTypes !== null) {
        for (let value of __.values) {
          certInvalid(value)
        }
      }
    }

    /**
     * Checks all elements of `__.values` and their numerical relation to the provided bounds.
     *
     * @private
     * @func   checkRanges
     * @param  {PrivateEnv} __      - Certifier private storage.
     * @param  {number}     lower   - Lower bound to use for reference.
     * @param  {number}     upper   - Upper bound to use for reference.
     * @param  {boolean}    lowIncl - Whether or not the lower bound is inclusive.
     * @param  {booelan}    upIncl  - Whether or not the upper bound is inclusive
     * @throws {(RangeAssertionError|TypeArgumentError)} - Throws an RangeAssertionError if an element of `values` is outside of the given bound.
     */
    const checkRanges = (__, lower, upper, lowIncl, upIncl) => {
      if (typeof lower !== 'number') {
        throw new TypeArgumentError('lower', 'number')
      }
      if (typeof upper !== 'number') {
        throw new TypeArgumentError('upper', 'number')
      }
      if (typeof lowIncl !== 'boolean') {
        throw new TypeArgumentError('lowIncl', 'boolean')
      }
      if (typeof upIncl !== 'boolean') {
        throw new TypeArgumentError('upIncl', 'boolean')
      }
      if (upper < lower) {
        throw new RangeArgumentError('upper', upper, Infinity, lowIncl, true)
      }
      if (upper === lower && !(lowIncl && upIncl)) {
        throw new RangeArgumentError('upper', lower, Infinity, false, true)
      }
      for (let valIndex = 0; valIndex < __.values.length; valIndex++) {
        const value = __.values[valIndex]
        if (typeof value !== 'number') {
          throw new TypeArgumentError(`values[${valIndex}]`, 'number')
        }
        if (
          value < lower ||
          value > upper ||
          (value === lower && !lowIncl) ||
          (value === upper && !upIncl)
        ) {
          throw new RangeAssertionError(__.messageBody)
        }
      }
    }

    /**
     * Given a set of values, provides a collection of assertion tools for checking strict equality, type, and range. Throws the appropriate error if a given test does not pass.
     *
     * @public
     * @class
     * @name   Certifier
     * @param  {...*}    values - Values to certify.
     */
    class Certifier {
      constructor (...values) {
        /**
         * Certifier private storage.
         *
         * @private
         * @typedef  {Object}   PrivateEnv
         * @property {Array<*>} values        - Values to certify.
         * @property {string}   [messageBody] - Custom AssertionError message body.
         */
        const __ = { values }

        /**
         * Loads a message into the certifier to provide additional context for
         * thrown AssertionErrors.
         *
         * @public
         * @param {string} message - Message to load.
         * @returns {Certifier}
         */
        this.message = function (message) {
          __.messageBody = message
          return this
        }

        /**
         * Certifies that ALL elements of `values` are strictly equal to any element of `allowed`. Throws if ANY element of `values` is NOT strictly equal to any valid value
         *
         * @public
         * @param  {...*} valid - Allowed values.
         * @throws {ValueAssertionError} - Throws an ValueAssertionError if the test fails.
         * @returns {Certifier} Returns instance for re-use.
         */
        this.is = function (...valid) {
          checkValues(__, valid, null)
          return this
        }

        /**
         * Certifies that All elements of `values` are not strictly equal to any element of `invalid`. Throws if the ANY element of `values` IS strictly equal to any invalid value.
         *
         * @public
         * @param  {...*} invalid - Prohibited values.
         * @throws {ValueAssertionError} - Throws an ValueAssertionError if the test fails.
         * @returns {Certifier} Returns instance for re-use.
         */
        this.isNot = function (...invalid) {
          checkValues(__, null, invalid)
          return this
        }

        /**
         * Certifies that ALL elements of `values` match any type in `validTypes`. Throws if the type of any element of `values` is NOT strictly equal to any valid type. If a given type is a string, checks using `typeof`. If a given type is a function, checks using instanceof.
         *
         * @public
         * @param  {...Type} validTypes - Allowed types.
         * @throws {(TypeAssertionError|TypeArgumentError)} Throws an TypeAssertionError if the test fails. Throws an TypeArgumentError if any element of `validTypes` is not a string or function.
         * @returns {Certifier} Returns instance for re-use.
         */
        this.isType = function (...validTypes) {
          checkTypes(__, validTypes, null)
          return this
        }

        /**
         * Certified that All elements of `values` DO NOT match any type in `invalidTypes`. Throws if the type of any element of `values` IS strictly equal to any invalid type. If a given type is a string, checks using `typeof`. If a given type is a function, checks using instanceof.
         *
         * @public
         * @param  {...Type} invalidTypes - Prohibited types.
         * @throws {(TypeAssertionError|TypeArgumentError)} Throws an TypeAssertionError if the test fails. Throws an TypeArgumentError if any element of `prohibitedTypes` is not a string or function.
         * @returns {Certifier} Returns instance for re-use.
         */
        this.isNotType = function (...invalidTypes) {
          checkTypes(__, null, invalidTypes)
          return this
        }

        /**
         * Certifies that ALL elements of `values` are within the provided range. Either bound may be inclusive or exclusive. Defaults to exclusive for both.
         *
         * @public
         * @param  {number}  lower   - Lower bound used for range checking.
         * @param  {number}  upper   - Upper bound used for range checking.
         * @param  {boolean} lowIncl - Whether or not the lower bound is inclusive.
         * @param  {boolean} upIncl  - Whether or not the upper bound is inclusive.
         * @throws {(RangeAssertionError|TypeArgumentError)} Throws an RangeAssertionError if the test fails. Throws an TypeArgumentError if any element of `values`, `lower`, or `upper` are not strict number types. Throws an TypeArgumentError if either `lowIncl` or `upIncl` are not strict boolean types. Throws an RangeArgumentError if `upper` is less than `lower`, or if `upper` is equal to `lower` and either are exclusive.
         * @returns {Certifier} Returns instance for re-use.
         */
        this.isRange = function (lower, upper, lowIncl = false, upIncl = false) {
          checkRanges(__, lower, upper, lowIncl, upIncl)
          return this
        }

        /**
         * Certifies that ALL elements of `values` are greater than a provided lower bound. Throws if any element of `values` is NOT greater than the provided bound. Throws if any element of `values` is not a strict number type, or if `lower` is not a strict number type.
         *
         * @public
         * @param  {number} lower - Lower bound used for range checking
         * @throws {(RangeAssertionError|TypeArgumentError)} Throws an RangeAssertionError if the test fails. Throws an TypeArgumentError if `lower` is not a strict number type.
         * @returns {Certifier} Returns instance for re-use.
         */
        this.isGT = function (lower) {
          checkRanges(__, lower, Infinity, false, true)
          return this
        }

        /**
         * Certifies that ALL elements of `values` are greater than or equal to a provided lower bound. Throws if any element of `values` is NOT greater or equal to the provided bound. Throws if any element of `values` is not a strict number type or if `lower` is not a strict number type.
         *
         * @public
         * @param  {number} lower - Lower bound used for range checking
         * @throws {(RangeAssertionError|TypeArgumentError)} Throws an RangeAssertionError if the test fails. Throws an TypeArgumentError if `lower` is not a strict number type.
         * @returns {Certifier} Returns instance for re-use.
         */
        this.isGTE = function (lower) {
          checkRanges(__, lower, Infinity, true, true)
          return this
        }

        /**
         * Certifies that ALL elements of `values` are less than a provided upper bound. Throws if any element of `values` is NOT less than the provided bound. Throws if any element of `values` is not a strict number type or if `upper` is not a strict number type.
         *
         * @public
         * @param  {number} upper - Upper bound used for range checking
         * @throws {(RangeAssertionError|TypeArgumentError)} Throws an RangeAssertionError if the test fails. Throws an TypeArgumentError if `upper` is not a strict number type.
         * @returns {Certifier} Returns instance for re-use.
         */
        this.isLT = function (upper) {
          checkRanges(__, -Infinity, upper, true, false)
          return this
        }

        /**
         * Certifies that ALL elements of `values` are less than or equal to a provided upper bound. Throws if any element of `values` is NOT less than or equal to the provided bound. Throws if any element of `values` is not a strict number type or if `upper` is not a strict number type.
         *
         * @public
         * @param  {number} upper - Upper bound used for range checking
         * @throws {(RangeAssertionError|TypeArgumentError)} Throws an RangeAssertionError if the test fails. Throws an TypeArgumentError if `upper` is not a strict number type.
         * @returns {Certifier} Returns instance for re-use.
         */
        this.isLTE = function (upper) {
          checkRanges(__, -Infinity, upper, true, true)
          return this
        }
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
     * @throws  {TypeArgumentError} Throws an TypeArgumentError if the supplied arguments are invalid.
     * @returns {(Checker|false)} Returns the instance for re-use (truthy), or false if the check fails (falsy).
     */
    class Checker extends Certifier {
      constructor (...values) {
        super(...values)
        const fnExclusions = ['message']
        for (let excl of fnExclusions) {
          this[excl] = function () {
            return this
          }
        }
        for (let fnName of Object.keys(this)) {
          const fn = this[fnName].bind(this)
          this[fnName] = (...args) => {
            try {
              return fn(...args)
            } catch (err) {
              if (
                err instanceof ValueAssertionError ||
                err instanceof TypeAssertionError ||
                err instanceof RangeAssertionError
              ) {
                return false
              }
              throw err
            }
          }
        }
      }
    }

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
     * check(123).isGT('foo')        // THROWS TypeArgumentError
     */
    const check = (...values) => new Checker(...values)

    const cert = (...values) => new Certifier(...values)

    cert.check = check
    cert.ValueArgumentError = ValueArgumentError
    cert.TypeArgumentError = TypeArgumentError
    cert.RangeArgumentError = RangeArgumentError
    cert.ValueAssertionError = ValueAssertionError
    cert.TypeAssertionError = TypeAssertionError
    cert.RangeAssertionError = RangeAssertionError

    return cert
  },
  configurable: false
})
