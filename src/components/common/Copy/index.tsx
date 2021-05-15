import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box } from "@material-ui/core";
import HintMessage from "../../HintMessage";
import FileCopyIcon from "@material-ui/icons/FileCopy";

const useStyles = makeStyles(() => ({
  boxStyle: {
    background: "#EBECF0",
    height: "100%",
    // borderRadius: 6,
    padding: "5px 10px 5px 10px",
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
  },
  copyButtonStyle: {
    padding: 5,
    height: "100%",
    background: "#57f",
    cursor: "pointer",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
  },
}));

const CopyToClipboard = (props: any) => {
  const { url, hintMessage } = props;
  const { boxStyle, copyButtonStyle } = useStyles();
  const [copied, setCopied] = React.useState(false);
  const hostName = `${process.env.REACT_APP_PROTOCOL as string}${
    process.env.REACT_APP_SERVER as string
  }:`;
  const handleCopy = () => {
    setCopied(!copied);
    navigator.clipboard.writeText(hostName + url);
  };

  return (
    <Box>
      <Box display="flex" mb={1} width="100%">
        <Box className={boxStyle} width="85%">
          <Typography
            variant="subtitle2"
            style={{ fontWeight: copied ? 600 : "normal" }}
          >
            {url?.length > 30 ? (hostName + url)?.slice(0, 30) + "..." : url}
          </Typography>
        </Box>
        <Box
          className={copyButtonStyle}
          width="15%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={() => handleCopy()}
        >
          <FileCopyIcon color="secondary" fontSize="small" />
        </Box>
      </Box>
      <Box>
        <HintMessage message={hintMessage} />
      </Box>
    </Box>
  );
};

export default CopyToClipboard;
