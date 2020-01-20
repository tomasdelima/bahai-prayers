export default class TagsList extends React.Component {
  render () {
    return <Flex margin={20} stretch2>
      <FlatList
        data={store.tags}
        renderItem={({ item }) => <TagsItem tag={item} />}
        keyExtractor={item => '' + item.Id}
      />
    </Flex>
  }
}
