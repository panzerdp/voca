![Image](https://github.com/panzerdp/voca/raw/master/jsdoc/template/static/images/voca-logo250px.png)

**The ultimate JavaScript string library** [https://vocajs.com](voca)

[![travis build](https://img.shields.io/travis/panzerdp/voca.svg)](https://travis-ci.org/panzerdp/voca)
[![code coverage](https://img.shields.io/codecov/c/github/panzerdp/voca.svg)](https://codecov.io/github/panzerdp/voca)
[![dependencies](https://david-dm.org/panzerdp/voca.svg)](https://david-dm.org/panzerdp/voca)
[![npm package](https://img.shields.io/npm/v/voca.svg)](https://www.npmjs.com/package/voca)

Voca is a JavaScript library for manipulating strings.  

```javascript
v.camelCase('skies of blue');                  // => 'skiesOfBlue'
v.sprintf('I see %s of %s', 'trees', 'green'); // => 'I see trees of green'
v.slugify('What a wonderful world');           // => 'what-a-wonderful-world'
```

The Voca library offers helpful functions to make string manipulations comfortable: *change case, trim, pad, slugifly,
latinise, sprintf'y, truncate, escape* and much more.  The *modular design* allows to load the entire library, or individual  
functions to minimize the application builds. The library is *fully tested*, *well documented* and *long-term supported*.

## Features

*  Provides the complete set of functions to manipulate, chop, format, escape and query strings
*  Includes detailed, easy to read and searchable [documentation](voca)
*  [Supports](https://saucelabs.com/u/panzerdp) a wide range of environments: Node.js 0.10+, Chrome, Firefox, Safari 7+, Edge 13+, IE 9+
*  100% code coverage
*  No dependencies

## Documentation

See the complete documentation at [https://vocajs.com](voca)

## Usage
Voca can be used in various environments.

#### Node.js, Rollup, Browserify
Install the library with npm into your local modules directory:

```bash
npm install voca
```

Then in your application import the entire library:

```javascript
var v = require('voca');
v.trim(' Hello World! ');
// => 'Hello World'
v.sprintf('%s costs $%.2f', 'Coffee', 1.5);
// => 'Coffee costs $1.50'
```

Or individual functions:

```javascript
var words = require('voca/words');
words('welcome to Earth');
// => ['welcome', 'to', 'Earth']
var slugify = require('voca/slugify');
slugify('café latté');
// => 'caffe-latte'
```

#### Browser
Load the UMD builds directly into browser's web page:

* [`dist/voca.min.js`](voca.min.js) minified production-ready 
* [`dist/voca.js`](voca.js) uncompressed with comments 

```html
<script src="voca.js" type="text/javascript"></script>
```

Then a global variable `v` is exposed for the entire library:

```html
<script type="text/javascript">
  v.last('wonderful world', 4);
  // => 'world'
</script>
```

## Bug reports

For bug reports, documentation typos or feature requests feel free to create an [issue](https://github.com/panzerdp/voca/issues).  
Please make sure that the same problem wasn't reported already.

For general usage questions please ask on [StackOverflow](http://stackoverflow.com/questions/ask).

## Contributing

Contribution is welcome!

* Create a pull request containing bug fixes or new features. Include unit tests and keep the code coverage report near 100% 😎
* [Propose](https://github.com/panzerdp/voca/issues) new functions, improvements, better documentation

See more details in [Contributing guide](CONTRIBUTING).

Please note that this project is released with a [Contributor Code of Conduct](CODE_OF_CONDUCT). By participating in this project you agree to abide by its terms.

## Author

[Dmitri Pavlutin](https://rainsoft.io/about-me/)

## License

Licensed under [MIT](https://github.com/panzerdp/voca/blob/master/LICENSE.md)

[CODE_OF_CONDUCT]: https://github.com/panzerdp/voca/blob/master/CODE_OF_CONDUCT.md
[CONTRIBUTING]: https://github.com/panzerdp/voca/blob/master/.github/CONTRIBUTING.md
[voca.min.js]: https://raw.githubusercontent.com/panzerdp/voca/1.0.0-alpha.2/dist/voca.min.js
[voca.js]: https://raw.githubusercontent.com/panzerdp/voca/1.0.0-alpha.2/dist/voca.js
[voca]: https://vocajs.com