'use strict';

var chai = require('chai')
var expect = chai.expect;
var Fauxlect = require('../main');
var DEFAULT_CLASS_NAME = 'the-container for-fauxlect';

chai.use(require('sinon-chai'));

describe('Fauxlect', function () {
  beforeEach(function () {
    this.container = document.createElement('div');

    this.container.id = 'fake-element';
    this.container.className = DEFAULT_CLASS_NAME;

    document.body.appendChild(this.container);
  });

  beforeEach(function () {
    this.defaultOptions = {
      selector: '#fake-element',
      options: [
        {value: 'foo', display: 'Foo'},
        {value: 'bar', display: 'Bar'},
      ],
      onComponentStateChange: sinon.spy()
    };

    this.instance = new Fauxlect(this.defaultOptions);
  });

  describe('constructor', function () {
    it('throws an error if no selector is provided', function () {
      var fn = function () {
        return new Fauxlect();
      }

      expect(fn).to.throw;
    });

    it('sets properties', function () {
      var root = this.instance.root;
      var element = this.instance.selectElement;

      expect(root).to.equal(this.container);
      expect(element).to.be.an.instanceOf(HTMLSelectElement);
      expect(root.childNodes).to.be.an.instanceOf(NodeList);
    });
  });

  describe('style', function () {
    it('applies expected defaults', function () {
      var element = this.instance.selectElement;
      var style = getComputedStyle(element);

      this.container.style.width = '200px';
      this.container.style.height = '44px';

      expect(style.width).to.equal('200px');
      expect(style.height).to.equal('44px');
      expect(style.webkitAppearance).to.equal('none');
      expect(style.opacity).to.equal('0');
      expect(style.visibility).to.equal('visible');
    });
  });

  describe('handleChange', function () {
    it('emits `onComponentStateChange` callback', function () {
      this.instance.handleChange({target: this.instance.selectElement});

      expect(this.defaultOptions.onComponentStateChange)
        .to.have.been
        .calledWithExactly({
          state: {isOpen: false},
          type: 'change',
          value: 'foo'
        });
    });
  });

  describe('handleClick', function () {
    it('emits `onComponentStateChange` callback', function () {
      this.instance.handleClick({target: this.instance.selectElement});

      expect(this.defaultOptions.onComponentStateChange)
        .to.have.been
        .calledWithExactly({
          state: {isOpen: true},
          type: 'click',
          value: 'foo'
        });
    });
  });

  describe('handleFocus', function () {
    it('applies focus class to container', function () {
      this.instance.handleFocus({target: this.instance.selectElement});

      expect(this.container.className).to.equal(DEFAULT_CLASS_NAME + ' fauxcus');
    });

    it('emits `onComponentStateChange` callback', function () {
      this.instance.handleFocus({target: this.instance.selectElement});

      expect(this.defaultOptions.onComponentStateChange)
        .to.have.been
        .calledWithExactly({
          state: {isOpen: false},
          type: 'focus',
          value: 'foo'
        });
    });
  });

  describe('handleBlur', function () {
    it('removes focus class from container', function () {
      this.instance.handleFocus({target: this.instance.selectElement});
      this.instance.handleBlur({target: this.instance.selectElement});

      expect(this.container.className).to.equal(DEFAULT_CLASS_NAME);
    });

    it('emits `onComponentStateChange` callback', function () {
      this.instance.handleBlur({target: this.instance.selectElement});

      expect(this.defaultOptions.onComponentStateChange)
        .to.have.been
        .calledWithExactly({
          state: {isOpen: false},
          type: 'blur',
          value: 'foo'
        });
    });
  });
});
