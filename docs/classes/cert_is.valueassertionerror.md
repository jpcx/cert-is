[cert-is - v1.0.0](../README.md) › [Globals](../globals.md) › [cert-is](../modules/cert_is.md) › [ValueAssertionError](cert_is.valueassertionerror.md)

# Class: ValueAssertionError

Thrown when the certifier finds a value is either not expected or is explicitly forbidden.

**`class`** 

**`name`** ValueAssertionError

**`extends`** Error

**`param`** Custom message to prepend with '
[ERR_INVALID_VALUE]: '.

**`prop`** {'Error'} name    - Name of the error constructor.

**`prop`** {string}  message - Message describing the issue.

**`prop`** {'ERR_INVALID_VALUE'} code - Error code.

**`example`** 
const e = new ValueAssertionError()
e.name    // 'Error'
e.message // '[ERR_INVALID_VALUE]: Value is invalid'
e.code    // 'ERR_INVALID_VALUE'

**`example`** 
const e = new ValueAssertionError('this is a custom message')
e.name    // 'Error'
e.message // '[ERR_INVALID_VALUE]: this is a custom message'
e.code    // 'ERR_INVALID_VALUE'

## Hierarchy

* Error

  ↳ **ValueAssertionError**

## Index

### Constructors

* [constructor](cert_is.valueassertionerror.md#constructor)

### Properties

* [code](cert_is.valueassertionerror.md#code)
* [message](cert_is.valueassertionerror.md#message)
* [name](cert_is.valueassertionerror.md#name)
* [stack](cert_is.valueassertionerror.md#optional-stack)
* [Error](cert_is.valueassertionerror.md#static-error)

## Constructors

###  constructor

\+ **new ValueAssertionError**(`message`: string): *[ValueAssertionError](cert_is.valueassertionerror.md)*

Defined in src/errors/valueAssertionError.ts:35

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`message` | string | "Value is invalid" |

**Returns:** *[ValueAssertionError](cert_is.valueassertionerror.md)*

## Properties

###  code

• **code**: *string*

Defined in src/errors/valueAssertionError.ts:35

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

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:984
