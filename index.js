function autocast (val) {
  if (val === 'true') return true
  if (val === 'false') return false
  if (!isNaN(Number(val))) return Number(val)
  return val
}

function getInput () {
  var args = Array.prototype.slice.call(arguments)
  var opts = args.reduce(function (acc, arg) {
    return (Object.assign || polyfillAssign)(acc, arg)
  }, {})
  opts.argv = opts.argv || process.argv
  if (opts.endMark) {
    var doubleDash = opts.argv.indexOf(typeof opts.endMark === 'string' ? opts.endMark : '--')
    opts.argv = ~doubleDash ? opts.argv.slice(0, doubleDash) : opts.argv
  }
  if (~[args[0], opts.index].indexOf('_')) {
    return getInputCommand(opts.argv)
  }
  if (~[typeof args[0], typeof opts.index].indexOf('number')) {
    return getInputCommand(opts.argv, opts.index != null ? opts.index : args[0]) || opts.defaultValue
  }
  opts.env = opts.env || process.env
  var argvValue = opts.argvKey && getInputFromArgv(opts.argv, opts.argvKey)
  var envValue = opts.envKey && getInputFromEnv(opts.env, opts.envKey)
  if (argvValue == null && envValue == null) {
    return opts.defaultValue
  }
  return opts.priority === 'env' ? envValue || argvValue : argvValue || envValue
}

function getInputCommand (argv, index) {
  var command = argv.filter(function (val) {
    return val.charAt(0) !== '-'
  })
  if (typeof index === 'number') {
    return command.slice(index).shift()
  }
  return command
}

function getInputFromArgv (argv, keys) {
  keys = [].concat(keys || [])
  for (var key; (key = keys.shift()) != null;) {
    var pos = argv.indexOf(key)
    if (~pos) {
      var val = argv[pos + 1]
      return val == null || val[0] === '-' ? true : autocast(val)
    }
  }
}

function getInputFromEnv (env, keys) {
  keys = [].concat(keys || [])
  for (var key of keys) {
    if (env[key]) {
      return autocast(env[key])
    }
  }
}

function polyfillAssign (target) {
  if (target === undefined || target === null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }
  var output = Object(target)
  for (var index = 1; index < arguments.length; index++) {
    var source = arguments[index]
    if (source !== undefined && source !== null) {
      for (var nextKey in source) {
        if (source.hasOwnProperty(nextKey)) {
          output[nextKey] = source[nextKey]
        }
      }
    }
  }
  return output
}

exports = module.exports = getInput
exports.autocast = autocast
exports.command = getInputCommand
exports.fromArgv = getInputFromArgv
exports.fromEnv = getInputFromEnv
