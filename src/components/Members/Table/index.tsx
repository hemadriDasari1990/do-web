import {
  Box,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Data, Order, TableProps } from "./types";
import { useEffect, useState } from "react";

import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroupList from "../../common/AvatarGroupList";
import Header from "./header";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "../../common/TablePaginationActions";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { getAvatar } from "../../../util/getAvatar";
import getCardSubHeaderText from "../../../util/getCardSubHeaderText";
import { getTeams } from "../../../util/member";
import { useMember } from "../../../redux/state/member";
import useStyles from "../../styles/table";

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
    authorStyle,
    avatarStyle,
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
                <TableCell
                  align="left"
                  component="td"
                  scope="row"
                  padding="none"
                  colSpan={1}
                  size="small"
                  style={{ paddingLeft: 17 }}
                >
                  <Tooltip arrow title={`View ${td?.name}`}>
                    <Box display="flex">
                      <Link
                        component="button"
                        variant="body2"
                        onClick={() => handleViewItem(td)}
                      >
                        {td.name}
                      </Link>
                      {td.isAuthor && (
                        <Box ml={1}>
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
                  </Tooltip>
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
                    <AvatarGroupList dataList={getTeams(td?.teams)} />
                  ) : (
                    "0 Teams"
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
                  <Avatar
                    src={getAvatar(td?.avatarId)}
                    className={avatarStyle}
                  ></Avatar>
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
                      disabled={true}
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
              count={totalMembers || 0}
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
