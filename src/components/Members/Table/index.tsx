import {
  Box,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Data, Order, TableProps } from "./types";
import React, { useEffect, useState } from "react";
import {
  Theme,
  createStyles,
  makeStyles,
  useTheme,
} from "@material-ui/core/styles";

import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";
import Button from "@material-ui/core/Button";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import Header from "./header";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import NoRecords from "../../NoRecords";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import getCardSubHeaderText from "../../../util/getCardSubHeaderText";
import getRandomBGColor from "../../../util/getRandomColor";
import { useMember } from "../../../redux/state/member";
import useStyles from "../../styles/table";

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const DoTable = (props: TableProps & any) => {
  const {
    data,
    headerColumns,
    refreshData,
    loading,
    viewItem,
    handleMenu,
    handleChangeRowsPerPage,
    handleChangePage,
    rowsPerPage,
    page,
  } = props;
  const {
    tableCellStyle,
    iconButtonStyle,
    tableContainerStyle,
    tableBodyStyle,
    tableStyle,
    rowStyle,
    authorBoxStyle,
    authorStyle,
    avatarStyle,
    avatarGroupStyle,
  } = useStyles();
  const { totalMembers } = useMember();

  /* States */
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("name");
  const [updatedData, setUpdatedData] = useState<Array<Data>>(data);

  const handleRequestSort = (key: keyof Data) => {
    const newData = sortBy(key, updatedData);
    const isAsc = order === "asc";
    setUpdatedData(newData);
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(key);
  };

  const compareBy = (key: keyof Data) => {
    return (a: Data, b: Data) => {
      if (a[key] < b[key]) return order === "asc" ? -1 : 1;
      if (a[key] > b[key]) return order === "asc" ? 1 : -1;
      return 0;
    };
  };

  const sortBy = (key: keyof Data, list: any) => {
    let newData: Array<Data> = [...list];
    if (key === "createdAt") {
      newData = newData.sort((d1: Data, d2: Data) => {
        return (
          Number(new Date(d2[key]).getTime()) -
          Number(new Date(d1[key]).getTime())
        );
      });
      newData = order === "asc" ? newData?.reverse() : newData;
      return newData;
    }
    newData.sort(compareBy(key));
    return newData;
  };

  useEffect(() => {
    if (data && data.length) {
      setUpdatedData(data);
    }
    if (!data || !data.length) {
      setUpdatedData([]);
    }
  }, [data]);

  const handleViewItem = (item: { [Key: string]: any }) => {
    viewItem(item);
  };

  return (
    <TableContainer className={tableContainerStyle}>
      <Table
        aria-labeledby="tableTitle"
        aria-label="enahnced table"
        component="div"
        stickyHeader
        className={tableStyle}
      >
        <Header
          headerColumns={headerColumns}
          order={order}
          orderBy={orderBy}
          handleRequestSort={handleRequestSort}
          refreshData={refreshData}
        />
        <TableBody className={tableBodyStyle}>
          {loading && (
            <TableRow>
              <TableCell align="center" colSpan={9}></TableCell>
            </TableRow>
          )}
          {!loading &&
            (!updatedData ||
              !Array.isArray(updatedData) ||
              !updatedData.length) && (
              <TableRow>
                <TableCell align="center" colSpan={9}>
                  <NoRecords />
                </TableCell>
              </TableRow>
            )}
          {!loading &&
            updatedData &&
            updatedData.map((td: Data) => (
              <TableRow
                hover
                tabIndex={-1}
                key={td?._id}
                classes={{ root: rowStyle }}
              >
                <TableCell
                  align="left"
                  component="td"
                  scope="row"
                  padding="none"
                  colSpan={1}
                  size="small"
                >
                  <Button color="primary" onClick={() => handleViewItem(td)}>
                    <Box display="flex">
                      <Tooltip arrow title={`View ${td?.name}`}>
                        <Typography variant="h6">{td.name} </Typography>
                      </Tooltip>
                      {td.isAuthor && (
                        <Box ml={1} className={authorBoxStyle}>
                          <Typography
                            variant="h6"
                            className={authorStyle}
                            color="secondary"
                          >
                            Author
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </Button>
                </TableCell>

                <TableCell
                  className={tableCellStyle}
                  align="left"
                  component="td"
                  scope="row"
                  size="small"
                  // padding="none"
                  colSpan={1}
                >
                  {td?.email}
                </TableCell>
                <TableCell
                  className={tableCellStyle}
                  align="left"
                  component="td"
                  scope="row"
                  size="small"
                  // padding="none"
                  colSpan={1}
                >
                  {td?.status}
                </TableCell>
                <TableCell
                  className={tableCellStyle}
                  align="left"
                  component="td"
                  scope="row"
                  size="small"
                  // padding="none"
                  colSpan={1}
                >
                  {td?.isVerified ? "Yes" : "No"}
                </TableCell>

                <TableCell
                  className={tableCellStyle}
                  align="left"
                  component="td"
                  scope="row"
                  size="small"
                  // padding="none"
                  colSpan={1}
                >
                  {getCardSubHeaderText(td.createdAt) || "--"}
                </TableCell>
                <TableCell
                  className={tableCellStyle}
                  align="left"
                  component="td"
                  scope="row"
                  size="small"
                  // padding="none"
                  colSpan={1}
                >
                  {getCardSubHeaderText(td.updatedAt) || "--"}
                </TableCell>
                <TableCell
                  className={tableCellStyle}
                  align="left"
                  component="td"
                  scope="row"
                  size="small"
                  // padding="none"
                  colSpan={1}
                >
                  {/* {td?.totalTeams || 0 + " Teams"} */}
                  {td?.teams?.length ? (
                    <AvatarGroup
                      max={4}
                      classes={{ avatar: `${avatarStyle} ${avatarGroupStyle}` }}
                    >
                      {td?.teams?.map(
                        (team: { [Key: string]: any }, index: number) => (
                          <Avatar
                            key={team._id}
                            alt={team?.team?.name}
                            className={avatarStyle}
                            style={{ background: getRandomBGColor(index) }}
                          >
                            <Tooltip arrow title={team?.team?.name}>
                              <Typography variant="h6" color="secondary">
                                {team?.team?.name?.substring(0, 1) || ""}
                              </Typography>
                            </Tooltip>
                          </Avatar>
                        )
                      )}
                    </AvatarGroup>
                  ) : (
                    "No Team"
                  )}
                </TableCell>
                <TableCell
                  className={tableCellStyle}
                  align="left"
                  component="td"
                  scope="row"
                  size="small"
                  // padding="none"
                  colSpan={1}
                >
                  <Tooltip arrow title={`Actions`} placement="right">
                    <IconButton
                      size="small"
                      className={iconButtonStyle}
                      onClick={(event: React.MouseEvent<HTMLButtonElement>) =>
                        handleMenu(event, td)
                      }
                    >
                      <Zoom in={true} timeout={2000}>
                        <MoreVertOutlinedIcon />
                      </Zoom>
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell
                  className={tableCellStyle}
                  align="left"
                  component="td"
                  scope="row"
                  size="small"
                  padding="checkbox"
                  colSpan={1}
                >
                  <Tooltip arrow title={`View Team ${td?.name}`}>
                    <IconButton
                      size="small"
                      className={iconButtonStyle}
                      onClick={() => handleViewItem(td)}
                    >
                      <ArrowForwardIosOutlinedIcon
                        style={{ fontSize: "small" }}
                      />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[15, 25, 35, { label: "All", value: -1 }]}
              colSpan={9}
              count={totalMembers}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default DoTable;
