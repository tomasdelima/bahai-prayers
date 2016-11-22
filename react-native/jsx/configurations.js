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
    this.loadWatermarkVisibility()
  },
  loadWatermarkVisibility () {
    AsyncStorage.getItem('showWatermark', (a, showWatermark) => {
      console.log('WATER: GET:    ' + showWatermark)
      this.setState({showWatermark: showWatermark == 'true' || showWatermark == null})
    })
  },
  toggleTheme () {
    t.setTheme(this, this.state.darkTheme ? 'light' : 'dark')
    this.setState({darkTheme: !this.state.darkTheme})
    this.props.reloadTheme()
  },
  toggleWatermarkVisibility () {
    var newValue = !this.state.showWatermark
    console.log('WATER: SET:    ' + newValue)
    AsyncStorage.setItem('showWatermark', '' + newValue)
    this.setState({showWatermark: newValue})
  },
  render () {
    return <View style={[t[this.state.theme].background, s.high, {}]}>
      <View style={[s.row, s.marginV]}>
        <Text style={[s.item, t[this.state.theme].text]}>Modo noturno:</Text>
        <View style={[s.flex, s.marginH]}>
          <Switch onValueChange={this.toggleTheme} value={this.state.darkTheme} />
        </View>
      </View>

      <View style={[s.row, s.marginV]}>
        <Text style={[s.item, t[this.state.theme].text]}>Mostrar marca dágua:</Text>
        <View style={[s.flex, s.marginH]}>
          <Switch onValueChange={this.toggleWatermarkVisibility} value={this.state.showWatermark} />
        </View>
      </View>
    </View>
  },
})

