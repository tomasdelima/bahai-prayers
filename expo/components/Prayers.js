import React from 'react'
import { observer } from 'mobx-react/native'
import { FontAwesome } from '@expo/vector-icons'

@observer
export default class Prayers extends React.Component {
  navigateToPrayer (prayerId) {
    store.route = {screen: "Prayer", params: {prayerId: prayerId}}
  }

  wordCount (text) {
    return text.replace(/(^\s*)|(\s*$)/gi,"").replace(/[ ]{2,}/gi," ").replace(/\n /,"\n").split(" ").length
  }

  toggleFavoritePrayer (prayer) {
    store.prayers = store.prayers.map(p => {
      if (p.Id == prayer.Id) p.Favorite = !prayer.Favorite
      return p
    })
  }

  render() {
    var prayers = store.prayers.filter((prayer) => {
      var tags = prayer.Tags.filter(tag => tag.Id == this.props.navigation.state.params.tagId)
      return tags.length == 1
    })

    return <Container>
      {prayers.map(prayer =>
        <Flex key={prayer.Id} marginTop={5} onPress={() => this.navigateToPrayer(prayer.Id)}>
          <Flex numberOfLines={1}>{prayer.Text.replace(/[\s\#\*]+/g, " ")}</Flex>

          <Flex row>
            <Flex wide={100} grow={1} alignRight>{this.wordCount(prayer.Text) + " palavras"}</Flex>
            <Flex square={50} onPress={() => this.toggleFavoritePrayer(prayer)}>
              <FontAwesome name={"star" + (prayer.Favorite ? "" : "-o")} size={25} color={prayer.Favorite ? "gold" : "black"} />
            </Flex>
            <Flex wide={100} grow={1}>{prayer.Author}</Flex>
          </Flex>

          <Image source={require("../assets/arabesco-2-light.png")} style={[s.square(40)]}/>
        </Flex>
      )}
    </Container>
  }
}
