'use strict'

import React, {Component} from 'react'
import {
  Text,
  View,
  ListView,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

var Item = require('./item')
var s    = require('../styles')

module.exports = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return {
      ds: ds,
      items: ds.cloneWithRows(this.props.items || []),
    }
  },
  componentDidUpdate(prevProps, prevState) {
    if (this.props.items != prevProps.items) {
      this.setState({items: this.state.ds.cloneWithRows(this.props.items || [])})
    }
  },

  render() {
    if (this.props.items) {
      return <View style={[s.container, s.absolute, {}]}>
        <ListView dataSource={this.state.items} renderRow={(item, a ,i) => <Item goToPrayer={this.state.goToPrayer} item={item} type={this.props.type}/>} />
      </View>
    } else {
      return null
    }
  }
})
