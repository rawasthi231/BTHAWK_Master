import React, { Component } from 'react';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader } from 'reactstrap';
import $ from 'jquery';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      requestFrom : 'Web'
    };
  }

  setInput = e => {
    this.setState({
      [e.target.name] : e.target.value
    });
  }

  submitForm = e => {
    // console.log(this.state);
    $.ajax({
      url:'http://localhost:5000/login',
      method:'POST',
      contentType:'application/x-www-form-urlencoded',
      data:this.state,
      beforeSend:function(){
        $('#btnLogin').text('Loading');
      },
      success:function(res){
        if(res.status=='200'){
          $('#btnLogin').text('Done');
          console.log(res);
          //localStorage.setItem("distributor_id", res.data.session.distributor_id);
        } else {
          $('#btnLogin').text('Failed');
        }
        
      }
    });
  };


  render() {
    return (
      <div className="page-content-wrapper">
        <div className="page-content">
          <div className="page-bar" style={{ padding: "10px 30px 10px 30px" }}></div>
          <Container>
            <Row>
            <Col md={12}>
              <h3>Login to your account</h3> 
            </Col>
            </Row>
            <Row>
              <Col md={5}>
              <input type="text" className="form-control" placeholder="Username" style={{ margin: "5px"}} onKeyUp={this.setInput} name="userName"/>
              <input type="password" className="form-control" placeholder="Password" style={{ margin: "5px"}}  onKeyUp={this.setInput} name="password"/>
              <button type="button" className="btn btn-success" style={{ margin: "5px"}} onClick={this.submitForm} id="btnLogin">Login</button>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    )
  }
}

export default Login;