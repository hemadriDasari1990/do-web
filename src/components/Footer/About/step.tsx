import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { getRandomColor } from "../../../util/getRandomColor";

const useLocalStyles = makeStyles((theme: Theme) => ({
  paperStyle: {
    width: 210,
    height: 180,
    padding: 22,
  },
  titleStyle: {
    fontWeight: 800,
    fontSize: 38,
    lineHeight: 1,
  },
  subTitleStyle: {
    fontWeight: 700,
    lineHeight: 1,
  },
}));

const Step = (props: any) => {
  const { title, subTitle, description, index } = props;
  const { paperStyle, titleStyle, subTitleStyle } = useLocalStyles();

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Paper
        className={paperStyle}
        style={{ borderLeft: `5px solid ${getRandomColor(index)}` }}
      >
        <Typography
          variant="h2"
          className={titleStyle}
          style={{ color: getRandomColor(index) }}
        >
          {title}
        </Typography>
        <Box my={1}>
          <Typography variant="h2" className={subTitleStyle}>
            {subTitle}
          </Typography>
        </Box>
        <Typography variant="body2" style={{ fontWeight: 700, fontSize: 18 }}>
          {description}
        </Typography>
      </Paper>
    </React.Fragment>
  );
};

export default Step;
