var makeGlobal = (object, keys) => keys.map(key => global[key] = object[key])

global.React = require('react')

global.Axios = require('axios').default
global.Nuclear = require('react-native-nuclear').default
new Nuclear(require('./nuclear-configs').default)

makeGlobal(require('himalaya'), ['parse'])
makeGlobal(require('mobx'), ['observable', 'decorate', 'computed', 'action', 'observe'])
makeGlobal(require('mobx-react'), ['observer'])
makeGlobal(require('react-native'), ['FlatList'])
makeGlobal(require('react-router-native'), ['BackButton'])

require('./local-modules')