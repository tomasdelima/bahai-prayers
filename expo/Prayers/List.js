export default class PrayersList extends React.Component {
  render () {
    return <Flex margin={20} stretch2>
      <FlatList
        data={store.prayers}
        renderItem={({ item }) => <PrayersItem prayer={item} />}
        keyExtractor={item => '' + item.Id}
      />
    </Flex>
  }
}
