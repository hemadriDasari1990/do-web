import Box from "@material-ui/core/Box";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import useStyles from "../../styles";

export default function ListItemSkeleton() {
  const {
    avatarBoxStyle,
    boxMainStyle,
    boxGridStyle,
    iconBoxStyle,
  } = useStyles();

  return (
    <Box className={boxMainStyle}>
      <Box>
        <Skeleton animation="wave" variant="rect" height={100} width="100%" />
      </Box>

      <Box className={boxGridStyle}>
        <Box className={iconBoxStyle}>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={0.5}
          >
            <Skeleton
              animation="wave"
              variant="circle"
              width={30}
              height={30}
              style={{ borderRadius: 6 }}
              className={avatarBoxStyle}
            />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box>
            <Skeleton animation="wave" height={16} width={190} />
          </Box>
          <Box mt={1} ml={1} display="flex">
            <Box mt={-0.5} mr={1}>
              <Skeleton animation="wave" height={10} width={30} />
            </Box>
            <Skeleton
              animation="wave"
              variant="circle"
              width={3}
              height={3}
              style={{ borderRadius: "50%" }}
            />
            <Skeleton
              animation="wave"
              variant="circle"
              width={3}
              height={3}
              style={{ borderRadius: "50%" }}
            />
            <Skeleton
              animation="wave"
              variant="circle"
              width={3}
              height={3}
              style={{ borderRadius: "50%" }}
            />
          </Box>
        </Box>
        <Box display="flex" my={3}>
          <Box mr={2}>
            <Skeleton
              animation="wave"
              variant="rect"
              width={20}
              height={20}
              style={{ borderRadius: 6 }}
            />
          </Box>
          <Box mt={0.2}>
            <Skeleton animation="wave" height={15} width={100} />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box>
            <Skeleton animation="wave" height={10} width={60} />
            <Skeleton animation="wave" height={10} width={30} />
          </Box>
          <Box>
            <Skeleton animation="wave" height={10} width={60} />
            <Skeleton animation="wave" height={10} width={30} />
          </Box>
          <Box>
            <Skeleton animation="wave" height={10} width={60} />
            <Skeleton animation="wave" height={10} width={30} />
          </Box>
        </Box>
        <Box display="flex" justifyContent="space-between" mb={3}>
          <Box>
            <Skeleton animation="wave" height={10} width={60} />
            <Skeleton animation="wave" height={10} width={30} />
          </Box>
          <Box>
            <Skeleton animation="wave" height={10} width={60} />
            <Skeleton animation="wave" height={10} width={30} />
          </Box>
          <Box>
            <Skeleton animation="wave" height={10} width={60} />
            <Skeleton animation="wave" height={10} width={30} />
          </Box>
        </Box>
        <Box display="flex">
          <Box mr={2}>
            <Skeleton animation="wave" height={10} width={60} />
          </Box>
          <Box>
            <Skeleton animation="wave" height={10} width={30} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
