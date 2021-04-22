import Box from "@material-ui/core/Box";
import NoteSkeleton from "./note";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useLocalStyles = makeStyles(() => ({
  createNoteStyle: {
    height: 40,
    borderRadius: 6,
    background:
      "linear-gradient(90deg, #e7eaec, rgb(230 235 239), transparent)",
  },
}));
export default function NoteListSkeleton() {
  const { createNoteStyle } = useLocalStyles();

  return (
    <>
      <Box p={1}>
        <Skeleton animation="wave" variant="rect" className={createNoteStyle} />
      </Box>
      <NoteSkeleton />
      <NoteSkeleton />
    </>
  );
}
