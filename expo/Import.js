global.Axios = require('axios').default

import ReactNative from 'react-native';
["AsyncStorage", "StyleSheet", "Text", "TouchableHighlight", "TouchableOpacity", "View", "ScrollView", "Image"].map(i => global[i] = ReactNative[i])

global.Config = require('./Config').default

global.Data = require('./js/Data').default
global.LanguageSelect = require('./js/LanguageSelect').default
global.Flag = require('./js/Flag').default

global.s = require('./lib/Styles').default
global.Flex = require('./lib/Flex').default
