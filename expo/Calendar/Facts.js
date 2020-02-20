export default class Facts extends React.Component {
  state = {facts: []}

  componentDidMount () {
    AsyncStorage.getItem('orderFactsBy').then((a, orderBy) => {
      this.setState({orderBy: orderBy || 'relevance'})
      this.loadFactsFromDB()
    })
  }

  loadFactsFromDB () {
    if (global.db.loadFromDB) {
      global.db.loadFromDB('facts', {day: [this.props.date.getDate()], month: [this.props.date.getMonth()], active: [true]}, this.state.orderBy, true).then((facts) => {
        this.setState({facts: facts})
      })
    } else {
      console.log('ERROR: global.db.loadFromDB is not defined. Trying to load again')
      setTimeout(this.loadFactsFromDB, 100)
    }
  }

  toggleOrder () {
    var newOrder = this.state.orderBy == 'relevance' ? 'year' : 'relevance'
    this.setState({orderBy: newOrder})
    AsyncStorage.setItem('orderFactsBy', newOrder).then((a, orderBy) => {
      this.loadFactsFromDB()
    })
  }

  render () {
    if (this.state.facts.length > 0) {
      var heading = [t[this.props.theme].text, {opacity: 0.65, fontSize: 17}]

      return <View style={[s.card2, s.padding, t[this.props.theme].card]}>
        <View style={[s.container, s.row]}>
          <Text style={[heading, s.flex]}>Fatos:</Text>
          <Text style={[heading, s.static]}>Ordernar por: </Text>
          <Text style={[s.static, t[this.props.theme].text, t[this.props.theme].purpleText, s.underline, s.textAlignCenter, {paddingHorizontal: 5}]} onPress={this.toggleOrder}>{this.state.orderBy == 'relevance' ? 'Relevância' : 'Ano'}</Text>
        </View>
        {this.state.facts.map((fact, i) => <Fact key={i} fact={fact} theme={this.props.theme}/>)}
      </View>
    } else {
      return null
    }
  }
}
