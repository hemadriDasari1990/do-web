import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React from "react";
import Typography from "@material-ui/core/Typography";
import UnderlineText from "../../common/UnderlineText";
import ReactionsList from "../../common/Reactions";

function Reactions() {
  return (
    <React.Fragment>
      <Container>
        <Box py={5}>
          <Box>
            <Typography variant="h1">Reactions</Typography>
          </Box>
          <Box my={3}>
            <ReactionsList />
          </Box>
          <Box my={3}>
            <UnderlineText title="What are reactions?" />
          </Box>
          <Box my={3}>
            <Typography variant="body1">
              Reactions are an extension of the Like Button to give people more
              ways to share their reaction to a note in a quick and easy way.
              The collection of Reactions includes{" "}
              <b>Agree, Love, Highlight, Deserve and Disagree</b>.
            </Typography>
            <Box mt={2}>
              <Typography variant="body1">
                A reaction is a response to a retrospective note in which a
                person chooses one of several emoticons{" "}
                <b>Agree, Love, Highlight, Deserve and Disagree</b> to indicate
                their feelings about the content of a note.
              </Typography>
            </Box>
          </Box>
          <Box my={3}>
            <UnderlineText title="Guidelines" />
          </Box>
          <Box my={3}>
            <Typography variant="body1">
              To ensure accurate and consistent use, never alter, rotate,
              embellish or attempt to recreate the Reactions. Never alter the
              proportions and shape of the Reactions (and surrounding UI) for
              any reason. Reactions are not emojis or individual icons, and they
              cannot be used in this way. It's important to show Reactions in
              the way they are intended to be used on Letsdoretro.com - as a
              quick and easy way to express how you feel.
            </Typography>
            <Typography variant="body1">
              To add a reaction, click on smiley icon on each note to see the
              reaction image options, then tap either{" "}
              <b>Agree, Love, Highlight, Deserve and Disagree</b>.
            </Typography>
            <Box mt={2}>
              <Typography variant="body1">
                We recommend that you do not use interactions as a way to
                determine the success of notes. Instead, focus on measuring
                tools that align with your goals. Although interactions can
                explain how your audience feels about the content of your note,
                it is important to remember that there are some things that can
                influence a person's choice of how to interact. For example,
                people may interact with the purpose, content, designs,
                branding, or otherwise of your note.
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Reactions;
