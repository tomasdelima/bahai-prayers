import React from 'react'
import { createStackNavigator, NavigationActions } from 'react-navigation'

import Tags from '../components/Tags'
import Prayers from '../components/Prayers'
import Prayer from '../components/Prayer'

var Navigator = createStackNavigator({
  Tags: {screen: Tags},
  Prayers: {screen: Prayers},
  Prayer: {screen: Prayer},
}, {
  initialRouteName: 'Tags',
  headerMode: 'none',
})

Navigator.prototype.componentDidMount = function () {
  global.back = this._navigation.pop

  autorun(() => {
    if (store.route.goBack) {
      store.history.pop()

      if (this._navigation.state.routes.length == 1) {
        console.log("Goodbye!")
        BackHandler.exitApp()
      } else {
        console.log("Going back")
        this._navigation.pop()
      }
    } else if (store.route.screen) {
      store.history.push(store.route)
      console.log("Navigating to " + store.route.screen + " with params: " + JSON.stringify(store.route.params))
      this._navigation.navigate(store.route.screen, store.route.params)
    }
  })
}

export default Navigator
