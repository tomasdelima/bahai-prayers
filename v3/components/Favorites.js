import React from 'react'

class Favorites extends React.Component {
  constructor () {
    super()
    store.searchResultsHistory.push(store.prayers.filter(p => p.Favorite))
  }

  componentDidUpdate () {
    store.searchResultsHistory.push(store.prayers.filter(p => p.Favorite))
  }

  render() {
    return <Container>
      <Text>{store.prayers.filter(p => p.Favorite).length}</Text>
      <SearchResults items={store.prayers.filter(p => p.Favorite)}/>
    </Container>
  }
}

export default observer(Favorites, {})
