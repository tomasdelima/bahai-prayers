'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Image,
  Easing,
  View,
  Text,
  Animated,
} from 'react-native'

var s = require('./styles')

var Loading = React.createClass({
  getInitialState() {
    return {
      spinning: new Animated.Value(0),
      fading: new Animated.Value(0),
      growing: new Animated.Value(200),
    }
  },
  componentDidMount() {
    this.spin()
    this.fade(1)
  },
  componentDidUpdate(newProps, newState) {
    this.grow()
    this.fade(0, this.props.finishLoading)
  },
  fade (toValue, callBack) {
    Animated.timing(this.state.fading, {
      toValue: toValue,
      duration: 700,
    }).start(callBack)
  },
  grow () {
    Animated.timing(this.state.growing, {
      toValue: 500,
      duration: 3000,
    }).start()
  },
  spin () {
    this.state.spinning.setValue(0)
    Animated.timing(this.state.spinning, {
      toValue: 1,
      duration: 15000,
      easing: Easing.linear
    }).start(() => this.spin())
  },
  render() {
    var spin = this.state.spinning.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    })

    return <View style={s.container}>
      <Animated.Image
        source={require('../images/nine-pointed-star.png')}
        style={[s.center, {
          width: this.state.growing,
          height: this.state.growing,
          transform: [{rotate: spin}],
          opacity: this.state.fading,
        }]}
      />
    </View>
  }
})

module.exports = Loading
