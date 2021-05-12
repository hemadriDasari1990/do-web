const fontFamily =
  "Charlie Display,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Noto Sans,Ubuntu,Droid Sans,Helvetica Neue,sans-serif";
const textPrimary = "#172b4d";
const textSecondary = "#6f7588";
export default {
  gutterBottom: {
    marginBottom: 8,
  },
  textPrimary: textPrimary,
  textSecondary: textSecondary,
  h1: {
    fontFamily: fontFamily,
    fontWeight: 600,
    fontSize: "2.75rem",
    letterSpacing: "0.76px",
    color: textPrimary,
  },
  h2: {
    fontFamily: fontFamily,
    fontWeight: 500,
    fontSize: 26,
    letterSpacing: "-0.24px",
    lineHeight: 1.8,
    color: textPrimary,
  },
  h3: {
    fontFamily: fontFamily,
    fontWeight: 500,
    fontSize: 20,
    letterSpacing: "-0.06px",
    lineHeight: 2,
    color: textPrimary,
  },
  h4: {
    fontFamily: fontFamily,
    fontWeight: 500,
    fontSize: 18,
    letterSpacing: "-0.06px",
    lineHeight: 1.8,
    color: textPrimary,
  },
  h5: {
    fontFamily: fontFamily,
    fontWeight: 500,
    fontSize: 16,
    letterSpacing: "-0.05px",
    color: textPrimary,
    // marginBottom: 24,
    lineHeight: 2,
  },
  h6: {
    fontFamily: fontFamily,
    fontWeight: 400,
    fontSize: 14,
    letterSpacing: "-0.05px",
    color: textSecondary,
    whiteSpace: "pre-line",
  },
  subtitle1: {
    fontFamily: fontFamily,
    fontSize: 14,
    letterSpacing: "-0.05px",
    fontWeight: 600,
    color: textPrimary,
  },
  subtitle2: {
    fontFamily: fontFamily,
    fontWeight: 500,
    fontSize: 14,
    letterSpacing: "-0.05px",
    color: textSecondary,
  },
  body1: {
    fontFamily: fontFamily,
    fontSize: 18,
    fontWeight: 400,
    letterSpacing: "-0.05px",
    color: textPrimary,
  },
  body2: {
    fontFamily: fontFamily,
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "-0.04px",
    whiteSpace: "pre-line",
    color: textSecondary,
  },
  button: {
    fontFamily: fontFamily,
    fontSize: 14,
  },
  caption: {
    fontFamily: fontFamily,
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: "-0.04px",
    whiteSpace: "pre-line",
    color: textSecondary,
  },
  overline: {
    fontFamily: fontFamily,
    fontSize: ".875rem",
    fontWeight: 600,
    letterSpacing: "-0.04px",
    whiteSpace: "pre-line",
    textTransform: "capitalize",
    lineHeight: 1.5,
    color: "#eaeded",
    "&:hover": {
      color: "#57f",
    },
  },
};
