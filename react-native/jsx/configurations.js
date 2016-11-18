'use strict'

import React, {Component} from 'react'
import {
  View,
  ListView,
  Text,
  AsyncStorage,
  Picker,
  Switch,
  TouchableHighlight,
} from 'react-native'

const s = require('./styles')
const t = require('./themes')

module.exports = React.createClass({
  getInitialState() {
    return {
      theme: undefined,
    }
  },
  componentDidMount() {
    t.getTheme(this)
  },
  toggleTheme () {
    t.setTheme(this, this.state.darkTheme ? 'light' : 'dark')
    this.setState({darkTheme: !this.state.darkTheme})
    this.props.reloadTheme()
  },
  render () {
    return <View style={[t[this.state.theme].background, s.high, {}]}>
      <View style={[s.row, s.marginV, {}]}>
        <Text style={[s.item, t[this.state.theme].text]}>Modo noturno:</Text>
        <View style={[s.flex, {}]}>
          <Switch style={[{}]} onValueChange={this.toggleTheme} value={this.state.darkTheme} />
        </View>
      </View>
    </View>
  },
})

