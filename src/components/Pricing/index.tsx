import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import PricingCard from "./PricingCard";
import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import useStyles from "../styles";

const useLocalStyles = makeStyles({
  parahStyle: {
    fontSize: "1.25rem",
    letterSpacing: 0.3,
    lineHeight: 1.4,
    fontWeight: 400,
    marginTop: 20,
  },
});

const Pricing = () => {
  const { titleStyle } = useStyles();
  const { parahStyle } = useLocalStyles();

  return (
    <React.Fragment>
      <Container>
        <Box pt={5} textAlign="center">
          <Typography variant="h1" className={titleStyle}>
            Flexible and transparent pricing.
          </Typography>
          <Typography component="p" className={parahStyle}>
            Trusted by millions, Lets do retro powers teams all around the
            world. Explore which option is right for you.
          </Typography>
        </Box>
        <Box py={5}>
          <PricingCard />
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Pricing;
