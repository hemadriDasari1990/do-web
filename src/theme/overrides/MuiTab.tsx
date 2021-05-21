export default {
  root: {
    "& .Mui-selected": {
      background: "red",
    },
  },
  wrapper: {
    flexDirection: "row",
  },
  /* Styles applied to the root element if both `icon` and `label` are provided. */
  labelIcon: {
    minHeight: 40,
    "& $wrapper > *:first-child": {
      marginBottom: 6,
    },
  },
};
