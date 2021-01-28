import React, { useEffect, useState } from "react";
import { Tooltip, Typography } from '@material-ui/core'
import { useLoading, useSection } from "../../redux/state/section"

import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Badge from '@material-ui/core/Badge'
import Box from '@material-ui/core/Box'
import DeleteIcon from '@material-ui/icons/Delete';
// import Divider from '@material-ui/core/Divider'
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import Zoom from '@material-ui/core/Zoom'
// import TextField from '@material-ui/core/TextField'
import { deleteSection } from "../../redux/actions/section";
import { getSectionsByBoard } from "../../redux/actions/section";
import { makeStyles } from '@material-ui/core/styles';
// import { replaceStr } from "../../util";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const NoteList = React.lazy(() => import("../Note/list"));
const NoRecords = React.lazy(() => import("../NoRecords"));

const useStyles = makeStyles(() => ({
    sectionHeader: {
        fontWeight: "bold",
        padding: "5px 15px 5px 15px",
    },
    titleStyle: {
        backgroundColor: "#dfedff",
        borderRadius: 30,
        width: "fit-content"
    },
    sectionStyle: {
        backgroundColor: "#f3f3f3",
        borderRadius: 10
    }
}));

const SectionList = () => {
    const { sectionHeader, titleStyle, sectionStyle } = useStyles();
    const dispatch = useDispatch();
    const { boardId } = useParams<{ boardId: string }>();
    
    /* Redux hooks */
    const { section } = useSection();
    const { loading } = useLoading();

    /* Local state */
    const [showNote, setShowNote] = useState(false);
    const [action, setAction] = useState(false);
    const [selectedSection, setSelectedSection] = useState<{[Key: string]: any}>({});
    const [sections, setSections] = useState<Array<{[Key: string]: any}>>([]);
    // const [noOfSections, setNoOfSections] = useState("");
    // const [apiTriggered, setApiTriggered] = useState(false);
    // const [showError, setShowError] = useState(false);

    /* React Hooks */

    useEffect(() => {
        setAction(false);
        dispatch(getSectionsByBoard(boardId));
        setAction(true);
    }, []);
    useEffect(() => {
        if(!loading && action && Array.isArray(section)){
            setSections(section);
        }
        if(!loading && action && section?._id){
            /* This gets triggered when section is successfully deleted */
            filterSections(section?._id)
        }
    }, [action, section, loading]);
    
    /* Handler functions */
    const editSection = (sectionId: string) => {
    }

    const createSection = (section: {[Key: string]: any}) => {
        setShowNote(true);
        setSelectedSection(section);
    }

    const handleClickAway = () => {
        setShowNote(false);
    }

    const handleDeleteSection = (sectionId: string) => {
        setAction(false);
        dispatch(deleteSection(sectionId));
        setAction(true);
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
        const filteredSections: Array<{[Key: string]: any}> = sections.filter(
            item => item._id !== sectionId,
        )
        setSections(filteredSections);
    }


    return (
        <React.Fragment>
            <List>
                <Grid container spacing={1}>
                    {Array.isArray(sections) && sections.map((item: {[Key: string]: any}) => (
                        <Grid item key={item._id} xl={3} lg={3} md={4} sm={5} xs={12}>
                            <Box className={sectionStyle}>
                                <ListItem>
                                    <ListItemText
                                        primary={<Box className={titleStyle}><Tooltip title={"Total Notes "+item.totalNotes}><Badge color="primary" badgeContent={item.totalNotes} showZero={item.totalNotes > 0 ? false: true}>
                                        <Typography className={sectionHeader} variant="body1">{item.title}</Typography>
                                    </Badge></Tooltip></Box>}
                                    />
                                    <ListItemSecondaryAction>
                                        <Tooltip title="Create Note">
                                            <Zoom in={true} timeout={1500}>
                                                <IconButton onClick={() => createSection(item)}>
                                                    <AddCircleOutlineIcon />
                                                </IconButton>
                                            </Zoom>
                                        </Tooltip>
                                        <Tooltip title="Edit Section">
                                            <Zoom in={true} timeout={1500}>
                                                <IconButton onClick={() => editSection(item._id)}>
                                                    <EditIcon />
                                                </IconButton>
                                            </Zoom>
                                        </Tooltip>
                                        <Tooltip title="Delete Section">
                                            <Zoom in={true} timeout={1500}>
                                                <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteSection(item._id)}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Zoom>
                                        </Tooltip>
                                    </ListItemSecondaryAction>
                                    
                                </ListItem>
                                {!item?.notes?.length && selectedSection?._id !== item._id && (
                                    <NoRecords />
                                )}
                                <NoteList noteList={item.notes} sectionId={item._id} updateTotalNotes={updateTotalNotes} selectedSectionId={selectedSection?._id} setShowNote={setShowNote} showNote={showNote} handleClickAway={handleClickAway}/>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </List>
        </React.Fragment>
    )
}

export default SectionList;
