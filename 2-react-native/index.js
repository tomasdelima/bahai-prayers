import { AppRegistry } from 'react-native'
import {
  View,
  Text,
  Image,
  Animated,
} from 'react-native'

import Container from './container'
import Category from './components/category'
import MyStyles from './my-styles'

global.Category = Category
global.Image = Image
global.View = View
global.Animated = Animated
global.Text = Text
global.s = MyStyles

AppRegistry.registerComponent('BahaiPrayers', () => Container)
