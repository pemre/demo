# Restaurant app with ES6 (ES2015)

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

An example "Favourite Restaurants list with search/filter features" web app using HTML5, ES6 (ECMAScript 6, ES2015), SASS and Gulp. It uses Browserify to bundle your Javascript dependencies so all you have to do is to import them as ES6-style module imports. You can test your code with Mocha/Chai, and be sure that it is "[Standard JS](https://standardjs.com)" using pre-configured ESLint.

## Demo

You can visit: http://rencs.com/demo/restaurant/es6/

## Screenshot
![Screenshot](screenshot.png?raw=true "Screenshot")

## Installation

You need Node.js and npm already installed on your system. If you need help have a look at [https://nodejs.org](https://nodejs.org)

Clone this repo on a terminal:
```
$ git clone https://github.com/pemre/demo.git
```

Get into `restaurant/es6` folder:
```
$ cd demo/restaurant/es6/
```

Install all dependencies:

```
$ npm install
```

After that execute `$ npm run dev`, point your browser to http://localhost:3000 and start adding and editing files in `src` and to change the index file, look at: `public/index.html`.

## Npm Tasks

* `$ npm run dev` - starts Browsersync and serves the app for testing in different browsers (default: http://localhost:3000, Browsersync-UI at http://localhost:3001). After changes on SCSS files and JS files in `src` or HTML files in `public` the index page will be automatically refreshed.
* `$ npm run prod` - activates production mode. It transpiles and minifies your ES6 script files in `src/js` without sourcemaps, creates a package with all imported files as `app.js` in `public/js`. It also compiles your SASS files and copies the result CSS file to `public/css`.
* `$ npm run test` - runs Mocha tests once.
* `$ npm run test:tdd` - activates TDD/BDD (Test/Behaviour Driven Development) mode. Any changes on JS files in `src/js` folder or test files (*.spec.js) in `test` folder will trigger Mocha to start all tests so that you can open a new terminal tab and continue development while all tests are running. You can use Mocha with Chai TDD/BDD assertion styles.

## Features

This project comes with these pre-installed and ready to use features:

- Gulp with ES6-ready (ES2015) gulpfile ([http://gulpjs.com](http://gulpjs.com))
- SASS ([http://sass-lang.com](http://sass-lang.com))
- SASS-MQ (media queries in an elegant way, [https://github.com/sass-mq/sass-mq](https://github.com/sass-mq/sass-mq))
- ES6 (ES2015) via Babel transpiler (use all those shiny new [ES6 Features](http://es6-features.org) now, [https://babeljs.io](https://babeljs.io))
- Browserify (used together with babelify for module loading the new ES6 way via import/export in your JS files)
- Browser-Sync (for synchronised browser testing [http://www.browsersync.io](http://www.browsersync.io))
- Code minification for CSS and JS for production releases
- browserify-shim integration to load unsupported libraries ([browserify-shim-recipes](https://github.com/thlorenz/browserify-shim/wiki/browserify-shim-recipes))
- [Handlebars](http://handlebarsjs.com) template engine. Template files imported from `src/templates` will be compiled and bundled via Browserify/Babel
- [Mocha](https://mochajs.org) test framework with [Chai](http://chaijs.com) assertion library. You can use Chai's [Expect/Should API](http://chaijs.com/api/bdd) for BDD and [Assert API](http://chaijs.com/api/assert) for TDD assertion styles.
- [ESLint](http://eslint.org) pre-configured with [Standard JS](https://standardjs.com) to help you to code with style standards.

## Structure

All source files belong to the `src` folder. The index page itself is served off the `public` folder.

Gulp tasks deploy your compiled and packed styles (one `styles.css`) and scripts (`app.js`) to this public folder either uncompressed with sourcemaps as default or compressed and without sourcemaps for production (use `--production` argument to Gulp tasks).

```bash
.
├── public/
├── src
│   ├── js
│   │   ├── app.js
│   │   ├── helpers/
│   │   └── services/
│   ├── sass/
│   └── templates/
├── test/
├── .babelrc
├── .eslintrc
├── .gitignore
├── gulpfile.babel.js
├── jsconfig.json
├── package.json
├── README.md
└── screenshot.png
```

## Browsers support

| [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" />](http://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE9, IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions

## Q&A

<details>
<summary>
  <b>Why ES6 (ES2015)?</b>
</summary>

For many reasons: Classes, fat arrow functions, generators, promises and the new modules system can be used now using the great **Babel** transpiler that makes them available for ES5 that is supported in all modern browsers. You can check out ES6 [features](http://es6-features.org).
</details>

<details>
<summary>
  <b>Why Standard JS (JavaScript Standard Style)?</b>
</summary>

Shortly; because it brings a standard style to your Javascript files. If you are curious, you should visit Standard JS page for [detailed reasons](https://standardjs.com/index.html#why-should-i-use-javascript-standard-style).
</details>

<details>
<summary>
  <b>How to add new modules and libraries?</b>
</summary>

To add dependencies you can always use npm. If your preferred library is not available as npm package or has no `package.json` file, you can use [napa](https://www.npmjs.com/package/napa) to install such packages from Git or add them manually to `src/vendor`.

But of course your are free to add Bower or jspm or another JS package manager to this project.
</details>

## Reporting Bugs
For bug reports, questions, feature requests, or other suggestions the best way to contact me is to [create an issue][newissue] on GitHub.

[newissue]: https://github.com/pemre/demo/issues/new

## Contributor Guide
Make the plugin better! Join the [contributors] today by submitting a patch! The best way to submit patches is to [fork this project][fork] on GitHub and submit a pull request. But if you are unwilling or unable to use GitHub I will accept patches in any way you can get them to me (JSFiddle, Pastebin, text file, whatever).

[contributors]: https://github.com/pemre/demo/graphs/contributors
[fork]: https://github.com/pemre/demo/fork
