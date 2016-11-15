var getInput = require('.')

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
