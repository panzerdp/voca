# [![Voca JavaScript library logo][logo]][voca]

[![travis build](https://img.shields.io/travis/panzerdp/voca.svg)](https://travis-ci.org/panzerdp/voca)
[![code coverage](https://img.shields.io/codecov/c/github/panzerdp/voca.svg)](https://codecov.io/github/panzerdp/voca)
[![dependencies](https://david-dm.org/panzerdp/voca.svg)](https://david-dm.org/panzerdp/voca)
[![npm package](https://img.shields.io/npm/v/voca.svg)](https://www.npmjs.com/package/voca)

Voca is a JavaScript library for manipulating strings. [https://vocajs.com][voca]

```javascript
v.camelCase('bird flight');              // => 'birdFlight'
v.sprintf('%s costs $%.2f', 'Tea', 1.5); // => 'Tea costs $1.50'
v.slugify('What a wonderful world');     // => 'what-a-wonderful-world'
```

The Voca library offers helpful functions to make string manipulations comfortable: *change case, trim, pad, slugifly,
latinise, sprintf'y, truncate, escape* and much more.  The *modular design* allows to load the entire library, or
individual functions to minimize the application builds. The library is *fully tested*, *well documented* and *long-term supported*.

## Features

*  Provides the complete set of functions to manipulate, chop, format, escape and query strings
*  Includes detailed, easy to read and searchable [documentation][voca]
*  [Supports](https://saucelabs.com/u/panzerdp) a wide range of environments: Node.js 0.10+, Chrome, Firefox, Safari 7+, Edge 13+, IE 9+
*  100% code coverage
*  No dependencies

## Documentation

See the complete documentation at [https://vocajs.com][voca]

## Usage
Voca can be used in various environments.

### Node.js, Rollup, Webpack, Browserify

![Voca JavaScript library supports Node.js, Rollup, Webpack, Browserify][logo_commonjs]

Install the library with npm into your local modules directory:

```bash
npm install voca
```

Then in your application import the entire library:

```javascript
var v = require('voca');
v.trim(' Hello World! ');            // => 'Hello World'
v.sprintf('%d red %s', 3, 'apples'); // => '3 red apples'
```

Or individual functions:

```javascript
var words = require('voca/words');
var slugify = require('voca/slugify');
words('welcome to Earth'); // => ['welcome', 'to', 'Earth']
slugify('café latté');     // => 'caffe-latte'
```

### Browser

![Voca JavaScript library supports Chrome, Firefox, Safari, Edge, Internet Explorer][logo_browsers]

Load the UMD builds directly into browser's web page:

* [`dist/voca.min.js`][voca_min_js] minified production-ready 
* [`dist/voca.js`][voca_js] uncompressed with comments 

```html
<script src="voca.js" type="text/javascript"></script>
```

Then a global variable `v` is exposed for the entire library:

```html
<script type="text/javascript">
  v.last('wonderful world', 4); // => 'world'
</script>
```

## Functions

| Manipulate        | Query            | Chop              | Case           | Index          |
| :---------------- | :--------------- | :---------------- | :------------- | :------------- |
| v.insert          | v.endsWith       | v.charAt          | v.camelCase    | v.indexOf      |
| v.latinise        | v.includes       | v.codePointAt     | v.capitalize   | v.lastIndexOf  |
| v.pad             | v.isAlpha        | v.first           | v.decapitalize | v.search       |
| v.padLeft         | v.isAlphaDigit   | v.graphemeAt      | v.kebabCase    | **Escape**     |
| v.padRight        | v.isBlank        | v.last            | v.lowerCase    | v.escapeHtml   |
| v.repeat          | v.isDigit        | v.prune           | v.snakeCase    | v.escapeRegExp |
| v.replace         | v.isEmpty        | v.slice           | v.upperCase    | v.unescapeHtml |
| v.replaceAll      | v.isLowerCase    | v.substr          | **Split**      |                | 
| v.reverse         | v.isNumeric      | v.substring       | v.chars        |                |
| v.reverseGrapheme | v.isString       | v.truncate        | v.codePoints   |                |
| v.slugify         | v.isUpperCase    | **Count**         | v.graphemes    |                |
| v.splice          | v.matches        | v.count           | v.split        |                |
| v.trim            | v.startsWith     | v.countGraphemes  | v.words        |                |
| v.trimLeft        | **Format**       | v.countSubstrings |                |                |
| v.trimRight       | v.sprintf        | v.countWhere      |                |                |
| v.wordWrap        | v.vprintf        | v.countWords      |                |                |

## Bug reports

For bug reports, documentation typos or feature requests feel free to create an [issue](https://github.com/panzerdp/voca/issues).  
Please make sure that the same problem wasn't reported already.

For general usage questions please ask on [StackOverflow](http://stackoverflow.com/questions/ask).

## Contributing

Contribution is welcome!

* Create a pull request containing bug fixes or new features. Include unit tests and keep the code coverage report near 100% 😎
* [Propose](https://github.com/panzerdp/voca/issues) new functions, improvements, better documentation

See more details in [Contributing guide][CONTRIBUTING].

Please note that this project is released with a Contributor [Code of Conduct][CODE_OF_CONDUCT]. By participating in this project you agree to abide by its terms.

## Author

| ![Dmitri Pavlutin](https://s.gravatar.com/avatar/7be6b604e5d3c6a82ed933dd90ed68dc?s=100) |
| :-: |
| [Dmitri Pavlutin](https://rainsoft.io/about-me/) |
| [@panzerdp](https://twitter.com/panzerdp) |
| [dmitri@rainsoft.io](mailto:dmitri@rainsoft.io) |

## License

Licensed under [MIT](https://github.com/panzerdp/voca/blob/master/LICENSE.md)

[CODE_OF_CONDUCT]: https://github.com/panzerdp/voca/blob/master/CODE_OF_CONDUCT.md
[CONTRIBUTING]: https://github.com/panzerdp/voca/blob/master/.github/CONTRIBUTING.md
[voca_min_js]: https://raw.githubusercontent.com/panzerdp/voca/1.0.0-alpha.3/dist/voca.min.js
[voca_js]: https://raw.githubusercontent.com/panzerdp/voca/1.0.0-alpha.3/dist/voca.js
[voca]: https://vocajs.com
[logo]: https://github.com/panzerdp/voca/raw/master/jsdoc/template/static/images/voca-logo@300px.png
[logo_commonjs]: https://github.com/panzerdp/voca/raw/master/jsdoc/template/static/images/commonjs@200px.png
[logo_browsers]: https://github.com/panzerdp/voca/raw/master/jsdoc/template/static/images/browsers@200px.png