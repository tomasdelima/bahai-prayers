import React from 'react'
// import { observer } from 'mobx-react/native'

class Tags extends React.Component {
  static navigateToPrayers (tagId) {
    store.route = {screen: "Prayers", params: {tagId: tagId}}
  }

  static renderItem (tag) {
    return <Flex paddingV={20} onPress={() => Tags.navigateToPrayers(tag.Id)} key={tag.Id}>
      {tag.Name}
    </Flex>
  }

  render() {
    var tags = store.tags.filter(t => t.Kind == store.kind).sort((a, b) => a.Name > b.Name ? 1 : -1)

    return <Container>
      <Search autoFocus>
        {tags.map(tag => Tags.renderItem(tag))}
      </Search>
    </Container>
  }
}

export default observer(Tags, {})
