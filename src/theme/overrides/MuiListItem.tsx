export default {
  root: {
    '&$selected, &$selected:hover': {
      backgroundColor: '#e7f3ff',
    },
    '&$focusVisible': {
      backgroundColor: '#3333',
    },
    fontFamily: 'inherit',
    '&:hover': {
      backgroundColor: '#f0f2f5',
      borderRadius: 7,
    },
    margin: 5,
  },
  button: {
    margin: 10,
    // flexDirection: 'column',
    borderRadius: 10,
    // backgroundColor: '#ffffff',
    '&:hover, &$selected, &$selected:hover, &$focusVisible': {
      borderRadius: 28,
      boxShadow: '0 14px 28px #d9dde0, 0 10px 10px #c2c6d038',
      background: "-webkit-linear-gradient(90deg, #0072ff 0%, #0095ffba 100%)",
      // background: "-moz-linear-gradient(90deg, #0072ff 0%, #0095ffba 100%)",
      // background: "-o-linear-gradient(90deg, #0072ff 0%, #0095ffba 100%)",
      // background: "linear-gradient(90deg, #0072ff 0%, #0095ffba 100%)",
      color: '#fff',
      textDecoration: 'none',
      fontWeight: 'bold',
      // Reset on touch devices, it doesn't add specificity
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
      '& .MuiListItemIcon-root': {
        color: "#fff",
        '& .MuiSvgIcon-root': {
          fill: "#fff"
        },
      },
      '& .MuiListItemText-root': {
        '& .MuiTypography-root, &.MuiTypography-h5': {
          color: '#fff ',
          fontWeight: 500
        }
      }
    },
    width: "95%",
    // height: 60,
  },
}
