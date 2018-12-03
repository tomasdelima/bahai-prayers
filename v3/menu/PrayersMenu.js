import React from 'react'
import { createStackNavigator, NavigationActions, createBottomTabNavigator, createDrawerNavigator } from 'react-navigation'

import Tags from '../components/Tags'
import Prayers from '../components/Prayers'
import Prayer from '../components/Prayer'

var PrayersMenu = createStackNavigator({
  Tags: Tags,
  Prayers: Prayers,
  Prayer: Prayer,
}, {
  headerMode: 'none',
})

PrayersMenu.prototype.componentDidMount = function (a) {
  global.back = this.props.navigation.pop

  autorun(() => {
    if (store.route.goBack) {
      store.history.pop()
      store.route.goBack = false

      if (this.props.navigation.state.routes.length == 1) {
        log("Goodbye!")
        BackHandler.exitApp()
      } else {
        log("Going back")
        this.props.navigation.pop()
      }
    } else if (store.route.screen) {
      store.history.push(store.route)
      log("Navigating to " + store.route.screen + " with params: " + JSON.stringify(store.route.params))
      this.props.navigation.navigate(store.route.screen, store.route.params)
    }
  })
}

export default PrayersMenu
