import React from 'react'

class Search extends React.Component {
  constructor () {
    super()
    store.searchHistory.push("")
    this.searchHistoryLengthAtMount = store.searchHistory.length
    this.searchResultsHistoryLengthAtMount = store.searchResultsHistory.length
  }

  componentWillUnmount () {
    store.searchHistory = store.searchHistory.slice(0, this.searchHistoryLengthAtMount - 1)
    store.searchResultsHistory = store.searchResultsHistory.slice(0, this.searchResultsHistoryLengthAtMount - 1)
  }

  normalize (text) {
    text = text.toString().toLowerCase().trim().replace(/\s+/g, ' ')
    var translate = {"à":"a", "á":"a", "â":"a", "ã":"a", "ä":"a", "å":"a", "æ":"a", "ç":"c", "è":"e", "é":"e", "ê":"e", "ë":"e", "ì":"i", "í":"i", "î":"i", "ï":"i", "ð":"d", "ñ":"n", "ò" :"o", "ó":"o", "ô":"o", "õ":"o", "ö":"o", "ø":"o", "ù":"u", "ú":"u", "û":"u", "ü":"u", "ý":"y", "þ":"b", "ß" :"s", "à":"a", "á":"a", "â":"a", "ã":"a", "ä":"a", "å":"a", "æ":"a", "ç":"c", "è":"e", "é":"e", "ê":"e", "ë" :"e", "ì":"i", "í":"i", "î":"i", "ï":"i", "ð":"d", "ñ":"n", "ò":"o", "ó":"o", "ô":"o", "õ":"o", "ö":"o", "ø" :"o", "ù":"u", "ú":"u", "û":"u", "ý":"y", "ý":"y", "þ":"b", "ÿ":"y", "ŕ":"r", "ŕ":"r"}

    return text.replace(new RegExp('['+Object.keys(translate).join()+']', "g"), (match) => translate[match])
  }

  searchPrayers (keywords) {
    k = this.normalize(keywords)

    var prayers = store.prayers.filter(prayer => {
      if (this.props.filterByTag && !prayer.Tags.filter(t => this.props.filterByTag == t.Id)[0]) return false
      if (this.normalize(prayer.Text).indexOf(k) >= 0) return true
      if (this.normalize(prayer.Author).indexOf(k) >= 0) return true
      return false
    })

    var tags = store.tags.filter(tag => {
      if (this.props.filterByTag) return false
      return this.normalize(tag.Name).indexOf(k) >= 0
    })

    console.log('Search results: "' + k + '": Found ' + prayers.length + ' prayers and ' + tags.length + ' tags')
    store.searchResultsHistory.push([...tags, ...prayers])
    store.searchHistory.push(keywords)
  }

  render() {
    return <View style={[s.padding(10)]}>
      <View>
        <Flex row spacedIn>
          <FontSize/>

          <TextInput
            autoFocus={this.props.autoFocus}
            style={[s.flex, s.size(store.fontSize), t.bg1, t.text, s.padding(5, 5), s.borderBottom(1, t.colors.tertiary)]}
            value={store.searchKeywords}
            onChangeText={this.searchPrayers.bind(this)}
            keyboardType="web-search"
          />

          <MaterialIcons onPress={() => store.searchHistory = ['']} style={s.padding(10)} size={store.fontSize} name={store.searchKeywords ? 'close' : 'search'} color={t.colors.text} />
        </Flex>
      </View>

      {store.searchKeywords.length < 3 ? this.props.children : <SearchResults/>}
    </View>
  }
}

export default observer(Search, {})
