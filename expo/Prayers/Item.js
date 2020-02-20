export default ({ item }) => {
  let formattexText = item.text.replace(/<.+?>/g, ' ').replace(/\s+/g, ' ')
  let wordCount = formattexText.split(/\s+/).length

  return <GenericItem {...item}
    to='/prayer'
    field='prayerId'
  >
    <Flex padding={20} stretch2>
      <Write>{formattexText.slice(0, 100).trim() + '...'}</Write>

      <Flex paddingTop={10} row spacedIn>
        {/*<Write>{JSON.stringify(item)}</Write>*/}
        <Flex>
          <Write>{item.author}</Write>
        </Flex>

        <Write size={12}>{wordCount}</Write>
      </Flex>
    </Flex>
  </GenericItem>
}
