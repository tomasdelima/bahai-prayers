global.Axios = require('axios').default

import ReactNative from 'react-native';
["StyleSheet", "Text", "TouchableHighlight", "TouchableOpacity", "View", "ScrollView", "Image"].map(i => global[i] = ReactNative[i])

global.Data = require('./Data').default
global.LanguageSelect = require('./LanguageSelect').default
global.Flag = require('./Flag').default

global.s = require('./lib/Styles').default
global.Flex = require('./lib/Flex').default
