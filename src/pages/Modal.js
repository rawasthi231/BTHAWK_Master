import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: 'absolute',
        top: theme.spacing(5) 
    }
}))

function Popup(props){

    const {title, children, openPopup} = props;
    const classes = useStyles();
    return(
        <Dialog open={openPopup} className={classes.dialogWrapper} style={{minHeight: '80vh',maxHeight: '80vh'}}>
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )


}

export default Popup;







































// import React,{ Component } from 'react';
// import Animateinput from '../animate input/AnimateInput';
// import { Col, Row } from 'reactstrap';

// const PageModal = (props) => {

//         const bodyComponent = () => {
//             console.log(props.hide);
//         }
    
//     return(

//         <div className="modal" id="pageModal">
//             <div className="modal-dialog">
//                 <div className="modal-content">
                
//                     <div className="modal-header" id="modalHeader">
//                         <Row>
//                             <Col md="11" sm="11">
//                                 <div id="modalHeaderHeading"></div>
//                             </Col>
//                             <Col md="1" sm="1">
//                                 <button type="button" className="close" onClick={props.hide}>&times;</button>
//                             </Col>
//                         </Row>  
                        
//                     </div>

//                     <div className="modal-body" id="modalBody" onLoad={() => bodyComponent}></div>

//                     <div className="modal-footer" id="modalFooter">
//                         <button type="button" className="btn btn-danger" onClick={props.hide}>Close</button>
//                     </div>
                    
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default PageModal;