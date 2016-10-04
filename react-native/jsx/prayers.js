'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'

var Prayer = require('./prayer')
var NavBar   = require('./nav-bar')

var Prayers = React.createClass({
  prayers() {
  },
  getInitialState() {
    return {prayers: [
      {
        active:      true,
        author:      "Not a real author",
        body:        "Not a real prayer 1",
        category_id: 1,
        id:          1,
        preamble:    "",
      }, {
        active:      true,
        author:      "Not a real author",
        body:        "Not a real prayer 2",
        category_id: 1,
        id:          2,
        preamble:    "",
      }
    ]}
  },
  componentDidMount() {
    var url = this.props.remoteHost + '/categories/' + this.props.categoryId + '/prayers.json'
    console.log('Fetching data from: ' + url)
    fetch(url).then(function(response) {
      this.setState({prayers: JSON.parse(response._bodyInit)})
    }.bind(this), function (error) {
      console.log(error)
    })
  },
  render () {
      <NavBar navigator={this.props.navigator} categoryId={this.props.categoryId} returnTo='category' />
    return <View style={styles.prayers}>
      <NavBar navigator={this.props.navigator} returnTo='categories' />
      {this.state.prayers.map(prayer => <Prayer key={prayer.id} prayer={prayer}/> )}
    </View>
  },
})

var styles = StyleSheet.create({
  prayers: {
    margin: 40,
  },
})

module.exports = Prayers;
