import React, { Component } from 'react';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader, CardFooter, Table } from 'reactstrap';
import Animateinput from '../animate input/AnimateInput';
import { Button } from 'bootstrap';
import Modal from 'react-modal';

export default class confirmationModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: this.props.show
    }
  }
  customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '80%',
      border: 'none',
      position: 'absolute',
      OverflowX:'auto',
      scrollY:true 
    }
  };

  submitForm() {
    this.setState({ showPopup: false });
    //console.log('Popup Closed');
  }

  render() {
    const { children } = this.props;
    return (
      <Modal isOpen={this.props.show} onRequestClose={() => { return true }} ariaHideApp={false} style={this.customStyles} shouldCloseOnOverlayClick={false}>
        <section>
          <Card className="my-card">
            <CardHeader style={{borderBottom:'0.5px'}}>
              <Row style={{ padding: '8px' }}>
                <Col md={12} lg={12} xl={12} xs={12} sm={12}>
                  <h4>
                    <span className="fa fa-info-circle">&nbsp;&nbsp;</span>
                    <b>Confirmation</b>
                  </h4>
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              {children}
            </CardBody>
          </Card>
        </section>
      </Modal>
    )
  }
}


/*
import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
//Modal.setAppElement('#yourAppElement')

function App(){
  var subtitle;
  const [modalIsOpen,setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal(){
    setIsOpen(false);
  }

    return (
      <div>
        <button onClick={openModal}>Open Modal</button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal">

          <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
          <button onClick={closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
}

export default App;
*/