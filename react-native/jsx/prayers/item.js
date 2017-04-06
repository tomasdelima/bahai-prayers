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
  render () {
    var text = this.props.type == 'categories' ? <Category item={this.props.item} theme={this.props.theme}/> : <Prayer prayer={this.props.item} theme={this.props.theme}/>

    return <TouchableHighlight underlayColor='rgba(0, 0, 0, 0.05)' onPress={this.props.goToChild} onLongPress={this.props.goToParent} >
      <View style={[s.container, s.marginV, {}]}>
        {text}
      </View>
    </TouchableHighlight>
  },
})

