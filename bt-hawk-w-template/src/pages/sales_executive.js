import React, { Component } from 'react';
import './css/product_catagory.css';
import $ from 'jquery';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Animateinput from '../animate input/AnimateInput';
import jsPDF from 'jspdf';
import 'datatables';
import 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const SERVER = 'http://localhost:5000';

// Class component for displaying Sales Executive
class SalesExecutive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dis_id: 12
    }
  }

  // Applying Datatables Plugin for Details Table
  componentDidMount() {
    $(document).ready(() => {
      $('#viewTable').DataTable({
        lengthChange: false,
        paginate: true,
        scrollY: 300,
        searching: false,
        pageLength: 10,
        pagingType: "simple"
      });
    });
  }

  // Search Filter on Table
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
        "Name": data.user_name,
        "Phone No.": data.user_phone,
        "Email Id": data.user_email,
        "IMEI No.": data.imei_no,
        "Status": data.status
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
    doc.text(200, 20, 'Sales Executive Details');
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
    doc.save('All_Sales_Executive_Detail.pdf');
  }


  // Fetching Sales Executive Details
  getData(dis_id) {
    var response = $.ajax({
      url: SERVER + '/get_sales_executive',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: {
        type: "all_users",
        dis_id: dis_id
      }
    }).responseJSON;

    return response.data;
  }

  // Function for User IMEI Clear
  userIMEIClear(user_id) {
    var response = $.ajax({
      url: SERVER + '/user_imei_clear',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: {
        user_id: user_id
      }
    }).responseJSON;

    toast(response.msg);
  }


  // Function for change status of user (Active, Deactive) 
  changeStatus(p_id, status) {
    let response = $.ajax({
      url: `${SERVER}/change_fse_status`,
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: {
        p_id: p_id,
        status: status
      }
    }).responseJSON;

    toast(response.msg);
    this.setState({ refresh: 0 });

  }


  render() {
    const data = this.getData(this.state.dis_id);
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
                <span>&nbsp;Sales Executive Details</span>
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
                  <Row style={{ padding: '8px', marginTop: '8px' }}>
                    <Col md={4} lg={4} xl={4} xs={12} sm={12}>
                      <h4>
                        <span className="fa fa-info-circle">&nbsp;&nbsp;</span>
                        <b>Sales Executive Details</b>
                      </h4>
                    </Col>
                    <Col md={4} lg={4} xl={4} xs={12} sm={12}>
                      <Animateinput label='Search' type="text" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px', width: '70%' }} attr={{ onKeyUp: (event) => { this.filter(event) }, id: 'searchBox' }} />
                    </Col>
                    <Col md={4} lg={4} xl={4} xs={12} sm={12}>
                      <span className="export-button" style={{ float: 'right' }}>
                        <button className="btn btn-secondary" onClick={() => this.exportToCSV(data, 'FSE_Users_Report')}><i className="fa fa-download"></i> Excel</button>&nbsp;
                        <button className="btn btn-secondary" onClick={() => this.pdf()}><i className="fa fa-download"></i> PDF</button>&nbsp;
                      </span>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </section>
          <section>
            <Card className="my-card" style={{ marginBottom: '10px' }}>
              <CardBody>
                <Container fluid>
                  <Row style={{ padding: '8px', marginTop: '8px' }}>
                    <Col md={12} lg={12} xl={12} xs={12} sm={12}>
                      <Table striped bordered hover responsive id="viewTable">
                        <thead>
                          <tr style={{ fontSize: '10px' }}>
                            <th>S.No.</th>
                            <th>Name</th>
                            <th>Phone No.</th>
                            <th>Email Id</th>
                            <th>IMEI No.</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody id="tableBody">
                          {
                            data.map((val, index) => (
                              <tr key={index} style={{ fontSize: '10px' }}>
                                <td>{(index + 1)}</td>
                                <td>
                                  <Link to={{ pathname: "/user-stock-detail", state: { user_id: val.user_id, work_type : val.work_type }}} style={{ textDecoration: 'none' }} title="User Stock Details">
                                    {val.user_name}
                                  </Link>
                                </td>
                                <td>{val.user_phone}</td>
                                <td>{val.user_email}</td>
                                <td>{val.imei_no}</td>
                                <td>
                                  <Link to={{ pathname: "/edit-sales-executives", state: { user_id: val.user_id } }} className="btn btn-xs button-radius" style={{ textDecoration: 'none' }} title="Edit Sales Executive Detail">
                                    <i className="fa fa-edit"></i>
                                  </Link>
                                  <Link to={{ pathname: "/user-stock-return", state: { user_id: val.user_id, user_name: val.user_name } }} className="btn btn-xs button-radius" style={{ textDecoration: 'none' }} title="Stock Return">
                                    <i className="fa fa-undo"></i>
                                  </Link>
                                  <button className="btn btn-xs button-radius" onClick={() => this.userIMEIClear(val.user_id)} title="Login Detail Clear"><i className="fa fa-eraser"></i></button>
                                  <button className="btn btn-xs button-radius" title="Change Status" onClick={() => this.changeStatus(val.user_id, val.status)}   >
                                    {(val.status == 'Active') ? 'Deactivate' : 'Activate'}
                                  </button>
                                </td>
                              </tr>
                            ))
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


export default SalesExecutive;