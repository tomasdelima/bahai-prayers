'use strict'

import React, {Component} from 'react'
import {
  Text,
  View,
  ListView,
  TextInput,
  ScrollView
} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'

var Item = require('./item')
var s    = require('../styles')
var t    = require('../themes')

module.exports = React.createClass({
  getInitialState() {
    return {
      items: this.props.items,
      type: this.props.type,
      keywords: '',
    }
  },
  searchPrayers () {
    if (global.db.fullTextSearch) {
      if (this.state.keywords != '') {
        this.setState({lastSearch: Date.now(), searching: true})
        global.db.fullTextSearch('prayers', this.state.keywords).then((response) => {
          if (!this.lastSearch || response.start > this.state.lastSearch) {
            this.setState({type: 'prayers', items: response.data, searching: false})
          }
        })
      }
    } else {
      console.log('ERROR: global.db.fullTextSearch is not defined. Trying to load again')
      setTimeout(this.searchPrayers, 100)
    }
  },
  clearSearch () {
    this.setState(this.getInitialState())
  },
  updateSearchText (event) {
    var text = event.nativeEvent.text
    if (text == '') {
      this.clearSearch()
    } else {
      this.setState({keywords: text})
    }
  },

  render() {
    if (this.props.items) {
      return <View style={[s.container, s.absolute, {}]}>
        <ScrollView>
          <View>
            <View style={[s.row, s.marginH]}>
              <TextInput style={[s.flex, t[this.props.theme].text, s.searchInput]} onChange={this.updateSearchText} onSubmitEditing={this.searchPrayers} value={this.state.keywords} keyboardType="web-search" underlineColorAndroid="#095" />
              <Icon onPress={this.clearSearch} name="close" size={30} color="#095" style={[s.static, s.textAlignCenter, {width: 55}]}/>
            </View>
            {this.state.items.map((item, i) => {return <Item key={i} goToPrayer={this.state.goToPrayer} item={item} type={this.state.type} theme={this.props.theme}/>})}
          </View>
        </ScrollView>
      </View>
    } else {
      return null
    }
  }
})
