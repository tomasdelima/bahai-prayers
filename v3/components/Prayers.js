import React from 'react'

class Prayers extends React.Component {
  static navigateToPrayer (prayerId, tagName) {
    store.route = {
      screen: "Prayer",
      params: {prayerId: prayerId},
    }
  }

  static wordCount (text) {
    return text.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,"\n").split(" ").length
  }

  static toggleFavoritePrayer (prayer) {
    store.prayers = store.prayers.map(p => {
      if (p.Id == prayer.Id) p.Favorite = !prayer.Favorite
      return p
    })
  }

  static renderItem (prayer, showImage, tagName) {
    return <Flex key={prayer.Id} marginTop={5} onPress={() => Prayers.navigateToPrayer(prayer.Id, tagName)}>
      <Flex numberOfLines={1}>{prayer.Text.replace(/[\s\#\*]+/g, " ")}</Flex>

      <Flex row>
        <Flex wide={100} grow={1} alignRight>{Prayers.wordCount(prayer.Text) + " " + tr.words}</Flex>
        <Flex square={50} onPress={() => Prayers.toggleFavoritePrayer(prayer)}>
          <FontAwesome name={"star" + (prayer.Favorite ? "" : "-o")} size={25} color={prayer.Favorite ? "gold" : "black"} />
        </Flex>
        <Flex wide={100} grow={1}>{prayer.Author}</Flex>
      </Flex>

      <Image source={require("../assets/arabesco-2-light.png")} style={[s.square(40)]}/>
    </Flex>
  }

  constructor () {
    super()
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  render() {
    try {
      var tag = store.tags.filter(tag => tag.Id == this.props.navigation.state.params.tagId)[0]
      var prayers = store.prayers.filter((prayer) => prayer.Tags.filter(t => t.Id == tag.Id).length == 1)
    } catch (e) {
      var tag = {}
      var prayers = []
    }

    prayers = this.dataSource.cloneWithRows(prayers)

    return <Container tagId={tag.Id}>
      <ListView dataSource={prayers} renderRow={prayer => Prayers.renderItem(prayer, true, tag.Name)} />
    </Container>
  }
}

export default observer(Prayers, {})
