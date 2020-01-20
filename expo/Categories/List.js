@observer
export default class CategoriesList extends React.Component {
  render () {
    return <Flex margin={40}>
      {store.categories.map(category => <CategoriesItem
        key={category}
        category={category}
      />)}
    </Flex>
  }
}
