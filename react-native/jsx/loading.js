'use strict'

import React, {Component} from 'react'
import {
  Image,
  View,
  Animated,
} from 'react-native'

var s    = require('./styles')
var t    = require('./themes')
var Anim = require('./animation')

module.exports = React.createClass({
  getInitialState() {
    return {
      spinning: new Animated.Value(0),
    }
  },
  componentDidMount() {
    this.spin()
  },
  spin () { Anim.continuous(this.state.spinning) },
  render() {
    var spin = this.state.spinning.interpolate({
      inputRange:  [0, 1],
      outputRange: ['0deg', '360deg'],
    })

    return <View style={this.props.style || [s.container, s.absolute, {}]}>
      <Animated.Image
        source={t[this.props.theme].loading}
        style={[s.center, {
          width: 250,
          height: 250,
          transform: [{rotate: spin}],
        }]}
      />
    </View>
  }
})
