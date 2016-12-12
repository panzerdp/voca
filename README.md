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

| Manipulate                           | Query                          | Chop                                 | Case                           | Index                          |
| :----------------------------------- | :----------------------------- | :----------------------------------- | :----------------------------- | :------------------------------|
| [v.insert][insert]                   | [v.endsWith][endsWith]         | [v.charAt][charAt]                   | [v.camelCase][camelCase]       | [v.indexOf][indexOf]           |
| [v.latinise][latinise]               | [v.includes][includes]         | [v.codePointAt][codePointAt]         | [v.capitalize][capitalize]     | [v.lastIndexOf][lastIndexOf]   |
| [v.pad][pad]                         | [v.isAlpha][isAlpha]           | [v.first][first]                     | [v.decapitalize][decapitalize] | [v.search][search]             |
| [v.padLeft][padLeft]                 | [v.isAlphaDigit][isAlphaDigit] | [v.graphemeAt][graphemeAt]           | [v.kebabCase][kebabCase]       | **Escape**                     |
| [v.padRight][padRight]               | [v.isBlank][isBlank]           | [v.last][last]                       | [v.lowerCase][lowerCase]       | [v.escapeHtml][escapeHtml]     |
| [v.repeat][repeat]                   | [v.isDigit][isDigit]           | [v.prune][prune]                     | [v.snakeCase][snakeCase]       | [v.escapeRegExp][escapeRegExp] |
| [v.replace][replace]                 | [v.isEmpty][isEmpty]           | [v.slice][slice]                     | [v.upperCase][upperCase]       | [v.unescapeHtml][unescapeHtml] |
| [v.replaceAll][replaceAll]           | [v.isLowerCase][isLowerCase]   | [v.substr][substr]                   | **Split**                      |                                | 
| [v.reverse][reverse]                 | [v.isNumeric][isNumeric]       | [v.substring][substring]             | [v.chars][chars]               |                                |
| [v.reverseGrapheme][reverseGrapheme] | [v.isString][isString]         | [v.truncate][truncate]               | [v.codePoints][codePoints]     |                                |
| [v.slugify][slugify]                 | [v.isUpperCase][isUpperCase]   | **Count**                            | [v.graphemes][graphemes]       |                                |
| [v.splice][splice]                   | [v.matches][matches]           | [v.count][count]                     | [v.split][split]               |                                |
| [v.trim][trim]                       | [v.startsWith][startsWith]     | [v.countGraphemes][countGraphemes]   | [v.words][words]               |                                |
| [v.trimLeft][trimLeft]               | **Format**                     | [v.countSubstrings][countSubstrings] |                                |                                |
| [v.trimRight][trimRight]             | [v.sprintf][sprintf]           | [v.countWhere][countWhere]           |                                |                                |
| [v.wordWrap][wordWrap]               | [v.vprintf][vprintf]           | [v.countWords][countWords]           |                                |                                |

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

[camelCase]: https://vocajs.com/#camelCase
[capitalize]: https://vocajs.com/#capitalize
[decapitalize]: https://vocajs.com/#decapitalize
[kebabCase]: https://vocajs.com/#kebabCase
[lowerCase]: https://vocajs.com/#lowerCase
[snakeCase]: https://vocajs.com/#snakeCase
[upperCase]: https://vocajs.com/#upperCase

[charAt]: https://vocajs.com/#charAt
[codePointAt]: https://vocajs.com/#codePointAt
[first]: https://vocajs.com/#first
[graphemeAt]: https://vocajs.com/#graphemeAt
[last]: https://vocajs.com/#last
[prune]: https://vocajs.com/#prune
[slice]: https://vocajs.com/#slice
[substr]: https://vocajs.com/#substr
[substring]: https://vocajs.com/#substring
[truncate]: https://vocajs.com/#truncate

[count]: https://vocajs.com/#count
[countGraphemes]: https://vocajs.com/#countGraphemes
[countSubstrings]: https://vocajs.com/#countSubstrings
[countWhere]: https://vocajs.com/#countWhere
[countWords]: https://vocajs.com/#countWords

[escapeHtml]: https://vocajs.com/#escapeHtml
[escapeRegExp]: https://vocajs.com/#escapeRegExp
[unescapeHtml]: https://vocajs.com/#unescapeHtml

[sprintf]: https://vocajs.com/#sprintf
[vprintf]: https://vocajs.com/#vprintf

[indexOf]: https://vocajs.com/#indexOf
[lastIndexOf]: https://vocajs.com/#lastIndexOf
[search]: https://vocajs.com/#search

[insert]: https://vocajs.com/#insert
[latinise]: https://vocajs.com/#latinise
[pad]: https://vocajs.com/#pad
[padLeft]: https://vocajs.com/#padLeft
[padRight]: https://vocajs.com/#padRight
[repeat]: https://vocajs.com/#repeat
[replace]: https://vocajs.com/#replace
[replaceAll]: https://vocajs.com/#replaceAll
[reverse]: https://vocajs.com/#reverse
[reverseGrapheme]: https://vocajs.com/#reverseGrapheme
[slugify]: https://vocajs.com/#slugify
[splice]: https://vocajs.com/#splice
[trim]: https://vocajs.com/#trim
[trimLeft]: https://vocajs.com/#trimLeft
[trimRight]: https://vocajs.com/#trimRight
[wordWrap]: https://vocajs.com/#wordWrap

[endsWith]: https://vocajs.com/#endsWith
[includes]: https://vocajs.com/#includes
[isAlpha]: https://vocajs.com/#isAlpha
[isAlphaDigit]: https://vocajs.com/#isAlphaDigit
[isBlank]: https://vocajs.com/#isBlank
[isDigit]: https://vocajs.com/#isDigit
[isEmpty]: https://vocajs.com/#isEmpty
[isLowerCase]: https://vocajs.com/#isLowerCase
[isNumeric]: https://vocajs.com/#isNumeric
[isString]: https://vocajs.com/#isString
[isUpperCase]: https://vocajs.com/#isUpperCase
[matches]: https://vocajs.com/#matches
[startsWith]: https://vocajs.com/#startsWith

[chars]: https://vocajs.com/#chars
[codePoints]: https://vocajs.com/#codePoints
[graphemes]: https://vocajs.com/#graphemes
[split]: https://vocajs.com/#split
[words]: https://vocajs.com/#words