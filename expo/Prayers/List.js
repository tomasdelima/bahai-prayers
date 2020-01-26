export default () => <GenericList
  itemComponent={PrayersItem}
  resource='prayers'
  filter={prayer => prayer.tags.map(tag => tag.Id).indexOf(store.tagId) + 1}
/>
