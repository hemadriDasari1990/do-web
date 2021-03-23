import { Data, HeaderColumn, TableHeader } from "./types";
import React, { useEffect, useState } from "react";

// import ArrowDown from "@material-ui/icons/ArrowDownwardOutlined";
import ArrowUp from "@material-ui/icons/ArrowUpwardOutlined";
// import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import RefreshOutlinedIcon from "@material-ui/icons/RefreshOutlined";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  iconStyle: {
    fill: "#1e1e58",
  },
  sortIconStyle: {
    fill: "#1e1e58",
    marginLeft: 20,
    height: 15,
    width: 15,
  },
  tableColumnStyle: {},
  rowStyle: {
    borderRadius: 6,
  },
}));

const DoTableHeader = (props: TableHeader) => {
  const { iconStyle, sortIconStyle, tableColumnStyle, rowStyle } = useStyles();
  const {
    order,
    orderBy,
    headerColumns,
    refreshData,
    handleRequestSort,
  } = props;

  /* React States */
  const [selectedKey, setSelectedKey] = useState("");

  const arrowUpIcon = () => <ArrowUp className={sortIconStyle} />;
  const arrowDownIcon = () => <ArrowUp className={sortIconStyle} />;

  const handleColumn = (key: keyof Data) => {
    handleRequestSort(key);
    setSelectedKey(key);
  };

  useEffect(() => {}, []);

  const handleRefresh = () => {
    refreshData();
  };
  console.log("selectedKey", order, selectedKey);
  return (
    <TableHead>
      <TableRow className={rowStyle}>
        {headerColumns.map((hc: HeaderColumn) => (
          <TableCell
            key={hc?.id}
            align="left"
            component="th"
            scope="row"
            sortDirection={orderBy === hc.title ? order : false}
            aria-controls={hc.key}
            aria-haspopup="true"
            className={tableColumnStyle}
          >
            <TableSortLabel
              active={orderBy === hc.key}
              direction={orderBy === hc.key ? order : "asc"}
              onClick={() => handleColumn(hc.key)}
              IconComponent={
                order === "desc" && selectedKey === hc.key
                  ? arrowUpIcon
                  : arrowDownIcon
              }
            >
              <Typography variant="h5">{hc.title}</Typography>
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          className={tableColumnStyle}
          align="left"
          component="th"
          scope="row"
        >
          <Tooltip arrow title="Team Members">
            <Typography variant="h5">Members</Typography>
          </Tooltip>
        </TableCell>
        <TableCell
          className={tableColumnStyle}
          align="left"
          component="th"
          scope="row"
        >
          <Tooltip arrow title="Actions">
            <Typography variant="h5">Actions</Typography>
          </Tooltip>
        </TableCell>
        <TableCell
          className={tableColumnStyle}
          align="left"
          component="th"
          scope="row"
          padding="checkbox"
        >
          <Tooltip arrow title="Refresh Teams">
            <IconButton onClick={() => handleRefresh()}>
              <RefreshOutlinedIcon className={iconStyle} />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default DoTableHeader;
