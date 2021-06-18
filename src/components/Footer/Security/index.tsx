import { PRIVACY_POLICY, TERMS } from "../../../routes/config";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import DoImage from "../../common/Image";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";
import PrivacyIcon from "../../../assets/privacy.svg";
import PrivateDataIcon from "../../../assets/private-data.svg";
import React from "react";
import SecureDataIcon from "../../../assets/secure-data.svg";
import SecureDevelopmentIcon from "../../../assets/secure-development.svg";
import SecureServerIcon from "../../../assets/secure-server.svg";
import Slide from "@material-ui/core/Slide";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  titleStyle: {
    fontSize: "3.5rem",
    lineHeight: 1.143,
  },
});

export default function Security() {
  const {} = useStyles();
  const history = useHistory();

  const handleTerms = () => {
    history.push(TERMS);
  };

  const handlePrivacy = () => {
    history.push(PRIVACY_POLICY);
  };

  return (
    <React.Fragment>
      <Container fixed>
        <Box pt={5}>
          <Box>
            <Typography variant="h1">
              Let's Do Retro commitment to trust & security
            </Typography>
            <Box mt={3}>
              <Typography variant="body1">
                We understand that the privacy and security of your data is
                vital, so we are committed to providing a highly secure and
                reliable environment you can trust.
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography variant="body1">
                At Let's Do Retro, nothing is more important to us than the
                privacy of our customer’s data. Trust is a core principle of
                Let's Do Retro. It’s this commitment to customer privacy and
                inspiring trust that directs the decisions we make on a daily
                basis. Trust is the responsibility of each and every employee
                and supplier and we take it seriously.
              </Typography>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <Slide
                  direction="right"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Box textAlign="center">
                      <Zoom in={true} timeout={2000}>
                        <DoImage
                          src={SecureServerIcon}
                          height="200px"
                          width="fit-content"
                          placeholderImg={SecureServerIcon}
                          errorImg={SecureServerIcon}
                        />
                      </Zoom>
                    </Box>
                  </Grid>
                </Slide>
                <Slide
                  direction="left"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Box mb={2}>
                      <Typography variant="h1">Network Security</Typography>
                    </Box>
                    <Box mb={5}>
                      <Typography variant="body1">
                        Let's Do Retro application servers are hosted on Goodle
                        cloud and are located in Dubai, United Arab Emirates.
                      </Typography>
                    </Box>
                    <Box mb={5}>
                      <Typography variant="body1">
                        Let's Do Retro physical infrastructure is hosted and
                        managed within Amazon's secure data centers and utilizes
                        the Google's cloud technology. Google's Cloud
                        continually manages risk and undergoes recurring
                        assessments to ensure compliance with industry
                        standards.
                      </Typography>
                    </Box>
                  </Grid>
                </Slide>
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <Slide
                  direction="right"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Box mb={2}>
                      <Typography variant="h1">
                        Secure Browsing via HTTPS
                      </Typography>
                    </Box>
                    <Box mb={5}>
                      <Typography variant="body1">
                        When you visit the Reetro website or use Reetro the app,
                        the transmission of information between your device and
                        our servers is protected using 256-bit TLS encryption.
                      </Typography>
                    </Box>
                  </Grid>
                </Slide>
                <Slide
                  direction="left"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Box textAlign="center">
                      <Zoom in={true} timeout={2000}>
                        <DoImage
                          src={PrivacyIcon}
                          height="200px"
                          width="fit-content"
                          placeholderImg={PrivacyIcon}
                          errorImg={PrivacyIcon}
                        />
                      </Zoom>
                    </Box>
                  </Grid>
                </Slide>
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <Slide
                  direction="right"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Box textAlign="center">
                      <Zoom in={true} timeout={2000}>
                        <DoImage
                          src={PrivateDataIcon}
                          height="200px"
                          width="fit-content"
                          placeholderImg={PrivateDataIcon}
                          errorImg={PrivateDataIcon}
                        />
                      </Zoom>
                    </Box>
                  </Grid>
                </Slide>
                <Slide
                  direction="left"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Box mb={2}>
                      <Typography variant="h1">Data Privacy</Typography>
                    </Box>
                    <Box mb={5} display="flex">
                      <Typography variant="body1">
                        Your data is yours. Let's Do Retro does not sell or rent
                        any customer data or information to anyone. It is our
                        guarantee that we will never share or sell your data or
                        information. For more information, please review our
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => handlePrivacy()}
                        >
                          <Typography variant="body1">
                            &nbsp;Privacy Policy
                          </Typography>
                        </Link>
                        &nbsp;and&nbsp;
                        <Link
                          component="button"
                          variant="body2"
                          onClick={() => handleTerms()}
                        >
                          <Typography variant="body1">
                            &nbsp;Terms and Conditions
                          </Typography>
                        </Link>
                        .
                      </Typography>
                    </Box>
                    <Box mb={5}>
                      <Typography variant="body1">
                        Let's Do Retro physical infrastructure is hosted and
                        managed within Google's's secure data centers and
                        utilizes the Google's cloud technology. Google's Cloud
                        continually manages risk and undergoes recurring
                        assessments to ensure compliance with industry
                        standards.
                      </Typography>
                    </Box>
                  </Grid>
                </Slide>
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <Slide
                  direction="right"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Box mb={2}>
                      <Typography variant="h1">
                        Data Segregation & Security
                      </Typography>
                    </Box>
                    <Box mb={5}>
                      <Typography variant="body1">
                        Each company's data on the Reetro platform is saved
                        within its own block, and cannot be accessed or mixed
                        with another customers data or areas of the system.
                      </Typography>
                    </Box>
                    <Box mb={5}>
                      <Typography variant="body1">
                        All the rest API calls are protected by user specific
                        JWT (JASON web token). No unauthorized user can access
                        another users data.
                      </Typography>
                    </Box>
                  </Grid>
                </Slide>
                <Slide
                  direction="left"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Box textAlign="center">
                      <Zoom in={true} timeout={2000}>
                        <DoImage
                          src={SecureDataIcon}
                          height="200px"
                          width="fit-content"
                          placeholderImg={SecureDataIcon}
                          errorImg={SecureDataIcon}
                        />
                      </Zoom>
                    </Box>
                  </Grid>
                </Slide>
              </Grid>
            </Box>
            <Box mt={3}>
              <Grid container spacing={2}>
                <Slide
                  direction="right"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Box textAlign="center">
                      <Zoom in={true} timeout={2000}>
                        <DoImage
                          src={SecureDevelopmentIcon}
                          height="200px"
                          width="fit-content"
                          placeholderImg={SecureDevelopmentIcon}
                          errorImg={SecureDevelopmentIcon}
                        />
                      </Zoom>
                    </Box>
                  </Grid>
                </Slide>
                <Slide
                  direction="left"
                  in={true}
                  timeout={1500}
                  mountOnEnter
                  unmountOnExit
                >
                  <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
                    <Box mb={2}>
                      <Typography variant="h1">
                        Secure Development Practices
                      </Typography>
                    </Box>
                    <Box mb={5} display="flex">
                      <Typography variant="body1">
                        We use Agile development methodology and apply coding
                        standards along with the latest best practices in
                        security to develop Let's Do Retro.
                      </Typography>
                    </Box>
                    <Box mb={5}>
                      <Typography variant="body1">
                        Let's Do Retro physical infrastructure is hosted and
                        managed within Google's's secure data centers and
                        utilizes the Google's cloud technology. Google's Cloud
                        continually manages risk and undergoes recurring
                        assessments to ensure compliance with industry
                        standards.
                      </Typography>
                    </Box>
                  </Grid>
                </Slide>
              </Grid>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
