'use strict'

import React, {Component} from 'react'
import {AppRegistry} from 'react-native'

var Index = require('./jsx/index')

var Root = React.createClass({
  render () {
    return <Index/>
  },
})

AppRegistry.registerComponent('BahaiPrayers', () => {return Root})
