[cert-is - v1.0.2](../../README.md) › [Globals](../../README.md) › [cert-is](../../README.md) › [Certifier](cert_is.certifier.md)

# Class: Certifier

Given a set of values, provides a collection of assertion tools for checking
strict equality, type, and range. Throws the appropriate error if a given
test does not pass. All values must pass the supplied tests.

**`class`** 

**`name`** Certifier

**`param`** Values to certify.

## Hierarchy

* **Certifier**

## Index

### Constructors

* [constructor](cert_is.certifier.md#constructor)

### Properties

* [is](cert_is.certifier.md#is)
* [isGT](cert_is.certifier.md#isgt)
* [isGTE](cert_is.certifier.md#isgte)
* [isLT](cert_is.certifier.md#islt)
* [isLTE](cert_is.certifier.md#islte)
* [isNot](cert_is.certifier.md#isnot)
* [isNotType](cert_is.certifier.md#isnottype)
* [isType](cert_is.certifier.md#istype)
* [message](cert_is.certifier.md#message)

## Constructors

### constructor

\+ **new Certifier**(...`values`: any): *[Certifier](cert_is.certifier.md)*

*Defined in [src/certifier.ts:148](src/certifier.ts#L148)*

**Parameters:**

Name | Type |
------ | ------ |
`...values` | any |

**Returns:** *[Certifier](cert_is.certifier.md)*

## Properties

### is

• **is**: *function*

*Defined in [src/certifier.ts:48](src/certifier.ts#L48)*

Certifies that ALL elements of `values` are strictly equal to any element
of `allowed`. Throws if ANY element of `values` is NOT strictly equal to
any valid value.

**`param`** Allowed values.

**`throws`** {ValueAssertionError} - Throws an ValueAssertionError if the test fails.

**`returns`** Returns instance for re-use.

#### Type declaration:

▸ (...`valid`: any): *[Certifier](cert_is.certifier.md)*

**Parameters:**

Name | Type |
------ | ------ |
`...valid` | any |

___

### isGT

• **isGT**: *function*

*Defined in [src/certifier.ts:106](src/certifier.ts#L106)*

Certifies that ALL elements of `values` are greater than a provided lower
bound. Throws if any element of `values` is NOT greater than the provided
bound. Throws if any element of `values` is not a strict number type, or
if `lower` is not a strict number type.

**`param`** Lower bound used for range checking

**`throws`** {(RangeAssertionError|TypeArgumentError)} Throws an
RangeAssertionError if the test fails. Throws an TypeArgumentError if
`lower` is not a strict number type.

**`returns`** Returns instance for re-use.

#### Type declaration:

▸ (`lowerExclusive`: number): *[Certifier](cert_is.certifier.md)*

**Parameters:**

Name | Type |
------ | ------ |
`lowerExclusive` | number |

___

### isGTE

• **isGTE**: *function*

*Defined in [src/certifier.ts:120](src/certifier.ts#L120)*

Certifies that ALL elements of `values` are greater than or equal to a
provided lower bound. Throws if any element of `values` is NOT greater or
equal to the provided bound. Throws if any element of `values` is not a
strict number type or if `lower` is not a strict number type.

**`param`** Lower bound used for range checking

**`throws`** {(RangeAssertionError|TypeArgumentError)} Throws an
RangeAssertionError if the test fails. Throws an TypeArgumentError if
`lower` is not a strict number type.

**`returns`** Returns instance for re-use.

#### Type declaration:

▸ (`lowerIsInclusive`: number): *[Certifier](cert_is.certifier.md)*

**Parameters:**

Name | Type |
------ | ------ |
`lowerIsInclusive` | number |

___

### isLT

• **isLT**: *function*

*Defined in [src/certifier.ts:134](src/certifier.ts#L134)*

Certifies that ALL elements of `values` are less than a provided upper
bound. Throws if any element of `values` is NOT less than the provided
bound. Throws if any element of `values` is not a strict number type or if
`upper` is not a strict number type.

**`param`** Upper bound used for range checking

**`throws`** {(RangeAssertionError|TypeArgumentError)} Throws an
RangeAssertionError if the test fails. Throws an TypeArgumentError if
`upper` is not a strict number type.

**`returns`** Returns instance for re-use.

#### Type declaration:

▸ (`upperExclusive`: number): *[Certifier](cert_is.certifier.md)*

**Parameters:**

Name | Type |
------ | ------ |
`upperExclusive` | number |

___

### isLTE

• **isLTE**: *function*

*Defined in [src/certifier.ts:148](src/certifier.ts#L148)*

Certifies that ALL elements of `values` are less than or equal to a
provided upper bound. Throws if any element of `values` is NOT less than
or equal to the provided bound. Throws if any element of `values` is not a
strict number type or if `upper` is not a strict number type.

**`param`** Upper bound used for range checking

**`throws`** {(RangeAssertionError|TypeArgumentError)} Throws a
RangeAssertionError if the test fails. Throws an TypeArgumentError if
`upper` is not a strict number type.

**`returns`** Returns instance for re-use.

#### Type declaration:

▸ (`upperIsInclusive`: number): *[Certifier](cert_is.certifier.md)*

**Parameters:**

Name | Type |
------ | ------ |
`upperIsInclusive` | number |

___

### isNot

• **isNot**: *function*

*Defined in [src/certifier.ts:59](src/certifier.ts#L59)*

Certifies that All elements of `values` are not strictly equal to any
element of `invalid`. Throws if the ANY element of `values` IS strictly
equal to any invalid value.

**`param`** Prohibited values.

**`throws`** {ValueAssertionError} - Throws an ValueAssertionError if the test fails.

**`returns`** Returns instance for re-use.

#### Type declaration:

▸ (...`invalid`: any): *[Certifier](cert_is.certifier.md)*

**Parameters:**

Name | Type |
------ | ------ |
`...invalid` | any |

___

### isNotType

• **isNotType**: *function*

*Defined in [src/certifier.ts:90](src/certifier.ts#L90)*

Certified that All elements of `values` DO NOT match any type in
`invalidTypes`. Throws if the type of any element of `values` IS strictly
equal to any invalid type. If a given type is a string, checks using
`typeof`. If a given type is a function, checks using instanceof.

**`param`** Prohibited
types.

**`throws`** {(TypeAssertionError|TypeArgumentError)} Throws an
TypeAssertionError if the test fails. Throws an TypeArgumentError if any
element of `prohibitedTypes` is not a string or function.

**`returns`** Returns instance for re-use.

#### Type declaration:

▸ (...`invalidTypes`: Array‹string | [AnyConstructorFunction](../../README.md#anyconstructorfunction)›): *[Certifier](cert_is.certifier.md)*

**Parameters:**

Name | Type |
------ | ------ |
`...invalidTypes` | Array‹string &#124; [AnyConstructorFunction](../../README.md#anyconstructorfunction)› |

___

### isType

• **isType**: *function*

*Defined in [src/certifier.ts:73](src/certifier.ts#L73)*

Certifies that ALL elements of `values` match any type in `validTypes`.
Throws if the type of any element of `values` is NOT strictly equal to
any valid type. If a given type is a string, checks using `typeof`. If a
given type is a function, checks using instanceof.

**`param`** Allowed types.

**`throws`** {(TypeAssertionError|TypeArgumentError)} Throws an
TypeAssertionError if the test fails. Throws an TypeArgumentError if any
element of `validTypes` is not a string or function.

**`returns`** Returns instance for re-use.

#### Type declaration:

▸ (...`validTypes`: Array‹string | [AnyConstructorFunction](../../README.md#anyconstructorfunction)›): *[Certifier](cert_is.certifier.md)*

**Parameters:**

Name | Type |
------ | ------ |
`...validTypes` | Array‹string &#124; [AnyConstructorFunction](../../README.md#anyconstructorfunction)› |

___

### message

• **message**: *function*

*Defined in [src/certifier.ts:37](src/certifier.ts#L37)*

Loads a message into the certifier to provide additional context for
thrown AssertionErrors.

**`returns`** 

#### Type declaration:

▸ (`message`: string): *[Certifier](cert_is.certifier.md)*

Message to load.

**Parameters:**

Name | Type |
------ | ------ |
`message` | string |
