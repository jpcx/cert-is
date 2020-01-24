[cert-is - v1.0.2](../../README.md) › [Globals](../../README.md) › [cert-is](../../README.md) › [TypeAssertionError](cert_is.typeassertionerror.md)

# Class: TypeAssertionError

Thrown when the certifier finds a value with a type that is either not expected or is explicitly forbidden.

**`class`** 

**`name`** TypeAssertionError

**`extends`** TypeError

**`param`** Custom message to prepend with '
[ERR_INVALID_TYPE]: '.

**`prop`** {'TypeError'} name    - Name of the error constructor.

**`prop`** {string}      message - Message describing the issue.

**`prop`** {'ERR_INVALID_TYPE'} code - Error code.

**`example`** 
const e = new TypeAssertionError()
e.name    // 'TypeError'
e.message // '[ERR_INVALID_TYPE]: Value is of an invalid type'
e.code    // 'ERR_INVALID_TYPE'

**`example`** 
const e = new TypeAssertionError('this is a custom message')
e.name    // 'Error'
e.message // '[ERR_INVALID_TYPE]: this is a custom message'
e.code    // 'ERR_INVALID_TYPE'

## Hierarchy

* TypeError

  ↳ **TypeAssertionError**

## Index

### Constructors

* [constructor](cert_is.typeassertionerror.md#constructor)

### Properties

* [code](cert_is.typeassertionerror.md#code)
* [message](cert_is.typeassertionerror.md#message)
* [name](cert_is.typeassertionerror.md#name)
* [stack](cert_is.typeassertionerror.md#optional-stack)
* [TypeError](cert_is.typeassertionerror.md#static-typeerror)

## Constructors

### constructor

\+ **new TypeAssertionError**(`message`: string): *[TypeAssertionError](cert_is.typeassertionerror.md)*

*Defined in [src/errors/typeAssertionError.ts:35](src/errors/typeAssertionError.ts#L35)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`message` | string | "Value is of an invalid type" |

**Returns:** *[TypeAssertionError](cert_is.typeassertionerror.md)*

## Properties

### code

• **code**: *string*

*Defined in [src/errors/typeAssertionError.ts:35](src/errors/typeAssertionError.ts#L35)*

___

### message

• **message**: *string*

*Inherited from void*

___

### name

• **name**: *string*

*Inherited from void*

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from void*

*Overrides void*

___

### `Static` TypeError

▪ **TypeError**: *TypeErrorConstructor*

