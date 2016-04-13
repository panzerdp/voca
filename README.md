# Voca

![Image](jsdoc/template/static/images/voca-logo250px.png)

**The ultimate JavaScript string library.**

**Warning(!) The library is a work in progress.**

## Scope

[Voca](http://vocajs.com) provides the full set of methods for working with strings in JavaScript. The main benefits:  

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