'use strict'

import React, {Component} from 'react'
import {
  ScrollView,
  TouchableHighlight,
  Text,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

var s = require('../styles')

module.exports = React.createClass({
  goToParent () {
    global.navigator.pop()
  },
  render () {
    if (this.props.prayer) {
      return <ScrollView style={[s.absolute, {}]} contentContainerStyle={[]}>
        <TouchableHighlight underlayColor='rgba(0,0,0,0)' onLongPress={this.goToParent}>
          <View style={[s.container, s.justifyLeft, {}]}>
            <View style={[s.container, {}]}>
              {((this.props.prayer || {}).body || '').split('<br><br>').map((paragraph, i) =>
                <Text key={i} style={[s.item, s.justifyLeft, s.paddingDown, {}]}>{paragraph}</Text>
              )}
            </View>
            <Text style={[s.right, s.paddingH, s.top, {fontSize: 25, marginBottom: 400}]}>{(this.props.prayer || {}).author}</Text>
          </View>
        </TouchableHighlight>
      </ScrollView>
    } else {
      return null
    }
  },
})

