'use strict';

var createOptionsList = require('../../lib/create-options-list');

describe('createOptionsList', function () {
  it('returns a document fragment', function () {
    var result = createOptionsList([]);
    expect(result instanceof DocumentFragment).to.equal(true);
  });

  it('creates an options list from the passed in values', function () {
    var result = createOptionsList([
      {value: 'blackhawks', display: 'Chicago Blackhawks'},
      {value: 'islanders', display: 'New York Islanders'},
      {value: 'bruins', display: 'Boston Bruins'}
    ]);
    var options = [].slice.call(result.querySelectorAll('option'));

    expect(options).to.have.length(3);
    expect(options[0].value).to.equal('blackhawks');
    expect(options[0].innerHTML).to.equal('Chicago Blackhawks');
  });
});
