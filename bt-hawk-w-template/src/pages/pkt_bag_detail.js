import React, { Component } from 'react';
import { renderToString } from 'react-dom/server'
import './css/product_catagory.css';
import $ from 'jquery';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Animateinput from '../animate input/AnimateInput';
import PageModal from './Modal';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'datatables';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Prompt, Alert, Confirm } from 'react-st-modal';
const SERVER = 'http://localhost:5000';

// PDF Generator Function
function pdfGenerator(dis_id) {
  var obj = new PacketBag();
  var pkt = obj.getData(dis_id);

  let props = {
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    compress: true,
    lineHeight: 1,
    autoSize: true,
    printHeaders: true
  };
  let body = [];
  for (let i = 0; i < pkt.length; i++) {
    body.push([(i + 1), pkt[i].bag_qty, pkt[i].status]);
  }

  var doc = new jsPDF(props, '', '', '');
  doc.text(80, 10, 'Packet/Bag Details');
  doc.autoTable({
    head: [['S.No.', 'Bag Quantity', 'Status']],
    body: body
  });
  doc.save('pkt_bag_details.pdf');
}

class PacketBag extends Component {
  categories = [];
  constructor(props) {
    super(props);
    this.state = {
      refresh: 1,
      modalShow: 'false',
      catName: '',
      dis_id: 12,
      data: {}
    };
  }

  componentDidMount() {
    $(document).ready(() => {
      $('#pkt_table').DataTable({
        lengthChange: false,
        paginate: true,
        scrollY: 300,
        searching: false,
        pageLength: 10,
        pagingType: "simple"
      });
    });
  }

  exportToCSV(dataArray, fileName) {
    let csvData = [], i = 1;
    dataArray.map((data) => {
      csvData.push({
        "S.No.": i++,
        "Bag Quantity": data.bag_qty,
        "Status": data.status
      })
    })

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  getData(dis_id = 12) {
    var pkt = $.ajax({
      url: SERVER + '/get_pkt_bag',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: {
        dis_id: dis_id
      }
    }).responseJSON;
    return pkt.data;
  }

  changeStatus(bag_id, status) {
    let dis_id = this.state.dis_id;
    let data = $.ajax({
      url: `${SERVER}/change_status_pkt_bag`,
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: {
        bag_id: bag_id,
        status: status
      }
    }).responseJSON;

    if (data.status == 200) {
      this.getData(dis_id);
      this.setState({ refresh: 0 });
    }
  }

  pdf(dis_id) {
    pdfGenerator(dis_id);
  }

  async addbag() {
    let bagQty = $('#bagQty').val();
    let dis_id = this.state.dis_id;
    if (bagQty == '') {
      Alert('Packet/Bag quantity can\'t be empty!', 'Warning');
    } else {
      let body = <div>
        <label className="product-label"><b>Packet/Bag</b></label><input type="text" defaultValue={bagQty} className="form-control" readOnly />
      </div>;
      let head = <div>Confirmation <hr style={{ margin: '0', padding: '0' }} /></div>;
      const result = await Confirm(body, head, 'Save');
      if (result) {
        var response = $.ajax({
          url: SERVER + '/add_pkt_bag',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded',
          async: false,
          dataType: 'JSON',
          data: {
            bag_qty: bagQty,
            dis_id: dis_id
          }
        }).responseJSON;
        if (response.status == 200) {
          Alert('Bag Successfully Created', 'Success');
          this.setState({ refresh: 0 });
        } else {
          Alert('Bag Creation Failed', 'Error');
          this.setState({ refresh: 0 });
        }
      }
    }
  }

  filter(e) {
    let val = e.target.value;
    val = val.toLowerCase();
    $("#tableBody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(val) > -1)
    });
  }

  render() {
    const packets = this.getData(this.state.dis_id);
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
                <span>&nbsp;Add Packet/Bag Configuration & Listing</span>
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
              <Container fluid>
                <Row style={{ padding: '15px' }}>
                  <Col md={8} lg={8} xl={8} xs={8} sm={8}>
                    <h4>
                      <i className="fa fa-info-circle"></i>&nbsp;
                      <b>Packet/Bag Configuration</b>
                    </h4>
                  </Col>
                  <Col md={4} lg={4} xl={4} xs={12} sm={12}>
                    <span className="export-button" style={{ float: 'right' }}>
                      <button className="btn btn-secondary" onClick={
                        () => this.exportToCSV(packets, 'Packet_Bag_Report')
                      }><i className="fa fa-download"></i> Excel</button>&nbsp;
                          <button className="btn btn-secondary" onClick={
                        () => this.pdf(this.state.dis_id)
                      }><i className="fa fa-download"></i> PDF</button>&nbsp;
                        </span>
                  </Col>
                </Row>
              </Container>
            </Card>
          </section>
          <section>
            <Card className="my-card">
              <Container fluid>
                <CardBody className="my-card-body">
                  <Row style={{ padding: '10px' }}>
                    <Col md={8} lg={8} xl={8} xs={12} sm={12}>
                      <Animateinput label='Search' type="text" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px', width: '50%' }} attr={{ onKeyUp: (event) => { this.filter(event) }, id: 'searchBox' }} />
                    </Col>
                    <Col md={3} lg={3} xl={3} xs={3} sm={3}>
                      <Animateinput label='Packet/Bag Quantity' customStyle={{ fontSize: '14px', padding: '10px 2px 2px 5px' }} attr={{ id: 'bagQty', type: "number", title: "Enter numeric value" }} />
                    </Col>
                    <Col md={1} lg={1} xl={1} xs={1} sm={1}>
                      <button className="btn btn-info" onClick={() => this.addbag()}>
                        <i className="fa fa-plus">&nbsp; Add</i>
                      </button>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={12} lg={12} xl={12} xs={12} sm={12}>
                      <Table striped bordered hover id="pkt_table">
                        <thead>
                          <tr>
                            <th>S.No.</th>
                            <th>Bag Quantity</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody id="tableBody">
                          {
                            packets.map((pkt, index) => (
                              <tr key={index}>
                                <td>{(index + 1)}</td>
                                <td>{pkt.bag_qty}</td>
                                <td>
                                  <button className="btn btn-xs button-radius" onClick={() => this.changeStatus(pkt.bag_id, pkt.status)}>
                                    {(pkt.status == 'Active') ? 'Deactivate' : 'Activate'}
                                  </button>
                                </td>
                              </tr>
                            ))
                          }
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </CardBody>
              </Container>
            </Card>
          </section>
        </div>
      </div>
    )
  }
}

export default PacketBag;