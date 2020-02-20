export default class Day extends React.Component {
  renderDates () {
    var params = this.props.match.params
    var badi = new CalendarBadiDate(Number(params.year), Number(params.month), Number(params.day))
    var gregorian = badi.toGregorian()

    return <Flex row>
      {this.renderDate(badi.year, badi.monthName().name, badi.day)}
      {/*<View style={[s.bg4, s.high(), {width: 1}]}/>*/}
      {this.renderDate(gregorian.getFullYear(), gregorian.getMonthName(), gregorian.getDate())}
    </Flex>
  }

  renderDate (year, month, day) {
    var textStyle = [s.textAlignCenter, t.text]

    return <Flex>
      <Text style={[textStyle, s.purpleText, {fontSize: 120}]}>{day}</Text>
      <Text style={[textStyle, {fontSize: 30}]}>{month}</Text>
      <Text style={[textStyle, {fontSize: 50}]}>{year}</Text>
    </Flex>
  }

  renderHoliday () {
    var textStyle = [s.textAlignCenter, t.text]
    var day = this.props.match.params.day

    if (day.holidays) {
      return <Flex padding={10}>
        <Text style={[textStyle, {opacity: 0.65, fontSize: 17}]}>Dia Sagrado:</Text>
        <Text style={[textStyle, {fontSize: 25}]}>{day.holidays[0].name}</Text>
      </Flex>
    } else {
      return null
    }
  }

  render () {
    return <ScrollView style={[s.padding(10), s.paddingTop(10), t.bg1]}>
      <Flex>
        {this.renderDates()}
        {this.renderHoliday()}
        {/*<Facts theme={this.props.theme} date={this.props.day.gregorian}/>*/}
      </Flex>
    </ScrollView>
  }
}
