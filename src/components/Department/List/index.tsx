import ArchiveOutlinedIcon from "@material-ui/icons/ArchiveOutlined";
import Box from "@material-ui/core/Box";
import { DEPARTMENT_DASHBOARD } from "../../../routes/config";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import EditIcon from "@material-ui/icons/Edit";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import React, { Suspense } from "react";
import SportsVolleyballIcon from "@material-ui/icons/SportsVolleyball";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
// import formateNumber from "../../../util/formateNumber";
import getCardSubHeaderText from "../../../util/getCardSubHeaderText";
import { replaceStr } from "../../../util";
import { useDepartmentLoading } from "../../../redux/state/department";
import { useHistory } from "react-router";
import useStyles from "../../styles";
import AvatarGroupList from "../../common/AvatarGroupList";
import SummaryField from "../../common/SummaryField";
import SubjectOutlinedIcon from "@material-ui/icons/SubjectOutlined";
import ListSkeleton from "../../common/skeletons/list";

const DepartmentList = (props: any) => {
  const { departments, handleMenu, setSelectedDepartment } = props;
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
  const { loading } = useDepartmentLoading();

  /* Local state */
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [open, setOpen] = React.useState(false);
  const [showMoreIndex, setShowMoreIndex] = React.useState(0);
  const [showMore, setShowMore] = React.useState(false);

  /* Handler functions */
  const renderCardAction = (department: { [Key: string]: any }) => {
    return (
      <Box display="flex" mt={1}>
        <Box mt={0.5}>{getCardSubHeaderText(department.updatedAt)}</Box>
        <Tooltip arrow title="Action">
          <IconButton
            size="small"
            aria-label="settings"
            onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
              handleButton(event, department)
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
    department: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    setOpen(!open);
    setAnchorEl(event.currentTarget);
    setSelectedDepartment(department);
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
            primary={<b>Edit Department</b>}
            secondary="Update the department"
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
            primary={<b>Delete Department</b>}
            secondary="Once deleted can't be undone"
          />
        </ListItem>
        <ListItem
          button={true}
          onClick={(event: React.MouseEvent<HTMLDivElement | MouseEvent>) =>
            handleMenuItem(event, "archive")
          }
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
    );
  };

  const renderCardTitle = (department: { [Key: string]: any }) => {
    return (
      <Box
        mt={0.7}
        className={cursor}
        onClick={(event: React.MouseEvent<HTMLElement | MouseEvent>) =>
          handleCard(event, department)
        }
      >
        <Typography variant="h3" color="primary">
          {department?.title}
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
          {/* {showMore && message && showMoreIndex === index ? message : null}
              {showMore && message && showMoreIndex !== index
                ? message.slice(0, 200)
                : null} */}
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
    department: { [Key: string]: any },
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
              {renderSecondaryText(department?.description, index)}
            </Typography>
          </Zoom>
        </Box>
        <Box my={2} display="flex" justifyContent="space-between">
          <SummaryField
            title="Projects"
            value={
              <AvatarGroupList
                dataList={department?.projects}
                keyName="title"
                noDataMessage="No Projects"
              />
            }
          />
          <SummaryField
            title="Total Projects"
            value={department?.totalProjects || 0}
          />
        </Box>
      </Box>
    );
  };

  const handleCard = (
    event: React.MouseEvent<HTMLElement | MouseEvent>,
    department: { [Key: string]: any }
  ) => {
    event.stopPropagation();
    history.push(
      replaceStr(DEPARTMENT_DASHBOARD, ":departmentId", department?._id)
    );
  };

  return (
    <Suspense fallback={<ListSkeleton />}>
      {loading && <ListSkeleton />}
      <Grid container spacing={2}>
        {!loading && Array.isArray(departments)
          ? departments.map(
              (department: { [Key: string]: any }, index: number) => (
                <Grid
                  key={department?._id}
                  item
                  xl={3}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                >
                  <Box className={boxMainStyle}>
                    <Box
                      className={`${boxTopGridStyle}`}
                      // style={{ background: getRandomBGColor() }}
                    ></Box>
                    <Box className={boxGridStyle}>
                      <Box className={iconBoxStyle}>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          p={0.5}
                        >
                          <SportsVolleyballIcon
                            // style={{ background: getRandomBGColor() }}
                            className={avatarBoxStyle}
                            color="secondary"
                          />
                        </Box>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        {renderCardTitle(department)}
                        {renderCardAction(department)}
                      </Box>
                      <Box>
                        <Typography component="p">
                          {renderCardContent(department, index)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Grid>
              )
            )
          : null}
      </Grid>
    </Suspense>
  );
};

export default DepartmentList;
