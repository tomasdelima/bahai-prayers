import React from 'react'

export default class DayItem extends React.Component {
  goToDay () {
    store.route = {
      screen: "Day",
      params: {
        year: this.props.year,
        month: this.props.monthName,
        day: this.props.day
      },
    }
  }

  render () {
    var day = this.props.day
    var textStyle = [s.textAlignCenter]

    if (day.id == 'month') {
      return <Flex onPress={this.props.back}>
        <Flex size={30}>{day.year}</Flex>
        <Flex size={16}>{day.month.arabicName}</Flex>
        <Flex size={16}>{day.month.portugueseName}</Flex>
      </Flex>
    } else if (!day.id || !day.gregorian) {
      return <Flex/>
    } else {
      return <TouchableHighlight underlayColor='rgba(0, 0, 0, 0.1)' style={[s.flex]} onPress={this.goToDay.bind(this)}>
        <Flex stretch2>
          <Flex spacedOut>
            <Flex size={23} textAlignCenter>{day.id}</Flex>
            <Flex size={16} textAlignCenter>{day.gregorian.toString()}</Flex>
          </Flex>

          <View style={[s.gregorianMonthBar, s.static, s.row, {backgroundColor: Data.colors[day.gregorian.getMonth()]}]}/>

          <Badge label={this.props.day.holidays && this.props.day.holidays.length}/>
        </Flex>
      </TouchableHighlight>
    }
  }
}
