class Theme {
  text
  primary
  secondary
  tertiary
  quartenary

  pallettes = observable({
    default: {
      text: "black",
      primary: "white",
      secondary: "green",
      tertiary: "red",
      quartenary: "yellow",
    },
    snow: {
      text: "#262626",
      primary: "#f9fafc",
      secondary: "#ebeef3",
      tertiary: "#e1e8ef",
      quartenary: "#b7c2ce",
    },
    debug: {
      text: "purple",
      primary: "green",
      secondary: "blue",
      tertiary: "red",
      quartenary: "yellow",
    },
  })

  constructor (options={}) {
    this.pallettes = Object.assign({}, this.pallettes, options.pallettes)
    this.wrapper = options.wrapper
    this.setTheme(options.theme)
    this.setTheme = this.setTheme.bind(this)
  }

  setTheme (theme) {
    if (theme && !this.pallettes[theme]) console.warn(theme,"WARNING: pallette not fount. Using default")
    this.pallette = this.pallettes[theme] || this.pallettes["default"]

    this.text      = this.wrap(this.pallette.text)
    this.primary   = this.wrap(this.pallette.primary)
    this.secondary = this.wrap(this.pallette.secondary)
    this.tertiary  = this.wrap(this.pallette.tertiary)
    this.quartenary  = this.wrap(this.pallette.quartenary)
  }

  wrap (color) {
    if (this.wrapper == "background") return {backgroundColor: color}
    if (this.wrapper == "color") return {color: color}
    return color
  }
}

export default decorate(Theme, {
  pallettes: observable,
})
