'use strict'

import React, {Component} from 'react'
import {
  View,
  ListView,
  AsyncStorage,
  TouchableHighlight,
  Text,
} from 'react-native'

const Data = require('./data')
const s    = require('../styles')
const t    = require('../themes')

module.exports = React.createClass({
  render () {
    var month = this.props.month
    var textStyle = [s.textAlignCenter, s.flex, t[this.props.theme].text]

    if (month.id == 'year') {
      return <View style={[s.flex]}>
        <Text style={[textStyle, {fontSize: 30}]}>{month.year}</Text>
      </View>
    } else {
      var range = month.gregorianStart.toString() + ' - ' + month.gregorianEnd.toString()

      return <TouchableHighlight underlayColor='rgba(0,0,0,0)' style={[s.flex]} onPress={() => global.navigation.goToMonth(this.props.year, month.id)}>
        <View style={[s.flex]}>
          <View style={[s.flex, s.card, t[this.props.theme].card]}>
            <Text style={textStyle}>{month.arabicName}</Text>
            <Text style={textStyle}>{month.portugueseName}</Text>
            <Text style={textStyle}>{range}</Text>
          </View>
          <View style={[s.gregorianMonthBar, s.static, s.row]}>
            <View style={[{backgroundColor: Data.colors[month.gregorianStart.getMonth()], flex: month.gregorianNewMonth || 1}]}/>
            <View style={[{backgroundColor: Data.colors[month.gregorianEnd.getMonth()], flex: 19 - month.gregorianNewMonth}]}/>
          </View>
        </View>
      </TouchableHighlight>
    }
  },
})
