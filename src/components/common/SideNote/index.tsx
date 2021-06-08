import Box from "@material-ui/core/Box";
import CallMadeOutlinedIcon from "@material-ui/icons/CallMadeOutlined";
import Link from "@material-ui/core/Link";
import React from "react";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../styles";
const SideNote = React.memo((props: any) => {
  const { title, description, showLink, link, linkURL } = props;
  const { n30, sideNoteStyle, sideNoteTitleStyle } = useStyles();

  const handleLink = () => {
    const win: any = window.open(linkURL, "_blank");
    win.focus();
  };

  return (
    <Box className={`${sideNoteStyle} ${n30}`}>
      <Box mb={2}>
        <Typography variant="h5" className={sideNoteTitleStyle}>
          {title?.toUpperCase()}
        </Typography>
      </Box>
      <Box mb={2}>
        <Typography component="p" variant="h5">
          {description}
        </Typography>
      </Box>

      {showLink && (
        <Link component="button" onClick={() => handleLink()}>
          <Box display="flex">
            <Box mr={0.4}>{link}</Box>
            <Box mt={-0.2}>
              <CallMadeOutlinedIcon style={{ fontSize: 15 }} />
            </Box>
          </Box>
        </Link>
      )}
    </Box>
  );
});

export default SideNote;
