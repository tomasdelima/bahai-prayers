export default class Grid extends React.Component {
  renderGrid () {
    if (this.props.items) {
      return this.props.items.map((row, i) => this.renderRow(row, i))
    } else {
      return null
    }
  }

  renderRow (row, i) {
    return <Flex key={i} row spacedOut>
      {row.map((item, j) => this.renderItem(item, j))}
    </Flex>
  }

  renderItem (item, j) {
    if (this.props.type == 'year') {
      return <CalendarMonthItem
        key={j}
        month={item}
        year={this.props.items.year}
      />
    } else {
      return <CalendarDayItem
        key={j}
        day={item}
        year={this.props.items.year}
        month={this.props.items.month}
      />
    }
  }

  render () {
    return <Flex high wide padding={10} paddingTop={10} style={[t.bg1]} stretch>
      {this.renderGrid()}
    </Flex>
  }
}
