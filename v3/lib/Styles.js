import {Dimensions, StatusBar} from 'react-native'

global.statusBarHeight = StatusBar.currentHeight || 20
global.Height = Dimensions.get('window').height
global.Width  = Dimensions.get('window').width
global.rgba = (r, g, b, a) => "rgba("+r+","+g+","+b+","+a+")"

global.theme = ["white", "red", "green", "black"]

var or = (a, b, c) => {
  if (a || a === 0) return a
  if (b || b === 0) return b
  return c
}

export default {
  // Positioning
  relative: {position: "relative"},
  absolute: {position: "absolute"},
  fixed:    {position: "fixed"},

  // Display
  block:  {display: "block"},
  inline: {display: "inline-block"},
  hidden: {display: "none"},
  flex:   {display: 1},

  // Flex
  wrap:          {flexWrap: "wrap"},
  row:           {flexDirection: "row"},
  rowReverse:    {flexDirection: "row-reverse"},
  column:        {flexDirection: "column"},
  columnReverse: {flexDirection: "column-reverse"},
  spacedOut:     {justifyContent: "space-around"},
  spacedIn:      {justifyContent: "space-between"},
  center1:       {justifyContent: "center"},
  center2:       {alignItems: "center"},
  centerSelf:    {alignSelf: "center"},
  stretch1:      {justifyContent: "stretch"},
  stretch2:      {alignItems: "stretch"},
  stretch:       {alignItems: "stretch"},
  stretchSelf:   {alignSelf: "stretch"},
  start1:        {justifyContent: "flex-start"},
  start2:        {alignItems: "flex-start"},
  startSelf:     {alignSelf: "flex-start"},
  end1:          {justifyContent: "flex-end"},
  end2:          {alignItems: "flex-end"},
  endSelf:       {alignSelf: "flex-end"},
  shrink:        (x) => ({flexShrink: x || -1}),
  grow:          (x) => ({flexGrow: x || 1}),

  // Backgrounds
  opaqueBG: (x) => ({backgroundColor: rgba(0, 0, 0, x)}),
  transparentBG: {backgroundColor: "transparent"},
  lightGrayBG:   {backgroundColor: "#E1E1E3"},
  whiteBG:       {backgroundColor: "white"},
  red:           {backgroundColor: rgba(255, 0, 0, 0.2)},
  blue:          {backgroundColor: rgba(0, 0, 255, 0.2)},
  green:         {backgroundColor: rgba(0, 255, 0, 0.2)},
  yellow:        {backgroundColor: rgba(255, 255, 0, 0.2)},
  magenta:       {backgroundColor: rgba(255, 0, 255, 0.2)},
  cyan:          {backgroundColor: rgba(0, 255, 255, 0.2)},
  gray:          {backgroundColor: rgba(128, 128, 128, 0.2)},
  white:         {backgroundColor: 'white'},

  bg0: {backgroundColor: theme[0]},
  bg1: {backgroundColor: theme[1]},
  bg2: {backgroundColor: theme[2]},
  bg3: {backgroundColor: theme[3]},

  // Font colors
  color0: {color: theme[0]},
  color1: {color: theme[1]},
  color2: {color: theme[2]},
  color3: {color: theme[3]},

  // Text
  noWrap:        {whiteSpace: "nowrap"},
  wrapWord:      {wordWrap: "break-word"},
  noDecoration: {textDecoration: "none"},
  bold:         {fontWeight: "bold"},
  underline:    {textDecoration: "underline"},
  italic:       {fontStyle: "italic"},
  justify:      {textAlign: "justify"},
  alignCenter:  {textAlign: "center"},
  alignRight:   {textAlign: "right"},
  alignLeft:    {textAlign: "left"},
  indent:       (x) => ({textIndent: x}),
  size:         (x) => ({fontSize: x}),
  lineHeight:   (x) => ({lineHeight: x}),

  // Dimensioning
  fullscreen: {width: Width, height: Height},
  wide:       (x=1) => ({width:    x <= 1 ? 100*x+"%" : x}),
  minWidth:   (x=1) => ({minWidth: x <= 1 ? 100*x+"%" : x}),
  maxWidth:   (x=1) => ({maxWidth: x <= 1 ? 100*x+"%" : x}),
  high:       (x=1) => ({height:   x <= 1 ? 100*x+"%" : x}),
  rect:       (x) => {x = x || {}; return [s.wide(x.w), s.high(x.h)]},
  top:        (x) => ({top:    x || 0}),
  bottom:     (x) => ({bottom: x || 0}),
  left:       (x) => ({left:   x || 0}),
  right:      (x) => ({right:  x || 0}),
  square:     (x) => ({width: x, height: x}),
  circle:     (x) => ({borderRadius: 1000, width: x, height: x}),

  // Distancing
  paddings:       (x, y, w, z) => ({paddingTop: x, paddingRight: or(y, x), paddingBottom: or(w, x), paddingLeft: or(z, y, x)}),
  paddingH:      (x) => ({paddingLeft: x, paddingRight: x}),
  paddingV:      (x) => ({paddingTop: x, paddingBottom: x}),
  paddingTop:    (x) => ({paddingTop: x}),
  paddingBottom: (x) => ({paddingBottom: x}),
  paddingRight:  (x) => ({paddingRight: x}),
  paddingLeft:   (x) => ({paddingLeft: x}),

  margins:       (x) => ({marginTop: x[0], marginRight: or(x[1], x[0]), marginBottom: or(x[2], x[0]), marginLeft: or(x[2], x[1], x[0])}),
  marginH:       (x) => ({marginLeft: x, marginRight: x}),
  marginV:       (x) => ({marginTop: x, marginBottom: x}),
  marginTop:     (x) => ({marginTop: x}),
  marginBottom:  (x) => ({marginBottom: x}),
  marginRight:   (x) => ({marginRight: x}),
  marginLeft:    (x) => ({marginLeft: x}),

  // Others
  scroll:   {overflow: "auto"},
  pointer:  {cursor: "pointer"},
  noBorder: {border: 0},
  border:   (x, y) => ({borderWidth: x, borderColor: y}),
  radius:   (x) => ({borderRadius: x}),
  bgImage:  (x) => ({backgroundImage: "url(" + x + ")"}),
  zindex:   (x) => ({zIndex: x}),
  opacity:  (x) => ({opacity: x}),





  // General: simple
  flex:         { flex: 1 },
  rotate:       { transform: [{rotate: '-90deg'}] },
  translucid:   { opacity: 0.6 },
  // high:         { height: Height },
  // wide:         { width: Width },
  noFontFamily: { fontFamily: '' },
  heightForWidth: { width: Height },
  widthForHeight: { height: Width },
  statusBarHeight,
  color: (c) => ({color: c}),

  // General: complex
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  item: {
    fontSize: 20,
    marginHorizontal: 30,
    fontFamily: 'timeless',
  },
  absolute: {
    position: 'absolute',
    height: Height,
    width: Width,
    top: 0,
    left: 0,
  },
  textAlignCenter: {
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  // Specific
  cardboard: {
    flex: 1,
    backgroundColor: '#eee',
  },
  card: {
    margin: 5,
    marginBottom: 0,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    borderWidth: 1,
  },
  card2: {
    margin: 5,
    borderRadius: 7,
    borderWidth: 1,
  },
  indicator: {
    borderRadius: 24,
    width: 24,
    height: 24,
    right: 1,
    top: 0,
    borderWidth: 1,
    position: 'absolute'
  },
  gregorianMonthBar: {
    marginBottom: 3,
    height: 10,
  },
  inlineCategory: {
    color: 'rgba(128, 128, 128, 128)',
    fontSize: 15,
  },
  searchInput: {
    fontSize: 20,
    height: 50
  },
  letterCount: {
    width: Width - 200,
    backgroundColor: 'red',
  },
  scrollView: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  bottomButtonsContainer: {
    justifyContent: 'space-around',
    paddingHorizontal: 50,
  },
  counter: {
    fontSize: 150,
    fontFamily: 'ruritania',
  },
  watermark: {
    position: 'absolute',
    fontSize: Width*0.4,
    fontFamily: 'ruritania',
    color: 'rgba(128, 128, 128, 0.25)',
  },
}