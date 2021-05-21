import Box from "@material-ui/core/Box";
import NoteSkeleton from "./note";
import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import { makeStyles } from "@material-ui/core/styles";

const useLocalStyles = makeStyles(() => ({
  createNoteStyle: {
    borderRadius: 6,
    background: "#fff",
  },
}));
export default function NoteListSkeleton() {
  const { createNoteStyle } = useLocalStyles();

  return (
    <>
      <Box p={1}>
        <NoteSkeleton />
        <NoteSkeleton />
      </Box>
      <Box ml={1} mb={1}>
        <Skeleton
          animation="wave"
          height={15}
          width={150}
          className={createNoteStyle}
        />
      </Box>
    </>
  );
}
