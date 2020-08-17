const { sharedConfig } = require('./shared.js')

module.exports = function (config) {
  const c = sharedConfig()
  c.browsers = ['IE', 'IE10', 'IE9']
  c.logLevel = config.LOG_INFO
  c.customLaunchers = {
    IE10: {
      base: 'IE',
      'x-ua-compatible': 'IE=EmulateIE10'
    },
    IE9: {
      base: 'IE',
      'x-ua-compatible': 'IE=EmulateIE9'
    }
  }
  config.set(c)
}
