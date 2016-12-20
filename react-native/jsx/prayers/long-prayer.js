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
      watermarkOpacity: 1,
      top: 0,
      sliderOpacity: 0,
      floatingButtonsOpacity: new Animated.Value(0),
    }
  },
  componentDidMount() {
    this.loadFontSize()
    this.loadShowWatermark()
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
  loadShowWatermark () {
    AsyncStorage.getItem('showWatermark', (a, showWatermark) => {
      console.log('WATER: GET:    ' + showWatermark)
      this.setState({showWatermark: showWatermark == 'true' || showWatermark == null})
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
  renderFloatingButtons () {
    return <Animated.View style={[{position: 'absolute', right: this.state.showFloatingButtons ? 10 : -100, bottom: 35, opacity: this.state.floatingButtonsOpacity}]}>
      <View style={[s.floatingButtonsContainer]}><Icon onPress={this.share} name="share" size={20} color="#002B36" style={[s.center, s.floatingButtonsIcon]}/></View>
    </Animated.View>
  },
  renderPreamble (fontSize) {
    if (this.props.prayer.preamble) {
      return <Text style={[s.item, s.textAlignCenter, t[this.props.theme].text, {fontStyle: 'italic', fontSize: fontSize, height: Math.round(fontSize*5), paddingBottom: fontSize}]}>
        {this.props.prayer.preamble}
      </Text>
    } else {
      return null
    }
  },
  renderWatermark () {
    if (this.state.showWatermark) {
      var author = this.props.prayer.author
      var letter = (author[0] == "B" || author == 'O Báb') ? 'B' : author == "‘Abdu’l-Bahá" ? 'A' : ''
      return <Text style={[s.watermark,s.absolute, s.textAlignCenter, {opacity: this.state.watermarkOpacity}]}>{letter}</Text>
    } else {
      return null
    }
  },
  fadeWatermark (e) {
    this.setState({watermarkOpacity: 1 - e.nativeEvent.contentOffset.y / 600})
  },
  render () {
    var height = Dimensions.get('window').height / 2 - 35
    var left =   Dimensions.get('window').width * 21 / 52 - 122
    var fontSize = this.state.fontSize

    if (this.props.prayer) {
      return <View style={[s.wide, s.justifyRight, s.flex, {position: 'relative'}]}>
        {this.renderWatermark()}
        <ScrollView style={[s.absolute, {}]} contentContainerStyle={[]} onScroll={this.fadeWatermark}>
          <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={this.toggleFloatingButtons} onLongPress={this.goToParent}>
            <View style={[s.container, s.paddingV, s.justifyLeft, {}]}>
              <View style={[s.container, {}]}>
                {this.renderPreamble(fontSize)}

                {((this.props.prayer || {}).body || '').split('<br><br>').map((paragraph, i) =>
                  <Text key={i} style={[s.item, s.justifyLeft, s.paddingDown, t[this.props.theme].text, {fontSize: fontSize, lineHeight: Math.round(fontSize*5/3), paddingBottom: fontSize}]}>{paragraph}</Text>
                )}
              </View>
              <Text style={[s.right, s.paddingH, s.top, t[this.props.theme].text, {fontSize: fontSize, marginBottom: 70}]}>{(this.props.prayer || {}).author}</Text>
            </View>
          </TouchableHighlight>
        </ScrollView>

        <Slider style={[s.rotate, s.highInverted, {position: 'absolute', top: height, left: left, height: 50, opacity: this.state.sliderOpacity}]}
          minimumTrackTintColor={'green'} maximumTrackTintColor={'green'}
          value={this.state.fontValue} minimumValue={15} maximumValue={35} step={1}
          onValueChange={this.changeFontSize} onSlidingComplete={()=>this.setState({sliderOpacity: 0})}/>

        {this.renderFloatingButtons()}
      </View>
    } else {
      return null
    }
  },
})

