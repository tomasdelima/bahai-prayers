import Styles from 'react-quick-styles'
import {StyleSheet, Dimensions} from 'react-native'

var s = Styles.ReactNativeStyles

var Height = Dimensions.get('window').height - 25
var Width  = Dimensions.get('window').width

var or = (x, y, z) => (x == 0) ? x : x || (y == 0 ? y : y || z)
var distancing = (label, x, y, w, z) => {var obj = {};obj[label + "Top"] = x;obj[label + "Right"] = or(y, x);obj[label + "Bottom"] = or(w, x);obj[label + "Left"] = or(z, y, x);return obj;}

var BG = (x) => ({backgroundColor: x})

var calculateSize = (x, y) => x == 0 ? 0 : x || y

var myStyles = {
  red: BG(s.t.red(0.2)),
  theme: {},
  timeless: {fontFamily: 'timeless'},
  ruriania: {fontFamily: 'ruritania'},
  noFontFamily: {fontFamily: ''},
  translucid:   {opacity: 0.6},

  textAlignCenter: [s.alignCenter, {textAlignVertical: 'center'}],
  verticalAlignCenter: {textAlignVertical: 'center'},
  selfStart1: {justifySelf: 'flex-start'},
  selfStart1: {alignSelf: 'flex-start'},
  selfEnd2: {justifySelf: 'flex-end'},
  selfEnd2: {alignSelf: 'flex-end'},

  shrink: {flex: -1},
  flex: {flex: 1},
  row: {flexDirection: 'row'},

  padding: (x, y, w, z) => distancing('padding', x, y, w, z),
  margin: (x, y, w, z) => distancing('margin', x, y, w, z),

  high: (x) => ({height: calculateSize(x, Height)}),
  wide: (x) => ({width:  calculateSize(x, Width)}),
  rect: (x={}) => Object.assign(myStyles.high(x.h), myStyles.wide(x.w)),
  lineHeight: (x) => ({lineHeight: x}),
  top: (x) => ({top: x || 0}),
  bottom: (x) => ({bottom: x || 0}),
  left: (x) => ({left: x || 0}),
  right: (x) => ({right: x || 0}),

  container: [{flex: 1}, s.center1, s.stretch2],
  item: [s.size(20), distancing('margin', 0, 30), s.timeless],
  Height,
  Width,
}

export default Object.assign(Styles.ReactNativeStyles, myStyles)

