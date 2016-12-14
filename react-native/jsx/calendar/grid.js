'use strict'

import React, {Component} from 'react'
import {
  View,
  ListView,
  AsyncStorage,
  Text,
  TouchableHighlight,
} from 'react-native'

const Month  = require('./month')
const Day    = require('./day')
const s      = require('../styles')
const t      = require('../themes')

var colors = {
  0:  '#A02BA7',
  1:  '#7831CA',
  2:  '#5A6EEF',
  3:  '#345938',
  4:  '#2E9A42',
  5:  '#82BC5B',
  6:  '#D7F520',
  7:  '#F0BD15',
  8:  '#EE8327',
  9:  '#F14D35',
  10: '#E50E51',
  11: '#CC2E9A',
}

module.exports = React.createClass({
  getInitialState() {
    return {}
  },
  renderRow (row, i) {
    return <View key={i} style={[s.row, s.flex]}>
      {row.map((item, j) => this.renderItem(item, j))}
    </View>
  },
  renderItem (item, j) {
    if (this.props.type == 'year') {
      return <Month key={j} theme={this.props.theme} month={item} year={this.props.items.year}/>
    } else {
      return <Day key={j} theme={this.props.theme} day={item} month={this.props.items.month} year={this.props.items.year}/>
    }
  },
  render () {
    return <View style={[s.high, s.wide, t[this.props.theme].cardboard]}>
      {this.props.items.map((row, i) => this.renderRow(row, i))}
    </View>
  },
})
