import React, { useEffect, useState } from "react";
import { useBoard, useLoading } from "../../../redux/state/board"

import AddIcon from '@material-ui/icons/Add';
import { BOARD_DASHBOARD } from '../../../routes/config';
import BackIcon from '@material-ui/icons/Reply';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import Box from '@material-ui/core/Box'
// import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
// import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { DEPARTMENT_DASHBOARD } from "../../../routes/config";
import DashboardIcon from '@material-ui/icons/Dashboard';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
// import DeleteIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
// import Box from '@material-ui/core/Box'
// import DeleteIcon from '@material-ui/icons/DeleteForever';
// import EditIcon from '@material-ui/icons/Edit';
// import Grid from '@material-ui/core/Grid'
// import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip'
import { Typography } from '@material-ui/core';
import Zoom from '@material-ui/core/Zoom'
import formateNumber from '../../../util/formateNumber'
import getCardSubHeaderText from '../../../util/getCardSubHeaderText'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemAvatar from '@material-ui/core/ListItemAvatar'
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
// import ListItemText from '@material-ui/core/ListItemText'
// import Menu from '@material-ui/core/Menu'
// import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
// import Zoom from '@material-ui/core/Zoom'
// import { getSectionsByBoard } from "../../redux/actions/section";
import { makeStyles } from '@material-ui/core/styles';
// import { getSectionsByBoard } from "../../redux/actions/section";
import { replaceStr } from "../../../util";
// import { Tooltip, Typography } from '@material-ui/core'
// import { updateBoard } from "../../../redux/actions/board"
// import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useProject } from '../../../redux/state/project';
import { useProjectLoading } from "../../../redux/state/project"

// const Note = React.lazy(() => import("../Note"));
const NoRecords = React.lazy(() => import("../../NoRecords"));
const CreateBoard = React.lazy(() => import("../Create"));
const Loader = React.lazy(() => import("../../Loader/components"));

const useStyles = makeStyles(() => ({
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
  avatarBoxStyle: {
    borderRadius: 5,
    fontSize: 30,
    padding: 2
  },
  cardStyle: {
    backgroundColor:"#fff",
  },
  cursor: {
    cursor: "pointer"
  },
  boxTextStyle: {
    padding: "3px 10px 3px 10px"
  },
  boxStyle: {
    backgroundColor: "aliceblue",
    borderRadius: 6
  }
}));

const BoardList = () => {
    const { cursor, countStyle, countTextStyle, avatarBoxStyle, cardStyle, boxTextStyle, boxStyle } = useStyles();
    // const dispatch = useDispatch();
    const history = useHistory();
    
    /* Redux hooks */
    const { board } = useBoard();
    const { loading } = useLoading();
    const { project, boards: boardsList, totalBoards: totalBoardsCount } = useProject();
    const { loading: projectloading } = useProjectLoading();

    /* Local state */
    const [boards, setBoards] = useState<Array<{[Key: string]: any}>>([]);
    const [showBoardForm, setShowBoardForm] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [showMoreIndex, setShowMoreIndex] = React.useState(0);
    const [showMore, setShowMore] = React.useState(false);
    const [totalBoards, setTotalBoards] = useState(totalBoardsCount);
    
    /* React Hooks */
    useEffect(() => {
    }, []);

    useEffect(() => {
      if(!loading && board?._id){
        setShowBoardForm(false);
        setBoards((currentBoards: Array<{[Key:string]: any}>) => [...currentBoards, board]);
        setTotalBoards(totalBoards + 1);
      }
      if(!loading && !board?._id){
        // setShowError(true);
      }
  }, [loading, board])

  useEffect(() => {
    if(boardsList){
      setShowBoardForm(false);
      setBoards(boardsList);
      setTotalBoards(totalBoardsCount);
    }
}, [boardsList])

  const handleCopy = (board: {[Key:string]: any}) => {
    if(!board){
      return;
    }
    navigator.clipboard.writeText("http://" + process.env.REACT_APP_SERVER+"/board/"+board?._id);
  }

    const handleCreateNewBoard = () => {
      setShowBoardForm(true);
    }

    const handleBack = () => {
      history.push(replaceStr(DEPARTMENT_DASHBOARD, ":departmentId", project?.departmentId));
    }

    const getRandomColor = () => {
      let colorValues = ["linear-gradient(50deg, #ea087b 0%, #ff5656 100%)", "linear-gradient(50deg, #0072ff 0%, #0095ffba 100%)", "linear-gradient(50deg, #ff8d00 0%, #ffc200ba 100%)", "linear-gradient(50deg, #08AEEA 0%, #2AF598 100%)", "linear-gradient(50deg, rgb(255 224 0) 0%, rgb(255 0 59 / 94%) 100%)", "linear-gradient(90deg, #f8ff00 0%, #3ad59f 100%)"];
      return colorValues[Math.floor(Math.random() * colorValues.length)];
    }
    
    /* Handler functions */
    const renderCardAction = (board: {[Key: string]: any}) => {
        return (
          <>
            <Tooltip title="Update">
              <IconButton aria-label="settings" onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleButton(event)}>
                <Zoom in={true} timeout={2000}>
                  <MoreHorizIcon />
                </Zoom>
              </IconButton>
            </Tooltip>
            {renderMenu(board)}
          </>
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

      const handleMenuItem = async (val: string, board: {[Key: string]: any}) => {
        // switch (val) {
        //   case 'delete':
        //     await this.props.deletePost(postId)
        //     this.setState({
        //       open: false,
        //     })
        //     await this.props.getIncomingPosts(this.props.user._id, '')
        //     await this.props.getRecentPosts(this.props.user._id)
        //     break
        //   default:
        //     break
        // }
      }

      const renderMenu = (board: {[Key: string]: any}) => {
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
            <ListItem className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item">
                <ListItemAvatar style={{ minWidth: 35 }}>
                    <EditIcon />
                </ListItemAvatar>
                <ListItemText
                    className="menu-item-text"
                    primary={<b>Edit Board</b>}
                    secondary="Update the board"
                />
            </ListItem>
            <ListItem
              className="cursor w-us pt-0 pb-0 pl-2 pr-2 menu-item"
              onClick={() => handleMenuItem('delete', board._id)}
            >
              <ListItemAvatar style={{ minWidth: 35 }}>
                <DeleteOutlineIcon />
              </ListItemAvatar>
              <ListItemText
                primary={<b>Delete Board</b>}
                secondary="Once deleted can't be done"
              />
            </ListItem>
          </Menu>
        )
      }

      const renderCardTitle = (board: {[Key: string]: any}) => {
        return <Box mt={0.7} className={cursor} onClick={() => handleCard(board)}>
                <Typography color="initial" variant="h5">{board?.title}</Typography>
            </Box>
      }

      const renderCardSubTitle = (board: {[Key: string]: any}) => {
        return (
          <Box mt={0.2} display="flex">
            {getCardSubHeaderText(board.updatedAt)}
          </Box>
        )
      }

      const handleShowMore = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
        event.stopPropagation();
        setShowMoreIndex(index);
        setShowMore(!showMore);
      }

      const renderSecondaryText = (message: string, index: number) => {
        return (
          <Box display="flex">
            <Typography component="p" variant="body2">
              {!showMore && message && message.length > 70
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

      const renderCardContent = (board: {[Key: string]: any}, index: number) => {
        return (
            <Box minHeight={50}>
                <List>
                    <ListItem alignItems="flex-start">
                        <Zoom in={true} timeout={2000}>
                            <ListItemText
                              secondary={renderSecondaryText(board.description, index)}
                            />
                        </Zoom>
                    </ListItem>
                </List>
            </Box>
          )
        }

        const handleCard = (board: {[Key: string]: any}) => {
            history.push(replaceStr(BOARD_DASHBOARD, ":boardId", board?._id));
        }

        const renderCardActions = (board: {[Key: string]: any}) => {
          return (
            <Box display="flex" justifyContent="space-between">
              <Box display="flex" className={boxStyle}>
                <Box className={boxTextStyle}>
                  <Typography color="primary" variant="body2">{formateNumber(board?.totalSections || 0)}{board?.totalSections == 1 ? " section": " sections"}</Typography>
                </Box>
              </Box>
              <Box>
                <Tooltip title="Copy Board URL">
                  <Zoom in={true} timeout={1500}>
                      <IconButton size="small" color="primary" onClick={() => handleCopy(board)}>
                          <BookmarksIcon />
                      </IconButton>
                  </Zoom>
              </Tooltip>
              </Box>
            </Box>
          )
        }

    /* Handler functions */

    return (
        <React.Fragment>
          <Loader backdrop={true} enable={loading || projectloading} />
          <Grid container spacing={2}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Box mt={4} display="flex" justifyContent="space-between">
                    <Box display="flex" justifyContent="space-between">
                        <Hidden only={["xs"]}>
                            <Typography variant="h1">{project?.title}</Typography> 
                        </Hidden>
                        <Hidden only={["xl", "lg", "md", "sm"]}>
                            <Typography variant="h2">{project?.title}</Typography> 
                        </Hidden>
                        <Tooltip title="Total Boards">
                          <Box ml={2} mt={1} className={countStyle}>
                            <Typography color="primary" className={countTextStyle}>{totalBoards}</Typography>
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
                            <Typography color="primary" variant="body1" >Go Back to Projects</Typography>
                          </Button>
                      </Box>
                      <Box>
                        {boards?.length ? <Button
                            variant="outlined"
                            color="default"
                            startIcon={<AddIcon color="primary" />}
                            onClick={() => handleCreateNewBoard()}
                        >
                            <Typography color="primary" variant="body1" >Create New Board</Typography>
                        </Button>: null}
                      </Box>
                    </Box>
                </Box>
            </Grid>
        </Grid>
            {!loading && !showBoardForm && !boards?.length && (
              <Box>
                  <NoRecords message="No Boards found! Please add"/>
                  <Box mt={5} textAlign="center">
                      <Button
                          variant="outlined"
                          color="default"
                          startIcon={<AddIcon color="primary"/>}
                          onClick={() => handleCreateNewBoard()}
                      >
                          <Typography color="primary" variant="body1" >Create New Board</Typography>
                      </Button>
                  </Box>
              </Box>
            )}
              {showBoardForm ? <CreateBoard />: null}
              {!showBoardForm && <List>
                <Grid container spacing={2}>
                    {boards?.length ? boards.map((b: {[Key: string]: any}, index: number) => (
                    <Grid key={b?._id} item xl={4} lg={4} md={6} sm={6} xs={12}>
                        <Card className={cardStyle}>
                            <CardHeader
                                avatar={<DashboardIcon style={{background: getRandomColor()}} className={avatarBoxStyle}  color="secondary" />}
                                action={renderCardAction(b)}
                                title={renderCardTitle(b)}
                                subheader={renderCardSubTitle(b)}
                            />
                            <CardContent>
                                {renderCardContent(b, index)}
                                <Box ml={2} mb={1}>
                                  {renderCardActions(b)}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>)): null}
                </Grid>
            </List>}
        </React.Fragment>
    )
}

export default BoardList;
