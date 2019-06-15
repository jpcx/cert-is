# Changelog

## <a name="0.3.2"></a> [0.3.2](https://github.com/jpcx/cert-is/tree/0.3.2) (2019-06-14)

| __[Changes since 0.3.1](https://github.com/jpcx/cert-is/compare/0.3.1...0.3.2)__ | [Release Notes](https://github.com/jpcx/cert-is/releases/tag/0.3.2) | [README](https://github.com/jpcx/cert-is/tree/0.3.2/README.md) |
| --- | --- | --- |

| [Source Code (zip)](https://github.com/jpcx/cert-is/archive/0.3.2.zip) | [Source Code (tar.gz)](https://github.com/jpcx/cert-is/archive/0.3.2.tar.gz) |
| --- | --- |

__Bugfixes:__

+ __NPM:__  Removed deep-props package-lock modification script- using npm-force-resolutions only to test GitHub vulnerability scan.
+ __docs:__ Fixed documentationjs fix script.

## <a name="0.3.1"></a> [0.3.1](https://github.com/jpcx/cert-is/tree/0.3.1) (2019-06-14)

| __[Changes since 0.3.0](https://github.com/jpcx/cert-is/compare/0.3.0...0.3.1)__ | [Release Notes](https://github.com/jpcx/cert-is/releases/tag/0.3.1) | [README](https://github.com/jpcx/cert-is/tree/0.3.1/README.md) |
| --- | --- | --- |

| [Source Code (zip)](https://github.com/jpcx/cert-is/archive/0.3.1.zip) | [Source Code (tar.gz)](https://github.com/jpcx/cert-is/archive/0.3.1.tar.gz) |
| --- | --- |

__Bugfixes:__

+ __NPM:__  Fixed vulnerability in 'diff' nested dependency by adding npm-force-resolutions and custom force-resolutions script.
            Cleaned up scripts section.
+ __docs:__ Added hash->tag to scripts/fixREADME.js

## <a name="0.3.0"></a> [0.3.0](https://github.com/jpcx/cert-is/tree/0.3.0) (2019-06-11)

| __[Changes since 0.2.1](https://github.com/jpcx/cert-is/compare/0.2.1...0.3.0)__ | [Release Notes](https://github.com/jpcx/cert-is/releases/tag/0.3.0) | [README](https://github.com/jpcx/cert-is/tree/0.3.0/README.md) |
| --- | --- | --- |

| [Source Code (zip)](https://github.com/jpcx/cert-is/archive/0.3.0.zip) | [Source Code (tar.gz)](https://github.com/jpcx/cert-is/archive/0.3.0.tar.gz) |
| --- | --- |

__Features:__

+ __cert-is:__ Added cert().message for loading custom messages.
               Added private environment variable for Certifier instances.
+ __readme:__  Updated documentation to reflect new feature.

__Bugfixes:__

+ __CHANGELOG:__ Combined duplicate change property bullets.

## <a name="0.2.1"></a> [0.2.1](https://github.com/jpcx/cert-is/tree/0.2.1) (2019-06-11)

| __[Changes since 0.2.0](https://github.com/jpcx/cert-is/compare/0.2.0...0.2.1)__ | [Release Notes](https://github.com/jpcx/cert-is/releases/tag/0.2.1) | [README](https://github.com/jpcx/cert-is/tree/0.2.1/README.md) |
| --- | --- | --- |

| [Source Code (zip)](https://github.com/jpcx/cert-is/archive/0.2.1.zip) | [Source Code (tar.gz)](https://github.com/jpcx/cert-is/archive/0.2.1.tar.gz) |
| --- | --- |

__Bugfixes:__

+ __CHANGELOG:__ Included Error name changes in changelog.
                 Split Features / Bugfixes.
+ __README:__    Added migration notice for 0.1.2 --> 0.2.1.
                 Fixed typo.

## <a name="0.2.0"></a> [0.2.0](https://github.com/jpcx/cert-is/tree/0.2.0) (2019-06-11)

| __[Changes since 0.1.2](https://github.com/jpcx/cert-is/compare/0.1.2...0.2.0)__ | [Release Notes](https://github.com/jpcx/cert-is/releases/tag/0.2.0) | [README](https://github.com/jpcx/cert-is/tree/0.2.0/README.md) |
| --- | --- | --- |

| [Source Code (zip)](https://github.com/jpcx/cert-is/archive/0.2.0.zip) | [Source Code (tar.gz)](https://github.com/jpcx/cert-is/archive/0.2.0.tar.gz) |
| --- | --- |

__Features:__

+ __cert-is:__ All cert() and cert.check() functions return their instance in order to chain functions.
               Changed error naming scheme: CertValueError --> ValueAssertionError, etc.

__Bugfixes:__

+ __NPM:__    Updated own packages. Updated documentationjs packages in order to fix security vulnerability.

## <a name="0.1.2"></a> [0.1.2](https://github.com/jpcx/cert-is/tree/0.1.2) (2018-12-19)

| __[Changes since 0.1.1](https://github.com/jpcx/cert-is/compare/0.1.1...0.1.2)__ | [Release Notes](https://github.com/jpcx/cert-is/releases/tag/0.1.2) | [README](https://github.com/jpcx/cert-is/tree/0.1.2/README.md) |
| --- | --- | --- |

| [Source Code (zip)](https://github.com/jpcx/cert-is/archive/0.1.2.zip) | [Source Code (tar.gz)](https://github.com/jpcx/cert-is/archive/0.1.2.tar.gz) |
| --- | --- |

__Bugfixes:__

+ __CHANGELOG:__ Fixed release dates.

## <a name="0.1.1"></a> [0.1.1](https://github.com/jpcx/cert-is/tree/0.1.1) (2018-12-19)

| __[Changes since 0.1.0](https://github.com/jpcx/cert-is/compare/0.1.0...0.1.1)__ | [Release Notes](https://github.com/jpcx/cert-is/releases/tag/0.1.1) | [README](https://github.com/jpcx/cert-is/tree/0.1.1/README.md) |
| --- | --- | --- |

| [Source Code (zip)](https://github.com/jpcx/cert-is/archive/0.1.1.zip) | [Source Code (tar.gz)](https://github.com/jpcx/cert-is/archive/0.1.1.tar.gz) |
| --- | --- |

__Bugfixes:__

+ __DOCS:__    Fixed a few API parameter names.
+ __README:__  Fixed a misplaced word.
+ __NPM:__     Removed reference to src/index.js.
+ __Package:__ Removed unnecessary file.

## <a name="0.1.0"></a> [0.1.0](https://github.com/jpcx/cert-is/tree/0.1.0) (2018-12-18)

| [Release Notes](https://github.com/jpcx/cert-is/releases/tag/0.1.0) | [README](https://github.com/jpcx/cert-is/blob/0.1.0/README.md) |
| --- | --- |

| [Source Code (zip)](https://github.com/jpcx/cert-is/archive/0.1.0.zip) | [Source Code (tar.gz)](https://github.com/jpcx/cert-is/archive/0.1.0.tar.gz) |
| --- | --- |

__Features:__

+ __cert-is:__ Module created.
