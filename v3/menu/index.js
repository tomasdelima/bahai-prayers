import React from 'react'
import { createStackNavigator, NavigationActions, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'

import PrayersMenu from './PrayersMenu'

class Menu extends React.Component {
  render () {
    const MenuNavigator = createBottomTabNavigator({
      "Orações": PrayersMenu,
      "Configurações": Settings,
    }, {
      navigationOptions: ({ navigation }) => {
        var icon =  {
          "Orações": [FontAwesome5, "hands"],
          "Configurações": [MaterialIcons, "settings"],
        }[navigation.state.key]

        return {
          tabBarIcon: ({ tintColor }) => React.createElement(icon[0], {name: icon[1], color: tintColor, size: 20})
        }
      },
      tabBarOptions: {
        activeTintColor: t.colors.text,
        inactiveTintColor: t.colors.quartenary,
        style: [t.bg1, s.noBorder, {borderTopColor: "transparent"}],
        labelStyle: [{}],
        tabStyle: [{}],
      },
      headerMode: 'none',
      initialRouteName: "Configurações",
    })

    return <MenuNavigator/>
  }
}

export default observer(Menu)
