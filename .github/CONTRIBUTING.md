# Welcome to the contributing guide for Voca!

We love contributions from everyone. Thanks for your time and the will to improve Voca.
   
Please note we have a [code of conduct](CONTRIBUTING), please follow it in all your interactions with the project.

### Reporting an issue or suggest a feature

The GitHub issue tracker is the preferred channel for bug reports, change requests and submitting pull
requests.

Make sure to **search for existing issues**. Please check to see if someone
has already reported your problem or requested your idea.  
The bug report must provide at least the following information:

* The expected behavior: how in your opinion the code should behave
* The actual behavior: how the code actually works
* Steps to reproduce: a step by step scenario how to reproduce the problem
* Technical details: useful details like Browser type and version, Operating system, NodeJS version

If you decided to suggest a new feature, please provide detailed description what value it brings and possible use cases. 


### Creating pull requests
Pull requests are great.  
When contributing to this repository, please first discuss the change you wish to make via issue, email to [dmitri@rainsoft.io](email), 
or any other method with the owners of this repository before making a change.

When submitting the request please be sure:

* The pull request passes the CI build
* The modification is accompanied with unit tests
* The necessary updates to documentation are made

# Technical details

Voca codebase stands on the principles of modularity, small specialized functions and meaningful naming. 
Testing is an inseparable part of the library, so every function must be tested in details and have almost 100% code coverage.  


Voca development environment requires Node version 4 and above.  

Fork the repository, then clone it into your project directory.    

Install the development dependencies within Voca source directory:
```bash
npm install
```

1) Build the bundle into `dist/` folder.  
`dist/voca.js` is an [UMD](https://github.com/umdjs/umd) build compatible with CommonJS, RequireJS and Browser globals.  
`dist/voca.min.js` is the minified UMD, production-ready.

```bash
npm run build
```

2) Run the library over the unit tests:
```bash
npm test
```

3) Verify the code coverage:
```bash
npm run coverage
```

4) Check the code using eslint tool:
```bash
npm run eslint
```

[CONTRIBUTING]: https://github.com/panzerdp/voca/blob/master/.github/CONTRIBUTING.md
[email]: mailto:dmitri@rainsoft.io