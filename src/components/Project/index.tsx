import { Suspense, useEffect, useState } from "react";
import { deleteProject, getProjects } from "../../redux/actions/project";
import { useProject, useProjectLoading } from "../../redux/state/project";

import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Caption from "../common/Caption";
import { DASHBOARD } from "../../routes/config";
import DoPagination from "../common/Pagination";
import DoSearch from "../common/search";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import ListSkeleton from "../common/skeletons/list";
import { PER_PAGE } from "../../util/constants";
import React from "react";
import TitleWithCountSkeleton from "../common/skeletons/titleWithCount";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import formateNumber from "../../util/formateNumber";
import useDebounce from "../common/useDebounce";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../redux/state/login";
import useStyles from "../styles";
import { useUser } from "../../redux/state/user";

const ProjectList = React.lazy(() => import("./List"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const CreateProject = React.lazy(() => import("./Update"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const DoSnackbar = React.lazy(() => import("../Snackbar/components"));

const ProjectDashboard = () => {
  const { root, buttonStyle, alignCenterStyle } = useStyles();
  const dispatch = useDispatch();
  const { project, projects: projectsList } = useProject();
  const history = useHistory();
  const { loading } = useProjectLoading();
  const { totalProjects: totalProjectsCount, user } = useUser();
  const { userId } = useLogin();

  /* React local states */
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);
  const [totalProjects, setTotalProjects] = useState(totalProjectsCount);
  const [projects, setProjects] = useState<Array<{ [Key: string]: any }>>(
    projectsList
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedProject, setSelectedProject] = useState<{
    [Key: string]: any;
  }>({});
  const [openError, setOpenError] = useState(false);
  const [queryString, setQueryString] = useState("");
  const [page, setPage] = useState<number>(0);
  const debouncedValue = useDebounce(queryString, 500);

  /* React Hooks */

  const loadProjects = (pageNo: number, searchValue: string) => {
    setApiCalled(false);
    dispatch(getProjects(userId, searchValue, pageNo, PER_PAGE));
    setApiCalled(true);
  };

  useEffect(() => {
    loadProjects(page, debouncedValue);
  }, [debouncedValue]);

  useEffect(() => {
    if (!loading && projectsList) {
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
        projectData.name = project.name;
        projectData.description = project.description;
        projectsList[projectIndex] = projectData;
        setProjects(projectsList);
      } else {
        setProjects((currentProjects: Array<{ [Key: string]: any }>) =>
          currentProjects?.length ? [project, ...currentProjects] : [project]
        );
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
    history.push(DASHBOARD);
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
            Are you sure you want to delete {selectedProject?.name}?
          </Typography>
        </ResponsiveDialog>
      </Box>
    );
  };

  const handleInput = (value: string) => {
    setQueryString(value);
  };

  const handleDelete = () => {
    dispatch(deleteProject(selectedProject._id));
    setOpenDeleteDialog(false);
  };

  const renderCreateNewProject = () => {
    return (
      <>
        <Hidden only={["xs", "md", "sm"]}>
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

        <Hidden only={["xl", "lg"]}>
          <Tooltip title="Create New Project" placement="bottom" arrow>
            <Fab color="primary" onClick={() => handleCreateNewProject()}>
              <AddOutlinedIcon color="primary" />
            </Fab>
          </Tooltip>
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

  const handlePage = (page: number) => {
    setPage(page);
    loadProjects(page, "");
  };

  return (
    <Suspense fallback={<ListSkeleton />}>
      {renderDeleteDialog()}
      {renderSnackbar()}
      <Box className={root}>
        <Box py={2}>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              {loading ? (
                <TitleWithCountSkeleton />
              ) : (
                <Box display="flex">
                  <Hidden only={["xs"]}>
                    <Typography variant="h2">
                      {user?.name}&nbsp;({formateNumber(totalProjects) || 0})
                    </Typography>
                  </Hidden>
                  <Hidden only={["xl", "lg", "md", "sm"]}>
                    <Typography variant="h4">
                      {user?.name}&nbsp;({formateNumber(totalProjects) || 0})
                    </Typography>
                  </Hidden>
                  <Box ml={1} mt={1.9}>
                    <Caption title="Projects" />
                  </Box>
                </Box>
              )}
            </Grid>
            <Grid item xl={4} lg={4} md={4} xs={12} sm={12}>
              <Box mt={1}>
                <DoSearch
                  placeHolder="Search projects by name"
                  handleSearch={handleInput}
                />
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12}>
              <Box display="flex" justifyContent={"flex-end"} mt={1.2}>
                <Hidden only={["xl", "lg"]}>
                  <Tooltip
                    title="Go Back to Dashboard"
                    placement="bottom"
                    arrow
                  >
                    <Fab color="primary" onClick={() => handleBack()}>
                      <KeyboardBackspaceOutlinedIcon color="primary" />
                    </Fab>
                  </Tooltip>
                </Hidden>
                <Hidden only={["xs", "sm", "md"]}>
                  <Box className={buttonStyle} mr={2}>
                    <Button
                      variant="outlined"
                      color="default"
                      startIcon={
                        <KeyboardBackspaceOutlinedIcon color="primary" />
                      }
                      onClick={() => handleBack()}
                    >
                      <Typography color="primary" variant="subtitle1">
                        Go Back to Dashboard
                      </Typography>
                    </Button>
                  </Box>
                </Hidden>
                {projects?.length ? (
                  <Box className={buttonStyle} ml={1}>
                    {renderCreateNewProject()}
                  </Box>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Box>
        {!loading && (!projects || !projects?.length) ? (
          <Box className={alignCenterStyle}>
            <NoRecords message="No Projects found to display! Please add" />
            <Box mt={3} textAlign="center">
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
        <Box>
          <DoPagination
            handlePage={handlePage}
            totalCount={totalProjects}
            pageCount={PER_PAGE}
          />
        </Box>
      </Box>
    </Suspense>
  );
};

export default ProjectDashboard;
