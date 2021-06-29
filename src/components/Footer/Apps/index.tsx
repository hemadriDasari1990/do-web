import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CancelIcon from "@material-ui/icons/Cancel";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Container from "@material-ui/core/Container";
import DoImage from "../../common/Image";
import GetAppIcon from "@material-ui/icons/GetApp";
import Grid from "@material-ui/core/Grid";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "../../styles";

const useLocalStyles = makeStyles({
  greenStyle: {
    color: "#27ae60",
  },
  redStyle: {
    color: "#fd7171",
  },
});

export default function Apps() {
  const { greenStyle, redStyle } = useLocalStyles();
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
                  <DoImage
                    src={"web.svg"}
                    width={200}
                    height={200}
                    placeholderImg={"web.svg"}
                    errorImg={"web.svg"}
                  />
                </Zoom>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography variant="h2">Web</Typography>
                <Box mt={1.5} ml={1}>
                  <CheckCircleIcon className={greenStyle} />
                </Box>
              </Box>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={4} xs={12}>
              <Box textAlign="center">
                <Zoom in={true} timeout={2000}>
                  <DoImage
                    src={"mobile.svg"}
                    width={200}
                    height={200}
                    placeholderImg={"mobile.svg"}
                    errorImg={"mobile.svg"}
                  />
                </Zoom>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography variant="h2">Mobile</Typography>
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
                  <DoImage
                    src={"desktop.svg"}
                    width={200}
                    height={200}
                    placeholderImg={"desktop.svg"}
                    errorImg={"desktop.svg"}
                  />
                </Zoom>
              </Box>
              <Box display="flex" justifyContent="center">
                <Typography variant="h2">Desktop</Typography>
                <Box mt={1.5} ml={1}>
                  <CancelIcon className={redStyle} />
                </Box>
              </Box>
              <Box textAlign="center">
                <Typography variant="h6">Will be coming soon</Typography>
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
                  <DoImage
                    src={"chrome.png"}
                    width={60}
                    height={60}
                    placeholderImg={"chrome.png"}
                    errorImg={"chrome.png"}
                  />
                </Zoom>
              </Box>
              <Box textAlign="center">
                <Typography variant="h2">Chrome</Typography>

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
                  <DoImage
                    src={"firefox.png"}
                    width={60}
                    height={60}
                    placeholderImg={"firefox.png"}
                    errorImg={"firefox.png"}
                  />
                </Zoom>
              </Box>
              <Box textAlign="center">
                <Typography variant="h2">Firefox</Typography>

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
                  <DoImage
                    src={"edge.png"}
                    width={60}
                    height={60}
                    placeholderImg={"edge.png"}
                    errorImg={"edge.png"}
                  />
                </Zoom>
              </Box>
              <Box textAlign="center">
                <Typography variant="h2">Edge</Typography>

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
                  <DoImage
                    src={"safari.png"}
                    width={60}
                    height={60}
                    placeholderImg={"safari.png"}
                    errorImg={"safari.png"}
                  />
                </Zoom>
              </Box>
              <Box textAlign="center">
                <Typography variant="h2">Safari</Typography>
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
