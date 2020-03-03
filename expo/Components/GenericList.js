@observer
export default class GenericList extends React.Component {
  componentDidMount () {
    if (!this.props.noRemoteLoading) {
      store[this.props.resource] = null
      ApiClient.load(this.props.resource, this.props.filter, this.props.sort)
    }
  }

  data () {
    var data = this.props.data || store[this.props.resource]

    if (this.props.aggregator && data) {
      data = data.reduce((memo, item) => {
        if (memo[item[this.props.aggregator]]) {
          memo[item[this.props.aggregator]].push(item)
        } else {
          memo[item[this.props.aggregator]] = [item]
        }
        return memo
      }, {})

      data = Object.keys(data).reduce((memo, key) => {
        memo.push({id: key, type: 'aggregator'})

        if (!store.collapsedAggregators[key]) {
          memo.push(...data[key])
        }
        return memo
      }, [])
    }

    return data
  }

  render () {
    return this.data() ? <Flex stretch2>
      <FlatList
        data={this.data()}
        renderItem={({ item }) => <this.props.itemComponent item={item} resource={this.props.resource} />}
        keyExtractor={item => '' + item.id}
      />
    </Flex> : <ActivityIndicator size='large' color={theme[3]} />
  }
}
