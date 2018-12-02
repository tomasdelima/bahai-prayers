import React from 'react'

export default class Grid extends React.Component {
  colors = {
    0:  '#A02BA7',
    1:  '#7831CA',
    2:  '#5A6EEF',
    3:  '#345938',
    4:  '#2E9A42',
    5:  '#82BC5B',
    6:  '#D7F520',
    7:  '#F0BD15',
    8:  '#EE8327',
    9:  '#F14D35',
    10: '#E50E51',
    11: '#CC2E9A',
  }

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
      return <MonthItem key={j} month={item} monthName={item} year={this.props.items.year}/>
    } else {
      return <DayItem key={j} day={item} month={this.props.items.month} year={this.props.items.year} back={this.props.back}/>
    }
  }

  render () {
    return <Flex high wide paddings={10} paddingTop={statusBarHeight + 10} style={[t.bg1]} stretch>
      {this.renderGrid()}
    </Flex>
  }
}
