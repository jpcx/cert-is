/**
 * @module cert-is
 */

/**
 * @author  Justin Collier <jpcxist@gmail.com>
 * @license MIT
 * @see {@link http://github.com/jpcx/cert-is|GitHub}
 */

/*.----------------------------------------------------------------------------,
 /                                  Imports                                  */

import Certifier, { AnyConstructorFunction } from './certifier';
import RangeAssertionError from './errors/rangeAssertionError';
import TypeAssertionError from './errors/typeAssertionError';
import ValueAssertionError from './errors/valueAssertionError';

/*.----------------------------------------------------------------------------,
 /                                    API                                    */

/**
 * Provides an interface to Certifier that performs a given test on the values
 * and returns the result as a boolean rather than throwing an error. Contains
 * all methods associated with a Certifier instance (except for
 * Certifier.message). Methods return `this` if the test passes, and `false`
 * if the test throws an error. All values must pass the supplied tests.
 *
 * @public
 * @class
 * @name    Checker
 * @param   {...*}  values - Values to certify.
 */
export default class Checker {
  /**
   * Certifies that ALL elements of `values` are strictly equal to any element
   * of `allowed`. Returns false if ANY element of `values` is NOT strictly
   * equal to any valid value.
   *
   * @public
   * @param   {...*} valid    - Allowed values.
   * @returns {Checker|false} Returns instance for re-use or false.
   */
  public is: (...valid: any) => Checker | false;
  /**
   * Certifies that All elements of `values` are not strictly equal to any
   * element of `invalid`. Returns false if the ANY element of `values` IS
   * strictly equal to any invalid value.
   *
   * @public
   * @param   {...*} invalid - Prohibited values.
   * @returns {Checker|false} Returns instance for re-use or false.
   */
  public isNot: (...invalid: any) => Checker | false;
  /**
   * Certifies that ALL elements of `values` match any type in `validTypes`.
   * Returns false if the type of any element of `values` is NOT strictly
   * equal to any valid type. If a given type is a string, checks using
   * `typeof`. If a given type is a function, checks using instanceof.
   *
   * @public
   * @param   {...(string|AnyConstructorFunction)} validTypes - Allowed types.
   * @returns {Checker|false} Returns instance for re-use or false.
   */
  public isType: (
    ...validTypes: Array<string | AnyConstructorFunction>
  ) => Checker | false;
  /**
   * Certified that All elements of `values` DO NOT match any type in
   * `invalidTypes`. Returns false if the type of any element of `values` IS
   * strictly equal to any invalid type. If a given type is a string, checks
   * using `typeof`. If a given type is a function, checks using instanceof.
   *
   * @public
   * @param   {...(string|AnyConstructorFunction)} invalidTypes - Prohibited
   * types.
   * @returns {Checker | false} Returns instance for re-use or false.
   */
  public isNotType: (
    ...invalidTypes: Array<string | AnyConstructorFunction>
  ) => Checker | false;
  /**
   * Certifies that ALL elements of `values` are greater than a provided lower
   * bound. Returns false if any element of `values` is NOT greater than the
   * provided bound. Returns false if any element of `values` is not a strict
   * number type, or if `lower` is not a strict number type.
   *
   * @public
   * @param   {number} lower    - Lower bound used for range checking
   * @returns {Checker | false} Returns instance for re-use or false.
   */
  public isGT: (lowerExclusive: number) => Checker | false;
  /**
   * Certifies that ALL elements of `values` are greater than or equal to a
   * provided lower bound. Returns false if any element of `values` is NOT
   * greater or equal to the provided bound. Returns false if any element of
   * `values` is not a strict number type or if `lower` is not a strict number
   * type.
   *
   * @public
   * @param   {number} lower    - Lower bound used for range checking
   * @returns {Checker | false} Returns instance for re-use or false.
   */
  public isGTE: (lowerIsInclusive: number) => Checker | false;
  /**
   * Certifies that ALL elements of `values` are less than a provided upper
   * bound. Returns false if any element of `values` is NOT less than the
   * provided bound. Returns false if any element of `values` is not a strict
   * number type or if `upper` is not a strict number type.
   *
   * @public
   * @param   {number} upper    - Upper bound used for range checking
   * @returns {Checker | false} Returns instance for re-use or false.
   */
  public isLT: (upperExclusive: number) => Checker | false;
  /**
   * Certifies that ALL elements of `values` are less than or equal to a
   * provided upper bound. Returns false if any element of `values` is NOT
   * less than or equal to the provided bound. Returns false if any element of
   * `values` is not a strict number type or if `upper` is not a strict number
   * type.
   *
   * @public
   * @param   {number} upper    - Upper bound used for range checking
   * @returns {Checker | false} Returns instance for re-use or false.
   */
  public isLTE: (upperIsInclusive: number) => Checker | false;
  constructor(...values: any) {
    const certifier = new Certifier(...values);

    const callResult = (fn: () => void) => {
      try {
        fn();
        return this;
      } catch (e) {
        if (
          e instanceof ValueAssertionError ||
          e instanceof TypeAssertionError ||
          e instanceof RangeAssertionError
        ) {
          return false;
        } else {
          throw e;
        }
      }
    };

    this.is = (...valid) => {
      return callResult(() => {
        certifier.is(...valid);
      });
    };

    this.isNot = (...invalid) => {
      return callResult(() => {
        certifier.isNot(...invalid);
      });
    };

    this.isType = (...validTypes) => {
      return callResult(() => {
        certifier.isType(...validTypes);
      });
    };

    this.isNotType = (...invalidTypes) => {
      return callResult(() => {
        certifier.isNotType(...invalidTypes);
      });
    };

    this.isGT = lowerExclusive => {
      return callResult(() => {
        certifier.isGT(lowerExclusive);
      });
    };

    this.isGTE = lowerIsInclusive => {
      return callResult(() => {
        certifier.isGTE(lowerIsInclusive);
      });
    };

    this.isLT = upperExclusive => {
      return callResult(() => {
        certifier.isLT(upperExclusive);
      });
    };

    this.isLTE = upperIsInclusive => {
      return callResult(() => {
        certifier.isLTE(upperIsInclusive);
      });
    };
  }
}
