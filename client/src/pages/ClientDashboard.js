// src/pages/ClientDashboard.js
import React from 'react';
import { Tab, Tabs, Row, Col } from 'react-bootstrap';
import DashboardLayout from '../components/DashboardLayout';
import EventProfileBuilder from '../components/dashboard/EventProfileBuilder';
import SmartAvailabilityChecker from '../components/dashboard/SmartAvailabilityChecker';
import DocumentUploads from '../components/dashboard/DocumentUploads';
import RealTimeChat from '../components/dashboard/RealTimeChat';
import ReservationTimeline from '../components/dashboard/ReservationTimeline';
import AddOnMarketplace from '../components/dashboard/AddOnMarketplace';
import LoyaltyRewards from '../components/dashboard/LoyaltyRewards';
import InvoiceReceiptCenter from '../components/dashboard/InvoiceReceiptCenter';

// const ClientDashboard = () => {
//   return (
//     <DashboardLayout role="client">
//       <Tabs defaultActiveKey="profile" className="mb-4">
//         <Tab eventKey="profile" title="Event Profile">
//           <EventProfileBuilder />
//         </Tab>
//         <Tab eventKey="availability" title="Availability">
//           <SmartAvailabilityChecker />
//         </Tab>
//         <Tab eventKey="documents" title="Documents">
//           <DocumentUploads />
//         </Tab>
//         <Tab eventKey="chat" title="Chat">
//           <Row>
//             <Col lg={8}><RealTimeChat /></Col>
//             <Col lg={4}><ReservationTimeline /></Col>
//           </Row>
//         </Tab>
//         <Tab eventKey="marketplace" title="Add-Ons">
//           <AddOnMarketplace />
//         </Tab>
//         <Tab eventKey="rewards" title="Loyalty">
//           <LoyaltyRewards />
//         </Tab>
//         <Tab eventKey="invoices" title="Invoices">
//           <InvoiceReceiptCenter />
//         </Tab>
//       </Tabs>
//     </DashboardLayout>
//   );
// };


// src/pages/ClientDashboard.js
const ClientDashboard = () => {
  return (
    <DashboardLayout role="client">
      <Tabs defaultActiveKey="profile" className="mb-4">
        <Tab eventKey="profile" title="Event Profile">
          <EventProfileBuilder />
        </Tab>
        {/* Comment out the rest temporarily */}
        {/* <Tab eventKey="availability" title="Availability"> */}
        {/*   <SmartAvailabilityChecker /> */}
        {/* </Tab> */}
        {/* ... etc */}
      </Tabs>
    </DashboardLayout>
  );
};   
export default ClientDashboard;   