'use strict';

const bench = require('./setup/bench');
const handlebars = require('handlebars');
const engine = require('../examples/support/engine');
const Templates = require('..');
const Collection = Templates.Collection;
const View = Templates.View;

/**
 * Layouts
 */

// let initialized = false;

// app = new Templates({ asyncHelpers: false });
// app.engine('hbs', engine(handlebars));

// app.create('pages');
// app.create('layouts', { kind: 'layout' });
// app.layouts.set({ path: 'foo', contents: Buffer.from('before {% body %} after') });
// app.layouts.set({ path: 'base', contents: Buffer.from('before {% body %} after'), layout: 'foo' });
// app.layouts.set({ path: 'default', contents: Buffer.from('before {% body %} after'), layout: 'base' });

// const view = app.pages.set('foo', {
//   contents: Buffer.from('Name: {{name}}, {{description}}'),
//   data: { name: 'Brian' },
//   layout: 'default'
// });

// // console.log(app)

// bench('layouts')
//   // .add('collection.renderLayout()', () => {
//   //   const collection = new Collection('layouts', { kind: 'layout '});
//   //   collection.set({ path: 'default', contents: 'before {{name}} after' });
//   //   const view = new View({ path: 'foo/bar', contents: 'before {{name}} after' });
//   // })
//   .add('collection.renderLayout()', async() => {

//     // await app.render(view, { description: 'This is a page' });
//     // console.log(view.contents.toString())

//   })
//   .run({ async: true });

// bench('rendering')
//   .add('app.render()', () => {
//     let app = new Templates();
//     const view = new View({ path: 'foo/bar', contents: 'before {{name}} after' });

//   })
//   .run();

// const app = new App({
//   handlers: [
//     'onLoad',
//     'preCompile',
//     'preLayout',
//     'preRender',
//     'postCompile',
//     'postLayout',
//     'postRender'
//   ],
// });

// const pages = app.create('pages');
// const layouts = app.create('layouts', { kind: 'layout' });
// layouts.set({ path: 'default.hbs', contents: Buffer.from('before {% body %} after') });

// app.engine('hbs', engine(handlebars));

