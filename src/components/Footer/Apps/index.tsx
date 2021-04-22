import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Container from "@material-ui/core/Container";
import GetAppIcon from "@material-ui/icons/GetApp";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import chromeIcon from "../../../assets/chrome.png";
import desktopIcon from "../../../assets/desktop.svg";
import edgeIcon from "../../../assets/edge.png";
import firefoxIcon from "../../../assets/firefox.png";
import { makeStyles } from "@material-ui/core/styles";
import mobileIcon from "../../../assets/mobile.svg";
import safariIcon from "../../../assets/safari.png";
import useStyles from "../../styles";
import webIcon from "../../../assets/web.svg";

const useLocalStyles = makeStyles({
  greenStyle: {
    color: "#27ae60",
  },
  redStyle: {
    color: "#fd7171",
  },
  titleStyle: {
    fontWeight: 700,
  },
});

export default function Apps() {
  const { greenStyle, redStyle, titleStyle } = useLocalStyles();
  const {} = useStyles();

  const handleChrome = () => {
    const win: any = window.open(
      process.env.REACT_APP_CHROME_DOWNLOAD_URL,
      "_blank"
    );
    win.focus();
  };

  const handleFirefox = () => {
    const win: any = window.open(
      process.env.REACT_APP_FIREFOX_DOWNLOAD_URL,
      "_blank"
    );
    win.focus();
  };

  const handleEdge = () => {
    const win: any = window.open(
      process.env.REACT_APP_EDGE_DOWNLOAD_URL,
      "_blank"
    );
    win.focus();
  };

  const handleSafari = () => {
    const win: any = window.open(
      process.env.REACT_APP_SAFARI_DOWNLOAD_URL,
      "_blank"
    );
    win.focus();
  };

  return (
    <React.Fragment>
      <Container>
        <Box mt={5} textAlign="center">
          <Typography variant="h1">
            Lets do retro works seamlessly on web.
          </Typography>
        </Box>
        <Box my={7}>
          <Grid container spacing={2}>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
              <Box textAlign="center">
                <Zoom in={true} timeout={2000}>
                  <img src={webIcon} width={200} height={200} />
                </Zoom>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography variant="h2" className={titleStyle}>
                  Web
                </Typography>
                <Box mt={1.5} ml={1}>
                  <CheckCircleIcon className={greenStyle} />
                </Box>
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
              <Box textAlign="center">
                <Zoom in={true} timeout={2000}>
                  <img src={mobileIcon} width={200} height={200} />
                </Zoom>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography variant="h2" className={titleStyle}>
                  Mobile
                </Typography>
                <Box mt={1.5} ml={1}>
                  <CancelIcon className={redStyle} />
                </Box>
              </Box>
              <Box textAlign="center">
                <Typography variant="h6">Will be coming soon</Typography>
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
              <Box textAlign="center">
                <Zoom in={true} timeout={2000}>
                  <img src={desktopIcon} width={200} height={200} />
                </Zoom>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography variant="h2" className={titleStyle}>
                  Desktop
                </Typography>
                <Box mt={1.5} ml={1}>
                  <CheckCircleIcon className={greenStyle} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box mt={5} textAlign="center">
          <Typography variant="h1">
            Lets do retro is supported in these modern browsers.
          </Typography>
        </Box>
        <Box my={7}>
          <Grid container spacing={2}>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
              <Box textAlign="center">
                <Zoom in={true} timeout={2000}>
                  <img src={chromeIcon} width={60} height={60} />
                </Zoom>
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" className={titleStyle}>
                  Chrome
                </Typography>

                <Typography variant="h3">Latest</Typography>
                <Box mt={1}>
                  <Button
                    color="primary"
                    onClick={() => handleChrome()}
                    startIcon={<GetAppIcon />}
                  >
                    <Typography variant="subtitle1">Download</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
              <Box textAlign="center">
                <Zoom in={true} timeout={2000}>
                  <img src={firefoxIcon} width={60} height={60} />
                </Zoom>
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" className={titleStyle}>
                  Firefox
                </Typography>

                <Typography variant="h3">Latest</Typography>
                <Box mt={1}>
                  <Button
                    color="primary"
                    onClick={() => handleFirefox()}
                    startIcon={<GetAppIcon />}
                  >
                    <Typography variant="subtitle1">Download</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
              <Box textAlign="center">
                <Zoom in={true} timeout={2000}>
                  <img src={edgeIcon} width={60} height={60} />
                </Zoom>
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" className={titleStyle}>
                  Edge
                </Typography>

                <Typography variant="h3">Latest</Typography>
                <Box mt={1}>
                  <Button
                    color="primary"
                    onClick={() => handleEdge()}
                    startIcon={<GetAppIcon />}
                  >
                    <Typography variant="subtitle1">Download</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xl={3} lg={3} md={3} sm={3} xs={12}>
              <Box textAlign="center">
                <Zoom in={true} timeout={2000}>
                  <img src={safariIcon} width={60} height={60} />
                </Zoom>
              </Box>
              <Box textAlign="center">
                <Typography variant="h2" className={titleStyle}>
                  Safari
                </Typography>

                <Typography variant="h3">Latest</Typography>
                <Box mt={1}>
                  <Button
                    color="primary"
                    onClick={() => handleSafari()}
                    startIcon={<GetAppIcon />}
                  >
                    <Typography variant="subtitle1">Download</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}
