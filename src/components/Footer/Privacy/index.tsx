import { ROOT, TERMS } from "../../../routes/config";

import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import React from "react";
import Typography from "@material-ui/core/Typography";
import UnderlineText from "../../common/UnderlineText";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router";

const PrivacyList = React.lazy(() => import("./list"));

const useStyles = makeStyles({
  titleStyle: {
    fontSize: "3.5rem",
    lineHeight: 1.143,
  },
});

export default function Privacy() {
  const {} = useStyles();
  const history = useHistory();

  const handleHome = () => {
    history.push(ROOT);
  };

  const handleTerms = () => {
    history.push(TERMS);
  };

  return (
    <React.Fragment>
      <Container fixed>
        <Box py={5}>
          <Box>
            <Typography variant="h1">Privacy policy</Typography>
            <Box mt={3}>
              <Typography component="p" variant="body1">
                Thank you for visiting/using Let's do retro. In order to protect
                your privacy we provide this notice explaining our best
                practices. This privacy policy applies between you, the User of
                this Website and Let's do retro App, the owner and provider of
                this Website.
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography variant="body1">
                For the ease of use we make this notice easy to find, we make it
                available on our homepage{" "}
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => handleHome()}
                >
                  <Typography variant="body1">&nbsp;Home</Typography>
                </Link>{" "}
                This privacy policy should be read alongside, and in addition
                to, our Terms and Conditions, which can be found at
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => handleTerms()}
                >
                  <Typography variant="body1">&nbsp;Terms of use</Typography>
                </Link>
              </Typography>
            </Box>
            <Box mt={5}>
              <Typography variant="body1">
                Scope of this Privacy policy
              </Typography>
              <PrivacyList
                list={[
                  `This privacy policy applies only to the actions of Let's do retro and users with respect to this Website. It does not extend to any websites that can be accessed from this Website including, but not limited to, any links we may provide to social media websites. For purposes of the applicable Data Protection Laws, Let's do retro ApS is the “data controller”.`,
                  "This means that Let's do retro ApS determines the purposes for which, and the manner in which, your Data is processed.",
                ]}
              />
            </Box>
            <Box mt={5}>
              <UnderlineText title="What we collect" />
              <Box mt={2}>
                <Typography variant="body1">
                  We may collect the following Data, which includes personal
                  Data, from you
                </Typography>
                <PrivacyList
                  list={[
                    "IP address (automatically collected);",
                    "Web browser type and version (automatically collected)",
                    "Operating system (automatically collected);",
                    "A list of URLs starting with a referring site, your activity on this Website, and the site you exit to (automatically collected)",
                  ]}
                />
              </Box>
            </Box>
            <Box mt={5}>
              <UnderlineText title="How we collect Data" />
              <Box mt={2}>
                <Typography variant="body1">
                  We collect Data in the following ways. Data is given to us by
                  you and Data is collected automatically.
                </Typography>
              </Box>
            </Box>
            <Box mt={5}>
              <UnderlineText title="Data that is given to us by you" />
              <Box mt={2}>
                <Typography variant="body1">
                  Letsdoretro App will collect your Data in a number of ways,
                  for example:
                </Typography>
                <PrivacyList
                  list={[
                    "Orgnization details such as name and description of the user",
                    "Departments details such as name and description of the department",
                    "Project details such as name and description of the Project",
                  ]}
                />
              </Box>
            </Box>
            <Box mt={5}>
              <UnderlineText title="Data that is collected automatically" />
              <Box mt={2}>
                <Typography variant="body1">
                  To the extent that you access the Website, we will collect
                  your Data automatically, for example:
                </Typography>
                <Typography variant="body1">
                  we automatically collect some information about your visit to
                  the Website. This information helps us to make improvements to
                  Website content and navigation, and includes your IP address,
                  the date, times and frequency with which you access the
                  Website and the way you use and interact with its content.
                </Typography>
              </Box>
            </Box>
            <Box mt={5}>
              <UnderlineText title="Our use of Data" />
              <Box mt={2}>
                <Typography variant="body1">
                  Any or all of the above Data may be required by us from time
                  to time in order to provide you with the best possible service
                  and experience when using our Website. Specifically, Data may
                  be used by us for the following reasons:
                </Typography>
                <PrivacyList
                  list={[
                    "internal record keeping",
                    "improvement of our products / services",
                    `We may use your Data for the above purposes if we deem it necessary to do so for our legitimate interests. If you are not satisfied with this, you have the right to object in certain circumstances (see the section headed “Your rights” below).`,
                    "When you register with us and set up an account to receive our services, the legal basis for this processing is the performance of a contract between you and us and/or taking steps, at your request, to enter into such a contract.",
                  ]}
                />
              </Box>
            </Box>
            <Box mt={5}>
              <Typography variant="body1">Who we share Data with</Typography>
              <Box mt={2}>
                <PrivacyList
                  list={[
                    "We may share your Data with the following groups of people for the following reasons",
                    "Our employees, agents and/or professional advisors – to provide technical support when asked by the customer for any issues related to use of the service.",
                    `In case of Third party service providers who provide services to us which require the processing of personal data. But we do not integrate with any third party services as of now`,
                  ]}
                />
                <Typography variant="body1">
                  In each case, in accordance with this privacy policy.
                </Typography>
              </Box>
            </Box>
            <Box mt={5}>
              <UnderlineText title="Keeping Data secure" />
              <Box mt={2}>
                <Typography variant="body1">
                  We will use technical and organisational measures to safeguard
                  your Data, for example
                </Typography>
                <PrivacyList
                  list={[
                    "Access to your account is controlled by a password and a user name that is unique to you",
                    "Technical and organisational measures include measures to deal with any suspected data breach. If you suspect any misuse or loss or unauthorised access to your Data, please let us know immediately by contacting us via Feedback(listed down below in the footer section) ",
                    `If you want detailed information from Get Safe Online on how to protect your information and your computers and devices against fraud, identity theft, viruses and many other online problems, please visit www.getsafeonline.org. Get Safe Online is supported by HM Government and leading businesses.`,
                  ]}
                />
              </Box>
            </Box>
            <Box mt={5}>
              <UnderlineText title="Data retention" />
              <Box mt={2}>
                <Typography variant="body1">
                  Unless a longer retention period is required or permitted by
                  law, we will only hold your Data on our systems for the period
                  necessary to fulfill the purposes outlined in this privacy
                  policy or until you request that the Data be deleted. Even if
                  we delete your Data, it may persist on backup or archival
                  media for legal, tax or regulatory purposes.
                </Typography>
              </Box>
            </Box>
            <Box mt={5}>
              <UnderlineText title="Your rights" />
              <Box mt={2}>
                <Typography variant="body1">
                  You have the following rights in relation to your Data
                </Typography>
                <PrivacyList
                  list={[
                    "Right to access – the right to request (i) copies of the information we hold about you at any time, or (ii) that we modify, update or delete such information. If we provide you with access to the information we hold about you, we will not charge you for this, unless your request is “manifestly unfounded or excessive.” Where we are legally permitted to do so, we may refuse your request. If we refuse your request, we will tell you the reasons why",
                    "Right to correct – the right to have your Data rectified if it is inaccurate or incomplete.",
                    `Right to erase – the right to request that we delete or remove your Data from our systems.`,
                    "Right to restrict our use of your Data – the right to “block” us from using your Data or limit the way in which we can use it.",
                    "Right to data portability – the right to request that we move, copy or transfer your Data.",
                    "Right to object – the right to object to our use of your Data including where we use it for our legitimate interests. To make inquiries, exercise any of your rights set out above, or withdraw your consent to the processing of your Data (where consent is our legal basis for processing your Data), please contact us via Feedback(listed down below in the footer section) ",
                    "It is important that the Data we hold about you is accurate and current. Please keep us informed if your Data changes during the period for which we hold it.",
                  ]}
                />
              </Box>
            </Box>
            <Box mt={5}>
              <UnderlineText title="Links to other websites" />
              <Box mt={2}>
                <Typography variant="body1">
                  This Website may, from time to time, provide links to other
                  websites. We have no control over such websites and are not
                  responsible for the content of these websites. This privacy
                  policy does not extend to your use of such websites. You are
                  advised to read the privacy policy or statement of other
                  websites prior to using them.
                </Typography>
              </Box>
            </Box>
            <Box mt={5}>
              <UnderlineText title="General" />
              <Box mt={2}>
                <Typography variant="body1">
                  You may not transfer any of your rights under this privacy
                  policy to any other person. We may transfer our rights under
                  this privacy policy where we reasonably believe your rights
                  will not be affected.
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body1">
                  If any court or competent authority finds that any provision
                  of this privacy policy (or part of any provision) is invalid,
                  illegal or unenforceable, that provision or part-provision
                  will, to the extent required, be deemed to be deleted, and the
                  validity and enforceability of the other provisions of this
                  privacy policy will not be affected.
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body1">
                  Unless otherwise agreed, no delay, act or omission by a party
                  in exercising any right or remedy will be deemed a waiver of
                  that, or any other, right or remedy.
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography variant="body1">
                  This Agreement will be governed by and interpreted according
                  to the law of Denmark. All disputes arising under the
                  Agreement will be subject to the exclusive jurisdiction of the
                  Denmark courts.
                </Typography>
              </Box>
            </Box>
            <Box mt={5}>
              <UnderlineText title="Changes to this privacy policy" />
              <Box mt={2}>
                <Typography variant="body1">
                  Let's do retro App reserves the right to change this privacy
                  policy as we may deem necessary from time to time or as may be
                  required by law. Any changes will be immediately posted on the
                  Website and you are deemed to have accepted the terms of the
                  privacy policy on your first use of the Website following the
                  alterations.You may contact Let's do retro App by email at
                  letsdoretro@gmail.com.
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
