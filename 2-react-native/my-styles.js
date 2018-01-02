import Styles from 'react-quick-styles'
var s = Styles.ReactNativeStyles

var or = (x, y, z) => (x == 0) ? x : x || (y == 0 ? y : y || z)
var distancing = (label, x, y, w, z) => {var obj = {};obj[label + "Top"] = x;obj[label + "Right"] = or(y, x);obj[label + "Bottom"] = or(w, x);obj[label + "Left"] = or(z, y, x);return obj;}

var BG = (x) => ({backgroundColor: x})

export default Object.assign(Styles.ReactNativeStyles, {
  red: BG(s.t.red(0.2)),
  theme: {},
  timeless: {fontFamily: 'timeless'},

  padding: (x, y, w, z) => distancing('padding', x, y, w, z),
  margin: (x, y, w, z) => distancing('margin', x, y, w, z),
})
