import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { getRandomColor } from "../../util/getRandomColor";
import useStyles from "../styles";

const useLocalStyles = makeStyles((theme: Theme) => ({
  paperStyle: {
    width: 260,
    height: 200,
    padding: 22,
  },
  titleStyle: {
    fontWeight: 800,
    fontSize: 38,
    lineHeight: 1,
  },
  subTitleStyle: {
    fontWeight: 700,
  },
}));

const Step = (props: any) => {
  const { title, subTitle, description, index, icon, handleStep } = props;
  const { paperStyle, titleStyle, subTitleStyle } = useLocalStyles();
  const { cursor } = useStyles();

  useEffect(() => {}, []);

  return (
    <React.Fragment>
      <Paper
        className={`${paperStyle} ${cursor}`}
        style={{ borderLeft: `5px solid ${getRandomColor(index)}` }}
        onClick={handleStep}
      >
        <Typography
          variant="h2"
          className={titleStyle}
          style={{ color: getRandomColor(index) }}
        >
          {title}
        </Typography>
        <Box display="flex" my={1}>
          <Box mr={1} mt={1}>
            {icon}
          </Box>
          <Typography variant="h3" className={subTitleStyle}>
            {subTitle}
          </Typography>
        </Box>

        <Typography variant="h6">{description}</Typography>
      </Paper>
    </React.Fragment>
  );
};

export default Step;
