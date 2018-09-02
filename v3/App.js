import React from 'react'

require('./Import')

class App extends React.Component {
  constructor () {
    super()

    global.store = new Store()

    new Config().load((config) => {
      global.t  = new Theme({theme: store.theme})
      global.c  = new Theme({theme: store.theme, wrapper: "color"})
      global.bg = new Theme({theme: store.theme, wrapper: "background"})
      require('./ImportAfterStore')
    })
  }

  render() {
    return store.loaded && <Menu/>
  }
}
export default observer(App, {})
