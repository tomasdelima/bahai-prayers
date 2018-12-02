import React from 'react'

class Calendar extends React.Component {
  // factsHost = 'http://bahai-prayers-server.herokuapp.com'

  componentDidMount () {
    this.loadHolidaysFromRemoteServer()
  }

  loadHolidaysFromRemoteServer () {
    new ApiClient().load('holidays')
  }

  // loadFactsFromRemoteServer () {
  //   AsyncStorage.getItem('facts:last_updated_at', (a, last_updated_at) => {
  //     global.db.loadFromRemoteServer(factsHost + '/facts?last_updated_at=' + (last_updated_at || '2000-01-01'), 'facts').then()
  //   })
  // }

  render () {
    var year = new Date().getFullYear() - 1844

    if (new Date() >= new BadiDate(year + 1, 1, 1).toGregorian()) {
      year += 1
    }

    return <Year year={year}/>
  }
}

export default observer(Calendar, {})
