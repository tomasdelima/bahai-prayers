import React from 'react'

class SearchResults extends React.Component {
  renderItem (item) {
    return (item.Author ? Prayers : Tags).renderItem(item)
  }

  render() {
    return <ScrollView style={[s.paddings(10)]}>
      <View>
        <Flex>{"Resultado da pesquisa: " + store.searchResults.length}</Flex>
        {store.searchResults.map(item => this.renderItem(item))}
      </View>
    </ScrollView>
  }
}

export default observer(SearchResults, {})
