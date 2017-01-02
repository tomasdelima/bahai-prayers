'use strict'

import React, {Component} from 'react'
import {
  View,
  TouchableHighlight,
  Text,
} from 'react-native'

const Fact = require('./fact')
const s    = require('../styles')
const t    = require('../themes')

module.exports = React.createClass({
  getInitialState() {
    return {facts: []}
  },
  componentDidMount() {
    this.loadFactsFromDB()
  },
  loadFactsFromDB () {
    if (global.db.loadFromDB) {
      global.db.loadFromDB('facts', {day: [this.props.date.getDate()], month: [this.props.date.getMonth()], active: [true]}, 'relevance').then((facts) => {
        this.setState({facts: facts})
      })
    } else {
      console.log('ERROR: global.db.loadFromDB is not defined. Trying to load again')
      setTimeout(this.loadFactsFromDB, 100)
    }
  },
  render () {
    if (this.state.facts.length > 0) {
      return <View style={[s.card2, s.padding, t[this.props.theme].card]}>
        <Text style={[t[this.props.theme].text, {opacity: 0.65, fontSize: 17}]}>Fatos:</Text>
        {this.state.facts.map((fact, i) => <Fact key={i} fact={fact} theme={this.props.theme}/>)}
      </View>
    } else {
      return null
    }
  },
})
