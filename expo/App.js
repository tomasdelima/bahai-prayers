import './Import'

export default () => <NativeRouter>
  {React.createElement(withRouter(InnerApp))}
</NativeRouter>

@observer class InnerApp extends React.Component {
  constructor (props) {
    super()
    global.store = new Store()
  }

  render () {
    return <BackButton>
      <Flex stretch2>
        {/*<Write padding={10} red>{this.props.history.location.pathname}</Write>*/}

        <Route exact path={'/'} component={LanguagesList} />
        <Route exact path={'/language/:languageId/tags'} component={TagsList} />
        <Route exact path={'/language/:languageId/tags/:tagId/prayers'} component={PrayersList} />
        <Route exact path={'/prayers/:prayerId'} component={PrayersShow} />
      </Flex>
    </BackButton>
  }
}
