'use strict'

import React, {Component} from 'react'
import {
  Text,
  View,
  ListView,
  ScrollView
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
        <ScrollView>
          <View>
            {this.props.items.map((item, i) => {return <Item key={i} goToPrayer={this.state.goToPrayer} item={item} type={this.props.type} theme={this.props.theme}/>})}
          </View>
        </ScrollView>
      </View>
    } else {
      return null
    }
  }
})
