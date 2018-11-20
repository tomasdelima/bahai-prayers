import React from 'react'

require('./Import')

global.store = new Store()
global.t  = new Theme()

class App extends React.Component {
  constructor () {
    super()

    new Config().load((config) => {
      global.tr = Translation[store.language.Culture] || Translation.empty
      require('./ImportAfterStore')
    })
  }

  render() {
    return store.loading ? <Loading/> : <Menu/>
  }
}

export default observer(App, {})
