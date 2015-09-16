require('mocha');
require('should');
var assert = require('assert');
var Templates = require('../');
var app;

describe('middleware', function () {
  beforeEach(function () {
    app = new Templates();
    app.engine('tmpl', require('engine-base'));
    app.create('pages');
  });

  it('should call the all method for every middleware method:', function () {
    var i = 0;
    app.all(/./, function (view, next) {
      assert(typeof view.path === 'string');
      i++;
      next();
    });

    assert(i === 0);
    app.page('foo.tmpl', {content: 'foo'});
    assert(i === 1);
  });

  it('should call the onLoad method when a view is loaded:', function () {
    var i = 0;
    app.onLoad(/./, function (view, next) {
      assert(typeof view.path === 'string');
      i++;
      next();
    });

    assert(i === 0);
    app.page('foo.tmpl', {content: 'foo'});
    assert(i === 1);
  });

  it('should emit an event when a handler is called:', function (done) {
    var i = 0;
    app.on('onLoad', function () {
      i++;
    });
    app.on('preRender', function () {
      i++;
    });
    app.on('preCompile', function () {
      i++;
    });

    app.page('foo.tmpl', {content: 'foo'})
      .render(function (err, res) {
        if (err) return done(err);
        assert(i === 3);
        done();
      });
  });
});
