import React, { Component, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Container, Row, Col, Button} from 'reactstrap';
function MydModal(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Using Grid in Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="show-grid">
        <Container>
          <Row>
            <Col xs={12} md={8}>
              .col-xs-12 .col-md-8
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>

          <Row>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
            <Col xs={6} md={4}>
              .col-xs-6 .col-md-4
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function App() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch modal with grid
      </Button>
      <MydModal show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  )
}


// import React, { useState } from 'react';
// import { Alert } from 'react-st-modal';
// import { Confirm } from 'react-st-modal';
// //import { CustomDialog, useDialog } from 'react-st-modal';
// import { ModalContent, ModalFooter, ModalButton, useDialog } from 'react-st-modal';

// function CustomDialogContent1() {
//   const dialog = useDialog();

//   const [value, setValue] = useState();

//   return (
//       <div>
//         <ModalContent>
//           <div>Custom dialog content</div>
//           <label>
//             Input value:
//             <input
//               type="text"
//               onChange={(e) => {
//                 setValue(e.target.value);
//               }}
//             />
//           </label>
//         </ModalContent>
//         <ModalFooter>
//           <ModalButton
//             onClick={() => {
//               dialog.close(value);
//             }}
//           >
//             Custom button
//           </ModalButton>
//         </ModalFooter>
//       </div>
//   );
// }

// function CustomDialogContent() {
//   const dialog = useDialog();

//   const [value, setValue] = useState();

//   return (
//     <div>
//       <input
//         type="text"
//         onChange={(e) => {
//           setValue(e.target.value);
//         }}
//       />
//       <button
//         onClick={() => {
//           // Сlose the dialog and return the value
//           dialog.close(value);
//         }}
//       >
//         Custom button
//       </button>
//     </div>
//   );
// }

// function CustomExample() {
//   return (
//     <div>
//       <button
//         onClick={async () => {
//           const result = await CustomDialog(<CustomDialogContent />, {
//             title: 'Custom Dialog',
//             showCloseIcon: true,
//           });
//         }}
//       >
//         Custom
//       </button>
//     </div>
//   );
// }
// function ConfirmExample() {
//   return (
//     <div>
//       <button
//         onClick={async () => {
//           const result = await Confirm('Сonfirmation text', 
//             'Сonfirmation title');
          
//           if (result) {
//             // Сonfirmation confirmed
//           } else {
//             // Сonfirmation not confirmed
//           }
//         }}
//       >
//         Confirm
//       </button>
//     </div>
//   );
// }

// function AlertExample() {
//   return (
//     <div  >
//       <button
//         onClick={async () => {
//           await Alert('Alert text', 'Alert title');
//         }}
//       >
//           Alert
//       </button>
//     </div>
//   );
// }


export default MydModal;