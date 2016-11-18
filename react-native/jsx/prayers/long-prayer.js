'use strict'

import React, {Component} from 'react'
import {
  ScrollView,
  TouchableHighlight,
  Text,
  Slider,
  View,
  AsyncStorage,
  Dimensions,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

var s = require('../styles')
var t = require('../themes')

module.exports = React.createClass({
  goToParent () {
    global.navigator.prayers.pop()
  },
  getInitialState() {
    return {
      fontSize: 3,
      sliderOpacity: 0,
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
  render () {
    var height = Dimensions.get('window').height / 2
    var left = 21 * Dimensions.get('window').width / 52 - 122

    if (this.props.prayer) {
      return <View style={[s.wide, s.justifyRight, s.flex, {position: 'relative'}]}>
        <ScrollView style={[s.absolute, {}]} contentContainerStyle={[]}>
          <TouchableHighlight underlayColor='rgba(0,0,0,0)' onLongPress={this.goToParent}>
            <View style={[s.container, s.justifyLeft, {}]}>
              <View style={[s.container, {}]}>
                {((this.props.prayer || {}).body || '').split('<br><br>').map((paragraph, i) =>
                  <Text key={i} style={[s.item, s.justifyLeft, s.paddingDown, t[this.props.theme].text, {fontSize: this.state.fontSize}]}>{paragraph}</Text>
                )}
              </View>
              <Text style={[s.right, s.paddingH, s.top, t[this.props.theme].text, {fontSize: this.state.fontSize, marginBottom: 70}]}>{(this.props.prayer || {}).author}</Text>
            </View>
          </TouchableHighlight>
        </ScrollView>

        <Slider style={[s.rotate, s.highInverted, {position: 'absolute', top: height - 35, left: left, height: 50, opacity: this.state.sliderOpacity}]}
          minimumTrackTintColor={'green'} maximumTrackTintColor={'red'}
          value={this.state.fontValue} minimumValue={15} maximumValue={35} step={1}
          onValueChange={this.changeFontSize} onSlidingComplete={()=>this.setState({sliderOpacity: 0})}/>
      </View>
    } else {
      return null
    }
  },
})

