@observer
export default class CategoriesItem extends React.Component {
  render () {
    return <Flex margin={40}>
      {this.props.category}
    </Flex>
  }
}
