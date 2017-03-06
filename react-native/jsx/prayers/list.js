'use strict'

import React, {Component} from 'react'
import {
  Text,
  View,
  ListView,
  TextInput,
  ScrollView,
} from 'react-native'
import Icon from 'react-native-vector-icons/EvilIcons'

const Loading = require('../loading')
const Item    = require('./item')
const s       = require('../styles')
const t       = require('../themes')

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
            global.db.loadCategoriesIntoPrayers(response.data).then((prayers) =>
              this.setState({type: 'prayers', items: prayers, searching: false})
            )
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
      if (this.state.searching) {
        var content = <Loading style={[{marginTop: 100}]}/>
      } else if (this.state.items.length == 0) {
        var content = <Text style={[s.textAlignCenter, s.paddingH, {fontSize: 30, marginTop: 200}]}>Sua busca não trouxe resultados</Text>
      } else {
        var content = this.state.items.map((item, i) => <Item key={i} goToPrayer={this.state.goToPrayer} item={item} type={this.state.type} theme={this.props.theme}/>)
      }

      return <View style={[s.container, s.absolute]}>
        <ScrollView>
          <View>
            <View style={[s.row, s.marginH]}>
              <TextInput style={[s.flex, t[this.props.theme].text, s.searchInput]} onChange={this.updateSearchText} onSubmitEditing={this.searchPrayers} value={this.state.keywords} keyboardType="web-search" underlineColorAndroid={t.green} />
              <Icon onPress={this.clearSearch} name="close" size={30} color={t.green} style={[s.static, s.textAlignCenter, {width: 55}]}/>
            </View>
            {content}
          </View>
        </ScrollView>
      </View>
    } else {
      return null
    }
  }
})
