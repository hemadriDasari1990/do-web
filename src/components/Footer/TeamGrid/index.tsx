import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import CreateNewTeam from "../../../assets/team.svg";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import React from "react";
import { Typography } from "@material-ui/core";
import hemadri from "../../../assets/hemadri.jpg";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      overflow: "hidden",
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      //   width: 500,
      //   height: 450,
    },
    icon: {
      color: "rgba(255, 255, 255, 0.54)",
    },
  })
);

export default function TeamGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} cols={4} className={classes.gridList}>
        <GridListTile cols={1} rows={2}>
          <img
            src={hemadri}
            loading="lazy"
            height="100%"
            alt={"Hemadri Dasari"}
          />
          <GridListTileBar
            title={
              <Typography variant="h2" color="secondary">
                Hemadri Dasari
              </Typography>
            }
            subtitle={
              <Typography variant="h5" color="secondary">
                Founder
              </Typography>
            }
          />
        </GridListTile>
        <GridListTile cols={2} rows={2}>
          <img
            src={CreateNewTeam}
            loading="lazy"
            height="100%"
            alt={"Hemadri Dasari"}
          />
          <GridListTileBar
            title={
              <Typography variant="h2" color="secondary">
                Hemadri Dasari
              </Typography>
            }
            subtitle={
              <Typography variant="h5" color="secondary">
                Founder
              </Typography>
            }
          />
        </GridListTile>
        <GridListTile cols={1} rows={2}>
          <img src={hemadri} height="100%" alt={"Hemadri Dasari"} />
          <GridListTileBar
            title={
              <Typography variant="h2" color="secondary">
                Hemadri Dasari
              </Typography>
            }
            subtitle={
              <Typography variant="h5" color="secondary">
                Founder
              </Typography>
            }
          />
        </GridListTile>
        <GridListTile cols={2} rows={2}>
          <img
            src={CreateNewTeam}
            loading="lazy"
            height="100%"
            alt={"Hemadri Dasari"}
          />
          <GridListTileBar
            title={
              <Typography variant="h2" color="secondary">
                Hemadri Dasari
              </Typography>
            }
            subtitle={
              <Typography variant="h5" color="secondary">
                Founder
              </Typography>
            }
          />
        </GridListTile>
        <GridListTile cols={1} rows={2}>
          <img
            src={hemadri}
            height="100%"
            alt={"Hemadri Dasari"}
            loading="lazy"
          />
          <GridListTileBar
            title={
              <Typography variant="h2" color="secondary">
                Hemadri Dasari
              </Typography>
            }
            subtitle={
              <Typography variant="h5" color="secondary">
                Founder
              </Typography>
            }
          />
        </GridListTile>
        <GridListTile cols={1} rows={2}>
          <img src={CreateNewTeam} height="100%" alt={"Hemadri Dasari"} />
          <GridListTileBar
            title={
              <Typography variant="h2" color="secondary">
                Hemadri Dasari
              </Typography>
            }
            subtitle={
              <Typography variant="h5" color="secondary">
                Founder
              </Typography>
            }
          />
        </GridListTile>
      </GridList>
    </div>
  );
}
