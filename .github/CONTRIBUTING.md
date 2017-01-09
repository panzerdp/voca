# Welcome to the contributing guide for Voca!

We love contributions from everyone. Thanks for your time and the will to improve Voca.

Please note we have a [code of conduct][CODE_OF_CONDUCT], please follow it in all your interactions with the project.

### Reporting an issue or suggest a feature

The GitHub issue tracker is the preferred channel for bug reports, change requests and submitting pull
requests.

Before submitting one, make sure to **search for existing issues**. Please check to see if someone has already 
reported your problem or requested your idea.

The bug report must provide at least the following information:

* *The expected behavior:* how in your opinion the code should behave
* *The actual behavior:* how the code actually works
* *Steps to reproduce:* a step by step scenario how to reproduce the problem
* *Technical details:* useful info like browser type and version, Operating system, NodeJS version and other

Suggesting new features is welcomed :clap:. Additionally to your idea, please provide detailed description what value it 
brings and possible use cases.

### Creating pull requests
Pull requests are great :+1:.  
When contributing to this repository, please **first discuss the change** you wish to make via issue, email to [dmitri@rainsoft.io][email],
or any other method with the owners of this repository before making a change.

When submitting the request please be sure:

* The pull request *to pass the CI build*
* The modification to be *accompanied with unit tests*
* The necessary *updates to documentation* are made

# Voca development

Voca codebase stands on the principles of modularity, [small specialized functions][small-functions] and meaningful naming.  
Testing is an inseparable part of the library, so every function must be tested in details and have almost 100% code coverage.

### Requirements

The library development environment requires Node **version 4** and above.  
[nvm](https://github.com/creationix/nvm) is a great tool to manage Node versions.

### Configuring dev environment

Fork the repository, then clone it into your project directory.

Install the development dependencies within Voca source directory:
```bash
npm install
```

The most important development tools are:

* [Babel](https://babeljs.io/) to transform ES2015 code into ES5
* [Rollup](http://rollupjs.org/) to bundle ES2015 modules into a single file
* [ESlint](http://eslint.org/) for JavaScript code linting
* [Mocha](https://mochajs.org/) the JavaScript test framework
* [Istanbul](https://github.com/gotwarlost/istanbul) for code coverage report.

### Building

To build the bundles from the source code simply run:

```bash
npm run build
```

The command generates the following bundles:

* `dist/voca.js` compiled ES5 bundle, in [UMD](https://github.com/umdjs/umd) format compatible with CommonJS, RequireJS and Browser globals
* `dist/voca.min.js` compiled and minified ES5 bundle, also in [UMD](https://github.com/umdjs/umd) format. `dist/voca.min.js.map` contains the source maps
* `dist_mod/index.js` compiled ES5 bundle in CommonJS format ready for NodeJS usage. `dist_mod/*.js` contains individual functions in CommonJS format.

### Testing

Voca uses Mocha test framework.

The detailed testing is very important. Every function or part of the library must be tested with basic and advanced scenarios.  
Tests must keep the same useful rules of modularity and clean code.

Run the library over the unit tests:
```bash
npm test
```

The library must be compatible with reasonable older browser. The CI build [verifies using SauceLabs](https://saucelabs.com/u/panzerdp)
the compatibility with Chrome, Firefox, Edge 13+, IE 9+ and Safari 7+.  

To verify the code coverage run the command:
```bash
npm run coverage
```

### Linting

Ease comes from readability. Readability comes from keeping the code quality and standards. The library uses many style 
ideas from [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).  

To maintain the coding style, the pre-commit hook automatically is linting the code.   

You can find the linting rules in [.eslintrc][eslintrc] file.

To check the code using eslint tool run the command:
```bash
npm run eslint
```

### Documentation

The library uses [JSDoc](http://usejsdoc.org/) tool to automatically generate documentation from source code comments.

To generate the documentation, use the following command:

```bash
npm run jsdoc
```

Then open in browser the documentation html file `./docs/index.html`.

[CONTRIBUTING]: https://github.com/panzerdp/voca/blob/master/.github/CONTRIBUTING.md
[CODE_OF_CONDUCT]: https://github.com/panzerdp/voca/blob/master/CODE_OF_CONDUCT.md
[email]: mailto:dmitri@rainsoft.io
[eslintrc]: https://github.com/panzerdp/voca/blob/master/.eslintrc
[small-functions]: https://rainsoft.io/the-art-of-writing-small-and-plain-functions/