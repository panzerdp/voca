# [![Voca JavaScript library logo][logo]][voca]

[![travis build](https://img.shields.io/travis/panzerdp/voca.svg)](https://travis-ci.org/panzerdp/voca)
[![code coverage](https://img.shields.io/codecov/c/github/panzerdp/voca.svg)](https://codecov.io/github/panzerdp/voca)
[![npm package](https://img.shields.io/npm/v/voca.svg)](https://www.npmjs.com/package/voca)

Voca is a JavaScript library for manipulating strings. [https://vocajs.pages.dev][voca]

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

See the complete documentation at [https://vocajs.pages.dev][voca]

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
const v = require('voca');
v.trim(' Hello World! ');            // => 'Hello World'
v.sprintf('%d red %s', 3, 'apples'); // => '3 red apples'
```

Or require individual functions:

```javascript
const words = require('voca/words');
const slugify = require('voca/slugify');
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

| ![Dmitri Pavlutin](https://s.gravatar.com/avatar/0d57a57d8807ebc70e24b46f6d9e3a36?s=100) |
| :-: |
| Dmitri Pavlutin
| [Personal blog](https://dmitripavlutin.com)
| [Email](mailto:dmitripavlutin@gmail.com)

## License

Licensed under [MIT](https://github.com/panzerdp/voca/blob/master/LICENSE.md)

[CODE_OF_CONDUCT]: https://github.com/panzerdp/voca/blob/master/CODE_OF_CONDUCT.md
[CONTRIBUTING]: https://github.com/panzerdp/voca/blob/master/.github/CONTRIBUTING.md
[voca_min_js]: https://raw.githubusercontent.com/panzerdp/voca/v1.4.0/dist/voca.min.js
[source_map]: https://raw.githubusercontent.com/panzerdp/voca/v1.4.0/dist/voca.min.js.map
[voca_js]: https://raw.githubusercontent.com/panzerdp/voca/v1.4.0/dist/voca.js
[voca]: https://vocajs.pages.dev
[logo]: https://github.com/panzerdp/voca/raw/master/jsdoc/template/static/images/voca-logo@300px.png
[logo_commonjs]: https://github.com/panzerdp/voca/raw/master/jsdoc/template/static/images/commonjs@200px.png
[logo_browsers]: https://github.com/panzerdp/voca/raw/master/jsdoc/template/static/images/browsers@200px.png

[camelCase]: https://vocajs.pages.dev/#camelCase
[capitalize]: https://vocajs.pages.dev/#capitalize
[decapitalize]: https://vocajs.pages.dev/#decapitalize
[kebabCase]: https://vocajs.pages.dev/#kebabCase
[lowerCase]: https://vocajs.pages.dev/#lowerCase
[snakeCase]: https://vocajs.pages.dev/#snakeCase
[swapCase]: https://vocajs.pages.dev/#swapCase
[titleCase]: https://vocajs.pages.dev/#titleCase
[upperCase]: https://vocajs.pages.dev/#upperCase

[charAt]: https://vocajs.pages.dev/#charAt
[codePointAt]: https://vocajs.pages.dev/#codePointAt
[first]: https://vocajs.pages.dev/#first
[graphemeAt]: https://vocajs.pages.dev/#graphemeAt
[last]: https://vocajs.pages.dev/#last
[prune]: https://vocajs.pages.dev/#prune
[slice]: https://vocajs.pages.dev/#slice
[substr]: https://vocajs.pages.dev/#substr
[substring]: https://vocajs.pages.dev/#substring
[truncate]: https://vocajs.pages.dev/#truncate

[count]: https://vocajs.pages.dev/#count
[countGraphemes]: https://vocajs.pages.dev/#countGraphemes
[countSubstrings]: https://vocajs.pages.dev/#countSubstrings
[countWhere]: https://vocajs.pages.dev/#countWhere
[countWords]: https://vocajs.pages.dev/#countWords

[escapeHtml]: https://vocajs.pages.dev/#escapeHtml
[escapeRegExp]: https://vocajs.pages.dev/#escapeRegExp
[unescapeHtml]: https://vocajs.pages.dev/#unescapeHtml

[sprintf]: https://vocajs.pages.dev/#sprintf
[vprintf]: https://vocajs.pages.dev/#vprintf

[indexOf]: https://vocajs.pages.dev/#indexOf
[lastIndexOf]: https://vocajs.pages.dev/#lastIndexOf
[search]: https://vocajs.pages.dev/#search

[insert]: https://vocajs.pages.dev/#insert
[latinise]: https://vocajs.pages.dev/#latinise
[pad]: https://vocajs.pages.dev/#pad
[padLeft]: https://vocajs.pages.dev/#padLeft
[padRight]: https://vocajs.pages.dev/#padRight
[repeat]: https://vocajs.pages.dev/#repeat
[replace]: https://vocajs.pages.dev/#replace
[replaceAll]: https://vocajs.pages.dev/#replaceAll
[reverse]: https://vocajs.pages.dev/#reverse
[reverseGrapheme]: https://vocajs.pages.dev/#reverseGrapheme
[slugify]: https://vocajs.pages.dev/#slugify
[splice]: https://vocajs.pages.dev/#splice
[tr]: https://vocajs.pages.dev/#tr
[trim]: https://vocajs.pages.dev/#trim
[trimLeft]: https://vocajs.pages.dev/#trimLeft
[trimRight]: https://vocajs.pages.dev/#trimRight
[wordWrap]: https://vocajs.pages.dev/#wordWrap

[endsWith]: https://vocajs.pages.dev/#endsWith
[includes]: https://vocajs.pages.dev/#includes
[isAlpha]: https://vocajs.pages.dev/#isAlpha
[isAlphaDigit]: https://vocajs.pages.dev/#isAlphaDigit
[isBlank]: https://vocajs.pages.dev/#isBlank
[isDigit]: https://vocajs.pages.dev/#isDigit
[isEmpty]: https://vocajs.pages.dev/#isEmpty
[isLowerCase]: https://vocajs.pages.dev/#isLowerCase
[isNumeric]: https://vocajs.pages.dev/#isNumeric
[isString]: https://vocajs.pages.dev/#isString
[isUpperCase]: https://vocajs.pages.dev/#isUpperCase
[matches]: https://vocajs.pages.dev/#matches
[startsWith]: https://vocajs.pages.dev/#startsWith

[chars]: https://vocajs.pages.dev/#chars
[codePoints]: https://vocajs.pages.dev/#codePoints
[graphemes]: https://vocajs.pages.dev/#graphemes
[split]: https://vocajs.pages.dev/#split
[words]: https://vocajs.pages.dev/#words

[stripTags]: https://vocajs.pages.dev/#stripTags
[stripBom]: https://vocajs.pages.dev/#stripBom