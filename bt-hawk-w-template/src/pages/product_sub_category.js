import React, { Component } from 'react';
import './css/profile.css';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader, Table } from 'reactstrap';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import Animateinput from '../animate input/AnimateInput';
import PageModal from './Modal';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import 'datatables';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import { Prompt, Alert, Confirm } from 'react-st-modal';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const SERVER = 'http://localhost:5000';

// PDF Generator Function
function pdfGenerator() {
  var obj = new SubCategory();
  var cat = obj.getData();

  var cellWidth = 35, leftMargin = 5, topMargin = 15, topMarginTable = 30, headerRowHeight = 5;

  let props = {
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    compress: true,
    lineHeight: 0.3,
    autoSize: true,
  };
  let body = [];
  for (let i = 0; i < cat.length; i++) {
    body.push([(i + 1), cat[i].category_name, cat[i].subcategory_name, cat[i].status]);
  }

  var doc = new jsPDF(props, '', '', '');
  doc.text(80, 10, 'SUB CATEGORIES');
  doc.autoTable({
    head: [['S.No.', 'Category Name', 'Sub Category Name', 'Status']],
    body: body
  });
  doc.save('sub-categories.pdf');
}


class SubCategory extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      dis_id: 12,
      refresh: 1
    }
  }

  componentDidMount(){
    $(document).ready(() => {
      $('#sub_cat_table').DataTable({
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

  getcategories(dis_id = 12) {
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

  getData(dis_id = 12) {
    var cat = $.ajax({
      url: SERVER + '/get_subcategory',
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

  changeStatus(subCat_id, status) {
    let dis_id = this.state.dis_id;
    let data = $.ajax({
      url: `${SERVER}/change_status_subcategory`,
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: {
        subCat_id: subCat_id,
        status: status
      }
    }).responseJSON;

    if (data.status == 200) {
      this.setState({ refresh: 0 });
    }
  }

  exportToCSV(dataArray, fileName) {
    let csvData = [], i = 1;
    dataArray.map((data) => {
      csvData.push({
        "S.No.": i++,
        "Category Name": data.category_name,
        "Sub Category Name": data.subcategory_name,
        "Status": data.status
      })
    });

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  async addSubCategory() {
    let cat_id = $('#category').val();
    let cat_name = $('#category option:selected').text();
    let sub_cat_name = $('#subCatName').val();
    if (cat_id == '' || sub_cat_name == '') {
      toast.error('Please Fill All Entries First Then Click Add.');
    } else {
      let body = <div>
        <label className="product-label"><b>Category</b></label><input type="text" defaultValue={cat_name} className="form-control" readOnly />
        <label className="product-label"><b>Sub Category</b></label> <input type="text" defaultValue={sub_cat_name} className="form-control" readOnly />
      </div>
      let head = <div>Confirmation <hr style={{ margin: '0', padding: '0' }} /></div>;
      const result = await Confirm(body, head, 'Save');
      if (result) {
        $('#subCatName').val(null);
        $('#category').val($('#category option:first').val());
        let response = await $.ajax({
          url: SERVER + '/add_sub_category',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded',
          async: false,
          dataType: 'JSON',
          data: {
            sub_cat_name: sub_cat_name,
            cat_id: cat_id
          }
        }).responseJSON;

        if (response.status == 200) {
          this.setState({ refresh: 0 });
          toast(`${response.msg}`);
        } else {
          this.setState({ refresh: 0 });
          toast.error(`${response.msg}`);
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

  pdf(dis_id) {
    pdfGenerator(dis_id);
  }

  render() {
    const subCat = this.getData(this.state.dis_id);
    const categories = this.getcategories(this.state.dis_id);
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
                <span>&nbsp;Add Product Sub Category & Listing</span>
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
                  <Col md={6} lg={6} xl={6} xs={12} sm={12}>
                    <h4>
                      <i className="fa fa-info-circle"></i>&nbsp; &nbsp;
                      <b>SUB CATAGORY</b>
                    </h4>
                  </Col>
                  <Col md={6} lg={6} xl={6} xs={12} sm={12}>
                    <span className="export-button" style={{ float: 'right' }}>
                      <button className="btn btn-secondary" onClick={() => this.exportToCSV(subCat, 'Sub_Category_Report')}><i className="fa fa-download"></i> Excel</button>&nbsp;
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
                    <Col md={5} lg={5} xl={5} xs={12} sm={12}>
                      <Animateinput label='Search' attr={{ type: "text", onKeyUp: (event) => this.searchFilter(event) }} customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px', width: '50%' }} attr={{ onKeyUp: (event) => { this.filter(event) }, id: 'searchBox' }} />
                    </Col>
                    <Col md={3} lg={3} xl={3} xs={12} sm={12}>
                      <select className="form-control" name="category" id="category" >
                        <option selected disabled>Select Category</option>
                        {
                          categories.map((cat, pos) => (
                            <option key={pos} value={cat.category_id}>{cat.category_name}</option>
                          ))
                        }
                      </select>
                    </Col>
                    <Col md={3} lg={3} xl={3} xs={12} sm={12}>
                      <Animateinput label='Sub Category Name' type="text" customStyle={{ fontSize: '14px', padding: '10px 2px 2px 5px' }} attr={{ id: 'subCatName' }} />
                    </Col>
                    <Col md={1} lg={1} xl={1} xs={12} sm={12}>
                      <button className="btn btn-info" onClick={() => this.addSubCategory()}>
                        <i className="fa fa-plus">&nbsp; Add</i>
                      </button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody className="my-card-body">
                  <div>
                    <Table striped bordered hover responsive id="sub_cat_table">
                      <thead>
                        <tr>
                          <th>S.No.</th>
                          <th>Catagory Name</th>
                          <th>Sub Catagory Name</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody id="tableBody">
                        {
                          subCat.map((cat, index) => (
                            <tr key={index}>
                              <td>{(index + 1)}</td>
                              <td>{cat.category_name}</td>
                              <td>{cat.subcategory_name}</td>
                              <td>
                                <button className="btn btn-xs button-radius" style={{ borderRadius: '50px' }}>
                                  <span className="fa fa-pencil-square-o"></span>
                                </button>&nbsp;
                                <button className="btn btn-xs button-radius" onClick={() => this.changeStatus(cat.subcategory_id, cat.status)}>
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

export default SubCategory;
