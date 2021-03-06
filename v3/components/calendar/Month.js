import React from 'react'

class Month extends React.Component {
  back() {
    store.route = { goBack: true }
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', function() {
      // store.route = { goBack: true }
      return true
    })
  }

  render () {
    var params = this.props.navigation.state.params
    var items = Data.groupedMonth(params.year, params.month)

    return <Grid type={'month'} items={items} back={this.back.bind(this)}/>
  }
}

export default observer(Month, {})
