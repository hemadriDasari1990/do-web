import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { getRandomColor } from "../../../util/getRandomColor";

const useLocalStyles = makeStyles((theme: Theme) => ({
  paperStyle: {
    width: "fit-content",
    height: "100%",
    padding: 20,
  },
  titleStyle: {
    fontWeight: 800,
    fontSize: 28,
    lineHeight: 1,
  },
  stepStyle: {
    marginTop: 5,
  },
  subTitleStyle: {
    lineHeight: 2,
    fontWeight: 500,
  },
}));

const GridItem = React.memo((props: any) => {
  const { item } = props;
  const { paperStyle, titleStyle, stepStyle, subTitleStyle } = useLocalStyles();

  useEffect(() => {}, []);

  return (
    <Box mb={1} mr={1}>
      <Paper
        className={paperStyle}
        style={{ borderLeft: `5px solid ${getRandomColor(item?.index)}` }}
      >
        {item?.step && (
          <Box mb={2}>
            <Typography
              variant="h3"
              className={`${titleStyle} ${stepStyle}`}
              style={{ color: getRandomColor(item?.index) }}
            >
              {item?.step}
            </Typography>
          </Box>
        )}
        <Hidden only={["xs", "sm"]}>
          <Typography component="p" className={subTitleStyle}>
            {item?.title}
          </Typography>
        </Hidden>
        <Hidden only={["xl", "lg", "md"]}>
          <Typography variant="body1">{item?.title}</Typography>
        </Hidden>
      </Paper>
    </Box>
  );
});

export default GridItem;
