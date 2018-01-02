import React, {Component} from 'react'

// const IconButton = require('./icon-button')

export default class InlinePrayer extends Component {
  render () {
    var prayer = this.props.item
    var letterCount = prayer.body.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,"\n").split(" ").length

    return <View style={[s.container, s.start1]}>
      <Text style={[s.shrink, s.item, s.center1, s.high(50), s.lineHeight(25)]}>
        <Text style={[s.noFontFamily, s.size(15), s.grey(1)]}>{prayer.category ? prayer.category + '   ' : ''}</Text>
        {prayer.body.replace(/<br><br>/gi, ' ')}
      </Text>

      <View style={[s.container, s.row, s.center1, s.high(50)]}>
        <Text style={[s.translucid, s.verticalAlignCenter, s.wide(200), s.alignRight]}>{letterCount} palavras</Text>
        {/*<IconButton lib='FontAwesome' onPress={this.toggleStared} theme={this.props.theme} width={50} height={50} size={20} outline='star-o' fill={prayer.stared ? 'star' : ''} />*/}
        <Text style={[s.translucid, s.verticalAlignCenter, s.wide(200), s.alignLeft]}>{prayer.author}</Text>
      </View>
      {/*<Image source={""} style={[s.center, s.translucid, {width: 40, height: 40, top: 10}]}/>*/}
    </View>
  }
}
