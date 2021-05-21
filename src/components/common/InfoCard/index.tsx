import Box from "@material-ui/core/Box";
import { IconButton } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import { getRandomColor } from "../../../util/getRandomColor";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  paperStyle: (props: any) => ({
    borderRadius: 16,
    height: props.height || 200,
    boxShadow: "0 4px 12px rgb(5 0 56 / 8%)",
    padding: "24px 24px 24px 24px",
  }),
  iconStyle: (props: any) => ({
    background: getRandomColor(props.index),
    "&:hover": {
      background: getRandomColor(props.index),
    },
    width: 40,
    height: 40,
    bottom: 16,
  }),
  titleStyle: {
    fontWeight: 700,
    fontSize: 24,
    lineHeight: 1.5,
    letterSpacing: -0.5,
  },
}));

const InfoCard = (props: any) => {
  const { icon, title, handleButton, description, titleMinHeight } = props;
  const { paperStyle, iconStyle, titleStyle } = useStyles(props);

  return (
    <React.Fragment>
      <Paper className={paperStyle}>
        <Box minHeight={titleMinHeight || 110}>
          <Typography variant="h2" className={titleStyle}>
            {title}
          </Typography>
        </Box>
        {description && (
          <Box minHeight={110} height="auto">
            <Typography variant="body1">{description}</Typography>
          </Box>
        )}
        {icon && (
          <Box display="flex" justifyContent="flex-end" mt={3}>
            <IconButton onClick={handleButton} className={iconStyle}>
              <SvgIcon component={icon} color="secondary" />
            </IconButton>
          </Box>
        )}
      </Paper>
    </React.Fragment>
  );
};

export default InfoCard;
