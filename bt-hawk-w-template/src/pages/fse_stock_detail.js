import React, { Component } from 'react';
import $ from 'jquery';
import { Container, Row, Col, Card, CardBody, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Animateinput from '../animate input/AnimateInput';
import jsPDF from 'jspdf';
import "./css/main.css";
import 'datatables';
import 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
//import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert } from 'react-st-modal';
const SERVER = 'http://localhost:5000';

export default class FSEStockDetail extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      dis_id: 12,
      user_role : 'All'
    };
  }

  componentDidMount() {
    // Applying Datatable to the table view
    $(document).ready(() => {
      $('#viewTable').DataTable({
        lengthChange: false,
        paginate: true,
        scrollY: 320,
        searching: false,
        pageLength: 10,
        pagingType: "simple"
      });
    });
  }

  // Search Filter on table
  filter(e) {
    let val = e.target.value;
    val = val.toLowerCase();
    $("#tableBody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(val) > -1)
    });
  }

   // Generates Excel Report
   exportToCSV(dataArray, fileName) {
    let csvData = [], i = 1;
    dataArray.map((data) => {
      csvData.push({
        "S.No.": i++,
        "Product Name": data.product_name,
        "Product Price": data.product_price,
        "Stock Quantity": data.quantity,
        "Total Stock Quantity": (data.quantity * data.product_price)
      });
    })

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  // Generates PDF Report
  pdf() {
    var doc = new jsPDF('p', 'pt', 'a4');
    doc.setLineWidth(2);
    doc.text(200, 20, 'Sales Executive Stock Details');
    doc.autoTable({
      html: '#viewTable',
      styles: {
        overflow: 'linebreak',
        fontSize: 7,
        tableWidth: 900,
        tableLineWidth: 0,
        cellPadding: 1,
        whiteSpace: 'noWrap',
      },
      margin: {
        top: 40,
        left: 15,
        right: 15
      }
    });
    doc.save('FSE_Stock_Detail.pdf');
  }

  // Getting Data from Backend API
  getData(user_id) {
    let dis_id = this.state.dis_id;
    var response = $.ajax({
      url: SERVER + '/user_stock_detail',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: {
        dis_id: dis_id,
        user_id: user_id
      }
    }).responseJSON;

    if(response.status==200){
      return response.data;
    } else {
      return [];
    }
  }

  render() {
    const { user_id, work_type } = this.props.location.state;
    const data = this.getData(user_id);
    const length = data.length;
    //console.log(data);
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
                <span>&nbsp;Stock Detail </span>
              </li>
            </ul>
            <div className="page-toolbar">
              <div>
                <button className="btn btn-xs button-radius" onClick={() => { window.history.back(); }}>
                  <span className="fa fa-arrow-left">&nbsp;</span>
                  <small><b>Back</b></small>
                </button>
              </div>
            </div>
          </div><hr />
          <section>
            <Card className="my-card" style={{ marginBottom: '10px' }}>
              <CardBody>
                <Container fluid>
                  <Row style={{ padding: '10px 2px 5px 0px' }}>
                    <Col md={5} lg={5} xl={5} xs={12} sm={12}>
                      <h4>
                        <span className="fa fa-info-circle">&nbsp;&nbsp;</span>
                        <b>Stock Detail</b>
                      </h4>
                    </Col>
                    <Col md={3} lg={3} xl={3} xs={12} sm={12}>
                      <Animateinput label='Search' type="text" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px' }} attr={{ onKeyUp: (event) => { this.filter(event) }, id: 'searchBox' }} />
                    </Col>
                    <Col md={4} lg={4} xl={4} xs={12} sm={12}>
                      <span className="export-button" style={{ float: 'right' }}>
                        <button className="btn btn-secondary" onClick={() => this.exportToCSV(data, 'FSE_Stock_Detail')}><i className="fa fa-download"></i> Excel</button>&nbsp;
                        <button className="btn btn-secondary" onClick={() => this.pdf()}><i className="fa fa-download"></i> PDF</button>&nbsp;
                      </span>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </section>

          <section>
            <Card className="my-card">
              <CardBody>
                <Container fluid>
                  <Row style={{ padding: '8px', marginTop: '8px' }}>
                    <Col md={12} lg={12} xl={12} xs={12} sm={12}>
                      <Table striped bordered hover responsive id="viewTable">
                        <thead>
                          <tr style={{ fontSize: '10px' }}>
                            <th>S.No.</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Stock Quantity</th>
                            <th>Total Stock Quantity</th>
                          </tr>
                        </thead>
                        <tbody id="tableBody">
                          {
                            (length >= 1) ? 
                            data.map((val, index) => (
                              <tr key={index} style={{ fontSize: '10px' }}>
                                <td>{(index + 1)}</td>
                                <td>{val.product_name}</td>
                                <td>{val.product_price}</td>
                                <td>{val.quantity}</td>
                                <td>{ (val.quantity * val.product_price) }</td>
                              </tr>
                            ))
                            :
                            ""  
                          }
                        </tbody>
                      </Table>
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

