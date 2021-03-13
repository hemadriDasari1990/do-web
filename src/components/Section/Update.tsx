import React, { useState } from "react";

import Box from "@material-ui/core/Box";
import Hidden from "@material-ui/core/Hidden";
import TextField from "@material-ui/core/TextField";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import updateSection from "../../assets/update.svg";

const useStyles = makeStyles(() => ({
  textfieldStyle: {
    "& .MuiFilledInput-root": {
      background: "#fff",
      borderRadius: 10,
      border: "2px solid #0072ff",
      paddingTop: "0px !important",
    },
  },
}));

export default function SectionUpdate(props: any) {
  const { value, setSectionInput } = props;
  const { textfieldStyle } = useStyles();

  /* Local states */
  const [section, setSection] = useState(value);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSection(event.target.value);
    setSectionInput(event.target.value);
  };

  return (
    <React.Fragment>
      <Hidden only={["xs"]}>
        <Box my={1} textAlign="center">
          <Zoom in={true} timeout={2000}>
            <img src={updateSection} height="200px" width="fit-content" />
          </Zoom>
        </Box>
      </Hidden>
      <Box mb={1}>
        <TextField
          variant="filled"
          fullWidth
          multiline
          value={section}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            handleInput(event)
          }
          className={textfieldStyle}
          InputProps={{
            disableUnderline: true,
            style: {
              minHeight: 90,
              paddingTop: 40,
            },
          }}
        />
      </Box>
    </React.Fragment>
  );
}
