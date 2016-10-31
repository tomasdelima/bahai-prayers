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

var Loading    = require('./loading')
var s = require('./styles')

var List = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      ds: ds,
      items: ds.cloneWithRows([1,2,3,4,5,6,7,8,9,0,1,2,3,4,5,6,7,8,9,0]),
      fading: new Animated.Value(0),
      // finishedLoading: true,
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
  finishLoading () {
    this.setState({finishedLoading: true})
  },
  render() {
    if(!this.state.finishedLoading) {
      return <Loading loading={this.state.loading} finishLoading={this.finishLoading}/>
    } else {
      return <Animated.View style={[s.container, {opacity: this.state.fading}]}>
        <ListView dataSource={this.state.items} renderRow={(item) => <Text style={s.category}>{item}</Text>} />
      </Animated.View>
    }
  }
})

module.exports = List
