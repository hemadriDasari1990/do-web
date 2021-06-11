import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React from "react";
import Typography from "@material-ui/core/Typography";
import UnderlineText from "../../common/UnderlineText";
import Zoom from "@material-ui/core/Zoom";

const Features = React.lazy(() => import("./Features"));
const HintMessage = React.lazy(() => import("../../HintMessage"));

function Careers() {
  return (
    <React.Fragment>
      <Container>
        <Box py={5}>
          <Zoom in={true} timeout={2000}>
            <Typography variant="h1">Careers</Typography>
          </Zoom>
          <Box my={3}>
            <Typography variant="h6" color="textPrimary">
              Help us build/improve Let's Do Retro platform.
            </Typography>
          </Box>
          <Box>
            <UnderlineText title="Working Here" />
          </Box>
          <Box my={3}>
            <Typography variant="h6" color="textPrimary">
              People rely on Let's Do Retro platform to organize and run
              retrospectives. Living up to such great responsibility starts with
              hiring excellent people and providing them with an environment in
              which they can do their best work.
            </Typography>
          </Box>
          <Box my={3}>
            <Typography variant="h6" color="textPrimary">
              People generally do their best work when they're able to live
              their best lives outside of work. All of our position are remote
              so you can live near whoever, or whatever, is most important to
              you. Competitive salaries help you to reach your financial goals.
              Top-tier health insurance gives you peace of mind and great
              options for staying healthy. Flexible PTO policies let you manage
              your time with less stress. Generous parental leave means you
              don't have to choose between your work and spending enough time
              with new additions to your family.
            </Typography>
          </Box>
          <Box my={3}>
            <UnderlineText title="Open Positions" />
          </Box>
          <Box my={3}>
            <HintMessage message="Sorry! We do not have open positions right now. Please come back and check." />
          </Box>
          <Features />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Careers;
