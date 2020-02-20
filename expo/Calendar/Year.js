class Year extends React.Component {
  render () {
    var year = this.props.year || store.today.toBadi().year

    return <CalendarGrid
      type={'year'}
      items={CalendarData.groupedYear(year)}
    />
  }
}

export default observer(Year, {})
