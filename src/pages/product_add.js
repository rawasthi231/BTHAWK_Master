import React, { Component } from 'react';
import { renderToString } from 'react-dom/server'
import './css/product_catagory.css';
import $ from 'jquery';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Animateinput from '../animate input/AnimateInput';
import Popup from './Modal';
import { Form } from 'react-bootstrap';
import { Button } from 'bootstrap';

class productAdd extends Component {


    getValue(evt){
        console.log(evt.target);
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
                                <span>&nbsp;Add Product</span>
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
                            </div>
                        </div>
                    </div><hr />

                    <section>

                        <Card className="my-card">
                            <CardBody>
                                <Container fluid>
                                    <Row style={{padding:'20px 0px 2px 0px'}}>
                                        <Col md={4} className="form-group">
                                            <select className="form-control" name="selectCatagory" id="selectCatagory">
                                                <option value="" defaultValue disabled>Select Category</option>
                                            </select>
                                        </Col>
                                        <Col md={4} className="form-group">
                                            <select className="form-control" name="selectCatagory" id="selectCatagory">
                                                <option value="" defaultValue disabled>Select Category</option>
                                            </select>
                                        </Col>
                                        <Col md={4} className="form-group">
                                            <Animateinput label='Product Name *' customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px'}} attr={{required:true, onKeyUp: (event) => this.getValue(event), }} />
                                        </Col>
                                    </Row>    
                                    <Row style={{padding:'2px 0px 2px 0px'}}>
                                        <Col md={4} className="form-group">
                                            <select className="form-control" name="productService" id="productService">
                                                <option value="" defaultValue disabled>Select Service</option>
                                                <option>FMCG</option>
                                                <option>Serial No</option>
                                            </select>
                                        </Col>

                                        <Col md={4} className="form-group">
                                            <select className="form-control" name="maintaineInventory" id="maintaineInventory">
                                                <option value="" defaultValue disabled>Maintain Inventory</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </Col>

                                        <Col md={4} className="form-group">
                                            <select className="form-control" name="item_type" id="item_type">
                                                <option value="" defaultValue disabled>Item Type</option>
                                                <option>Raw Material</option>
                                                <option>Finished Product</option>
                                            </select>
                                        </Col>
                                    </Row>

                                    <Row style={{padding:'2px 0px 2px 0px'}}>
                                        <Col md={4} className="form-group">
                                            <select className="form-control" name="cosumableRowProduct" id="cosumableRowProduct">
                                                <option value="" defaultValue disabled>Consumable Raw Product</option>
                                                <option>FMCG</option>
                                                <option>Serial No</option>
                                            </select>
                                        </Col>

                                        <Col md={4} className="form-group">
                                            <select className="form-control" name="gstAppSale" id="gstAppSale">
                                                <option value="" defaultValue disabled>GST Applicable on Sale</option>
                                                <option>Yes</option>
                                                <option>No</option>
                                            </select>
                                        </Col>

                                        <Col md={4} className="form-group">
                                            <select className="form-control" name="productService" id="productService">
                                                <option value="" defaultValue disabled>GST %</option>
                                                <option>0.25%</option>
                                                <option>5%</option>
                                                <option>8%</option>
                                                <option>12%</option>
                                                <option>18%</option>
                                                <option>28%</option>
                                            </select>
                                        </Col>
                                    </Row>

                                    <Row style={{padding:'2px 0px 2px 0px'}}>
                                        <Col md={4} className="form-group">
                                            <Animateinput label="Sale Price" customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px'}} attr={{type: 'text',name:'salePrice'}} />
                                        </Col>

                                        <Col md={4} className="form-group">
                                            <Row>
                                                <Col md={6}>
                                                    <Animateinput label='Inclusive Price' customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px'}} attr={{type: 'text',name:'inclusivePrice'}} />
                                                </Col>
                                                <Col md={6}>
                                                    <Animateinput label='Exclusive Price' customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px'}} attr={{type: 'text',name:'exclusivePrice'}} />
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={4} className="form-group">
                                            <Animateinput label="Dealer Price" customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px'}} attr={{type: 'text',name:'dealerPrice'}} />
                                        </Col>
                                    </Row>

                                    <Row style={{padding:'2px 0px 2px 0px'}}>
                                        <Col md={4} className="form-group">
                                            <Animateinput label="MRP Price" customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px'}} attr={{type: 'text',name:'mrpPrice'}} />
                                        </Col>
                                        <Col md={4} className="form-group">
                                            <Animateinput label="Alias" customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px'}} attr={{type: 'text',name:'alise'}} />
                                        </Col>
                                        <Col md={4} className="form-group">
                                            <Animateinput label="HSN Code" customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px'}} attr={{type: 'text',name:'hsnCode'}} />
                                        </Col>
                                    </Row>

                                    <Row style={{padding:'2px 0px 2px 0px'}}>
                                        <Col md={4} className="form-group">
                                            <select className="form-control" id="" name="">
                                                <option value="" defaultValue disabled>Measurement Unit</option>
                                                <option>Gm</option>
                                                <option>Kg</option>
                                                <option>Meter</option>
                                                <option>Pcs</option>
                                                <option>Running Fast</option>
                                                <option>Square Feet</option>
                                            </select>
                                        </Col>
                                        <Col md={8} className="form-group">
                                            <Row>
                                                <Col md={4}>
                                                    <label style={{color: '#1c237e'}}>
                                                        <input type="checkbox" value="Allow_quantity_in_decimal" />  Allow quantity in decimal
                                                    </label>
                                                </Col>

                                                <Col md={4}>
                                                    <label style={{color: '#1c237e'}}>
                                                        <input type="checkbox" value="discount_applicable" /> Discount Applicable
                                                    </label>
                                                </Col>

                                                <Col md={4}>
                                                    <label style={{color: '#1c237e'}}>
                                                        <input type="checkbox" value="cess_applicable" /> Cess Applicable
                                                    </label>
                                                </Col>

                                            </Row>
                                            
                                            
                                        </Col>
                                    </Row>

                                    <Row style={{padding:'2px 0px 2px 0px'}}>
                                        <Col md={4} className="form-group">
                                            <Animateinput label="Low Stock Quantity" customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px'}} attr={{type: 'text',name:'lowSrockQuant'}} />
                                        </Col>
                                        <Col md={4} className="form-group">
                                            <Animateinput label="Discount (%)" customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px'}} attr={{type: 'text',name:'discountPrec'}} />
                                        </Col>
                                        <Col md={4} className="form-group">
                                            <Animateinput label="Cess Amount (PC)" customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px'}} attr={{type: 'text',name:'cessAmt'}} />
                                        </Col>
                                    </Row>

                                    <Row style={{padding:'2px 0px 2px 0px'}}>
                                        <Col md={4} className="form-group">
                                            <Animateinput label="Cess Discount (%)" customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px'}} attr={{type: 'text',name:'cessDisc'}} />
                                        </Col>
                                        <Col md={8} className="form-group">
                                            <button className="btn btn-primary" >Submit</button>
                                        </Col>
                                    </Row>

                                </Container>
                            </CardBody>
                        </Card>

                    </section>

                </div>
            </div>
        )
    }
}

export default productAdd;