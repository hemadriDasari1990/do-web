import React, { useEffect, useState } from "react";
// import { getSectionsByBoard } from "../../redux/actions/section";
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useDepartment, useDepartmentLoading } from "../../../redux/state/department"
import { useOrganization, useOrganizationLoading } from "../../../redux/state/organization"

import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { DEPARTMENT_DASHBOARD } from '../../../routes/config';
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
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
import { Tooltip } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom'
import formateNumber from '../../../util/formateNumber'
import getCardSubHeaderText from '../../../util/getCardSubHeaderText'
import getRandomColor from "../../../util/getRandomColor";
import { replaceStr } from "../../../util";
// import { updateDepartment } from "../../../redux/actions/department"
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
const UpdateDepartment = React.lazy(() => import("../Update"));
const Loader = React.lazy(() => import("../../Loader/components"));
const ResponsiveDialog = React.lazy(() => import("../../Dialog"));

const useStyles = makeStyles((theme: Theme) => ({
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
  },
  buttonStyle: {
    textAlign: "end",
    [theme.breakpoints.down('xs')]: {
        textAlign: "center",
        width: "100%"
    },
  }
}));

const DepartmentList = () => {
    const { cursor, cardStyle, avatarBoxStyle, countStyle, countTextStyle, boxStyle, boxTextStyle, buttonStyle } = useStyles();
    // const dispatch = useDispatch();
    const history = useHistory();
    
    /* Redux hooks */
    const { department } = useDepartment();
    // const { token } = useLogin();
    const { organization, departments: departmentsList, totalDepartments: totalDepartmentsCount } = useOrganization();
    const { loading } = useDepartmentLoading();
    const { loading: organizationloading } = useOrganizationLoading();
    
    /* Redux hooks */

    /* Local state */
    const [showDepartmentForm, setShowDepartmentForm] = useState(false);
    const [totalDepartments, setTotalDepartments] = useState(totalDepartmentsCount);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [showMoreIndex, setShowMoreIndex] = React.useState(0);
    const [showMore, setShowMore] = React.useState(false);
    const [departments, setDepartments] = useState<Array<{[Key: string]: any}>>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<{[Key: string]: any}>({});
    
    /* React Hooks */
  
    const handleCreateNewDepartment = () => {
      setShowDepartmentForm(true);
    }

    /* Handler functions */
    const renderCardAction = (department: {[Key: string]: any}) => {
        return (
          <Box p={1.7}>
            <Tooltip title="Update">
              <IconButton color="primary" size="small" aria-label="settings" onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleButton(event, department)}>
                <Zoom in={true} timeout={2000}>
                  <MoreHorizIcon />
                </Zoom>
              </IconButton>
            </Tooltip>
            {renderMenu()}
          </Box>
        )
      }

      const handleButton = (event: React.MouseEvent<HTMLButtonElement>, department: {[Key: string]: any}) => {
        event.stopPropagation();
        setOpen(!open);
        setAnchorEl(event.currentTarget);
        setSelectedDepartment(department);
      }

      const handleClose = () => {
        setOpen(false);
      }

      const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
      }

      const handleMenuItem = async (event: React.MouseEvent<HTMLDivElement | MouseEvent>, val: string) => {
        event.stopPropagation();
        switch (val) {
          case 'edit':
            setShowDepartmentForm(true);
            break;
          case 'delete':
            setOpenDeleteDialog(true);
            break;
          default:
            break
        }
        setOpen(false);
      }
      
      const renderDeleteDialog = () => {
        return (
          <Box>
            <ResponsiveDialog open={openDeleteDialog} title="Delete Note" pcta="Delete" scta="Cancel" handleSave={handleDelete} handleClose={handleCloseDeleteDialog}>
              <Typography variant="h4"> Are you sure you want to delete {selectedDepartment?.title}?</Typography>
            </ResponsiveDialog>
          </Box>
        )
    }

    const handleDelete = () => {
      // dispatch(deleteNote(selectedDepartment._id));
      setOpenDeleteDialog(false);
    }

      useEffect(() => {
        if(!loading && !department?._id){
          // setShowError(true);
        }

        if(!loading && department?._id){
          const departmentsList = [...departments];
          const departmentIndex = departmentsList.findIndex((d: {[Key: string]: any}) => d._id === department._id);
          const departmentData = departments[departmentIndex];
          if(departmentData){
              departmentData.title = department.title;
              departmentData.description = department.description;
              departmentsList[departmentIndex] = departmentData;
              setDepartments(departmentsList);
          } else {
            setDepartments((currentDepartments: Array<{[Key:string]: any}>) => [...currentDepartments, department]);
            setTotalDepartments(totalDepartments + 1);
          }
          setSelectedDepartment({});
          setShowDepartmentForm(false);
      }

    }, [loading, department])

    useEffect(() => {
      if(departmentsList){
        setShowDepartmentForm(false);
        setDepartments(departmentsList);
        setTotalDepartments(totalDepartmentsCount);
      }
  }, [departmentsList])

      const renderMenu = () => {
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
            <ListItem button={true} onClick={(event: React.MouseEvent<HTMLDivElement | MouseEvent>) => handleMenuItem(event, 'edit')}>
                <ListItemAvatar style={{ minWidth: 35 }}>
                    <EditIcon />
                </ListItemAvatar>
                <ListItemText
                  primary={<b>Edit Department</b>}
                  secondary="Update the department"
                />
            </ListItem>
            <ListItem
              button={true}
              onClick={(event: React.MouseEvent<HTMLDivElement | MouseEvent>) => handleMenuItem(event, 'delete')}
            >
              <ListItemAvatar style={{ minWidth: 35 }}>
                <DeleteOutlineIcon />
              </ListItemAvatar>
              <ListItemText
                primary={<b>Delete Department</b>}
                secondary="Once deleted can't be undone"
              />
            </ListItem>
          </Menu>
        )
      }

      const renderCardTitle = (department: {[Key: string]: any}) => {
        return <Box mt={0.7} className={cursor} onClick={(event: React.MouseEvent<HTMLElement | MouseEvent>) => handleCard(event, department)}>
                <Typography color="initial" variant="h5">{department?.title}</Typography>
              </Box>
      }

      const renderCardSubTitle = (department: {[Key: string]: any}) => {
        return (
          <Box mt={0.2} display="flex">
            {getCardSubHeaderText(department?.updatedAt)}
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

      const renderCardContent = (department: {[Key: string]: any}, index: number) => {
        return (
            <Box minHeight={50}>
                <List>
                    <ListItem alignItems="flex-start">
                        <Zoom in={true} timeout={2000}>
                            <ListItemText
                                secondary={renderSecondaryText(department?.description, index)}
                            />
                        </Zoom>
                    </ListItem>
                </List>
            </Box>
          )
        }

        const handleCard = (event: React.MouseEvent<HTMLElement | MouseEvent>, department: {[Key: string]: any}) => {
          event.stopPropagation();
          history.push(replaceStr(DEPARTMENT_DASHBOARD, ":departmentId", department?._id));
        }

        const renderCardActions = (department: {[Key: string]: any}) => {
          return (
              <Box display="flex" justifyContent="space-between">
                  <Box display="flex" className={boxStyle}>
                    <Box className={boxTextStyle}>
                      <Typography color="primary" variant="body2">{formateNumber(department?.totalProjects || 0)}{department?.totalProjects == 1 ? " project": " projects"}</Typography>
                    </Box>
                  </Box>
              </Box>
          )
      }

      const renderCreateNewDepartment = () => {
        return (
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon color="secondary" />}
            onClick={() => handleCreateNewDepartment()}
          >
            <Typography color="secondary" variant="body1">Create New Department</Typography>
          </Button>
        )
      }

      const handleUpdateForm = () => {
        setShowDepartmentForm(false);
        handleClose();
      }
      
    return (
        <React.Fragment>
        <Loader backdrop={true} enable={loading || organizationloading} />
        {renderDeleteDialog()}
        <Box py={4}>
          <Grid container spacing={2}>
            <Grid item xl={9} lg={9} md={8} sm={8} xs={12}>
              <Box display="flex">
                <Hidden only={["xs"]}>
                  <Typography variant="h1">{organization?.title}</Typography> 
                </Hidden>
                <Hidden only={["xl", "lg", "md", "sm"]}>
                    <Typography variant="h2">{organization?.title}</Typography> 
                </Hidden>
                <Tooltip title="Total Departments">
                  <Box ml={2} mt={1} className={countStyle}>
                    <Typography color="primary" className={countTextStyle}>{totalDepartments}</Typography>
                  </Box>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xl={3} lg={3} md={4} sm={12} xs={12}>
              {departments?.length ? <Box className={buttonStyle}>
                {renderCreateNewDepartment()}
              </Box>: null}
            </Grid>
          </Grid>
        </Box>
        {!loading && (!departments || !departments?.length) && (
          <Box mt={10}>
              <NoRecords message="No Departments found! Please add"/>
              <Box mt={5} textAlign="center">
                {renderCreateNewDepartment()}
              </Box>
          </Box>
          )}
          <UpdateDepartment selectedDepartment={selectedDepartment} openDialog={showDepartmentForm} handleUpdateForm={handleUpdateForm} />
          <List>
              <Grid container spacing={2}>
                {!loading && Array.isArray(departments) ? departments.map((department: {[Key: string]: any}, index: number) => (
                  <Grid key={department?._id} item xl={4} lg={4} md={6} sm={6} xs={12}>
                    <Card className={cardStyle}>
                      <CardHeader
                        avatar={<SportsVolleyballIcon style={{background: getRandomColor()}} className={avatarBoxStyle} color="secondary" />}
                        action={renderCardAction(department)}
                        title={renderCardTitle(department)}
                        subheader={renderCardSubTitle(department)}
                        style={{padding: "10px 0px 0px 15px"}}
                      />
                      <CardContent>
                        {renderCardContent(department, index)}
                        <Box ml={2} mb={1}>
                          {renderCardActions(department)}
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>)): null}
              </Grid>
          </List>
        </React.Fragment>
    )
}

export default DepartmentList;
