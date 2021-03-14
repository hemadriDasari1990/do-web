import React, { Suspense, useEffect, useState } from "react";
import {
  useDepartment,
  useDepartmentLoading,
} from "../../redux/state/department";

import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import { DASHBOARD } from "../../routes/config";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { deleteDepartment } from "../../redux/actions/department";
import { getOrganizationDetails } from "../../redux/actions/organization";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useLogin } from "../../redux/state/login";
import { useOrganization } from "../../redux/state/organization";
import useStyles from "../styles";

const DepartmentList = React.lazy(() => import("./List"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const UpdateDepartment = React.lazy(() => import("./Update"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const Loader = React.lazy(() => import("../Loader/components"));

const DepartmentDashboard = () => {
  const {
    root,
    countStyle,
    countTextStyle,
    buttonStyle,
    iconBackStyle,
  } = useStyles();
  const dispatch = useDispatch();
  const { organizationId } = useLogin();
  const history = useHistory();

  /* Redux shared states */
  const { department } = useDepartment();
  const {
    organization,
    departments: departmentsList,
    totalDepartments: totalDepartmentsCount,
  } = useOrganization();
  const { loading } = useDepartmentLoading();

  /* React states */
  const [departments, setDepartments] = useState<Array<{ [Key: string]: any }>>(
    []
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<{
    [Key: string]: any;
  }>({});
  const [showDepartmentForm, setShowDepartmentForm] = useState(false);
  const [totalDepartments, setTotalDepartments] = useState(
    totalDepartmentsCount
  );
  // const [open, setOpen] = React.useState(false);

  /* React Hooks */
  useEffect(() => {
    dispatch(getOrganizationDetails(organizationId));
  }, []);

  useEffect(() => {
    if (!loading && !department?._id) {
      // setShowError(true);
    }

    if (!loading && department?.deleted) {
      const departmentsList = departments.filter(
        (d: { [Key: string]: any }) => d._id !== selectedDepartment._id
      );
      setDepartments(departmentsList);
      setSelectedDepartment({});
      handleClose();
    }

    if (!loading && department?._id) {
      const departmentsList = [...departments];
      const departmentIndex = departmentsList.findIndex(
        (d: { [Key: string]: any }) => d._id === department._id
      );
      const departmentData = departments[departmentIndex];
      if (departmentData) {
        departmentData.title = department.title;
        departmentData.description = department.description;
        departmentsList[departmentIndex] = departmentData;
        setDepartments(departmentsList);
      } else {
        setDepartments((currentDepartments: Array<{ [Key: string]: any }>) => [
          ...currentDepartments,
          department,
        ]);
        setTotalDepartments(totalDepartments + 1);
      }
      setSelectedDepartment({});
      setShowDepartmentForm(false);
    }
  }, [loading, department]);

  useEffect(() => {
    if (departmentsList) {
      setShowDepartmentForm(false);
      setDepartments(departmentsList);
      setTotalDepartments(totalDepartmentsCount);
    }
  }, [departmentsList]);

  /* Handler functions */
  const renderCreateNewDepartment = () => {
    return (
      <>
        <Hidden only={["xs"]}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddOutlinedIcon color="secondary" />}
            onClick={() => handleCreateNewDepartment()}
          >
            <Typography color="secondary" variant="subtitle1">
              Create New Department
            </Typography>
          </Button>
        </Hidden>
        <Hidden only={["xl", "lg", "md", "sm"]}>
          <IconButton
            className={iconBackStyle}
            onClick={() => handleCreateNewDepartment()}
          >
            <AddOutlinedIcon color="primary" />
          </IconButton>
        </Hidden>
      </>
    );
  };

  const handleUpdateForm = () => {
    setShowDepartmentForm(false);
    handleClose();
  };

  const handleCreateNewDepartment = () => {
    setShowDepartmentForm(true);
  };

  const handleMenu = async (
    event: React.MouseEvent<HTMLDivElement | MouseEvent>,
    val: string
  ) => {
    event.stopPropagation();
    switch (val) {
      case "edit":
        setShowDepartmentForm(true);
        break;
      case "delete":
        setOpenDeleteDialog(true);
        break;
      default:
        break;
    }
  };

  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const renderDeleteDialog = () => {
    return (
      <Box>
        <ResponsiveDialog
          open={openDeleteDialog}
          title="Delete Note"
          pcta="Delete"
          scta="Cancel"
          handleSave={handleDelete}
          handleClose={handleClose}
          maxWidth={440}
        >
          <Typography variant="h4">
            {" "}
            Are you sure you want to delete {selectedDepartment?.title}?
          </Typography>
        </ResponsiveDialog>
      </Box>
    );
  };

  const handleDelete = () => {
    dispatch(deleteDepartment(selectedDepartment._id));
    setOpenDeleteDialog(false);
  };

  const handleBack = () => {
    history.push(DASHBOARD);
  };

  return (
    <Suspense fallback={<div></div>}>
      {renderDeleteDialog()}
      <Loader enable={loading} />
      <Box className={root}>
        <Box py={2}>
          <Grid container spacing={2}>
            <Grid item xl={8} lg={8} md={6} sm={6} xs={12}>
              <Box display="flex">
                <Hidden only={["xs"]}>
                  <Typography variant="h1">{organization?.title}</Typography>
                </Hidden>
                <Hidden only={["xl", "lg", "md", "sm"]}>
                  <Typography variant="h4">{organization?.title}</Typography>
                </Hidden>
                <Tooltip title="Total Departments">
                  <Box ml={2} className={countStyle}>
                    <Typography color="primary" className={countTextStyle}>
                      {totalDepartments}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={6} sm={6} xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Hidden only={["xl", "lg", "md"]}>
                  <IconButton
                    className={iconBackStyle}
                    onClick={() => handleBack()}
                  >
                    <KeyboardBackspaceOutlinedIcon color="primary" />
                  </IconButton>
                </Hidden>
                <Hidden only={["xs", "sm"]}>
                  <Box className={buttonStyle}>
                    <Button
                      variant="outlined"
                      color="default"
                      startIcon={
                        <KeyboardBackspaceOutlinedIcon color="primary" />
                      }
                      onClick={() => handleBack()}
                    >
                      <Typography color="primary" variant="subtitle1">
                        Go Back to Dashboard
                      </Typography>
                    </Button>
                  </Box>
                </Hidden>
                {departments?.length ? (
                  <Box className={buttonStyle}>
                    {renderCreateNewDepartment()}
                  </Box>
                ) : null}
              </Box>
            </Grid>
          </Grid>
        </Box>
        {!loading && (!departments || !departments?.length) && (
          <Box mt={10}>
            <NoRecords message="No Departments found! Please add" />
            <Box mt={5} textAlign="center">
              {renderCreateNewDepartment()}
            </Box>
          </Box>
        )}
        <UpdateDepartment
          selectedDepartment={selectedDepartment}
          openDialog={showDepartmentForm}
          handleUpdateForm={handleUpdateForm}
        />
        <Box>
          <DepartmentList
            departments={departments}
            handleMenu={handleMenu}
            setSelectedDepartment={setSelectedDepartment}
          />
        </Box>
      </Box>
    </Suspense>
  );
};

export default DepartmentDashboard;
