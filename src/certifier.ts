/**
 * @module cert-is
 */

/**
 * @author  Justin Collier <jpcxist@gmail.com>
 * @license MIT
 * @see {@link http://github.com/jpcx/cert-is|GitHub}
 */

import { checkRanges, checkTypes, checkValues, IPrivateEnv } from './detail';

/**
 * Any function that uses new to construct an object.
 */
export type AnyConstructorFunction = new (...args: any) => any;

/**
 * Given a set of values, provides a collection of assertion tools for checking
 * strict equality, type, and range. Throws the appropriate error if a given
 * test does not pass. All values must pass the supplied tests.
 *
 * @public
 * @class
 * @name   Certifier
 * @param  {...any}  values - Values to certify.
 */
export default class Certifier {
  /**
   * Loads a message into the certifier to provide additional context for
   * thrown AssertionErrors.
   *
   * @public
   * @param   {string} message - Message to load.
   * @returns {Certifier}
   */
  public message: (message: string) => Certifier;
  /**
   * Certifies that ALL elements of `values` are strictly equal to any element
   * of `allowed`. Throws if ANY element of `values` is NOT strictly equal to
   * any valid value.
   *
   * @public
   * @param   {...*} valid          - Allowed values.
   * @throws  {ValueAssertionError} - Throws an ValueAssertionError if the test fails.
   * @returns {Certifier} Returns instance for re-use.
   */
  public is: (...valid: any) => Certifier;
  /**
   * Certifies that All elements of `values` are not strictly equal to any
   * element of `invalid`. Throws if the ANY element of `values` IS strictly
   * equal to any invalid value.
   *
   * @public
   * @param   {...*} invalid        - Prohibited values.
   * @throws  {ValueAssertionError} - Throws an ValueAssertionError if the test fails.
   * @returns {Certifier} Returns instance for re-use.
   */
  public isNot: (...invalid: any) => Certifier;
  /**
   * Certifies that ALL elements of `values` match any type in `validTypes`.
   * Throws if the type of any element of `values` is NOT strictly equal to
   * any valid type. If a given type is a string, checks using `typeof`. If a
   * given type is a function, checks using instanceof.
   *
   * @public
   * @param   {...(string|AnyConstructorFunction)} validTypes - Allowed types.
   * @throws  {(TypeAssertionError|TypeArgumentError)} Throws an
   * TypeAssertionError if the test fails. Throws an TypeArgumentError if any
   * element of `validTypes` is not a string or function.
   * @returns {Certifier} Returns instance for re-use.
   */
  public isType: (
    ...validTypes: Array<string | AnyConstructorFunction>
  ) => Certifier;
  /**
   * Certified that All elements of `values` DO NOT match any type in
   * `invalidTypes`. Throws if the type of any element of `values` IS strictly
   * equal to any invalid type. If a given type is a string, checks using
   * `typeof`. If a given type is a function, checks using instanceof.
   *
   * @public
   * @param   {...(string|AnyConstructorFunction)} invalidTypes - Prohibited
   * types.
   * @throws  {(TypeAssertionError|TypeArgumentError)} Throws an
   * TypeAssertionError if the test fails. Throws an TypeArgumentError if any
   * element of `prohibitedTypes` is not a string or function.
   * @returns {Certifier} Returns instance for re-use.
   */
  public isNotType: (
    ...invalidTypes: Array<string | AnyConstructorFunction>
  ) => Certifier;
  /**
   * Certifies that ALL elements of `values` are greater than a provided lower
   * bound. Throws if any element of `values` is NOT greater than the provided
   * bound. Throws if any element of `values` is not a strict number type, or
   * if `lower` is not a strict number type.
   *
   * @public
   * @param   {number} lower - Lower bound used for range checking
   * @throws  {(RangeAssertionError|TypeArgumentError)} Throws an
   * RangeAssertionError if the test fails. Throws an TypeArgumentError if
   * `lower` is not a strict number type.
   * @returns {Certifier} Returns instance for re-use.
   */
  public isGT: (lowerExclusive: number) => Certifier;
  /**
   * Certifies that ALL elements of `values` are greater than or equal to a
   * provided lower bound. Throws if any element of `values` is NOT greater or
   * equal to the provided bound. Throws if any element of `values` is not a
   * strict number type or if `lower` is not a strict number type.
   *
   * @public
   * @param   {number} lower - Lower bound used for range checking
   * @throws  {(RangeAssertionError|TypeArgumentError)} Throws an
   * RangeAssertionError if the test fails. Throws an TypeArgumentError if
   * `lower` is not a strict number type.
   * @returns {Certifier} Returns instance for re-use.
   */
  public isGTE: (lowerIsInclusive: number) => Certifier;
  /**
   * Certifies that ALL elements of `values` are less than a provided upper
   * bound. Throws if any element of `values` is NOT less than the provided
   * bound. Throws if any element of `values` is not a strict number type or if
   * `upper` is not a strict number type.
   *
   * @public
   * @param   {number} upper - Upper bound used for range checking
   * @throws  {(RangeAssertionError|TypeArgumentError)} Throws an
   * RangeAssertionError if the test fails. Throws an TypeArgumentError if
   * `upper` is not a strict number type.
   * @returns {Certifier} Returns instance for re-use.
   */
  public isLT: (upperExclusive: number) => Certifier;
  /**
   * Certifies that ALL elements of `values` are less than or equal to a
   * provided upper bound. Throws if any element of `values` is NOT less than
   * or equal to the provided bound. Throws if any element of `values` is not a
   * strict number type or if `upper` is not a strict number type.
   *
   * @public
   * @param   {number} upper - Upper bound used for range checking
   * @throws  {(RangeAssertionError|TypeArgumentError)} Throws a
   * RangeAssertionError if the test fails. Throws an TypeArgumentError if
   * `upper` is not a strict number type.
   * @returns {Certifier} Returns instance for re-use.
   */
  public isLTE: (upperIsInclusive: number) => Certifier;
  constructor(...values: any) {
    /**
     * Certifier private storage.
     *
     * @private
     * @typedef  {Object}   IPrivateEnv
     * @property {Array<*>} values        - Values to certify.
     * @property {string}   [messageBody] - Custom AssertionError message body.
     */
    const __: IPrivateEnv = { values };

    this.message = (message: string) => {
      __.messageBody = message;
      return this;
    };

    this.is = (...valid) => {
      checkValues(__, valid, null);
      return this;
    };

    this.isNot = (...invalid) => {
      checkValues(__, null, invalid);
      return this;
    };

    this.isType = (...validTypes) => {
      checkTypes(__, validTypes, null);
      return this;
    };

    this.isNotType = (...invalidTypes) => {
      checkTypes(__, null, invalidTypes);
      return this;
    };

    this.isGT = lowerExclusive => {
      checkRanges(__, lowerExclusive, Infinity, false, true);
      return this;
    };

    this.isGTE = lowerIsInclusive => {
      checkRanges(__, lowerIsInclusive, Infinity, true, true);
      return this;
    };

    this.isLT = upperExclusive => {
      checkRanges(__, -Infinity, upperExclusive, true, false);
      return this;
    };

    this.isLTE = upperIsInclusive => {
      checkRanges(__, -Infinity, upperIsInclusive, true, true);
      return this;
    };
  }
}
