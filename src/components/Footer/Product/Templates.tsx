import React, { useEffect } from "react";

import Box from "@material-ui/core/Box";
import ColoredLine from "../../common/ColoredLine";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { getDefaultSections } from "../../../redux/actions/common";
import { makeStyles } from "@material-ui/core";
import { useDefaultSections } from "../../../redux/state/common";
import { useDispatch } from "react-redux";

const useLocalStyles = makeStyles(() => ({
  paperStyle: {
    padding: 8,
    minHeight: 70,
    borderRadius: 6,
    boxShadow:
      "0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)",
  },
}));

function Templates() {
  const { defaultSections } = useDefaultSections();
  const { paperStyle } = useLocalStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!defaultSections?.length) {
      dispatch(getDefaultSections());
    }
  }, []);

  return (
    <React.Fragment>
      <Container>
        <Box py={5}>
          <Zoom in={true} timeout={2000}>
            <Typography variant="h1">Templates</Typography>
          </Zoom>
          <Box my={3}>
            <Typography variant="body1" color="textPrimary">
              Lets do retro templates are designed to help our customers create
              retrospective boards quickly.
            </Typography>
          </Box>
          <Grid container spacing={2}>
            {defaultSections?.length
              ? defaultSections.map(
                  (section: { [Key: string]: any }, index: number) => (
                    <Grid
                      item
                      xl={4}
                      lg={4}
                      md={4}
                      sm={6}
                      xs={12}
                      key={section?._id}
                    >
                      <Paper className={`${paperStyle}`}>
                        <Box display="flex" flexDirection="column">
                          <ColoredLine index={index} />
                          <Box minHeight={65}>
                            <Typography variant="h4">
                              {section?.name}
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  )
                )
              : null}
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Templates;
