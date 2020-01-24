/**
 * @module detail
 */

/**
 * @author  Justin Collier <jpcxist@gmail.com>
 * @license MIT
 * @see {@link http://github.com/jpcx/cert-is|GitHub}
 */

import {
  RangeAssertionError,
  TypeArgumentError,
  TypeAssertionError,
  ValueAssertionError
} from '.';
import { AnyConstructorFunction } from './certifier';

/**
 * Private environment storage for Certifier
 *
 * @private
 */
export interface IPrivateEnv {
  values: any[];
  messageBody?: string;
}

/**
 * Checks all elements of `__.values` for inclusion or exclusion in the `valid` and `invalid` value sets.
 *
 * @private
 * @func   checkValues
 * @param  {PrivateEnv}   __      - Certifier private storage.
 * @param  {(Array|null)} valid   - Array of valid values to reference.
 * @param  {(Array|null)} invalid - Array of invalid values to reference.
 * @throws {ValueAssertionError} Throws an ValueAssertionError if none of the
 * values strictly equal any of the allowed values, or if any of the values
 * strictly equals a prohibited value.
 */
export const checkValues = (
  __: IPrivateEnv,
  valid: any[] | null,
  invalid: any[] | null
): void => {
  for (const value of __.values) {
    if (
      (valid !== null && !valid.includes(value)) ||
      (invalid !== null && invalid.includes(value))
    ) {
      throw new ValueAssertionError(__.messageBody);
    }
  }
};

/**
 * Checks the types of all elements of `__.values` for strict inclusion or
 * exclusion in the `valid` and `invalid` type sets. Uses typeof if a valid /
 * invalid type is a string; uses instanceof if the type is a function.
 *
 * @private
 * @func   checkTypes
 * @param  {PrivateEnv}   __           - Certifier private storage.
 * @param  {(Array|null)} validTypes   - Array of valid types to reference.
 * @param  {(Array|null)} invalidTypes - Array of invalid types to reference.
 * @throws {(TypeAssertionError|TypeArgumentError)} Throws an
 * TypeAssertionError if a value is  in `invalidTypes` or is not in
 * `validTypes`. Throws an TypeArgumentError if an element in the type sets is
 * neither a string nor a function.
 */
export const checkTypes = (
  __: IPrivateEnv,
  validTypes: Array<string | AnyConstructorFunction> | null,
  invalidTypes: Array<string | AnyConstructorFunction> | null
): void => {
  const typeTypes = [
    'string',
    'function',
    Function
  ];
  const checkType = (value: any, type: string | AnyConstructorFunction) => {
    if (typeof type === 'function') {
      return value instanceof type;
    } else if (typeof type === 'string') {
      return typeof value === type;
    } else {
      throw TypeError('ERR_INVALID_ARG_TYPE');
    }
  };
  if (validTypes !== null) {
    const certValid = (value: any) => {
      for (let i = 0; i < validTypes.length; i++) {
        try {
          if (checkType(value, validTypes[i])) {
            return;
          }
        } catch (err) {
          if (err.message === 'ERR_INVALID_ARG_TYPE') {
            throw new TypeArgumentError(`validTypes[${i}]`, ...typeTypes);
          } else {
            throw err;
          }
        }
      }
      throw new TypeAssertionError(__.messageBody);
    };
    for (const value of __.values) {
      certValid(value);
    }
  }
  if (invalidTypes !== null) {
    const certInvalid = (value: any) => {
      for (let i = 0; i < invalidTypes.length; i++) {
        try {
          if (checkType(value, invalidTypes[i])) {
            throw new TypeAssertionError(__.messageBody);
          }
        } catch (err) {
          if (err.message === 'ERR_INVALID_ARG_TYPE') {
            throw new TypeArgumentError(`invalidTypes[${i}]`, ...typeTypes);
          } else {
            throw err;
          }
        }
      }
    };
    for (const value of __.values) {
      certInvalid(value);
    }
  }
};

/**
 * Checks all elements of `__.values` and their numerical relation to the provided bounds.
 *
 * @private
 * @func   checkRanges
 * @param  {PrivateEnv} __      - Certifier private storage.
 * @param  {number}     lower   - Lower bound to use for reference.
 * @param  {number}     upper   - Upper bound to use for reference.
 * @param  {boolean}    lowerIsInclusive - Whether or not the lower bound is inclusive.
 * @param  {booelan}    upperIsInclusive - Whether or not the upper bound is inclusive
 * @throws {(RangeAssertionError|TypeArgumentError)} - Throws an
 * RangeAssertionError if an element of `values` is outside of the given bound.
 */
export const checkRanges = (
  __: IPrivateEnv,
  lower: number,
  upper: number,
  lowerIsInclusive: boolean,
  upperIsInclusive: boolean
): void => {
  if (typeof lower !== 'number') {
    throw new TypeArgumentError('lower', 'number');
  }
  if (typeof upper !== 'number') {
    throw new TypeArgumentError('upper', 'number');
  }
  if (typeof lowerIsInclusive !== 'boolean') {
    throw new TypeArgumentError('lowerIsInclusive', 'boolean');
  }
  if (typeof upperIsInclusive !== 'boolean') {
    throw new TypeArgumentError('upperIsInclusive', 'boolean');
  }
  for (let valIndex = 0; valIndex < __.values.length; valIndex++) {
    const value = __.values[valIndex];
    if (typeof value !== 'number') {
      throw new TypeArgumentError(`values[${valIndex}]`, 'number');
    }
    if (
      value < lower ||
      value > upper ||
      (value === lower && !lowerIsInclusive) ||
      (value === upper && !upperIsInclusive)
    ) {
      throw new RangeAssertionError(__.messageBody);
    }
  }
};
