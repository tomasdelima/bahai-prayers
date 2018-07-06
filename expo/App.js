import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
require('./Import')

export default class App extends React.Component {
  componentDidMount () {
    new Data().load()
  }

  render() {
    return <View>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  }
}
