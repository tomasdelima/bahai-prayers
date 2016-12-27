'use strict'

import {AsyncStorage} from 'react-native'

var themes = {
  light: {
    text:       { color: 'black' },
    purpleText: { color: '#301934' },
    fill:       { color: 'yellow' },
    outline:    { color: '#333' },
    background: { backgroundColor: 'white' },
    cardboard:  { backgroundColor: '#eee' },
    card:       { backgroundColor: 'white', borderColor: '#ccc' },
    indicator:  { backgroundColor: '#ccc', borderColor: '#999' },
    counter:    { color: '#666' },
    arabesco:   require('../images/arabesco-light.png'),
    arabesco2:  require('../images/arabesco-2-light.png'),
    loading:    require('../images/nine-pointed-star-light.png'),
  },
  dark: {
    text:       { color: 'white' },
    purpleText: { color: '#0ca' },
    fill:       { color: 'goldenrod' },
    outline:    { color: '#ddd' },
    background: { backgroundColor: 'black' },
    cardboard:  { backgroundColor: 'black' },
    card:       { backgroundColor: '#333', borderColor: '#999'},
    indicator:  { backgroundColor: '#555', borderColor: '#999' },
    counter:    { color: '#aaa' },
    arabesco:   require('../images/arabesco-dark.png'),
    arabesco2:  require('../images/arabesco-2-dark.png'),
    loading:    require('../images/nine-pointed-star-dark.png'),
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
