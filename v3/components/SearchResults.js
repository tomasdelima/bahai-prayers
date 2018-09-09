import React from 'react'

class SearchResults extends React.Component {
  renderItem (item) {
    return (item.Author ? Prayers : Tags).renderItem(item)
  }

  render() {
    var items = this.props.items || store.searchResults

    return <ScrollView style={[s.paddings(10), t.bg1]}>
      <View>
        {items.map(item => this.renderItem(item))}
      </View>
    </ScrollView>
  }
}

export default observer(SearchResults, {})
