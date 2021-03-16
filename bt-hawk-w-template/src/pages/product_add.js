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
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from './confirmationModal';
const SERVER = 'http://localhost:5000';

// Class component for Add Product 
class productAdd extends Component {
  subCategories = [];
  // Constructor
  constructor(props) {
    super(props);
    // State properties declaration
    this.state = {
      showPopup: false,
      dis_id: 12,
      refresh: 0,
      category: '',
      categoryName: '',
      subCategory: '',
      subCategoryName: '',
      pName: '',
      productType: '',
      maintaineInventory: '',
      itemType: '',
      consumableRawProduct: '',
      gstApplicable: '',
      gstPer: '',
      salePrice: '',
      inclusivePrice: '',
      exclusivePrice: '',
      dealerPrice: '',
      mrpPrice: '',
      alias: '',
      hsnCode: '',
      measurementUnit: '',
      decimalQty: '',
      discountApplicable: '',
      cessApplicable: '',
      cessOnSale: '',
      cessOnPurchase: '',
      lowStockQty: '',
      discountPer: '',
      cessAmt: '',
      cessDisc: ''
    }
  }

  // Get Categories for logged in distributor
  getCategories(dis_id) {
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

  // Getting Subcategories for specific category
  async getSubCategories(event) {
    this.setState({ [event.target.name]: event.target.value });
    let categoryName = $('#category option:selected').text();
    this.setState({ categoryName: categoryName });
    let cat_id = event.target.value;
    var subCat = await $.ajax({
      url: SERVER + '/get_sub_cat',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      data: {
        cat_id: cat_id
      }
    }).responseText;

    let dataArray = JSON.parse(subCat).data;
    let options = `<option selected disabled>Select</option>`;

    for (let i = 0; i < dataArray.length; i++) {
      options += `<option key=${i} value=${dataArray[i].subcategory_id}>${dataArray[i].subcategory_name}</option>`;
    }
    $('#subCategory').html(options);
  }

  // Setting Sub Category Value to State 
  setSubcat(event) {
    let subCatName = $('#subCategory option:selected').text();
    this.setState({ [event.target.name]: event.target.value });
    this.setState({ subCategoryName: subCatName })
  }

  // Hide or Show different fields based on changing the values
  hideFields(e, label) {
    let option = e.target.value;
    if (label == 'product_type') {
      this.setState({ [e.target.name]: e.target.value });
      if (option == 'Service') {
        $('#consumableRawProduct').attr("disabled", true);
        $('#consumableRawProduct').val($('#consumableRawProduct option:first').val());
        $('#maintaineInventory').attr("disabled", false);
        $('#item_type').attr("disabled", false);
        $('#cess_applicable').attr({ "disabled": true, "checked": false });
        $('#cess_on_sale').attr({ "disabled": true, "checked": false });
        $('#cess_on_purchase').attr({ "disabled": true, "checked": false });
      } else if (option == 'Serial No') {
        $('#consumableRawProduct').attr("disabled", true);
        $('#maintaineInventory').attr("disabled", true);
        $('#maintaineInventory').val($('#maintaineInventory option:first').val());
        $('#item_type').attr("disabled", true);
        $('#cess_applicable').attr({ "disabled": true, "checked": false });
        $('#cess_applicable').attr({ "disabled": true, "checked": false });
        $('#cess_applicable').attr({ "disabled": true, "checked": false });
      } else {
        $('#consumableRawProduct').attr("disabled", false);
        $('#maintaineInventory').attr("disabled", false);
        $('#item_type').attr("disabled", false);
        $('#cess_applicable').attr({ "disabled": false, "checked": false });
        $('#cess_on_sale').attr({ "disabled": true, "checked": false });
        $('#cess_on_purchase').attr({ "disabled": true, "checked": false });
      }
    } else if (label == 'gst_applicable_on_sale') {
      if (option == 'No') {
        this.setState({ [e.target.name]: 'No' });
        $('#gst_per').val($("#gst_per option:first").val());
        $('#gst_per').attr("disabled", true);
        $('#inc_purchase_price').attr("disabled", true);
        $('#exc_purchase_price').attr("disabled", true);
      } else {
        this.setState({ [e.target.name]: e.target.value });
        $('#gst_per').attr("disabled", false);
        $('#inc_purchase_price').attr("disabled", false);
        $('#exc_purchase_price').attr("disabled", false);
      }
    } else if (label == 'cess_applicable') {
      if (e.target.checked) {
        this.setState({ [e.target.name]: e.target.value });
        $('#cess_on_sale').attr({ "disabled": false, "checked": false });
        $('#cess_on_purchase').attr({ "disabled": false, "checked": false });
        $('#cess_amt').attr("disabled", false);
        $('#cess_disc').attr("disabled", false);
      } else {
        this.setState({ [e.target.name]: 'No' });
        $('#cess_on_sale').attr({ "disabled": true, "checked": false });
        $('#cess_on_purchase').attr({ "disabled": true, "checked": false });
        $('#cess_amt').attr("disabled", true);
        $('#cess_disc').attr("disabled", true);
      }
    } else if (label == 'disc_applicable') {
      if (e.target.checked) {
        this.setState({ [e.target.name]: e.target.value });
        $('#discountPer').attr("disabled", false);
      } else {
        this.setState({ [e.target.name]: 'No' });
        $('#discountPer').attr("disabled", true);
      }
    } else if (label == 'item_type') {
      if (option == 'Raw') {
        $('#consumableRawProduct').attr('disabled', true);
        $('#consumableRawProduct').val($('#consumableRawProduct option:first').val());
      } else {
        $('#consumableRawProduct').attr('disabled', false);
      }
    }
  }

  // Calculate Purchase Price with Inclusive or Exclusive GST 
  calculate_price(e, type) {
    let gstPer = parseFloat($('#gst_per option:selected').val());
    let gstAmt = parseFloat((100 + gstPer) / 100);
    let price = e.target.value;
    if (type == 'inclusive') {
      var priceExc = parseFloat((price / gstAmt).toFixed(5));
      $('#exc_purchase_price').val(priceExc);
      //$('#exc_purchase_price').focus();
      this.setState({ exclusivePrice: priceExc });
    } else if (type == 'exclusive') {
      var priceInc = parseFloat((price * gstAmt).toFixed(5));
      $('#inc_purchase_price').val(priceInc);
      //$('#inc_purchase_price').focus();
      this.setState({ inclusivePrice: priceInc });
    }
  }

  // Add Product Details
  async submitForm(event) {
    event.preventDefault();
    await this.setState({ showPopup: false });
    let formData = this.state;
    let response = await $.ajax({
      url: SERVER + '/add_product',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: formData
    }).responseJSON;

    if (response.status == 200) {
      alert(response.msg);
    } else {
      alert(response.msg);
    }
  }

  // Confirmation Popup 
  confirmation(e) {
    this.setState({ showPopup: true })
  }

  render() {
    const categories = this.getCategories(this.state.dis_id);
    const data = this.state;
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
            <form id="productForm" method="POST">
              <Card className="my-card">
                <CardHeader>
                  <Row style={{ padding: '8px' }}>
                    <Col md={12} lg={12} xl={12} xs={12} sm={12}>
                      <h4>
                        <span className="fa fa-info-circle">&nbsp;&nbsp;</span>
                        <b>ADD PRODUCT</b>
                      </h4>
                    </Col>
                  </Row>
                </CardHeader>

                <CardBody>
                  <Container fluid>
                    <Row style={{ padding: '5px 0px 2px 0px' }}>
                      <Col md={4} className="form-group">
                        <label className="product-label">Category</label><i className="text-danger">*</i>
                        <select className="form-control" name="category" id="category" onChange={(event) =>
                          this.getSubCategories(event)} required>
                          <option selected disabled>Select</option>
                          {
                            categories.map((cat, pos) => (
                              <option key={pos} value={cat.category_id}>{cat.category_name}</option>
                            ))
                          }
                        </select>
                      </Col>
                      <Col md={4} className="form-group">
                        <label className="product-label">Sub Category</label><i className="text-danger">*</i>
                        <select className="form-control" name="subCategory" id="subCategory" onChange={(event) => this.setSubcat(event)} required >
                          <option selected disabled>Select</option>
                        </select>
                      </Col>
                      <Col md={4} className="form-group">
                        <label className="product-label">Product Name</label><i className="text-danger">*</i>
                        <input type="text" className="form-control" name="pName" onKeyUp={event => this.setState({ [event.target.name]: event.target.value })} defaultValue={data.product_price} placeholder="Product Name" required />
                        {/**<Animateinput label='Product Name *' customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px' }} attr={{ name: 'pName', required: false, onKeyUp: event => this.setState({ [event.target.name]: event.target.value }) }} /> */}
                      </Col>
                    </Row>
                    <Row style={{ padding: '2px 0px 2px 0px' }}>
                      <Col md={2} className="form-group">
                        <label className="product-label">Product Type</label><i className="text-danger">*</i>
                        <select className="form-control" name="productType" onChange={(e) => this.hideFields(e, 'product_type')}>
                          <option selected disabled>Select Type</option>
                          <option>Service</option>
                          <option>FMCG</option>
                          <option>Serial No</option>
                        </select>
                      </Col>

                      <Col md={2} className="form-group">
                        <label className="product-label">Maintain Inventory</label><i className="text-danger">*</i>
                        <select className="form-control" name="maintaineInventory" id="maintaineInventory" onChange={(event) => this.setState({ [event.target.name]: event.target.value })}>
                          <option selected disabled>Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </Col>

                      <Col md={4} className="form-group">
                        <label className="product-label">Item Type</label><i className="text-danger">*</i>
                        <select className="form-control" name="itemType" id="item_type" onChange={(event) => this.hideFields(event, 'item_type')}>
                          <option selected disabled>Select</option>
                          <option value="Raw">Raw Material</option>
                          <option value="Finished">Finished Product</option>
                        </select>
                      </Col>
                      <Col md={4} className="form-group">
                        <label className="product-label">Consumable Raw Product</label>
                        <select className="form-control" name="consumableRawProduct" id="consumableRawProduct" onChange={(event) => this.setState({ [event.target.name]: event.target.value })}>
                          <option selected disabled>Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </Col>
                    </Row>

                    <Row style={{ padding: '2px 0px 2px 0px' }}>
                      <Col md={3} className="form-group">
                        <label className="product-label">GST Applicable on Sale</label><i className="text-danger">*</i>
                        <select className="form-control" name="gstApplicable" id="gst_applicable" onChange={(e) => this.hideFields(e, 'gst_applicable_on_sale')}>
                          <option selected disabled>Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </Col>
                      <Col md={1} className="form-group">
                        <label className="product-label">GST %</label><i className="text-danger">*</i>
                        <select className="form-control" name="gstPer" id="gst_per" onChange={(event) => this.setState({ [event.target.name]: event.target.value })}>
                          <option selected disabled>GST</option>
                          <option>0.25%</option>
                          <option>5%</option>
                          <option>8%</option>
                          <option>12%</option>
                          <option>18%</option>
                          <option>28%</option>
                        </select>
                      </Col>
                      <Col md={2} className="form-group">
                        <label className="product-label">Sale Price</label><i className="text-danger">*</i>
                        <input type="text" className="form-control" name="salePrice" onKeyUp={event => this.setState({ [event.target.name]: event.target.value })} defaultValue={data.product_price} placeholder="Sale Price" required />
                        {/*<Animateinput label="Sale Price" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px' }} attr={{ type: 'text', name: 'salePrice', onKeyUp: event => this.setState({ [event.target.name]: event.target.value }) }} />*/}
                      </Col>
                      <Col md={2} className="form-group">
                        <label className="product-label">Purchase Price Inc.</label><i className="text-danger">*</i>
                        <input type="text" className="form-control" name="inclusivePrice" onKeyUp={(event) => { this.calculate_price(event, 'inclusive')}} defaultValue={data.product_price} placeholder="Inclusive" id="inc_purchase_price" disabled required />
                        {/*<Animateinput label='Inclusive Price' customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px' }} attr={{ type: 'text', name: 'inclusivePrice', id: 'inc_purchase_price', onKeyUp: (event) => { this.calculate_price(event, 'inclusive') } }} />*/}
                      </Col>
                      <Col md={2} className="form-group">
                        <label className="product-label">Purchase Price Exc.</label><i className="text-danger">*</i>
                        <input type="text" className="form-control" name="exclusivePrice" onKeyUp={(event) => { this.calculate_price(event, 'exclusive')}} defaultValue={data.product_price} placeholder="Exclusive" id="exc_purchase_price" disabled required />
                        {/*<Animateinput label='Exclusive Price' customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px' }} attr={{ type: 'text', name: 'exclusivePrice', id: 'exc_purchase_price', onKeyUp: event => this.calculate_price(event, 'exclusive') }}/>*/}
                      </Col>
                      <Col md={2} className="form-group">
                        <label className="product-label">Dealer Price</label>
                        <input type="text" className="form-control" name="dealerPrice" onKeyUp={event => this.setState({ [event.target.name]: event.target.value })} defaultValue={data.product_price} placeholder="Dealer Price" required />
                        {/*<Animateinput label="Dealer Price" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px' }} attr={{ type: 'text', name: 'dealerPrice', onKeyUp: event => this.setState({ [event.target.name]: event.target.value }) }} />*/}
                      </Col>
                    </Row>

                    <Row style={{ padding: '2px 0px 2px 0px' }}>
                      <Col md={2} className="form-group">
                        <label className="product-label">MRP</label><i className="text-danger">*</i>
                        <input type="text" className="form-control" name="mrpPrice" onKeyUp={event => this.setState({ [event.target.name]: event.target.value })} defaultValue={data.product_price} placeholder="MRP" required />
                        {/*<Animateinput label="MRP Price" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px' }} attr={{ type: 'text', name: 'mrpPrice', onKeyUp: event => this.setState({ [event.target.name]: event.target.value }) }} />*/}
                      </Col>
                      <Col md={2} className="form-group">
                        <label className="product-label">Alias</label>
                        <input type="text" className="form-control" name="alias" onKeyUp={event => this.setState({ [event.target.name]: event.target.value })} defaultValue={data.product_price} placeholder="Alias" required />
                        {/*<Animateinput label="Alias" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px' }} attr={{ type: 'text', name: 'alias', onKeyUp: event => this.setState({ [event.target.name]: event.target.value }) }} />*/}
                      </Col>
                      <Col md={4} className="form-group">
                        <label className="product-label">HSN Code</label><i className="text-danger">*</i>
                        <input type="text" className="form-control" name="hsnCode" onKeyUp={event => this.setState({ [event.target.name]: event.target.value })} defaultValue={data.product_price} placeholder="HSN Code" required />
                        {/*<Animateinput label="HSN Code" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px' }} attr={{ type: 'text', name: 'hsnCode', onKeyUp: event => this.setState({ [event.target.name]: event.target.value }) }} />*/}
                      </Col>
                      <Col md={4} className="form-group">
                        <label className="product-label">Measurement Unit</label><i className="text-danger">*</i>
                        <select className="form-control" id="measurementUnit" name="measurementUnit" onChange={(event) => this.setState({ [event.target.name]: event.target.value })}>
                          <option selected disabled>Select</option>
                          <option>Gm</option>
                          <option>Kg</option>
                          <option>Meter</option>
                          <option>Pcs</option>
                          <option>Running Fast</option>
                          <option>Square Feet</option>
                        </select>
                      </Col>
                    </Row>

                    <Row style={{ padding: '2px 0px 2px 0px' }}>
                      <Col md={3} className="form-group">
                        <label style={{ color: '#1c237e' }}>
                          <input type="checkbox" value="Yes" name="decimalQty" onChange={(event) => this.setState({ [event.target.name]: event.target.value })} />
                        &nbsp;  Allow quantity in decimal
                      </label>
                      </Col>
                      <Col md={3} className="form-group">
                        <label style={{ color: '#1c237e' }}>
                          <input type="checkbox" value="Yes" id="discountApplicable" name="discountApplicable" onChange={(e) => this.hideFields(e, 'disc_applicable')} />
                        &nbsp; Discount Applicable
                      </label>
                      </Col>
                      <Col md={2} className="form-group">
                        <label style={{ color: '#1c237e' }}>
                          <input type="checkbox" name="cessApplicable" id="cess_applicable" value="Yes" onChange={(e) => this.hideFields(e, 'cess_applicable')} disabled />
                        &nbsp; Cess Applicable
                      </label>
                      </Col>
                      <Col md={2} className="form-group">
                        <label style={{ color: '#1c237e' }}>
                          <input type="checkbox" name="cessOnSale" id="cess_on_sale" value="Yes" onChange={(event) => this.setState({ [event.target.name]: event.target.value })} disabled />
                        &nbsp; Cess On Sale
                      </label>
                      </Col>
                      <Col md={2} className="form-group">
                        <label style={{ color: '#1c237e' }}>
                          <input type="checkbox" name="cessOnPurchase" id="cess_on_purchase" value="Yes" onChange={(event) => this.setState({ [event.target.name]: event.target.value })} disabled />
                        &nbsp; Cess On Purchase
                      </label>
                      </Col>
                    </Row>
                    <Row style={{ padding: '2px 0px 2px 0px' }}>
                      <Col md={4} className="form-group">
                        <label className="product-label">Low Stock Quantity</label>
                        <input type="text" className="form-control" name="lowStockQty" onKeyUp={event => this.setState({ [event.target.name]: event.target.value })} defaultValue={data.product_price} placeholder="Low Stock Quantity" required />
                        {/*<Animateinput label="Low Stock Quantity" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px' }} attr={{ type: 'text', name: 'lowStockQty', onKeyUp: event => this.setState({ [event.target.name]: event.target.value }) }} />*/}
                      </Col>
                      <Col md={4} className="form-group">
                        <label className="product-label">Discount (%)</label>
                        <input type="text" className="form-control" name="discountPer" onKeyUp={event => this.setState({ [event.target.name]: event.target.value })} defaultValue={data.product_price} placeholder="Discount (%)" id="discountPer" disabled required />
                        {/*<Animateinput label="Discount (%)" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px' }} attr={{ type: 'text', name: 'discountPer', id: 'discountPer', disabled: true, onKeyUp: event => this.setState({ [event.target.name]: event.target.value }) }} />*/}
                      </Col>
                      <Col md={2} className="form-group">
                        <label className="product-label">Cess Amount (PC)</label>
                        <input type="text" className="form-control" name="cessAmt" onKeyUp={event => this.setState({ [event.target.name]: event.target.value })} defaultValue={data.product_price} placeholder="Cess Amount (PC)" id="cess_amt" required disabled/>
                        {/*<Animateinput label="Cess Amount (PC)" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px' }} attr={{ type: 'text', name: 'cessAmt', id: 'cess_amt', disabled: true, onKeyUp: event => this.setState({ [event.target.name]: event.target.value }) }} />*/}
                      </Col>
                      <Col md={2} className="form-group">
                        <label className="product-label">Cess Discount (%)</label>
                        <input type="text" className="form-control" name="cessDisc" onKeyUp={event => this.setState({ [event.target.name]: event.target.value })} defaultValue={data.product_price} placeholder="Cess Discount (%)" id="cess_disc" disabled required />
                        {/*<Animateinput label="Cess Discount (%)" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px' }} attr={{ type: 'text', name: 'cessDisc', id: 'cess_disc', disabled: true, onKeyUp: event => this.setState({ [event.target.name]: event.target.value }) }} />*/}
                      </Col>
                    </Row>
                    <Row style={{ padding: '2px 0px 2px 0px' }}>
                      <Col md={2} className="form-group">
                        <button type="button" className="btn btn-primary" onClick={(e) => this.confirmation(e)}>Proceed</button>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </form>
          </section>
          <ConfirmationModal show={this.state.showPopup}>
            <Container fluid>
              <Row style={{ padding: '5px 2px 2px 5px' }}>
                <Col md={4}>
                  <label><b>Category</b></label>
                  <input type="text" value={data.categoryName} className='form-control' readOnly />
                </Col>
                <Col md={4}>
                  <label><b>Subcategory Category</b></label>
                  <input type="text" value={data.subCategoryName} className='form-control' readOnly />
                </Col>
                <Col md={4}>
                  <label><b>Product Name</b></label>
                  <input type="text" value={data.pName} className='form-control' readOnly />
                </Col>
              </Row>
              <Row style={{ padding: '5px 2px 2px 5px' }}>
                <Col md={2}>
                  <label><b>Product Type</b></label>
                  <input type="text" value={data.productType} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Maintain Inventory</b></label>
                  <input type="text" value={data.maintaineInventory} className='form-control' readOnly />
                </Col>
                <Col md={4}>
                  <label><b>Item Type</b></label>
                  <input type="text" value={data.itemType} className='form-control' readOnly />
                </Col>
                <Col md={4}>
                  <label><b>consumable Raw Product</b></label>
                  <input type="text" value={data.consumableRawProduct} className='form-control' readOnly />
                </Col>
              </Row>
              <Row style={{ padding: '5px 2px 2px 5px' }}>
                <Col md={3}>
                  <label><b>GST Applicable</b></label>
                  <input type="text" value={data.gstApplicable} className='form-control' readOnly />
                </Col>
                <Col md={1}>
                  <label><b>GST%</b></label>
                  <input type="text" value={data.gstPer} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Sale Price</b></label>
                  <input type="text" value={data.salePrice} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Inclusive Price</b></label>
                  <input type="text" value={data.inclusivePrice} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Exclusive Price</b></label>
                  <input type="text" value={data.exclusivePrice} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Dealer Price</b></label>
                  <input type="text" value={data.dealerPrice} className='form-control' readOnly />
                </Col>
              </Row>
              <Row style={{ padding: '5px 2px 2px 5px' }}>
                <Col md={2}>
                  <label><b>MRP</b></label>
                  <input type="text" value={data.mrpPrice} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Alias</b></label>
                  <input type="text" value={data.alias} className='form-control' readOnly />
                </Col>
                <Col md={4}>
                  <label><b>HSN Code</b></label>
                  <input type="text" value={data.hsnCode} className='form-control' readOnly />
                </Col>
                <Col md={4}>
                  <label><b>Measurement Unit</b></label>
                  <input type="text" value={data.measurementUnit} className='form-control' readOnly />
                </Col>
              </Row>
              <Row style={{ padding: '5px 2px 2px 5px' }}>
                <Col md={3}>
                  <input type="checkbox" disabled="true" defaultChecked={data.decimalQty == 'Yes'} /> Allow Quantity in Decimal
            </Col>
                <Col md={3}>
                  <input type="checkbox" disabled="true" defaultChecked={data.discountApplicable == 'Yes'} /> Discount Applicable
            </Col>
                <Col md={2}>
                  <input type="checkbox" disabled="true" defaultChecked={data.cessApplicable == 'Yes'} /> Cess Applicable
            </Col>
                <Col md={2}>
                  <input type="checkbox" disabled="true" defaultChecked={data.cessOnSale == 'Yes'} /> Cess On Sale
            </Col>
                <Col md={2}>
                  <input type="checkbox" disabled="true" defaultChecked={data.cessOnPurchase == 'Yes'} /> Cess On Purchase
            </Col>
              </Row>
              <Row style={{ padding: '5px 2px 2px 5px' }}>
                <Col md={4}>
                  <label><b>Low Stock Quantity</b></label>
                  <input type="text" value={data.lowStockQty} className='form-control' readOnly />
                </Col>
                <Col md={4}>
                  <label><b>Discount(%)</b></label>
                  <input type="text" value={data.discountPer} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Cess Amount(PC)</b></label>
                  <input type="text" value={data.cessAmt} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Cess Discount(%)</b></label>
                  <input type="text" value={data.cessDisc} className='form-control' readOnly />
                </Col>
              </Row>
              <Row style={{ padding: '10px 2px 20px 5px' }}>
                <Col md={4}>
                  <button type="button" className="btn btn-success" onClick={(e) => this.submitForm(e)} style={{ marginRight: '20px' }} >Submit</button>
                  <button type="button" className="btn" onClick={(e) => this.setState({ showPopup: false })}>Cancel</button>
                </Col>
              </Row>
            </Container>
          </ConfirmationModal>
        </div>
      </div>
    )
  }
}

export default productAdd;