export default class DayItem extends React.Component {
  arabicMonth = () => ['Bahá', 'Jalál', 'Jamál', '‘Aẓamat', 'Núr', 'Raḥmat', 'Kalimát', 'Kamál', 'Asmá’', '‘Izzat', 'Mashíyyat', '‘Ilm', 'Qudrat', 'Qawl', 'Masá’il', 'Sharaf', 'Sulṭán', 'Mulk', 'Ayyám-i-Há', '‘Alá’'][this.props.month]

  goToYear = () => {
    store.topBarLabels.push(`${this.arabicMonth()} - ${this.props.year}`)
    history.push(`/calendar/${this.props.year}`)
  }

  goToDay = () => {
    store.topBarLabels.push(`${this.arabicMonth()} - ${this.props.year}`)
    history.push(`/calendar/${this.props.year}/${this.props.month}/${this.props.day.id}`)
  }

  render () {
    var day = this.props.day
    var textStyle = [s.textAlignCenter]

    if (day.id == 'month') {
      return <Flex onPress={this.goToYear}>
        <Flex size={30}>{day.year}</Flex>
        <Flex size={16}>{day.month.name}</Flex>
      </Flex>
    } else if (!day.id || !day.gregorian) {
      return <Flex />
    } else {
      return <TouchableHighlight underlayColor='rgba(0, 0, 0, 0.1)' style={[s.flex]} onPress={this.goToDay.bind(this)}>
        <Flex stretch2>
          <Flex spacedOut>
            <Flex size={23} textAlignCenter>{day.id}</Flex>
            <Flex size={16} textAlignCenter>{day.gregorian.toString()}</Flex>
          </Flex>

          <View style={[s.high(10), s.red, s.static, s.row, {backgroundColor: CalendarData.colors[day.gregorian.getMonth()]}]}/>

          <CalendarBadge label={this.props.day.holidays && this.props.day.holidays.length}/>
        </Flex>
      </TouchableHighlight>
    }
  }
}
