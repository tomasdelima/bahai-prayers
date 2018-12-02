import React from 'react'
import { createStackNavigator, NavigationActions, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'

import PrayersMenu from './PrayersMenu'
import CalendarMenu from './CalendarMenu'

class Menu extends React.Component {
  render () {
    const MenuNavigator = createBottomTabNavigator({
      "Prayers": PrayersMenu,
      "Favorites": Favorites,
      "Calendar": CalendarMenu,
      // "Settings": Settings,
    }, {
      navigationOptions: ({ navigation }) => {
        var icon =  {
          "Prayers": [FontAwesome5, "hands"],
          "Favorites": [MaterialIcons, "star"],
          "Calendar": [MaterialIcons, "date-range"],
          // "Settings": [MaterialIcons, "settings"],
        }[navigation.state.key]

        return {
          tabBarIcon: ({ tintColor }) => React.createElement(icon[0], {name: icon[1], color: tintColor, size: 20})
        }
      },
      tabBarOptions: {
        showLabel: false,
        activeTintColor: t.colors.text,
        inactiveTintColor: t.colors.quartenary,
        style: [t.bg1, s.noBorder, {borderTopColor: "transparent"}],
        labelStyle: [{}],
        tabStyle: [{}],
      },
      headerMode: 'none',
      initialRouteName: "Prayers",
    })

    MenuNavigator.prototype.componentDidMount = function (a) {
      global.goToTab = this._navigation.navigate
    }

    return <MenuNavigator/>
  }
}

export default observer(Menu)
