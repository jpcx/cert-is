[cert-is - v1.0.2](../../README.md) › [Globals](../../README.md) › [cert-is](../../README.md) › [TypeArgumentError](cert_is.typeargumenterror.md)

# Class: TypeArgumentError

Thrown when an argument's type is not an acceptable type.

**`class`** 

**`name`** TypeArgumentError

**`extends`** TypeError

**`param`** Name of the parameter that caused the error.

**`param`** Optional list of valid types for the argument.

**`prop`** {'TypeError'} name    - Name of the error constructor.

**`prop`** {string}      message - Message describing the issue. See examples below.

**`prop`** {'ERR_INVALID_ARG_TYPE'} code - Error code.

**`prop`** {Array}   [validTypes] - Optional list of valid types for the
argument. If none are provided to the constructor, this property will not
be set.

**`example`** 
const e = new TypeArgumentError('foo')
e.name    // 'TypeError'
e.message // '[ERR_INVALID_ARG_TYPE]: "foo" has an invalid type'
e.code    // 'ERR_INVALID_ARG_TYPE'

**`example`** 
const e = new TypeArgumentError('foo', 'string', 'number')
e.name       // 'TypeError'
e.message    // '[ERR_INVALID_ARG_TYPE]: "foo" has an invalid type'
e.code       // 'ERR_INVALID_ARG_TYPE'
e.validTypes // ['string', 'number']

## Hierarchy

* TypeError

  ↳ **TypeArgumentError**

## Index

### Constructors

* [constructor](cert_is.typeargumenterror.md#constructor)

### Properties

* [code](cert_is.typeargumenterror.md#code)
* [message](cert_is.typeargumenterror.md#message)
* [name](cert_is.typeargumenterror.md#name)
* [stack](cert_is.typeargumenterror.md#optional-stack)
* [validTypes](cert_is.typeargumenterror.md#optional-validtypes)
* [TypeError](cert_is.typeargumenterror.md#static-typeerror)

## Constructors

### constructor

\+ **new TypeArgumentError**(`paramName`: string, ...`validTypes`: Array‹string | [AnyConstructorFunction](../../README.md#anyconstructorfunction)›): *[TypeArgumentError](cert_is.typeargumenterror.md)*

*Defined in [src/errors/typeArgumentError.ts:42](src/errors/typeArgumentError.ts#L42)*

**Parameters:**

Name | Type |
------ | ------ |
`paramName` | string |
`...validTypes` | Array‹string &#124; [AnyConstructorFunction](../../README.md#anyconstructorfunction)› |

**Returns:** *[TypeArgumentError](cert_is.typeargumenterror.md)*

## Properties

### code

• **code**: *string*

*Defined in [src/errors/typeArgumentError.ts:41](src/errors/typeArgumentError.ts#L41)*

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

### `Optional` validTypes

• **validTypes**? : *Array‹string | [AnyConstructorFunction](../../README.md#anyconstructorfunction)›*

*Defined in [src/errors/typeArgumentError.ts:42](src/errors/typeArgumentError.ts#L42)*

___

### `Static` TypeError

▪ **TypeError**: *TypeErrorConstructor*

