'use strict'

import React, {Component} from 'react'
import {
  ScrollView,
  TouchableHighlight,
  Text,
  Slider,
  View,
  AsyncStorage,
  Image,
  Animated,
  Dimensions,
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/SimpleLineIcons'
import Share, {ShareSheet, Button} from 'react-native-share'

const IconButton = require('./icon-button')
const Anim       = require('../animation')
const s          = require('../styles')
const t          = require('../themes')

module.exports = React.createClass({
  goToParent () {
    global.navigator.prayers.pop()
  },
  getInitialState() {
    return {
      fontSize: 3,
      watermarkOpacity: 1,
      top: 0,
      theme: this.props.theme,
    }
  },
  componentDidMount() {
    this.loadFontSize()
    this.loadShowWatermark()
  },
  changeFontSize (fontSize) {
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
  share () {
    Share.open({
      title: "Compartilhando uma oração bahá'í",
      message: '"' + this.props.prayer.body.replace(/<br>/g, "\n") + "\"\n\n—" + this.props.prayer.author,
      // url: "...",
      subject: "Compartilhando uma oração bahá'í",
    }).catch(console.log)
  },
  renderPreamble (fontSize) {
    if (this.props.prayer.preamble) {
      return <Text style={[s.item, s.textAlignCenter, t[this.props.theme].text, {fontStyle: 'italic', fontSize: fontSize, lineHeight: Math.round(fontSize*5/3), paddingBottom: fontSize*5/3}]}>
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
  toggleStared () {
    this.props.prayer.stared = !this.props.prayer.stared
    global.db.update('prayers', this.props.prayer).then(() => {
      this.setState({prayer: this.props.prayer})
    })
    global.db.flushCache('loaded:prayers:' + JSON.stringify({active: [true], stared: [true]}))
  },
  toggleTheme () {
    t.setTheme(this, this.state.theme == 'light' ? 'dark' : 'light')
    this.props.reloadTheme()
  },
  renderBottomButtons () {
    return <View style={[s.row, s.justifyCenter, s.bottomButtonsContainer, {top: 20}]}>
      <IconButton lib='SimpleLineIcons' onPress={this.share}        theme={this.props.theme} width={70} height={70} size={30} outline='share' />
      <IconButton lib='FontAwesome'     onPress={this.toggleStared} theme={this.props.theme} width={70} height={70} size={30} outline='star-o' fill={this.props.prayer.stared ? 'star' : ''} />
      <IconButton lib='SimpleLineIcons' onPress={this.toggleTheme}  theme={this.props.theme} width={70} height={70} size={30} outline='bulb' />
    </View>
  },
  toggleSlider () {
    this.setState({showSlider: !this.state.showSlider})
  },
  renderSlider (height, left) {
    if (this.state.showSlider) {
      return <Slider style={[s.rotate, s.highInverted, {position: 'absolute', top: height, left: left, height: 50}]}
        minimumTrackTintColor={'green'} maximumTrackTintColor={'green'}
        value={this.state.fontSize} minimumValue={15} maximumValue={35} step={1}
        onValueChange={this.changeFontSize}/>
    } else {
      return null
    }
  },
  render () {
    var height = Dimensions.get('window').height / 2 - 35
    var left   = Dimensions.get('window').width * 21 / 52 - 122
    var fontSize = this.state.fontSize

    if (this.props.prayer) {
      return <View style={[s.wide, s.justifyRight, s.flex, {position: 'relative'}]}>
        {this.renderWatermark()}
        <ScrollView style={[s.absolute, {}]} contentContainerStyle={[]} onScroll={this.fadeWatermark}>
          <TouchableHighlight underlayColor='rgba(0,0,0,0)' onPress={this.toggleSlider} onLongPress={this.goToParent}>
            <View style={[s.paddingV3, s.container, s.justifyLeft, {}]}>
              <View style={[s.container, {}]}>
                {this.renderPreamble(fontSize)}
                {((this.props.prayer || {}).body || '').split('<br><br>').map((paragraph, i) =>
                  <Text key={i} style={[s.item, s.justifyLeft, s.paddingDown, t[this.props.theme].text, {fontSize: fontSize, lineHeight: Math.round(fontSize*5/3)}]}>{paragraph}</Text>
                )}
              </View>

              <Text style={[s.right, s.paddingH, s.top, t[this.props.theme].text, {fontSize: fontSize, marginBottom: 50}]}>{(this.props.prayer || {}).author}</Text>
              <Image source={t[this.props.theme].arabesco} style={[s.center, s.translucid, {width: 640/4, height: 366/4}]}/>
              {this.renderBottomButtons()}
            </View>
          </TouchableHighlight>
        </ScrollView>

        {this.renderSlider(height, left)}

      </View>
    } else {
      return null
    }
  },
})
