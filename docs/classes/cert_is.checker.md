[cert-is - v1.0.0](../README.md) › [Globals](../globals.md) › [cert-is](../modules/cert_is.md) › [Checker](cert_is.checker.md)

# Class: Checker

Provides an interface to Certifier that performs a given test on the values
and returns the result as a boolean rather than throwing an error. Contains
all methods associated with a Certifier instance (except for
Certifier.message). Methods return `this` if the test passes, and `false`
if the test throws an error. All values must pass the supplied tests.

**`class`** 

**`name`** Checker

**`param`** Values to certify.

## Hierarchy

* **Checker**

## Index

### Constructors

* [constructor](cert_is.checker.md#constructor)

### Properties

* [is](cert_is.checker.md#is)
* [isGT](cert_is.checker.md#isgt)
* [isGTE](cert_is.checker.md#isgte)
* [isLT](cert_is.checker.md#islt)
* [isLTE](cert_is.checker.md#islte)
* [isNot](cert_is.checker.md#isnot)
* [isNotType](cert_is.checker.md#isnottype)
* [isType](cert_is.checker.md#istype)

## Constructors

###  constructor

\+ **new Checker**(...`values`: any): *[Checker](cert_is.checker.md)*

Defined in src/checker.ts:127

**Parameters:**

Name | Type |
------ | ------ |
`...values` | any |

**Returns:** *[Checker](cert_is.checker.md)*

## Properties

###  is

• **is**: *function*

Defined in src/checker.ts:44

Certifies that ALL elements of `values` are strictly equal to any element
of `allowed`. Returns false if ANY element of `values` is NOT strictly
equal to any valid value.

**`param`** Allowed values.

**`returns`** Returns instance for re-use or false.

#### Type declaration:

▸ (...`valid`: any): *[Checker](cert_is.checker.md) | false*

**Parameters:**

Name | Type |
------ | ------ |
`...valid` | any |

___

###  isGT

• **isGT**: *function*

Defined in src/checker.ts:92

Certifies that ALL elements of `values` are greater than a provided lower
bound. Returns false if any element of `values` is NOT greater than the
provided bound. Returns false if any element of `values` is not a strict
number type, or if `lower` is not a strict number type.

**`param`** Lower bound used for range checking

**`returns`** Returns instance for re-use or false.

#### Type declaration:

▸ (`lowerExclusive`: number): *[Checker](cert_is.checker.md) | false*

**Parameters:**

Name | Type |
------ | ------ |
`lowerExclusive` | number |

___

###  isGTE

• **isGTE**: *function*

Defined in src/checker.ts:104

Certifies that ALL elements of `values` are greater than or equal to a
provided lower bound. Returns false if any element of `values` is NOT
greater or equal to the provided bound. Returns false if any element of
`values` is not a strict number type or if `lower` is not a strict number
type.

**`param`** Lower bound used for range checking

**`returns`** Returns instance for re-use or false.

#### Type declaration:

▸ (`lowerIsInclusive`: number): *[Checker](cert_is.checker.md) | false*

**Parameters:**

Name | Type |
------ | ------ |
`lowerIsInclusive` | number |

___

###  isLT

• **isLT**: *function*

Defined in src/checker.ts:115

Certifies that ALL elements of `values` are less than a provided upper
bound. Returns false if any element of `values` is NOT less than the
provided bound. Returns false if any element of `values` is not a strict
number type or if `upper` is not a strict number type.

**`param`** Upper bound used for range checking

**`returns`** Returns instance for re-use or false.

#### Type declaration:

▸ (`upperExclusive`: number): *[Checker](cert_is.checker.md) | false*

**Parameters:**

Name | Type |
------ | ------ |
`upperExclusive` | number |

___

###  isLTE

• **isLTE**: *function*

Defined in src/checker.ts:127

Certifies that ALL elements of `values` are less than or equal to a
provided upper bound. Returns false if any element of `values` is NOT
less than or equal to the provided bound. Returns false if any element of
`values` is not a strict number type or if `upper` is not a strict number
type.

**`param`** Upper bound used for range checking

**`returns`** Returns instance for re-use or false.

#### Type declaration:

▸ (`upperIsInclusive`: number): *[Checker](cert_is.checker.md) | false*

**Parameters:**

Name | Type |
------ | ------ |
`upperIsInclusive` | number |

___

###  isNot

• **isNot**: *function*

Defined in src/checker.ts:54

Certifies that All elements of `values` are not strictly equal to any
element of `invalid`. Returns false if the ANY element of `values` IS
strictly equal to any invalid value.

**`param`** Prohibited values.

**`returns`** Returns instance for re-use or false.

#### Type declaration:

▸ (...`invalid`: any): *[Checker](cert_is.checker.md) | false*

**Parameters:**

Name | Type |
------ | ------ |
`...invalid` | any |

___

###  isNotType

• **isNotType**: *function*

Defined in src/checker.ts:79

Certified that All elements of `values` DO NOT match any type in
`invalidTypes`. Returns false if the type of any element of `values` IS
strictly equal to any invalid type. If a given type is a string, checks
using `typeof`. If a given type is a function, checks using instanceof.

**`param`** Prohibited
types.

**`returns`** Returns instance for re-use or false.

#### Type declaration:

▸ (...`invalidTypes`: Array‹string | [AnyConstructorFunction](../modules/cert_is.md#anyconstructorfunction)›): *[Checker](cert_is.checker.md) | false*

**Parameters:**

Name | Type |
------ | ------ |
`...invalidTypes` | Array‹string &#124; [AnyConstructorFunction](../modules/cert_is.md#anyconstructorfunction)› |

___

###  isType

• **isType**: *function*

Defined in src/checker.ts:65

Certifies that ALL elements of `values` match any type in `validTypes`.
Returns false if the type of any element of `values` is NOT strictly
equal to any valid type. If a given type is a string, checks using
`typeof`. If a given type is a function, checks using instanceof.

**`param`** Allowed types.

**`returns`** Returns instance for re-use or false.

#### Type declaration:

▸ (...`validTypes`: Array‹string | [AnyConstructorFunction](../modules/cert_is.md#anyconstructorfunction)›): *[Checker](cert_is.checker.md) | false*

**Parameters:**

Name | Type |
------ | ------ |
`...validTypes` | Array‹string &#124; [AnyConstructorFunction](../modules/cert_is.md#anyconstructorfunction)› |
