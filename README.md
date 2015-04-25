Fauxlect
========

[![Build Status](https://travis-ci.org/kyledetella/fauxlect.svg?branch=master)](https://travis-ci.org/kyledetella/fauxlect)

**Note**: This library is currently under active development and is likely incomplete at the moment you are reading this.

Easily create and manage a stylized `<select>` list.

## Example

### Get the library

```
npm install fauxlect
```

### Setup your DOM

Setup a container element for your component. The `<select>` list will be transparently injected into this node which means you can style this element as you wish.

```css
#select-component {
  position: relative; /* This is required. See "caveats" */
  width: 160px;
  height: 42px;
  background-color: #008AE6;
  -webkit-transition: background-color 144ms ease-out;
}

#select-component.fauxcus {
  background-color: #0070BA;
}
```

```html
<form>
  <label>Chicago's Teams</label>
  <div id="select-component">
    <span>Select one</span>
  </div>
</form>
```

### Create your component

```javascript
var Fauxlect = require('fauxlect');

var fauxlect = new Fauxlect({
  selector: '#select-component',
  options: [
    {value: '', display: 'Pick one'},
    {value: 'bears', display: 'Chicago Bears'},
    {value: 'blackhawks', display: 'Chicago Blackhawks'},
    {value: 'bulls', display: 'Chicago Bulls'},
    {value: 'cubs', display: 'Chicago Cubs'}
  ],
  onComponentStateChange: function (payload) {
    console.log(payload.value); // Current value of <select>
  }
});
```

## API & Configuration

### `selector: String`

This is the argument that will be passed to `document.querySelector` to locate the DOM node.

### `options: Array`

This array declares the markup for the `options` list.

| Key | Type | Description |
| --- | ---- | ----------- |
| `value` | `String` | The value you expect to pass to your server when submitting the` form`. |
| `display` | `String` | This is the display that will be set via `innerHTML` on the `option` element. |

### `onComponentStateChange: Function`

The `onComponentStateChange` callback provides you the ability to declare a handler and update your UI accordingly. `Fauxlect` makes no assumptions about your styling in any given state. Instead the library will provide you with the necessary event abstractions and data so that you retain full control over your experience.

#### Events

| Key | Type | Description |
| --- | ---- | ----------- |
| `type` | `String` | A reference to the actual event which triggered the handler. These types include:<br />- `change`: The value of the select list has changed<br />- `focus`: The user has passed `focus` to the `select` list<br />- `blur`: The `select` list has lost focus<br />- `click`: The user has clicked the `select` list to open it |
| `state` | `Object` | An object representing the current state of the component.<br />- `value`: The current value of the `select` element<br />- `display`: The string to display as the representation of the currently selected value |

## Managing State

`Fauxlext` will provide you will the necessary data to manage your UI state. This is done both through the [callback](#oncomponentstatechange-function) and by setting class names on your container element.

### Displaying selected value

The `onComponentStateChange` callback will provide your with a `display` value nested within its `state` object. You should use this to update your UI to reflect the user's current selection.

### Class names

When the `select` list receives focus, a class name of `fauxcus` is applied to your container. That class name is then removed when the element loses focus.

The toggling of this classname is useful in cases where you wish to visually express focus and blur to your users.

## Caveats

#### Browser support

Out of the box, `Fauxlect` supports IE9+. There are a number of features that will not work on IE8 such as [classList](https://developer.mozilla.org/en-US/docs/Web/API/Element/classList), [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind), [Array.prototype.forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), and [addEvenntListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Legacy_Internet_Explorer_and_attachEvent). There are various [shims](https://github.com/es-shims/es5-shim) and polyfills available if you need to support more browsers.

#### `position: relative`
The container DOM node which you specify must have its `position` set to `relative`. The injected `select` tag will be positioned absolutely inside of this element to allow the content and styles you define to render naturally. If you need this element to be positioned absolutely in your layout, simply wrap the container and style the position of the wrapper.

## Development

```
npm run watch
```

This will spin up a web server on the default port of `8000`. To change the port, simply set the `PORT` env variable before running the script.

## Tests

To run the tests once:

```
npm t
```

To run the tests continuously:

```
npm run test-watch
```
