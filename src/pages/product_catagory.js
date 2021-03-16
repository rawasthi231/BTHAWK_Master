import React, { Component } from 'react';
import { renderToString } from 'react-dom/server'
import './css/product_catagory.css';
import $ from 'jquery';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Animateinput from '../animate input/AnimateInput';
import Popup from './Modal';

class ProductCatagory extends Component {
    state = {
        loading: false,
        popupShow: false,
        addCategory: '',
        data:[]
    }

    categoryStateAdd(evt){
        this.setState({addCategory: evt.target.value});   
    }

    categoryAdd(){
        $.ajax({
            url: 'http://localhost:5000/add_product_category',
            method: 'post',
            data: this.state.addCategory,
            beforeSend: function(){
                // this.setState({loading: true});
                console.log('yash');
            },
            success: function(res){
               if(res.affectedRows > 0){
                    
                    // this.setState({popupShow: false});
                    alert('Inserted SuccessFully');
                    
               }
            }
        });
    }

    searchFilter(evt){
        
        var value = (evt.target.value).toLowerCase();
        $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
          
    }

    dynamicTable = () =>{
        var list;
        this.state.data.map((data,pos) => {

            return <tr><td>{data}</td></tr>;
            
        });
    }

    render() { 
        const {data} = this.state; 
        
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
                                <button className="btn btn-xs button-radius" onClick={() => this.setState({popupShow: true})}>
                                    <span className="fa fa-plus">&nbsp;</span>
                                    <small><b>Add Catagory</b></small>
                                </button>
                                
                                <Popup title={<div>Category Name</div>} openPopup={this.state.popupShow} >
                                    <div className="form-group">
                                        <Animateinput label='Catagory Name' attr={{type: 'text', onChange:(event)=>this.categoryStateAdd(event)}} /><hr />

                                        {/* {this.state.loading ? (<button className="btn btn-primary" disabled><img src="./assets/layouts/layout/img/ajax-loading.gif" /></button>) : (<button className="btn btn-primary" onClick={(event)=>this.categoryAdd(event)}>Submit</button>) } */}
                                        <button className="btn btn-primary" onClick={(event)=>this.categoryAdd(event)}>Submit</button>
                                        <button className="btn btn-danger" onClick={() => this.setState({popupShow: false})}>Close</button>
                                    </div>
                                </Popup>

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
                                            <Col md={6} lg={6} xl={6} xs={12} sm={12}>
                                               
                                                <Animateinput label='Search' attr={{type:"text",onKeyUp:(event)=>this.searchFilter(event)}} customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px',width:'50%'}} /> 
                                                  
                                            </Col>
                                            <Col md={6} lg={6} xl={6} xs={12} sm={12}>
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
                                                { data.map((category,pos) => (
                                                    <tr key={pos+1}>
                                                        <td>{category.no}</td>
                                                        <td>{category.category_name}</td>
                                                        <td>
                                                            <button className="btn btn-xs button-radius" style={{borderRadius: '50px'}}><span className="fa fa-barcode "></span></button>&nbsp; 
                                                            <button className="btn btn-xs button-radius" style={{borderRadius: '50px'}}><span className="fa fa-pencil-square-o"></span></button>&nbsp; 
                                                            <button className="btn btn-xs button-radius">Deactivate</button>
                                                        </td>
                                                    </tr>
                                                ) )}
                                                
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