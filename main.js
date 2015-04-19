'use strict';

var createOptionsList = require('./lib/create-options-list');

function Fauxlect(config) {
  this.root = document.querySelector(config.selector);
  this.optionsList = config.options;

  this.selectElement = document.createElement('select');
  this.selectElement.appendChild(createOptionsList(this.optionsList));

  this.attachEvents();

  this.root.appendChild(this.selectElement);
}

Fauxlect.prototype.attachEvents = function () {
  var events = [
    {event: 'change', fn: 'handleChange'},
    {event: 'click', fn: 'handleClick'},
    {event: 'focus', fn: 'handleFocus'},
    {event: 'blur', fn: 'handleBlur'},
  ];

  events.forEach(function (event) {
    this.selectElement.addEventListener(event.event, this[event.fn].bind(this));
  }.bind(this));
}

Fauxlect.prototype.handleChange = function () {
  console.log('change', this);
}

Fauxlect.prototype.handleClick = function () {
  console.log('click', this);
}

Fauxlect.prototype.handleFocus = function () {
  console.log('focus', this);
}

Fauxlect.prototype.handleBlur = function () {
  console.log('blur', this);
}

module.exports = Fauxlect;
