global.Axios = require('axios').default

import ReactNative from 'react-native';
["BackHandler", "Image", "AsyncStorage", "StyleSheet", "Text", "TouchableHighlight", "TouchableOpacity", "View", "ScrollView", "Image"].map(i => global[i] = ReactNative[i])

global.Navigator = require('./js/Navigator').default
global.Config    = require('./js/Config').default
global.ApiClient = require('./js/ApiClient').default
global.Store     = require('./js/Store').default

global.LanguageSelect = require('./components/LanguageSelect').default
global.Container      = require('./components/Container').default
global.Tags           = require('./components/Tags').default
global.Prayers        = require('./components/Prayers').default
global.Prayer         = require('./components/Prayer').default

global.s    = require('./lib/Styles').default
global.Flex = require('./lib/Flex').default
