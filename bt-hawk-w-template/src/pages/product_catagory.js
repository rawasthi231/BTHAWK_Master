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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Prompt, Alert, Confirm } from 'react-st-modal';
toast.configure();
const SERVER = 'http://localhost:5000';

// PDF Generator Function
function pdfGenerator(dis_id) {
  var obj = new ProductCatagory();
  var cat = obj.getData(dis_id);

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
  let body = [];
  for (let i = 0; i < cat.length; i++) {
    body.push([(i + 1), cat[i].category_name, cat[i].status]);
  }

  var doc = new jsPDF(props, '', '', '');
  doc.text(80, 10, 'CATEGORIES');
  doc.autoTable({
    head: [['S.No.', 'Category Name', 'Status']],
    body: body
  });
  /*
    doc.setFont('arial', 'bold');
    doc.setFontSize(14);
    doc.text(40, 10, 'CATEGORIES');
    doc.setFontSize(12);
    doc.cell(leftMargin, topMargin, 20, headerRowHeight, 'S.No.', 0);
    doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, 'Category Name', 0);
    doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, 'Status', 0);
    doc.setFontSize(10);
    for (let i = 0; i < cat.length; i++) {
      doc.cell(leftMargin, topMargin, 20, headerRowHeight, `${i + 1}`, (i + 1));
      doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, cat[i].category_name, (i + 1));
      doc.cell(leftMargin, topMargin, cellWidth, headerRowHeight, cat[i].status, (i + 1));
    }
    */
  doc.save('categories.pdf');
}

class ProductCatagory extends Component {
  categories = [];
  constructor(props) {
    super(props);
    this.state = {
      refresh: 1,
      catName: '',
      dis_id: 12
    };
  }

  componentDidMount(){
    $(document).ready(() => {
      $('#cat_table').DataTable({
        lengthChange: false,
        paginate: true,
        scrollY: 300,
        searching: false,
        pageLength: 10,
        pagingType: "simple"
      });
    });
  }

  searchFilter(evt) {
    var value = (evt.target.value).toLowerCase();
    $("#myTable tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  }

  exportToCSV(dataArray, fileName) {
    let csvData = [], i = 1;
    dataArray.map((data) => {
      csvData.push({
        "S.No.": i++,
        "Category Name": data.category_name,
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
    var cat = $.ajax({
      url: SERVER + '/get_category',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: {
        dis_id: dis_id
      }
    }).responseJSON;
    return cat.data;
  }

  changeStatus(cat_id, status) {
    let dis_id = this.state.dis_id;
    let data = $.ajax({
      url: `${SERVER}/change_status`,
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: {
        cat_id: cat_id,
        status: status
      }
    }).responseJSON;

    if (data.status == 200) {
      //this.getData(dis_id);
      toast(data.msg);
      this.setState({ refresh: 0 });
    }
  }

  filter(e) {
    let val = e.target.value;
    val = val.toLowerCase();
    $("#tableBody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(val) > -1)
    });
  }

  async addCategory() {
    let cat_name = $('#catName').val();
    if (cat_name != '') {
      let body = <div>
        <label className="product-label"><b>Category</b></label><input type="text" defaultValue={cat_name} className="form-control" readOnly />
      </div>
      let head = <div>Confirmation <hr style={{ margin: '0', padding: '0' }} /></div>;
      const result = await Confirm(body, head, 'Save');
      if (result) {
        let dis_id = this.state.dis_id;
        $('#catName').val(null);
        let response = $.ajax({
          url: SERVER + '/add_category',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded',
          async: false,
          dataType: 'JSON',
          data: {
            cat_name: cat_name,
            dis_id: dis_id
          }
        }).responseJSON;

        if (response.status == 200) {
          //Alert(`Category Successfully Created`, 'Success');
          toast('Category Successfully Created');
          this.setState({ refresh: 0 });
        } else {
          //Alert(`Category Creation Failed`, 'Error');
          toast('Category Creation Failed');
          this.setState({ refresh: 0 });
        }
      }
    } else {
      //Alert(`Category Name Can't be Empty!`, 'Warning');
      toast('Category Name Can\'t be Empty!'); 
    }
  }

  pdf(dis_id) {
    pdfGenerator(dis_id);
  }


  render() {
    const categories = this.getData(12);
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
                <span>&nbsp;Add Product Catagory & Listing</span>
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
                <Row style={{ padding: '10px' }}>
                  <Col md={6} lg={6} xl={6} xs={6} sm={6}>
                    <h4>
                      <i className="fa fa-info-circle"></i>&nbsp; &nbsp;
                      <b>PRODUCT CATAGORY</b>
                    </h4>
                  </Col>
                  <Col md={6} lg={6} xl={6} xs={6} sm={6}>
                    <span className="export-button" style={{ float: 'right' }}>
                      <button className="btn btn-secondary" onClick={() => this.exportToCSV(categories, 'Category_Report')}><i className="fa fa-download"></i> Excel</button>&nbsp;
                    <button className="btn btn-secondary" onClick={() => this.pdf(this.state.dis_id)}><i className="fa fa-download"></i> PDF</button>&nbsp;
                  </span>
                  </Col>
                </Row>
              </Container>
            </Card>
          </section>
          <section>
            <Card className="my-card">
              <Container fluid>
                <CardHeader>
                  <Row style={{ padding: '15px 0px 10px 0px' }}>
                    <Col md={8} lg={8} xl={8} xs={12} sm={12}>
                      <Animateinput label='Search' type="text" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px', width: '30%' }} attr={{ onKeyUp: (event) => { this.filter(event) }, id: 'searchBox' }} />
                    </Col>
                    <Col md={3} lg={3} xl={3} xs={3} sm={3}>
                      <Animateinput label='Category Name' type="text" customStyle={{ fontSize: '14px', padding: '10px 2px 2px 5px' }} attr={{ id: 'catName' }} />
                    </Col>
                    <Col md={1} lg={1} xl={1} xs={1} sm={1}>
                      <button className="btn btn-info" onClick={() => this.addCategory()}>
                        <i className="fa fa-plus">&nbsp; Add</i>
                      </button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="my-card-body">
                  <div>
                    <Table striped bordered hover responsive id="cat_table">
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Catagory Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody id="tableBody">
                        {
                          categories.map((cat, index) => (
                            <tr key={index}>
                              <td>{(index + 1)}</td>
                              <td>{cat.category_name}</td>
                              <td>
                                <button className="btn btn-xs button-radius" style={{ borderRadius: '50px' }}>
                                  <span className="fa fa-barcode "></span>
                                </button>&nbsp;
                            <button className="btn btn-xs button-radius" style={{ borderRadius: '50px' }}>
                                  <span className="fa fa-pencil-square-o"></span>
                                </button>&nbsp;
                            <button className="btn btn-xs button-radius" onClick={() => this.changeStatus(cat.category_id, cat.status)}>
                                  {(cat.status == 'Active') ? 'Deactivate' : 'Activate'}
                                </button>
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