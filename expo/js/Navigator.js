import { createStackNavigator } from 'react-navigation'
import React from 'react'

import Tags from '../components/Tags'
import Prayers from '../components/Prayers'
import Prayer from '../components/Prayer'

export default createStackNavigator({
  Tags: {screen: Tags},
  Prayers: {screen: Prayers},
  Prayer: {screen: Prayer},
}, {
  initialRouteName: 'Tags',
  headerMode: 'none',
})