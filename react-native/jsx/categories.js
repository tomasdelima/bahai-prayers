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
  getInitialState() {
    return {
      categories: []
    }
  },
  componentDidMount() {
    var url = this.props.remoteHost + '/categories.json'
    console.log('Fetching data from: ' + url)
    fetch(url).then(function(response) {
      this.setState({categories: JSON.parse(response._bodyInit)})
    }.bind(this), function (error) {
      console.log(error)
    })
  },
  render() {
    return <View style={styles.container}>
      <Text style={styles.header}>Categorias</Text>
      {this.state.categories.map(category => <Category key={category.id} category={category} navigator={this.props.navigator} />)}
    </View>
  }
})

var styles = StyleSheet.create({
  container: {
  },
  header: {
    fontSize: 30,
    margin: 10,
  },
})

module.exports = Categories;
