'use strict';

var createOptionsList = require('./lib/create-options-list');
var constants = require('./lib/constants');
var focusClassRegExp = new RegExp(' ' + constants.FOCUS_CLASS, 'g');
var defaultStyles = require('./lib/config/default-styles');

function noop() {};

function Fauxlect(config) {
  this.root = document.querySelector(config.selector);
  this.optionsList = config.options;

  this.onComponentStateChangeCallback = config.onComponentStateChange || noop;

  this.selectElement = document.createElement('select');
  this.selectElement.appendChild(createOptionsList(this.optionsList));

  this.applyStyle();
  this.attachEvents();

  this.root.appendChild(this.selectElement);
}

Fauxlect.prototype.applyStyle = function () {
  for (var style in defaultStyles) {
    if (defaultStyles.hasOwnProperty(style)) {
      this.selectElement.style[style] = defaultStyles[style];
    }
  }
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

Fauxlect.prototype.handleChange = function (event) {
  this.onComponentStateChangeCallback({
    state: {isOpen: false},
    type: 'change',
    value: event.target.value
  });
}

Fauxlect.prototype.handleClick = function (event) {
  this.onComponentStateChangeCallback({
    type: 'click',
    state: {isOpen: true},
    value: event.target.value
  });
}

Fauxlect.prototype.handleFocus = function (event) {
  this.root.classList.add(constants.FOCUS_CLASS);

  this.onComponentStateChangeCallback({
    state: {isOpen: false},
    type: 'focus',
    value: event.target.value
  });
}

Fauxlect.prototype.handleBlur = function (event) {
  this.root.classList.remove(constants.FOCUS_CLASS);

  this.onComponentStateChangeCallback({
    state: {isOpen: false},
    type: 'blur',
    value: event.target.value
  });
}

module.exports = Fauxlect;
