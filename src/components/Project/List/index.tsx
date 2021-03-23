import AssignmentIcon from "@material-ui/icons/Assignment";
import Box from "@material-ui/core/Box";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { PROJECT_DASHBOARD } from "../../../routes/config";
import React, { Suspense } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import formateNumber from "../../../util/formateNumber";
import getCardSubHeaderText from "../../../util/getCardSubHeaderText";
import { replaceStr } from "../../../util";
import { useHistory } from "react-router";
import { useProjectLoading } from "../../../redux/state/project";
import useStyles from "../../styles";
import AvatarGroupList from "../../common/AvatarGroupList";
import SummaryField from "../../common/SummaryField";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";
import ListSkeleton from "../../common/skeletons/list";

const ProjectList = (props: any) => {
  const { projects, handleMenu, setSelectedProject } = props;
  const {
    cursor,
    avatarBoxStyle,
    boxMainStyle,
    boxGridStyle,
    boxTopGridStyle,
    iconBoxStyle,
  } = useStyles();
  const history = useHistory();

  /* Redux hooks */
  const { loading } = useProjectLoading();

  /* Local state */
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [showMoreIndex, setShowMoreIndex] = React.useState(0);
  const [showMore, setShowMore] = React.useState(false);

  /* Handler functions */
  const renderCardAction = (project: { [Key: string]: any }) => {
    return (
      <Box display="flex" mt={1}>
        <Box mt={0.5}>{getCardSubHeaderText(project.updatedAt)}</Box>
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
    );
  };

  const handleButton = (
    event: React.MouseEvent<HTMLButtonElement>,
    project: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    setOpen(!open);
    setAnchorEl(event.currentTarget);
    setSelectedProject(project);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMenuItem = (
    event: React.MouseEvent<HTMLDivElement | MouseEvent>,
    action: string
  ) => {
    handleMenu(event, action);
    setOpen(false);
  };

  const renderMenu = () => {
    return (
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
    );
  };

  const renderCardTitle = (project: { [Key: string]: any }) => {
    return (
      <Box mt={0.7} className={cursor} onClick={() => handleCard(project)}>
        <Typography variant="h3" color="primary">
          {project?.title}
        </Typography>
      </Box>
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
        <Typography component="p" variant="body2">
          {!showMore && message && message?.length > 70
            ? message.slice(0, 70)
            : message}
          {message.length > 70 ? (
            <span
              onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                handleShowMore(event, index)
              }
              className={cursor}
            >
              {showMore && showMoreIndex === index
                ? " Show Less"
                : "... Show More"}
            </span>
          ) : null}
        </Typography>
      </Box>
    );
  };

  const renderCardContent = (
    project: { [Key: string]: any },
    index: number
  ) => {
    return (
      <Box minHeight={50}>
        <Box my={2} display="flex">
          <Box mr={2}>
            <SubjectOutlinedIcon />
          </Box>
          <Zoom in={true} timeout={2000}>
            <Typography>
              {renderSecondaryText(project?.description, index)}
            </Typography>
          </Zoom>
        </Box>
        <Box my={2} display="flex" justifyContent="space-between">
          <SummaryField
            title="Boards"
            value={
              <AvatarGroupList
                dataList={project?.boards}
                keyName="title"
                noDataMessage="No Boards"
              />
            }
          />
          <SummaryField
            title="Total Boards"
            value={formateNumber(project?.totalBoards || 0)}
          />
        </Box>
      </Box>
    );
  };

  const handleCard = (project: { [Key: string]: any }) => {
    history.push(replaceStr(PROJECT_DASHBOARD, ":projectId", project?._id));
  };

  return (
    <Suspense fallback={<ListSkeleton />}>
      {loading && <ListSkeleton />}
      <Grid container spacing={2}>
        {!loading && Array.isArray(projects)
          ? projects.map((project: { [Key: string]: any }, index: number) => (
              <Grid key={project?._id} item xl={3} lg={3} md={4} sm={6} xs={12}>
                <Box className={boxMainStyle}>
                  <Box className={`${boxTopGridStyle}`}></Box>
                  <Box className={boxGridStyle}>
                    <Box className={iconBoxStyle}>
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        p={0.5}
                      >
                        <AssignmentIcon
                          className={avatarBoxStyle}
                          color="secondary"
                        />
                      </Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between">
                      {renderCardTitle(project)}
                      {renderCardAction(project)}
                    </Box>
                    <Box>
                      <Typography component="p">
                        {renderCardContent(project, index)}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Grid>
            ))
          : null}
      </Grid>
    </Suspense>
  );
};

export default ProjectList;
