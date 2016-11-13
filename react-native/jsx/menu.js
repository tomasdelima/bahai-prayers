'use strict'

import React, {Component} from 'react'
import {
  View,
  ListView,
  Text,
  TouchableHighlight,
} from 'react-native'

const s = require('./styles')

module.exports = React.createClass({
  goToMenuItem (id) {
    console.log(Object.keys(global.navigator))
    if (id == 'configurations') {
      global.navigator.root.push({id: id})
    } else {
      global.navigator.root.pop()
    }
  },
  render () {
    return <View style={s.red}>
      <TouchableHighlight underlayColor='rgba(0,0,0,0.2)' onPress={() => {this.goToMenuItem('categories')}}><Text>Orações</Text></TouchableHighlight>
      <TouchableHighlight underlayColor='rgba(0,0,0,0.2)' onPress={() => {this.goToMenuItem('configurations')}}><Text>Configurações</Text></TouchableHighlight>
    </View>
  },
})

