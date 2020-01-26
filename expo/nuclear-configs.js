export default {
  theme: [
    '#424242', // 0: dark
    '#848484', // 1: gray
    '#f6f6f6', // 2: light

    '#224445', // 3: dark green
    '#528f90', // 4: green
    '#6cc8ca', // 5: light green
    '#dcfdff', // 6: bright green

    '#33142a', // 7: dark red
  ],
  defaultWriteStyle: () => [s.size(store.fontSize), s.color3],
}
