'use strict'

import React, {Component} from 'react'
import {
  View,
  ScrollView,
  Text,
} from 'react-native'

const Facts = require('./facts')
const Data  = require('./data')
const s     = require('../styles')
const t     = require('../themes')

module.exports = React.createClass({
  renderDates () {
    var day = this.props.day

    return <View style={[s.card2, s.row, t[this.props.theme].card, s.widthForHeight]}>
      {this.renderDate(this.props.year, day.monthName, day.id)}
      {this.renderDate(day.gregorian.getFullYear(), day.gregorian.getMonthName(), day.gregorian.getDate())}
    </View>
  },
  renderDate (year, month, day) {
    var textStyle = [s.textAlignCenter, t[this.props.theme].text]

    return <View style={[s.justifyCenter, s.flex]}>
      <Text style={[textStyle, t[this.props.theme].purpleText, {fontSize: 120}]}>{day}</Text>
      <Text style={[textStyle, {fontSize: 30}]}>{month}</Text>
      <Text style={[textStyle, {fontSize: 50}]}>{year}</Text>
    </View>
  },
  renderHoliday () {
    var textStyle = [s.textAlignCenter, t[this.props.theme].text]

    if (this.props.day.holidays) {
      return <View style={[s.card2, s.padding, t[this.props.theme].card]}>
        <Text style={[t[this.props.theme].text, {opacity: 0.65, fontSize: 17}]}>Dia Sagrado:</Text>
        <Text style={[s.textAlignCenter, s.padding, t[this.props.theme].purpleText, {fontSize: 25}]}>{this.props.day.holidays[0].name}</Text>
      </View>
    } else {
      return null
    }
  },
  render () {
    return <ScrollView style={[t[this.props.theme].cardboard]}>
      <View style={[s.flex]}>
        {this.renderDates()}
        {this.renderHoliday()}
        <Facts theme={this.props.theme} date={this.props.day.gregorian}/>
      </View>
    </ScrollView>
  },
})
