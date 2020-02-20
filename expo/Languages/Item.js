export default ({ item }) => <GenericItem {...item}
  to='/tags'
  field='languageId'
  label={item.name}
  historyMethod='replace'
/>
