import React, { Component } from 'react';
import $ from 'jquery';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import "./css/main.css";
import { toast } from 'react-toastify';
import { Alert, Confirm } from 'react-st-modal';
const SERVER = 'http://localhost:5000';

// Class Component for Edit FSE Details
class EditFSE extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dis_id: 12,
      showPopup: false,
      refresh: 0,
      data: {
        user_id: '',
        fse_name: '',
        invoice_type: '',
        e_recharge: '',
        new_pass: '',
        confirm_pass: ''
      }
    }
  }

  // View tabs according to tab request
  getTab = (evt, showId) => {
    var elem = document.getElementsByClassName('profile-nav-link');
    var tabElement = document.getElementsByClassName('tabItems');

    for (let show = 0; show < tabElement.length; show++) {
      $(tabElement[show]).css("display", 'none');
    }

    for (let i = 1; i < elem.length; i++) {
      elem[i].className = elem[i].className.replace(" profile_active", "");
    }

    $('.' + evt.target.className + '').parent().addClass(' profile_active');
    $('#' + showId + '').css('display', 'block');
  }

  // Setting up state data with user details
  componentDidMount() {
    const { user_id } = this.props.location.state;
    const data = this.getData(user_id);
    this.setState({ data: { user_id: user_id, fse_name: data.user_name, invoice_type: data.invoice_type, e_recharge: data.e_recharge_setting } });
  }

  // Getting user data
  getData(user_id) {
    var response = $.ajax({
      url: SERVER + '/get_sales_executive',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      async: false,
      dataType: 'JSON',
      data: {
        type: "single_user",
        user_id: user_id
      }
    }).responseJSON;

    return response.data[0];
  }

  // Setting State data on changing values
  setData(e) {
    this.setState((prevState, props) => ({
      data: {
        ...prevState.data,
        [e.target.name]: e.target.value
      }
    }));
  }

  // Function for Update User Details
  async updateDetails() {
    const data = this.state.data;
    let body = <div>
      <Container fluid>
        <Row>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <label className="product-label"><b>FSE Name</b></label>
            <input type="text" className="form-control" defaultValue={data.fse_name} readOnly />
          </Col>
        </Row>
        <Row>
          <Col xl={6} lg={6} md={6} sm={6} xs={6}>
            <label className="product-label"><b>Invoice Type</b></label>
            <input type="text" className="form-control" defaultValue={data.invoice_type} readOnly />
          </Col>
          <Col xl={6} lg={6} md={6} sm={6} xs={6}>
            <label className="product-label"><b>E-Recharge</b></label>
            <input type="text" className="form-control" defaultValue={data.e_recharge} readOnly />
          </Col>
        </Row>
      </Container>
    </div>
    let head = <div>Confirmation <hr style={{ margin: '0', padding: '0' }} /></div>;
    const result = await Confirm(body, head, 'Update', 'Close');

    if (result) {
      let response = await $.ajax({
        url: SERVER + '/update_fse_detail',
        method: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        async: false,
        dataType: 'JSON',
        data: data
      }).responseJSON;

      if (response.status == "200") {
        toast(response.msg);
      } else {
        toast.error(response.msg);
      }
    }
  }

  async changePassword() {
    const data = this.state.data;
    // let body = <div>
    //   <Container fluid>
    //     <Row>
    //       <Col xl={6} lg={6} md={6} sm={6} xs={6}>
    //         <label className="product-label"><b>New Password</b></label>
    //         <input type="text" className="form-control" defaultValue={data.new_pass} readOnly />
    //       </Col>
    //       <Col xl={6} lg={6} md={6} sm={6} xs={6}>
    //         <label className="product-label"><b>Confirm Password</b></label>
    //         <input type="text" className="form-control" defaultValue={data.confirm_pass} readOnly />
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>
    if (data.new_pass == data.confirm_pass) {
      let body = <div><h4>Are you sure to update password ?</h4></div>
      let head = <div>Confirmation <hr style={{ margin: '0', padding: '0' }} /></div>;
      const result = await Confirm(body, head, 'Yes', 'No');
      if (result) {
        let response = await $.ajax({
          url: SERVER + '/update_fse_password',
          method: 'POST',
          contentType: 'application/x-www-form-urlencoded',
          async: false,
          dataType: 'JSON',
          data: {
            user_id: data.user_id,
            password: data.confirm_pass
          }
        }).responseJSON;

        if (response.status == "200") {
          toast(response.msg);
          this.setState((prevState, props) => ({
            ...prevState,
            "refresh": 1
          }));
        } else {
          toast.error(response.msg);
        }
      }
    } else {
      Alert('Both Password must be same.');
    }
  }


  render() {
    const { user_id } = this.props.location.state;
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
                <span>&nbsp;Edit Profile for {data.user_name} </span>
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
                  <Row>
                    <Col md={9}>
                      <div className="profile-nav-link">
                        <li style={{ display: 'block' }}>
                          <h4>
                            <span className="fa fa-info-circle">&nbsp;&nbsp;</span>
                            <b>Profile Account</b>
                          </h4>
                        </li>
                      </div>
                    </Col>
                    <Col md={3} className="profile-type">
                      <li className="profile-nav-link profile_active" onClick={(event) => this.getTab(event, 'profile')}>
                        <h5 className="profile"><i className="fa fa-pencil"></i>Profile Setting</h5>
                      </li>
                      <li className="profile-nav-link" onClick={(event) => this.getTab(event, 'password')}>
                        <h5 className="password"><i className="fa fa-user"></i>Change Password</h5>
                      </li>
                    </Col>
                  </Row>
                </Container>
              </CardBody>
            </Card>
          </section>

          <section>
            <Card className="my-card">
              <CardBody className="tabItems" id="profile" style={{display:'block'}}>
                <form>
                  <Container fluid>
                    <Row style={{ padding: '10px 0px 2px 0px' }}>
                      <Col md={4} sm={12} xs={12} className="form-group">
                        <label className="product-label">FSE Name</label><i className="text-danger">*</i>
                        <input type="text" className="form-control" name="fse_name" defaultValue={data.user_name} onKeyUp={(event) => { this.setData(event) }} required />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">Invoice Type</label><i className="text-danger">*</i>
                        <select className="form-control" name="invoice_type" required defaultValue={data.invoice_type} onChange={(event) => { this.setData(event) }} >
                          <option value="Tax Invoice">Tax Invoice</option>
                          <option value="Delivery Challan">Delivery Challan</option>
                          <option value="Both">Both</option>
                        </select>
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">E-Recharge</label><i className="text-danger">*</i>
                        <select className="form-control" name="e_recharge" disabled={data.work_type == 'FMCG'} defaultValue={data.e_recharge_setting} onChange={(event) => { this.setData(event) }} required>
                          <option value="Yes">Yes</option>
                          <option value="No">No</option>
                        </select>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={1} sm={6} xs={6} className="form-group">
                        <input type="button" value="Submit" className="btn btn-bt1" onClick={this.updateDetails.bind(this)} />
                      </Col>
                      <Col md={1} sm={6} xs={6} className="form-group">
                        <input type="reset" value="Reset" className="btn btn-bt2" />
                      </Col>
                    </Row>
                  </Container>
                </form>
              </CardBody>
              <CardBody className="tabItems" id="password">
                <form>
                  <Container fluid>
                    <Row style={{ padding: '10px 0px 2px 0px' }}>
                      <Col md={4} sm={12} xs={12} className="form-group">
                        <label className="product-label">Current Password</label>
                        <input type="text" className="form-control" name="current_pass" defaultValue={data.user_password} readOnly />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        {/**onKeyUp={(event) => { this.checkPassword(event)}}  */}
                        <label className="product-label">New Password</label><i className="text-danger">*</i>
                        <input type="text" className="form-control" name="new_pass" id="new_pass" placeholder="******" onKeyUp={(event) => { this.setData(event) }} required />
                        {/** <i class="fa fa-eye" id="pass_eye"></i>*/}
                        {/**<button type="button"><i className="fa fa-eye"></i></button> */}
                      </Col>
                      <Col md={2} sm={12} xs={12} className="form-group">
                        <label className="product-label">Confirm Password</label><i className="text-danger">*</i>
                        <input type="text" className="form-control" name="confirm_pass" id="confirm_pass" placeholder="******" onKeyUp={(event) => { this.setData(event) }} required />
                        {/**<i class="fa fa-eye" id="confirm_eye"></i> */}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={1} sm={6} xs={6} className="form-group">
                        <input type="button" value="Submit" className="btn btn-bt1" onClick={this.changePassword.bind(this)} />
                      </Col>
                      <Col md={1} sm={6} xs={6} className="form-group">
                        <input type="reset" value="Reset" className="btn btn-bt2" />
                      </Col>
                    </Row>
                  </Container>
                </form>
              </CardBody>
            </Card>
          </section>
        </div>
      </div>
    )
  }
}

export default EditFSE;
