import React from 'react'

class SearchResults extends React.Component {
  constructor () {
    super()
    this.dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
  }

  renderItem (item) {
    return (item.Author ? Prayers : Tags).renderItem(item)
  }

  render() {
    var items = this.dataSource.cloneWithRows((this.props.items || store.searchResults).map(i=>i))

    return <ScrollView style={[s.padding(10), t.bg1]}>
      <ListView dataSource={items} renderRow={this.renderItem.bind(this)} />
    </ScrollView>
  }
}

export default observer(SearchResults, {})
