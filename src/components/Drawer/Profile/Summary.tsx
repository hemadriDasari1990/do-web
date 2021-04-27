import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  titleStyle: {
    color: "#777e8c",
    fontWeight: "normal",
  },
  dlStyle: {
    display: "table",
    width: "100%",
    tableLayout: "fixed",
  },
  dtStyle: {
    display: "table-cell",
    textAlign: "right",
    verticalAlign: "middle",
    width: "50%",
  },
  ddStyle: {
    display: "table-cell",
    paddingLeft: 10,
  },
}));

const ProfileSummary = (props: any) => {
  const { title, value } = props;
  const { titleStyle, dlStyle, dtStyle, ddStyle } = useStyles();
  return (
    <dl className={dlStyle}>
      <dt className={dtStyle}>
        <Typography className={titleStyle} variant="body2">
          {title}
        </Typography>
      </dt>
      <dd className={ddStyle}>
        {typeof value === "string" && (
          <Typography variant="subtitle1">{value}</Typography>
        )}
        {typeof value !== "string" && value}
      </dd>
    </dl>
  );
};

export default ProfileSummary;
