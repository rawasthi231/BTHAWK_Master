import React, { Component } from 'react';
import './css/profile.css';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader } from 'reactstrap';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Animateinput from '../animate input/AnimateInput';
import ProfileLogo from '../images/team7.jpg';

class Profile extends Component {

    state = {
        class: ''
    }

    getTab = (evt, showId) => {
        var elem = document.getElementsByClassName('profile-nav-link');
        var tabElement = document.getElementsByClassName('tabItems');

        for (let show = 0; show < tabElement.length; show++) {
            $(tabElement[show]).css("display", 'none');
        }

        for (let i = 0; i < elem.length; i++) {
            elem[i].className = elem[i].className.replace(" profile_active", "");
        }

        // console.log(evt.target.parentNode.className);
        
        evt.target.parentNode.className += ' profile_active';

        $('#' + showId + '').fadeIn();
    }

    render() {
        return (
            <div className="page-content-wrapper">
                <div className="page-content">
                    <div className="page-bar" style={{ marginBottom: '-20px' }}>
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

                        <Card>
                            <Container fluid style={{ padding: '20px' }}>
                                <Row md={12}>
                                    {/* profile View */}

                                    <Col xl={4} md={4} lg={4} sm={5} xs={12}>
                                        <CardBody>
                                            <Card className="my-card">
                                                <CardBody>
                                                    <div className="profile-img">
                                                        <img className="img-fluid img-round" src={ProfileLogo} width='140px' height='140px' />
                                                    </div>
                                                    <div className="profile-info">
                                                        <h3>Mr. John</h3>
                                                        <p>Firm Name Here</p>
                                                    </div><br /><br />
                                                </CardBody>
                                            </Card>
                                            <Card className="my-card" style={{ marginTop: '4px' }}>
                                                <CardBody className="contact-info-title">
                                                    <span>Contact Information</span>
                                                </CardBody>
                                                <CardBody>
                                                    <Container fluid className="contact-info">
                                                        <div>
                                                            <small>Official Mail:</small><br />
                                                            <span>example@gmail.com</span>
                                                        </div><hr style={{ margin: '10px' }} />
                                                        <div>
                                                            <small>Contact No.:</small><br />
                                                            <span>1234567890</span>
                                                        </div><hr style={{ margin: '10px' }} />
                                                        <div>
                                                            <small>Personal Mail ID:</small><br />
                                                            <span>example@gmail.com</span>
                                                        </div><hr style={{ margin: '10px' }} />
                                                    </Container>
                                                </CardBody>
                                            </Card>
                                        </CardBody>
                                    </Col>

                                    {/* profile type */}
                                    <Col xl={8} md={8} lg={8} sm={7} xs={12}>
                                        <Card className="my-card">
                                            <CardBody className="profile-type-list">
                                                <li className="profile-nav-link profile_active" onClick={(event) => this.getTab(event, 'personal')}>
                                                    <button className="btn btn-xs"><span className="icon-user">&nbsp;</span>Personal Info</button>
                                                </li>

                                                <li className="profile-nav-link" onClick={(event) => this.getTab(event, 'changePass')}>
                                                    <button className="btn btn-xs"><span className="icon-calendar">&nbsp;</span>Change Password</button>
                                                </li>

                                                <li className="profile-nav-link" onClick={(event) => this.getTab(event, 'subscription')}>
                                                    <button className="btn btn-xs"><span className="icon-credit-card">&nbsp;</span>Subscription</button>
                                                </li>

                                                <li className="profile-nav-link" onClick={(event) => this.getTab(event, 'setting')}>
                                                    <button className="btn btn-xs"><span className="icon-settings">&nbsp;</span>Settings</button>
                                                </li>

                                                <li className="profile-nav-link" onClick={(event) => this.getTab(event, 'accountInfo')}>
                                                    <button className="btn btn-xs"><span className="icon-notebook">&nbsp;</span>Account Info</button>
                                                </li>

                                                <li className="profile-nav-link" onClick={(event) => this.getTab(event, 'term_condi')}>
                                                    <button className="btn btn-xs"><span className="fa fa-info-circle">&nbsp;</span>Terms & Condition</button>
                                                </li>
                                            </CardBody>
                                        </Card>

                                        <Card className="my-card" style={{ marginTop: '20px' }}>
                                            <CardBody className="tabItems activeProfileTab" id="personal">
                                                <div>
                                                    <h1>Personal</h1>
                                                </div>
                                            </CardBody>

                                            <CardBody className="tabItems " id="changePass">
                                                <div>
                                                    <h1>Change pass</h1>
                                                </div>
                                            </CardBody>

                                            <CardBody className="tabItems " id="subscription">
                                                <div>
                                                    <h1>Subscription</h1>
                                                </div>
                                            </CardBody>

                                            <CardBody className="tabItems " id="setting">
                                                <div>
                                                    <h1>Setting</h1>
                                                </div>
                                            </CardBody>

                                            <CardBody className="tabItems " id="accountInfo">
                                                <div>
                                                    <h1>Account</h1>
                                                </div>
                                            </CardBody>

                                            <CardBody className="tabItems " id="term_condi">
                                                <div>
                                                    <h1>Term Condition</h1>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Container>

                        </Card>

                    </section>

                </div>
            </div>
        )
    }
}

export default Profile;
