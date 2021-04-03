import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import TextField from "@material-ui/core/TextField";
import useSearchStyles from "../../styles/search";

export default function DoSearch(props: any) {
  const { placeHolder, handleSearch } = props;
  const { searchRootStyle, searchIconStyle, inputStyle } = useSearchStyles();
  const [queryString, setQueryString] = useState("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setQueryString(event.target.value);
    handleSearch(event.target.value);
  };

  return (
    <label className={searchRootStyle}>
      <SearchIcon className={searchIconStyle} />
      <TextField
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
        fullWidth
        value={queryString}
        InputProps={{
          disableUnderline: true,
          classes: { input: inputStyle },
        }}
        placeholder={placeHolder || "Search by name"}
      />
    </label>
  );
}
