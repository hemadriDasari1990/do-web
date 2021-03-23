export default {
  contained: {
    boxShadow: "0 5px 30px rgb(0 0 0 / 30%)",
  },
  outlined: {
    // padding: '6px 9px',
    border: "2px solid #1e1e58",
    "&:hover": {
      border: "2px solid #1e1e58",
    },
  },
  outlinedPrimary: {
    // padding: '6px 9px',
    border: "2px solid #1e1e58",
    "&:hover": {
      border: "2px solid #1e1e58",
    },
  },
  containedPrimary: {
    background:
      "linear-gradient(270deg, rgb(82, 67, 170), rgb(237, 80, 180)) no-repeat",
  },
  // containedPrimary: {
  //   width: '100%',
  //   height: '30px !important',
  //   borderRadius: 5,
  // },
  // outlinedSecondary: {
  //   '&:hover': {
  //     // fontWeight: 'bold',
  //     // backgroundColor: '#fff !important',
  //   },
  //   border: '1px solid #fff',
  //   color: '#fff !important',
  // },
  label: {
    fontWeight: 600,
    width: "100%",
    display: "inherit",
    alignItems: "inherit",
    justifyContent: "inherit",
    textTransform: "capitalize",
    color: "inherit",
  },
  root: {
    letterSpacing: "0.02857em",
    textTransform: "none",
    transition:
      "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    fontFamily: "inherit",
    justifyContent: "space-between !important",
    alignItems: "center",
    textDecoration: "none",
    "-webkit-appearance": "none",
    appearance: "none",
    textalign: "left",
    padding: "0 24px !important",
    cursor: "pointer",
    boxSizing: "border-box",
    width: "fit-content",
    minHeight: 35,
    fontWeight: 500,
    borderRadius: 6,
    outline: "none",
    position: "relative",
    zIndex: 0,
    // boxShadow: "0 5px 30px rgb(0 0 0 / 30%)",
    "&:hover": {
      // boxShadow: "none",
      "&$disabled": {
        backgroundColor: "transparent",
      },
    },
    "&:active": {
      boxShadow: "none",
      "&$disabled": {
        backgroundColor: "transparent",
      },
    },
    "&:focus": {
      boxShadow: "none",
      "&$disabled": {
        backgroundColor: "transparent",
      },
    },
  },
};
