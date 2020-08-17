const { sharedConfig } = require('./shared.js')

module.exports = function (config) {
  const c = sharedConfig()
  c.browsers = ['Chrome']
  c.logLevel = config.LOG_INFO
  config.set(c)
}
