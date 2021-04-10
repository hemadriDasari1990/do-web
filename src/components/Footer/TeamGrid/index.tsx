import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import CreateNewTeam from "../../../assets/team.svg";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import React from "react";

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

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function TeamGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} cols={3} className={classes.gridList}>
        <GridListTile cols={1} rows={2}>
          <img
            src={
              "https://media-exp1.licdn.com/dms/image/C4D03AQHe9wGR_VbQ9g/profile-displayphoto-shrink_800_800/0/1608972491530?e=1617235200&v=beta&t=nOg-8ROEMwwu2zBhrsjv2j8PbbA2FWELmLxnwBpEXgw"
            }
            loading="lazy"
            height="100%"
            alt={"Hemadri Dasari"}
          />
          <GridListTileBar
            title={"Hemadri Dasari"}
            subtitle={<span>FOUNDER & CEO</span>}
          />
        </GridListTile>
        <GridListTile cols={1} rows={2}>
          <img
            src={CreateNewTeam}
            loading="lazy"
            height="100%"
            alt={"Hemadri Dasari"}
          />
          <GridListTileBar
            title={"Hemadri Dasari"}
            subtitle={<span>FOUNDER & CEO</span>}
          />
        </GridListTile>
        <GridListTile cols={1} rows={2}>
          <img
            src={
              "https://media-exp1.licdn.com/dms/image/C4D03AQHe9wGR_VbQ9g/profile-displayphoto-shrink_800_800/0/1608972491530?e=1617235200&v=beta&t=nOg-8ROEMwwu2zBhrsjv2j8PbbA2FWELmLxnwBpEXgw"
            }
            height="100%"
            alt={"Hemadri Dasari"}
          />
          <GridListTileBar
            title={"Hemadri Dasari"}
            subtitle={<span>FOUNDER & CEO</span>}
          />
        </GridListTile>
        <GridListTile cols={1} rows={2}>
          <img
            src={CreateNewTeam}
            loading="lazy"
            height="100%"
            alt={"Hemadri Dasari"}
          />
          <GridListTileBar
            title={"Hemadri Dasari"}
            subtitle={<span>FOUNDER & CEO</span>}
          />
        </GridListTile>
        <GridListTile cols={1} rows={2}>
          <img
            src={
              "https://media-exp1.licdn.com/dms/image/C4D03AQHe9wGR_VbQ9g/profile-displayphoto-shrink_800_800/0/1608972491530?e=1617235200&v=beta&t=nOg-8ROEMwwu2zBhrsjv2j8PbbA2FWELmLxnwBpEXgw"
            }
            height="100%"
            alt={"Hemadri Dasari"}
            loading="lazy"
          />
          <GridListTileBar
            title={"Hemadri Dasari"}
            subtitle={<span>FOUNDER & CEO</span>}
          />
        </GridListTile>
        <GridListTile cols={1} rows={2}>
          <img src={CreateNewTeam} height="100%" alt={"Hemadri Dasari"} />
          <GridListTileBar
            title={"Hemadri Dasari"}
            subtitle={<span>FOUNDER & CEO</span>}
          />
        </GridListTile>
      </GridList>
    </div>
  );
}
