'use strict'

import React, {Component} from 'react'
import {
  View,
  Text,
} from 'react-native'

const Data = require('./data')
const s    = require('../styles')
const t    = require('../themes')

module.exports = React.createClass({
  render () {
    var day = this.props.day
    var textStyle = [s.textAlignCenter, s.flex, t[this.props.theme].text]

    if (day.id == 'month') {
      return <View style={[s.flex]}>
        <Text style={[textStyle, s.flex2, {fontSize: 30}]}>{day.year}</Text>
        <Text style={[textStyle, {fontSize: 20}]}>{day.month.arabicName}</Text>
        <Text style={[textStyle, {fontSize: 20}]}>{day.month.portugueseName}</Text>
      </View>
    } else {
      return <View style={[s.flex]}>
        <View style={[s.flex, s.card, t[this.props.theme].card]}>
          <Text style={[textStyle, {fontSize: 25}]}>{day.id}</Text>
          <Text style={[textStyle, {fontSize: 18}]}>{day.gregorian.toString()}</Text>
        </View>
        <View style={[s.gregorianMonthBar, s.static, s.row, {backgroundColor: Data.colors[day.gregorian.getMonth()]}]}/>
      </View>
    }
  },
})
