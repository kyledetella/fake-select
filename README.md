Fauxlect
========

**Note**: This library is currently under active development and is likely incomplete at the moment you are reading this.

Easily create and manage a stylized `<select>` list.

## Example

Setup a container element for your component. The `<select>` list will be transparently injected into this node which means you can style this element as you wish.

```html
<form>
  <label>Chicago's Teams</label>
  <div id="select-component"></div>
</form>
```

```javascript
var Fauxlect = require('fauxlect');

var fauxlect = new Fauxlect({
  selector: '#select-component',
  options: [
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

## Setup

```
npm i
```

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
