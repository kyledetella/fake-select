'use strict';

var expect = require('chai').expect;
var Fauxlect = require('../main');

describe('Fauxlect', function () {
  beforeEach(function () {
    this.fakeContainer = document.createElement('div');

    this.fakeContainer.id = 'fake-element';

    document.body.appendChild(this.fakeContainer);
  });

  describe('constructor', function () {
    it('throws an error if no selector is provided', function () {
      var fn = function () {
        return new Fauxlect();
      }

      expect(fn).to.throw;
    });

    it('sets properties', function () {
      var fs = new Fauxlect({
        selector: '#fake-element',
        options: []
      });

      expect(fs.root).to.equal(this.fakeContainer);
      expect(fs.selectElement instanceof HTMLSelectElement).to.equal(true);
      expect(fs.root.childNodes instanceof NodeList).to.equal(true);
    });
  });
});
