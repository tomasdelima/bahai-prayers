import React from 'react'
import { observer } from 'mobx-react/native'

@observer
export default class Tags extends React.Component {
  navigateToPrayers (tagId) {
    store.route = {screen: "Prayers", params: {tagId: tagId}}
  }

  render() {
    var tags = store.tags.filter(t => t.Kind == store.kind).sort((a, b) => a.Name > b.Name ? 1 : -1)

    return <Container>
      {tags.map(tag => <Flex paddingV={10} onPress={() => this.navigateToPrayers(tag.Id)} key={tag.Id}>
        {tag.Name}
      </Flex>)}
    </Container>
  }
}
