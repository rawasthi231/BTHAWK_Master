import React, { Component } from 'react';
import './css/main.css';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader } from 'reactstrap';
import $ from 'jquery';
import { Link } from 'react-router-dom';

class Profile extends Component {

    state = {
        class: ''
    }

    getTab = (evt,showId) =>{
        var elem = document.getElementsByClassName('profile-nav-link');
        var tabElement = document.getElementsByClassName('tabItems');

        for (let show = 0; show < tabElement.length; show++) {  
            $(tabElement[show]).css("display", 'none');
        }

        for (let i = 1; i < elem.length; i++) {
            elem[i].className = elem[i].className.replace(" profile_active","");
        }

        $('.'+ evt.target.className+'').parent().addClass(' profile_active');
        $('#'+showId+'').css('display', 'block');
    }

    render() {
        return (
            <div className="page-content-wrapper">
                <div className="page-content">
                    <div className="page-bar" style={{marginBottom: '-20px'}}>
                        <ul className="page-breadcrumb">
                            <li>
                                <Link to='/'>Home&nbsp;</Link>
                                <i className="fa fa-circle"></i>
                            </li>
                            <li>
                                <span>&nbsp;Profile Detail</span>
                            </li>
                        </ul>
                    </div><hr />
                    <section>
                            <Row className="profile-type-row">
                                <Col md={3}>
                                    <div className="profile-nav-link">
                                        <li style={{display: 'block', marginTop:'20px'}}>
                                            <h4 style={{color: '#578ebe'}}><b>Profile Account</b></h4>
                                        </li>
                                    </div>
                                </Col>
                                <Col md={9} className="profile-type">
                                    <li className="profile-nav-link" onClick={(event) => this.getTab(event,'personal')}>
                                        <h5 className="personal"><span className="icon-user">&nbsp;</span>Personal Info</h5>
                                    </li>
                                    <li className="profile-nav-link" onClick={(event) => this.getTab(event,'changePass')}>
                                        <h5 className="changePass"><span className="icon-calendar">&nbsp;</span>Change Password</h5>
                                    </li>
                                    <li className="profile-nav-link" onClick={(event) => this.getTab(event,'subscription')}>
                                        <h5 className="subscription"><span className="icon-credit-card">&nbsp;</span>Subscription</h5>
                                    </li>
                                    <li className="profile-nav-link" onClick={(event) => this.getTab(event,'setting')}>
                                        <h5 className="setting"><span className="icon-settings">&nbsp;</span>Settings</h5>
                                    </li>
                                    <li className="profile-nav-link" onClick={(event) => this.getTab(event,'accountInfo')}>
                                        <h5 className="accountInfo"><span className="icon-notebook">&nbsp;</span>Account Info</h5>
                                    </li>
                                    <li className="profile-nav-link" onClick={(event) => this.getTab(event,'term_condi')}>
                                        <h5 className="term_condi"><span className="fa fa-info-circle">&nbsp;</span>Terms And Condition</h5>
                                    </li>
                                </Col>
                            </Row><hr style={{margin: '0', padding: '0'}} />
                        
                    </section>

                    <section>
                        
                        <Card>
                            <Container fluid>
                                <CardBody className="tabItems" id="personal">
                                    <h2>Personal</h2>
                                </CardBody>
                                <CardBody className="tabItems" id="changePass">
                                    <h2>Change pass</h2>
                                </CardBody>
                                <CardBody className="tabItems" id="subscription">
                                    <h2>Subscription</h2>
                                </CardBody>
                                <CardBody className="tabItems" id="setting">
                                    <h2>setting</h2>
                                </CardBody>
                                <CardBody className="tabItems" id="accountInfo">
                                    <h2>account info</h2>
                                </CardBody>
                                <CardBody className="tabItems" id="term_condi">
                                    <h2>term Condition</h2>
                                </CardBody>
                           </Container> 
                        </Card>
                        
                    </section>
                    
                </div>
            </div>
        )
    }
}

export default Profile;
