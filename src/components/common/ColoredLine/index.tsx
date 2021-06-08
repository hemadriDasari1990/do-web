import React from "react";
import getRandomBGColor from "../../../util/getRandomColor";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  hrStyle: (props: any) => ({
    width: 55,
    background: getRandomBGColor(props.index),
    height: 8,
    float: "left",
    border: "none",
    borderRadius: 6,
  }),
}));

const ColoredLine = React.memo((props: any) => {
  const { index } = props;
  const { hrStyle } = useStyles({ index });

  return (
    <div>
      <hr className={hrStyle} />
    </div>
  );
});

export default ColoredLine;
