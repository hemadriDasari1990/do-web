export default {
  // contained: {
  //   background: "-webkit-linear-gradient(90deg, #0072ff 0%, #0095ffba 100%)",
  //   // background: "-moz-linear-gradient(90deg, #0072ff 0%, #0095ffba 100%)",
  //   // background: "-o-linear-gradient(90deg, #0072ff 0%, #0095ffba 100%)",
  //   // background: "linear-gradient(90deg, #0072ff 0%, #0095ffba 100%)",
  //   color: '#fff !important',
  //   '&:hover': {
  //     backgroundColor: '#0072ff',
  //     color: '#fff !important',
  //   },
  // },
  outlined: {
    // padding: '6px 9px',
    border: '2px solid #0072ff',
    '&:hover': {
      border: "2px solid #0072ff",
    },
  },
  outlinedPrimary: {
    // padding: '6px 9px',
    border: "2px solid #0072ff",
    '&:hover': {
      border: "2px solid #0072ff",
    },
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
    width: '100%',
    display: 'inherit',
    alignItems: 'inherit',
    justifyContent: 'inherit',
    textTransform: "capitalize"
  },
  root: {
    letterSpacing: '0.02857em',
    textTransform: 'none',
    transition:
      'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    fontFamily: 'inherit',
    justifyContent: 'space-between !important',
    alignItems: 'center',
    textDecoration: 'none',
    '-webkit-appearance': 'none',
    appearance: 'none',
    textalign: 'left',
    padding: '0 24px !important',
    cursor: 'pointer',
    boxSizing: 'border-box',
    width: "fit-content",
    minHeight: 35,
    fontWeight: 500,
    borderRadius: 6,
    outline: 'none',
    position: 'relative',
    zIndex: 0,
    '&:hover': {
      boxShadow: 'none',
      '&$disabled': {
        backgroundColor: 'transparent',
      },
    },
    '&:active': {
      boxShadow: 'none',
      '&$disabled': {
        backgroundColor: 'transparent',
      },
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      '&$disabled': {
        backgroundColor: 'transparent',
      },
    },
  },
}
