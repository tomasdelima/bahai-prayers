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
  marginH:      { marginHorizontal: 15 },
  marginV:      { marginVertical: 15 },
  paddingDown:  { paddingBottom: 10 },
  rotate:       { transform: [{rotate: '90deg'}] },
  justifyLeft:  { justifyContent: 'flex-start' },
  justifyRight: { justifyContent: 'flex-end' },
  justifyCenter:{ justifyContent: 'center' },
  alignCenter:  { alignItems: 'center' },
  translucid:   { opacity: 0.6 },
  red:          { backgroundColor: 'rgba(255, 0, 0, 0.2)' },
  blue:         { backgroundColor: 'rgba(0, 0, 255, 0.2)' },
  green:        { backgroundColor: 'rgba(0, 255, 0, 0.2)' },
  gray:         { backgroundColor: 'rgba(128, 128, 128, 0.2)' },
  white:        { backgroundColor: 'white' },
  high:         { height: windowHeight },
  wide:         { width: windowWidth },
  highInverted: { width: windowHeight },

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
  textAlignCenter: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  // Specific
  letterCount: {
    width: windowWidth - 200,
    backgroundColor: 'red',
  },
  scrollView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  floatingButtonsContainer: {
    backgroundColor: '#f9f9f9',
    borderColor: '#ededed',
    borderRadius: 100,
    borderWidth: 3,
    margin: 10,
  },
  floatingButtonsIcon: {
    width: 70,
    height: 70,
    textAlign: 'center',
    textAlignVertical: 'center',
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

