/**
 * @private
 * @author Justin Collier <jpcxme@gmail.com>
 * @license MIT
 * @see {@link http://github.com/jpcx/cert-is|GitHub}
 */

import cert, {
  check,
  RangeAssertionError,
  TypeArgumentError,
  TypeAssertionError,
  ValueArgumentError,
  ValueAssertionError
} from '.';

class UnexpectedErrorError extends Error {
  public err?: Error;
  constructor(message: string) {
    super(message);
  }
}

describe('Equality Checking', () => {
  describe('Equal', () => {
    describe('Primitives', () => {
      it('Certifies that a boolean is equal to itself', () => {
        cert(false).is(false);
        cert(true).is(true);
      });
      it('Certifies that a boolean is equal to any of (both) booleans', () => {
        cert(false).is(true, false);
        cert(true).is(true, false);
        cert(true).is(true, false);
      });
      it('Certifies that a boolean is equal to any of (both) booleans and other values', () => {
        cert(false).is(
          true,
          false,
          undefined,
          null,
          42,
          'foo',
          Symbol.match,
          {},
          Object
        );
        cert(true).is(
          true,
          false,
          undefined,
          null,
          42,
          'foo',
          Symbol.match,
          {},
          Object
        );
      });
      it('Certifies that undefined is equal to itself', () => {
        cert(undefined).is(undefined);
      });
      it('Certifies that undefined is equal to any one of itself and other values', () => {
        cert(undefined).is(
          true,
          false,
          undefined,
          null,
          42,
          'foo',
          Symbol.match,
          {},
          Object
        );
      });
      it('Certifies that a number is equal to itself', () => {
        cert(42).is(42);
      });
      it('Certifies that a number is equal to any one of itself and other numbers', () => {
        cert(42).is(12, 22, 32, 42);
        cert(12).is(12, 22, 32, 42);
      });
      it('Certifies that a number is equal to any one of itself and other values', () => {
        cert(42).is(
          true,
          false,
          undefined,
          null,
          42,
          'foo',
          Symbol.match,
          {},
          Object
        );
      });
      it('Certifies that a string is equal to itself', () => {
        cert('foo').is('foo');
      });
      it('Certifies that a string is equal to any one of itself and other strings', () => {
        cert('foo').is('foo', 'bar', 'baz');
        cert('bar').is('foo', 'bar', 'baz');
      });
      it('Certifies that a string is equal to any one of itself and other values', () => {
        cert('foo').is(
          true,
          false,
          undefined,
          null,
          42,
          'foo',
          Symbol.match,
          {},
          Object
        );
      });
      it('Certifies that a symbol is equal to itself', () => {
        cert(Symbol.match).is(Symbol.match);
      });
      it('Certifies that a symbol is equal to any one of itself and other symbols', () => {
        cert(Symbol.match).is(Symbol.match, Symbol.search, Symbol.replace);
        cert(Symbol.search).is(Symbol.match, Symbol.search, Symbol.replace);
      });
      it('Certifies that a symbol is equal to any one of itself and other values', () => {
        cert(Symbol.match).is(
          true,
          false,
          undefined,
          null,
          42,
          'foo',
          Symbol.match,
          {},
          Object
        );
      });
      it('Certifies that null is equal to itself', () => {
        cert(null).is(null);
      });
      it('Certifies that null is equal to any one of itself and other values', () => {
        cert(null).is(
          true,
          false,
          undefined,
          null,
          42,
          'foo',
          Symbol.match,
          {},
          Object
        );
      });
    });
    describe('Objects', () => {
      it('Certifies that an object is equal to itself', () => {
        const obj = {};
        cert(obj).is(obj);
      });
      it('Certifies that an object is equal to itself and other objects', () => {
        const objA = {};
        const objB = { foo: 'bar' };
        cert(objA).is(objA, objB);
        cert(objB).is(objA, objB);
      });
      it('Certifies that an object is equal to itself and other values', () => {
        const obj = {};
        cert(obj).is(
          true,
          false,
          undefined,
          null,
          42,
          'foo',
          Symbol.match,
          {},
          Object,
          obj
        );
      });
    });
  });
  describe('Not Equal', () => {
    describe('Primitives', () => {
      it('Certifies that a boolean is not equal to another boolean', () => {
        cert(true).isNot(false);
        cert(false).isNot(true);
      });
      it('Certifies that a boolean is not equal to any of a list of other values', () => {
        cert(true).isNot(
          false,
          undefined,
          null,
          42,
          'foo',
          Symbol.match,
          {},
          Object
        );
        cert(false).isNot(
          true,
          undefined,
          null,
          42,
          'foo',
          Symbol.match,
          {},
          Object
        );
      });
      it('Certifies that undefined is not equal to null', () => {
        cert(undefined).isNot(null);
      });
      it('Certifies that undefined is not equal to any of a list of other values', () => {
        cert(undefined).isNot(
          true,
          false,
          null,
          42,
          'foo',
          Symbol.match,
          {},
          Object
        );
      });
      it('Certifies that a number is not equal to another number', () => {
        cert(42).isNot(12);
      });
      it('Certifies that a number is not equal to any of a list of other numbers', () => {
        cert(42).isNot(12, 22, 32);
      });
      it('Certifies that a number is not equal to any of a list of other values', () => {
        cert(42).isNot(
          true,
          false,
          undefined,
          null,
          'foo',
          Symbol.match,
          {},
          Object
        );
      });
      it('Certifies that a string is not equal to another string', () => {
        cert('foo').isNot('bar');
      });
      it('Certifies that a string is not equal to any of a list of other strings', () => {
        cert('foo').isNot('bar', 'baz');
      });
      it('Certifies that a string is not equal to any of a list of other values', () => {
        cert('foo').isNot(
          true,
          false,
          undefined,
          null,
          42,
          Symbol.match,
          {},
          Object
        );
      });
      it('Certifies that a symbol is not equal to another symbol', () => {
        cert(Symbol.match).isNot(Symbol.search);
        cert(Symbol.search).isNot(Symbol.match);
      });
      it('Certifies that a symbol is not equal to any of a list of other symbols', () => {
        cert(Symbol.match).isNot(Symbol.search, Symbol.replace);
        cert(Symbol.search).isNot(Symbol.match, Symbol.replace);
      });
      it('Certifies that a symbol is not equal to any of a list of other values', () => {
        cert(Symbol.match).isNot(
          true,
          false,
          undefined,
          null,
          42,
          'foo',
          {},
          Object
        );
      });
      it('Certifies that null is not equal to undefined', () => {
        cert(null).isNot(undefined);
      });
      it('Certifies that null is not equal to any of a list of other values', () => {
        cert(null).isNot(
          true,
          false,
          undefined,
          42,
          'foo',
          Symbol.match,
          {},
          Object
        );
      });
    });
    describe('Objects', () => {
      it('Certifies that an object is not equal to another object', () => {
        cert({}).isNot({ foo: 'bar' });
      });
      it('Certifies that an object is not equal to any of a list of other objects', () => {
        cert({}).isNot({ foo: 'bar' }, { baz: 'beh' }, { qux: 'quz' });
      });
      it('Certifies that an object is not equal to any of a list of other values', () => {
        cert({}).isNot(
          true,
          false,
          undefined,
          null,
          42,
          'foo',
          Symbol.match,
          {},
          Object
        );
      });
    });
  });
  describe('Error Handling', () => {
    describe('Equal', () => {
      it('Throws the correct error if a value is not strictly equal to another value', () => {
        try {
          cert(0).is('0');
          throw Error('Cert did not throw an error when expected');
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_VALUE]: Value is invalid' ||
            !(err instanceof ValueAssertionError) ||
            !(err.code === 'ERR_INVALID_VALUE')
          ) {
            throw Error('Cert did not throw the correct error');
          }
        }
      });
      it('Throws the correct error if a value is not strictly equal to any of a list of values', () => {
        const list = [
          true,
          false,
          undefined,
          null,
          42,
          'foo',
          Symbol.match,
          {},
          Object
        ];
        let certified = false;
        try {
          cert(0).is(...list);
          certified = true;
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_VALUE]: Value is invalid' ||
            !(err instanceof ValueAssertionError) ||
            !(err.code === 'ERR_INVALID_VALUE')
          ) {
            throw Error('Cert did not throw the correct error');
          }
        }
        if (certified) {
          throw Error('Cert did not throw an error when expected');
        }
      });
    });
    describe('Not Equal', () => {
      it('Throws the correct error if a value is strictly equal to itself', () => {
        let certified = false;
        try {
          cert(0).isNot(0);
          certified = true;
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_VALUE]: Value is invalid' ||
            !(err instanceof ValueAssertionError) ||
            !(err.code === 'ERR_INVALID_VALUE')
          ) {
            throw Error('Cert did not throw the correct error');
          }
        }
        if (certified) {
          throw Error('Cert did not throw an error when expected');
        }
      });
      it('Throws the correct error if a value is strictly equal to any of itself and a list of values', () => {
        const list = [
          true,
          false,
          undefined,
          null,
          0,
          'foo',
          Symbol.match,
          {},
          Object
        ];
        let certified = false;
        try {
          cert(0).isNot(...list);
          certified = true;
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_VALUE]: Value is invalid' ||
            !(err instanceof ValueAssertionError) ||
            !(err.code === 'ERR_INVALID_VALUE')
          ) {
            throw Error('Cert did not throw the correct error');
          }
        }
        if (certified) {
          throw Error('Cert did not throw an error when expected');
        }
      });
    });
  });
});

describe('Type Checking', () => {
  describe('Matches', () => {
    describe('Primitives', () => {
      it('Certifies that a boolean is of type boolean', () => {
        cert(true).isType('boolean');
        cert(false).isType('boolean');
      });
      it('Certifies that a boolean has type of any of a provided list of types', () => {
        cert(true).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        );
        cert(false).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        );
      });
      it('Certifies that a boolean has type of any of a provided list of types and constructors', () => {
        cert(true).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array,
          Map,
          Set
        );
        cert(false).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array,
          Map,
          Set
        );
      });
      it('Certifies that undefined is of type undefined', () => {
        cert(undefined).isType('undefined');
      });
      it('Certifies that undefined has type of any of a provided list of types', () => {
        cert(undefined).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        );
      });
      it('Certifies that undefined has type of any of a provided list of types and constructors', () => {
        cert(undefined).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array,
          Map,
          Set
        );
      });
      it('Certifies that a number is of type number', () => {
        cert(42).isType('number');
      });
      it('Certifies that a number has type of any of a provided list of types', () => {
        cert(42).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        );
      });
      it('Certifies that a number has type of any of a provided list of types and constructors', () => {
        cert(42).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array,
          Map,
          Set
        );
      });
      it('Certifies that a string is of type string', () => {
        cert('foo').isType('string');
      });
      it('Certifies that a string has type of any of a provided list of types', () => {
        cert('foo').isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        );
      });
      it('Certifies that a string has type of any of a provided list of types and constructors', () => {
        cert('foo').isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array,
          Map,
          Set
        );
      });
      it('Certifies that a symbol is of type symbol', () => {
        cert(Symbol.match).isType('symbol');
      });
      it('Certifies that a symbol has type of any of a provided list of types', () => {
        cert(Symbol.match).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        );
      });
      it('Certifies that a symbol has type of any of a provided list of types and constructors', () => {
        cert(Symbol.match).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array,
          Map,
          Set
        );
      });
      it('Certifies that null is of type object', () => {
        cert(null).isType('object');
      });
      it('Certifies that null has type of any of a provided list of types', () => {
        cert(null).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        );
      });
      it('Certifies that null has type of any of a provided list of types and constructors', () => {
        cert(null).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array,
          Map,
          Set
        );
      });
    });
    describe('Objects', () => {
      it('Certifies that an object is of type object', () => {
        cert({}).isType('object');
      });
      it('Certifies that an object is constructed with Object', () => {
        cert({}).isType(Object);
      });
      it('Certifies that special objects are constructed by their constructor', () => {
        cert([]).isType(Array);
        cert(new Map()).isType(Map);
        cert(new Set()).isType(Set);
        /* tslint:disable */
        cert(() => {}).isType(Function);
        /* tslint:enable */
      });
      it('Certifies that special objects inherit from Object.prototype', () => {
        cert([]).isType(Object);
        cert(new Map()).isType(Object);
        cert(new Set()).isType(Object);
        /* tslint:disable */
        cert(() => {}).isType(Object);
        /* tslint:enable */
      });
      it('Certifies that an object has type of any of the provided list of types', () => {
        cert({}).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        );
      });
      it('Certifies that an object has type of any of the provided list of types and constructors', () => {
        cert({}).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array,
          Map,
          Set
        );
      });
      it('Certifies that an object was created using a custom constructor', () => {
        /* tslint:disable */
        class TestConstructor {}
        /* tslint:enable */
        const test = new TestConstructor();
        cert(test).isType(TestConstructor);
      });
    });
  });
  describe('Exclusions', () => {
    describe('Primitives', () => {
      it('Certifies that a boolean is not another type', () => {
        cert(true).isNotType('number');
        cert(false).isNotType('string');
      });
      it('Certifies that a boolean has type of none of a provided list of types', () => {
        cert(true).isNotType(
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        );
        cert(false).isNotType(
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        );
      });
      it('Certifies that a boolean has type of none of a provided list of types and constructors', () => {
        cert(true).isNotType(
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array,
          Map,
          Set
        );
        cert(false).isNotType(
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array,
          Map,
          Set
        );
      });
      it('Certifies that undefined is not another type', () => {
        cert(undefined).isNotType('string');
      });
      it('Certifies that undefined has type of none of a provided list of types', () => {
        cert(undefined).isNotType(
          'boolean',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        );
      });
      it('Certifies that undefined has type of none of a provided list of types and constructors', () => {
        cert(undefined).isNotType(
          'boolean',
          'number',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array,
          Map,
          Set
        );
      });
      it('Certifies that a number not another type', () => {
        cert(42).isNotType('string');
      });
      it('Certifies that a number has type of none of a provided list of types', () => {
        cert(42).isNotType(
          'boolean',
          'undefined',
          'string',
          'symbol',
          'object',
          'function'
        );
      });
      it('Certifies that a number has type of none of a provided list of types and constructors', () => {
        cert(42).isNotType(
          'boolean',
          'undefined',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array,
          Map,
          Set
        );
      });
      it('Certifies that a string is not another type', () => {
        cert('foo').isNotType('number');
      });
      it('Certifies that a string has type of none of a provided list of types', () => {
        cert('foo').isNotType(
          'boolean',
          'undefined',
          'number',
          'symbol',
          'object',
          'function'
        );
      });
      it('Certifies that a string has type of none of a provided list of types and constructors', () => {
        cert('foo').isNotType(
          'boolean',
          'undefined',
          'number',
          'symbol',
          'object',
          'function',
          Object,
          Array,
          Map,
          Set
        );
      });
      it('Certifies that a symbol is not another type', () => {
        cert(Symbol.match).isNotType('number');
      });
      it('Certifies that a symbol has type of none of a provided list of types', () => {
        cert(Symbol.match).isNotType(
          'boolean',
          'undefined',
          'number',
          'string',
          'object',
          'function'
        );
      });
      it('Certifies that a symbol has type of none of a provided list of types and constructors', () => {
        cert(Symbol.match).isNotType(
          'boolean',
          'undefined',
          'number',
          'string',
          'object',
          'function',
          Object,
          Array,
          Map,
          Set
        );
      });
      it('Certifies that null is not another type', () => {
        cert(null).isNotType('number');
      });
      it('Certifies that null has type of none of a provided list of types', () => {
        cert(null).isNotType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'function'
        );
      });
      it('Certifies that null has type of none of a provided list of types and constructors', () => {
        cert(null).isNotType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'function',
          Object,
          Array,
          Map,
          Set
        );
      });
    });
    describe('Objects', () => {
      it('Certifies that an object is not another type', () => {
        cert({}).isNotType('number');
      });
      it('Certifies that an object is not constructed with another function', () => {
        cert({}).isNotType(Array);
      });
      it('Certifies that special objects are not constructed by other constructors', () => {
        cert([]).isNotType(Map);
        cert(new Map()).isNotType(Set);
        cert(new Set()).isNotType(WeakMap);
        /* tslint:disable */
        cert(() => {}).isNotType(WeakSet);
        /* tslint:enable */
      });
      it('Certifies that an object has type of none of the provided list of types', () => {
        cert({}).isNotType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'function'
        );
      });
      it('Certifies that an object has type of none of the provided list of types and constructors', () => {
        cert({}).isNotType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'function',
          Array,
          Map,
          Set
        );
      });
      it('Certifies that a custom object was not created with another constructor', () => {
        /* tslint:disable */
        class TestConstructor {}
        class NotTestConstructor {}
        /* tslint:enable */
        const test = new TestConstructor();
        cert(test).isNotType(NotTestConstructor);
      });
    });
  });
  describe('Error Handling', () => {
    describe('Matches', () => {
      it('Throws the correct error if a value type is not strictly equal to another type', () => {
        let certified = false;
        try {
          cert(0).isType('string');
          certified = true;
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_TYPE]: Value is of an invalid type' ||
            !(err instanceof TypeAssertionError) ||
            !(err.code === 'ERR_INVALID_TYPE')
          ) {
            throw Error('Cert did not throw the correct error');
          }
        }
        if (certified) {
          throw Error('Cert did not throw an error when expected');
        }
      });
      /* tslint:disable */
      it('Throws the correct error if a value type is not strictly equal to any of a list of types and constructors', () => {
        /* tslint:enable */
        const list = [
          'boolean',
          'undefined',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array
        ];
        let certified = false;
        try {
          cert(0).isType(...list);
          certified = true;
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_TYPE]: Value is of an invalid type' ||
            !(err instanceof TypeAssertionError) ||
            !(err.code === 'ERR_INVALID_TYPE')
          ) {
            throw Error('Cert did not throw the correct error');
          }
        }
        if (certified) {
          throw Error('Cert did not throw an error when expected');
        }
      });
      it('Throws the correct error if a custom constructor type is not strictly equal to another custom constructor type', () => {
        let certified = false;
        /* tslint:disable */
        class TestConstructor {}
        class NotTestConstructor {}
        /* tslint:enable */
        const test = new TestConstructor();
        try {
          cert(test).isType(NotTestConstructor);
          certified = true;
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_TYPE]: Value is of an invalid type' ||
            !(err instanceof TypeAssertionError) ||
            !(err.code === 'ERR_INVALID_TYPE')
          ) {
            throw Error('Cert did not throw the correct error');
          }
        }
        if (certified) {
          throw Error('Cert did not throw an error when expected');
        }
      });
    });
    describe('Not Equal', () => {
      it('Throws the correct error if a value type is strictly equal to its own type', () => {
        let certified = false;
        try {
          cert(0).isNotType('number');
          certified = true;
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_TYPE]: Value is of an invalid type' ||
            !(err instanceof TypeAssertionError) ||
            !(err.code === 'ERR_INVALID_TYPE')
          ) {
            throw Error('Cert did not throw the correct error');
          }
        }
        if (certified) {
          throw Error('Cert did not throw an error when expected');
        }
      });
      it('Throws the correct error if a value type is strictly equal to any of its own type and a list of types and constructors', () => {
        const list = [
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array
        ];
        let certified = false;
        try {
          cert(0).isNotType(...list);
          certified = true;
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_TYPE]: Value is of an invalid type' ||
            !(err instanceof TypeAssertionError) ||
            !(err.code === 'ERR_INVALID_TYPE')
          ) {
            throw Error('Cert did not throw the correct error');
          }
        }
        if (certified) {
          throw Error('Cert did not throw an error when expected');
        }
      });
      it('Throws the correct error if a custom constructor type is strictly equal to its own type', () => {
        let certified = false;
        /* tslint:disable */
        class TestConstructor {}
        /* tslint:enable */
        const test = new TestConstructor();
        try {
          cert(test).isNotType(TestConstructor);
          certified = true;
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_TYPE]: Value is of an invalid type' ||
            !(err instanceof TypeAssertionError) ||
            !(err.code === 'ERR_INVALID_TYPE')
          ) {
            throw Error('Cert did not throw the correct error');
          }
        }
        if (certified) {
          throw Error('Cert did not throw an error when expected');
        }
      });
    });
  });
});

describe('Range Checking', () => {
  describe('Greater Than', () => {
    it('Certifies that a number is greater than another', () => {
      cert(42).isGT(12);
      cert(22).isGT(12);
    });
  });
  describe('Greater Than or Equal', () => {
    it('Certifies that a number is greater than or equal to another', () => {
      cert(42).isGTE(12);
      cert(22).isGTE(12);
      cert(12).isGTE(12);
    });
  });
  describe('Less Than', () => {
    it('Certifies that a number is less than another', () => {
      cert(12).isLT(42);
      cert(22).isLT(42);
    });
  });
  describe('Less Than or Equal', () => {
    it('Certifies that a number is less than or equal to another', () => {
      cert(12).isLTE(42);
      cert(22).isLTE(42);
      cert(42).isLTE(42);
    });
  });
  describe('Error Handling', () => {
    describe('Greater Than', () => {
      it('Throws the correct error if a value is not greater than another', () => {
        let certified = false;
        try {
          cert(0).isGT(1);
          certified = true;
        } catch (err) {
          if (
            err.message !==
              '[ERR_INVALID_RANGE]: Value is of a prohibited range' ||
            !(err instanceof RangeAssertionError) ||
            !(err.code === 'ERR_INVALID_RANGE')
          ) {
            throw Error('Cert did not throw the correct error');
          }
        }
        if (certified) {
          throw Error('Cert did not throw an error when expected');
        }
      });
    });
    describe('Less Than', () => {
      it('Throws the correct error if a value is not less than another', () => {
        let certified = false;
        try {
          cert(1).isLT(0);
          certified = true;
        } catch (err) {
          if (
            err.message !==
              '[ERR_INVALID_RANGE]: Value is of a prohibited range' ||
            !(err instanceof RangeAssertionError) ||
            !(err.code === 'ERR_INVALID_RANGE')
          ) {
            throw Error('Cert did not throw the correct error');
          }
        }
        if (certified) {
          throw Error('Cert did not throw an error when expected');
        }
      });
    });
    describe('Greater Than or Equal', () => {
      it('Throws the correct error if a value is not greater than or equal to another', () => {
        let certified = false;
        try {
          cert(0).isGTE(1);
          certified = true;
        } catch (err) {
          if (
            err.message !==
              '[ERR_INVALID_RANGE]: Value is of a prohibited range' ||
            !(err instanceof RangeAssertionError) ||
            !(err.code === 'ERR_INVALID_RANGE')
          ) {
            throw Error('Cert did not throw the correct error');
          }
        }
        if (certified) {
          throw Error('Cert did not throw an error when expected');
        }
      });
    });
    describe('Less Than or Equal', () => {
      it('Throws the correct error if a value is not less than or equal to another', () => {
        let certified = false;
        try {
          cert(1).isLTE(0);
          certified = true;
        } catch (err) {
          if (
            err.message !==
              '[ERR_INVALID_RANGE]: Value is of a prohibited range' ||
            !(err instanceof RangeAssertionError) ||
            !(err.code === 'ERR_INVALID_RANGE')
          ) {
            throw Error('Cert did not throw the correct error');
          }
        }
        if (certified) {
          throw Error('Cert did not throw an error when expected');
        }
      });
    });
  });
});

describe('Argument Error Checking', () => {
  it('Throws an error if an invalid type is supplied to checkTypes', () => {
    let certified = false;
    try {
      // @ts-ignore
      cert(15).isType({});
      certified = true;
    } catch (err) {
      if (
        err.message !==
          '[ERR_INVALID_ARG_TYPE]: "validTypes[0]" has an invalid type' ||
        !(err instanceof TypeArgumentError) ||
        !(err.code === 'ERR_INVALID_ARG_TYPE')
      ) {
        throw Error('Cert did not throw the correct error');
      }
    }
    if (certified) {
      throw Error('Cert did not throw an error when expected');
    }
  });
  it('Throws an error if a non-number range is supplied to checkRanges', () => {
    let certified = false;
    try {
      // @ts-ignore
      cert(15).isGT('foo');
      certified = true;
    } catch (err) {
      if (
        err.message !== '[ERR_INVALID_ARG_TYPE]: "lower" has an invalid type' ||
        !(err instanceof TypeArgumentError) ||
        !(err.code === 'ERR_INVALID_ARG_TYPE')
      ) {
        throw Error('Cert did not throw the correct error');
      }
    }
    if (certified) {
      throw Error('Cert did not throw an error when expected');
    }
  });
  it('Throws an error if a non-number value is supplied to checkRanges', () => {
    let certified = false;
    try {
      cert('foo').isGT(12);
      certified = true;
    } catch (err) {
      if (
        err.message !==
          '[ERR_INVALID_ARG_TYPE]: "values[0]" has an invalid type' ||
        !(err instanceof TypeArgumentError) ||
        !(err.code === 'ERR_INVALID_ARG_TYPE')
      ) {
        throw Error('Cert did not throw the correct error');
      }
    }
    if (certified) {
      throw Error('Cert did not throw an error when expected');
    }
  });
});

describe('Error Class Property Checking', () => {
  describe('ValueArgumentError', () => {
    it('Contains the correct name', () => {
      const e = new ValueArgumentError('foo');
      if (e.name !== 'Error') {
        throw Error('ValueArgumentError does not have the correct name');
      }
    });
    it('Contains the correct message', () => {
      const e = new ValueArgumentError('foo');
      if (e.message !== '[ERR_INVALID_ARG_VALUE]: "foo" has an invalid value') {
        throw Error('ValueArgumentError does not have the correct message');
      }
    });
    it('Contains the correct code', () => {
      const e = new ValueArgumentError('foo');
      if (e.code !== 'ERR_INVALID_ARG_VALUE') {
        throw Error('ValueArgumentError does not have the correct code');
      }
    });
    it('Contains the correct valid', () => {
      const e = new ValueArgumentError('foo', 'bar');
      if (e.valid[0] !== 'bar') {
        throw Error('ValueArgumentError does not have the correct valid');
      }
    });
    it('Inherits the correct prototype', () => {
      const e = new ValueArgumentError('foo');
      if (!(e instanceof Error)) {
        throw Error(
          'ValueArgumentError does not inherit the correct prototype'
        );
      }
    });
  });
  describe('TypeArgumentError', () => {
    it('Contains the correct name', () => {
      const e = new TypeArgumentError('foo');
      if (e.name !== 'TypeError') {
        throw Error('TypeArgumentError does not have the correct name');
      }
    });
    it('Contains the correct message', () => {
      const e = new TypeArgumentError('foo');
      if (e.message !== '[ERR_INVALID_ARG_TYPE]: "foo" has an invalid type') {
        throw Error('TypeArgumentError does not have the correct message');
      }
    });
    it('Contains the correct code', () => {
      const e = new TypeArgumentError('foo');
      if (e.code !== 'ERR_INVALID_ARG_TYPE') {
        throw Error('TypeArgumentError does not have the correct code');
      }
    });
    it('Contains the correct validTypes', () => {
      const e = new TypeArgumentError('foo', 'string');
      if (e.validTypes !== undefined && e.validTypes[0] !== 'string') {
        throw Error('TypeArgumentError does not have the correct validTypes');
      }
    });
    it('Inherits the correct prototype', () => {
      const e = new TypeArgumentError('foo');
      if (!(e instanceof TypeError)) {
        throw Error('TypeArgumentError does not inherit the correct prototype');
      }
    });
  });
  describe('ValueAssertionError', () => {
    it('Contains the correct name', () => {
      const e = new ValueAssertionError();
      if (e.name !== 'Error') {
        throw Error('ValueAssertionError does not have the correct name');
      }
    });
    it('Contains the correct message', () => {
      const e = new ValueAssertionError();
      if (e.message !== '[ERR_INVALID_VALUE]: Value is invalid') {
        throw Error('ValueAssertionError does not have the correct message');
      }
    });
    it('Contains the correct code', () => {
      const e = new ValueAssertionError();
      if (e.code !== 'ERR_INVALID_VALUE') {
        throw Error('ValueAssertionError does not have the correct code');
      }
    });
    it('Inherits the correct prototype', () => {
      const e = new ValueAssertionError();
      if (!(e instanceof Error)) {
        throw Error(
          'ValueAssertionError does not inherit the correct prototype'
        );
      }
    });
    it('Supports custom messages', () => {
      const e = new ValueAssertionError('this is a custom message');
      if (e.message !== '[ERR_INVALID_VALUE]: this is a custom message') {
        throw Error('ValueAssertionError does not support custom messages');
      }
    });
  });
  describe('TypeAssertionError', () => {
    it('Contains the correct name', () => {
      const e = new TypeAssertionError();
      if (e.name !== 'TypeError') {
        throw Error('TypeAssertionError does not have the correct name');
      }
    });
    it('Contains the correct message', () => {
      const e = new TypeAssertionError();
      if (e.message !== '[ERR_INVALID_TYPE]: Value is of an invalid type') {
        throw Error('TypeAssertionError does not have the correct message');
      }
    });
    it('Contains the correct code', () => {
      const e = new TypeAssertionError();
      if (e.code !== 'ERR_INVALID_TYPE') {
        throw Error('TypeAssertionError does not have the correct code');
      }
    });
    it('Inherits the correct prototype', () => {
      const e = new TypeAssertionError();
      if (!(e instanceof TypeError)) {
        throw Error(
          'TypeAssertionError does not inherit the correct prototype'
        );
      }
    });
    it('Supports custom messages', () => {
      const e = new TypeAssertionError('this is a custom message');
      if (e.message !== '[ERR_INVALID_TYPE]: this is a custom message') {
        throw Error('TypeAssertionError does not support custom messages');
      }
    });
  });
  describe('RangeAssertionError', () => {
    it('Contains the correct name', () => {
      const e = new RangeAssertionError();
      if (e.name !== 'RangeError') {
        throw Error('RangeAssertionError does not have the correct name');
      }
    });
    it('Contains the correct message', () => {
      const e = new RangeAssertionError();
      if (e.message !== '[ERR_INVALID_RANGE]: Value is of a prohibited range') {
        throw Error('RangeAssertionError does not have the correct message');
      }
    });
    it('Contains the correct code', () => {
      const e = new RangeAssertionError();
      if (e.code !== 'ERR_INVALID_RANGE') {
        throw Error('RangeAssertionError does not have the correct code');
      }
    });
    it('Inherits the correct prototype', () => {
      const e = new RangeAssertionError();
      if (!(e instanceof RangeError)) {
        throw Error(
          'RangeAssertionError does not inherit the correct prototype'
        );
      }
    });
    it('Supports custom messages', () => {
      const e = new RangeAssertionError('this is a custom message');
      if (e.message !== '[ERR_INVALID_RANGE]: this is a custom message') {
        throw Error('RangeAssertionError does not support custom messages');
      }
    });
  });
});

describe('Checker Checking', () => {
  it('Has the correct instance method names', () => {
    const certMethods = Object.keys(cert('foo'));
    const checkMethods = Object.keys(check('foo'));
    for (const m of checkMethods) {
      if (!certMethods.includes(m) && m !== 'message') {
        throw Error('Check/cert method mismatch');
      }
    }
    for (const m of certMethods) {
      if (!checkMethods.includes(m) && m !== 'message') {
        throw Error('Check/cert method mismatch');
      }
    }
  });
  it('Returns true values', () => {
    if (
      !(
        check('foo').is('foo') ||
        check(12).isType('number') ||
        check('foo').isNot('bar') ||
        check({}).isNotType('string') ||
        check(42).isGT(12)
      )
    ) {
      throw Error('Check returned an unexpected false value');
    }
  });
  it('Does not error on failures', () => {
    try {
      if (
        check('foo').is('bar') ||
        check(12).isType('string') ||
        check('foo').isNot('foo') ||
        check({}).isNotType('object') ||
        check(42).isGT(42)
      ) {
        throw Error('Check returned an unexpected true value');
      }
    } catch (err) {
      if (err.message !== 'Check returned an unexpected true value') {
        const e = new UnexpectedErrorError('Unexpected error from check');
        e.err = err;
        throw e;
      } else {
        throw err;
      }
    }
  });
  it('Errors on invalid type input', () => {
    try {
      // @ts-ignore
      check('foo').isType({});
      throw Error('Check should have thrown an error');
    } catch (err) {
      if (err.message === 'Check should have thrown an error') {
        throw err;
      }
      if (err.code !== 'ERR_INVALID_ARG_TYPE') {
        const e = new UnexpectedErrorError('Unexpected error from check');
        e.err = err;
        throw e;
      }
    }
  });
  it('Errors on invalid range input', () => {
    try {
      // @ts-ignore
      check('foo').isGT('');
      throw Error('Check should have thrown an error');
    } catch (err) {
      if (err.message === 'Check should have thrown an error') {
        throw err;
      }
      if (err.code !== 'ERR_INVALID_ARG_TYPE') {
        const e = new UnexpectedErrorError('Unexpected error from check');
        e.err = err;
        throw e;
      }
    }
  });
});

describe('Multiple Value Checking', () => {
  describe('Passes', () => {
    it('Certifies multiple values for cert.is', () => {
      cert('foo', 'bar', 'baz').is('foo', 'bar', 'baz', 'beh');
    });
    it('Certifies multiple values for cert.isNot', () => {
      cert('foo', 'bar', 'baz').isNot('qux', 'quz', 'quup');
    });
    it('Certifies multiple values for cert.isType', () => {
      cert('foo', 'bar', 'baz').isType('string', 'number');
    });
    it('Certifies multiple values for cert.isNotType', () => {
      cert('foo', 'bar', 'baz').isNotType('boolean', Object);
    });
    it('Certifies multiple values for cert.isGT', () => {
      cert(12, 22, 32).isGT(2);
    });
    it('Certifies multiple values for cert.isGTE', () => {
      cert(12, 22, 32).isGTE(12);
    });
    it('Certifies multiple values for cert.isLT', () => {
      cert(12, 22, 32).isLT(42);
    });
    it('Certifies multiple values for cert.isLTE', () => {
      cert(12, 22, 32).isLTE(32);
    });
  });
  describe('Failures', () => {
    it('Errors multiple values for cert.is', () => {
      try {
        cert('foo', 'bar', 'baz').is('food', 'bard', 'bazy', 'behd');
      } catch (err) {
        if (err.code !== 'ERR_INVALID_VALUE') {
          const e = new UnexpectedErrorError(
            'Cert did not throw the correct error'
          );
          e.err = err;
          throw e;
        }
      }
    });
    it('Errors multiple values for cert.isNot', () => {
      try {
        cert('foo', 'bar', 'baz').isNot('qux', 'quz', 'quup', 'foo');
      } catch (err) {
        if (err.code !== 'ERR_INVALID_VALUE') {
          const e = new UnexpectedErrorError(
            'Cert did not throw the correct error'
          );
          e.err = err;
          throw e;
        }
      }
    });
    it('Errors multiple values for cert.isType', () => {
      try {
        cert('foo', 'bar', 'baz').isType('number', Object);
      } catch (err) {
        if (err.code !== 'ERR_INVALID_TYPE') {
          const e = new UnexpectedErrorError(
            'Cert did not throw the correct error'
          );
          e.err = err;
          throw e;
        }
      }
    });
    it('Errors multiple values for cert.isNotType', () => {
      try {
        cert('foo', 'bar', 'baz').isNotType('boolean', Object, 'string');
      } catch (err) {
        if (err.code !== 'ERR_INVALID_TYPE') {
          const e = new UnexpectedErrorError(
            'Cert did not throw the correct error'
          );
          e.err = err;
          throw e;
        }
      }
    });
    it('Errors multiple values for cert.isGT', () => {
      try {
        cert(12, 22, 32).isGT(42);
      } catch (err) {
        if (err.code !== 'ERR_INVALID_RANGE') {
          const e = new UnexpectedErrorError(
            'Cert did not throw the correct error'
          );
          e.err = err;
          throw e;
        }
      }
    });
    it('Errors multiple values for cert.isGTE', () => {
      try {
        cert(12, 22, 32).isGTE(42);
      } catch (err) {
        if (err.code !== 'ERR_INVALID_RANGE') {
          const e = new UnexpectedErrorError(
            'Cert did not throw the correct error'
          );
          e.err = err;
          throw e;
        }
      }
    });
    it('Errors multiple values for cert.isLT', () => {
      try {
        cert(12, 22, 32).isLT(12);
      } catch (err) {
        if (err.code !== 'ERR_INVALID_RANGE') {
          const e = new UnexpectedErrorError(
            'Cert did not throw the correct error'
          );
          e.err = err;
          throw e;
        }
      }
    });
    it('Errors multiple values for cert.isLTE', () => {
      try {
        cert(12, 22, 32).isLTE(2);
      } catch (err) {
        if (err.code !== 'ERR_INVALID_RANGE') {
          const e = new UnexpectedErrorError(
            'Cert did not throw the correct error'
          );
          e.err = err;
          throw e;
        }
      }
    });
  });
});

describe('Instance Return Checking', () => {
  describe('Certifier Returns Instance', () => {
    const instance = cert(0);
    Object.freeze(instance);
    it('Returns instance for cert.is', () => {
      cert(instance).is(instance.is(0));
    });
    it('Returns instance for cert.isNot', () => {
      cert(instance).is(instance.isNot(1));
    });
    it('Returns instance for cert.isType', () => {
      cert(instance).is(instance.isType('number'));
    });
    it('Returns instance for cert.isNotType', () => {
      cert(instance).is(instance.isNotType('string'));
    });
    it('Returns instance for cert.isGT', () => {
      cert(instance).is(instance.isGT(-1));
    });
    it('Returns instance for cert.isGTE', () => {
      cert(instance).is(instance.isGTE(0));
    });
    it('Returns instance for cert.isLT', () => {
      cert(instance).is(instance.isLT(1));
    });
    it('Returns instance for cert.isLTE', () => {
      cert(instance).is(instance.isLTE(0));
    });
  });

  describe('Checker Returns Instance', () => {
    const instance = check(0);
    Object.freeze(instance);
    it('Returns instance for cert.check().is', () => {
      cert(instance).is(instance.is(0));
    });
    it('Returns instance for cert.check().isNot', () => {
      cert(instance).is(instance.isNot(1));
    });
    it('Returns instance for cert.check().isType', () => {
      cert(instance).is(instance.isType('number'));
    });
    it('Returns instance for cert.check().isNotType', () => {
      cert(instance).is(instance.isNotType('string'));
    });
    it('Returns instance for cert.check().isGT', () => {
      cert(instance).is(instance.isGT(-1));
    });
    it('Returns instance for cert.check().isGTE', () => {
      cert(instance).is(instance.isGTE(0));
    });
    it('Returns instance for cert.check().isLT', () => {
      cert(instance).is(instance.isLT(1));
    });
    it('Returns instance for cert.check().isLTE', () => {
      cert(instance).is(instance.isLTE(0));
    });
  });
});

describe('Custom Message Loading', () => {
  it('Should throw loaded custom messages when value checking', () => {
    try {
      cert(123).message('this is a custom message').is('not 123');
    } catch (e) {
      if (e.message !== '[ERR_INVALID_VALUE]: this is a custom message') {
        throw Error(
          'Cert could not throw a custom message when value checking'
        );
      }
    }
  });
  it('Should throw loaded custom messages when type checking', () => {
    try {
      cert(123).message('this is a custom message').isType('number');
    } catch (e) {
      if (e.message !== '[ERR_INVALID_TYPE]: this is a custom message') {
        throw Error(
          'Cert could not throw a custom message when value checking'
        );
      }
    }
  });
  it('Should throw loaded custom messages when range checking', () => {
    try {
      cert(123).message('this is a custom message').isLT(23);
    } catch (e) {
      if (e.message !== '[ERR_INVALID_RANGE]: this is a custom message') {
        throw Error(
          'Cert could not throw a custom message when value checking'
        );
      }
    }
  });
});
