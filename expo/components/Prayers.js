import React from 'react'
import {observer} from 'mobx-react/native'

@observer
export default class Prayers extends React.Component {
  navigateToPrayer (prayerId) {
    this.props.navigation.navigate("Prayer", {prayerId: prayerId})
  }

  render() {
    var prayers = store.prayers.filter((prayer) => {
      var tags = prayer.Tags.filter(tag => tag.Id == this.props.navigation.state.params.tagId)
      return tags.length == 1
    })

    return <Container>
      {prayers.map(prayer =>
        <Flex numberOfLines={1} padding={10} onPress={() => this.navigateToPrayer(prayer.Id)} key={prayer.Id}>
          {prayer.Text.replace("\n", " ")}
        </Flex>
      )}
    </Container>
  }
}
