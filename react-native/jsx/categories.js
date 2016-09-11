'use strict';

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native'

var Category = require('./category')

var Categories = React.createClass({
  categories () {
    return [
      {id: 13, title: "Desprendimento", created_at: "2015-02-07T00:05:29.448Z", updated_at: "2015-02-07T00:05:29.448Z", active: true},
      {id: 17, title: "Mortos",         created_at: "2015-02-07T00:05:29.554Z", updated_at: "2015-02-07T00:05:29.554Z", active: true},
      {id: 18, title: "Humanidade",     created_at: "2015-02-07T00:05:29.582Z", updated_at: "2015-02-07T00:05:29.582Z", active: true},
    ]
  },
  render() {
    return <View style={styles.container}>
      {this.categories().map(category => <Category key={category.id} category={category} navigator={this.props.navigator} />)}
    </View>
  }
})

var styles = StyleSheet.create({
  container: {
  }
})

module.exports = Categories;
