import React, { Component } from 'react';
import './css/product_catagory.css';
import $ from 'jquery';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Button } from 'bootstrap';

class ProductCatagory extends Component {

    state = {
        class: ''
    }

    searchFilter(evt){
        
        var value = (evt.target.value).toLowerCase();
        $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
          
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
                                <span>&nbsp;Product Catagory</span>
                            </li>
                        </ul>
                        <div className="page-toolbar">
                            {/* <div id="dashboard-report-range" className="pull-right tooltips btn btn-sm" data-container="body" data-placement="bottom" data-original-title="Change dashboard date range">
                                <i className="icon-calendar"></i>&nbsp;
                                <span className="thin uppercase hidden-xs"></span>&nbsp;
                                <i className="fa fa-angle-down"></i>
                            </div> */}
                            <div>

                                <button className="btn btn-xs button-radius" onClick={() => { window.history.back(); }}>
                                    <span className="fa fa-arrow-left">&nbsp;</span>
                                    <small><b>Back</b></small>
                                </button>

                                &nbsp;&nbsp;
                                <button className="btn btn-xs button-radius">
                                    <span className="fa fa-plus">&nbsp;</span>
                                    <small><b>Add Catagory</b></small>
                                </button>
                            </div>
                        </div>
                    </div><hr />

                    <section>
                        <Card className="my-card">
                            <Container fluid>
                                <CardHeader>
                                    <h4 style={{ padding: '12px' }}>
                                        <span className="fa fa-info-circle">&nbsp;&nbsp;</span>
                                        <b>CATAGORY</b>
                                    </h4>
                                </CardHeader><hr />
                                <CardBody className="my-card-body">
                                    <div>
                                        <Row>
                                            <Col md={6}>
                                                <input type="search" placeholder="Search Here" onKeyUp={this.searchFilter} className="form-control" style={{width:'50%'}} />
                                            </Col>
                                            <Col md={6}>
                                                <span className="export-button" style={{float: 'right'}}>
                                                    <button className="btn btn-secondary">Copy</button>&nbsp;
                                                    <button className="btn btn-secondary">Excel</button>&nbsp;
                                                    <button className="btn btn-secondary">PDF</button>&nbsp;
                                                    <button className="btn btn-secondary">Print</button>&nbsp;
                                                </span>
                                            </Col>
                                        </Row>
                                        
                                    </div><br />
                                    <div>
                                        <Table striped bordered hover responsive>
                                            <thead>
                                                <tr>
                                                    <th>S.No.</th>
                                                    <th>Catagory Name</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody id="myTable">
                                                <tr>
                                                    <td>1</td>
                                                    <td>Mark</td>
                                                    <td>
                                                        <button className="btn btn-xs button-radius" style={{borderRadius: '50px'}}><span className="fa fa-barcode "></span></button>&nbsp; 
                                                        <button className="btn btn-xs button-radius" style={{borderRadius: '50px'}}><span className="fa fa-pencil-square-o"></span></button>&nbsp; 
                                                        <button className="btn btn-xs button-radius">Deactivate</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>2</td>
                                                    <td>Jacob</td>
                                                    <td>
                                                        <button className="btn btn-xs button-radius" style={{borderRadius: '50px'}}><span className="fa fa-barcode "></span></button>&nbsp;
                                                        <button className="btn btn-xs button-radius" style={{borderRadius: '50px'}}><span className="fa fa-pencil-square-o"></span></button>&nbsp; 
                                                        <button className="btn btn-xs button-radius">Deactivate</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>3</td>
                                                    <td>Larry the Bird</td>
                                                    <td>
                                                        <button className="btn btn-xs button-radius" style={{borderRadius: '50px'}}><span className="fa fa-barcode "></span></button>&nbsp; 
                                                        <button className="btn btn-xs button-radius" style={{borderRadius: '50px'}}><span className="fa fa-pencil-square-o"></span></button>&nbsp;
                                                        <button className="btn btn-xs button-radius">Deactivate</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </div>
                                </CardBody>
                            </Container>

                        </Card>
                    </section>


                </div>
            </div>
        )
    }
}

export default ProductCatagory;