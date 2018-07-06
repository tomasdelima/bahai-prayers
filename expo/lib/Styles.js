import {Dimensions, StatusBar} from 'react-native'

var statusBarHeight = StatusBar.currentHeight
var windowHeight = Dimensions.get('window').height
var windowWidth  = Dimensions.get('window').width

export default {
  // General: simple
  empty:        { },
  row:          { flexDirection: 'row' },
  shrink:       { flex: -1 },
  static:       { flex: 0 },
  flex:         { flex: 1 },
  flex2:        { flex: 2 },
  center:       { alignSelf: 'center' },
  right:        { textAlign: 'right', right: 50 },
  top:          { top: 20 },
  padding:      { padding: 15 },
  paddingH:     { paddingHorizontal: 30 },
  paddingV:     { paddingVertical: 15 },
  paddingV3:    { paddingVertical: 45 },
  marginH:      { marginHorizontal: 15 },
  marginV:      { marginVertical: 15 },
  rotate:       { transform: [{rotate: '-90deg'}] },
  justifyLeft:  { justifyContent: 'flex-start' },
  justifyRight: { justifyContent: 'flex-end' },
  justifyCenter:{ justifyContent: 'center' },
  alignCenter:  { alignItems: 'center' },
  italic:       { fontStyle: 'italic' },
  underline:    { textDecorationLine: 'underline' },
  translucid:   { opacity: 0.6 },
  red:          { backgroundColor: 'rgba(255, 0, 0, 0.2)' },
  blue:         { backgroundColor: 'rgba(0, 0, 255, 0.2)' },
  green:        { backgroundColor: 'rgba(0, 255, 0, 0.2)' },
  gray:         { backgroundColor: 'rgba(128, 128, 128, 0.2)' },
  white:        { backgroundColor: 'white' },
  high:         { height: windowHeight },
  wide:         { width: windowWidth },
  noFontFamily: { fontFamily: '' },
  heightForWidth: { width: windowHeight },
  widthForHeight: { height: windowWidth },
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
    height: windowHeight,
    width: windowWidth,
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
    width: windowWidth - 200,
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
    fontSize: windowWidth*0.4,
    fontFamily: 'ruritania',
    color: 'rgba(128, 128, 128, 0.25)',
  },
}