import './Import'

export default () => <NativeRouter>
  {React.createElement(withRouter(InnerApp))}
</NativeRouter>

@observer class InnerApp extends React.Component {
  constructor (props) {
    super()
    global.store = new Store()
    global.history = props.history

    var disposer = observe(store, 'languageId', change => {
      if (Number.isFinite(store.languageId)) {
        history.replace('/tags')
        // history.replace('/prayer')
        // history.replace('/calendar/175')
      } else {
        history.replace('/languages')
      }

      disposer()
    })
  }

  render () {
    return <BackButton>
      <StatusBar hidden={true} />
      <TopBar />

      <Flex stretch2>
        {/*<Flex scroll stretch2>
          <Write padding={10} red>{this.props.history.location.pathname}</Write>
          <Write padding={10} red>{JSON.stringify(store)}</Write>
        </Flex>*/}

        <Route exact path={'/'} component={null} />
        <Route exact path={'/tags'} component={TagsList} />
        <Route exact path={'/prayers'} component={PrayersList} />
        <Route exact path={'/prayer'} component={PrayersShow} />
        <Route exact path={'/languages'} component={LanguagesList} />
        <Route exact path={'/starred'} component={StarredPrayersList} />
        <Route exact path={'/calendar'} component={CalendarCalendar} />
        <Route exact path={'/calendar/:year'} component={CalendarCalendar} />
        <Route exact path={'/calendar/:year/:month'} component={CalendarMonth} />
        <Route exact path={'/calendar/:year/:month/:day'} component={CalendarDay} />
      </Flex>
    </BackButton>
  }
}
