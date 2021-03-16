import React, { Component } from 'react';
import $ from 'jquery';
import { Container, Row, Col, Card, CardBody, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import Animateinput from '../animate input/AnimateInput';
import "./css/main.css";
import { Alert, Confirm } from 'react-st-modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();
const SERVER = 'http://localhost:5000';

export default class FSEStockReturn extends Component {
  // Constructor
  constructor(props) {
    super(props);
    this.state = {
      dis_id: 12,
      user_id: this.props.location.state.user_id,
      user_role: 'All',
      data: {
        detail: []
      }
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
    console.log(this.state.data);
  }

  // Getting Data from Backend API
  getData(user_id) {
    let dis_id = this.state.dis_id;
    var response = $.ajax({
      url: SERVER + '/user_stock_return',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: {
        dis_id: dis_id,
        user_id: user_id
      }
    }).responseJSON;
    return response.data;
  }

  // Checking returned stock value
  returnValue(e, stock, p_id, p_name, qty) {
    let value = e.target.value;
    let id = e.target.id;
    if (value > stock) {
      Alert('Please enter value less than current stock!');
      $(`#${id}`).val(null);
    } else {

      let detail = [...this.state.data.detail];
      detail.push({
        product_id: p_id,
        product_name: p_name,
        quantity: qty,
        return_quantity: e.target.value
      });

      this.setState((prevState) => ({
        data: {
          ...prevState.data,
          detail
        }
      }));
    }
  }

  async confirmation() {
    const data = this.state.data.detail;
    let body = <div>
      <Container fluid>
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Table striped bordered hover responsive id="viewTable">
              <thead>
                <tr style={{ fontSize: '10px' }}>
                  <th>S.No.</th>
                  <th>Product Name</th>
                  <th>Stock Quantity</th>
                  <th>Retutn Quantity</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.map((val, index) => (
                    <tr key={index}>
                      <td>{(index + 1)}</td>
                      <td><input type="text" className="form-control" defaultValue={val.product_name} readOnly /></td>
                      <td><input type="text" className="form-control" defaultValue={val.quantity} readOnly /></td>
                      <td><input type="text" className="form-control" defaultValue={val.return_quantity} readOnly /></td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </div>
    let head = <div>Confirmation <hr style={{ margin: '0', padding: '0' }} /></div>;
    const result = await Confirm(body, head, 'Submit', 'Close');
    if (result) {
      var response = $.ajax({
        url: `${SERVER}/update_returned_user_stock`,
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        async: false,
        dataType: 'JSON',
        data: {
          dis_id: this.state.dis_id,
          user_id: this.state.user_id,
          detail: data
        }
      }).responseJSON;
      if(response.status==200){
        toast(response.msg);
      } else{
        toast.danger('Something Went Wrong');
      }
    }

    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        detail: []
      }
    }));
  }


  render() {
    const { user_id, user_name } = this.props.location.state;
    const data = this.getData(user_id);
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
                <span>&nbsp;Stock Return Detail </span>
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
                    <Col md={9} lg={9} xl={9} xs={12} sm={12}>
                      <h4>
                        <span className="fa fa-info-circle">&nbsp;&nbsp;</span>
                        <b>{user_name} Stock Return Detail</b>
                      </h4>
                    </Col>
                    <Col md={3} lg={3} xl={3} xs={12} sm={12}>
                      <Animateinput label='Search' type="text" customStyle={{ fontSize: '14px', padding: '10px 0px 2px 10px' }} attr={{ onKeyUp: (event) => { this.filter(event) }, id: 'searchBox' }} />
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
                  <form>
                    <Row style={{ padding: '8px', marginTop: '8px' }}>
                      <Col md={12} lg={12} xl={12} xs={12} sm={12}>
                        <Table striped bordered hover responsive id="viewTable">
                          <thead>
                            <tr style={{ fontSize: '10px' }}>
                              <th>S.No.</th>
                              <th>Product Name</th>
                              <th>Stock Quantity</th>
                              <th>Retutn Quantity</th>
                            </tr>
                          </thead>
                          <tbody id="tableBody">
                            {
                              data.map((val, index) => (
                                <tr key={index}>
                                  <td>{(index + 1)}</td>
                                  <td>{val.product_name}</td>
                                  <td>{val.quantity}</td>
                                  <td>
                                    {/** Setting up input field based on conditions using Ternary Opertaor */
                                      (val.quantity > 0) ? (
                                        (val.decimal_category == "Yes") ?
                                          <input type="text" name={`pQty_${index + 1}`} id={`pQty_${index + 1}`} onChange={(event) => this.returnValue(event, val.quantity, val.product_id, val.product_name, val.quantity)} className="form-control" maxLength="12" style={{ width: '50%' }} />
                                          :
                                          <input type="text" name={`pQty_${index + 1}`} id={`pQty_${index + 1}`} onChange={(event) => this.returnValue(event, val.quantity, val.product_id, val.product_name, val.quantity)} className="form-control" maxLength="7" style={{ width: '50%' }} />
                                      ) :
                                        <input type="text" className="form-control" style={{ width: '50%' }} readOnly />
                                    }
                                  </td>
                                </tr>
                              ))
                            }
                          </tbody>
                        </Table>
                      </Col>
                    </Row>
                    {((this.state.user_role == 'All') ?
                      <Row style={{ padding: '8px', marginTop: '8px' }}>
                        <Col md={12} lg={12} xl={12} xs={12} sm={12}>
                          <button type="button" className="btn btn-bt1" onClick={() => this.confirmation()} style={{ marginRight: '15px' }}>Submit</button>
                          <input type="reset" className="btn btn-bt2" value="Reset" />
                        </Col>
                      </Row>
                      :
                      ""
                    )
                    }
                  </form>
                </Container>
              </CardBody>
            </Card>
          </section>
        </div>
      </div>
    )
  }
}

