import React from 'react'

class Tags extends React.Component {
  static navigateToPrayers (tag) {
    store.route = {
      screen: "Prayers",
      name: tag.Name,
      params: { tagId: tag.Id },
    }
  }

  tags (kind) {
    return store.tags.filter(t => t.Kind == (kind || store.kind)).sort((a, b) => a.Name > b.Name ? 1 : -1)
  }

  switchPrayersKind (kind) {
    var tags = this.tags(kind)

    if (tags.length == 1) {
      Tags.navigateToPrayers(tags[0])
    } else {
      store.kind = kind
    }
  }

  static renderItem (tag) {
    return <Write paddingV={20} onPress={() => Tags.navigateToPrayers(tag)} key={tag.Id}>
      {tag.Name}
    </Write>
  }

  renderPrayersKind () {
    return <Flex row>
      <Text style={[s.flex, s.size(15), s.padding(10), s.textAlignCenter, "GENERAL" == store.kind && s.bold]} onPress={() => this.switchPrayersKind("GENERAL")}>{tr["GENERAL".toLowerCase() + "_prayers"]}</Text>
      <Text style={[s.flex, s.size(15), s.padding(10), s.textAlignCenter, "OCCASSIONAL" == store.kind && s.bold]} onPress={() => this.switchPrayersKind("OCCASSIONAL")}>{tr["OCCASSIONAL".toLowerCase() + "_prayers"]}</Text>
      <Text style={[s.flex, s.size(15), s.padding(10), s.textAlignCenter, "OBLIGATORY" == store.kind && s.bold]} onPress={() => this.switchPrayersKind("OBLIGATORY")}>{tr["OBLIGATORY".toLowerCase() + "_prayers"]}</Text>
    </Flex>
  }

  render() {
    return <Container>
      {this.renderPrayersKind()}
      {this.tags().map(tag => Tags.renderItem(tag))}
    </Container>
  }
}

export default observer(Tags, {})
