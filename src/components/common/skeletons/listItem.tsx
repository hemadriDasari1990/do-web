import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import useStyles from "../../styles";

export default function ListItemSkeleton() {
  const {
    avatarBoxStyle,
    boxMainStyle,
    plusTwoIconStyle,
    minusOneIconStyle,
    loveIconStyle,
    deserveIconStyle,
  } = useStyles();

  return (
    <Card className={`${boxMainStyle}`}>
      <CardHeader
        avatar={
          <Skeleton
            animation="wave"
            variant="circle"
            width={30}
            height={30}
            style={{ borderRadius: 6 }}
            className={avatarBoxStyle}
          />
        }
        action={
          <>
            <Skeleton
              animation="wave"
              variant="circle"
              width={5}
              height={5}
              // style={{ borderRadius: "50%" }}
            />
            <Skeleton animation="wave" variant="circle" width={5} height={5} />
            <Skeleton animation="wave" variant="circle" width={5} height={5} />
          </>
        }
        title={
          <Box>
            <Skeleton animation="wave" height={16} width={190} />
          </Box>
        }
        subheader={
          <Box>
            <Skeleton animation="wave" height={16} width={100} />
          </Box>
        }
      />
      <CardContent>
        <Box display="flex" my={3}>
          <Box mr={2}>
            <Skeleton animation="wave" height={10} width={40} />
            <Skeleton animation="wave" height={10} width={30} />
            <Skeleton animation="wave" height={10} width={20} />
          </Box>
          <Box mt={0.2}>
            <Skeleton animation="wave" height={15} width={300} />
          </Box>
        </Box>
      </CardContent>
      <Box mx={1}>
        <Skeleton animation="wave" height={6} width={"100%"} />
      </Box>
      <CardActions style={{ justifyContent: "space-between" }}>
        <Box>
          <Skeleton animation="wave" height={10} width={50} />
        </Box>
        <Box mr={2} my={0.4} display="flex">
          <Box mr={1}>
            <Skeleton
              animation="wave"
              variant="circle"
              width={20}
              height={20}
              style={{ borderRadius: "50%" }}
              className={minusOneIconStyle}
            />
          </Box>
          <Box mr={1}>
            <Skeleton
              animation="wave"
              variant="circle"
              width={20}
              height={20}
              style={{ borderRadius: "50%" }}
              className={loveIconStyle}
            />
          </Box>
          <Box mr={1}>
            <Skeleton
              animation="wave"
              variant="circle"
              width={20}
              height={20}
              style={{ borderRadius: "50%" }}
              className={plusTwoIconStyle}
            />
          </Box>
          <Box mr={1}>
            <Skeleton
              animation="wave"
              variant="circle"
              width={20}
              height={20}
              style={{ borderRadius: "50%" }}
              className={deserveIconStyle}
            />
          </Box>
        </Box>
        <Box display="flex" my={0.4}>
          <Box>
            <Skeleton
              animation="wave"
              variant="circle"
              width={25}
              height={25}
            />
          </Box>
          <Box mt={1} ml={1}>
            <Skeleton animation="wave" height={10} width={30} />
          </Box>
        </Box>
        <Box my={0.4}>
          <Skeleton animation="wave" height={10} width={30} />
        </Box>
      </CardActions>
    </Card>
  );
}
