class Theme {
  text
  primary
  secondary
  terciary

  pallettes = observable({
    default: {
      text: "black",
      primary: "white",
      secondary: "green",
      terciary: "red",
    },
  })

  constructor (options={}) {
    this.pallettes = Object.assign({}, this.pallettes, options.pallettes)
    this.wrapper = options.wrapper
    this.setTheme(options.theme)
    this.setTheme = this.setTheme.bind(this)
  }

  setTheme (theme) {
    if (theme && !this.pallettes[theme]) console.warn("WARNING: pallette not fount. Using default")
    this.pallette = this.pallettes[theme] || this.pallettes["default"]

    this.text      = this.wrap(this.pallette.text)
    this.primary   = this.wrap(this.pallette.primary)
    this.secondary = this.wrap(this.pallette.secondary)
    this.terciary  = this.wrap(this.pallette.terciary)
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
