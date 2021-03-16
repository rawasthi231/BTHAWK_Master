import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import './css/product_catagory.css';
import $ from 'jquery';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Animateinput from '../animate input/AnimateInput';
import Popup from './Modal';
import { Form } from 'react-bootstrap';
import { Button } from 'bootstrap';
import ConfirmationModal from './confirmationModal';
import './css/main.css';
const SERVER = 'http://localhost:5000';

// Class Component for Edit Product Details
class ProductEdit extends Component {
  // Constructor
  constructor(props) {
    super(props);
    // State properties declaration
    this.state = {
      showPopup: false,
      refresh: 0,
      data: {
        product_id: '',
        pName: '',
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
  }


  componentDidMount() {
    // Getting Product Id from Product Detail Page
    const { p_id } = this.props.location.state;
    // Fetching Product Detail of the product id
    const data = this.getData(p_id);
    // Initializing values of state properties    
    this.setState({ data: { product_id: data.product_id, pName: data.product_name, maintaineInventory: data.maintain_inventory, itemType: data.item_type, consumableRawProduct: data.consumable_raw_product, gstApplicable: data.gst_applicable, gstPer: data.IGST, salePrice: data.product_price, inclusivePrice: data.purchase_price, exclusivePrice: data.purchase_price_exc, dealerPrice: data.dealer_price, mrpPrice: data.mrp_price, alias: data.alias, hsnCode: data.hsn_code, measurementUnit: data.measurement_value, decimalQty: data.decimal_category, discountApplicable: data.discount_applicable, cessApplicable: data.cess_applicable, cessOnSale: data.cess_on_sale, cessOnPurchase: data.cess_on_purchase, lowStockQty: data.low_stock_quantity, discountPer: data.discount_percentage, cessAmt: data.cess_pc_amt, cessDisc: data.cess_percentage } });
  }

  // Hide different fields on changing properties
  hideFields(e, label) {
    let option = e.target.value;
    if (label == 'product_type') {
      if (option == 'Service') {
        $('#cosumableRawProduct').attr("disabled", true);
        $('#maintaineInventory').attr("disabled", false);
        $('#item_type').attr("disabled", false);
        $('#cess_applicable').attr({ "disabled": true, "checked": false });
        $('#cess_on_sale').attr({ "disabled": true, "checked": false });
        $('#cess_on_purchase').attr({ "disabled": true, "checked": false });
      } else if (option == 'Serial No') {
        $('#cosumableRawProduct').attr("disabled", true);
        $('#maintaineInventory').attr("disabled", true);
        $('#item_type').attr("disabled", true);
        $('#cess_applicable').attr({ "disabled": true, "checked": false });
        $('#cess_applicable').attr({ "disabled": true, "checked": false });
        $('#cess_applicable').attr({ "disabled": true, "checked": false });
      } else {
        $('#cosumableRawProduct').attr("disabled", false);
        $('#maintaineInventory').attr("disabled", false);
        $('#item_type').attr("disabled", false);
        $('#cess_applicable').attr({ "disabled": false, "checked": false });
        $('#cess_on_sale').attr({ "disabled": true, "checked": false });
        $('#cess_on_purchase').attr({ "disabled": true, "checked": false });
      }
      this.setState((prevState, props) => ({
        data: {
          ...prevState.data,
          [e.target.name]: e.target.value
        }
      }));
    } else if (label == 'gst_applicable_on_sale') {
      if (option == 'No') {
        $('#gst_per').val($("#gst_per option:first").val());
        $('#gst_per').attr("disabled", true);
        $('#inc_purchase_price').attr("disabled", true);
        $('#exc_purchase_price').attr("disabled", true);
      } else {
        $('#gst_per').attr("disabled", false);
      }
      this.setState((prevState, props) => ({
        data: {
          ...prevState.data,
          [e.target.name]: e.target.value
        }
      }));
    } else if (label == 'cess_applicable') {
      if (e.target.checked) {
        $('#cess_on_sale').attr("disabled", false);
        $('#cess_on_purchase').attr("disabled", false);
        $('#cess_amt').attr("disabled", false);
        $('#cess_disc').attr("disabled", false);
        this.setState((prevState, props) => ({
          data: {
            ...prevState.data,
            [e.target.name]: e.target.value
          }
        }));
      } else {
        $('#cess_on_sale').attr("disabled", true);
        $('#cess_on_purchase').attr("disabled", true);
        $('#cess_amt').attr("disabled", true);
        $('#cess_disc').attr("disabled", true);
        this.setState((prevState, props) => ({
          data: {
            ...prevState.data,
            [e.target.name]: "No"
          }
        }));
      }
    } else if (label == 'disc_applicable') {
      if (e.target.checked) {
        $('#discountPer').attr("disabled", false);
        this.setState((prevState, props) => ({
          data: {
            ...prevState.data,
            [e.target.name]: e.target.value
          }
        }));
      } else {
        $('#discountPer').attr("disabled", true);
        this.setState((prevState, props) => ({
          data: {
            ...prevState.data,
            [e.target.name]: "No"
          }
        }));
      }
    } else if (label == 'cess_on_sale' || label == 'cess_on_purchase') {
      if (e.target.checked) {
        this.setState((prevState, props) => ({
          data: {
            ...prevState.data,
            [e.target.name]: e.target.value
          }
        }));
      } else {
        this.setState((prevState, props) => ({
          data: {
            ...prevState.data,
            [e.target.name]: "No"
          }
        }));
      }
    }
  }

  // Setting up values of state properties on changing values 
  setData(e) {
    this.setState((prevState, props) => ({
      data: {
        ...prevState.data,
        [e.target.name]: e.target.value
      }
    }));
  }

  // Open Confirmation Popup
  confirmation(e) {
    this.setState({ showPopup: true });
  }

  // Function for fetching details of the product
  getData(p_id) {
    var response = $.ajax({
      url: SERVER + '/get_single_product',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: {
        p_id: p_id
      }
    }).responseJSON;

    return response.data;
  }

  // Calculating Product's Purchase Price with Inclusive or Exclusive GST
  calculate_price(e, type) {
    let gstPer = parseFloat($('#gst_per option:selected').val());
    let gstAmt = parseFloat((100 + gstPer) / 100);
    let price = e.target.value;
    if (type == 'inclusive') {
      var priceExc = parseFloat((price / gstAmt).toFixed(5));
      $('#exc_purchase_price').val(priceExc);
      this.setState((prevState, props) => ({
        data: {
          ...prevState.data,
          [e.target.name]: priceExc
        }
      }));
    } else if (type == 'exclusive') {
      var priceInc = parseFloat((price * gstAmt).toFixed(5));
      $('#inc_purchase_price').val(priceInc);
      this.setState((prevState, props) => ({
        data: {
          ...prevState.data,
          [e.target.name]: priceExc
        }
      }));
    }
  }

  // Updation of values after editing
  async submitForm(event) {
    let formData = this.state.data;
    event.preventDefault();
    let response = await $.ajax({
      url: SERVER + '/edit_product',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: {
        formData: formData,
      }
    }).responseJSON;
    if (response.status == "200") {
      this.setState({ showPopup: false });
    }
  }



  render() {
    const { p_id } = this.props.location.state;
    const data = this.getData(p_id);
    const editableData = this.state.data;
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
                <span>&nbsp;Edit Product</span>
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
            <form id="productForm" onSubmit={(e) => this.submitForm(e)} method="POST">
              <Card className="my-card">
                <CardHeader>
                  <Row style={{ padding: '8px' }}>
                    <Col md={12} lg={12} xl={12} xs={12} sm={12}>
                      <h4>
                        <span className="fa fa-info-circle">&nbsp;&nbsp;</span>
                        <b>EDIT PRODUCT</b>
                      </h4>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Container fluid>
                    <Row style={{ padding: '10px 0px 2px 0px' }}>
                      <Col md={4} sm={12} xs={12} className="form-group">
                        <label className="product-label">Product Name</label>
                        <input type="text" className="form-control" name="pName" onKeyUp={event => this.setData(event)} defaultValue={data.product_name} required />
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">Maintain Inventory</label>
                        <select className="form-control" name="maintaineInventory" id="maintaineInventory" onChange={event => this.setData(event)} defaultValue={data.maintain_inventory} readOnly>
                          <option value="" selected disabled>Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">Item Type</label>
                        <select className="form-control" name="itemType" id="item_type" onChange={event => this.setData(event)} defaultValue={data.item_type} readOnly>
                          <option value="" selected disabled>Select</option>
                          <option value="Raw">Raw Material</option>
                          <option value="Finished">Finished Product</option>
                        </select>
                      </Col>
                      <Col md={4} sm={12} xs={12} className="form-group">
                        <label className="product-label">Consumable Raw Product</label>
                        <select className="form-control" name="cosumableRawProduct" id="cosumableRawProduct" onChange={event => this.setData(event)} defaultValue={data.consumable_raw_product} readOnly>
                          <option value="" selected disabled>Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </Col>
                    </Row>
                    <Row style={{ padding: '2px 0px 2px 0px' }}>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">GST Applicable on Sale</label>
                        <select className="form-control" name="gstApplicable" id="gst_applicable" onChange={(e) => this.hideFields(e, 'gst_applicable_on_sale')} defaultValue={data.gst_applicable} readOnly>
                          <option value="" selected disabled>Select</option>
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">GST %</label>
                        <select className="form-control" name="gstPer" id="gst_per" onChange={event => this.setData(event)} defaultValue={data.IGST}>
                          <option value="" selected disabled>Select</option>
                          <option value="0.25">0.25%</option>
                          <option value="5">5%</option>
                          <option value="8">8%</option>
                          <option value="12">12%</option>
                          <option value="18">18%</option>
                          <option value="28">28%</option>
                        </select>
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">Sale Price</label>
                        <input type="text" className="form-control" name="salePrice" onKeyUp={event => this.setData(event)} defaultValue={data.product_price} />
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">Purchase Price Inc.</label>
                        <input type="text" className="form-control" name="inclusivePrice" id="inc_purchase_price" onKeyUp={event => this.calculate_price(event, 'inclusive')} defaultValue={data.purchase_price} />
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">Purchase Price Exc.</label>
                        <input type="text" className="form-control" name="exclusivePrice" id="exc_purchase_price" onKeyUp={event => this.calculate_price(event, 'exclusive')} defaultValue={data.purchase_price_exc} />
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">Dealer Price</label>
                        <input type="text" className="form-control" name="dealerPrice" onKeyUp={event => this.setData(event)} defaultValue={data.dealer_price} />
                      </Col>
                    </Row>

                    <Row style={{ padding: '2px 0px 2px 0px' }}>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">MRP Price</label>
                        <input type="text" className="form-control" name="mrpPrice" onKeyUp={event => this.setData(event)} defaultValue={data.mrp_price} />
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">Alias</label>
                        <input type="text" className="form-control" name="alias" onKeyUp={event => this.setData(event)} defaultValue={data.mrp_price} />
                      </Col>
                      <Col md={4} sm={12} xs={12} className="form-group">
                        <label className="product-label">HSN Code</label>
                        <input type="text" className="form-control" name="hsnCode" onKeyUp={event => this.setData(event)} defaultValue={data.mrp_price} />
                      </Col>
                      <Col md={4} sm={12} xs={12} className="form-group">
                        <label className="product-label">Measurement Unit</label>
                        <select className="form-control" id="measurementUnit" name="measurementUnit" onChange={event => this.setData(event)} defaultValue={data.unit}>
                          <option value="" selected disabled>Select</option>
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
                          <input type="checkbox" value="Yes" name="decimalQty" onChange={event => this.setData(event)} defaultChecked={data.decimal_category == 'Yes'} />
                    &nbsp;  Allow quantity in decimal
                  </label>
                      </Col>
                      <Col md={3} sm={12} xs={12} className="form-group">
                        <label style={{ color: '#1c237e' }}>
                          <input type="checkbox" value="Yes" id="discountApplicable" name="discountApplicable" onChange={(e) => this.hideFields(e, 'disc_applicable')} defaultChecked={data.discount_applicable == 'Yes'} />
                    &nbsp; Discount Applicable
                  </label>
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label style={{ color: '#1c237e' }}>
                          <input type="checkbox" name="cessApplicable" id="cess_applicable" value="Yes" onChange={(e) => this.hideFields(e, 'cess_applicable')} defaultChecked={data.cess_applicable == 'Yes'} />
                    &nbsp; Cess Applicable
                  </label>
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label style={{ color: '#1c237e' }}>
                          <input type="checkbox" name="cessOnSale" id="cess_on_sale" value="Yes" onChange={(e) => this.hideFields(e, 'cess_on_sale')} defaultChecked={data.cess_on_sale == 'Yes'} disabled />
                    &nbsp; Cess On Sale
                  </label>
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label style={{ color: '#1c237e' }}>
                          <input type="checkbox" name="cessOnPurchase" id="cess_on_purchase" value="Yes" onChange={(e) => this.hideFields(e, 'cess_on_purchase')} defaultChecked={data.cess_on_purchase == 'Yes'} disabled />
                    &nbsp; Cess On Purchase
                  </label>
                      </Col>
                    </Row>
                    <Row style={{ padding: '2px 0px 2px 0px' }}>
                      <Col md={4} sm={12} xs={12} className="form-group">
                        <label className="product-label">Low Stock Quantity</label>
                        <input type="text" className="form-control" name="lowStockQty" onKeyUp={event => this.setData(event)} defaultValue={data.mrp_price} />
                      </Col>
                      <Col md={4} sm={12} xs={12} className="form-group">
                        <label className="product-label">Discount (%)</label>
                        <input type="text" className="form-control" name="discountPer" id="discountPer" onKeyUp={event => this.setData(event)} defaultValue={data.discount_percentage} />
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">Cess Amount (PC)</label>
                        <input type="text" className="form-control" name="cessAmt" id="cess_amt" onKeyUp={event => this.setData(event)} defaultValue={data.cess_pc_amt} disabled={data.cess_applicable != 'Yes'} />
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">Cess Discount (%)</label>
                        <input type="text" className="form-control" name="cessDisc" id="cess_disc" onKeyUp={event => this.setData(event)} defaultValue={data.cess_percentage} disabled={data.cess_applicable != 'Yes'} />
                      </Col>
                    </Row>
                    <Row style={{ padding: '2px 0px 2px 0px' }}>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <button type="button" className="btn btn-primary" onClick={(e) => this.confirmation(e)}>Proceed</button>
                      </Col>
                    </Row>
                  </Container>
                </CardBody>
              </Card>
            </form>
          </section>

          {/** Confirmation Popup for confirmation  */}
          <ConfirmationModal show={this.state.showPopup} data={this.state}>
            <Container fluid>
              <Row style={{ padding: '5px 2px 2px 5px' }}>
                <Col md={4}>
                  <label><b>Product Name</b></label>
                  <input type="text" value={editableData.pName} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Maintain Inventory</b></label>
                  <input type="text" value={editableData.maintaineInventory} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Item Type</b></label>
                  <input type="text" value={editableData.itemType} className='form-control' readOnly />
                </Col>
                <Col md={4}>
                  <label><b>consumable Raw Product</b></label>
                  <input type="text" value={editableData.consumableRawProduct} className='form-control' readOnly />
                </Col>
              </Row>
              <Row style={{ padding: '5px 2px 2px 5px' }}>
                <Col md={2}>
                  <label><b>GST Applicable</b></label>
                  <input type="text" value={editableData.gstApplicable} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>GST%</b></label>
                  <input type="text" value={editableData.gstPer} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Sale Price</b></label>
                  <input type="text" value={editableData.salePrice} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Purchase Price Inc.</b></label>
                  <input type="text" value={editableData.inclusivePrice} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Purchase Price Inc.</b></label>
                  <input type="text" value={editableData.exclusivePrice} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Dealer Price</b></label>
                  <input type="text" value={editableData.dealerPrice} className='form-control' readOnly />
                </Col>
              </Row>
              <Row style={{ padding: '5px 2px 2px 5px' }}>
                <Col md={2}>
                  <label><b>MRP</b></label>
                  <input type="text" value={editableData.mrpPrice} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Alias</b></label>
                  <input type="text" value={editableData.alias} className='form-control' readOnly />
                </Col>
                <Col md={4}>
                  <label><b>HSN Code</b></label>
                  <input type="text" value={editableData.hsnCode} className='form-control' readOnly />
                </Col>
                <Col md={4}>
                  <label><b>Measurement Unit</b></label>
                  <input type="text" value={editableData.measurementUnit} className='form-control' readOnly />
                </Col>
              </Row>
              <Row style={{ padding: '5px 2px 2px 5px' }}>
                <Col md={3}>
                  <input type="checkbox" disabled="true" defaultChecked={editableData.decimalQty == 'Yes'} /> Allow Quantity in Decimal
                </Col>
                <Col md={3}>
                  <input type="checkbox" disabled="true" defaultChecked={editableData.discountApplicable == 'Yes'} /> Discount Applicable
                </Col>
                <Col md={2}>
                  <input type="checkbox" disabled="true" defaultChecked={editableData.cessApplicable == 'Yes'} /> Cess Applicable
                </Col>
                <Col md={2}>
                  <input type="checkbox" disabled="true" defaultChecked={editableData.cessOnSale == 'Yes'} /> Cess On Sale
                </Col>
                <Col md={2}>
                  <input type="checkbox" disabled="true" defaultChecked={editableData.cessOnPurchase == 'Yes'} /> Cess On Purchase
                </Col>
              </Row>
              <Row style={{ padding: '5px 2px 2px 5px' }}>
                <Col md={4}>
                  <label><b>Low Stock Quantity</b></label>
                  <input type="text" value={editableData.lowStockQty} className='form-control' readOnly />
                </Col>
                <Col md={4}>
                  <label><b>Discount(%)</b></label>
                  <input type="text" value={editableData.discountPer} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Cess Amount(PC)</b></label>
                  <input type="text" value={editableData.cessAmt} className='form-control' readOnly />
                </Col>
                <Col md={2}>
                  <label><b>Cess Discount(%)</b></label>
                  <input type="text" value={editableData.cessDisc} className='form-control' readOnly />
                </Col>
              </Row>
              <Row style={{ padding: '10px 2px 2px 5px', marginBottom: '10px' }}>
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

export default ProductEdit;