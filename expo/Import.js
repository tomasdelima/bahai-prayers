var makeGlobal = (object, keys) => keys.map(key => global[key] = object[key])

global.React = require('react')

global.Axios = require('axios').default
global.Nuclear = require('react-native-nuclear').default
new Nuclear(require('./nuclear-configs').default)

makeGlobal(require('himalaya'), ['parse'])
makeGlobal(require('mobx'), ['observable', 'decorate', 'computed', 'action', 'observe', 'autorun'])
makeGlobal(require('mobx-react'), ['observer'])
makeGlobal(require('react-native'), ['FlatList', 'StatusBar', 'Vibration'])
makeGlobal(require('react-router-native'), ['BackButton'])
makeGlobal(require('expo-av'), ['Audio'])

require('./local-modules')
