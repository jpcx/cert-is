/**
 * @module cert-is
 */

/**
 * Provides a collection of assertion tools for checking strict equality, type, and range of a set of values.
 *
 * @author  Justin Collier <jpcxist@gmail.com>
 * @license MIT
 * @see     {@link http://github.com/jpcx/cert-is|GitHub}
 */

import Certifier from './certifier';
import Checker from './checker';
import RangeArgumentError from './errors/rangeArgumentError';
import RangeAssertionError from './errors/rangeAssertionError';
import TypeArgumentError from './errors/typeArgumentError';
import TypeAssertionError from './errors/typeAssertionError';
import ValueArgumentError from './errors/valueArgumentError';
import ValueAssertionError from './errors/valueAssertionError';

/**
 * Constructs a Certifier instance given a set of values. All values must pass
 * the supplied tests.
 *
 * @public
 * @func    cert
 * @param   {...any}    values - Values to construct Certifier with.
 * @returns {Certifier} Certifier instance.
 * @example
 * ```js
 * const certifier = cert('foo', 'bar')
 * certifier.is('foo') // undefined
 * certifier.is('bar') // undefined
 * certifier.is('qux') // THROWS ValueAssertionError
 * ```
 * @example
 * ```js
 * cert('foo').is('foo')                      // returns Certifier instance
 * cert('foo').is('bar')                      // THROWS ValueAssertionError
 * cert('foo').is('foo', 'bar')               // returns Certifier instance
 * cert('foo').isNot('foo')                   // THROWS ValueAssertionError
 * cert('foo').isType('string')               // returns Certifier instance
 * cert('foo').isType('number')               // THROWS TypeAssertionError
 * cert('foo').isType('string', 'number')     // returns Certifier instance
 * cert(new Map()).isType(Map)                // returns Certifier instance
 * cert(new Map()).isType(Object)             // returns Certifier instance
 * cert(new Map()).isType(Set)                // THROWS TypeAssertionError
 * cert(new Map()).isType(Map, Set)           // returns Certifier instance
 * cert(15).isGT(2)                           // returns Certifier instance
 * cert(15).isGT(2).isLT(17)                  // returns Certifier instance
 * cert(18).isGT(17).isLT(2)                  // THROWS RangeAssertionError
 * cert(15).isGT(15)                          // THROWS RangeAssertionError
 * cert(15).isGTE(15)                         // returns Certifier instance
 * cert(15, 23).isGTE(15)                     // returns Certifier instance
 * cert(15, 23).isGTE('foo')                  // THROWS TypeArgumentError
 * ```
 */
export function cert(...values: any): Certifier {
  return new Certifier(...values);
}

/**
 * Constructs a Checker instance given a set of values. All values must pass
 * the supplied tests.
 *
 * @public
 * @func    check
 * @param   {...any}  values - Values to construct Checker with.
 * @returns {Checker} Checker instance.
 * @example
 * ```js
 * check('foo').is('foo')        // returns true
 * check('foo').is('bar')        // returns Checker instance
 * check('foo').isType('string') // returns true
 * check('foo').isType('bar')    // THROWS TypeArgumentError
 * check('foo').isGT('')         // THROWS TypeArgumentError
 * ```
 */
export function check(...values: any): Checker {
  return new Checker(...values);
}

export {
  Certifier,
  Checker,
  RangeArgumentError,
  RangeAssertionError,
  TypeArgumentError,
  TypeAssertionError,
  ValueArgumentError,
  ValueAssertionError
};

export default cert;
