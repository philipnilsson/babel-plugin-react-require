# babel-plugin-react-require

Babel plugin that adds React import declaration if file contains JSX tags.

This plugin is only about stateless components that doesn't extends `React.Component`.
If you want to use any other React functions then you should import their by yourself.

## Example

Your `component.js` that contains this code:

```js
export default function Component() {
  return (
    <div />
  );
}
```

will be transpiled into something like this:

```js
import React from 'react';

export default function Component() {
  /* this part will be transpiled by babel itself as usual */
  return (
    React.createElement('div')
  );
}
```

## Usage

* Install `babel-plugin-react-require`.

```
npm install babel-plugin-react-require --save-dev
```

* Add `react-require` into `.babelrc`. This plugin should be defined before `transform-es2015-modules-commonjs` plugin because it's using ES2015 modules syntax to import `React` into scope.

```json
{
  "plugins": [
    "react-require"
  ]
}
```

* If you're using a React alternative the `name` and `lib` options can be used to determine the name of the library and
  the name of the import. For instance in order to add impots on the form `import {element} from 'deku'` configure the plugin
  as follows

```json
{
  "plugins": [
    "react-require", { lib: 'deku', name: 'element' }
  ]
}