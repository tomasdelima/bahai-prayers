'use strict'

import React, {Component} from 'react'
import {
  ScrollView,
  TouchableHighlight,
  Text,
  Image,
  View,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome'

const IconButton = require('./icon-button')
const s          = require('../styles')
const t          = require('../themes')

module.exports = React.createClass({
  getInitialState() {
    return {prayer: this.props.prayer}
  },
  toggleStared () {
    this.state.prayer.stared = !this.state.prayer.stared
    global.db.update('prayers', this.state.prayer).then(() => {
      this.setState({prayer: this.state.prayer})
    })
    global.db.flushCache('loaded:prayers:' + JSON.stringify({active: [true], stared: [true]}))
  },
  render () {
    if (this.state.prayer) {
      var letterCount = this.state.prayer.body.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,"\n").split(" ").length

      return <View style={[s.container, s.justifyLeft]}>
        <Text style={[s.shrink, s.item, s.justifyLeft, t[this.props.theme].text, {height: 50, lineHeight: 25}]}>
          <Text style={[s.inlineCategory, s.noFontFamily]}>{this.state.prayer.category ? this.state.prayer.category + '   ' : ''}</Text>
          {this.state.prayer.body.replace(/<br><br>/gi, ' ')}
        </Text>
        <View style={[s.container, s.row, s.justifyCenter, {height: 50}]}>
          <Text style={[t[this.props.theme].text, s.translucid, s.textAlignCenter, {width: 200, textAlign: 'right'}]}>{letterCount} palavras</Text>
          <IconButton lib='FontAwesome' onPress={this.toggleStared} theme={this.props.theme} width={50} height={50} size={20} outline='star-o' fill={this.props.prayer.stared ? 'star' : ''} />
          <Text style={[t[this.props.theme].text, s.translucid, s.textAlignCenter, {width: 200, textAlign: 'left'}]}>{this.state.prayer.author}</Text>
        </View>
        <Image source={t[this.props.theme].arabesco2} style={[s.center, s.translucid, {width: 40, height: 40, top: 10}]}/>
      </View>
    } else {
      return null
    }
  },
})

