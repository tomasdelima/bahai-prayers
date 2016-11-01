'use strict'

import React, {Component} from 'react'
import {StyleSheet, Dimensions} from 'react-native'

var windowHeight = Dimensions.get('window').height
var windowWidth  = Dimensions.get('window').width

module.exports = StyleSheet.create({
  // General: simple
  empty:        { },
  row:          { flexDirection: 'row' },
  shrink:       { flex: -1 },
  static:       { flex: 0 },
  flex:         { flex: 1 },
  center:       { alignSelf: 'center' },
  right:        { textAlign: 'right', right: 50 },
  top:          { top: 20 },
  paddingH:     { paddingHorizontal: 30 },
  paddingV:     { paddingVertical: 15 },
  marginV:      { marginVertical: 15 },
  paddingDown:  { paddingBottom: 10 },
  justifyLeft:  { justifyContent: 'flex-start' },
  justifyRight: { justifyContent: 'flex-end' },
  red:          { backgroundColor: 'rgba(255, 0, 0, 0.2)' },
  blue:         { backgroundColor: 'rgba(0, 0, 255, 0.2)' },
  green:        { backgroundColor: 'rgba(0, 255, 0, 0.2)' },
  white:        { backgroundColor: 'white' },
  high:         { height: windowHeight },

  // General: complex
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  item: {
    fontSize: 20,
    marginHorizontal: 30,
    fontFamily: 'timeless',
  },
  absolute: {
    position: 'absolute',
    height: windowHeight - 50,
    width: windowWidth,
    top: 20,
    left: 0,
  },

  // Specific
  letterCount: {
    // left: windowWidth * 2 / 3,
    width: windowWidth - 200,
    // left: 200,
    // width: windowWidth/2,
    // position: 'relative',
    backgroundColor: 'red',
    // marginLeft: 200,
  },
  scrollView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  navBar: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#ccc',
    alignItems: 'center',
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
})

