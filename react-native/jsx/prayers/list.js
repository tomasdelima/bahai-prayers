'use strict'

import React, {Component} from 'react'
import {
  Text,
  Dimensions,
  View,
  ListView,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  Image,
  ScrollView,
} from 'react-native'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import Ionicon from 'react-native-vector-icons/Ionicons'

const Loading    = require('../loading')
const Item       = require('./item')
const LongPrayer = require('./long-prayer')
const Category   = require('./category')
const Prayer     = require('./prayer')
const s          = require('../styles')
const t          = require('../themes')

module.exports = React.createClass({
  getInitialState() {
    return {
      keywords: '',
      pages: [{items: this.props.items, type: this.props.type}],
    }
  },
  componentWillMount() {
    this.scrollView = new ScrollView()
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
  goToChild (type, item) {
    if (type == 'categories') {
      global.db.loadFromDB('prayers', {category_id: [item.id], active: [true]}, 'author').then((prayers) => {
        this.state.pages.push({items: prayers, type: 'prayers'})
        this.forceUpdate()
      })
    } else if (type == 'prayers') {
      this.state.pages.push({items: [item], type: 'prayer'})
      this.forceUpdate()
    }
  },
  scrollPage (x, y) {
    this.scrollView.scrollTo({x: Math.max(0, x - Dimensions.get('window').width), animated: true})
  },
  renderPage (page, i) {
    if (page.items) {
      if (this.state.searching) {
        var content = <Loading style={[{marginTop: 100}]}/>
      } else if (page.items.length == 0) {
        var content = <Text style={[s.textAlignCenter, s.paddingH, {fontSize: 30, marginTop: 200}]}>Sua busca não trouxe resultados</Text>
      } else {
        if (page.type == 'prayer') {
          var content = <LongPrayer prayer={page.items[0]} theme={this.props.theme} reloadTheme={this.props.reloadTheme}/>
        } else {
          var content = <ScrollView style={[s.wide]}>
            {page.items.map((item, i) => this.renderItem(page.type, item, i))}
          </ScrollView>
        }
      }
      return <View key={i}>
        {this.renderTopBar(page)}
        {content}
      </View>
    } else {
      return null
    }
  },
  calculateScrollSpeed (event) {
    this.setState({lastXOffset: event.nativeEvent.contentOffset.x, xScrollSpeed: event.nativeEvent.contentOffset.x-(this.state.lastXOffset||0)})
  },
  truncateScrollPage (event) {
    var xOffset = event.nativeEvent.contentOffset.x
    var windowWidth = Dimensions.get('window').width

    if (xOffset > windowWidth * (this.state.pages.length - 1.3) - this.state.xScrollSpeed*100) {
      this.scrollPage(windowWidth * this.state.pages.length)
    } else {
      this.scrollPage(windowWidth * (this.state.pages.length - 1))
      if (this.state.pages.length > 1) {
        this.state.pages.pop()
        this.setState({pages: this.state.pages})
      }
    }
  },
  renderItem (type, item, i) {
    var text = type == 'categories' ? <Category item={item} theme={this.props.theme}/> : <Prayer prayer={item} theme={this.props.theme}/>

    return <TouchableHighlight key={i} underlayColor='rgba(0, 0, 0, 0.05)' onPress={() => this.goToChild(type, item)} onLongPress={this.props.goToParent} >
      <View style={[s.container, s.marginV, {}]}>
        {text}
      </View>
    </TouchableHighlight>
  },
  renderTopBar (page) {
    var searchInput = page.type == 'prayer' ? null : <TextInput style={[s.flex, t[this.props.theme].text, s.searchInput]} onChange={this.updateSearchText} onSubmitEditing={this.searchPrayers} value={this.state.keywords} keyboardType="web-search" underlineColorAndroid={t.green} />
    var searchIcon  = page.type == 'prayer' ? null : <EvilIcon onPress={this.clearSearch} name="close" size={30} color={t.green} style={[s.static, s.textAlignCenter, {width: 55}]}/>

    return <View style={[s.row, s.marginH]}>
      <Ionicon onPress={() => global.toggleMenu()} name="ios-menu-outline" size={40} color={t.green} style={[s.static, s.textAlignCenter, {width: 55}]}/>
      {searchInput}
      {searchIcon}
    </View>
  },
  render () {
    return <View style={[s.container, s.absolute]}>
      <ScrollView onScroll={(event) => this.calculateScrollSpeed(event)} onTouchStart={()=>{}} onTouchMove={()=>{}} onTouchEnd={()=>{}} onScrollBeginDrag={()=>{}} onScrollEndDrag={(event)=>this.truncateScrollPage(event)} onMomentumScrollBegin={()=>{}} onMomentumScrollEnd={()=>{}}
        horizontal={true} onContentSizeChange={(x, y)=>this.scrollPage(x, y)} ref={(scrollView) => {this.scrollView = scrollView}}>
        {this.state.pages.map((page, i) => this.renderPage(page, i))}
      </ScrollView>
    </View>
  },
})
