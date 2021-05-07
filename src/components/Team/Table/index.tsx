import { Data, Order, TableProps } from "./types";
import { TableCell, TableContainer, TableRow } from "@material-ui/core";
import { useEffect, useState } from "react";

import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import AvatarGroupList from "../../common/AvatarGroupList";
import Box from "@material-ui/core/Box";
import Header from "./header";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "../../common/TablePaginationActions";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import getCardSubHeaderText from "../../../util/getCardSubHeaderText";
import { getTeamMembers } from "../../../util/member";
import useStyles from "../../styles/table";

const DoTable = (props: TableProps & any) => {
  const {
    data,
    headerColumns,
    refreshData,
    loading,
    viewItem,
    handleMenu,
    handleAddMember,
    handleChangeRowsPerPage,
    handleChangePage,
    rowsPerPage,
    page,
    totalCount,
  } = props;
  const {
    tableCellStyle,
    iconButtonStyle,
    tableContainerStyle,
    tableBodyStyle,
    tableStyle,
    rowStyle,
  } = useStyles();

  /* States */
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<keyof Data>("_id");
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
          {/* {loading && (
            <TableRow>
              <TableCell align="center" colSpan={9}></TableCell>
            </TableRow>
          )} */}
          {!loading &&
            (!updatedData ||
              !Array.isArray(updatedData) ||
              !updatedData.length) && (
              <TableRow>
                <TableCell
                  align="center"
                  component="td"
                  scope="row"
                  padding="none"
                  size="medium"
                  colSpan={9}
                >
                  No records found
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
                <Tooltip arrow title={`View ${td?.name}`}>
                  <TableCell
                    align="left"
                    component="td"
                    scope="row"
                    padding="none"
                    colSpan={1}
                    size="small"
                    style={{ paddingLeft: 20 }}
                  >
                    <Link
                      component="button"
                      variant="body2"
                      onClick={() => handleViewItem(td)}
                    >
                      {td.name}
                    </Link>
                  </TableCell>
                </Tooltip>

                <TableCell
                  className={tableCellStyle}
                  align="left"
                  component="td"
                  scope="row"
                  size="small"
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
                  colSpan={1}
                >
                  {td.totalBoards || 0 + " Boards"}
                </TableCell>
                <TableCell
                  className={tableCellStyle}
                  align="left"
                  component="td"
                  scope="row"
                  size="small"
                  colSpan={1}
                >
                  {td.totalMembers || 0 + " Members"}
                </TableCell>
                <TableCell
                  className={tableCellStyle}
                  align="left"
                  component="td"
                  scope="row"
                  size="small"
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
                  colSpan={1}
                >
                  {td?.members?.length ? (
                    <AvatarGroupList dataList={getTeamMembers(td?.members)} />
                  ) : (
                    "No Members"
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
                  <Box display="flex">
                    <Box>
                      <Tooltip arrow title={`Actions`} placement="left">
                        <IconButton
                          size="small"
                          className={iconButtonStyle}
                          onClick={(
                            event: React.MouseEvent<HTMLButtonElement>
                          ) => handleMenu(event, td)}
                        >
                          <Zoom in={true} timeout={2000}>
                            <MoreVertOutlinedIcon />
                          </Zoom>
                        </IconButton>
                      </Tooltip>
                    </Box>
                    <Box>
                      <Tooltip arrow title={`Add Member`} placement="right">
                        <IconButton
                          size="small"
                          className={iconButtonStyle}
                          onClick={(
                            event: React.MouseEvent<HTMLButtonElement>
                          ) => handleAddMember(td)}
                        >
                          <Zoom in={true} timeout={2000}>
                            <PersonAddOutlinedIcon />
                          </Zoom>
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>
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
              count={totalCount || 0}
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
