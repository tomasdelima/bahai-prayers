class PrayersShow extends React.Component {
  constructor (props) {
    super()
    // store.fontSize = 18
    this.prayer = store.prayers.filter(prayer => prayer.id == store.prayerId)[0]
    // this.prayer = {text: '<h1>This is an element of type H1</h1><h2>This is an element of type H2</h2><i>This is an element of type I</i><p></p><p>This is another element of type P. This is another element of type P. This is another element of type P. </p>', author: 'Author'}
    // this.prayer = {text: '<h1>Sedratu-l Muntahá</h1><p>Perguntaram para Bahaullah como poderiam ficar firmes a fé, mesmo depois de tsntos mártires? Ele disse que apenas os bahais deveriam conhecer ao manifestsnte, Bahaullah.</p><p>Uma vez, quando bahaullah escreveu que, apesar de ter 6 anos de idade, Ele estava ligado ao Sedratul Muntaha.</p><p><i>Pérolas de Sabedoria pag. 204</i></p><h2>Tudo começa com o Ponto Primordial.</h2><p>"depois de conhecimento da revelacao de bahaullah, e ficar firme no convenio de deus, nenhum dever é mais importante do que o ensino da fe. bem aventurado quem fazer esses tres deveres."</p>'}
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

  render () {
    return <Flex stretch2 start1 shrink1 margin={20} scroll>
      {this.parsedPrayer()}

      <Write
        marginTop={40}
        style={{textAlign: 'right'}}
      >— {this.prayer.author}</Write>
    </Flex>
  }
}

export default withRouter(PrayersShow)
