'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'

var Prayer = require('./prayer')

var Prayers = React.createClass({
  prayers() {
  },
  getInitialState() {
    return {prayers: [
      {
        active:      true,
        author:      "Not a real author",
        body:        "Not a real prayer",
        category_id: -1,
        created_at:  "2015-02-07T00:05:30.496Z",
        id:          -1,
        preamble:    "",
        updated_at:  "2016-08-06T03:28:51.595Z",
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
    return <View style={styles.prayers}>
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
