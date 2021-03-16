import React, { Component } from 'react';
import './css/profile.css';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader, Table } from 'reactstrap';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Animateinput from '../animate input/AnimateInput';
import Popup from './Modal';
import { toast, ToastContainer } from 'react-toastify';
import { injectStyle } from "react-toastify/dist/inject-style";

class SubCategory extends Component {

    state = {
        refresh: false,
        popupShow: false,
        category: '',
        sub_category: '',
        data: []
    }

    searchFilter(evt){
        
        var value = (evt.target.value).toLowerCase();
        $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
          
    }

    fetchCategory(){
        var fetchData = $.ajax({
            url: 'http://localhost:5000/get_product_category',
            type: "POST",
            dataType: 'JSON',
            async:false,
            contentType: 'application/x-www-form-urlencoded',
            data: {id: '3'}
        }).responseJSON;
        return fetchData;
    }

    fetchSubCategory(){
        var fetchData = $.ajax({
            url: 'http://localhost:5000/get_product_sub_category',
            type: "POST",
            dataType: 'JSON',
            async:false,
            contentType: 'application/x-www-form-urlencoded',
            data: {id: '3', status: 'active'}
        }).responseJSON;
        return fetchData;
    }

    addSubCategory(evt){
        var name = evt.target.name;
        this.setState({[name]: evt.target.value});
    }

    subCategoryAdd(){
        var add = $.ajax({
                url: 'http://localhost:5000/add_sub_category',
                method: 'POST',
                dataType: 'JSON',
                    async: false,
                    data: {
                        category: this.state.category, 
                        sub_category: this.state.sub_category
                    }
                }).responseJSON;

            if (add.affectedRows > 0) {
                this.setState({popupShow: false});
                toast("Inserted SuccessFully");
            }
        }

        updateStatus(key, value){
            var change = $.ajax({
                url: 'http://localhost:5000/change_status_product_sub_category',
                method: 'post',
                dataType: 'JSON',
                async:false,
                data: {id: key, val: value}
            }).responseJSON;
            
            if (change.affectedRows > 0) {
                toast.dismiss();
                toast.success("Updated SuccessFully", {autoClose: 3000})
                this.setState({refresh: true});
            }
            
        }

    render() {
        var category_fetch = (this.fetchCategory());
        var fetch = (this.fetchSubCategory());
        var count = 1;
        
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
                                <span>&nbsp;Sub-Category</span>
                            </li>
                        </ul>
                        <div className="page-toolbar">
                            <div>

                                <button className="btn btn-xs button-radius" onClick={() => { window.history.back(); }}>
                                    <span className="fa fa-arrow-left">&nbsp;</span>
                                    <small><b>Back</b></small>
                                </button>

                                &nbsp;&nbsp;
                                <button className="btn btn-xs button-radius" onClick={() => this.setState({popupShow: true})}>
                                    <span className="fa fa-plus">&nbsp;</span>
                                    <small><b>Add Sub-Catagory</b></small>
                                </button>

                                <Popup title={<div>Sub-Category Name</div>} openPopup={this.state.popupShow} >
                                    <div className="form-group">

                                        <select className="form-control" defaultValue="" name="category" onChange={(event) => this.addSubCategory(event)}>
                                            <option value="" disabled>Select Category</option>
                                            {category_fetch.map((item, pos) => (
                                                <option key={pos} value={item.id}>{item.category}</option>
                                            ))}
                                        </select>

                                        <Animateinput label='Catagory Name' attr={{type: 'text', name: 'sub_category', onChange:(event) => this.addSubCategory(event)}} /><hr />

                                        <button className="btn btn-primary" onClick={()=>this.subCategoryAdd()}>Submit</button>
                                        <button className="btn btn-danger" onClick={() => this.setState({popupShow: false})}>Close</button>

                                    </div>
                                </Popup>
                                <ToastContainer />
                            </div>
                        </div>
                    </div><hr />

                    <section>
                        <Card className="my-card">
                            <Container fluid>
                                <CardHeader>
                                    <h4 style={{ padding: '12px' }}>
                                        <span className="fa fa-info-circle">&nbsp;&nbsp;</span>
                                        <b>SUB CATAGORY</b>
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
                                                    <th>Sub-Catagory Name</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody id="myTable">

                                                {fetch.map((item,pos) => (
                                                    <tr key={pos}>
                                                        <td>{count++}</td>
                                                        <td>{item.category_name}</td>
                                                        <td>{item.sub_category}</td>
                                                        <td>
                                                            <button className="btn btn-xs button-radius" style={{borderRadius: '50px'}}><span className="fa fa-barcode "></span></button>&nbsp; 

                                                            <button className="btn btn-xs button-radius" style={{borderRadius: '50px'}}><span className="fa fa-pencil-square-o"></span></button>&nbsp; 

                                                            {item.status == 'active' ? (<button className="btn btn-xs button-radius" onClick={()=>this.updateStatus(item.id,'deactivate')}>Deactivate</button>) : (<button className="btn btn-xs button-radius" onClick={()=>this.updateStatus(item.id,'active')}>Activate</button>)}
                                                            <ToastContainer style={{color: 'white'}} />
                                                        </td>
                                                    </tr>
                                                ))}
                                                
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

export default SubCategory;
