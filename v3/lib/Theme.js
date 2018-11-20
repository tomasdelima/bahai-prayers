import React from 'react'

class Theme {
  themes = {
    Default: {
    //   text: "black",
    //   primary: "white",
    //   secondary: "green",
    //   tertiary: "green",
    //   quartenary: "#ddd",
    // },
    // snow: {
      text: "#262626",
      primary: "#f9fafc",
      secondary: "#ebeef3",
      tertiary: "#d1d8df",
      quartenary: "#b7c2ce",
    },
    Dark: {
      text: "#99a",
      primary: "#111",
      secondary: "#eee",
      tertiary: "#eee",
      quartenary: "#224",
    },
    // debug: {
    //   text: "purple",
    //   primary: "green",
    //   secondary: "blue",
    //   tertiary: "red",
    //   quartenary: "yellow",
    // },
  }

  get colors () {
    return this.themes[store.theme]
  }

  get text () {
    return {color: this.themes[store.theme].text}
  }

  get bg1 () {
    return {backgroundColor: this.themes[store.theme].primary}
  }

  get bg2 () {
    return {backgroundColor: this.themes[store.theme].secondary}
  }

  get bg3 () {
    return {backgroundColor: this.themes[store.theme].tertiary}
  }

  get bg4 () {
    return {backgroundColor: this.themes[store.theme].quartenary}
  }
}

export default decorate(Theme, {})
