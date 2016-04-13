# Voca

![Image](jsdoc/template/static/images/voca-logo250px.png)

**The ultimate JavaScript string library.**

## Scope

[Voca](http://vocajs.com) provides the full set of methods for working with **strings** in JavaScript. The main benefits:  

*  Contains a complete set of methods for strings manipulation, format and query
*  100% test coverage
*  Comfortable [documentation](http://vocajs.com)
*  Provides modularity and clean code

## Documentation

See the detailed [documentation](http://vocajs.com) on [vocajs.com](http://vocajs.com)

## Usage
Voca can be used in various environments.  

#### Node.js, browserify or rollup
Install the library using npm into your local modules directory:

```
npm install --save voca
```

Then use the commonjs format:
```
// Get the entire library
var v = require('voca');

v.trim(' Hello World! ');
// => 'Hello World!'

// Get a single method (work in progress...)
var isAlpha = require('voca/is_alpha');

isAlpha('earth');
// => true
```

Or use the ECMAScript 6 import format:

```
// Get the entire library
import v from 'voca';

v.trim(' Hello World! ');
// => 'Hello World'

// Get a list of methods
import {trimLeft as tl, isDigit} from 'voca';

tl(' moon');
// => 'moon'
isDigit('340');
// => true

// Get a single method (work in progress...)
import isAlpha from 'voca/is_alpha';

isAlpha('welcome');
// => true
```

#### Browser
Use a `script` tag to load the library into a web page:

```
<script src="path-to-scripts/voca.js" type="text/javascript"></script>
```

Then a global variable `v` is exposed:

```
<script type="text/javascript">
  v.isBlank('  ');
  // => true
</script>
```

## Bug report or question

If you found a problem in the source code or documentation do not hesitate to create an [issue](https://github.com/panzerdp/voca/issues). 
Before filling an issue make sure that someone didn't report it already.
For general usage questions a better place is to ask on [StackOverflow](http://stackoverflow.com/questions/ask).

## Contribution

Contribution is always welcome. You can do this by:

* Create a pull request with bug fixes or new features. Include the unit tests (of course library should pass them) and keep the coverage report at 100%
* [Create an issue](https://github.com/panzerdp/voca/issues) with a bug report or improvement idea
* Suggest better documentation

## Development

Clone the repo into your project directory.  
Then install the development dependencies within Voca source directory:

```
npm install
```

Build the bundle into `dist/` folder. 
`dist/voca.js` is an [UMD](https://github.com/umdjs/umd) build compatible with CommonJS, RequireJS and browser globals.   
`dist/voca.es6.js` is an [ES6 module format](https://github.com/rollup/rollup/wiki/jsnext:main) build.  

```
npm run build
```

Unit test the library:
```
npm test
```

Verify the test coverage:
```
npm run coverage
```

Check the code using eslint tool:
```
npm run eslint
``` 

## Author

[Dmitri Pavlutin](http://rainsoft.io/about-me/)

## License

Licensed under the [MIT License](LICENCE)

