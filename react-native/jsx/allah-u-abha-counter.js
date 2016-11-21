'use strict'

import React, {Component} from 'react'
import {
  View,
  Vibration,
  Text,
  TouchableWithoutFeedback,
} from 'react-native'

const s = require('./styles')
const t = require('./themes')

module.exports = React.createClass({
  getInitialState () {
    return {counter: 0}
  },
  addCounter () {
    if (this.state.counter == 95 - 1) {
      this.setState({finishedColor: {color: 'rgb(150, 0, 0)'}, counter: this.state.counter + 1})
      Vibration.vibrate([0, 400])
    } else if (this.state.counter < 95 - 1) {
      this.setState({counter: this.state.counter + 1})
      Vibration.vibrate([0, 20])
    }
  },
  render () {
    return <TouchableWithoutFeedback underlayColor='rgba(0,0,0,0)' onPress={this.addCounter} style={[t[this.props.theme].background, {}]}>
      <View style={[s.high, s.container]}>
        <Text style={[t[this.props.theme].counter, s.center, s.counter, this.state.finishedColor, {}]}>{this.state.counter}</Text>
      </View>
    </TouchableWithoutFeedback>
  },
})

