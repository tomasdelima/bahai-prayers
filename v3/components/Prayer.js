import React from 'react'
// import Share from 'react-native-share'

class Prayer extends React.Component {
  constructor () {
    super()
    this.toggleFavorite = this.toggleFavorite.bind(this)
    this.share = this.share.bind(this)
    this.images = {
      light: require("../assets/arabesco-light.png"),
      dark:  require("../assets/arabesco-dark.png"),
    }
  }

  toggleFavorite () {
    store.prayers = store.prayers.map(p => {
      if (p.Id == this.prayer.Id) p.Favorite = !this.prayer.Favorite
      return p
    })
  }

  share () {
    // Share.open({
    //   title: "Compartilhando uma oração bahá'í",
    //   message: '"' + this.prayer.Text.replace(/[\#\*]/g, " ").replace(/ +/g, " ").replace(/(^\s+|\s$)/g, "") + "\"\n\n—" + this.prayer.Author,
    //   url: "",
    //   subject: "Compartilhando uma oração bahá'í",
    // })
  }

  parseText () {
    var lines = this.prayer.Text.split("\n")

    return <View style={[s.size(18), s.lineHeight(27), t.text]} selectable>{lines.map(l => {
      if (l.match(/##.+/)) return <Flex key={l} bold size={20}>{l.slice(2) + "\n\n"}</Flex>
      if (l.match(/#.+/)) return <Flex key={l} italic>{l.slice(1) + "\n\n"}</Flex>
      if (l.match(/\*.+?/)) return <Flex key={l} italic size={11} color={"gray"}>{l.slice(1) + "\n\n"}</Flex>
      return <Text key={l}>{l + "\n\n"}</Text>
    })}</View>
  }

  toggleTheme () {
    goToTab("Settings")
  }

  render() {
    this.prayer = store.prayers.filter(prayer => prayer.Id == this.props.navigation.state.params.prayerId)[0]

    return <Container noSearch>
      <Flex column>
        {this.parseText()}
        <Flex selectable paddingV={10} size={17} style={{alignSelf: "flex-end"}}>{"— " + this.prayer.Author}</Flex>
        <Image source={this.images[store.theme]} style={[s.center, s.translucid, {width: 640/4, height: 366/4}]}/>


        <Flex row margin={20} center2>
          {/*<Flex onPress={this.share}>
            <SimpleLineIcons style={[s.wide(70), s.textAlignCenter, s.high(70), s.size(30)]} name='share' color={t.colors.text} />
          </Flex>*/}

          <Flex onPress={this.toggleFavorite}>
            <FontAwesome     style={[s.wide(70), s.textAlignCenter, s.high(70), s.size(30)]} name={'star' + (this.prayer.Favorite ? '' : '-o')} color={this.prayer.Favorite ? "gold" : t.colors.text} />
          </Flex>

          <Flex onPress={this.toggleTheme}>
            <SimpleLineIcons style={[s.wide(70), s.textAlignCenter, s.high(70), s.size(30)]} name='bulb' color={t.colors.text} />
          </Flex>
        </Flex>
      </Flex>
    </Container>
  }
}

export default observer(Prayer, {})
