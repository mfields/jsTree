const { modernConfig } = require('./shared.js')

module.exports = function (config) {
  const c = modernConfig()
  c.browsers = ['Chrome', 'Firefox', 'Safari', 'Opera']
  c.logLevel = config.LOG_INFO
  config.set(c)
}
