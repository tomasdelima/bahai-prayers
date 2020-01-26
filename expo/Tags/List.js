@observer
export default class TagsList extends React.Component {
  render () {
    return <Flex stretch2>
      <GenericList
        itemComponent={TagsItem}
        resource='tags'
        aggregator='kind'
      />
    </Flex>
  }
}
