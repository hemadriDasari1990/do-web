import React from "react";
//
import { getStickyColor } from "../../../util";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  hrStyle: (props: any) => ({
    width: 55,
    backgroundColor: getStickyColor(props.index),
    height: 8,
    float: "left",
    border: "none",
    borderRadius: 6,
  }),
}));

const ColoredLine = (props: any) => {
  const { index } = props;
  const { hrStyle } = useStyles({ index });

  return (
    <div>
      <hr className={hrStyle} />
    </div>
  );
};

export default ColoredLine;
