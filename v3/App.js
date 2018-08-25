import React from 'react'

require('./Import')

class App extends React.Component {
  constructor () {
    super()

    global.store = new Store()

    new Config().load(() => {
      var pallettes = {
        light: {
          text: "#222",
          primary: "white",
          secondary: "#0F0",
          terciary: "red",
        },
        dark: {
          text: "white",
          primary: "black",
          secondary: "green",
          terciary: "red",
        },
      }

      global.t  = new Theme({pallettes: pallettes, theme: store.theme})
      global.c  = new Theme({pallettes: pallettes, theme: store.theme, wrapper: "color"})
      global.bg = new Theme({pallettes: pallettes, theme: store.theme, wrapper: "background"})
    })
  }

  render() {
    return store.loaded && <Navigator/>
  }
}
export default observer(App, {})
