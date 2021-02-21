import React, { useEffect, useState } from "react";
import { Theme, makeStyles } from '@material-ui/core/styles';
import { useDepartment, useDepartmentLoading } from "../../redux/state/department"
import { useOrganization, useOrganizationLoading } from "../../redux/state/organization"

import AddIcon from '@material-ui/icons/Add';
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid'
import Hidden from '@material-ui/core/Hidden'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography';
import { deleteDepartment } from "../../redux/actions/department";
import { getOrganizationDetails } from '../../redux/actions/organization';
import { useDispatch } from "react-redux";
import { useLogin } from "../../redux/state/login";

const DepartmentList = React.lazy(() => import("./List"));
const NoRecords = React.lazy(() => import("../NoRecords"));
const UpdateDepartment = React.lazy(() => import("./Update"));
const ResponsiveDialog = React.lazy(() => import("../Dialog"));
const Loader = React.lazy(() => import("../Loader/components"));

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        minHeight: "90vh"
    },
    buttonStyle: {
        textAlign: "end",
        [theme.breakpoints.down('xs')]: {
            textAlign: "center",
            width: "100%"
        },
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
}));

const DepartmentDashboard = () => {
    const { root, countStyle, countTextStyle, buttonStyle } = useStyles();
    const dispatch = useDispatch();
    const { organizationId } = useLogin();

    /* Redux shared states */
    const { department } = useDepartment();
    const { organization, departments: departmentsList, totalDepartments: totalDepartmentsCount } = useOrganization();
    const { loading } = useDepartmentLoading();
    const { loading: organizationloading } = useOrganizationLoading();
    
    /* React states */
    const [departments, setDepartments] = useState<Array<{[Key: string]: any}>>([]);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedDepartment, setSelectedDepartment] = useState<{[Key: string]: any}>({});
    const [showDepartmentForm, setShowDepartmentForm] = useState(false);
    const [totalDepartments, setTotalDepartments] = useState(totalDepartmentsCount);
    // const [open, setOpen] = React.useState(false);
    
    /* React Hooks */
    useEffect(() => {
      dispatch(getOrganizationDetails(organizationId));
    }, []);

    useEffect(() => {
        if(!loading && !department?._id){
          // setShowError(true);
        }

        if(!loading && department?.deleted){
            const departmentsList = departments.filter((d: {[Key: string]: any}) => d._id !== selectedDepartment._id);
            setDepartments(departmentsList);
            setSelectedDepartment({});
            handleClose();
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
    
    /* Handler functions */
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

      const handleCreateNewDepartment = () => {
        setShowDepartmentForm(true);
      }

      const handleMenu = async (event: React.MouseEvent<HTMLDivElement | MouseEvent>, val: string) => {
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
      }

      const handleClose = () => {
        setOpenDeleteDialog(false);
      }

      const renderDeleteDialog = () => {
        return (
          <Box>
            <ResponsiveDialog open={openDeleteDialog} title="Delete Note" pcta="Delete" scta="Cancel" handleSave={handleDelete} handleClose={handleClose}>
              <Typography variant="h4"> Are you sure you want to delete {selectedDepartment?.title}?</Typography>
            </ResponsiveDialog>
          </Box>
        )
    }

    const handleDelete = () => {
        dispatch(deleteDepartment(selectedDepartment._id));
        setOpenDeleteDialog(false);
    }
      
    return (
        <React.Fragment>
            {renderDeleteDialog()}
            <Loader backdrop={true} enable={organizationloading} />
            <Box className={root}>
                <Container disableGutters>
                    <Box py={2}>
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
                    <Box>
                      <DepartmentList departments={departments} handleMenu={handleMenu} setSelectedDepartment={setSelectedDepartment} />
                    </Box>
                </Container>
            </Box>
        </React.Fragment>
    )
}

export default DepartmentDashboard;
