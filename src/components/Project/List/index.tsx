import ArrowForwardOutlinedIcon from "@material-ui/icons/ArrowForwardOutlined";
import AvatarGroupList from "../../common/AvatarGroupList";
import { BOARDS } from "../../../routes/config";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Divider from "@material-ui/core/Divider";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import ListSkeleton from "../../common/skeletons/list";
import Menu from "@material-ui/core/Menu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ProjectOutlinedIcon from "@material-ui/icons/AccountTreeOutlined";
import React from "react";
import SummaryField from "../../common/SummaryField";
import { Suspense } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { addProjectToStore } from "../../../redux/actions/project";
import formateNumber from "../../../util/formateNumber";
import getCardSubHeaderText from "../../../util/getCardSubHeaderText";
import getRandomBGColor from "../../../util/getRandomColor";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useProjectLoading } from "../../../redux/state/project";
import useStyles from "../../styles";

const ProjectList = (props: any) => {
  const { projects, handleMenu, setSelectedProject, hideMenu } = props;
  const { cursor, boxMainStyle, avatarBoxStyle } = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  /* Redux hooks */
  const { loading } = useProjectLoading();

  /* Local state */
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [showMoreIndex, setShowMoreIndex] = React.useState(0);
  const [showMore, setShowMore] = React.useState(false);

  /* Handler functions */
  const renderCardAction = (project: { [Key: string]: any }) => {
    return !hideMenu ? (
      <Box>
        <Tooltip arrow title="Update">
          <IconButton
            color="primary"
            size="small"
            aria-label="settings"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handleButton(event, project)
            }
          >
            <Zoom in={true} timeout={2000}>
              <MoreHorizIcon />
            </Zoom>
          </IconButton>
        </Tooltip>
        {renderMenu()}
      </Box>
    ) : null;
  };

  const handleButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    project: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    setOpen(!open);
    setAnchorEl(event.currentTarget);
    if (typeof setSelectedProject === "function") {
      setSelectedProject(project);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuItem = (
    event: React.MouseEvent<HTMLDivElement | MouseEvent>,
    action: string
  ) => {
    event.stopPropagation();
    handleMenu(event, action);
    setOpen(false);
  };

  const handleClickAwayClose = (
    event: React.MouseEvent<Document, MouseEvent>
  ) => {
    event.stopPropagation();
    setAnchorEl(null);
    setOpen(false);
  };

  const renderMenu = () => {
    return (
      <ClickAwayListener onClickAway={handleClickAwayClose}>
        <Menu
          id="fade-menu"
          open={open}
          onClose={handleClose}
          anchorEl={anchorEl}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          keepMounted
          getContentAnchorEl={null}
          TransitionComponent={Zoom}
          onClick={(event: React.MouseEvent<HTMLDivElement | MouseEvent>) =>
            event.stopPropagation()
          }
        >
          <ListItem
            button={true}
            onClick={(event: React.MouseEvent<HTMLDivElement | MouseEvent>) =>
              handleMenuItem(event, "edit")
            }
          >
            <ListItemAvatar style={{ minWidth: 35 }}>
              <EditIcon />
            </ListItemAvatar>
            <ListItemText
              primary={<b>Edit Project</b>}
              secondary="Update project"
            />
          </ListItem>
          <ListItem
            button={true}
            onClick={(event: React.MouseEvent<HTMLDivElement | MouseEvent>) =>
              handleMenuItem(event, "delete")
            }
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
      </ClickAwayListener>
    );
  };

  const handleShowMore = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.stopPropagation();
    setShowMoreIndex(index);
    setShowMore(!showMore);
  };

  const renderSecondaryText = (message: string, index: number) => {
    if (!message) {
      return null;
    }
    return (
      <Box display="flex">
        <Typography variant="subtitle1">
          {!showMore && message && message?.length > 70
            ? message.slice(0, 70)
            : message}
          {message.length > 70 && index === showMoreIndex ? (
            <span
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                handleShowMore(event, index)
              }
              className={cursor}
              style={{ fontWeight: 300 }}
            >
              {showMore && showMoreIndex === index
                ? " see less"
                : " ...see more"}
            </span>
          ) : null}
        </Typography>
      </Box>
    );
  };

  const handleCard = (
    event: React.MouseEvent<HTMLDivElement>,
    project: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    dispatch(addProjectToStore(project));
    history.push(BOARDS);
  };

  const viewProject = (
    event: React.MouseEvent<HTMLButtonElement>,
    project: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    history.push(BOARDS);
  };

  const renderCardActions = (
    project: { [Key: string]: any },
    index: number
  ) => {
    return (
      <>
        <AvatarGroupList
          dataList={project?.boards}
          keyName="name"
          noDataMessage=" "
        />
        <Box display="flex">
          <Box mt={0.5}>
            <Typography variant="h6">
              {formateNumber(project?.totalBoards) || 0}{" "}
              {project?.totalBoards > 1 ? "Boards" : "Board"}
            </Typography>
          </Box>
          <Box ml={4} mt={0.5}>
            <Tooltip title="View Project" arrow>
              <IconButton
                onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                  viewProject(event, project)
                }
                size="small"
              >
                {" "}
                <ArrowForwardOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </>
    );
  };

  const renderCardContent = (
    project: { [Key: string]: any },
    index: number
  ) => {
    return (
      <Box>
        <SummaryField
          title="Description"
          value={renderSecondaryText(project.description || "--", index)}
        />
      </Box>
    );
  };

  return (
    <Suspense fallback={<ListSkeleton />}>
      {loading && <ListSkeleton />}
      <Grid container spacing={2}>
        {!loading && Array.isArray(projects)
          ? projects.map((project: { [Key: string]: any }, index: number) => (
              <Grid
                key={project?._id}
                item
                xl={3}
                lg={3}
                md={6}
                sm={12}
                xs={12}
              >
                <Card
                  className={`${boxMainStyle} ${cursor}`}
                  onClick={(event: React.MouseEvent<HTMLDivElement>) =>
                    handleCard(event, project)
                  }
                >
                  <CardHeader
                    avatar={
                      <ProjectOutlinedIcon
                        className={`${avatarBoxStyle}`}
                        color="secondary"
                        style={{ background: getRandomBGColor(index) }}
                      />
                    }
                    action={renderCardAction(project)}
                    title={project?.name}
                    subheader={getCardSubHeaderText(project.createdAt)}
                  />
                  <CardContent>{renderCardContent(project, index)}</CardContent>
                  <Box my={1}>
                    <Divider />
                  </Box>
                  <CardActions style={{ justifyContent: "space-between" }}>
                    {renderCardActions(project, index)}
                  </CardActions>
                </Card>
              </Grid>
            ))
          : null}
      </Grid>
    </Suspense>
  );
};

export default ProjectList;
