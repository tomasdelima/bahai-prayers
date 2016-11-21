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

var s = require('../styles')
var t = require('../themes')

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
  renderStar () {
    return <View style={[s.alignCenter]}>
      <Icon style={[t[this.props.theme].stared, s.textAlignCenter, {width: 70, height: 50, opacity: this.state.prayer.stared ? 1 : 0}]} name={this.state.prayer.stared ? 'star' : 'star-o'} size={20} onPress={this.toggleStared}/>
      <Icon style={[t[this.props.theme].notStared, s.textAlignCenter, {width: 70, height: 50, top: -50}]} name={'star-o'} size={20} onPress={this.toggleStared}/>
    </View>
  },
  render () {
    if (this.state.prayer) {
      var letterCount = this.state.prayer.body.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,"\n").split(" ").length

      return <View style={[s.container, s.justifyLeft, {
      }]}>
        <Text style={[s.shrink, s.item, s.justifyLeft, t[this.props.theme].text, {height: 50, lineHeight: 25}]}>{this.state.prayer.body.replace(/<br><br>/gi, ' ')}</Text>
        <View style={[s.container, s.row,s.justifyCenter, {height: 50}]}>
          <Text style={[t[this.props.theme].text, s.translucid, s.textAlignCenter, {width: 100, textAlign: 'right'}]}>{letterCount} palavras</Text>
          {this.renderStar()}
          <Text style={[t[this.props.theme].text, s.translucid, s.textAlignCenter, {width: 100, textAlign: 'left'}]}>{this.state.prayer.author}</Text>
        </View>
        <Image source={t[this.props.theme].arabesco2} style={[s.center, s.translucid, {width: 40, height: 40}]}/>
      </View>
    } else {
      return null
    }
  },
})

