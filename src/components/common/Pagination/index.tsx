import Box from "@material-ui/core/Box";
import Pagination from "@material-ui/lab/Pagination";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: (props: any) => ({
    // "& > *": {
    //   marginTop: theme.spacing(2),
    // },
    position: props.type === "modal" ? "unset" : "fixed",
    bottom: props.type === "modal" ? "unset" : 0,
    right: 0,
    zIndex: 2,
  }),
  paginationStyle: {
    "& .Mui-selected": {
      fontWeight: 600,
      color: "#fff",
      background: "linear-gradient(180deg,#f67c1b 0,#e15500) ",
    },
  },
}));

export default function DoPagination(props: any) {
  const { handlePage, totalCount, pageCount, type } = props;
  const classes = useStyles({ type });
  const [page, setPage] = React.useState(0);
  const totalPages = Math.ceil(totalCount / pageCount);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    handlePage(value - 1);
  };

  return (
    <Box className={classes.root}>
      <Pagination
        className={classes.paginationStyle}
        count={totalPages}
        page={page}
        showFirstButton
        showLastButton
        onChange={handleChange}
        siblingCount={1}
        boundaryCount={2}
        shape="rounded"
        defaultPage={1}
      />
    </Box>
  );
}
