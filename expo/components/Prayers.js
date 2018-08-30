import React from 'react'
import { observer } from 'mobx-react/native'
import { FontAwesome } from '@expo/vector-icons'

@observer
export default class Prayers extends React.Component {
  static navigateToPrayer (prayerId) {
    store.route = {screen: "Prayer", params: {prayerId: prayerId}}
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

  static renderItem (prayer, showImage) {
    return <Flex key={prayer.Id} marginTop={5} onPress={() => Prayers.navigateToPrayer(prayer.Id)}>
      <Flex numberOfLines={1}>{prayer.Text.replace(/[\s\#\*]+/g, " ")}</Flex>

      <Flex row>
        <Flex wide={100} grow={1} alignRight>{Prayers.wordCount(prayer.Text) + " palavras"}</Flex>
        <Flex square={50} onPress={() => Prayers.toggleFavoritePrayer(prayer)}>
          <FontAwesome name={"star" + (prayer.Favorite ? "" : "-o")} size={25} color={prayer.Favorite ? "gold" : "black"} />
        </Flex>
        <Flex wide={100} grow={1}>{prayer.Author}</Flex>
      </Flex>

      <Image source={require("../assets/arabesco-2-light.png")} style={[s.square(40)]}/>
    </Flex>
  }

  render() {
    var tag = store.tags.filter(tag => tag.Id == this.props.navigation.state.params.tagId)[0]
    var prayers = store.prayers.filter((prayer) => prayer.Tags.filter(t => t.Id == tag.Id).length == 1)

    return <Container>
      <Search autoFocus filterByTag={tag.Id}>
        <Flex>{tag.Name}</Flex>

        {prayers.map(prayer => Prayers.renderItem(prayer, true))}
      </Search>
    </Container>
  }
}