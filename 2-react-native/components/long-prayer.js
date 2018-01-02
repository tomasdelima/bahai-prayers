import React, {Component} from 'react'
// import Share, {ShareSheet, Button} from 'react-native-share'
// const IconButton = require('./icon-button')

export default class LongPrayer extends Component {
  constructor (props) {
    super(props)
    this.fadeWatermark = this.fadeWatermark.bind(this)
    this.fontSize = 20
    this.state = {watermarkOpacity: 0.25}
  }

  fadeWatermark (e) {
    this.setState({watermarkOpacity: 0.25 - e.nativeEvent.contentOffset.y / 600})
  }

  renderPreamble () {
    return this.props.prayer.preamble && <Text style={[s.item, s.textAlignCenter, s.italic, s.size(this.fontSize), s.lineHeight(Math.round(this.fontSize*5/3)), s.padding(0, 0, this.fontSize*5/3)]}>
      {this.props.prayer.preamble}
    </Text>
  }

  renderWatermark () {
    var author = this.props.prayer.author
    var letter = author == 'O Báb' ? 'B' : author == "‘Abdu’l-Bahá" ? 'A' : author[0]
    return <Text style={[s.rect(), s.absolute, s.size(s.Width * 0.4), s.ruritania, s.textAlignCenter, s.opacity(this.state.watermarkOpacity)]}>{letter}</Text>
  }

  renderBottomButtons () {
    return <View style={[s.row, s.center1, s.spacedOut, s.padding(0, 50), s.top(20)]}>
      {/*<IconButton lib='SimpleLineIcons' onPress={this.share}        theme={this.props.theme} width={70} height={70} size={30} outline='share' />*/}
      {/*<IconButton lib='FontAwesome'     onPress={this.toggleStared} theme={this.props.theme} width={70} height={70} size={30} outline='star-o' fill={this.props.prayer.stared ? 'star' : ''} />*/}
      {/*<IconButton lib='SimpleLineIcons' onPress={this.toggleTheme}  theme={this.props.theme} width={70} height={70} size={30} outline='bulb' />*/}
    </View>
  }

  renderParagraphs () {
    return this.props.prayer.body.split('<br><br>').map((paragraph, i) =>
      this.renderParagraph(paragraph, i)
    )
  }

  renderParagraph (paragraph, i) {
    var style = [s.item, s.start1, s.padding(15, 0), s.size(this.fontSize), s.lineHeight(Math.round(this.fontSize*5/3))]

    if (paragraph.slice(0, 20) == '<a class="preamble">') {
      return <Text key={i} style={[style, s.italic, s.translucid, s.size(Math.floor(this.fontSize*0.8))]}>{paragraph.slice(20, paragraph.length-4)}</Text>
    } else {
      return <Text key={i} style={[style]}>{paragraph}</Text>
    }
  }

  render () {
    // var height = s.Height / 2 - 35
    // var left   = s.Width * 21 / 52 - 122

    return <View style={[s.relative]}>
      {this.renderWatermark()}

      <ScrollView style={[]} onScroll={this.fadeWatermark}>
        <View style={[s.container, s.start1, s.padding(0, 15, 45)]}>
          <View style={[s.container]}>
            {this.renderPreamble()}
            {this.renderParagraphs()}
          </View>

          <Text style={[s.selfEnd2, s.size(this.fontSize), s.margin(0, 0, 50)]}>{this.props.prayer.author}</Text>
          {/*<Image source={t[this.props.theme].arabesco} style={[s.center, s.translucid, {width: 640/4, height: 366/4}]}/>*/}
          {this.renderBottomButtons()}
        </View>
      </ScrollView>
    </View>
  }

  // goToParent () {
  //   global.navigator.prayers.pop()
  // },
  // share () {
  //   Share.open({
  //     title: "Compartilhando uma oração bahá'í",
  //     message: '"' + this.props.prayer.body.replace(/<br>/g, "\n") + "\"\n\n—" + this.props.prayer.author,
  //     // url: "...",
  //     subject: "Compartilhando uma oração bahá'í",
  //   }).catch(console.log)
  // },
  // toggleStared () {
  //   this.props.prayer.stared = !this.props.prayer.stared
  //   global.db.update('prayers', this.props.prayer).then(() => {
  //     this.setState({prayer: this.props.prayer})
  //   })
  //   global.db.flushCache('loaded:prayers:' + JSON.stringify({active: [true], stared: [true]}))
  // },
}
