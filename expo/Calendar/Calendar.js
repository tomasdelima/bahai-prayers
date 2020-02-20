class Calendar extends React.Component {
  // factsHost = 'http://bahai-prayers-server.herokuapp.com'

  componentDidMount () {
    // this.loadHolidaysFromRemoteServer()
    store.today = new CalendarGregorianDate(new Date())
  }

  // loadHolidaysFromRemoteServer () {
  //   new ApiClient().load('holidays')
  // }

  // loadFactsFromRemoteServer () {
  //   AsyncStorage.getItem('facts:last_updated_at', (a, last_updated_at) => {
  //     global.db.loadFromRemoteServer(factsHost + '/facts?last_updated_at=' + (last_updated_at || '2000-01-01'), 'facts').then()
  //   })
  // }

  static currentBadiYear () {
    var year = new Date().getFullYear() - 1844

    if (new Date() >= new CalendarBadiDate(year + 1, 1, 1).toGregorian()) {
      year += 1
    }

    return year
  }

  render () {
    return <CalendarYear year={Number(this.props.match.params.year) || Calendar.currentBadiYear()} />
  }
}

export default observer(Calendar, {})
