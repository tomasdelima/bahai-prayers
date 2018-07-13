global.Axios = require('axios').default

import ReactNative from 'react-native';
["AsyncStorage", "StyleSheet", "Text", "TouchableHighlight", "TouchableOpacity", "View", "ScrollView", "Image"].map(i => global[i] = ReactNative[i])

global.Config    = require('./js/Config').default
global.ApiClient = require('./js/ApiClient').default
global.Store     = require('./js/Store').default

global.LanguageSelect = require('./components/LanguageSelect').default
global.Tags           = require('./components/Tags').default
global.Tag            = require('./components/Tag').default

global.s    = require('./lib/Styles').default
global.Flex = require('./lib/Flex').default
