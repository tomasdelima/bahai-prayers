'use strict'

import {AsyncStorage} from 'react-native'

var themes = {
  light: {
    text: { color: 'black' },
    background: { backgroundColor: 'white' },
    arabesco: require('../images/arabesco-light.png'),
    arabesco2: require('../images/arabesco-2-light.png'),
    loading: require('../images/nine-pointed-star-light.png'),
  },
  dark: {
    text: { color: 'white' },
    background: { backgroundColor: 'black' },
    arabesco: require('../images/arabesco-dark.png'),
    arabesco2: require('../images/arabesco-2-dark.png'),
    loading: require('../images/nine-pointed-star-dark.png'),
  },
  getTheme: (scope) => {
    AsyncStorage.getItem('theme', (a, theme) => {
      console.log('THEME: GET:    ' + theme)
      scope.setState({theme: theme, darkTheme: theme == 'dark'})
    })
  },
  setTheme: (scope, newTheme) => {
    console.log('THEME: SET:    ' + newTheme)
    AsyncStorage.setItem('theme', newTheme)
    scope.setState({theme: newTheme, darkTheme: newTheme == 'dark'})
  },
}

themes[undefined] = themes['light']
themes[null] = themes['light']
module.exports = themes
