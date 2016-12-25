'use strict'

import React, {Component} from 'react'
import {
  View,
  ListView,
  Text,
  TouchableHighlight,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const s = require('./styles')
const t = require('./themes')

module.exports = React.createClass({
  goToMenuItem (id) {
    global.navigator.root.push({id: id})
    this.props.closeMenu()
  },
  menuItem (label, routeId, iconName) {
    return <TouchableHighlight underlayColor='rgba(0,0,0,0.2)' onPress={() => {this.goToMenuItem(routeId)}}>
      <View style={[s.row]}>
        <Ionicons style={[t[this.props.theme].outline, s.textAlignCenter, {left: 15}]} name={iconName} size={30}/>
        <Text style={[s.paddingV, s.item, t[this.props.theme].text, s.noFontFamily]}>{label}</Text>
      </View>
    </TouchableHighlight>
  },
  render () {
    return <View style={[t[this.props.theme].background, {}]}>
      <View style={[s.high, s.gray, {}]}>
        {this.menuItem('Orações',           'prayers',              'md-medal')}
        {this.menuItem('Orações Especiais', 'special-prayers',      'ios-ribbon')}
        {this.menuItem('Favoritas',         'stared-prayers',       'md-star')}
        {this.menuItem('Calendário',        'calendar',             'md-calendar')}
        {this.menuItem("95 Alláh'u'Abhás",  'allah-u-abha-counter', 'md-finger-print')}
        {this.menuItem('Configurações',     'configurations',       'md-settings')}
      </View>
    </View>
  },
})

