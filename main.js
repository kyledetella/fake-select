'use strict';

var createOptionsList = require('./lib/create-options-list');
var constants = require('./lib/constants');
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

Fauxlect.prototype.getDisplayFromValue = function (value) {
  var list = this.optionsList;

  for (var option in list) {
    if (list.hasOwnProperty(option)) {
      if (list[option].value === value) {
        return list[option].display;
      }
    }
  }
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
    {event: 'blur', fn: 'handleBlur'}
  ];

  events.forEach(function (event) {
    this.selectElement.addEventListener(event.event, this[event.fn].bind(this));
  }.bind(this));
}

Fauxlect.prototype.handleChange = function (event) {
  var value = event.target.value || '';

  this.onComponentStateChangeCallback({
    type: 'change',
    state: {
      value: value,
      display: this.getDisplayFromValue(value)
    }
  });
}

Fauxlect.prototype.handleClick = function (event) {
  var value = event.target.value || '';

  this.onComponentStateChangeCallback({
    type: 'click',
    state: {
      value: value,
      display: this.getDisplayFromValue(value)
    }
  });
}

Fauxlect.prototype.handleFocus = function (event) {
  var value = event.target.value || '';

  this.root.classList.add(constants.FOCUS_CLASS);

  this.onComponentStateChangeCallback({
    type: 'focus',
    state: {
      value: value,
      display: this.getDisplayFromValue(value)
    }
  });
}

Fauxlect.prototype.handleBlur = function (event) {
  var value = event.target.value || '';

  this.root.classList.remove(constants.FOCUS_CLASS);

  this.onComponentStateChangeCallback({
    type: 'blur',
    state: {
      value: value,
      display: this.getDisplayFromValue(value)
    }
  });
}

module.exports = Fauxlect;
