'use strict'

import React, {Component} from 'react'
import {
  ScrollView,
  TouchableHighlight,
  Text,
  Image,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const s = require('../styles')
const t = require('../themes')

module.exports = React.createClass({
  renderSimpleLineIcon (type) {
    var position = type == 'fill' ? 'absolute' : 'relative'

    if (!this.props[type] || !this.props.lib) {
      return null
    } else if (this.props.lib == 'SimpleLineIcons') {
      return <SimpleLineIcons style={[t[this.props.theme][type], s.textAlignCenter, {width: this.props.width, height: this.props.height, top: 0, position: position}]} name={this.props[type]} size={this.props.size} onPress={this.props.onPress}/>
    } else if (this.props.lib == 'FontAwesome') {
      return <FontAwesome     style={[t[this.props.theme][type], s.textAlignCenter, {width: this.props.width, height: this.props.height, top: 0, position: position}]} name={this.props[type]} size={this.props.size} onPress={this.props.onPress}/>
    }
  },
  render () {
    return <View style={[s.center, s.static, s.alignCenter, s.justifyCenter, {height: this.props.height}]}>
      {this.renderSimpleLineIcon('fill')}
      {this.renderSimpleLineIcon('outline')}
    </View>
  },
})

