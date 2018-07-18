import React from 'react'
import { FontAwesome, SimpleLineIcons } from '@expo/vector-icons'
import { observer } from 'mobx-react/native'
import Share from 'react-native-share'

@observer
export default class SearchResults extends React.Component {
  renderItem (item) {
    return (item.Author ? Prayers : Tags).renderItem(item)
  }

  componentDidMount () {console.log('componentDidMount')}
  componentDidUpdate () {console.log('componentDidUpdate')}
  componentWillMount () {console.log('componentWillMount')}
  componentWillUnmount () {console.log('componentWillUnmount')}

  render() {
    return <Container>
      <Flex>{"Resultado da pesquisa: " + store.searchResults.length}</Flex>
      {store.searchResults.map(item => this.renderItem(item))}
    </Container>
  }
}
