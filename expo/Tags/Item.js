export default ({ tag }) => <GenericItem
  to={`/${store.language.Id}/tags/${tag.Id}/prayers`}
  label={`/${store.language.Id}/tags/${tag.Id}/prayers`}
  label2={tag.Name}
/>
