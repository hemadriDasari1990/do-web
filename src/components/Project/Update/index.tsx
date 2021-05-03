import {
  ALPHABET_NUMBERIC_WITH_SPACE_AND_HYPHEN,
  ALPHA_NUMERIC_WITH_SPACE,
  allow,
} from "../../../util/regex";
import { MAX_CHAR_COUNT, TITLE_MAX_CHAR_COUNT } from "../../../util/constants";
import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from "@material-ui/core/styles";

import Box from "@material-ui/core/Box";
import CreateNewProject from "../../../assets/create.svg";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { getRemainingCharLength } from "../../../util";
import { updateProject } from "../../../redux/actions/project";
import { useDispatch } from "react-redux";

const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles((theme: Theme) => ({
  textFieldStyle: {
    marginTop: theme.spacing(3),
  },
}));

const Create = (props: any) => {
  const { openDialog, handleUpdateForm, selectedProject } = props;
  const { textFieldStyle } = useStyles();
  const dispatch = useDispatch();

  /* Local state */
  const [formData, setFormData] = useState<{ [Key: string]: any }>({
    name: "",
    description: "",
    projectId: selectedProject._id,
  });
  const [count, setCount] = useState(0);
  const { name, description } = formData;

  useEffect(() => {}, []);

  useEffect(() => {
    if (selectedProject?._id) {
      setFormData({
        ...formData,
        name: selectedProject.name,
        description: selectedProject.description,
        projectId: selectedProject._id,
      });
    }
    if (!selectedProject?._id) {
      setFormData({});
    }
  }, [selectedProject]);

  /* Handler functions */
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    if (event.target.name === "description") {
      const charCount = event.target.value.length;
      const charLeft = getRemainingCharLength(MAX_CHAR_COUNT, charCount);
      setCount(charLeft);
    }
  };

  const handleClose = () => {
    handleUpdateForm();
  };

  const handleSubmit = () => {
    dispatch(updateProject({ ...formData }));
  };

  const disableButton = () => {
    if (!name?.trim()?.length) {
      return true;
    }
    if (!description?.trim()?.length) {
      return true;
    }
    return false;
  };

  const handlePrevent = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const renderDialog = () => {
    return (
      <ResponsiveDialog
        open={openDialog}
        title="Create or Update Project"
        pcta="Save"
        handleSave={handleSubmit}
        handleClose={handleClose}
        disablePrimaryCTA={disableButton()}
        maxWidth={440}
      >
        <Box mt={5} textAlign="center">
          <Zoom in={true} timeout={2000}>
            <img src={CreateNewProject} height="130px" width="fit-content" />
          </Zoom>
        </Box>
        <TextField
          name="name"
          id="name"
          label="Project Name"
          placeholder="Enter your project name"
          value={name}
          onChange={handleInput}
          required
          fullWidth
          className={textFieldStyle}
          onKeyPress={(event: React.KeyboardEvent<any>) =>
            allow(
              event,
              ALPHABET_NUMBERIC_WITH_SPACE_AND_HYPHEN,
              TITLE_MAX_CHAR_COUNT
            )
          }
          onCut={handlePrevent}
          onCopy={handlePrevent}
          onPaste={handlePrevent}
        />
        <TextField
          multiline
          name="description"
          id="description"
          label="Description"
          placeholder="Enter description about project"
          value={description}
          onChange={handleInput}
          fullWidth
          className={textFieldStyle}
          onKeyPress={(event: React.KeyboardEvent<any>) =>
            allow(event, ALPHA_NUMERIC_WITH_SPACE, MAX_CHAR_COUNT)
          }
          onCut={handlePrevent}
          onCopy={handlePrevent}
          onPaste={handlePrevent}
        />
        <Box mt={1}>
          <Typography variant="subtitle2">{count} chars</Typography>
        </Box>
      </ResponsiveDialog>
    );
  };

  return <React.Fragment>{renderDialog()}</React.Fragment>;
};

export default Create;
