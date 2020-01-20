import './Import'

export default () => <NativeRouter>
  {React.createElement(withRouter(InnerApp))}
</NativeRouter>

class InnerApp extends React.Component {
  constructor (props) {
    super()
    global.store = new Store()
    global.history = props.history
    ApiClient.initialLoad()
  }

  render () {
    return <BackButton>
      <Flex margin={40} stretch2>
        {/*<Flex red>{JSON.stringify(this.props.match.params)}</Flex>*/}

        <Route exact path={'/'} component={LanguagesList} />
        <Route exact path={'/:languageId/tags'} component={TagsList} />
        <Route exact path={'/:languageId/tags/:tagId/prayers'} component={PrayersList} />
        {/*<Route exact path={'/prayers/:prayerId'} component={PrayersList} />*/}
      </Flex>
    </BackButton>
  }
}
