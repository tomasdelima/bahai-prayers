global.Axios = require('axios').default
global.decorate = require('mobx').decorate
global.autorun = require('mobx').autorun
global.computed = require('mobx').computed
global.observable = require('mobx').observable
global.observer = require('mobx-react/native').observer
global.dynamicObject = require('mobx').dynamicObject

import ReactNative from 'react-native';
["Animated", "Easing", "TextInput", "Picker", "BackHandler", "Image", "AsyncStorage", "StyleSheet", "Text", "TouchableHighlight", "TouchableOpacity", "View", "ScrollView", "Image"].map(i => global[i] = ReactNative[i])

global.Config    = require('./js/Config').default
global.ApiClient = require('./js/ApiClient').default
global.Store     = require('./js/Store').default

global.Container      = require('./components/Container').default
global.Favorites      = require('./components/Favorites').default
global.LanguageSelect = require('./components/LanguageSelect').default
global.Settings       = require('./components/Settings').default
global.Loading        = require('./components/Loading').default
global.Prayer         = require('./components/Prayer').default
global.Prayers        = require('./components/Prayers').default
global.Search         = require('./components/Search').default
global.SearchResults  = require('./components/SearchResults').default
global.Tags           = require('./components/Tags').default
global.ThemeSelect    = require('./components/ThemeSelect').default
global.TopBar         = require('./components/TopBar').default

global.s     = require('./lib/Styles').default
global.Theme = require('./lib/Theme').default
global.Flex  = require('./lib/Flex').default

global.FontAwesome     = require('react-native-vector-icons/FontAwesome').default
global.FontAwesome5    = require('react-native-vector-icons/FontAwesome5').default
global.SimpleLineIcons = require('react-native-vector-icons/SimpleLineIcons').default
global.MaterialIcons   = require('react-native-vector-icons/MaterialIcons').default
global.Ionicons        = require('react-native-vector-icons/Ionicons').default

log = console.log.bind( console )
