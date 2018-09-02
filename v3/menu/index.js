import React from 'react'
import { createStackNavigator, NavigationActions, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'

import PrayersMenu from './PrayersMenu'

export default createBottomTabNavigator({
  "Orações": PrayersMenu,
}, {
  navigationOptions: ({ navigation }) => {
    var icon =  {
      "Orações": [FontAwesome5, "hands"],
    }[navigation.state.key]

    return {
      tabBarIcon: ({ tintColor }) => React.createElement(icon[0], {name: icon[1], color: tintColor, size: 20})
    }
  },
  tabBarOptions: {
    activeTintColor: t.text,
    inactiveTintColor: t.quartenary,
    style: [bg.primary, s.noBorder, {borderTopColor: "transparent"}],
    labelStyle: [{}],
    tabStyle: [{}],
  },
  headerMode: 'none',
})

