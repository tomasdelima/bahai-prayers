var makeGlobal = (object, keys) => keys.map(key => global[key] = object[key])

global.React = require('react')

global.Nuclear = require('react-native-nuclear').default
new Nuclear(require('./nuclear-configs').default)

makeGlobal(require('mobx-react'), ['observer'])
makeGlobal(require('mobx'), ['observable', 'decorate', 'computed', 'action', 'observe'])

require('./local-modules')