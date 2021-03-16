import React, { Component } from 'react';
import { renderToString } from 'react-dom/server'
import './css/product_catagory.css';
import $ from 'jquery';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { TablePagination } from 'react-pagination-table';
import Animateinput from '../animate input/AnimateInput';
import Popup from './Modal';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Form } from 'react-bootstrap';
import { Button } from 'bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Column } from 'jspdf-autotable';
const SERVER = 'http://localhost:5000';


// PDF Generator Function
function pdfGenerator(dis_id) {
  var object = new Test();
  var products = object.getData(dis_id);

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

  let dataRow = [];
  for (let i = 0; i < products.length; i++) {
    dataRow.push([(i + 1), products[i].product_name, products[i].product_type, products[i].cat, products[i].sub_cat, products[i].product_price, products[i].dealer_price, products[i].prurchase_price, products[i].mrp_price, products[i].discount_applicable, products[i].discount_percentage, products[i].discount_amount, products[i].cess_applicable, products[i].cess_on_sale, products[i].cess_on_purchase, products[i].cess_pc_amt, products[i].hsn_code, products[i].consumeable_raw_product, products[i].gst_applicable, products[i].IGST]);
  }

  var doc = new jsPDF('p', 'pt', 'a4');
  doc.setLineWidth(2);
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
  doc.save('products.pdf');
}


class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dis_id: 12,
      refresh: 1,
      product_id: ''
    }
  }

  getData(dis_id = 12) {
    var response = $.ajax({
      url: SERVER + '/get_products',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      data: {
        dis_id: dis_id
      }
    }).responseText;

    return JSON.parse(response).data;
  }

  exportToCSV(dataArray, fileName) {
    let csvData = [], i = 1;
    dataArray.map((data) => {
      csvData.push({
        "S.No.": i++,
        "Product Name": data.product_name,
        "Product Type": data.product_type,
        "Product Category": data.cat,
        "Product Sub Category": data.sub_cat,
        "Product Price": data.product_price,
        "Dealer Price": data.dealer_price,
        "Purchase Price Including GST": data.prurchase_price,
        "Purchase Price Excluding GST": data.prurchase_price_exc,
        "MRP": data.mrp_price,
        "Discount Applicable": data.discount_applicable,
        "Discount Percentage": data.discount_percentage,
        "Discount Amount": data.discount_amount,
        "Cess Applicable": data.cell_applicable,
        "Cess On Sale": data.cess_on_sale,
        "Cess On Purchase": data.cess_on_purchase,
        "Cess Amount": data.cess_pc_amt,
        "Stock Quantity": data.stock_quantity,
        "Free Stock": data.free_stock,
        "Low Stock Quantity": data.low_stock_quantity,
        "Allow Decimal Quantity": data.decimal_category,
        "Alias": data.alias,
        "HSN Code": data.hsn_code,
        "Parent Group": data.parent_group,
        "Measurement Unit": data.measurement_value,
        "Item Type": data.item_type,
        "Maintain Inventory": data.maintain_inventory,
        "Consumeable Raw Product": data.consumeable_raw_product,
        "Barcode Generator": data.barcode_generator,
        "Product Barcode": data.product_barcode,
        "Unit": data.unit,
        "Unit In Packet": data.unit_in_pkt,
        "GST Applicable": data.gst_applicable,
        "GST": data.IGST,
        "Status": data.status,
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

  pdf(dis_id) {
    pdfGenerator(dis_id);
  }

  changeStatus(p_id, status) {
    let response = $.ajax({
      url: `${SERVER}/change_product_status`,
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: {
        p_id: p_id,
        status: status
      }
    }).responseJSON;

    if (response.status == 200) {
      alert(response.msg);
      //this.getData(this.state.dis_id);
      this.setState({ refresh: 0 });
    } else {
      alert(response.msg);
      //this.getData(this.state.dis_id);
      this.setState({ refresh: 0 });
    }
  }

  navigate(p_id) {
    this.props.router.push({
      pathname: '/edit-product',
      state: { id: p_id }
    })
  }

  render() {
    const data = this.getData(this.state.dis_id);
    console.log(data);
    const Header = ["S.No.", "Product Name", "Category", "Sub Category", "Price", "HSN Code", "Stock In Hand", "Discount", "Max Disc. %", "Max Disc. Amt.", "Unit", "GST%", "Item Type", "Action" ];
    const columns = "distributor_id.product_name.cat.sub_cat.product_price.hsn_code.stock_quantity.discount_applicable.discount_percentage.discount_amount.unit.IGST.item_type.status";
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
                <span>&nbsp;Product Details</span>
              </li>
            </ul>
            <div className="page-toolbar">
              <div>
                <button className="btn btn-xs button-radius" onClick={() => { window.history.back(); }}>
                  <span className="fa fa-arrow-left">&nbsp;</span>
                  <small><b>Back</b></small>
                </button>
                &nbsp;&nbsp;
                <Link to="/add-product" className="btn btn-xs button-radius">
                  <i className="fa fa-plus"></i>
                  <small><b>Add Product</b></small>
                </Link>
              </div>
            </div>
          </div><hr />

          <section>
            <Card className="my-card">
              <Container fluid>
                <CardHeader>
                  <Row style={{ padding: '8px' }}>
                    <Col md={6} lg={6} xl={6} xs={12} sm={12}>
                      <h4>
                        <span className="fa fa-info-circle">&nbsp;&nbsp;</span>
                        <b>PRODUCT DETAILS</b>
                      </h4>
                    </Col>
                    <Col md={3} lg={3} xl={3} xs={12} sm={12}>
                      <Animateinput label='Search' type="text" customStyle={{ fontSize: '12px', padding: '10px 0px 2px 10px' }} />
                    </Col>
                    <Col md={3} lg={3} xl={3} xs={12} sm={12}>
                      <span className="export-button" style={{ float: 'right' }}>
                        <button className="btn btn-secondary" onClick={() => this.exportToCSV(data, 'Products_Report')}><i className="fa fa-download"></i> Excel</button>&nbsp;
                          <button className="btn btn-secondary" onClick={() => this.pdf(this.state.dis_id)}><i className="fa fa-download"></i> PDF</button>&nbsp;
                        </span>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Row style={{ padding: '2px' }}>
                    <Col md={12}>
                     <TablePagination
                        headers={Header}
                        data={data}
                        columns={columns}
                        perPageItemCount={10}
                        totalCount={data.length}
                        arrayOption={[["size", 'all', ' ']]}
                        paginationClassName={"btn"}
                        partialPageCount={3}
                        /> 
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

export default Test;