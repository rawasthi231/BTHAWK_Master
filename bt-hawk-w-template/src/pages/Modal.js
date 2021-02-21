import React,{ Component } from 'react';
import Animateinput from '../animate input/AnimateInput';
import { Col, Row } from 'reactstrap';

const PageModal = (props) => {
    Animateinput.toString = () => {
        return Animateinput 
    }
    
    return(
        <div className="modal" id="pageModal">
            <div className="modal-dialog">
                <div className="modal-content">
                
                    <div className="modal-header" id="modalHeader">
                        <Row>
                            <Col md="11" sm="11">
                                <div id="modalHeaderHeading"></div>
                            </Col>
                            <Col md="1" sm="1">
                                <button type="button" className="close" onClick={props.hide}>&times;</button>
                            </Col>
                        </Row>  
                        
                    </div>

                    <div className="modal-body" id="modalBody"></div>

                    <div className="modal-footer" id="modalFooter">
                        <button type="button" className="btn btn-danger" onClick={props.hide}>Close</button>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default PageModal;