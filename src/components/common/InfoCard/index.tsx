import Box from "@material-ui/core/Box";
import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
// import Tooltip from '@material-ui/core/Tooltip'
import Typography from "@material-ui/core/Typography";
import { getRandomColor } from "../../../util/getRandomColor";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  boxStyle: {
    backgroundColor: "#fff",
    borderRadius: 6,
    height: 100,
    boxShadow: "#e3e3e633 0px 7px 29px 0px",
  },
  summaryGridStyle: {
    minHeight: 300,
  },
  iconGridStyle: {
    backgroundColor: "#fff",
    height: 60,
    width: 60,
    margin: "auto auto auto 5px",
    borderRadius: 6,
    boxShadow: "#e3e3e633 0px 7px 29px 0px",
  },
  iconStyle: {
    position: "relative",
    top: "calc(50% - 18px)",
  },
  iconLogoStyle: {
    fontSize: 40,
  },
  titleStyle: {
    fontWeight: 400,
  },
}));

const InfoCard = (props: any) => {
  const { icon, title, value } = props;
  const {
    boxStyle,
    iconGridStyle,
    iconStyle,
    iconLogoStyle,
    titleStyle,
  } = useStyles();

  return (
    <React.Fragment>
      <Box
        className={boxStyle}
        display="flex"
        justifyContent="space-between"
        p={2}
      >
        <Box className={iconGridStyle} justifyContent="center">
          <Box className={iconStyle} textAlign="center">
            <SvgIcon
              component={icon}
              className={iconLogoStyle}
              style={{ color: getRandomColor() }}
            />
          </Box>
        </Box>
        <Box ml={2} mt={1}>
          <Box>
            <Typography className={titleStyle} variant="h4">
              {title}
            </Typography>
          </Box>
          <Box textAlign="center">
            <Typography variant="h1">{value || 0}</Typography>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default InfoCard;
