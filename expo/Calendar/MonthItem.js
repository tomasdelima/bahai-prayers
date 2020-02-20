export default class MonthItem extends React.Component {
  goToMonth = () => {
    store.topBarLabels.push(this.props.year)
    history.push(`/calendar/${this.props.year}/${this.props.month.id}`)
  }

  goToYear = (year) => {
    store.topBarLabels.push(this.props.year)
    history.push(`/calendar/${year}`)
  }

  renderButton (direction, year, disabled) {
    return <Button margin={10} onPress={() => !disabled && this.goToYear(year)}>
      <FontAwesome5 name={`chevron-${direction}`} size={30} color={disabled ? theme[2] : theme[4]} />
    </Button>
  }

  render () {
    var month = this.props.month
    var textStyle = [s.textAlignCenter, s.size(15)]

    if (month.id == 'year') {
      return <Flex textAlignCenter>
        <Write size={30}>{month.year}</Write>

        <Flex row>
          {this.renderButton('left', month.year - 1, month.year <= 172)}
          {this.renderButton('right', month.year + 1, month.year >= 221)}
        </Flex>
      </Flex>
    } else {
      var range = month.gregorianStart.toString() + ' - ' + month.gregorianEnd.toString()

      return <Flex grow onPress={this.goToMonth}>
        <Flex grow relative>
          <Flex grow stretchSelf spacedOut1 margins={[3, 3, 0]} style={{borderTopLeftRadius: 7, borderTopRightRadius: 7, borderWidth: 1.5, borderBottomWidth: 0, borderColor: theme[4]}}>
            <Write style={textStyle} bold size={16}>{month.name}</Write>
            <Write style={textStyle} size={11}>{range}</Write>
          </Flex>

          <View style={[s.high(10), s.static, s.row]}>
            <View style={[s.bg(CalendarData.colors[month.gregorianStart.getMonth()]), {flex: month.gregorianNewMonth - 1  || 1}]}/>
            <View style={[s.bg(CalendarData.colors[month.gregorianEnd.getMonth()]),   {flex: 20 - month.gregorianNewMonth || 1}]}/>
          </View>

          <CalendarBadge label={this.props.month.holidays && this.props.month.holidays.length}/>
        </Flex>
      </Flex>
    }
  }
}
