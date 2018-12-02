import React, {Component} from 'react'

export default class Day extends React.Component {
  renderDates () {
    var params = this.props.navigation.state.params
    var day = params.day

    return <Flex row>
      {this.renderDate(params.year, day.monthName, day.id)}
      {this.renderDate(day.gregorian.getFullYear(), day.gregorian.getMonthName(), day.gregorian.getDate())}
    </Flex>
  }

  renderDate (year, month, day) {
    var textStyle = [s.textAlignCenter, s.text]

    return <Flex>
      <Text style={[textStyle, s.purpleText, {fontSize: 120}]}>{day}</Text>
      <Text style={[textStyle, {fontSize: 30}]}>{month}</Text>
      <Text style={[textStyle, {fontSize: 50}]}>{year}</Text>
    </Flex>
  }

  renderHoliday () {
    var textStyle = [s.textAlignCenter, s.text]
    var day = this.props.navigation.state.params.day

    if (day.holidays) {
      return <Flex padding={10}>
        <Text style={[s.text, {opacity: 0.65, fontSize: 17}]}>Dia Sagrado:</Text>
        <Text style={[s.textAlignCenter, s.padding, s.purpleText, {fontSize: 25}]}>{day.holidays[0].name}</Text>
      </Flex>
    } else {
      return null
    }
  }

  render () {
    return <ScrollView style={[s.paddings(10), s.paddingTop(statusBarHeight + 10), t.bg1]}>
      <Flex>
        {this.renderDates()}
        {this.renderHoliday()}
        {/*<Facts theme={this.props.theme} date={this.props.day.gregorian}/>*/}
      </Flex>
    </ScrollView>
  }
}
