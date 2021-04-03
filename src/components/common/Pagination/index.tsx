import { createStyles, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // "& > *": {
      //   marginTop: theme.spacing(2),
      // },
      // position: "fixed",
      bottom: 0,
      zIndex: 2,
    },
    padginationStyle: {
      "& .Mui-selected": {
        fontWeight: 600,
        color: "#fff",
        background: "linear-gradient(12deg,#c724b1,#c724b1 40%,#753bbd) ",
      },
    },
  })
);

export default function DoPagination(props: any) {
  const { handlePage, totalCount, pageCount } = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const totalPages = Math.ceil(totalCount / pageCount);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    handlePage(value - 1);
  };

  return (
    <Box
      className={classes.root}
      // justifyContent="center"
      // display="flex"
      // alignItems="center"
      // width="100%"
    >
      <Pagination
        className={classes.padginationStyle}
        count={totalPages}
        page={page}
        showFirstButton
        showLastButton
        onChange={handleChange}
        siblingCount={1}
        boundaryCount={1}
        shape="rounded"
      />
    </Box>
  );
}
