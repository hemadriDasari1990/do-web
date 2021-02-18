import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';
import { Tooltip, Typography } from '@material-ui/core'
import { deleteSection, updateSection } from "../../redux/actions/section";
import { useLoading, useSection } from "../../redux/state/section"

import BackIcon from '@material-ui/icons/Reply';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container'
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { PROJECT_DASHBOARD } from "../../routes/config";
import Zoom from '@material-ui/core/Zoom'
import { getSectionsByBoard } from "../../redux/actions/section";
import { replaceStr } from "../../util";
import socket from "../../socket";
import { useBoard } from "../../redux/state/board"
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useParams } from "react-router";

const Note = React.lazy(() => import("../Note"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const UpdateSection = React.lazy(() => import("./Update"));
const Loader = React.lazy(() => import("../Loader/components"));

const useStyles = makeStyles((theme: Theme) => ({
    sectionHeader: {
        fontWeight: "bold",
        padding: "5px 15px 5px 15px",
        color: "#071040"
    },
    titleStyle: {
        width: "fit-content",
    },
    sectionStyle: {
        backgroundColor: "#d8d8d833",
        borderRadius: 10
    },
    listItemStyle: {
        cursor: "pointer",
    },
    countTextStyle: {
        top: "50%",
        textAlign: "center",
        fontWeight: 600
    },
    countStyle: {
        borderRadius: 5,
        border: "1px solid #0072ff",
        minWidth: 30,
        height: 30
    },
    buttonStyle: {
        textAlign: "end",
        [theme.breakpoints.down('xs')]: {
            textAlign: "center",
            width: "100%"
        },
    }
}));

const SectionList = () => {
    const { sectionHeader, titleStyle, sectionStyle, listItemStyle, countStyle, countTextStyle, buttonStyle } = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const { boardId } = useParams<{ boardId: string }>();
    
    /* Redux hooks */
    const { section } = useSection();
    const { totalSections } = useBoard();
    const { loading } = useLoading();
    const { board } = useBoard();

    /* Local state */
    const [action, setAction] = useState(false);
    const [selectedSection, setSelectedSection] = useState<{[Key: string]: any}>({});
    const [sections, setSections] = useState<Array<{[Key: string]: any}>>([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteDialog, setOpenDeleteDialog] = useState(false);
    const [sectionInput, setSectionInput] = useState("");
    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    
    /* React Hooks */
    useEffect(() => {
        setAction(false);
        dispatch(getSectionsByBoard(boardId));
        setAction(true);
    }, []);

    useEffect(() => {
        /* Update Section Title */
        socket.on("update-section", (updatedSection: {[Key:string]: any}) => {
            if(!updatedSection){
                return;
            }
            filterLatestSections(updatedSection);
        });
        return () => {
            socket.off("update-section");
        };  
    }, [sections]);
    
    useEffect(() => {
        /* Delete section  */
        socket.on("delete-section", (deletedSection: {[Key:string]: any}) => {
            if(!deletedSection){
                return;
            }
            filterSections(deletedSection?._id);
        });
        return () => {
            socket.off("delete-section");
        };  
    }, [selectedSection, sections]);
    
    useEffect(() => {
        if(!loading && action && Array.isArray(section)){
            setSections(section);
            setAction(false);
        }
    }, [action, section, loading]);
    
    /* Handler functions */
    const editSection = () => {
        setOpen(false);
        setOpenDialog(true);
    }

    const handleDeleteSection = () => {
        setOpen(false);
        setOpenDeleteDialog(true);
    }

    const updateTotalNotes = (sectionId: string, operation: string) => {
        if(!sections){
            return;
        }
        const newSections: Array<{[Key: string]: any}> = [...sections];
        const sectionIndex: number = newSections.findIndex(
            newSection => newSection._id === sectionId,
        )
        const sectionData: {[Key: string]: any} = newSections[sectionIndex];
        sectionData.totalNotes = operation === "add" ? sectionData.totalNotes + 1: sectionData.totalNotes - 1;
        newSections[sectionIndex] = sectionData;
        setSections(newSections);
    }

    const filterSections = (sectionId: string) => {
        if(!sections){
            return;
        }
        if(sectionId === selectedSection?._id){
            const filteredSections: Array<{[Key: string]: any}> = sections.filter(
                item => item._id !== sectionId,
            )
            setSections(filteredSections);
            setSelectedSection({});
        }
    }

    const filterLatestSections = (section: {[Key: string]: any}) => {
        if(!section){
            return;
        }
        const newSections: Array<{[Key: string]: any}> = [...sections];
        const sectionIndex = newSections.findIndex((s: {[Key: string]: any}) => s._id === section._id);
        const sectionData = newSections[sectionIndex];
        sectionData.title = section.title;
        newSections[sectionIndex] = sectionData;
        setSections(newSections);
        setSelectedSection({});
    }

    const handleSave = () => {
        dispatch(updateSection({
            title: sectionInput,
            sectionId: selectedSection?._id,
            projectId: selectedSection?.projectId
        }));
        setOpenDialog(false);
    }

    const handleDelete = () => {
        dispatch(deleteSection(selectedSection?._id));
        setOpenDeleteDialog(false);
    }

    const handleClose = () => {
        setOpenDialog(false);
        setOpenDeleteDialog(false);
    }

    const renderUpdateDialog = () => {
        return (
            <Box>
                <ResponsiveDialog open={openDialog} title="Update Section" pcta="Update" scta="Cancel" handleSave={handleSave} handleClose={handleClose}>
                    <UpdateSection value={selectedSection?.title || ""} setSectionInput={setSectionInput} />
                </ResponsiveDialog>
            </Box>
        )
    }

    const renderDeleteDialog = () => {
        return (
            <Box>
                <ResponsiveDialog open={deleteDialog} title="Delete Section" pcta="Delete" scta="Cancel" handleSave={handleDelete} handleClose={handleClose}>
                    <Typography variant="h4"> Are you sure you want to delete {selectedSection?.title}?</Typography>
                </ResponsiveDialog>
            </Box>
        )
    }

    const handleMenuClose = () => {
        setOpen(false);
    }

    const renderMenu = (item: {[Key: string]: any}) => {
        return (
          <Menu
            id={item._id}
            open={open}
            onClose={handleMenuClose}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            getContentAnchorEl={null}
            TransitionComponent={Zoom}
          >
            <ListItem button={true} className={listItemStyle} onClick={() => editSection()}>
              <ListItemAvatar style={{ minWidth: 35 }}>
                <EditIcon />
              </ListItemAvatar>
              <ListItemText
                primary={<b>Edit Section</b>}
                secondary="Update title"
              />
            </ListItem>
            <ListItem button={true} className={listItemStyle} onClick={() => handleDeleteSection()}>
              <ListItemAvatar style={{ minWidth: 35 }}>
                <DeleteIcon />
              </ListItemAvatar>
              <ListItemText
                primary={<b>Delete Post</b>}
                secondary="Once deleted can't be undone"
              />
            </ListItem>
          </Menu>
        )
      }

      const handleMenu = (event: React.MouseEvent<HTMLButtonElement>, item: {[Key: string]: any}) => {
        setOpen(!open);
        setAnchorEl(event.currentTarget);
        setSelectedSection(item);
      }

      const renderMenuAction = (item: {[Key: string]: any}) => {
        return (
          <>
            <Tooltip title="Update">
              <IconButton id={item?._id} aria-label="settings" onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleMenu(event, item)}>
                <Zoom in={true} timeout={2000}>
                  <MoreHorizIcon />
                </Zoom>
              </IconButton>
            </Tooltip>
            {renderMenu(item)}
          </>
        )
      }

      const handleBack = () => {
        history.push(replaceStr(PROJECT_DASHBOARD, ":projectId", board?.projectId));
      }

    return (
        <React.Fragment>
            <Loader backdrop={true} enable={loading} />
            {renderDeleteDialog()}
            {renderUpdateDialog()}
            <Container>
                <Box py={5}>
                    <Grid container spacing={1}>
                        <Grid item xl={9} lg={9} md={8} sm={8} xs={12}>
                            <Box display="flex">
                                <Hidden only={["xs"]}>
                                    <Typography variant="h1">{board?.title}</Typography> 
                                </Hidden>
                                <Hidden only={["xl", "lg", "md", "sm"]}>
                                    <Typography variant="h2">{board?.title}</Typography> 
                                </Hidden>
                                <Tooltip title="Total Sections">
                                    <Box ml={2} mt={1} className={countStyle}>
                                        <Typography color="primary" className={countTextStyle}>{totalSections}</Typography>
                                    </Box>
                                </Tooltip>
                            </Box>
                        </Grid> 
                        <Grid item xl={3} lg={3} md={4} sm={4} xs={12}>
                            <Box mr={2} className={buttonStyle}>
                                    <Button
                                        variant="outlined"
                                        color="default"
                                        startIcon={<BackIcon color="primary" />}
                                        onClick={() => handleBack()}
                                    >
                                        <Typography color="primary" variant="body1" >Go Back to Boards</Typography>
                                    </Button>
                            </Box>
                        </Grid> 
                    </Grid>
                </Box>
                {/* <Box py={5} display="flex" justifyContent="space-between">
                    
                    <Box mr={2}>
                        <Button
                            variant="outlined"
                            color="default"
                            startIcon={<BackIcon color="primary" />}
                            onClick={() => handleBack()}
                        >
                            <Typography color="primary" variant="body1" >Go Back to Boards</Typography>
                        </Button>
                    </Box>
                </Box> */}
            </Container>
            <List>
                <Grid container spacing={1}>
                    {Array.isArray(sections) && sections.map((item: {[Key: string]: any}) => (
                        <Grid item key={item._id} xl={3} lg={3} md={4} sm={6} xs={12}>
                            <Box className={sectionStyle}>
                                <ListItem>
                                    <ListItemText
                                        primary={<Box display="flex" justifyContent="space-between" className={titleStyle}>
                                            <Box>
                                                <Tooltip title={item.title}>
                                                    <Typography className={sectionHeader} variant="h3">{item.title}</Typography>
                                                </Tooltip>
                                            </Box>
                                            <Box mt={1} className={countStyle}>
                                                <Tooltip title="Total Notes">
                                                    <Typography color="primary" className={countTextStyle}>{item.totalNotes}</Typography>
                                                </Tooltip>
                                            </Box>
                                        </Box>}
                                    />
                                    <ListItemSecondaryAction>
                                        {renderMenuAction(item)}
                                    </ListItemSecondaryAction>
                                </ListItem>
                                {renderMenu(item)}
                                <Note noteList={item.notes} sectionId={item._id} updateTotalNotes={updateTotalNotes} />
                            </Box>
                        </Grid>
                    ))}
                </Grid>
                {!loading && !sections?.length && (
                    <NoRecords message="No Sections found"/>
                )}
            </List>
        </React.Fragment>
    )
}

export default SectionList;
