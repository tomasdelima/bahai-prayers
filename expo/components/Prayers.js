import React from 'react'
import { observer } from 'mobx-react/native'

@observer
export default class Prayers extends React.Component {
  navigateToPrayer (prayerId) {
    store.route = {screen: "Prayer", params: {prayerId: prayerId}}
  }

  render() {
    var prayers = store.prayers.filter((prayer) => {
      var tags = prayer.Tags.filter(tag => tag.Id == this.props.navigation.state.params.tagId)
      return tags.length == 1
    })

    return <Container>
      {prayers.map(prayer =>
        <Flex key={prayer.Id} onPress={() => this.navigateToPrayer(prayer.Id)}>
          <Flex numberOfLines={1} padding={10}>{prayer.Text.replace(/[\s\#\*]+/g, " ")}</Flex>
          <Flex padding={10}>{prayer.Author}</Flex>
        </Flex>
      )}
    </Container>
  }
}
