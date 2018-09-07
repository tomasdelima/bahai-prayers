import React from 'react'

require('./Import')

global.store = new Store()
global.t  = new Theme()

class App extends React.Component {
  constructor () {
    super()

    new Config().load((config) => {
      require('./ImportAfterStore')
    })
  }

  render() {
    return store.loading ? <Loading/> : <Menu store={store}/>
  }
}

export default observer(App, {})
