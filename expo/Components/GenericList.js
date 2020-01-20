@observer
class GenericList extends React.Component {
  componentDidMount () {
    ApiClient.load(this.props.resource, this.props.match.params.languageId)
  }

  render () {
    return <Flex stretch2>
      <FlatList
        data={store[this.props.resource]}
        renderItem={({ item }) => <this.props.itemComponent item={item} />}
        keyExtractor={item => '' + item.Id}
      />
    </Flex>
  }
}

export default withRouter(GenericList)
