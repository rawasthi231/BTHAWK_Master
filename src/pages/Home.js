import React, { Component } from 'react';
import './css/home.css';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader } from 'reactstrap';
import $ from 'jquery';

class Home extends Component {

    state = {
        Uname: null,
        Upass: null
    }

    getInputVal = e => {
        var keyName = e.target.name;
        this.setState({ [keyName]: e.target.value });
    }

    submitForm = e => {
        e.preventDefault();
        $.ajax({
            url: 'http://localhost:3000/create',
            type: "post",
            datatype: "JSON",
            data: this.state,
            beforeSend: function () {
                $('#submit').val('Loading..');
            },
            success: function (res) {
                console.log(res);
            }
        })
    }

    render() {
        return (
            <div className="page-content-wrapper">
                <div className="page-content">
                    <div className="page-bar" style={{ padding: "10px 30px 10px 30px" }}>
                        <ul className="page-breadcrumb">
                            {/* <li>
                                <a href="index.html">Home</a>
                                <i className="fa fa-circle"></i>
                            </li>
                            <li>
                                <span>Dashboard</span>
                            </li> */}
                            <li style={{ display: "flex", marginTop: '5px' }}>
                                <span className="icon-home fa-2x" style={{ color: "black", fontSize: '17px', marginTop: '4px', padding: '0' }}></span>&nbsp;
                                <span style={{ color: "black", fontSize: '18px', fontWeight: '800' }}>Business Insights</span>
                            </li>
                        </ul>
                        <div className="page-toolbar">
                            {/* <div id="dashboard-report-range" className="pull-right tooltips btn btn-sm" data-container="body" data-placement="bottom" data-original-title="Change dashboard date range">
                                <i className="icon-calendar"></i>&nbsp;
                                <span className="thin uppercase hidden-xs"></span>&nbsp;
                                <i className="fa fa-angle-down"></i>
                            </div> */}
                            <div>
                                <button className="btn btn-xs button-radius"><span className="fa fa-object-group">&nbsp;</span><small><b>Low Stock List</b></small></button>
                            </div>
                        </div>
                    </div>
                    <section className="homeLayout">

                        <Row xs={12} xl={12} sm={12} md={12} lg={12}>
                            <Col xl={9} md={9} sm={12} xs={12}>
                                <Row>
                                    <Col xl={6} md={6} sm={6} xs={6} lg={6} style={{ marginTop: '10px' }}>
                                        <Card style={{ border: '1px solid #fbe1e3' }}>
                                            <CardHeader style={{ background: "#fbe1e3", padding: '11px' }}>
                                                <CardTitle style={{ color: '#e73d4a', fontWeight: '700' }}>Sales</CardTitle>
                                            </CardHeader>

                                            <CardBody>
                                                <Container fluid>
                                                    <Row>
                                                        <Col md={6} xl={6} sm={6} xs={6}>
                                                            <Card style={{ paddingTop: '12px' }}>
                                                                <CardBody style={{ borderBottom: '20px solid rgba(255, 128, 0, .9)' }}>
                                                                    <div>
                                                                        <span style={{ fontSize: '20px' }}>
                                                                            <i className="fa fa-inr"></i>
                                                                            <span><b><strong> 0</strong></b></span>
                                                                        </span>

                                                                        <h6 style={{ color: '#6b6c72', marginTop: '0px' }}><b>FTD</b></h6>
                                                                    </div>

                                                                </CardBody>
                                                            </Card>
                                                        </Col>

                                                        <Col md={6} xl={6} sm={6} xs={6}>
                                                            <Card style={{ paddingTop: '12px' }}>
                                                                <CardBody style={{ borderBottom: '20px solid #d4d7dc' }}>
                                                                    <div>
                                                                        <span style={{ fontSize: '20px' }}>
                                                                            <i className="fa fa-inr"></i>
                                                                            <span><b><strong> 0</strong></b></span>
                                                                        </span>
                                                                        <h6 style={{ color: '#6b6c72', marginTop: '0px' }}><b>MTD</b></h6>
                                                                    </div>

                                                                </CardBody>
                                                            </Card>
                                                        </Col>

                                                        <Col md={6} xl={6} sm={6} xs={6}>
                                                            <Card style={{ paddingTop: '12px' }}>
                                                                <CardBody style={{ borderBottom: '20px solid #7cd200' }}>
                                                                    <div>
                                                                        <span style={{ fontSize: '20px' }}>
                                                                            <i className="fa fa-inr"></i>
                                                                            <span><b><strong> 0</strong></b></span>
                                                                        </span>
                                                                        <h6 style={{ color: '#6b6c72', marginTop: '0px' }}><b>LAST MONTH</b></h6>
                                                                    </div>

                                                                </CardBody>
                                                            </Card>
                                                        </Col>

                                                        <Col md={6} xl={6} sm={6} xs={6}>
                                                            <Card style={{ paddingTop: '12px' }}>
                                                                <CardBody style={{ borderBottom: '20px solid #108000' }}>
                                                                    <div>
                                                                        <span style={{ fontSize: '20px' }}>
                                                                            <i className="fa fa-inr"></i>
                                                                            <span><b><strong> 0</strong></b></span>
                                                                        </span>
                                                                        <h6 style={{ color: '#6b6c72', marginTop: '0px' }}><b>MTD LAST MONTH</b></h6>
                                                                    </div>

                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </Row><br />
                                                </Container>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                    <Col xl={6} md={6} sm={6} xs={6} lg={6} style={{ marginTop: '10px' }}>

                                        <Card style={{ border: '1px solid #abe7ed' }}>
                                            <CardHeader style={{ background: "#abe7ed", padding: '11px' }}>
                                                <CardTitle style={{ color: '#27a4b0', fontWeight: '700' }}>Invoice (MTD)</CardTitle>
                                            </CardHeader>

                                            <CardBody>
                                                <Container fluid>
                                                    <Row>
                                                        <Col md={6} xl={6} sm={6} xs={6}>
                                                            <Card style={{ paddingTop: '12px' }}>
                                                                <CardBody style={{ borderBottom: '20px solid rgba(255, 128, 0, .9)' }}>
                                                                    <div>
                                                                        <span style={{ fontSize: '20px' }}>
                                                                            <span><b><strong> 0</strong></b></span>
                                                                        </span>
                                                                        <h6 style={{ color: '#6b6c72', marginTop: '0px' }}><b>TOTAL BILLS</b></h6>
                                                                    </div>

                                                                </CardBody>
                                                            </Card>
                                                        </Col>

                                                        <Col md={6} xl={6} sm={6} xs={6}>
                                                            <Card style={{ paddingTop: '12px' }}>
                                                                <CardBody style={{ borderBottom: '20px solid #d4d7dc' }}>
                                                                    <div>
                                                                        <span style={{ fontSize: '20px' }}>
                                                                            <span><b><strong> 0</strong></b></span>
                                                                        </span>
                                                                        <h6 style={{ color: '#6b6c72', marginTop: '0px' }}><b>CREDIT BILLS</b></h6>
                                                                    </div>

                                                                </CardBody>
                                                            </Card>
                                                        </Col>

                                                        <Col md={6} xl={6} sm={6} xs={6}>
                                                            <Card style={{ paddingTop: '12px' }}>
                                                                <CardBody style={{ borderBottom: '20px solid #7cd200' }}>
                                                                    <div>
                                                                        <span style={{ fontSize: '20px' }}>
                                                                            <span><b><strong> 0</strong></b></span>
                                                                        </span>
                                                                        <h6 style={{ color: '#6b6c72', marginTop: '0px' }}><b>DELIVERY CHALLAN</b></h6>
                                                                    </div>

                                                                </CardBody>
                                                            </Card>
                                                        </Col>

                                                        <Col md={6} xl={6} sm={6} xs={6}>
                                                            <Card style={{ paddingTop: '12px' }}>
                                                                <CardBody style={{ borderBottom: '20px solid #108000' }}>
                                                                    <div>
                                                                        <span style={{ fontSize: '20px' }}>
                                                                            <span><b><strong> 0</strong></b></span>
                                                                        </span>
                                                                        <h6 style={{ color: '#6b6c72', marginTop: '0px' }}><b>OUTSTANDING AMOUNT</b></h6>
                                                                    </div>

                                                                </CardBody>
                                                            </Card>
                                                        </Col>
                                                    </Row><br />
                                                </Container>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                    <Col xl={6} md={6} sm={6} xs={6} lg={6} style={{ marginTop: '10px' }}>

                                        <Card style={{ border: '1px solid #e0ebf9' }}>
                                            <CardHeader style={{ background: "#e0ebf9", padding: '11px' }}>
                                                <CardTitle style={{ color: '#327ad5', fontWeight: '700' }}>Sale VS Purchase (MTD)</CardTitle>
                                            </CardHeader>

                                            <CardBody>
                                                <Container fluid>
                                                    <Row>
                                                        <Col md={6} xl={6} sm={6} xs={6}>
                                                            <Card style={{ paddingTop: '12px' }}>
                                                                <CardBody style={{ borderBottom: '20px solid #FF8000' }}>
                                                                    <div>
                                                                        <span style={{ fontSize: '20px' }}>
                                                                            <i className="fa fa-inr"></i>
                                                                            <span><b><strong> 0</strong></b></span>
                                                                        </span>
                                                                        <h6 style={{ color: '#6b6c72', marginTop: '0px' }}><b>TOTAL SALES</b></h6>
                                                                    </div>

                                                                </CardBody>
                                                            </Card>
                                                        </Col>

                                                        <Col md={6} xl={6} sm={6} xs={6}>
                                                            <Card style={{ paddingTop: '12px' }}>
                                                                <CardBody style={{ borderBottom: '20px solid red' }}>
                                                                    <div>
                                                                        <span style={{ fontSize: '20px' }}>
                                                                            <i className="fa fa-inr"></i>
                                                                            <span><b><strong> 0</strong></b></span>
                                                                        </span>
                                                                        <h6 style={{ color: '#6b6c72', marginTop: '0px' }}><b>CREDIT PURCHASE</b></h6>
                                                                    </div>

                                                                </CardBody>
                                                            </Card>
                                                        </Col>

                                                    </Row><br />
                                                </Container>
                                            </CardBody>
                                        </Card>
                                    </Col>

                                    <Col xl={6} md={6} sm={6} xs={6} lg={6} style={{ marginTop: '10px' }}>

                                        <Card style={{ border: '1px solid #f9e491' }}>
                                            <CardHeader style={{ background: "#f9e491", padding: '11px' }}>
                                                <CardTitle style={{ color: '#c29d0b', fontWeight: '700' }}>Sale VS Purchase (MTD)</CardTitle>
                                            </CardHeader>

                                            <CardBody>
                                                <Container fluid>
                                                    <Row>
                                                        <Col md={12} xl={12} sm={12} xs={12}>
                                                            <Card style={{ paddingTop: '12px' }}>
                                                                <CardBody >
                                                                    <span style={{ color: 'red', fontSize: '40px' }}>0</span>
                                                                </CardBody>
                                                            </Card>
                                                        </Col>

                                                    </Row><br />
                                                </Container>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                            </Col>
                            <Col xl={3} md={3} sm={12} xl={12}>
                                <Col xl={12} md={12} sm={12} xs={12} lg={12} style={{ marginTop: '10px' }}>

                                    <Card >

                                        <CardBody className="card-radius" style={{border: '1px solid #8E44AD', background: "#8E44AD", padding: '11px'}}>
                                            <Container fluid>
                                                <Row>
                                                    <Col md={12} xl={12} sm={12} xs={12}>
                                                        <Card style={{ paddingTop: '12px' }}>
                                                            <CardBody >
                                                                <span style={{color: 'white',float: 'right'}}>
                                                                   <h2 style={{float: 'right'}}>0</h2>
                                                                   <p style={{fontSize:'13px',margin: '0', float: 'right'}}>Pending Stock In Request</p>
                                                                </span>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>

                                                </Row><br />
                                            </Container>
                                        </CardBody>

                                    </Card>
                                </Col>

                                <Col xl={12} md={12} sm={12} xs={12} lg={12} style={{ marginTop: '10px' }}>

                                    <Card>

                                        <CardBody  className="card-radius" style={{border: '1px solid #e4531d', background: "#e4531d", padding: '11px', border: 'none', borderRadius: '20px'}}>
                                            <Container fluid>
                                                <Row>
                                                    <Col md={12} xl={12} sm={12} xs={12}>
                                                        <Card style={{ paddingTop: '12px' }}>
                                                            <CardBody >
                                                                <span style={{color: 'white',float: 'right'}}>
                                                                   <h2 style={{float: 'right'}}>0</h2><br />
                                                                   <p style={{fontSize:'16px', margin: '0', float: 'right'}}>FOS DAY END</p>
                                                                </span>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>

                                                </Row><br />
                                            </Container>
                                        </CardBody>

                                    </Card>
                                </Col>

                                <Col xl={12} md={12} sm={12} xs={12} lg={12} style={{ marginTop: '10px' }}>

                                    <Card>

                                        <CardBody className="card-radius" style={{border: '1px solid #9e9e9e99', background: "#9e9e9e99", padding: '11px'}}>
                                            <Container fluid>
                                                <Row>
                                                    <Col md={12} xl={12} sm={12} xs={12}>
                                                        <Card style={{ paddingTop: '12px' }}>
                                                            <CardBody >
                                                                <span style={{color: 'white',float: 'right'}}>
                                                                   <h2 style={{float: 'right'}}>0</h2><br />
                                                                   <p style={{fontSize:'16px', margin: '0', float: 'right'}}>RENEW DATE</p>
                                                                </span>
                                                            </CardBody>
                                                        </Card>
                                                    </Col>

                                                </Row><br />
                                            </Container>
                                        </CardBody>

                                    </Card>
                                </Col>
                            </Col>
                        </Row>
                    </section>
                </div>
            </div>
        )
    }
}

export default Home;