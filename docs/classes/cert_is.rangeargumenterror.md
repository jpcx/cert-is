[cert-is - v1.0.2](../../README.md) › [Globals](../../README.md) › [cert-is](../../README.md) › [RangeArgumentError](cert_is.rangeargumenterror.md)

# Class: RangeArgumentError

Thrown when an argument's range is not within an acceptable range.

**`class`** 

**`name`** RangeArgumentError

**`extends`** RangeError

**`param`** Name of the parameter that caused the error.

**`param`** Optional lower bound of the range.

**`param`** Optional upper bound of the range.

**`param`** Optional indicator of an inclusive lower bound.

**`param`** Optional indicator of an inclusive upper bound.

**`prop`** {'RangeError'} name - Name of the error constructor.

**`prop`** {string}  message   - Message describing the issue. See examples below.

**`prop`** {string} [range]    - Short description of the range. Only set if all
four bound specifiers are provided to the constructor and are the correct
types (`lower`: `number`; `upper`: `number`; `lowerIsInclusive`: `boolean`;
`upperIsInclusive`: `boolean`).

**`prop`** {'ERR_INVALID_ARG_RANGE'} code - Error code.

**`example`** 
const e = new RangeArgumentError('foo')
e.name    // 'RangeError'
e.message // '[ERR_INVALID_ARG_RANGE]: "foo" has an invalid range'
e.code    // 'ERR_INVALID_ARG_RANGE'

**`example`** 
const e = new RangeArgumentError('foo', 42)
e.name    // 'RangeError'
e.message // '[ERR_INVALID_ARG_RANGE]: "foo" has an invalid range'
e.code    // 'ERR_INVALID_ARG_RANGE'

**`example`** 
const e = new RangeArgumentError('foo', 42, 84, true, false)
e.name    // 'RangeError'
e.message // '[ERR_INVALID_ARG_RANGE]: "foo" has an invalid range'
e.code    // 'ERR_INVALID_ARG_RANGE'
e.range   // `42 <= 'foo' < 84`

## Hierarchy

* RangeError

  ↳ **RangeArgumentError**

## Index

### Constructors

* [constructor](cert_is.rangeargumenterror.md#constructor)

### Properties

* [code](cert_is.rangeargumenterror.md#code)
* [message](cert_is.rangeargumenterror.md#message)
* [name](cert_is.rangeargumenterror.md#name)
* [range](cert_is.rangeargumenterror.md#optional-range)
* [stack](cert_is.rangeargumenterror.md#optional-stack)
* [RangeError](cert_is.rangeargumenterror.md#static-rangeerror)

## Constructors

### constructor

\+ **new RangeArgumentError**(`paramName`: string, `lower`: number, `upper`: number, `lowerIsInclusive`: boolean, `upperIsInclusive`: boolean): *[RangeArgumentError](cert_is.rangeargumenterror.md)*

*Defined in [src/errors/rangeArgumentError.ts:49](src/errors/rangeArgumentError.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`paramName` | string |
`lower` | number |
`upper` | number |
`lowerIsInclusive` | boolean |
`upperIsInclusive` | boolean |

**Returns:** *[RangeArgumentError](cert_is.rangeargumenterror.md)*

## Properties

### code

• **code**: *string*

*Defined in [src/errors/rangeArgumentError.ts:48](src/errors/rangeArgumentError.ts#L48)*

___

### message

• **message**: *string*

*Inherited from void*

___

### name

• **name**: *string*

*Inherited from void*

___

### `Optional` range

• **range**? : *undefined | string*

*Defined in [src/errors/rangeArgumentError.ts:49](src/errors/rangeArgumentError.ts#L49)*

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from void*

*Overrides void*

___

### `Static` RangeError

▪ **RangeError**: *RangeErrorConstructor*

