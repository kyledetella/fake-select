'use strict';

module.exports = function createOptionsList(options) {
  var frag = document.createDocumentFragment();

  options.forEach(function (opt) {
    var option = document.createElement('option');

    option.value = opt.value;
    option.innerHTML = opt.display;

    frag.appendChild(option);
  });

  return frag;
}

