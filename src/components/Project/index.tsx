import React, { useEffect, useState, Suspense } from "react";
import { useHistory, useParams } from "react-router";

import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { USER_DASHBOARD } from "../../routes/config";
import { deleteProject } from "../../redux/actions/project";
import { getDepartmentDetails } from "../../redux/actions/department";
import { replaceStr } from "../../util";
import { useDepartment } from "../../redux/state/department";
import { useDepartmentLoading } from "../../redux/state/department";
import { useDispatch } from "react-redux";
import { useProject } from "../../redux/state/project";
import useStyles from "../styles";
import ListSkeleton from "../common/skeletons/list";
import formateNumber from "../../util/formateNumber";
import Caption from "../common/Caption";

const ProjectList = React.lazy(() => import("./List"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const CreateProject = React.lazy(() => import("./Update"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const DoSnackbar = React.lazy(() => import("../Snackbar/components"));

const ProjectDashboard = () => {
  const {
    root,
    countStyle,
    countTextStyle,
    buttonStyle,
    iconBackStyle,
  } = useStyles();
  const dispatch = useDispatch();
  const { project } = useProject();
  const { departmentId } = useParams<{ departmentId: string }>();
  const history = useHistory();
  const {
    department,
    projects: projectsList,
    totalProjects: totalProjectsCount,
  } = useDepartment();
  const { loading } = useDepartmentLoading();

  /* React local states */
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);
  const [totalProjects, setTotalProjects] = useState(totalProjectsCount);
  const [projects, setProjects] = useState<Array<{ [Key: string]: any }>>([]);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{
    [Key: string]: any;
  }>({});
  const [openError, setOpenError] = useState(false);

  /* React Hooks */
  useEffect(() => {
    setApiCalled(false);
    dispatch(getDepartmentDetails(departmentId));
    setApiCalled(true);
  }, []);

  useEffect(() => {
    if (!loading && apiCalled && projectsList) {
      setShowProjectForm(false);
      setProjects(projectsList);
      setTotalProjects(totalProjectsCount);
      setApiCalled(false);
    }
    if (!loading && !projectsList?.length) {
      setProjects(projectsList);
    }
  }, [apiCalled, projectsList, loading]);

  useEffect(() => {
    if (!openError && !loading && project?.errorId) {
      setOpenError(true);
    }
    if (!loading && project?.deleted) {
      const projectsList = projects.filter(
        (d: { [Key: string]: any }) => d._id !== selectedProject._id
      );
      setTotalProjects(projectsList?.length);
      setProjects(projectsList);
      setSelectedProject({});
      handleCloseDeleteDialog();
    }

    if (!loading && project?._id) {
      const projectsList = [...projects];
      const projectIndex = projectsList.findIndex(
        (p: { [Key: string]: any }) => p._id === project._id
      );
      const projectData = projects[projectIndex];
      if (projectData) {
        projectData.title = project.title;
        projectData.description = project.description;
        projectsList[projectIndex] = projectData;
        setProjects(projectsList);
      } else {
        setProjects((currentProjects: Array<{ [Key: string]: any }>) => [
          ...currentProjects,
          project,
        ]);
        setTotalProjects(totalProjects + 1);
      }
      setSelectedProject({});
      setShowProjectForm(false);
    }
  }, [loading, project]);

  /* Handler functions */

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleCreateNewProject = () => {
    setSelectedProject({});
    setShowProjectForm(true);
  };

  const handleBack = () => {
    history.push(replaceStr(USER_DASHBOARD, ":userId", department?.userId));
  };

  const handleMenu = async (
    event: React.MouseEvent<HTMLDivElement | MouseEvent>,
    val: string
  ) => {
    switch (val) {
      case "edit":
        setShowProjectForm(true);
        break;
      case "delete":
        setOpenDeleteDialog(true);
        break;
      default:
        break;
    }
  };

  const renderDeleteDialog = () => {
    return (
      <Box>
        <ResponsiveDialog
          open={openDeleteDialog}
          title="Delete Note"
          pcta="Delete"
          scta="Cancel"
          handleSave={handleDelete}
          handleClose={handleClose}
          maxWidth={440}
        >
          <Typography variant="h4">
            {" "}
            Are you sure you want to delete {selectedProject?.title}?
          </Typography>
        </ResponsiveDialog>
      </Box>
    );
  };

  const handleDelete = () => {
    dispatch(deleteProject(selectedProject._id));
    setOpenDeleteDialog(false);
  };

  const renderCreateNewProject = () => {
    return (
      <>
        <Hidden only={["xs"]}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddOutlinedIcon color="secondary" />}
            onClick={() => handleCreateNewProject()}
          >
            <Typography color="secondary" variant="subtitle1">
              Create New Project
            </Typography>
          </Button>
        </Hidden>

        <Hidden only={["xl", "lg", "md", "sm"]}>
          <IconButton
            className={iconBackStyle}
            onClick={() => handleCreateNewProject()}
          >
            <AddOutlinedIcon color="primary" />
          </IconButton>
        </Hidden>
      </>
    );
  };

  const handleUpdateForm = () => {
    setShowProjectForm(false);
    handleClose();
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleSnackbarClose = () => {
    setOpenError(false);
  };

  const renderSnackbar = () => {
    return (
      <DoSnackbar
        open={openError}
        status="error"
        handleClose={handleSnackbarClose}
      >
        <Typography variant="h6" color="secondary">
          {project?.message}
        </Typography>
      </DoSnackbar>
    );
  };

  return (
    <Suspense fallback={<ListSkeleton />}>
      {renderDeleteDialog()}
      {renderSnackbar()}
      <Box className={root}>
        <Box py={2}>
          <Grid container spacing={2}>
            <Grid
              item
              xl={projects?.length ? 8 : 8}
              lg={projects?.length ? 8 : 8}
              md={projects?.length ? 6 : 6}
              sm={12}
              xs={12}
            >
              <Box display="flex">
                <Hidden only={["xs"]}>
                  <Typography variant="h1">{department?.title}</Typography>
                </Hidden>
                <Hidden only={["xl", "lg", "md", "sm"]}>
                  <Typography variant="h4">{department?.title}</Typography>
                </Hidden>
                <Tooltip arrow title="Total Projects">
                  <Box ml={2} className={countStyle}>
                    <Typography color="primary" className={countTextStyle}>
                      {formateNumber(totalProjects) || 0}
                    </Typography>
                  </Box>
                </Tooltip>
                <Box ml={1} mt={2.2}>
                  <Caption title="Projects" />
                </Box>
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
              <Box
                display="flex"
                justifyContent={!projects?.length ? "flex-end" : "space-around"}
              >
                <Hidden only={["xl", "lg", "md"]}>
                  <IconButton
                    className={iconBackStyle}
                    onClick={() => handleBack()}
                  >
                    <KeyboardBackspaceOutlinedIcon color="primary" />
                  </IconButton>
                </Hidden>
                <Hidden only={["xs", "sm"]}>
                  <Box className={buttonStyle}>
                    <Button
                      variant="outlined"
                      color="default"
                      startIcon={
                        <KeyboardBackspaceOutlinedIcon color="primary" />
                      }
                      onClick={() => handleBack()}
                    >
                      <Typography color="primary" variant="subtitle1">
                        Go Back to Departments
                      </Typography>
                    </Button>
                  </Box>
                </Hidden>
                {projects?.length ? (
                  <Box className={buttonStyle}>{renderCreateNewProject()}</Box>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Box>
        {!loading && (!projects || !projects?.length) ? (
          <Box mt={10}>
            <NoRecords message="No Projects found! Please add" />
            <Box mt={5} textAlign="center">
              {renderCreateNewProject()}
            </Box>
          </Box>
        ) : null}
        <CreateProject
          selectedProject={selectedProject}
          openDialog={showProjectForm}
          handleUpdateForm={handleUpdateForm}
        />
        <Box>
          <ProjectList
            projects={projects}
            handleMenu={handleMenu}
            setSelectedProject={setSelectedProject}
          />
        </Box>
      </Box>
    </Suspense>
  );
};

export default ProjectDashboard;
