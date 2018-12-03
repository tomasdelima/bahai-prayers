import React from 'react'
import { createStackNavigator, NavigationActions, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'

var CalendarMenu = createStackNavigator({
  Calendar: Calendar,
  Year: Year,
  Month: Month,
  Day: Day,
}, {
  headerMode: 'none',
})

CalendarMenu.prototype.componentDidMount = function (a) {
  global.back = this.props.navigation.pop

  autorun(() => {
    if (store.route.goBack) {
      store.history.pop()

      if (this.props.navigation.state.routes.length == 1) {
        // console.log("Goodbye!")
        // BackHandler.exitApp()
        store.route = {screen: "Tags"}
      } else {
        console.log("Going back")
        this.props.navigation.pop()
      }
    } else if (store.route.screen) {
      store.history.push(store.route)
      console.log("Navigating to " + store.route.screen + " with params: " + JSON.stringify(store.route.params))
      this.props.navigation.navigate(store.route.screen, store.route.params)
    }
  })
}

export default CalendarMenu
