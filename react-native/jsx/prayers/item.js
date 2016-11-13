'use strict'

import React, {Component} from 'react'
import {
  TouchableHighlight,
  Text,
  View,
  Dimensions,
} from 'react-native'

var Category = require('./category')
var Prayer   = require('./prayer')
var s        = require('../styles')

module.exports = React.createClass({
  goToChild () {
    if (this.props.type == 'categories') {
      global.navigation.goToCategory(this.props.item.id)
    } else if (this.props.type == 'prayers') {
      global.navigation.goToPrayer(this.props.item)
    }
  },
  goToParent () {
    global.navigator.pop()
    global.navigator.pop()
  },
  render () {
    var text = this.props.type == 'categories' ? <Category item={this.props.item}/> : <Prayer prayer={this.props.item}/>

    return <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={this.goToChild} onLongPress={this.goToParent} >
      <View style={[s.container, s.marginV, {}]}>
        {text}
      </View>
    </TouchableHighlight>
  },
})

