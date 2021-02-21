export default {
  root: {},
  indicator: {
    // backgroundColor: '#0072ff',
  },
  /* Styles applied to the root element if the parent [`Tabs`](/api/tabs/) has `textColor="primary"`. */
  textColorPrimary: {
    color: '#5b6886',
    '&$selected': {
      color: '#fff',
    },
    '&$disabled': {
      color: '#3333',
    },
  },
}
