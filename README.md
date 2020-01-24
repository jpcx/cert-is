# cert-is

Provides a collection of assertion tools for checking strict equality, type, and range of a set of values.

This project aims to simplify runtime value checking for safety-critical applications.

[![NPM](https://nodei.co/npm/cert-is.png)](https://nodei.co/npm/cert-is/)

[![NPM](https://img.shields.io/github/license/jpcx/cert-is.svg)](https://www.npmjs.com/package/cert-is/)
[![NPM](https://img.shields.io/node/v/cert-is.svg)](https://www.npmjs.com/package/cert-is/)
[![NPM](https://img.shields.io/npm/dm/cert-is.svg)](https://www.npmjs.com/package/cert-is/)
[![NPM](https://img.shields.io/github/last-commit/jpcx/cert-is.svg)](https://www.npmjs.com/package/cert-is/)
[![NPM](https://img.shields.io/david/jpcx/cert-is.svg)](https://www.npmjs.com/package/cert-is/)
[![NPM](https://img.shields.io/david/dev/jpcx/cert-is.svg)](https://www.npmjs.com/package/cert-is/)

**Migration Notice 0.2.1 --> 1.0.0:**

 - Certifier.isRange and Checker.isRange have been removed.
 - Exports are now structured as follows:
```ts
export declare function cert(...values: any): Certifier
export declare function check(...values: any): Checker
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
```
 - Project has been converted to TypeScript

**Update 1.0.0:**

 - This library has been converted to TypeScript, but development will likely stop here.
 - Please check out [jpcx/restrict-v](https://github.com/jpcx/restrict-v) instead.

## Installation

```console
yarn add cert-is
```

## Testing

```console
cd /path/to/node_modules/cert-is
yarn install -dev
yarn test
```

## Contribution

Please raise an issue if you find any. Pull requests are welcome!

## Documentation

### Module: cert-is

#### Index

##### Classes

* [Certifier](docs/classes/cert_is.certifier.md)
* [Checker](docs/classes/cert_is.checker.md)
* [RangeArgumentError](docs/classes/cert_is.rangeargumenterror.md)
* [RangeAssertionError](docs/classes/cert_is.rangeassertionerror.md)
* [TypeArgumentError](docs/classes/cert_is.typeargumenterror.md)
* [TypeAssertionError](docs/classes/cert_is.typeassertionerror.md)
* [ValueArgumentError](docs/classes/cert_is.valueargumenterror.md)
* [ValueAssertionError](docs/classes/cert_is.valueassertionerror.md)

##### Type aliases

* [AnyConstructorFunction](README.md#anyconstructorfunction)

##### Functions

* [cert](README.md#cert)
* [check](README.md#check)

#### Type aliases

##### AnyConstructorFunction

Ƭ **AnyConstructorFunction**: *object*

*Defined in [src/certifier.ts:16](src/certifier.ts#L16)*

Any function that uses new to construct an object.

###### Type declaration:

#### Functions

##### cert

▸ **cert**(...`values`: any): *[Certifier](docs/classes/cert_is.certifier.md)*

*Defined in [src/index.ts:59](src/index.ts#L59)*

Constructs a Certifier instance given a set of values. All values must pass
the supplied tests.

**`func`** cert

**`example`** 
```js
const certifier = cert('foo', 'bar')
certifier.is('foo') // undefined
certifier.is('bar') // undefined
certifier.is('qux') // THROWS ValueAssertionError
```

**`example`** 
```js
cert('foo').is('foo')                      // returns Certifier instance
cert('foo').is('bar')                      // THROWS ValueAssertionError
cert('foo').is('foo', 'bar')               // returns Certifier instance
cert('foo').isNot('foo')                   // THROWS ValueAssertionError
cert('foo').isType('string')               // returns Certifier instance
cert('foo').isType('number')               // THROWS TypeAssertionError
cert('foo').isType('string', 'number')     // returns Certifier instance
cert(new Map()).isType(Map)                // returns Certifier instance
cert(new Map()).isType(Object)             // returns Certifier instance
cert(new Map()).isType(Set)                // THROWS TypeAssertionError
cert(new Map()).isType(Map, Set)           // returns Certifier instance
cert(15).isGT(2)                           // returns Certifier instance
cert(15).isGT(2).isLT(17)                  // returns Certifier instance
cert(18).isGT(17).isLT(2)                  // THROWS RangeAssertionError
cert(15).isGT(15)                          // THROWS RangeAssertionError
cert(15).isGTE(15)                         // returns Certifier instance
cert(15, 23).isGTE(15)                     // returns Certifier instance
cert(15, 23).isGTE('foo')                  // THROWS TypeArgumentError
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...values` | any | Values to construct Certifier with. |

**Returns:** *[Certifier](docs/classes/cert_is.certifier.md)*

Certifier instance.

___

##### check

▸ **check**(...`values`: any): *[Checker](docs/classes/cert_is.checker.md)*

*Defined in [src/index.ts:80](src/index.ts#L80)*

Constructs a Checker instance given a set of values. All values must pass
the supplied tests.

**`func`** check

**`example`** 
```js
check('foo').is('foo')        // returns true
check('foo').is('bar')        // returns Checker instance
check('foo').isType('string') // returns true
check('foo').isType('bar')    // THROWS TypeArgumentError
check('foo').isGT('')         // THROWS TypeArgumentError
```

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`...values` | any | Values to construct Checker with. |

**Returns:** *[Checker](docs/classes/cert_is.checker.md)*

Checker instance.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
