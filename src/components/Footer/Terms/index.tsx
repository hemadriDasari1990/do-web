import { Box, Typography } from '@material-ui/core';

import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import React from 'react'
import Zoom from '@material-ui/core/Zoom'
import { makeStyles } from '@material-ui/core/styles';
import termsIcon from '../../../assets/terms.svg';

const useStyles = makeStyles({
  backgroundStyle: {
    backgroundImage: termsIcon,
    backgroundPosition: "right bottom, left top",
    backgroundRepeat: "no-repeat, repeat",
    padding: 15
  },
});

function Terms(){
  const { } = useStyles();

    return (
      <React.Fragment>
        <Container fixed disableGutters>
          <Box my={5} textAlign="center">
            <Zoom in={true} timeout={2000}>
              <Box>
                <Typography variant="h1">Terms & Conditions</Typography>
              </Box>
            </Zoom>
            <Zoom in={true} timeout={2000}>
              <img  src={termsIcon} height="200px" width="200px"/>
            </Zoom>
          </Box>
          <Grid container spacing={2}>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <List disablePadding>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Introduction</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              Welcome to Ideaboardz (“Company”, “we”, “our”,“us”)!

These Terms of Service (“Terms”, “Terms of Service”) govern your use of our website located at https://ideaboardz.com (together or individually “Service”) operated by Ideaboardz.

Our Privacy Policy also governs your use of our Service and explains how we collect, safeguard and disclose information that results from your use of our web pages.

Your agreement with us includes these Terms and our Privacy Policy (“Agreements”). You acknowledge that you have read and understood Agreements, and agree to be bound of them.

If you do not agree with (or cannot comply with) Agreements, then you may not use the Service, but please let us know by emailing at ideaboardz@gmail.com so we can try to find a solution. These Terms apply to all visitors, users and others who wish to access or use Service.
                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Communications</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              We will not be sending any communication emails or promotional emails to you.
                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Contests, Sweepstakes and Promotions</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              Any contests, sweepstakes or other promotions (collectively, “Promotions”) made available through Service may be governed by rules that are separate from these Terms of Service. If you participate in any Promotions, please review the applicable rules as well as our Privacy Policy. If the rules for a Promotion conflict with these Terms of Service, Promotion rules will apply.
                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Content</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              Our Service allows you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material (“Content”). You are responsible for Content that you post on or through Service, including its legality, reliability, and appropriateness.

By posting Content on or through Service, You represent and warrant that: (i) Content is yours (you own it) and/or you have the right to use it and the right to grant us the rights and license as provided in these Terms, and (ii) that the posting of your Content on or through Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity. We reserve the right to terminate the account of anyone found to be infringing on a copyright.

You retain any and all of your rights to any Content you submit, post or display on or through Service and you are responsible for protecting those rights. We take no responsibility and assume no liability for Content you or any third party posts on or through Service.

Ideaboardz has the right but not the obligation to monitor and edit all Content provided by users.

In addition, Content found on or through this Service are the property of Ideaboardz or used with permission. You may not distribute, modify, transmit, reuse, download, repost, copy, or use said Content, whether in whole or in part, for commercial purposes or for personal gain, without express advance written permission from us.
                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Prohibited Uses</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              You may use Service only for lawful purposes and in accordance with Terms. You agree not to use Service:

                                  0.1. In any way that violates any applicable national or international law or regulation.

                                  0.2. For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.

                                  0.3. To transmit, or procure the sending of, any advertising or promotional material, including any “junk mail”, “chain letter,” “spam,” or any other similar solicitation.

                                  0.4. To impersonate or attempt to impersonate Company, a Company employee, another user, or any other person or entity.

                                  0.5. In any way that infringes upon the rights of others, or in any way is illegal, threatening, fraudulent, or harmful, or in connection with any unlawful, illegal, fraudulent, or harmful purpose or activity.

                                  0.6. To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of Service, or which, as determined by us, may harm or offend Company or users of Service or expose them to liability.

                                  Additionally, you agree not to:

                                  0.1. Use Service in any manner that could disable, overburden, damage, or impair Service or interfere with any other party’s use of Service, including their ability to engage in real time activities through Service.

                                  0.2. Use any robot, spider, or other automatic device, process, or means to access Service for any purpose, including monitoring or copying any of the material on Service.

                                  0.3. Use any manual process to monitor or copy any of the material on Service or for any other unauthorized purpose without our prior written consent.

                                  0.4. Use any device, software, or routine that interferes with the proper working of Service.

                                  0.5. Introduce any viruses, trojan horses, worms, logic bombs, or other material which is malicious or technologically harmful.

                                  0.6. Attempt to gain unauthorized access to, interfere with, damage, or disrupt any parts of Service, the server on which Service is stored, or any server, computer, or database connected to Service.

                                  0.7. Attack Service via a denial-of-service attack or a distributed denial-of-service attack.

                                  0.8. Take any action that may damage or falsify Company rating.

                                  0.9. Otherwise attempt to interfere with the proper working of Service.
                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Analytics</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              We may use third-party Service Providers to monitor and analyze the use of our Service.
                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Accounts</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              When you create an account with us, you guarantee that the information you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete information may result in the immediate termination of your account on Service.

You are responsible for maintaining the confidentiality of your account and password, including but not limited to the restriction of access to your computer and/or account. You agree to accept responsibility for any and all activities or actions that occur under your account and/or password, whether your password is with our Service or a third-party service. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.

Each board link is unique and you hold yourself responsible to share the link with intended users. Users receiving the link by creator of the board automatically agree to the terms of usage of Ideaboardz.

You may not use as a username the name of another person or entity or that is not lawfully available for use, a name or trademark that is subject to any rights of another person or entity other than you, without appropriate authorization. You may not use as a username any name that is offensive, vulgar or obscene.

We reserve the right to refuse service, terminate accounts, remove content, or cancel orders in our sole discretion in case it does not comply with the terms stated under this document.
                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Intellectual Property</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              Service and its original content (excluding Content provided by users), features and functionality are and will remain the exclusive property of Ideaboardz and its licensors. Service is protected by copyright, trademark, and other laws of and foreign countries. Our trademarks may not be used in connection with any product or service without the prior written consent of Ideaboardz.
                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Copyright Policy</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              We respect the intellectual property rights of others. It is our policy to respond to any claim that Content posted on Service infringes on the copyright or other intellectual property rights (“Infringement”) of any person or entity.

If you are a copyright owner, or authorized on behalf of one, and you believe that the copyrighted work has been copied in a way that constitutes copyright infringement, please submit your claim via email to ideaboardz@gmail.com, with the subject line: “Copyright Infringement” and include in your claim a detailed description of the alleged Infringement as detailed below, under “DMCA Notice and Procedure for Copyright Infringement Claims”

You may be held accountable for damages (including costs and attorneys’ fees) for misrepresentation or bad-faith claims on the infringement of any Content found on and/or through Service on your copyright.


                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">DMCA Notice and Procedure for Copyright Infringement Claims</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              You may submit a notification pursuant to the Digital Millennium Copyright Act (DMCA) by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):

0.1. an electronic or physical signature of the person authorized to act on behalf of the owner of the copyright’s interest;

0.2. a description of the copyrighted work that you claim has been infringed, including the URL (i.e., web page address) of the location where the copyrighted work exists or a copy of the copyrighted work;

0.3. identification of the URL or other specific location on Service where the material that you claim is infringing is located;

0.4. your address, telephone number, and email address;

0.5. a statement by you that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law;

0.6. a statement by you, made under penalty of perjury, that the above information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner’s behalf.

You can contact our Copyright Agent via email at ideaboardz@gmail.com.

                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Error Reporting and Feedback</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              You may provide us either directly at ideaboardz@gmail.com or via third party sites and tools with information and feedback concerning errors, suggestions for improvements, ideas, problems, complaints, and other matters related to our Service (“Feedback”). You acknowledge and agree that: (i) you shall not retain, acquire or assert any intellectual property right or other right, title or interest in or to the Feedback; (ii) Company may have development ideas similar to the Feedback; (iii) Feedback does not contain confidential information or proprietary information from you or any third party; and (iv) Company is not under any obligation of confidentiality with respect to the Feedback. In the event the transfer of the ownership to the Feedback is not possible due to applicable mandatory laws, you grant Company and its affiliates an exclusive, transferable, irrevocable, free-of-charge, sub-licensable, unlimited and perpetual right to use (including copy, modify, create derivative works, publish, distribute and commercialize) Feedback in any manner and for any purpose.

                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Links To Other Web Sites</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              Our Service may contain links to third party web sites or services that are not owned or controlled by Ideaboardz.

Ideaboardz has no control over, and assumes no responsibility for the content, privacy policies, or practices of any third party web sites or services. We do not warrant the offerings of any of these entities/individuals or their websites.

YOU ACKNOWLEDGE AND AGREE THAT COMPANY SHALL NOT BE RESPONSIBLE OR LIABLE, DIRECTLY OR INDIRECTLY, FOR ANY DAMAGE OR LOSS CAUSED OR ALLEGED TO BE CAUSED BY OR IN CONNECTION WITH USE OF OR RELIANCE ON ANY SUCH CONTENT, GOODS OR SERVICES AVAILABLE ON OR THROUGH ANY SUCH THIRD PARTY WEB SITES OR SERVICES.

WE STRONGLY ADVISE YOU TO READ THE TERMS OF SERVICE AND PRIVACY POLICIES OF ANY THIRD PARTY WEB SITES OR SERVICES THAT YOU VISIT.

                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Disclaimer Of Warranty</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              THESE SERVICES ARE PROVIDED BY COMPANY ON AN “AS IS” AND “AS AVAILABLE” BASIS. COMPANY MAKES NO REPRESENTATIONS OR WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THEIR SERVICES, OR THE INFORMATION, CONTENT OR MATERIALS INCLUDED THEREIN. YOU EXPRESSLY AGREE THAT YOUR USE OF THESE SERVICES, THEIR CONTENT, AND ANY SERVICES OR ITEMS OBTAINED FROM US IS AT YOUR SOLE RISK.

NEITHER COMPANY NOR ANY PERSON ASSOCIATED WITH COMPANY MAKES ANY WARRANTY OR REPRESENTATION WITH RESPECT TO THE COMPLETENESS, SECURITY, RELIABILITY, QUALITY, ACCURACY, OR AVAILABILITY OF THE SERVICES. WITHOUT LIMITING THE FOREGOING, NEITHER COMPANY NOR ANYONE ASSOCIATED WITH COMPANY REPRESENTS OR WARRANTS THAT THE SERVICES, THEIR CONTENT, OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL BE ACCURATE, RELIABLE, ERROR-FREE, OR UNINTERRUPTED, THAT DEFECTS WILL BE CORRECTED, THAT THE SERVICES OR THE SERVER THAT MAKES IT AVAILABLE ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS OR THAT THE SERVICES OR ANY SERVICES OR ITEMS OBTAINED THROUGH THE SERVICES WILL OTHERWISE MEET YOUR NEEDS OR EXPECTATIONS.

COMPANY HEREBY DISCLAIMS ALL WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, STATUTORY, OR OTHERWISE, INCLUDING BUT NOT LIMITED TO ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.

THE FOREGOING DOES NOT AFFECT ANY WARRANTIES WHICH CANNOT BE EXCLUDED OR LIMITED UNDER APPLICABLE LAW.

                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Limitation Of Liability</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              EXCEPT AS PROHIBITED BY LAW, YOU WILL HOLD US AND OUR OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS HARMLESS FOR ANY INDIRECT, PUNITIVE, SPECIAL, INCIDENTAL, OR CONSEQUENTIAL DAMAGE, HOWEVER IT ARISES (INCLUDING ATTORNEYS’ FEES AND ALL RELATED COSTS AND EXPENSES OF LITIGATION AND ARBITRATION, OR AT TRIAL OR ON APPEAL, IF ANY, WHETHER OR NOT LITIGATION OR ARBITRATION IS INSTITUTED), WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE, OR OTHER TORTIOUS ACTION, OR ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT, INCLUDING WITHOUT LIMITATION ANY CLAIM FOR PERSONAL INJURY OR PROPERTY DAMAGE, ARISING FROM THIS AGREEMENT AND ANY VIOLATION BY YOU OF ANY FEDERAL, STATE, OR LOCAL LAWS, STATUTES, RULES, OR REGULATIONS, EVEN IF COMPANY HAS BEEN PREVIOUSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. EXCEPT AS PROHIBITED BY LAW, IF THERE IS LIABILITY FOUND ON THE PART OF COMPANY, IT WILL BE LIMITED TO THE AMOUNT PAID FOR THE PRODUCTS AND/OR SERVICES, AND UNDER NO CIRCUMSTANCES WILL THERE BE CONSEQUENTIAL OR PUNITIVE DAMAGES. SOME STATES DO NOT ALLOW THE EXCLUSION OR LIMITATION OF PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE PRIOR LIMITATION OR EXCLUSION MAY NOT APPLY TO YOU.

                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Termination</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              We may terminate or suspend your account and bar access to Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of Terms.

If you wish to terminate your account, you may simply discontinue using Service.

All provisions of Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.

                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Governing Law</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              These Terms shall be governed and construed in accordance with the laws of Pune, India, which governing law applies to agreement without regard to its conflict of law provisions.

Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service and supersede and replace any prior agreements we might have had between us regarding Service.
                            </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Changes To Service</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              We reserve the right to withdraw or amend our Service, and any service or material we provide via Service, in our sole discretion without notice. We will not be liable if for any reason all or any part of Service is unavailable at any time or for any period. From time to time, we may restrict access to some parts of Service, or the entire Service, to users, including registered users.
                              </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Amendments To Terms</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              We may amend Terms at any time by posting the amended terms on this site. It is your responsibility to review these Terms periodically.

Your continued use of the Platform following the posting of revised Terms means that you accept and agree to the changes. You are expected to check this page frequently so you are aware of any changes, as they are binding on you.

By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use Service.

</Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Waiver And Severability</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              No waiver by Company of any term or condition set forth in Terms shall be deemed a further or continuing waiver of such term or condition or a waiver of any other term or condition, and any failure of Company to assert a right or provision under Terms shall not constitute a waiver of such right or provision.

If any provision of Terms is held by a court or other tribunal of competent jurisdiction to be invalid, illegal or unenforceable for any reason, such provision shall be eliminated or limited to the minimum extent such that the remaining provisions of Terms will continue in full force and effect.
</Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Acknowledgement</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              BY USING SERVICE OR OTHER SERVICES PROVIDED BY US, YOU ACKNOWLEDGE THAT YOU HAVE READ THESE TERMS OF SERVICE AND AGREE TO BE BOUND BY THEM.
                              </Typography>} />
                        </ListItem>
                        <ListItem>
                            <ListItemText primary={<Box my={2}>
                                <Typography variant="h4">Contact Us</Typography>
                              </Box>}
                            secondary={<Typography variant="body1">
                              Please send your feedback, comments, requests for technical support by email: ideaboardz@gmail.com.
                            </Typography>} />
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </Container>
      </React.Fragment>
    )
}

export default Terms;
