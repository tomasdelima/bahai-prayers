import React from 'react'

export default class MonthItem extends React.Component {
  goToMonth (year, month) {
    store.route = {
      screen: "Month",
      params: {year, month},
    }
  }

  render () {
    var month = this.props.month
    var textStyle = [s.textAlignCenter, t.text]

    if (month.id == 'year') {
      return <Flex textAlignCenter>
        <Flex size={30} style={[t.text]}>{month.year}</Flex>
      </Flex>
    } else {
      var range = month.gregorianStart.toString() + ' - ' + month.gregorianEnd.toString()

      return <Flex grow onPress={() => this.goToMonth(this.props.year, month.id)}>
        <Flex grow relative>
          <Flex grow stretchSelf style={{margin: 3, marginBottom: 0, borderTopLeftRadius: 7, borderTopRightRadius: 7, borderWidth: 2, borderBottomWidth: 0, borderColor: theme[4]}}>
            <Flex style={textStyle} bold size={16}>{month.arabicName}</Flex>
            <Flex style={textStyle} size={14}>{month.portugueseName}</Flex>
            <Flex style={textStyle} size={11}>{range}</Flex>
          </Flex>

          <View style={[s.gregorianMonthBar, s.static, s.row]}>
            <View style={[{backgroundColor: Data.colors[month.gregorianStart.getMonth()], flex: month.gregorianNewMonth - 1 || 1}]}/>
            <View style={[{backgroundColor: Data.colors[month.gregorianEnd.getMonth()], flex: 20 - month.gregorianNewMonth}]}/>
          </View>

          <Badge label={this.props.month.holidays && this.props.month.holidays.length}/>
        </Flex>
      </Flex>
    }
  }
}
