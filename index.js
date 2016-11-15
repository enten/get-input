function autocast (val) {
  if (val === 'true') return true
  if (val === 'false') return false
  if (!isNaN(Number(val))) return Number(val)
  return val
}

function getInput (opts) {
  opts = opts || {}
  opts.argv = opts.argv || process.argv.slice(2)
  opts.endMark = opts.endMark || '--'
  opts.env = opts.env || process.env
  var argvValue = opts.argvKey && getInputFromArgv(opts.argv, opts.argvKey, opts.endMark)
  var envValue = opts.envKey && getInputFromEnv(opts.env, opts.envKey)
  if (argvValue == null && envValue == null) {
    return opts.defaultValue
  }
  return opts.priority === 'env' ? envValue || argvValue : argvValue || envValue
}

function getInputFromArgv (argv, keys, endMark) {
  var doubleDash = argv.indexOf(endMark)
  if (~doubleDash) {
    argv = argv.slice(0, doubleDash)
  }
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

exports = module.exports = getInput
exports.autocast = autocast
exports.fromArgv = getInputFromArgv
exports.fromEnv = getInputFromEnv
