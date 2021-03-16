import React, { Component } from 'react';
import { renderToString } from 'react-dom/server'
import './css/product_catagory.css';
import $ from 'jquery';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Animateinput from '../animate input/AnimateInput';
import PageModal from './Modal';
import jsPDF from 'jspdf';
const SERVER = 'http://localhost:5000';


// PDF Generator Function
function pdfGenerator() {
  var obj = new ProductCatagory();
  var cat = obj.getData();

  var cellWidth = 35, rowCount = 0, leftMargin = 10, topMargin = 12, topMarginTable = 55, headerRowHeight = 8, rowHeight = 6;

  let props = {
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    compress: true,
    lineHeight: 1,
    autoSize: true,
    printHeaders: true
  };

  var doc = new jsPDF(props, '', '', '');
  
  doc.setFont('arial', 'bold');
  doc.setFontSize(14);
  doc.text(40, 10, 'CATEGORIES');
  doc.setFontSize(12);
  doc.cell(leftMargin, topMargin, 20, headerRowHeight, 'S.No.', 0);
  doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, 'Category Name', 0);
  doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, 'Status', 0);
  doc.setFontSize(10);
  for (let i = 0; i < cat.length; i++) {
    doc.cell(leftMargin, topMargin, 20, headerRowHeight, `${i + 1}`, (i+1));
    doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, cat[i].category_name, (i+1));
    doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, cat[i].status, (i+1));
  }
  doc.save('categories.pdf');
}

class ProductCatagory extends Component {
  categories = [];
  constructor(props) {
    super(props);
    this.state = {
      modalShow: 'false',
      catName: '',
      dis_id: 1,
      data: {}
    };
  }

  sendValue() {
    //console.log('yash');
  }

  searchFilter(evt) {
    var value = (evt.target.value).toLowerCase();
    $("#myTable tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });

  }

  handleModalShow = () => {
    $('#modalHeaderHeading').html('<h4 style={{color: "#666", width:"70%"}}><span class="fa fa-bell-o"></span>&nbsp;Add Catagory</h4>');
    $('#modalBody').html('<input type="text" name="catName" id="catName" placeholder="Enter Catagory" class="form-control" />');
    $('#modalFooter').html('<button type="button" class="btn btn-success">Add Category</button>');
    $('#pageModal').fadeIn();
  }

  handleModalHide = () => {
    $('#pageModal').fadeOut();
  }

  // componentDidMount() {
  //   let cat = this.getData();
  //   var data = { ...this.state.data } 
  //   data.categories = cat;
  //   this.setState({data});
  // }

  getData() {
    var cat = $.parseJSON($.ajax({
      url: SERVER + '/get_category',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      data: {
        dis_id: 1
      }
    }).responseText);
    //cat = cat;
    return cat.data;

  }

  test(){
    // var data = { ...this.state.data } 
    // data.categories = cat;
    // this.setState({data});
    //console.log(this.state.data.categories) 
  }

  pdf() {
    pdfGenerator();
  }


  render() {
    const categories = this.getData();
    const functionArray = { function: 'onKeyUp', functionname: 'this.searchFilter' };
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
                <button className="btn btn-xs button-radius" onClick={this.handleModalShow}>
                  <span className="fa fa-plus">&nbsp;</span>
                  <small><b>Add Catagory</b></small>
                </button>

                <PageModal hide={this.handleModalHide} submit={this.sendValue} />

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
                        {/* <input type="search" placeholder="Search Here" onKeyUp={this.searchFilter} className="form-control" style={{width:'50%', borderRadius: '12PX !important'}} /> */}

                        <Animateinput label='Search' type="text" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px', width: '50%' }} functions={this.searchFilter} />

                      </Col>
                      <Col md={6} lg={6} xl={6} xs={12} sm={12}>
                        <span className="export-button" style={{ float: 'right' }}>
                          <button className="btn btn-secondary">Copy</button>&nbsp;
                          <button className="btn btn-secondary">Excel</button>&nbsp;
                          <button className="btn btn-secondary" onClick={this.pdf}>PDF</button>&nbsp;
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
                      {
                        categories.map((cat, index) => (
                          <tr key={index}>
                            <td>{(index+1)}</td>
                            <td>{cat.category_name}</td>
                            <td>
                            <button className="btn btn-xs button-radius" style={{ borderRadius: '50px' }}>
                              <span className="fa fa-barcode "></span>
                            </button>&nbsp;
                            <button className="btn btn-xs button-radius" style={{ borderRadius: '50px' }}>
                              <span className="fa fa-pencil-square-o"></span>
                            </button>&nbsp;
                            <button className="btn btn-xs button-radius">{cat.status}</button>
                          </td>
                          </tr>
                        ))
                      }
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