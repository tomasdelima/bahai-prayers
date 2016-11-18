'use strict'

import React, {Component} from 'react'
import {
  Image,
  View,
  Animated,
} from 'react-native'

var s    = require('./styles')
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

    var image = this.props.theme == 'dark' ? require('../images/nine-pointed-star-dark.png') : require('../images/nine-pointed-star-light.png')

    return <View style={[s.container, s.absolute, {}]}>
      <Animated.Image
        source={image}
        style={[s.center, {
          width: 250,
          height: 250,
          transform: [{rotate: spin}],
        }]}
      />
    </View>
  }
})
