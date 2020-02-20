@observer
class PrayersShow extends React.Component {
  constructor (props) {
    super()
    this.prayer = store.prayers.filter(prayer => prayer.id == store.prayerId)[0]
    this.prayer.type = 'prayer'
    // this.prayer = {
    //   id: 12,
    //   text: '<h1>This is an element of type H1</h1><h2>This is an element of type H2</h2><i>This is an element of type I</i><p></p><p>This is another element of type P. This is another element of type P. This is another element of type P. </p>',
    //   author: 'Author',
    // }
    store.starred = store.starred || []
  }

  tagsToStyles = {
    h1: [s.size(store.fontSize + 6), s.marginBottom(20)],
    h2: [s.size(store.fontSize + 3), s.marginBottom(18)],
    i: [s.italic],
    p: [s.marginBottom(15), s.lineHeight(store.fontSize * 1.3)],
  }

  parsedPrayer = () => parse(this.prayer.text).map(this.renderElement)

  renderElement = (element, key) => {
    if (element.type == 'text') {
      return <Write key={key} style={element.style}>{element.content}</Write>
    } else if (element.type == 'element') {
      element.children.map(child => child.style = [...(element.style || []), ...this.tagsToStyles[element.tagName]])

      return <Flex shrink stretch2 key={key}>
        {element.children.map(this.renderElement)}
      </Flex>
    } else {
      console.warn('not renderable')
    }
  }

  isStarred = () => store.starred.filter(prayer => prayer.id == this.prayer.id).length > 0

  star = () => {
    if (this.isStarred()) {
      store.starred = store.starred.filter(prayer => prayer.id != this.prayer.id)
    } else {
      store.starred.push(this.prayer)
    }
  }

  renderStar (color, solid=false) {
    return <FontAwesome5
      solid={solid}
      name='star'
      color={color}
      size={30}
      style={[s.absolute, s.zindex(-100)]}
    />
  }

  renderButtons () {
    return <Flex marginV={30}>
      <Button containerStyle={s.red} marginV={30} onPress={this.star}>
        {this.isStarred() && this.renderStar('gold', true)}
        {this.renderStar()}
      </Button>
    </Flex>
  }

  render () {
    return <Flex stretch2 start1 shrink1 margin={20} scroll>
      {this.parsedPrayer()}

      <Write
        marginTop={40}
        style={{textAlign: 'right'}}
      >— {this.prayer.author}</Write>

      {this.renderButtons()}
    </Flex>
  }
}

export default withRouter(PrayersShow)
