export default class LanguagesList extends React.Component {
  render () {
    return <Flex margin={20} stretch2>
      <FlatList
        data={store.languages}
        renderItem={({ item }) => <LanguagesItem language={item} />}
        keyExtractor={item => '' + item.Id}
      />
    </Flex>
  }
}
