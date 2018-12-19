/**
 * @private
 * @author Justin Collier <jpcxme@gmail.com>
 * @license MIT
 * @see {@link http://github.com/jpcx/cert-is|GitHub}
 */

const cert = require('./')

/* global describe it */

describe('Equality Checking', () => {
  describe('Equal', () => {
    describe('Primitives', () => {
      it('Certifies that a boolean is equal to itself', () => {
        cert(false).is(false)
        cert(true).is(true)
      })
      it('Certifies that a boolean is equal to any of (both) booleans', () => {
        cert(false).is(true, false)
        cert(true).is(true, false)
        cert(true).is(true, false)
      })
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
        )
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
        )
      })
      it('Certifies that undefined is equal to itself', () => {
        cert(undefined).is(undefined)
      })
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
        )
      })
      it('Certifies that a number is equal to itself', () => {
        cert(42).is(42)
      })
      it('Certifies that a number is equal to any one of itself and other numbers', () => {
        cert(42).is(12, 22, 32, 42)
        cert(12).is(12, 22, 32, 42)
      })
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
        )
      })
      it('Certifies that a string is equal to itself', () => {
        cert('foo').is('foo')
      })
      it('Certifies that a string is equal to any one of itself and other strings', () => {
        cert('foo').is('foo', 'bar', 'baz')
        cert('bar').is('foo', 'bar', 'baz')
      })
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
        )
      })
      it('Certifies that a symbol is equal to itself', () => {
        cert(Symbol.match).is(Symbol.match)
      })
      it('Certifies that a symbol is equal to any one of itself and other symbols', () => {
        cert(Symbol.match).is(Symbol.match, Symbol.search, Symbol.replace)
        cert(Symbol.search).is(Symbol.match, Symbol.search, Symbol.replace)
      })
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
        )
      })
      it('Certifies that null is equal to itself', () => {
        cert(null).is(null)
      })
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
        )
      })
    })
    describe('Objects', () => {
      it('Certifies that an object is equal to itself', () => {
        const obj = {}
        cert(obj).is(obj)
      })
      it('Certifies that an object is equal to itself and other objects', () => {
        const objA = {}
        const objB = { foo: 'bar' }
        cert(objA).is(objA, objB)
        cert(objB).is(objA, objB)
      })
      it('Certifies that an object is equal to itself and other values', () => {
        const obj = {}
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
        )
      })
    })
  })
  describe('Not Equal', () => {
    describe('Primitives', () => {
      it('Certifies that a boolean is not equal to another boolean', () => {
        cert(true).isNot(false)
        cert(false).isNot(true)
      })
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
        )
        cert(false).isNot(
          true,
          undefined,
          null,
          42,
          'foo',
          Symbol.match,
          {},
          Object
        )
      })
      it('Certifies that undefined is not equal to null', () => {
        cert(undefined).isNot(null)
      })
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
        )
      })
      it('Certifies that a number is not equal to another number', () => {
        cert(42).isNot(12)
      })
      it('Certifies that a number is not equal to any of a list of other numbers', () => {
        cert(42).isNot(12, 22, 32)
      })
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
        )
      })
      it('Certifies that a string is not equal to another string', () => {
        cert('foo').isNot('bar')
      })
      it('Certifies that a string is not equal to any of a list of other strings', () => {
        cert('foo').isNot('bar', 'baz')
      })
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
        )
      })
      it('Certifies that a symbol is not equal to another symbol', () => {
        cert(Symbol.match).isNot(Symbol.search)
        cert(Symbol.search).isNot(Symbol.match)
      })
      it('Certifies that a symbol is not equal to any of a list of other symbols', () => {
        cert(Symbol.match).isNot(Symbol.search, Symbol.replace)
        cert(Symbol.search).isNot(Symbol.match, Symbol.replace)
      })
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
        )
      })
      it('Certifies that null is not equal to undefined', () => {
        cert(null).isNot(undefined)
      })
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
        )
      })
    })
    describe('Objects', () => {
      it('Certifies that an object is not equal to another object', () => {
        cert({}).isNot({ foo: 'bar' })
      })
      it('Certifies that an object is not equal to any of a list of other objects', () => {
        cert({}).isNot({ foo: 'bar' }, { baz: 'beh' }, { qux: 'quz' })
      })
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
        )
      })
    })
  })
  describe('Error Handling', () => {
    describe('Equal', () => {
      it('Throws the correct error if a value is not strictly equal to another value', () => {
        try {
          cert(0).is('0')
          throw Error('Cert did not throw an error when expected')
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_VALUE]: Value is invalid' ||
            !(err instanceof cert.CertValueError) ||
            !(err.code === 'ERR_INVALID_VALUE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
      })
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
        ]
        let certified = false
        try {
          cert(0).is(...list)
          certified = true
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_VALUE]: Value is invalid' ||
            !(err instanceof cert.CertValueError) ||
            !(err.code === 'ERR_INVALID_VALUE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
    })
    describe('Not Equal', () => {
      it('Throws the correct error if a value is strictly equal to itself', () => {
        let certified = false
        try {
          cert(0).isNot(0)
          certified = true
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_VALUE]: Value is invalid' ||
            !(err instanceof cert.CertValueError) ||
            !(err.code === 'ERR_INVALID_VALUE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
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
        ]
        let certified = false
        try {
          cert(0).isNot(...list)
          certified = true
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_VALUE]: Value is invalid' ||
            !(err instanceof cert.CertValueError) ||
            !(err.code === 'ERR_INVALID_VALUE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
    })
  })
})

describe('Type Checking', () => {
  describe('Matches', () => {
    describe('Primitives', () => {
      it('Certifies that a boolean is of type boolean', () => {
        cert(true).isType('boolean')
        cert(false).isType('boolean')
      })
      it('Certifies that a boolean has type of any of a provided list of types', () => {
        cert(true).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        )
        cert(false).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        )
      })
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
        )
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
        )
      })
      it('Certifies that undefined is of type undefined', () => {
        cert(undefined).isType('undefined')
      })
      it('Certifies that undefined has type of any of a provided list of types', () => {
        cert(undefined).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        )
      })
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
        )
      })
      it('Certifies that a number is of type number', () => {
        cert(42).isType('number')
      })
      it('Certifies that a number has type of any of a provided list of types', () => {
        cert(42).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        )
      })
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
        )
      })
      it('Certifies that a string is of type string', () => {
        cert('foo').isType('string')
      })
      it('Certifies that a string has type of any of a provided list of types', () => {
        cert('foo').isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        )
      })
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
        )
      })
      it('Certifies that a symbol is of type symbol', () => {
        cert(Symbol.match).isType('symbol')
      })
      it('Certifies that a symbol has type of any of a provided list of types', () => {
        cert(Symbol.match).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        )
      })
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
        )
      })
      it('Certifies that null is of type object', () => {
        cert(null).isType('object')
      })
      it('Certifies that null has type of any of a provided list of types', () => {
        cert(null).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        )
      })
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
        )
      })
    })
    describe('Objects', () => {
      it('Certifies that an object is of type object', () => {
        cert({}).isType('object')
      })
      it('Certifies that an object is constructed with Object', () => {
        cert({}).isType(Object)
      })
      it('Certifies that special objects are constructed by their constructor', () => {
        cert([]).isType(Array)
        cert(new Map()).isType(Map)
        cert(new Set()).isType(Set)
        cert(() => {}).isType(Function)
      })
      it('Certifies that special objects inherit from Object.prototype', () => {
        cert([]).isType(Object)
        cert(new Map()).isType(Object)
        cert(new Set()).isType(Object)
        cert(() => {}).isType(Object)
      })
      it('Certifies that an object has type of any of the provided list of types', () => {
        cert({}).isType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        )
      })
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
        )
      })
      it('Certifies that an object was created using a custom constructor', () => {
        class TestConstructor {}
        const test = new TestConstructor()
        cert(test).isType(TestConstructor)
      })
    })
  })
  describe('Exclusions', () => {
    describe('Primitives', () => {
      it('Certifies that a boolean is not another type', () => {
        cert(true).isNotType('number')
        cert(false).isNotType('string')
      })
      it('Certifies that a boolean has type of none of a provided list of types', () => {
        cert(true).isNotType(
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        )
        cert(false).isNotType(
          'undefined',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        )
      })
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
        )
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
        )
      })
      it('Certifies that undefined is not another type', () => {
        cert(undefined).isNotType('string')
      })
      it('Certifies that undefined has type of none of a provided list of types', () => {
        cert(undefined).isNotType(
          'boolean',
          'number',
          'string',
          'symbol',
          'object',
          'function'
        )
      })
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
        )
      })
      it('Certifies that a number not another type', () => {
        cert(42).isNotType('string')
      })
      it('Certifies that a number has type of none of a provided list of types', () => {
        cert(42).isNotType(
          'boolean',
          'undefined',
          'string',
          'symbol',
          'object',
          'function'
        )
      })
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
        )
      })
      it('Certifies that a string is not another type', () => {
        cert('foo').isNotType('number')
      })
      it('Certifies that a string has type of none of a provided list of types', () => {
        cert('foo').isNotType(
          'boolean',
          'undefined',
          'number',
          'symbol',
          'object',
          'function'
        )
      })
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
        )
      })
      it('Certifies that a symbol is not another type', () => {
        cert(Symbol.match).isNotType('number')
      })
      it('Certifies that a symbol has type of none of a provided list of types', () => {
        cert(Symbol.match).isNotType(
          'boolean',
          'undefined',
          'number',
          'string',
          'object',
          'function'
        )
      })
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
        )
      })
      it('Certifies that null is not another type', () => {
        cert(null).isNotType('number')
      })
      it('Certifies that null has type of none of a provided list of types', () => {
        cert(null).isNotType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'function'
        )
      })
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
        )
      })
    })
    describe('Objects', () => {
      it('Certifies that an object is not another type', () => {
        cert({}).isNotType('number')
      })
      it('Certifies that an object is not constructed with another function', () => {
        cert({}).isNotType(Array)
      })
      it('Certifies that special objects are not constructed by other constructors', () => {
        cert([]).isNotType(Map)
        cert(new Map()).isNotType(Set)
        cert(new Set()).isNotType(WeakMap)
        cert(() => {}).isNotType(WeakSet)
      })
      it('Certifies that an object has type of none of the provided list of types', () => {
        cert({}).isNotType(
          'boolean',
          'undefined',
          'number',
          'string',
          'symbol',
          'function'
        )
      })
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
        )
      })
      it('Certifies that a custom object was not created with another constructor', () => {
        class TestConstructor {}
        class NotTestConstructor {}
        const test = new TestConstructor()
        cert(test).isNotType(NotTestConstructor)
      })
    })
  })
  describe('Error Handling', () => {
    describe('Matches', () => {
      it('Throws the correct error if a value type is not strictly equal to another type', () => {
        let certified = false
        try {
          cert(0).isType('string')
          certified = true
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_TYPE]: Value is of an invalid type' ||
            !(err instanceof cert.CertTypeError) ||
            !(err.code === 'ERR_INVALID_TYPE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
      it('Throws the correct error if a value type is not strictly equal to any of a list of types and constructors', () => {
        const list = [
          'boolean',
          'undefined',
          'string',
          'symbol',
          'object',
          'function',
          Object,
          Array
        ]
        let certified = false
        try {
          cert(0).isType(...list)
          certified = true
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_TYPE]: Value is of an invalid type' ||
            !(err instanceof cert.CertTypeError) ||
            !(err.code === 'ERR_INVALID_TYPE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
      it('Throws the correct error if a custom constructor type is not strictly equal to another custom constructor type', () => {
        let certified = false
        class TestConstructor {}
        class NotTestConstructor {}
        const test = new TestConstructor()
        try {
          cert(test).isType(NotTestConstructor)
          certified = true
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_TYPE]: Value is of an invalid type' ||
            !(err instanceof cert.CertTypeError) ||
            !(err.code === 'ERR_INVALID_TYPE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
    })
    describe('Not Equal', () => {
      it('Throws the correct error if a value type is strictly equal to its own type', () => {
        let certified = false
        try {
          cert(0).isNotType('number')
          certified = true
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_TYPE]: Value is of an invalid type' ||
            !(err instanceof cert.CertTypeError) ||
            !(err.code === 'ERR_INVALID_TYPE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
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
        ]
        let certified = false
        try {
          cert(0).isNotType(...list)
          certified = true
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_TYPE]: Value is of an invalid type' ||
            !(err instanceof cert.CertTypeError) ||
            !(err.code === 'ERR_INVALID_TYPE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
      it('Throws the correct error if a custom constructor type is strictly equal to its own type', () => {
        let certified = false
        class TestConstructor {}
        const test = new TestConstructor()
        try {
          cert(test).isNotType(TestConstructor)
          certified = true
        } catch (err) {
          if (
            err.message !== '[ERR_INVALID_TYPE]: Value is of an invalid type' ||
            !(err instanceof cert.CertTypeError) ||
            !(err.code === 'ERR_INVALID_TYPE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
    })
  })
})

describe('Range Checking', () => {
  describe('Custom Range', () => {
    it('Certifies that a number is within a custom inclusive range', () => {
      cert(42).isRange(32, 52, true, true)
      cert(52).isRange(32, 52, true, true)
    })
    it('Certifies that a number is within a custom exclusive range (lower exclusive)', () => {
      cert(42).isRange(32, 52, false, true)
      cert(52).isRange(32, 52, false, true)
    })
    it('Certifies that a number is within a custom exclusive range (upper exclusive)', () => {
      cert(42).isRange(32, 52, true, false)
      cert(32).isRange(32, 52, true, false)
    })
    it('Certifies that a number is within a custom exclusive range (both exclusive)', () => {
      cert(42).isRange(32, 52, false, false)
    })
  })
  describe('Greater Than', () => {
    it('Certifies that a number is greater than another', () => {
      cert(42).isGT(12)
      cert(22).isGT(12)
    })
  })
  describe('Greater Than or Equal', () => {
    it('Certifies that a number is greater than or equal to another', () => {
      cert(42).isGTE(12)
      cert(22).isGTE(12)
      cert(12).isGTE(12)
    })
  })
  describe('Less Than', () => {
    it('Certifies that a number is less than another', () => {
      cert(12).isLT(42)
      cert(22).isLT(42)
    })
  })
  describe('Less Than or Equal', () => {
    it('Certifies that a number is less than or equal to another', () => {
      cert(12).isLTE(42)
      cert(22).isLTE(42)
      cert(42).isLTE(42)
    })
  })
  describe('Error Handling', () => {
    describe('Custom Range', () => {
      it('Throws the correct error if a value is not within a custom inclusive range', () => {
        let certified = false
        try {
          cert(15).isRange(16, 17, true, true)
          certified = true
        } catch (err) {
          if (
            err.message !==
              '[ERR_INVALID_RANGE]: Value is of a prohibited range' ||
            !(err instanceof cert.CertRangeError) ||
            !(err.code === 'ERR_INVALID_RANGE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
      it('Throws the correct error if a value is not within a custom exclusive range (lower exclusive)', () => {
        let certified = false
        try {
          cert(16).isRange(16, 17, false, true)
          certified = true
        } catch (err) {
          if (
            err.message !==
              '[ERR_INVALID_RANGE]: Value is of a prohibited range' ||
            !(err instanceof cert.CertRangeError) ||
            !(err.code === 'ERR_INVALID_RANGE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
      it('Throws the correct error if a value is not within a custom exclusive range (upper exclusive)', () => {
        let certified = false
        try {
          cert(17).isRange(16, 17, true, false)
          certified = true
        } catch (err) {
          if (
            err.message !==
              '[ERR_INVALID_RANGE]: Value is of a prohibited range' ||
            !(err instanceof cert.CertRangeError) ||
            !(err.code === 'ERR_INVALID_RANGE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
      it('Throws the correct error if a value is not within a custom exclusive range (both exclusive)', () => {
        let certified = false
        try {
          cert(16).isRange(16, 17, false, false)
          certified = true
        } catch (err) {
          if (
            err.message !==
              '[ERR_INVALID_RANGE]: Value is of a prohibited range' ||
            !(err instanceof cert.CertRangeError) ||
            !(err.code === 'ERR_INVALID_RANGE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
      it('Throws the correct error if the lower bound is greater than the lower bound', () => {
        try {
          cert(42).isRange(42, 32, false, false)
        } catch (err) {
          if (
            !(err.name === 'RangeError') ||
            !(
              err.message ===
              '[ERR_INVALID_ARG_RANGE]: "upper" has an invalid range'
            ) ||
            !(err.code === 'ERR_INVALID_ARG_RANGE') ||
            !(err.range === '32 < "upper" <= Infinity') ||
            !(err instanceof cert.ArgRangeError)
          ) {
            throw Error('Invalid error returned by cert.isRange')
          }
        }
      })
      it('Throws the correct error if the lower bound is equal to the exclusive lower bound', () => {
        try {
          cert(42).isRange(32, 32, false, false)
        } catch (err) {
          if (
            !(err.name === 'RangeError') ||
            !(
              err.message ===
              '[ERR_INVALID_ARG_RANGE]: "upper" has an invalid range'
            ) ||
            !(err.code === 'ERR_INVALID_ARG_RANGE') ||
            !(err.range === '32 < "upper" <= Infinity') ||
            !(err instanceof cert.ArgRangeError)
          ) {
            throw Error('Invalid error returned by cert.isRange')
          }
        }
      })
    })
    describe('Greater Than', () => {
      it('Throws the correct error if a value is not greater than another', () => {
        let certified = false
        try {
          cert(0).isGT(1)
          certified = true
        } catch (err) {
          if (
            err.message !==
              '[ERR_INVALID_RANGE]: Value is of a prohibited range' ||
            !(err instanceof cert.CertRangeError) ||
            !(err.code === 'ERR_INVALID_RANGE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
    })
    describe('Less Than', () => {
      it('Throws the correct error if a value is not less than another', () => {
        let certified = false
        try {
          cert(1).isLT(0)
          certified = true
        } catch (err) {
          if (
            err.message !==
              '[ERR_INVALID_RANGE]: Value is of a prohibited range' ||
            !(err instanceof cert.CertRangeError) ||
            !(err.code === 'ERR_INVALID_RANGE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
    })
    describe('Greater Than or Equal', () => {
      it('Throws the correct error if a value is not greater than or equal to another', () => {
        let certified = false
        try {
          cert(0).isGTE(1)
          certified = true
        } catch (err) {
          if (
            err.message !==
              '[ERR_INVALID_RANGE]: Value is of a prohibited range' ||
            !(err instanceof cert.CertRangeError) ||
            !(err.code === 'ERR_INVALID_RANGE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
    })
    describe('Less Than or Equal', () => {
      it('Throws the correct error if a value is not less than or equal to another', () => {
        let certified = false
        try {
          cert(1).isLTE(0)
          certified = true
        } catch (err) {
          if (
            err.message !==
              '[ERR_INVALID_RANGE]: Value is of a prohibited range' ||
            !(err instanceof cert.CertRangeError) ||
            !(err.code === 'ERR_INVALID_RANGE')
          ) {
            throw Error('Cert did not throw the correct error')
          }
        }
        if (certified) throw Error('Cert did not throw an error when expected')
      })
    })
  })
})

describe('Argument Error Checking', () => {
  it('Throws an error if an invalid type is supplied to checkTypes', () => {
    let certified = false
    try {
      cert(15).isType({})
      certified = true
    } catch (err) {
      if (
        err.message !==
          '[ERR_INVALID_ARG_TYPE]: "validTypes[0]" has an invalid type' ||
        !(err instanceof cert.ArgTypeError) ||
        !(err.code === 'ERR_INVALID_ARG_TYPE')
      ) {
        throw Error('Cert did not throw the correct error')
      }
    }
    if (certified) throw Error('Cert did not throw an error when expected')
  })
  it('Throws an error if a non-number range is supplied to checkRanges', () => {
    let certified = false
    try {
      cert(15).isGT('foo')
      certified = true
    } catch (err) {
      if (
        err.message !== '[ERR_INVALID_ARG_TYPE]: "lower" has an invalid type' ||
        !(err instanceof cert.ArgTypeError) ||
        !(err.code === 'ERR_INVALID_ARG_TYPE')
      ) {
        throw Error('Cert did not throw the correct error')
      }
    }
    if (certified) throw Error('Cert did not throw an error when expected')
  })
  it('Throws an error if a non-number value is supplied to checkRanges', () => {
    let certified = false
    try {
      cert('foo').isGT(12)
      certified = true
    } catch (err) {
      if (
        err.message !==
          '[ERR_INVALID_ARG_TYPE]: "values[0]" has an invalid type' ||
        !(err instanceof cert.ArgTypeError) ||
        !(err.code === 'ERR_INVALID_ARG_TYPE')
      ) {
        throw Error('Cert did not throw the correct error')
      }
    }
    if (certified) throw Error('Cert did not throw an error when expected')
  })
})

describe('Error Class Property Checking', () => {
  describe('ArgValueError', () => {
    it('Contains the correct name', () => {
      const e = new cert.ArgValueError('foo')
      if (e.name !== 'Error') throw Error('[] does not have the correct name')
    })
    it('Contains the correct message', () => {
      const e = new cert.ArgValueError('foo')
      if (e.message !== '[ERR_INVALID_ARG_VALUE]: "foo" has an invalid value') {
        throw Error('[] does not have the correct message')
      }
    })
    it('Contains the correct code', () => {
      const e = new cert.ArgValueError('foo')
      if (e.code !== 'ERR_INVALID_ARG_VALUE') {
        throw Error('[] does not have the correct code')
      }
    })
    it('Contains the correct valid', () => {
      const e = new cert.ArgValueError('foo', 'bar')
      if (e.valid[0] !== 'bar') {
        throw Error('[] does not have the correct valid')
      }
    })
    it('Inherits the correct prototype', () => {
      const e = new cert.ArgValueError('foo')
      if (!(e instanceof Error)) {
        throw Error('[] does not inherit the correct prototype')
      }
    })
  })
  describe('ArgTypeError', () => {
    it('Contains the correct name', () => {
      const e = new cert.ArgTypeError('foo')
      if (e.name !== 'TypeError') {
        throw Error('[] does not have the correct name')
      }
    })
    it('Contains the correct message', () => {
      const e = new cert.ArgTypeError('foo')
      if (e.message !== '[ERR_INVALID_ARG_TYPE]: "foo" has an invalid type') {
        throw Error('[] does not have the correct message')
      }
    })
    it('Contains the correct code', () => {
      const e = new cert.ArgTypeError('foo')
      if (e.code !== 'ERR_INVALID_ARG_TYPE') {
        throw Error('[] does not have the correct code')
      }
    })
    it('Contains the correct validTypes', () => {
      const e = new cert.ArgTypeError('foo', 'string')
      if (e.validTypes[0] !== 'string') {
        throw Error('[] does not have the correct validTypes')
      }
    })
    it('Inherits the correct prototype', () => {
      const e = new cert.ArgTypeError('foo')
      if (!(e instanceof TypeError)) {
        throw Error('[] does not inherit the correct prototype')
      }
    })
  })
  describe('ArgRangeError', () => {
    it('Contains the correct name', () => {
      const e = new cert.ArgRangeError('foo')
      if (e.name !== 'RangeError') {
        throw Error('[] does not have the correct name')
      }
    })
    it('Contains the correct message', () => {
      const e = new cert.ArgRangeError('foo')
      if (e.message !== '[ERR_INVALID_ARG_RANGE]: "foo" has an invalid range') {
        throw Error('[] does not have the correct message')
      }
    })
    it('Contains the correct code', () => {
      const e = new cert.ArgRangeError('foo')
      if (e.code !== 'ERR_INVALID_ARG_RANGE') {
        throw Error('[] does not have the correct code')
      }
    })
    it('Contains the correct range', () => {
      const e = new cert.ArgRangeError('foo', 42, 84, true, false)
      if (e.range !== '42 <= "foo" < 84') {
        throw Error('[] does not have the correct valid')
      }
    })
    it('Inherits the correct prototype', () => {
      const e = new cert.ArgRangeError('foo')
      if (!(e instanceof RangeError)) {
        throw Error('[] does not inherit the correct prototype')
      }
    })
  })
  describe('CertValueError', () => {
    it('Contains the correct name', () => {
      const e = new cert.CertValueError('foo')
      if (e.name !== 'Error') throw Error('[] does not have the correct name')
    })
    it('Contains the correct message', () => {
      const e = new cert.CertValueError('foo')
      if (e.message !== '[ERR_INVALID_VALUE]: Value is invalid') {
        throw Error('[] does not have the correct message')
      }
    })
    it('Contains the correct code', () => {
      const e = new cert.CertValueError('foo')
      if (e.code !== 'ERR_INVALID_VALUE') {
        throw Error('[] does not have the correct code')
      }
    })
    it('Inherits the correct prototype', () => {
      const e = new cert.CertValueError('foo')
      if (!(e instanceof Error)) {
        throw Error('[] does not inherit the correct prototype')
      }
    })
  })
  describe('CertTypeError', () => {
    it('Contains the correct name', () => {
      const e = new cert.CertTypeError('foo')
      if (e.name !== 'TypeError') {
        throw Error('[] does not have the correct name')
      }
    })
    it('Contains the correct message', () => {
      const e = new cert.CertTypeError('foo')
      if (e.message !== '[ERR_INVALID_TYPE]: Value is of an invalid type') {
        throw Error('[] does not have the correct message')
      }
    })
    it('Contains the correct code', () => {
      const e = new cert.CertTypeError('foo')
      if (e.code !== 'ERR_INVALID_TYPE') {
        throw Error('[] does not have the correct code')
      }
    })
    it('Inherits the correct prototype', () => {
      const e = new cert.CertTypeError('foo')
      if (!(e instanceof TypeError)) {
        throw Error('[] does not inherit the correct prototype')
      }
    })
  })
  describe('CertRangeError', () => {
    it('Contains the correct name', () => {
      const e = new cert.CertRangeError('foo')
      if (e.name !== 'RangeError') {
        throw Error('[] does not have the correct name')
      }
    })
    it('Contains the correct message', () => {
      const e = new cert.CertRangeError('foo')
      if (e.message !== '[ERR_INVALID_RANGE]: Value is of a prohibited range') {
        throw Error('[] does not have the correct message')
      }
    })
    it('Contains the correct code', () => {
      const e = new cert.CertRangeError('foo')
      if (e.code !== 'ERR_INVALID_RANGE') {
        throw Error('[] does not have the correct code')
      }
    })
    it('Inherits the correct prototype', () => {
      const e = new cert.CertRangeError('foo')
      if (!(e instanceof RangeError)) {
        throw Error('[] does not inherit the correct prototype')
      }
    })
  })
})

describe('Module Property Checking', () => {
  it('Has all of the correct property names', () => {
    const allowed = [
      'check',
      'ArgValueError',
      'ArgTypeError',
      'ArgRangeError',
      'CertValueError',
      'CertTypeError',
      'CertRangeError'
    ]
    for (let key of Object.keys(cert)) {
      if (allowed.includes(key)) {
        allowed.splice(allowed.indexOf(key), 1)
      } else {
        throw Error('Module has a property that is not in allowed')
      }
    }
    if (allowed.length !== 0) {
      throw Error('Module does not have all the allowed properties')
    }
  })
  it('Has all of the correct property types', () => {
    const allowed = [
      ['check', 'function'],
      ['ArgValueError', 'function'],
      ['ArgTypeError', 'function'],
      ['ArgRangeError', 'function'],
      ['CertValueError', 'function'],
      ['CertTypeError', 'function'],
      ['CertRangeError', 'function']
    ]
    for (let entry of allowed) {
      // eslint-disable-next-line valid-typeof
      if (typeof cert[entry[0]] !== entry[1]) {
        throw TypeError('Bad property type')
      }
    }
  })
})

describe('Checker Checking', () => {
  const check = cert.check
  it('Has the correct instance method names', () => {
    const certMethods = Object.keys(cert('foo'))
    const checkMethods = Object.keys(check('foo'))
    for (let m of checkMethods) {
      if (!certMethods.includes(m)) {
        throw Error('Check/cert method mismatch')
      }
    }
    for (let m of certMethods) {
      if (!checkMethods.includes(m)) {
        throw Error('Check/cert method mismatch')
      }
    }
  })
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
      throw Error('Check returned an unexpected false value')
    }
  })
  it('Does not error on failures', () => {
    try {
      if (
        check('foo').is('bar') ||
        check(12).isType('string') ||
        check('foo').isNot('foo') ||
        check({}).isNotType('object') ||
        check(42).isGT(42)
      ) {
        throw Error('Check returned an unexpected true value')
      }
    } catch (err) {
      if (err.message !== 'Check returned an unexpected true value') {
        const e = Error('Unexpected error from check')
        e.err = err
        throw e
      } else {
        throw err
      }
    }
  })
  it('Errors on invalid type input', () => {
    try {
      check('foo').isType({})
      throw Error('Check should have thrown an error')
    } catch (err) {
      if (err.message === 'Check should have thrown an error') {
        throw err
      }
      if (err.code !== 'ERR_INVALID_ARG_TYPE') {
        const e = Error('Unexpected error from check')
        e.err = err
        throw e
      }
    }
  })
  it('Errors on invalid range input', () => {
    try {
      check('foo').isGT('')
      throw Error('Check should have thrown an error')
    } catch (err) {
      if (err.message === 'Check should have thrown an error') {
        throw err
      }
      if (err.code !== 'ERR_INVALID_ARG_TYPE') {
        const e = Error('Unexpected error from check')
        e.err = err
        throw e
      }
    }
  })
})

describe('Multiple Value Checking', () => {
  describe('Passes', () => {
    it('Certifies multiple values for cert.is', () => {
      cert('foo', 'bar', 'baz').is('foo', 'bar', 'baz', 'beh')
    })
    it('Certifies multiple values for cert.isNot', () => {
      cert('foo', 'bar', 'baz').isNot('qux', 'quz', 'quup')
    })
    it('Certifies multiple values for cert.isType', () => {
      cert('foo', 'bar', 'baz').isType('string', 'number')
    })
    it('Certifies multiple values for cert.isNotType', () => {
      cert('foo', 'bar', 'baz').isNotType('boolean', Object)
    })
    it('Certifies multiple values for cert.isRange', () => {
      cert(12, 22, 32).isRange(2, 42, true, true)
    })
    it('Certifies multiple values for cert.isGT', () => {
      cert(12, 22, 32).isGT(2)
    })
    it('Certifies multiple values for cert.isGTE', () => {
      cert(12, 22, 32).isGTE(12)
    })
    it('Certifies multiple values for cert.isLT', () => {
      cert(12, 22, 32).isLT(42)
    })
    it('Certifies multiple values for cert.isLTE', () => {
      cert(12, 22, 32).isLTE(32)
    })
  })
  describe('Failures', () => {
    it('Errors multiple values for cert.is', () => {
      try {
        cert('foo', 'bar', 'baz').is('food', 'bard', 'bazy', 'behd')
      } catch (err) {
        if (err.code !== 'ERR_INVALID_VALUE') {
          const e = Error('Cert did not throw the correct error')
          e.err = err
          throw e
        }
      }
    })
    it('Errors multiple values for cert.isNot', () => {
      try {
        cert('foo', 'bar', 'baz').isNot('qux', 'quz', 'quup', 'foo')
      } catch (err) {
        if (err.code !== 'ERR_INVALID_VALUE') {
          const e = Error('Cert did not throw the correct error')
          e.err = err
          throw e
        }
      }
    })
    it('Errors multiple values for cert.isType', () => {
      try {
        cert('foo', 'bar', 'baz').isType('number', Object)
      } catch (err) {
        if (err.code !== 'ERR_INVALID_TYPE') {
          const e = Error('Cert did not throw the correct error')
          e.err = err
          throw e
        }
      }
    })
    it('Errors multiple values for cert.isNotType', () => {
      try {
        cert('foo', 'bar', 'baz').isNotType('boolean', Object, 'string')
      } catch (err) {
        if (err.code !== 'ERR_INVALID_TYPE') {
          const e = Error('Cert did not throw the correct error')
          e.err = err
          throw e
        }
      }
    })
    it('Errors multiple values for cert.isRange', () => {
      try {
        cert(12, 22, 32).isRange(20, 30, true, true)
      } catch (err) {
        if (err.code !== 'ERR_INVALID_RANGE') {
          const e = Error('Cert did not throw the correct error')
          e.err = err
          throw e
        }
      }
    })
    it('Errors multiple values for cert.isGT', () => {
      try {
        cert(12, 22, 32).isGT(42)
      } catch (err) {
        if (err.code !== 'ERR_INVALID_RANGE') {
          const e = Error('Cert did not throw the correct error')
          e.err = err
          throw e
        }
      }
    })
    it('Errors multiple values for cert.isGTE', () => {
      try {
        cert(12, 22, 32).isGTE(42)
      } catch (err) {
        if (err.code !== 'ERR_INVALID_RANGE') {
          const e = Error('Cert did not throw the correct error')
          e.err = err
          throw e
        }
      }
    })
    it('Errors multiple values for cert.isLT', () => {
      try {
        cert(12, 22, 32).isLT(12)
      } catch (err) {
        if (err.code !== 'ERR_INVALID_RANGE') {
          const e = Error('Cert did not throw the correct error')
          e.err = err
          throw e
        }
      }
    })
    it('Errors multiple values for cert.isLTE', () => {
      try {
        cert(12, 22, 32).isLTE(2)
      } catch (err) {
        if (err.code !== 'ERR_INVALID_RANGE') {
          const e = Error('Cert did not throw the correct error')
          e.err = err
          throw e
        }
      }
    })
  })
})
