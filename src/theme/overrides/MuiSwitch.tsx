export default {
  root: {},
  switchBase: {
    // Controls default (unchecked) color for the thumb
    color: "#6f6f6f",
  },
  colorSecondary: {
    "&$checked": {
      // Controls checked color for the thumb
      color: "#57f",
    },
  },
  track: {
    // Controls default (unchecked) color for the track
    opacity: 0.2,
    backgroundColor: "#172b4d63",
    "$checked$checked + &": {
      // Controls checked color for the track
      opacity: 0.7,
      backgroundColor: "#172b4d63",
    },
  },
};
