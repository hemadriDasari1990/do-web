export default {
  root: {},
  wrapper: {
    flexDirection: "row",
  },
  /* Styles applied to the root element if both `icon` and `label` are provided. */
  labelIcon: {
    minHeight: 40,
    paddingTop: 9,
    "& $wrapper > *:first-child": {
      marginBottom: 6,
    },
  },
};
