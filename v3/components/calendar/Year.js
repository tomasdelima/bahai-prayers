import React from 'react'

class Year extends React.Component {
  render () {
    var year = this.props.year || this.props.navigation.state.params.year

    return <Grid type={'year'} items={Data.groupedYear(year)} />
  }
}

export default observer(Year, {})
