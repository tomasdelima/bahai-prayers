'use strict'

import React, {Component} from 'react'
import {
  View,
  TouchableHighlight,
  Text,
} from 'react-native'

const Data = require('./data')
const s    = require('../styles')
const t    = require('../themes')

module.exports = React.createClass({
  goToDay () {
    global.navigation.goToDay(this.props.year, this.props.monthName, this.props.day)
  },
  renderHolidaysCount () {
    if (this.props.day.holidays) {
      return <View style={[t[this.props.theme].indicator, s.indicator]}>
        <Text style={[s.textAlignCenter, t[this.props.theme].text, {top: 1}]}>
          {this.props.day.holidays.length}
        </Text>
      </View>
    } else {
      return null
    }
  },
  render () {
    var day = this.props.day
    var textStyle = [s.textAlignCenter, s.flex, t[this.props.theme].text]

    if (day.id == 'month') {
      return <View style={[s.flex]}>
        <Text style={[textStyle, s.flex2, {fontSize: 30}]}>{day.year}</Text>
        <Text style={[textStyle, {fontSize: 16}]}>{day.month.arabicName}</Text>
        <Text style={[textStyle, {fontSize: 16}]}>{day.month.portugueseName}</Text>
      </View>
    } else {
      return <TouchableHighlight underlayColor='rgba(0, 0, 0, 0.1)' style={[s.flex]} onPress={this.goToDay}>
        <View style={[s.flex]}>
          <View style={[s.flex, s.card, t[this.props.theme].card]}>
            <Text style={[textStyle, {fontSize: 23}]}>{day.id}</Text>
            <Text style={[textStyle, {fontSize: 16}]}>{day.gregorian.toString()}</Text>
          </View>
          <View style={[s.gregorianMonthBar, s.static, s.row, {backgroundColor: Data.colors[day.gregorian.getMonth()]}]}/>

          {this.renderHolidaysCount()}
        </View>
      </TouchableHighlight>
    }
  },
})
