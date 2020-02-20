class Month extends React.Component {
  render () {
    let params = this.props.match.params
    let items = CalendarData.groupedMonth(Number(params.year), Number(params.month))

    return <CalendarGrid
      type={'month'}
      items={items}
    />
  }
}

export default observer(Month, {})
