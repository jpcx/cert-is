[cert-is - v1.0.1](../README.md) › [Globals](../globals.md) › [cert-is](../modules/cert_is.md) › [RangeAssertionError](cert_is.rangeassertionerror.md)

# Class: RangeAssertionError

Thrown when the certifier finds a value that is not within an expected range.

**`class`** 

**`name`** RangeAssertionError

**`extends`** RangeError

**`param`** Custom message to prepend with '
[ERR_INVALID_RANGE]: '.

**`prop`** {'RangeError'} name    - Name of the error constructor.

**`prop`** {string}      message - Message describing the issue.

**`prop`** {'ERR_INVALID_RANGE'} code - Error code.

**`example`** 
const e = new RangeAssertionError()
e.name    // 'RangeError'
e.message // '[ERR_INVALID_RANGE]: Value is of a prohibited range'
e.code    // 'ERR_INVALID_RANGE'

**`example`** 
const e = new RangeAssertionError('this is a custom message')
e.name    // 'Error'
e.message // '[ERR_INVALID_RANGE]: this is a custom message'
e.code    // 'ERR_INVALID_RANGE'

## Hierarchy

* RangeError

  ↳ **RangeAssertionError**

## Index

### Constructors

* [constructor](cert_is.rangeassertionerror.md#constructor)

### Properties

* [code](cert_is.rangeassertionerror.md#code)
* [message](cert_is.rangeassertionerror.md#message)
* [name](cert_is.rangeassertionerror.md#name)
* [stack](cert_is.rangeassertionerror.md#optional-stack)
* [RangeError](cert_is.rangeassertionerror.md#static-rangeerror)

## Constructors

###  constructor

\+ **new RangeAssertionError**(`message`: string): *[RangeAssertionError](cert_is.rangeassertionerror.md)*

*Defined in [src/errors/rangeAssertionError.ts:35](https://github.com/jpcx/cert-is/blob/09879b3/src/errors/rangeAssertionError.ts#L35)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`message` | string | "Value is of a prohibited range" |

**Returns:** *[RangeAssertionError](cert_is.rangeassertionerror.md)*

## Properties

###  code

• **code**: *string*

*Defined in [src/errors/rangeAssertionError.ts:35](https://github.com/jpcx/cert-is/blob/09879b3/src/errors/rangeAssertionError.ts#L35)*

___

###  message

• **message**: *string*

*Inherited from void*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from void*

Defined in node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from void*

*Overrides void*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` RangeError

▪ **RangeError**: *RangeErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1006
