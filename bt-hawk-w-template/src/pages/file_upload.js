import React, { Component } from 'react';
import { renderToString } from 'react-dom/server'
import './css/product_catagory.css';
import $ from 'jquery';
import { Container, Row, Col, Card, CardTitle, CardBody, CardHeader, Table, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import Animateinput from '../animate input/AnimateInput';
const SERVER = 'http://localhost:5000';

export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: null
    }
    this.inputChange = this.inputChange.bind(this);
    this.submitFile = this.submitFile.bind(this);
  }

  inputChange(e){
    this.setState({file:e.target.files[0]});
    //console.log(e.target.files[0]);
  }

  submitFile(e){
    e.preventDefault();
    const fromData = new FormData();
    fromData.append('upload', this.state.file);
    $.ajax({
      url : `${SERVER}/uploads`,
      method : "POST",
      contentType : "multipart/form-data",
      data : fromData,
      success : function(result){
        console.log(result);
      }
    });
  }

  render() {
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
                <span>&nbsp;File Upload</span>
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
                      <b>File Upload</b>
                    </h4>
                  </Col>
                </Row>
              </Container>
            </Card>
          </section>
          
          <section>
            <Card className="my-card" style={{ marginBottom: '10px' }}>
              <Container fluid>
                <Row style={{ padding: '10px' }}>
                  <Col md={12} lg={12} xl={12} xs={12} sm={12}>
                      <form onSubmit={(event) => this.submitFile(event)}>
                        <input type="file" name="upload" className="form-control-file" onChange={(event) => this.inputChange(event)} /> <br />
                        <input type="submit" name="submit" className="btn btn-primary" />                      
                      </form>
                  </Col>
                </Row>
              </Container>
            </Card>
          </section>
        </div>
      </div>
    )
  }
}