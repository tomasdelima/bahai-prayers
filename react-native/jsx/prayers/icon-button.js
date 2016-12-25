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
      return <SimpleLineIcons style={[t[this.props.theme][type], s.textAlignCenter, {width: this.props.width, height: this.props.height, top: 0, position: position}]} name={this.props[type]} size={this.props.size}/>
    } else if (this.props.lib == 'FontAwesome') {
      return <FontAwesome     style={[t[this.props.theme][type], s.textAlignCenter, {width: this.props.width, height: this.props.height, top: 0, position: position}]} name={this.props[type]} size={this.props.size}/>
    }
  },
  render () {
    return <TouchableHighlight underlayColor='rgba(128 ,128 ,128 , 0.3)' onPress={this.props.onPress} style={[s.center, s.static, s.alignCenter, s.justifyCenter, {height: this.props.height}]}>
      <View>
        {this.renderSimpleLineIcon('fill')}
        {this.renderSimpleLineIcon('outline')}
      </View>
    </TouchableHighlight>
  },
})

