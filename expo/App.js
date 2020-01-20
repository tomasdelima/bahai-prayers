import './Import'

global.store = new Store()

export default class App extends React.Component {
  render () {
    return <CategoriesList />
  }
}
