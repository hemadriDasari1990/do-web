import React, { useEffect, useState } from "react";
import { Tooltip, Typography } from '@material-ui/core'
import { deleteSection, updateSection } from "../../redux/actions/section";
import { useLoading, useSection } from "../../redux/state/section"

// import Badge from '@material-ui/core/Badge'
import Box from '@material-ui/core/Box'
import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Zoom from '@material-ui/core/Zoom'
import { getSectionsByBoard } from "../../redux/actions/section";
import { makeStyles } from '@material-ui/core/styles';
import socket from "../../socket";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const Note = React.lazy(() => import("../Note"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const UpdateSection = React.lazy(() => import("./Update"));

const useStyles = makeStyles(() => ({
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
        color: "#333",
        fontWeight: 600
    },
    countStyle: {
        borderRadius: 5,
        border: "1px solid #3333",
        minWidth: 30,
        height: 30
    }
}));

const SectionList = () => {
    const { sectionHeader, titleStyle, sectionStyle, listItemStyle, countStyle, countTextStyle } = useStyles();
    const dispatch = useDispatch();
    const { boardId } = useParams<{ boardId: string }>();
    
    /* Redux hooks */
    const { section } = useSection();
    const { loading } = useLoading();

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
            filterSections(deletedSection?._id)
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
    const editSection = (section: {[Key: string]: any}) => {
        setSelectedSection(section);
        setOpenDialog(true);
    }

    const handleDeleteSection = (section: {[Key: string]: any}) => {
        setSelectedSection(section);
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
        if(section?._id === selectedSection?._id){
            setSections(newSections);
            setSelectedSection({});
        }
    }

    const handleSave = () => {
        dispatch(updateSection(selectedSection?._id, {
            title: sectionInput
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
            id="fade-menu"
            open={open}
            onClose={handleMenuClose}
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            getContentAnchorEl={null}
            TransitionComponent={Zoom}
          >
            <ListItem className={listItemStyle} onClick={() => editSection(item)}>
              <ListItemAvatar style={{ minWidth: 35 }}>
                <EditIcon />
              </ListItemAvatar>
              <ListItemText
                primary={<b>Edit Section</b>}
                secondary="Update title"
              />
            </ListItem>
            <ListItem className={listItemStyle} onClick={() => handleDeleteSection(item)}>
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

      const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setOpen(!open);
        setAnchorEl(event.currentTarget);
      }

      const renderMenuAction = (item: {[Key: string]: any}) => {
        return (
          <>
            <Tooltip title="Update">
              <IconButton aria-label="settings" onClick={handleMenu}>
                <Zoom in={true} timeout={2000}>
                  <MoreHorizIcon />
                </Zoom>
              </IconButton>
            </Tooltip>
            {renderMenu(item)}
          </>
        )
      }

    return (
        <React.Fragment>
            {renderDeleteDialog()}
            {renderUpdateDialog()}
            <List>
                <Grid container spacing={1}>
                    {Array.isArray(sections) && sections.map((item: {[Key: string]: any}) => (
                        <Grid item key={item._id} xl={3} lg={3} md={6} sm={5} xs={12}>
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
                                                <Typography className={countTextStyle}>{item.totalNotes}</Typography>
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
                {!sections?.length && (
                    <NoRecords message="No Sections found"/>
                )}
            </List>
        </React.Fragment>
    )
}

export default SectionList;
