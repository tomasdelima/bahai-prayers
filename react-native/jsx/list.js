'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  Animated,
  Image,
  View,
  ListView,
  TextInput,
} from 'react-native'

var Item    = require('./item')
var s = require('./styles')

module.exports = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      ds: ds,
      items: ds.cloneWithRows(this.props.items),
      fading: new Animated.Value(0),
    }
  },
  fade (toValue) {
    Animated.timing(this.state.fading, {
      toValue: toValue,
      duration: 500,
    }).start()
  },
  componentDidMount() {
    this.fade(1)
    setTimeout(() => { this.setState({loading: false}) }, 1000)
  },
  render() {
    return <Animated.View style={[s.container, {opacity: this.state.fading}]}>
      <ListView dataSource={this.state.items} renderRow={(item, a ,i) => <Item navigation={this.props.navigation} item={item} type={this.props.type}/>} />
    </Animated.View>
  }
})
