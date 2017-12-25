# [![Voca JavaScript library logo][logo]][voca]

[![travis build](https://img.shields.io/travis/panzerdp/voca.svg)](https://travis-ci.org/panzerdp/voca)
[![code coverage](https://img.shields.io/codecov/c/github/panzerdp/voca.svg)](https://codecov.io/github/panzerdp/voca)
[![npm package](https://img.shields.io/npm/v/voca.svg)](https://www.npmjs.com/package/voca)

Voca is a JavaScript library for manipulating strings. [https://vocajs.com][voca]

```javascript
v.camelCase('bird flight');              // => 'birdFlight'
v.sprintf('%s costs $%.2f', 'Tea', 1.5); // => 'Tea costs $1.50'
v.slugify('What a wonderful world');     // => 'what-a-wonderful-world'
```

The Voca library offers helpful functions to make string manipulations comfortable: *change case, trim, pad, slugify,
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

### CommonJS modules

Then in your application require the entire library:

```javascript
var v = require('voca');
v.trim(' Hello World! ');            // => 'Hello World'
v.sprintf('%d red %s', 3, 'apples'); // => '3 red apples'
```

Or require individual functions:

```javascript
var words = require('voca/words');
var slugify = require('voca/slugify');
words('welcome to Earth'); // => ['welcome', 'to', 'Earth']
slugify('caffé latté');    // => 'caffe-latte'
```

### ES2015 modules

Voca is compatible with ES2015 modules to import the entire library:

```javascript
import voca from 'voca';
voca.kebabCase('goodbye blue sky'); // => 'goodbye-blue-sky'
```

Or import individual functions:

```javascript
import last from 'voca/last';
last('sun rises', 5); // => 'rises'
```

### Browser

![Voca JavaScript library supports Chrome, Firefox, Safari, Edge, Internet Explorer][logo_browsers]

Load the UMD builds directly into browser's web page:

* [`dist/voca.min.js`][voca_min_js] minified production-ready, with [source map][source_map] 
* [`dist/voca.js`][voca_js] uncompressed with comments

```html
<script src="voca.js" type="text/javascript"></script>
```

Then a global variable `v` is exposed for the entire library:

```html
<script type="text/javascript">
  v.last('wonderful world', 5); // => 'world'
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
| [v.replace][replace]                 | [v.isEmpty][isEmpty]           | [v.slice][slice]                     | [v.swapCase][swapCase]         | [v.unescapeHtml][unescapeHtml] |
| [v.replaceAll][replaceAll]           | [v.isLowerCase][isLowerCase]   | [v.substr][substr]                   | [v.titleCase][titleCase]       | **Strip**                      | 
| [v.reverse][reverse]                 | [v.isNumeric][isNumeric]       | [v.substring][substring]             | [v.upperCase][upperCase]       |  [v.stripBom][stripBom]        |
| [v.reverseGrapheme][reverseGrapheme] | [v.isString][isString]         | [v.truncate][truncate]               | **Split**                      |  [v.stripTags][stripTags]      |
| [v.slugify][slugify]                 | [v.isUpperCase][isUpperCase]   | **Count**                            | [v.chars][chars]               |                                |
| [v.splice][splice]                   | [v.matches][matches]           | [v.count][count]                     | [v.codePoints][codePoints]     |                                |
| [v.tr][tr]                           | [v.startsWith][startsWith]     | [v.countGraphemes][countGraphemes]   | [v.graphemes][graphemes]       |                                |
| [v.trim][trim]                       | **Format**                     | [v.countSubstrings][countSubstrings] | [v.split][split]               |                                |
| [v.trimLeft][trimLeft]               | [v.sprintf][sprintf]           | [v.countWhere][countWhere]           | [v.words][words]               |                                |
| [v.trimRight][trimRight]             | [v.vprintf][vprintf]           | [v.countWords][countWords]           |                                |                                |
| [v.wordWrap][wordWrap]               |                                |                                      |                                |                                |

## Bug reports

For bug reports, documentation typos or feature requests feel free to create an [issue](https://github.com/panzerdp/voca/issues).  
Please make sure that the same problem wasn't reported already.

For general usage questions please ask on [StackOverflow](http://stackoverflow.com/questions/ask).

## Contributing

Contribution is welcome!

* Create a pull request containing bug fixes or new features. Include unit tests and keep the code coverage report near 100% 😎
* [Propose](https://github.com/panzerdp/voca/issues/new) new functions, improvements, better documentation

See more details in [Contributing guide][CONTRIBUTING].

Please note that this project is released with a Contributor [Code of Conduct][CODE_OF_CONDUCT]. By participating in this project you agree to abide by its terms.

## Author

| ![Dmitri Pavlutin](https://s.gravatar.com/avatar/7be6b604e5d3c6a82ed933dd90ed68dc?s=100) |
| :-: |
| [@panzerdp](https://twitter.com/panzerdp) 


## License

Licensed under [MIT](https://github.com/panzerdp/voca/blob/master/LICENSE.md)

[CODE_OF_CONDUCT]: https://github.com/panzerdp/voca/blob/master/CODE_OF_CONDUCT.md
[CONTRIBUTING]: https://github.com/panzerdp/voca/blob/master/.github/CONTRIBUTING.md
[voca_min_js]: https://raw.githubusercontent.com/panzerdp/voca/1.4.0/dist/voca.min.js
[source_map]: https://raw.githubusercontent.com/panzerdp/voca/1.4.0/dist/voca.min.js.map
[voca_js]: https://raw.githubusercontent.com/panzerdp/voca/1.4.0/dist/voca.js
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
[swapCase]: https://vocajs.com/#swapCase
[titleCase]: https://vocajs.com/#titleCase
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
[tr]: https://vocajs.com/#tr
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

[stripTags]: https://vocajs.com/#stripTags
[stripBom]: https://vocajs.com/#stripBom