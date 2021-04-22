export default {
  contained: {
    boxShadow: "none",
  },
  outlined: {
    color: "#172b4d",
    border: "unset",
    "&:hover": {
      border: "unset",
    },
  },
  outlinedPrimary: {
    color: "#172b4d",
    border: "unset",
    "&:hover": {
      border: "unset",
    },
  },
  outlinedSecondary: {
    color: "#fff",
    border: "unset",
    background: "#cccccc1a",
    "&:hover": {
      border: "unset",
    },
  },
  containedPrimary: {
    background: "linear-gradient(180deg,#7997ff 0,#57f 100%)",
    "&:hover": {
      boxShadow: "none",
      "&$disabled": {
        boxShadow: "none",
      },
    },
  },
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
    backgroundColor: "#192a4d0d",
    cursor: "pointer",
    boxSizing: "border-box",
    width: "fit-content",
    minHeight: 35,
    fontWeight: 500,
    borderRadius: 6,
    outline: "none",
    position: "relative",
    zIndex: 0,
    boxShadow: "none",
    "&:hover": {
      backgroundColor: "#192a4d0d",
      "&$disabled": {
        backgroundColor: "transparent",
      },
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#192a4d0d",
      "&$disabled": {
        backgroundColor: "transparent",
      },
    },
    "&:focus": {
      boxShadow: "none",
      backgroundColor: "#192a4d0d",
      "&$disabled": {
        backgroundColor: "transparent",
      },
    },
  },
};
