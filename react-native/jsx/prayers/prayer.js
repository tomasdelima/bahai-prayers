'use strict'

import React, {Component} from 'react'
import {
  ScrollView,
  TouchableHighlight,
  Text,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

var s = require('../styles')
var t = require('../themes')

module.exports = React.createClass({
  render () {
    if (this.props.prayer) {
      var letterCount = this.props.prayer.body.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,"\n").split(" ").length

      return <View style={[s.container, s.justifyLeft, {
      }]}>
        <Text style={[s.shrink, s.item, s.justifyLeft, t[this.props.theme].text, {height: 50, lineHeight: 25}]}>{this.props.prayer.body.replace(/<br><br>/gi, ' ')}</Text>
        <View style={[s.static, s.container, s.row, s.justifyRight, {}]}>
          <Text style={[t[this.props.theme].text, {marginRight: 20}]}>{letterCount} palavras</Text>
          <Text style={[t[this.props.theme].text, {width: 140}]}>{this.props.prayer.author}</Text>
        </View>
      </View>
    } else {
      return null
    }
  },
})

