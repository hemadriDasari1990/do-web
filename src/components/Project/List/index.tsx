import { ORGANIZATION_DASHBOARD, PROJECT_DASHBOARD } from '../../../routes/config';
import React, { useEffect, useState } from "react";
import { useDepartment, useDepartmentLoading } from "../../../redux/state/department"
import { useProject, useProjectLoading } from "../../../redux/state/project"

import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from '@material-ui/icons/Assignment';
import BackIcon from '@material-ui/icons/Reply';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
// import Divider from '@material-ui/core/Divider'
// import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { Tooltip } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom'
import formateNumber from '../../../util/formateNumber'
import getCardSubHeaderText from '../../../util/getCardSubHeaderText'
import getRandomColor from "../../../util/getRandomColor";
// import { getSectionsByBoard } from "../../redux/actions/section";
import { makeStyles } from '@material-ui/core/styles';
import { replaceStr } from "../../../util";
// import { updateProject } from "../../../redux/actions/project"
// import { replaceStr } from "../../../util";
// import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

// import { useLogin } from "../../../redux/state/login"

// import { deleteSection, updateSection } from "../../redux/actions/section";
// import { useLoading, useSection } from "../../redux/state/section"

// import socket from "../../socket";
// import { useDispatch } from "react-redux";
// import { useParams } from "react-router";

// const Note = React.lazy(() => import("../Note"));
const NoRecords = React.lazy(() => import("../../NoRecords"));
const CreateProject = React.lazy(() => import("../Create"));
const Loader = React.lazy(() => import("../../Loader/components"));
const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles(() => ({
  cursor: {
    cursor: "pointer"
  },
  cardStyle: {
    backgroundColor:"#fff",
  },
  avatarBoxStyle: {
    borderRadius: 5,
    fontSize: 30,
    padding: 2
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
  boxTextStyle: {
    padding: "3px 10px 3px 10px"
  },
  boxStyle: {
    backgroundColor: "aliceblue",
    borderRadius: 6
  }
}));

const ProjectList = () => {
    const { cursor, cardStyle, avatarBoxStyle, countStyle, countTextStyle, boxStyle, boxTextStyle } = useStyles();
    // const dispatch = useDispatch();
    const history = useHistory();
    
    /* Redux hooks */
    const { project } = useProject();
    // const { organizationId } = useLogin();
    const { department, projects: projectsList, totalProjects: totalProjectsCount } = useDepartment();
    const { loading } = useProjectLoading();
    const { loading: departmentloading } = useDepartmentLoading();

    /* Redux hooks */

    /* Local state */
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [totalProjects, setTotalProjects] = useState(totalProjectsCount);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [showMoreIndex, setShowMoreIndex] = React.useState(0);
    const [showMore, setShowMore] = React.useState(false);
    const [projects, setProjects] = useState<Array<{[Key: string]: any}>>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedProject, setSelectedProject] = useState<{[Key: string]: any}>({});

    /* React Hooks */

    const handleCreateNewProject = () => {
      setShowProjectForm(true);
    }

    /* Handler functions */
    const renderCardAction = (project: {[Key: string]: any}) => {
        return (
          <Box p={1.7}>
            <Tooltip title="Update">
              <IconButton color="primary" size="small" aria-label="settings" onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleButton(event)}>
                <Zoom in={true} timeout={2000}>
                  <MoreHorizIcon />
                </Zoom>
              </IconButton>
            </Tooltip>
            {renderMenu(project)}
          </Box>
        )
      }

      const handleButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setOpen(!open);
        setAnchorEl(event.currentTarget);
      }

      const handleClose = () => {
        setOpen(false);
      }

      const handleMenuItem = async (val: string, project: {[Key: string]: any}) => {
        setSelectedProject(project);
        switch (val) {
          case 'edit':
            // setOpenEditDialog(true);
            break;
          case 'delete':
            setOpenDeleteDialog(true);
            break;
          default:
            break
        }
      }

      useEffect(() => {
        if(!loading && project?._id){
          setShowProjectForm(false);
          setProjects((currentProjects: Array<{[Key:string]: any}>) => [...currentProjects, project]);
          setTotalProjects(totalProjects + 1);
        }
        if(!loading && !project?._id){
          // setShowError(true);
        }
    }, [loading, project])

    useEffect(() => {
      if(projectsList){
        setShowProjectForm(false);
        setProjects(projectsList);
        setTotalProjects(totalProjectsCount);
      }
  }, [projectsList])

      const renderMenu = (project: {[Key: string]: any}) => {
        return (
          <Menu
            id="fade-menu"
            open={open}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            getContentAnchorEl={null}
            TransitionComponent={Zoom}
          >
            <ListItem button={true} onClick={() => handleMenuItem('edit', project)}>
                <ListItemAvatar style={{ minWidth: 35 }}>
                    <EditIcon />
                </ListItemAvatar>
                <ListItemText
                    primary={<b>Edit Project</b>}
                    secondary="Update the project"
                />
            </ListItem>
            <ListItem button={true} 
              onClick={() => handleMenuItem('delete', project)}
            >
              <ListItemAvatar style={{ minWidth: 35 }}>
                <DeleteOutlineIcon />
              </ListItemAvatar>
              <ListItemText
                primary={<b>Delete Project</b>}
                secondary="Once deleted can't be done"
              />
            </ListItem>
          </Menu>
        )
      }

      const renderCardTitle = (project: {[Key: string]: any}) => {
        return <Box mt={0.7} className={cursor} onClick={() => handleCard(project)}>
                <Typography color="initial" variant="h5">{project?.title}</Typography>
            </Box>
      }

      const renderCardSubTitle = (project: {[Key: string]: any}) => {
        return (
          <Box mt={0.2} display="flex">
            {getCardSubHeaderText(project?.updatedAt)}
          </Box>
        )
      }

      const handleShowMore = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        event.stopPropagation();
        setShowMoreIndex(index);
        setShowMore(!showMore);
      }

      const renderSecondaryText = (message: string, index: number) => {
        if(!message){
          return null;
        }
        return (
          <Box display="flex">
            <Typography component="p" variant="body2">
              {!showMore && message && message?.length > 70
                ? message.slice(0, 70)
                : message}
              {/* {showMore && message && showMoreIndex === index ? message : null}
              {showMore && message && showMoreIndex !== index
                ? message.slice(0, 200)
                : null} */}
              {message.length > 70 ? (
                <span
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleShowMore(event, index)}
                    className={cursor}
                >
                  {showMore && showMoreIndex === index
                    ? ' Show Less'
                    : '... Show More'}
                </span>
              ) : null}
            </Typography>
          </Box>
        )
      }

      const renderCardContent = (project: {[Key: string]: any}, index: number) => {
        return (
            <Box minHeight={50}>
                <List>
                    <ListItem alignItems="flex-start">
                        <Zoom in={true} timeout={2000}>
                            <ListItemText
                                secondary={renderSecondaryText(project?.description, index)}
                            />
                        </Zoom>
                    </ListItem>
                </List>
            </Box>
          )
        }

        const handleCard = (project: {[Key: string]: any}) => {
          history.push(replaceStr(PROJECT_DASHBOARD, ":projectId", project?._id));
        }

        const renderCardActions = (project: {[Key: string]: any}) => {
          return (
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" className={boxStyle}>
                <Box className={boxTextStyle}>
                  <Typography color="primary" variant="body2">{formateNumber(project?.totalBoards || 0)}{project?.totalBoards == 1 ? " board": " boards"}</Typography>
                </Box>
              </Box>
          </Box>
          )
      }

      const handleCloseDialog = () => {
        // setOpenDialog(false);
        setOpenDeleteDialog(false);
      }

    const handleDelete = () => {
      // dispatch(deleteProject(selectedProject?._id));
      setOpenDeleteDialog(false);
    }

      const renderDeleteDialog = () => {
        return (
          <Box>
            <ResponsiveDialog open={openDeleteDialog} title="Delete Note" pcta="Delete" scta="Cancel" handleSave={handleDelete} handleClose={handleCloseDialog}>
              <Typography variant="h4"> Are you sure you want to delete {selectedProject?.title}?</Typography>
            </ResponsiveDialog>
          </Box>
        )
    }

    const handleBack = () => {
      history.push(replaceStr(ORGANIZATION_DASHBOARD, ":organizationId", department?.organizationId));
    }
      
    return (
        <React.Fragment>
          <Loader backdrop={true} enable={loading || departmentloading} />
          {renderDeleteDialog()}
          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box mt={5} display="flex" justifyContent="space-between">
                    <Box display="flex" justifyContent="space-between">
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
                    <Box display="flex">
                      <Box mr={2}>
                        <Button
                            variant="outlined"
                            color="default"
                            startIcon={<BackIcon color="primary" />}
                            onClick={() => handleBack()}
                          >
                            <Typography color="primary" variant="body1" >Go Back to Departments</Typography>
                          </Button>
                      </Box>
                      {projects?.length ? <Box>
                        <Button
                          variant="outlined"
                          color="default"
                          startIcon={<AddIcon color="primary" />}
                          onClick={() => handleCreateNewProject()}
                        >
                          <Typography color="primary" variant="body1" >Create New Project</Typography>
                        </Button>
                      </Box>: null}
                    </Box>
                </Box>
            </Grid>
        </Grid>
        {!loading && (!projects || !projects?.length) && (
          <Box mt={10}>
              <NoRecords message="No Projects found! Please add"/>
              <Box mt={5} textAlign="center">
                <Button
                  variant="outlined"
                  color="default"
                  startIcon={<AddIcon color="primary" />}
                  onClick={() => handleCreateNewProject()}
                >
                  <Typography color="primary" variant="body1">Create New Project</Typography>
                </Button>
              </Box>
          </Box>
          )}
          <CreateProject openDialog={showProjectForm} setShowForm={setShowProjectForm} />
          <List>
              <Grid container spacing={2}>
                {!loading && Array.isArray(projects) ? projects.map((project: {[Key: string]: any}, index: number) => (
                  <Grid key={project?._id} item xl={4} lg={4} md={6} sm={6} xs={12}>
                    <Card className={cardStyle}>
                      <CardHeader
                          avatar={<AssignmentIcon style={{background: getRandomColor()}} className={avatarBoxStyle} color="secondary" />}
                          action={renderCardAction(project)}
                          title={renderCardTitle(project)}
                          subheader={renderCardSubTitle(project)}
                          style={{ padding: "10px 0px 0px 15px" }}
                      />
                      <CardContent>
                        {renderCardContent(project, index)}
                        <Box ml={2} mb={1}>
                          {renderCardActions(project)}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>)): null}
              </Grid>
          </List>
        </React.Fragment>
    )
}

export default ProjectList;
