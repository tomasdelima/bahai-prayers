import React from 'react'

class Tags extends React.Component {
  static navigateToPrayers (tag) {
    store.route = {
      screen: "Prayers",
      name: tag.Name,
      params: { tagId: tag.Id },
    }
  }

  static renderItem (tag) {
    return <Flex paddingV={20} onPress={() => Tags.navigateToPrayers(tag)} key={tag.Id}>
      {tag.Name}
    </Flex>
  }

  render() {
    var tags = store.tags.filter(t => t.Kind == store.kind).sort((a, b) => a.Name > b.Name ? 1 : -1)

    return <Container>
      <Search autoFocus={false}>
        {tags.map(tag => Tags.renderItem(tag))}
      </Search>
    </Container>
  }
}

export default observer(Tags, {})
