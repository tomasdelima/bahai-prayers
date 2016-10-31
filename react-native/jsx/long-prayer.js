'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
} from 'react-native'

var s = require('./styles')

var LongPrayer = React.createClass({
  goToParent () {
    this.props.navigation.goToCategory(this.props.prayer.category_id)
  },
  render () {
    var paragraphs = this.props.prayer.body.split('<br><br>')
    return <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onLongPress={this.goToParent}>
      <View>
        {paragraphs.map((paragraph, i) => <Text key={i} style={s.item}>{paragraph}</Text>)}
      </View>
    </TouchableHighlight>
  },
})

module.exports = LongPrayer
