const { modernConfig } = require('./shared.js')

module.exports = function (config) {
  const c = modernConfig()
  c.browsers = ['Chrome']
  c.logLevel = config.LOG_INFO
  config.set(c)
}
