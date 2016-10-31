'use strict'

import React, {Component} from 'react'
import {StyleSheet} from 'react-native'

module.exports = StyleSheet.create({
  empty: {},
  row: { flexDirection: 'row' },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  center: { alignSelf: 'center' },
  category: {
    fontSize: 20,
    margin: 30,
    fontFamily: 'timeless',
  },
  prayer: {
    fontSize: 20,
    margin: 30,
    fontFamily: 'timeless',
  },
  navBar: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#ccc',
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  navBarLeft: {
    flex: 1,
    fontSize: 26,
  }, navBarCenter: {
    fontFamily: 'timeless',
    flex: 3,
    textAlign: 'center',
    fontSize: 26,
  }, navBarRight: {
    flex: 1,
    fontSize: 26,
  },
  red: {backgroundColor: 'red'},
})

