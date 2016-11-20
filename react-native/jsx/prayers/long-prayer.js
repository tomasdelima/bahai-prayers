'use strict'

import React, {Component} from 'react'
import {
  ScrollView,
  TouchableHighlight,
  Text,
  Slider,
  View,
  AsyncStorage,
  Animated,
  Dimensions,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Share, {ShareSheet, Button} from 'react-native-share'

var Anim = require('../animation')
var s =    require('../styles')
var t =    require('../themes')

module.exports = React.createClass({
  goToParent () {
    global.navigator.prayers.pop()
  },
  getInitialState() {
    return {
      fontSize: 3,
      sliderOpacity: 0,
      floatingButtonsOpacity: new Animated.Value(0),
    }
  },
  componentDidMount() {
    this.loadFontSize()
  },
  changeFontSize (fontSize) {
    this.setState({sliderOpacity: 1})

    console.log('FONT:  SET:    ' + fontSize)
    AsyncStorage.setItem('fontSize', '' + fontSize)
    this.setState({fontSize: fontSize})
  },
  loadFontSize () {
    AsyncStorage.getItem('fontSize', (a, fontSize) => {
      console.log('FONT:  GET:    ' + fontSize)
      this.setState({fontSize: Number(fontSize || 25)})
    })
  },
  toggleFloatingButtons () {
    this.setState({showFloatingButtons: !this.state.showFloatingButtons})
    Anim.fast(this.state.floatingButtonsOpacity, this.state.showFloatingButtons ? 0 : 1)
  },
  share () {
    Share.open({
      title: "Compartilhando uma oração bahá'í",
      message: '"' + this.props.prayer.body.replace(/<br>/g, "\n") + "\"\n\n—" + this.props.prayer.author,
      // url: "...",
      subject: "Compartilhando uma oração bahá'í",
    }).catch(console.log)
  },
  floatingButtons () {
    return <Animated.View style={[{position: 'absolute', right: this.state.showFloatingButtons ? 10 : -100, bottom: 35, opacity: this.state.floatingButtonsOpacity}]}>
      <View style={[s.floatingButtonsContainer]}><Icon onPress={this.share} name="share" size={20} color="#002B36" style={[s.center, s.floatingButtonsIcon]}/></View>
    </Animated.View>
  },
  render () {
    var height = Dimensions.get('window').height / 2
    var left = 21 * Dimensions.get('window').width / 52 - 122
    var fontSize = this.state.fontSize

    if (this.props.prayer) {
      return <View style={[s.wide, s.justifyRight, s.flex, {position: 'relative'}]}>
        <ScrollView style={[s.absolute, {}]} contentContainerStyle={[]}>
          <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={this.toggleFloatingButtons} onLongPress={this.goToParent}>
            <View style={[s.container, s.justifyLeft, {}]}>
              <View style={[s.container, {}]}>
                {((this.props.prayer || {}).body || '').split('<br><br>').map((paragraph, i) =>
                  <Text key={i} style={[s.item, s.justifyLeft, s.paddingDown, t[this.props.theme].text, {fontSize: fontSize, lineHeight: Math.round(fontSize*5/3), paddingBottom: fontSize}]}>{paragraph}</Text>
                )}
              </View>
              <Text style={[s.right, s.paddingH, s.top, t[this.props.theme].text, {fontSize: fontSize, marginBottom: 70}]}>{(this.props.prayer || {}).author}</Text>
            </View>
          </TouchableHighlight>
        </ScrollView>

        <Slider style={[s.rotate, s.highInverted, {position: 'absolute', top: height - 35, left: left, height: 50, opacity: this.state.sliderOpacity}]}
          minimumTrackTintColor={'green'} maximumTrackTintColor={'green'}
          value={this.state.fontValue} minimumValue={15} maximumValue={35} step={1}
          onValueChange={this.changeFontSize} onSlidingComplete={()=>this.setState({sliderOpacity: 0})}/>

        {this.floatingButtons()}
      </View>
    } else {
      return null
    }
  },
})

