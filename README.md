![Image](https://github.com/panzerdp/voca/raw/master/jsdoc/template/static/images/voca-logo250px.png)

**The ultimate JavaScript string library** [https://vocajs.com](https://vocajs.com)

[![travis build](https://img.shields.io/travis/panzerdp/voca.svg)](https://travis-ci.org/panzerdp/voca)
[![code coverage](https://img.shields.io/codecov/c/github/panzerdp/voca.svg)](https://codecov.io/github/panzerdp/voca)
[![sauce test status](https://saucelabs.com/buildstatus/panzerdp)](https://saucelabs.com/u/panzerdp)
[![dependencies](https://david-dm.org/panzerdp/voca.svg)](https://david-dm.org/panzerdp/voca)

## Features

*  Provides the complete set of functions to manipulate, chop, format, escape and query strings
*  Covered by detailed and comfortable [documentation](https://vocajs.com)
*  Supports a wide range of environments: Chrome, Firefox, Safari 7+, IE 9+, NodeJS 0.10+
*  100% code coverage
*  No dependencies

## Documentation

See the complete documentation at [https://vocajs.com](https://vocajs.com)

## Usage
Voca can be used in various environments.

#### Node.js, Rollup, Browserify
Install the library with npm into your local modules directory:

```bash
npm install voca
```

Then use the CommonJS format:
```javascript
var v = require('voca');
v.trim(' Hello World! ');
// => 'Hello World!'
v.sprintf('%s costs $%.2f', 'Coffee', 1.5);
// => 'Coffee costs $1.50'

var words = require('voca/words');
words('welcome to Earth');
// => ['welcome', 'to', 'Earth']
```

Or use the ES2015 import format:

```javascript
import v from 'voca';
v.trim(' Hello World! ');
// => 'Hello World'
v.sprintf('%s costs $%.2f', 'Coffee', 1.5);
// => 'Coffee costs $1.50'

import words from 'voca/words';
words('welcome to Earth');
// => ['welcome', 'to', 'Earth']
```

#### Browser
Use `dist/voca.js` or `dist/voca.min.js` builds to load the library directly into Browser's web page:

```html
<script src="path-to-scripts/voca.js" type="text/javascript"></script>
```

Then a global variable `v` is exposed:

```html
<script type="text/javascript">
  v.isBlank('  ');
  // => true
</script>
```

## Bug reports

For bug reports, documentation typos or feature requests feel free to create an [issue](https://github.com/panzerdp/voca/issues).
Before filling an issue, make sure that someone didn't report the same problem already.

For general usage questions please ask on [StackOverflow](http://stackoverflow.com/questions/ask).

## Contribution

Contribution is welcome!

You can do this by:
* Create a pull request containing bug fixes or new features. Include unit tests and keep the code coverage report near 100% (yep, perfectionism 😎)
* Propose new functions, improvements, better documentation

## Development

Visit the [development section](https://github.com/panzerdp/voca/blob/master/markdown/DEVELOPMENT.md) to find more details.


## Author

[Dmitri Pavlutin](https://rainsoft.io/about-me/)

## License

Licensed under the [MIT License](https://github.com/panzerdp/voca/blob/master/markdown/LICENSE)