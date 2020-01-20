class PrayersShow extends React.Component {
  constructor (props) {
    super()
    this.prayer = store.prayers.filter(prayer => prayer.Id == props.match.params.prayerId)[0]
  }

  tagsToStyles = {
    h1: [s.size(30), s.marginBottom(16)],
    h2: [s.size(24), s.marginBottom(14)],
    i: [s.italic],
    p: [s.marginBottom(10)],
  }

  parsedPrayer = () => parse(this.prayer.Text).map(this.renderElement)

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

  render () {
    return <Flex stretch2 start1 shrink1 margin={10} scroll>
      {this.parsedPrayer()}
    </Flex>
  }
}

export default withRouter(PrayersShow)
