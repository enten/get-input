
# get-input

> A lightweight library to get a value from argv and env

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```
npm install get-input --save
```

## Example usage

```js
var getInput = require('get-input')

// example.js
var foo = getInput({
  envKey: ['FOO', 'foo'],
  argvKey: ['-f', '--foo'],
  defaultValue: 'not found',
  endMark: '--',
  priority: 'argv'
})

console.log(foo)

// $ node example.js
// not found
//
// $ node example.js --foo
// true
//
// $ node example.js --foo bar
// bar
//
// $ node example.js -- --foo bar
// not found
//
// $ FOO=bar node example.js
// bar
//
// $ foo=bar node example.js -- --foo bax
// bar
//
// $ foo=bar node example.js --foo bax
// bax
```

## Api

```javascript
function getInput ({
  argv = process.argv.slice(2),
  argvKey,
  defaultValue,
  endMark = '--',
  env = process.env,
  envKey,
  priority = 'argv'
} = {}) {
  var argvValue = argvKey && getInputFromArgv(argv, argvKey, endMark)
  var envValue = envKey && getInputFromEnv(env, envKey)
  if (argvValue == null && envValue == null) {
    return defaultValue
  }
  return priority === 'env' ? envValue || argvValue : argvValue || envValue
}
```
