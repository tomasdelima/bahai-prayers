'use strict'

import React, {Component} from 'react'
import {
  View,
  ListView,
  Text,
  TouchableHighlight,
} from 'react-native'

const s = require('./styles')
const t = require('./themes')

module.exports = React.createClass({
  goToMenuItem (id) {
    global.navigator.root.push({id: id})
    this.props.closeMenu()
  },
  menuItem (label, routeId) {
    return <TouchableHighlight underlayColor='rgba(0,0,0,0.2)' onPress={() => {this.goToMenuItem(routeId)}}>
      <Text style={[s.paddingV, s.item, t[this.props.theme].text, {}]}>{label}</Text>
    </TouchableHighlight>
  },
  render () {
    return <View style={[t[this.props.theme].background, {}]}>
      <View style={[s.high, s.gray, {}]}>
        {this.menuItem('Orações', 'prayers')}
        {this.menuItem('Orações Especiais', 'special-prayers')}
        {this.menuItem('Favoritas', 'stared-prayers')}
        {this.menuItem("95 Alláh'u'Abhás", 'allah-u-abha-counter')}
        {this.menuItem('Configurações', 'configurations')}
      </View>
    </View>
  },
})

