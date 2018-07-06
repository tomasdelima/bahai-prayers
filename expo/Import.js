global.Axios = require('axios').default
// global.ReactNative = require('react-native').default;
import ReactNative from 'react-native';
["StyleSheet", "Text", "View", "ScrollView", "Image"].map(i => global[i] = ReactNative[i])

global.Data = require('./Data').default

global.s = require('./lib/Styles').default
global.Flex = require('./lib/Flex').default
