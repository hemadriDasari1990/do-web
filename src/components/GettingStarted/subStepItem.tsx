import React, { useEffect } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { getRandomColor } from "../../util/getRandomColor";

const useLocalStyles = makeStyles((theme: Theme) => ({
  paperStyle: {
    width: "fit-content",
    height: 60,
    padding: "5px 15px 5px 5px",
    marginBottom: 10,
  },
  titleStyle: {
    fontWeight: 800,
    fontSize: 28,
    lineHeight: 1,
    textAlign: "center",
  },
  subTitleStyle: {
    fontWeight: 600,
    lineHeight: 1,
    marginTop: 15,
  },
  dotBannerStyle: {
    background:
      "url(https://clickup.com/landing/images/v2/dots.svg) repeat top center/auto",
    width: 50,
    height: 50,
    position: "relative",
    marginTop: 5,
  },
  stepStyle: {
    marginTop: 5,
  },
}));

const SubStepItem = React.memo((props: any) => {
  const { items } = props;
  const {
    paperStyle,
    titleStyle,
    subTitleStyle,
    dotBannerStyle,
    stepStyle,
  } = useLocalStyles();

  useEffect(() => {}, []);

  return (
    <Box mt={5}>
      {items?.length
        ? items.map((item: { [Key: string]: any }) => (
            <Paper
              className={paperStyle}
              style={{ borderLeft: `5px solid ${getRandomColor(item?.index)}` }}
            >
              <Box display="flex">
                <Box mr={2} className={dotBannerStyle}>
                  <Typography
                    variant="h3"
                    className={`${titleStyle} ${stepStyle}`}
                    style={{ color: getRandomColor(item?.index) }}
                  >
                    {item?.step}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="h3" className={subTitleStyle}>
                    {item?.title}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          ))
        : null}
    </Box>
  );
});

export default SubStepItem;
