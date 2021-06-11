import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React from "react";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import { makeStyles } from "@material-ui/core/styles";
const PrivacyList = React.lazy(() => import("../Privacy/list"));

const useStyles = makeStyles({});

function Terms() {
  const {} = useStyles();

  return (
    <React.Fragment>
      <Container>
        <Box py={5}>
          <Zoom in={true} timeout={2000}>
            <Box>
              <Typography variant="h1">Terms & Conditions</Typography>
            </Box>
          </Zoom>
        </Box>
        <Box>
          <Typography variant="body1">
            Welcome to Let's Do Retro. By using Let's Do Retro, you are agreeing
            to comply and be bound by the following terms and conditions of use.
          </Typography>
          <PrivacyList
            list={[
              "These together with our Privacy Policy govern the relationship between you and www.letsdoretro.com, in your use of this website.",
              `The use of "letsdoretro" is subject to the following terms of use:`,
            ]}
          />
        </Box>
        <Box mt={3}>
          <PrivacyList
            header="General"
            list={[
              "The content and information of the pages of this website. And functionality of Let's Do Retro is subject to change without notice. Your use of any product, service, information or materials on this website is entirely at your own risk, for which the site owner shall not be liable.",
            ]}
          />
        </Box>
        <Box mt={3}>
          <PrivacyList
            header="Use Of The Service"
            list={[
              "It shall be your own responsibility to ensure that any products, services or information available through this site meet your specific requirements and make sense to use. Otherwise you need to avoid this.",
              "The trademarks, logos and techniques displayed on the Site are the property of Let's Do Retro.io All information and content located on the Site is protected by copyright. You are prohibited from copying, publishing and using any Content available on or through the Site for commercial or public purposes.",
              "Unauthorized use of the material or service may give rise to a claim for damages and/or be a criminal offense. This website may provide links to other websites. The owner has no discretion to alter, update, or control the content on a linked Site.",
              "The information, software, products and descriptions of services published on this website may include inaccuracies or typographical errors, and the owner specifically disclaims any liability for such inaccuracies or errors. You agree that owner, Its affiliates and any of their respective employees or agents will not be liable for incidental or indirect damages.",
              "The owner cannot and does not guarantee continuous, uninterrupted or secure access to the www.Let's Do Retro.io The owner may terminate your access to the website without cause or notice.",
            ]}
          />
        </Box>
        <Box mt={3}>
          <PrivacyList
            header="Changes In The Service"
            list={[
              "Let's Do Retro shall have the right to update and change any part of the Service from time to time. If the changes or updates made require changes in your hardware, software and/or data connections, Let's Do Retro shall notify you of such requirements (e.g. browser updates) one (1) month prior to the implementation of the necessary changes. You are solely responsible for all costs related to the changes of hardware, software and/or data connections. Any modifications or development work requested by you shall always be separately agreed upon with Let's Do Retro. Such services shall be invoiced on time and material basis.",
            ]}
          />
        </Box>
        <Box mt={3}>
          <PrivacyList
            header="Availability"
            list={[
              "Let's Do Retro shall use reasonable endeavours to provide the Service on a continuous basis. The expected availability of the Service is 99.0 % or even more over a monthly period.",
              "For the avoidance of doubt, Let's Do Retro does not warrant the continued availability of the Service and it shall not be liable to compensate you any downtime of the Service. Let's Do Retro shall not be responsible for any failure to provide the Service which is due to problems with any aspects of your system or the network connections. Let's Do Retro has the right to interrupt the provision of the Service temporarily for maintenance of the Service.",
            ]}
          />
        </Box>
        <Box mt={3}>
          <PrivacyList
            header="Your responsibilities"
            list={[
              "You shall be responsible for maintaining the secrecy and security of the Users’ IDs and passwords. You are fully responsible for all activities, transactions and other operations which are made through the Service by using the User and Main User IDs and passwords.",
              "You have no right to store, distribute or transmit any Customer Data through the Service that is unlawful or infringing or promotes any illegal activities.",
            ]}
          />
        </Box>
        <Box mt={3}>
          <PrivacyList
            header="Customer Data"
            list={[
              `You shall own all rights, title and interest in and to all of the Customer Data and shall have sole responsibility for the legality, reliability, integrity, accuracy and quality of the Customer Data. Let's Do Retro acknowledges and agrees that the Customer Data and all data processed in relation to the provision of the Service may be your Confidential Information (as defined below), and Let's Do Retro shall store such data only to the extent necessary for the provision of the Service and shall not use such data for any other purpose.`,
              `In case the Customer Data processed in accordance with this Agreement contains personal data, you must comply with all applicable personal data protection and privacy laws. You shall be the data controller and Let's Do Retro the data processor as defined in the European Union’s Data Protection Directive 95/46/EC or in any national corresponding legislation. For the avoidance of doubt, you will retain full responsibility for the data processed on your behalf by Let's Do Retro acting as data processor.`,
              `You acknowledge and hereby accept that for the purpose of providing the Service the whole or any part of your Customer Data may be processed by Let's Do Retro’s affiliates, partners and subcontractors.`,
              `Let's Do Retro (and those third parties subcontracted by Let's Do Retro to perform services related to Service hosting, Customer Data maintenance and back-up) shall follow its standard archiving and back-up procedures for the Customer Data. In the event of any loss or damage to the Customer Data, your sole and exclusive remedy shall be for Let's Do Retro to use reasonable commercial efforts to restore the lost or damaged Customer Data from the latest back-up of such Customer Data maintained by Let's Do Retro or a third party subcontractor.`,
              `For the sake of clarity, Let's Do Retro shall not be responsible or liable for the deletion, damage, loss or failure to store any Customer Data. You shall have at all times a right to request a delivery of a copy of the Customer Data. At receipt of such request Let's Do Retro shall without unreasonable delay deliver a digital copy of the Customer Data in a format enabling a reasonable review of the data (e.g. Excel sheet or similar). Let's Do Retro shall charge for the work related to the delivery in accordance with its price list for such services.`,
              `Upon request by you made within fourteen (14) days after the termination or expiration of the Agreement for whatever reason Let's Do Retro shall without charge deliver a digital copy of the Customer Data in a format enabling a reasonable review of the data (e.g. Excel sheet or similar).`,
            ]}
          />
        </Box>
        <Box mt={3}>
          <PrivacyList
            header="Customer Data"
            list={[
              `For the purposes of this Agreement, "Confidential Information" shall mean all confidential information disclosed by a party ("Disclosing Party") to the other party ("Receiving Party"), whether orally or in writing.`,
              `Both Let's Do Retro and you agree to keep secret and confidential all Confidential Information provided by the Disclosing Party. The obligations and limitations set forth herein regarding the Confidential Information shall not apply to information which is:`,
              `in the public domain other than by a breach of this Agreement on the part of the Receiving Party; or`,
              `rightfully received from a third party which has the right and transmits it to the Receiving Party without breaching any obligation of confidentiality; or`,
              `rightfully known to the Receiving Party without breaching any limitation on use or disclosure prior to receipt of the same from the disclosing Party, as shown by the records of the Receiving Party; or`,
              `generally made available to third parties by the Disclosing Party without any restriction concerning use or disclosure; or`,
              `required to be disclosed by law or by a court of competent jurisdiction or by the rules or regulations of an applicable governmental or taxation or regulatory body or authority to whose jurisdiction the Receiving Party is subject.`,
            ]}
          />
        </Box>
        <Box mt={3}>
          <PrivacyList
            header="Limitation of liability"
            list={[
              `The Service is provided ”as is” without any warranties of any kind. You acknowledge and agree that any use of the Service is at your sole risk and liability. To the maximum extent permitted by applicable law, Let's Do Retro expressly disclaims any and all representations and warranties, either express or implied, including, without limitation, any implied warranties of merchantability, fitness for a particular purpose and non-infringement, with respect to the Service.`,
              `No warranty or representation is given that the functions contained in the Service will meet your requirements, or that the operation of the Service will be uninterrupted or error-free, or that defects in the Service will be corrected. Furthermore, no warranty or representation is given regarding the use or the results of the use of the Service.`,
              `In no event will Let's Do Retro be liable to you for any indirect damages arising from the use or inability to use the Service. Such damages include, but are not limited to, loss of profits, loss of revenue, loss of data or loss of use of the Service, even if Let's Do Retro has been advised of the possibility of such damages.`,
              `In no event shall Let's Do Retro’s aggregate liability arising out of or related to this Agreement exceed the total amount paid by you hereunder in one (1) month preceding the incident.`,
            ]}
          />
        </Box>
        <Box mt={3}>
          <PrivacyList
            header="Terms And Termination"
            list={[
              `This Agreement will be effective as of the date upon which you accept these terms or start using the Service.`,
              `The Agreement will also terminate automatically if you fail to comply with any of the restrictions or other requirements described herein. After the termination or expiration of this Agreement, you shall cease the use and utilisation of the Service.`,
              `Let's Do Retro may terminate this Agreement with immediate effect upon written notice in the event that your organisation is involved in any proceedings under any bankruptcy or other insolvency laws or is liquidated, dissolved, or its existence is terminated.`,
              `The terms and conditions of this Agreement that by their nature or otherwise reasonably should survive the termination or expiration of the Agreement shall survive any termination or expiration of this Agreement.`,
            ]}
          />
        </Box>
        <Box mt={3}>
          <PrivacyList
            header="Modification Of Terms"
            list={[
              `Let's Do Retro reserves the right to modify the terms and conditions included in this Agreement or relating to the Service and any such modifications shall become effective upon posting a new version of the terms and conditions. It is on your responsibility to review the terms and conditions applicable to the Service and continued use of the Service after the changes have become effective constitute your consent to the changes.`,
            ]}
          />
        </Box>
        <Box my={3}>
          <PrivacyList
            header="Modification Of Terms"
            list={[
              `Dispute Resolution. Any dispute, controversy or claim arising out of or relating to this contract, or the breach, termination or validity thereof shall be finally settled by arbitration in accordance with the Rules Danish Institute of Arbitration by one (1) arbitrator. The arbitration shall take place in Copenhagen, Denmark. The award of the arbitration shall be final and binding on both Parties. The arbitration shall be conducted in the English language.`,
              `Governing Law. This Agreement shall be governed by and construed in accordance with the laws of Denmark, without reference to the choice of law provisions thereof. Severability. If any term or provision of this Agreement is held to be illegal or unenforceable, the validity of the remainder of this Agreement shall not be affected.`,
              `Force Majeure. Let's Do Retro shall not be deemed to be in default under this Agreement as long as its failure to perform any of its obligations hereunder is occasioned solely by fire, labour disturbance, acts of civil or military authorities, or any similar cause not known to Let's Do Retro at the time of execution hereof and beyond Let's Do Retro’s reasonable control.`,
              `Assignment. Neither this Agreement, nor any interest hereunder shall be assignable by either party without the prior written consent of the other party. Notwithstanding the foregoing, Let's Do Retro may assign this Agreement to its parent, subsidiary or affiliate company. Let's Do Retro shall also have the right to assign this Agreement in case of a sale of the relevant business of Let's Do Retro to a third party taking over such business.`,
            ]}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Terms;
