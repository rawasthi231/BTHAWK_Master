import React, { Component } from 'react';
import $ from 'jquery';
import './css/index.css';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }

  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <div className="login100-pic js-tilt" data-tilt>
              <img src="images/img-02.png" alt="IMG" />
            </div>

            <form className="login100-form validate-form"> 
              <span className="login100-form-title">
                <img src="images/logo.png" alt="IMG" />
              </span>

              <div className="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">
                <input className="input100" type="text" name="email" placeholder="Email" />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
					    </div>
              <div className="wrap-input100 validate-input" data-validate="Password is required">
                <input className="input100" type="password" name="pass" placeholder="Password" />
                  <span className="focus-input100"></span>
                  <span className="symbol-input100">
                    <i className="fa fa-lock" aria-hidden="true"></i>
                  </span>
					    </div>
              <div className="container-login100-form-btn">
                <button className="login100-form-btn">
                  Login
						    </button>
              </div>
              <div className="text-center p-t-12">
                <a className="txt2" href="#">
                  Sign Up
						    </a>
						    &nbsp; &nbsp;
						    <span className="txt1">
                  Forgot
						    </span>
                <a className="txt2" href="#">
                  Password?
						    </a>
              </div>
              <div className="text-center p-t-136">
                Copyright &copy; Bell Technology 2017
					    </div>
            </form>
          </div>
        </div>
	    </div>
    )
  }
}