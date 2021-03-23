import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import { Theme, createStyles, makeStyles } from "@material-ui/core/styles";

import { FormHelperText } from "@material-ui/core";
import React from "react";
import TextField from "@material-ui/core/TextField";

// import { toTitleCase } from "../../../util";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 500,
      "& > * + *": {
        marginTop: theme.spacing(3),
      },
    },
  })
);

export default function DoAutoComplete(props: any) {
  const {
    options,
    optionKey,
    defaultValue,
    textInputLabel,
    onInputChange,
    multiple,
    isFreeSolo,
    // maxAllowed,
    disabled,
    helperText,
    error,
    textInputPlaceholder,
    customClass,
    ...rest
  } = props;
  const classes = useStyles();
  const filter = createFilterOptions();
  return (
    <div className={classes.root}>
      <Autocomplete
        {...rest}
        multiple={multiple}
        limitTags={2}
        id="multiple-limit-tags"
        options={options}
        // fullWidth
        freeSolo={isFreeSolo}
        disabled={disabled}
        closeIcon={null}
        getOptionLabel={(option: any) => {
          // value selected with the enter, right from the input
          if (typeof option === "string") {
            return option;
          }
          // Regular option
          return option[optionKey as string];
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          if (isFreeSolo) {
            if (params?.inputValue !== "") {
              filtered.push({
                inputValue: params.inputValue,
                title: `${params.inputValue}`,
              });
            }
            return filtered;
          }
          return filtered;
        }}
        defaultValue={
          multiple
            ? Array.isArray(defaultValue)
              ? defaultValue
              : []
            : defaultValue
        }
        filterSelectedOptions
        onChange={onInputChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={textInputLabel}
            placeholder={textInputPlaceholder}
            disabled={disabled}
            className={customClass}
            fullWidth
          />
        )}
        clearOnBlur
        handleHomeEndKeys
        selectOnFocus
      />
      {error && helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </div>
  );
}

DoAutoComplete.defaultProps = {
  options: [],
  textInputLabel: "Select Item",
  onInputChange: () => {},
  multiple: false,
  defaultValue: "",
  error: false,
  helperText: "",
  isFreeSolo: false,
  disabled: false,
  optionKey: "",
  textInputPlaceholder: "Items",
};
