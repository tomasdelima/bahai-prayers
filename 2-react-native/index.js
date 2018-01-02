import {
  AppRegistry,
  Animated,
  AsyncStorage,
  Dimensions,
  Image,
  ScrollView,
  Slider,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'

import {Link} from 'react-router-native'

import Container from './container'
import List from './components/list'
import Category from './components/category'
import InlinePrayer from './components/inline-prayer'
import LongPrayer from './components/long-prayer'
import MyStyles from './my-styles'

global.Animated = Animated
global.AsyncStorage = AsyncStorage
global.Dimensions = Dimensions
global.Image = Image
global.ScrollView = ScrollView
global.Slider = Slider
global.Text = Text
global.TouchableHighlight = TouchableHighlight
global.View = View

global.Link = Link

global.List = List
global.Category = Category
global.InlinePrayer = InlinePrayer
global.LongPrayer = LongPrayer
global.s = MyStyles

AppRegistry.registerComponent('BahaiPrayers', () => Container)
