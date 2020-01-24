[cert-is - v1.0.0](../README.md) › [Globals](../globals.md) › [cert-is](../modules/cert_is.md) › [TypeArgumentError](cert_is.typeargumenterror.md)

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

###  constructor

\+ **new TypeArgumentError**(`paramName`: string, ...`validTypes`: Array‹string | [AnyConstructorFunction](../modules/cert_is.md#anyconstructorfunction)›): *[TypeArgumentError](cert_is.typeargumenterror.md)*

Defined in src/errors/typeArgumentError.ts:42

**Parameters:**

Name | Type |
------ | ------ |
`paramName` | string |
`...validTypes` | Array‹string &#124; [AnyConstructorFunction](../modules/cert_is.md#anyconstructorfunction)› |

**Returns:** *[TypeArgumentError](cert_is.typeargumenterror.md)*

## Properties

###  code

• **code**: *string*

Defined in src/errors/typeArgumentError.ts:41

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

### `Optional` validTypes

• **validTypes**? : *Array‹string | [AnyConstructorFunction](../modules/cert_is.md#anyconstructorfunction)›*

Defined in src/errors/typeArgumentError.ts:42

___

### `Static` TypeError

▪ **TypeError**: *TypeErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:1039
