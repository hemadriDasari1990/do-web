import ArchiveOutlinedIcon from '@material-ui/icons/ArchiveOutlined';
import Box from '@material-ui/core/Box'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import { DEPARTMENT_DASHBOARD } from '../../../routes/config';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline'
import EditIcon from '@material-ui/icons/Edit';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import React from "react";
import SportsVolleyballIcon from '@material-ui/icons/SportsVolleyball';
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom'
import formateNumber from '../../../util/formateNumber'
import getCardSubHeaderText from '../../../util/getCardSubHeaderText'
import getRandomBGColor from "../../../util/getRandomColor";
import { makeStyles } from '@material-ui/core/styles';
import { replaceStr } from "../../../util";
import { useDepartmentLoading } from "../../../redux/state/department"
import { useHistory } from "react-router";

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
  boxTextStyle: {
    padding: "3px 10px 3px 10px"
  },
  boxStyle: {
    backgroundColor: "aliceblue",
    borderRadius: 6
  },
}));

const DepartmentList = (props: any) => {
  const { departments, handleMenu, setSelectedDepartment } = props;
    const { cursor, cardStyle, avatarBoxStyle, boxStyle, boxTextStyle } = useStyles();
    const history = useHistory();
    
    /* Redux hooks */
    const { loading } = useDepartmentLoading();
    
    /* Redux hooks */

    /* Local state */
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const [open, setOpen] = React.useState(false);
    const [showMoreIndex, setShowMoreIndex] = React.useState(0);
    const [showMore, setShowMore] = React.useState(false);

    /* React Hooks */

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

      const handleMenuItem = (event: React.MouseEvent<HTMLDivElement | MouseEvent>, action: string) => {
        handleMenu(event, action);
        setOpen(false);
      }

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
            <ListItem
              button={true}
              onClick={(event: React.MouseEvent<HTMLDivElement | MouseEvent>) => handleMenuItem(event, 'archive')}
            >
              <ListItemAvatar style={{ minWidth: 35 }}>
                <ArchiveOutlinedIcon />
              </ListItemAvatar>
              <ListItemText
                primary={<b>Archive Department</b>}
                secondary="You've control to make it unarchive any time"
              />
            </ListItem>
          </Menu>
        )
      }

      const renderCardTitle = (department: {[Key: string]: any}) => {
        return <Box mt={0.7} className={cursor} onClick={(event: React.MouseEvent<HTMLElement | MouseEvent>) => handleCard(event, department)}>
                <Typography variant="h5">{department?.title}</Typography>
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
      
    return (
        <React.Fragment>
          <List>
              <Grid container spacing={2}>
                {!loading && Array.isArray(departments) ? departments.map((department: {[Key: string]: any}, index: number) => (
                  <Grid key={department?._id} item xl={4} lg={4} md={6} sm={6} xs={12}>
                    <Card className={cardStyle}>
                      <CardHeader
                        avatar={<SportsVolleyballIcon style={{background: getRandomBGColor()}} className={avatarBoxStyle} color="secondary" />}
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
