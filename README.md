# templates [![NPM version](https://img.shields.io/npm/v/templates.svg?style=flat)](https://www.npmjs.com/package/templates) [![NPM monthly downloads](https://img.shields.io/npm/dm/templates.svg?style=flat)](https://npmjs.org/package/templates) [![NPM total downloads](https://img.shields.io/npm/dt/templates.svg?style=flat)](https://npmjs.org/package/templates) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/templates.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/templates) [![Windows Build Status](https://img.shields.io/appveyor/ci/jonschlinkert/templates.svg?style=flat&label=AppVeyor)](https://ci.appveyor.com/project/jonschlinkert/templates)

> System for creating and managing template collections, and rendering templates with any node.js template engine. Can be used as the basis for creating a static site generator or blog framework.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

- [Install](#install)
- [Usage](#usage)
- [API](#api)
  * [Templates (App)](#templates-app)
  * [Collection](#collection)
- [About](#about)

_(TOC generated by [verb](https://github.com/verbose/verb) using [markdown-toc](https://github.com/jonschlinkert/markdown-toc))_

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save templates
```

## Usage

```js
const Templates = require('templates');
const app = new Templates();
```

## API

### [Templates](index.js#L19)

Create an instance of `Templates` with the given [options](#options).

**Params**

* `options` **{Object}**

**Example**

```js
const app = new Templates(options);
```

### [.get](index.js#L45)

Get a cached view.

**Params**

* `key` **{String|RegExp|Function}**
* `returns` **{Object}**: Returns the view if found.

**Example**

```js
// iterates over all collections
app.get('foo/bar.html');
app.get('foo.html');

// or specify the collection name
app.get('foo/bar.html', 'pages');
app.get('foo.html', 'pages');
```

### [.find](index.js#L64)

Find a cached view with the given `fn`.

**Params**

* `view` **{Object}**
* `returns` **{Object}**: Returns the view, if found.

**Example**

```js
const view = app.find(view => view.basename === 'foo.hbs');
```

Create an un-cached view collection.

**Params**

* `name` **{String}**: (required) Collection name
* `options` **{Object}**
* `returns` **{Object}**: Returns the collection.

Create a cached view collection.

**Params**

* `name` **{String}**: (required) Collection name
* `options` **{Object}**
* `returns` **{Object}**: Returns the collection.

### [.option](lib/common.js#L55)

Get or set options on `app.options`.

**Params**

* `key` **{string|object}**
* `val` **{object}**
* `returns` **{object}**: Returns the instance when setting, or the value when getting.

**Example**

```js
// set option
app.option('foo', 'bar');
app.option({ foo: 'bar' });
// get option
console.log(app.option('foo')); //=> 'bar'
```

### [.data](lib/common.js#L90)

Get or set data on `app.cache.data`.

**Params**

* `key` **{string|object}**
* `val` **{object}**
* `returns` **{object}**: Returns the instance when setting, or the value when getting.

**Example**

```js
// set data
app.data('foo', 'bar');
app.data({ foo: 'bar' });
// get data
console.log(app.data('foo')); //=> 'bar'
```

### [.view](lib/common.js#L122)

Create a new view.

**Params**

* `key` **{string|object}**: The view path, or object.
* `val` **{object}**: View object, when `key` is a path string.
* `returns` **{object}**: Returns the view.

**Example**

```js
app.view('/some/template.hbs', {});
app.view({ path: '/some/template.hbs', contents: Buffer.from('...') });
```

### [.engine](lib/common.js#L154)

Register a view engine callback `fn` as `name`.

**Params**

* `exts` **{String|Array}**: String or array of file extensions.
* `fn` **{Function|Object}**: or `settings`
* `settings` **{Object}**: Optionally pass engine options as the last argument.

**Example**

```js
app.engine('hbs', require('engine-handlebars'));
```

### [.helper](lib/common.js#L179)

Register a helper function as `name`.

**Params**

* `name` **{string|object}**: Helper name or object of helpers.
* `helper` **{function}**: helper function, if name is not an object

**Example**

```js
app.helper('lowercase', str => str.toLowerCase());
```

### [.renderLayout](lib/common.js#L205)

Recursively renders layouts and "nested" layouts on the given `view`.

**Params**

* `view` **{object}**
* `options` **{object}**: Optionally pass an object of `layouts`. Or views from any collections with type "layout" will be used.

**Example**

```js
app.renderLayout(view);
```

### [.compile](lib/common.js#L241)

Compile `view` with the given `options`.

**Params**

* `view` **{Object|String}**: View object.
* `options` **{Object}**
* `returns` **{Object}**: Returns a promise with the view.

**Example**

```js
const view = app.view({ path: 'some-view.hbs', contents: Buffer.from('...') });
app.compile(view)
  .then(view => console.log(view.fn)) //=> [function]

// you can call the compiled function more than once
// to render the view with different data
view.fn({title: 'Foo'});
view.fn({title: 'Bar'});
view.fn({title: 'Baz'});
```

Render a view.

**Params**

* `view` **{object|string}**: View path or object.
* `locals` **{object}**: Data to use for rendering the view.
* **{object}**: options
* `returns` **{object}**

### [.handlers](lib/common.js#L320)

Add one or more middleware handler methods. Handler methods may also be added by passing an array of handler names to the constructor on the `handlers` option.

**Params**

* `methods` **{string|array}**: Method names
* `options` **{object}**
* `returns` **{object}**: Returns the instance for chaining.

**Example**

```js
app.handlers(['onLoad', 'preRender']);
```

### [.handle](lib/common.js#L349)

Run a middleware methods on the given `view`.

**Params**

* `method` **{string}**: Middleware method to run.
* `view` **{object}**

**Example**

```js
// run a specific method
app.handle('onLoad', view)
  .then(view => console.log('File:', view))
  .catch(console.error);

// run multiple methods
app.handle('onLoad', view)
  .then(view => router.handle('preRender', view))
  .catch(console.error);

// run all methods
app.handle(view)
  .then(view => console.log('File:', view))
  .catch(console.error);
```

Create the "key" to use for caching a view.

**Params**

* `view` **{object}**
* `returns` **{string}**: Returns the key.

### [Collection](lib/collection.js#L18)

Create a new `Collection` with the given `options`.

**Params**

* `name` **{String}**: (required) Collection name
* `options` **{Object}**

**Example**

```js
const collection = new Collection();
```

### [.set](lib/collection.js#L46)

Add a view to `collection.views`.

**Params**

* `key` **{string|object}**
* `val` **{object|undefined}**
* `returns` **{Object}**: Returns the view.

**Example**

```js
collection.set('foo/bar.html', { contents: Buffer.from('...') });
collection.set({ path: 'foo/bar.html', contents: Buffer.from('...') });
```

### [.get](lib/collection.js#L69)

Get a view from `collection.views`.

**Params**

* `key` **{String|RegExp|Function}**
* `returns` **{Object}**: Returns the view if found.

**Example**

```js
collection.get('foo/bar.html');
collection.get('foo.html');
collection.get('foo');
```

### [.find](lib/collection.js#L87)

Find a view on `collection.views` with the given `fn`.

**Params**

* `view` **{Object}**
* `returns` **{Object}**: Returns the view, if found.

**Example**

```js
const view = collection.find(view => view.basename === 'foo.hbs');
```

### [.delete](lib/collection.js#L109)

Remove `view` from `collection.views`.

**Params**

* `view` **{object|string}**
* `returns` **{Object}**: Returns the removed view.

**Example**

```js
collection.delete(view);
collection.delete('/foo/bar.hbs');
```

Static method that returns true if the given value is a collection instance.

**Params**

* `val` **{any}**
* `returns` **{Boolean}**

### [.option](lib/common.js#L55)

Get or set options on `app.options`.

**Params**

* `key` **{string|object}**
* `val` **{object}**
* `returns` **{object}**: Returns the instance when setting, or the value when getting.

**Example**

```js
// set option
collection.option('foo', 'bar');
collection.option({ foo: 'bar' });
// get option
console.log(collection.option('foo')); //=> 'bar'
```

### [.data](lib/common.js#L90)

Get or set data on `app.cache.data`.

**Params**

* `key` **{string|object}**
* `val` **{object}**
* `returns` **{object}**: Returns the instance when setting, or the value when getting.

**Example**

```js
// set data
collection.data('foo', 'bar');
collection.data({ foo: 'bar' });
// get data
console.log(collection.data('foo')); //=> 'bar'
```

### [.view](lib/common.js#L122)

Create a new view.

**Params**

* `key` **{string|object}**: The view path, or object.
* `val` **{object}**: View object, when `key` is a path string.
* `returns` **{object}**: Returns the view.

**Example**

```js
collection.view('/some/template.hbs', {});
collection.view({ path: '/some/template.hbs', contents: Buffer.from('...') });
```

### [.engine](lib/common.js#L154)

Register a view engine callback `fn` as `name`.

**Params**

* `exts` **{String|Array}**: String or array of file extensions.
* `fn` **{Function|Object}**: or `settings`
* `settings` **{Object}**: Optionally pass engine options as the last argument.

**Example**

```js
collection.engine('hbs', require('engine-handlebars'));
```

### [.helper](lib/common.js#L179)

Register a helper function as `name`.

**Params**

* `name` **{string|object}**: Helper name or object of helpers.
* `helper` **{function}**: helper function, if name is not an object

**Example**

```js
collection.helper('lowercase', str => str.toLowerCase());
```

### [.renderLayout](lib/common.js#L205)

Recursively renders layouts and "nested" layouts on the given `view`.

**Params**

* `view` **{object}**
* `options` **{object}**: Optionally pass an object of `layouts`.

**Example**

```js
collection.renderLayout(view);
```

### [.compile](lib/common.js#L241)

Compile `view` with the given `options`.

**Params**

* `view` **{Object|String}**: View object.
* `options` **{Object}**
* `returns` **{Object}**: Returns a promise with the view.

**Example**

```js
const view = collection.view({ path: 'some-view.hbs', contents: Buffer.from('...') });
collection.compile(view)
  .then(view => console.log(view.fn)) //=> [function]

// you can call the compiled function more than once
// to render the view with different data
view.fn({title: 'Foo'});
view.fn({title: 'Bar'});
view.fn({title: 'Baz'});
```

Render a view.

**Params**

* `view` **{object|string}**: View path or object.
* `locals` **{object}**: Data to use for rendering the view.
* **{object}**: options
* `returns` **{object}**

### [.handlers](lib/common.js#L320)

Add one or more middleware handler methods. Handler methods may also be added by passing an array of handler names to the constructor on the `handlers` option.

**Params**

* `methods` **{string|array}**: Method names
* `options` **{object}**
* `returns` **{object}**: Returns the instance for chaining.

**Example**

```js
collection.handlers(['onLoad', 'preRender']);
```

### [.handle](lib/common.js#L349)

Run a middleware methods on the given `view`.

**Params**

* `method` **{string}**: Middleware method to run.
* `view` **{object}**

**Example**

```js
// run a specific method
collection.handle('onLoad', view)
  .then(view => console.log('File:', view))
  .catch(console.error);

// run multiple methods
collection.handle('onLoad', view)
  .then(view => router.handle('preRender', view))
  .catch(console.error);

// run all methods
collection.handle(view)
  .then(view => console.log('File:', view))
  .catch(console.error);
```

Create the "key" to use for caching a view.

**Params**

* `view` **{object}**
* `returns` **{string}**: Returns the key.

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

Please read the [contributing guide](.github/contributing.md) for advice on opening issues, pull requests, and coding standards.

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Related projects

You might also be interested in these projects:

* [assemble](https://www.npmjs.com/package/assemble): Get the rocks out of your socks! Assemble makes you fast at creating web projects… [more](https://github.com/assemble/assemble) | [homepage](https://github.com/assemble/assemble "Get the rocks out of your socks! Assemble makes you fast at creating web projects. Assemble is used by thousands of projects for rapid prototyping, creating themes, scaffolds, boilerplates, e-books, UI components, API documentation, blogs, building websit")
* [generate](https://www.npmjs.com/package/generate): Command line tool and developer framework for scaffolding out new GitHub projects. Generate offers the… [more](https://github.com/generate/generate) | [homepage](https://github.com/generate/generate "Command line tool and developer framework for scaffolding out new GitHub projects. Generate offers the robustness and configurability of Yeoman, the expressiveness and simplicity of Slush, and more powerful flow control and composability than either.")
* [layouts](https://www.npmjs.com/package/layouts): Wraps templates with layouts. Layouts can use other layouts and be nested to any depth… [more](https://github.com/doowb/layouts) | [homepage](https://github.com/doowb/layouts "Wraps templates with layouts. Layouts can use other layouts and be nested to any depth. This can be used 100% standalone to wrap any kind of file with banners, headers or footer content. Use for markdown, HTML, handlebars views, lo-dash templates, etc. La")
* [update](https://www.npmjs.com/package/update): Be scalable! Update is a new, open source developer framework and CLI for automating updates… [more](https://github.com/update/update) | [homepage](https://github.com/update/update "Be scalable! Update is a new, open source developer framework and CLI for automating updates of any kind in code projects.")
* [verb](https://www.npmjs.com/package/verb): Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used… [more](https://github.com/verbose/verb) | [homepage](https://github.com/verbose/verb "Documentation generator for GitHub projects. Verb is extremely powerful, easy to use, and is used on hundreds of projects of all sizes to generate everything from API docs to readmes.")

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 753 | [jonschlinkert](https://github.com/jonschlinkert) |
| 109 | [doowb](https://github.com/doowb) |
| 1 | [chronzerg](https://github.com/chronzerg) |

### Author

**Jon Schlinkert**

* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)
* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)

### License

Copyright © 2018, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on March 31, 2018._