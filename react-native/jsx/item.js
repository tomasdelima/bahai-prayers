'use strict'

import React, {Component} from 'react'
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  TextInput,
} from 'react-native'

var s          = require('./styles')

module.exports = React.createClass({
  goToChild () {
    if (this.props.type == 'categories') {
      this.props.navigation.goToCategory(this.props.item.id)
    } else if (this.props.type == 'prayers') {
      this.props.navigation.goToPrayer(this.props.item)
    }
  },
  goToParent () {
           if (this.props.type == 'categories') {
    } else if (this.props.type == 'prayers') {
      this.props.navigation.goToCategories(this.props.item.id)
    } else if (this.props.type == 'prayer') {
      this.props.navigation.goToCategory(this.props.item.id)
    }
  },
  render () {
    return <TouchableHighlight underlayColor='rgba(0,0,0,0.1)' onPress={this.goToChild} onLongPress={this.goToParent} >
      <Text style={s.item}>{this.props.item.title || this.props.item.body.slice(0, 30)}</Text>
    </TouchableHighlight>
  },
})

