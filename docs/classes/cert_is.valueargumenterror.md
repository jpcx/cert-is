[cert-is - v1.0.2](../../README.md) › [Globals](../../README.md) › [cert-is](../../README.md) › [ValueArgumentError](cert_is.valueargumenterror.md)

# Class: ValueArgumentError

Thrown when an argument's value is not an acceptable value.

**`class`** 

**`name`** ValueArgumentError

**`extends`** Error

**`param`** Name of the parameter that caused the error.

**`param`** Optional list of valid values for the argument.

**`prop`** {'Error'} name       - Name of the error constructor.

**`prop`** {string}  message    - Message describing the issue. See examples below.

**`prop`** {'ERR_INVALID_ARG_VALUE'} code - Error code.

**`prop`** {Array}   [valid]    - Optional list of valid values for the
argument. If none are provided to the constructor, this property will not
be set.

**`example`** 
const e = new ValueArgumentError('foo')
e.name    // 'Error'
e.message // '[ERR_INVALID_ARG_VALUE]: "foo" has an invalid value'
e.code    // 'ERR_INVALID_ARG_VALUE'

**`example`** 
const e = new ValueArgumentError('foo', 'bar')
e.name    // 'Error'
e.message // '[ERR_INVALID_ARG_VALUE]: "foo" has an invalid value'
e.code    // 'ERR_INVALID_ARG_VALUE'
e.valid   // ['bar']

## Hierarchy

* Error

  ↳ **ValueArgumentError**

## Index

### Constructors

* [constructor](cert_is.valueargumenterror.md#constructor)

### Properties

* [code](cert_is.valueargumenterror.md#code)
* [message](cert_is.valueargumenterror.md#message)
* [name](cert_is.valueargumenterror.md#name)
* [stack](cert_is.valueargumenterror.md#optional-stack)
* [valid](cert_is.valueargumenterror.md#optional-valid)
* [Error](cert_is.valueargumenterror.md#static-error)

## Constructors

### constructor

\+ **new ValueArgumentError**(`paramName`: string, ...`valid`: any): *[ValueArgumentError](cert_is.valueargumenterror.md)*

*Defined in [src/errors/valueArgumentError.ts:40](src/errors/valueArgumentError.ts#L40)*

**Parameters:**

Name | Type |
------ | ------ |
`paramName` | string |
`...valid` | any |

**Returns:** *[ValueArgumentError](cert_is.valueargumenterror.md)*

## Properties

### code

• **code**: *string*

*Defined in [src/errors/valueArgumentError.ts:39](src/errors/valueArgumentError.ts#L39)*

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

### `Optional` valid

• **valid**? : *any*

*Defined in [src/errors/valueArgumentError.ts:40](src/errors/valueArgumentError.ts#L40)*

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

