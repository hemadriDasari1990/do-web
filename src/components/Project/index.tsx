import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useDepartment, useDepartmentLoading } from "../../redux/state/department"
import { useHistory, useParams } from "react-router";
import { useProject, useProjectLoading } from "../../redux/state/project"

import AddIcon from '@material-ui/icons/Add';
import BackIcon from '@material-ui/icons/Reply';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import { ORGANIZATION_DASHBOARD } from '../../routes/config';
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import { deleteProject } from "../../redux/actions/project";
import { getDepartmentDetails } from '../../redux/actions/department';
import { replaceStr } from "../../util";
import { useDispatch } from "react-redux";

const ProjectList = React.lazy(() => import("./List"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const CreateProject = React.lazy(() => import("./Update"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const Loader = React.lazy(() => import("../Loader/components"));

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: "90vh"
    },
    buttonStyle: {
        textAlign: "end",
        [theme.breakpoints.down('xs')]: {
          textAlign: "center",
          width: "100%"
        }
    },
    countStyle: {
        borderRadius: 5,
        border: "1px solid #0072ff",
        minWidth: 30,
        height: 30
    },
    countTextStyle: {
        top: "50%",
        textAlign: "center",
        fontWeight: 600
    },
}));

const ProjectDashboard = () => {
    const { root, countStyle, countTextStyle, buttonStyle } = useStyles();
    const dispatch = useDispatch();
    const { project } = useProject();
    const { departmentId } = useParams<{ departmentId: string }>();
    const history = useHistory();
    const { department, projects: projectsList, totalProjects: totalProjectsCount } = useDepartment();
    const { loading } = useProjectLoading();
    const { loading: departmentloading } = useDepartmentLoading();
    
    /* React local states */
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [totalProjects, setTotalProjects] = useState(totalProjectsCount);
    const [projects, setProjects] = useState<Array<{[Key: string]: any}>>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedProject, setSelectedProject] = useState<{[Key: string]: any}>({});

    /* React Hooks */
    useEffect(() => {
       dispatch(getDepartmentDetails(departmentId))
    }, []);

    useEffect(() => {
        if(projectsList){
          setShowProjectForm(false);
          setProjects(projectsList);
          setTotalProjects(totalProjectsCount);
        }
    }, [projectsList])

    useEffect(() => {
        if(!loading && !project?._id){
          // setShowError(true);
        }

        if(!loading && project?.deleted){
            const projectsList = projects.filter((d: {[Key: string]: any}) => d._id !== selectedProject._id);
            setProjects(projectsList);
            setSelectedProject({});
            handleCloseDeleteDialog();
        }
        
        if(!loading && project?._id){
          const projectsList = [...projects];
          const projectIndex = projectsList.findIndex((p: {[Key: string]: any}) => p._id === project._id);
          const projectData = projects[projectIndex];
          if(projectData){
            projectData.title = project.title;
            projectData.description = project.description;
            projectsList[projectIndex] = projectData;
            setProjects(projectsList);
          } else {
            setProjects((currentProjects: Array<{[Key:string]: any}>) => [...currentProjects, project]);
            setTotalProjects(totalProjects + 1);
          }
          setSelectedProject({});
          setShowProjectForm(false);
      }
    }, [loading, project]);
    
    /* Handler functions */

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    }

    const handleCreateNewProject = () => {
        setShowProjectForm(true);
    }

    const handleBack = () => {
        history.push(replaceStr(ORGANIZATION_DASHBOARD, ":organizationId", department?.organizationId));
    }

    const handleMenu = async (event: React.MouseEvent<HTMLDivElement | MouseEvent>, val: string) => {
        switch (val) {
          case 'edit':
            setShowProjectForm(true);
            break;
          case 'delete':
            setOpenDeleteDialog(true);
            break;
          default:
            break
        }
      }
    
      const renderDeleteDialog = () => {
        return (
          <Box>
            <ResponsiveDialog open={openDeleteDialog} title="Delete Note" pcta="Delete" scta="Cancel" handleSave={handleDelete} handleClose={handleClose}>
              <Typography variant="h4"> Are you sure you want to delete {selectedProject?.title}?</Typography>
            </ResponsiveDialog>
          </Box>
        )
    }

    const handleDelete = () => {
        dispatch(deleteProject(selectedProject._id));
        setOpenDeleteDialog(false);
    }

    const renderCreateNewProject = () => {
        return (
            <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon color="secondary" />}
                onClick={() => handleCreateNewProject()}
            >
                <Typography color="secondary" variant="body1" >Create New Project</Typography>
            </Button>
        )
      }

      const handleUpdateForm = () => {
        setShowProjectForm(false);
        handleClose();
      }

      const handleClose = () => {
        setOpenDeleteDialog(false);
      }

    return (
        <React.Fragment>
            {renderDeleteDialog()}
            <Loader backdrop={true} enable={departmentloading} />
            <Box className={root}>
                <Container>
                    <Box py={2}>
                        <Grid container spacing={2}>
                            <Grid item xl={6} lg={6} md={4} sm={8} xs={12}>
                                <Box display="flex">
                                <Hidden only={["xs"]}>
                                    <Typography variant="h1">{department?.title}</Typography> 
                                </Hidden>
                                <Hidden only={["xl", "lg", "md", "sm"]}>
                                    <Typography variant="h2">{department?.title}</Typography> 
                                </Hidden>
                                <Tooltip title="Total Projects">
                                <Box ml={2} mt={1} className={countStyle}>
                                    <Typography color="primary" className={countTextStyle}>{totalProjects}</Typography>
                                </Box>
                                </Tooltip>
                                </Box>
                            </Grid>
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                                <Box className={buttonStyle}>
                                    <Button
                                        variant="outlined"
                                        color="default"
                                        startIcon={<BackIcon color="primary" />}
                                        onClick={() => handleBack()}
                                    >
                                        <Typography color="primary" variant="body1" >Go Back to Departments</Typography>
                                    </Button>
                                </Box>
                            </Grid>
                            <Grid item xl={3} lg={3} md={4} sm={6} xs={12}>
                                <Box className={buttonStyle}>
                                    {renderCreateNewProject()}
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                    {!loading && (!projects || !projects?.length) && (
                    <Box mt={10}>
                        <NoRecords message="No Projects found! Please add"/>
                        <Box mt={5} textAlign="center">
                            {renderCreateNewProject()}
                        </Box>
                    </Box>
                    )}
                    <CreateProject selectedProject={selectedProject} openDialog={showProjectForm} handleUpdateForm={handleUpdateForm} />
                    <Box>
                        <ProjectList projects={projects} handleMenu={handleMenu} setSelectedProject={setSelectedProject} />
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default ProjectDashboard;
