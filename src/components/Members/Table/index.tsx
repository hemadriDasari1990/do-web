import {
  Box,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@material-ui/core";
import { Data, Order, TableProps } from "./types";
import React, { useEffect, useState } from "react";

import ArrowForwardIosOutlinedIcon from "@material-ui/icons/ArrowForwardIosOutlined";
import Button from "@material-ui/core/Button";
import Header from "./header";
import IconButton from "@material-ui/core/IconButton";
import MoreVertOutlinedIcon from "@material-ui/icons/MoreVertOutlined";
import NoRecords from "../../NoRecords";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import getCardSubHeaderText from "../../../util/getCardSubHeaderText";
import getRandomBGColor from "../../../util/getRandomColor";
import useStyles from "../../styles/table";
import Avatar from "@material-ui/core/Avatar";
import AvatarGroup from "@material-ui/lab/AvatarGroup";

const DoTable = (props: TableProps) => {
  const {
    data,
    headerColumns,
    refreshData,
    loading,
    viewItem,
    handleMenu,
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
                      <Tooltip title={`View ${td?.name}`}>
                        <Typography variant="h5">{td.name} </Typography>
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
                      {td?.teams?.map((team: { [Key: string]: any }) => (
                        <Avatar
                          key={team._id}
                          alt={team?.team?.name}
                          className={avatarStyle}
                          style={{ background: getRandomBGColor() }}
                        >
                          <Tooltip title={team?.team?.name}>
                            <Typography variant="h5">
                              {team?.team?.name?.substring(0, 1) || ""}
                            </Typography>
                          </Tooltip>
                        </Avatar>
                      ))}
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
                  <Tooltip title={`View Team ${td?.name}`}>
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
                  <Tooltip title={`View Team ${td?.name}`}>
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
      </Table>
    </TableContainer>
  );
};

export default DoTable;
