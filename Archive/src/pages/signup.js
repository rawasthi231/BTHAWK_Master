import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';
class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            mobile: '',
            pass: '',
        }
    }

    getInputVal = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    submitForm = e => {
        e.preventDefault();
        const { name, email, mobile, pass } = this.state;
        var userData = {
            name,
            email,
            mobile,
            pass,
        }

        /*
        axios
        .post("http://localhost:5000/signup", userData)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => console.log(error));

                // alert(this.state.form_data.name);
        */
        $.ajax({
            url: "http://localhost:5000/signup",
            method: "POST",
            data: userData,
            contentType:"application/x-www-form-urlencoded",
            success: function(result) {
                console.log(result);
            },
            error:function(error){
                console.log(error);
            } 
        });
    }

    componentDidMount(){
        var row = localStorage.getItem("res");
        row = JSON.parse(row);
        //console.log(Object.keys(row));
        console.log(row.status);
        // var result = Object.keys(row).map((key) => [Number(key), row[key]]);
        // console.log(result);
        
        //localStorage.removeItem("res");
    }

    // getData(){
    //     this.state.map((pos,rest)=>{
    //         return pos+" - "+rest;
    //     });
    // }


    render() {
        return (
            <div className="page-content-wrapper">
                <div className="page-content">
                    <div className="page-bar">
                        <ul className="page-breadcrumb">
                            <li>
                                <a href="index.html">Home</a>
                                <i className="fa fa-circle"></i>
                            </li>
                            <li>
                                <span>Dashboard</span>
                            </li>
                        </ul>
                        <div className="page-toolbar">
                            <div id="dashboard-report-range" className="pull-right tooltips btn btn-sm" data-container="body" data-placement="bottom" data-original-title="Change dashboard date range">
                                <i className="icon-calendar"></i>&nbsp;
                                <span className="thin uppercase hidden-xs"></span>&nbsp;
                                <i className="fa fa-angle-down"></i>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <section>
                        <div className="card">
                            <div className="card-head">
                                <h2>Hello,Please Fill Form</h2>
                            </div>
                            <div className="card-body">
                                <form id="formm" onSubmit={this.submitForm}>
                                    <div className="form-group">
                                        <input type="text" placeholder="Full Name" name="name" onChange={this.getInputVal} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Email Address" name="email" onChange={this.getInputVal} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <input type="text" placeholder="Mobile No." name="mobile" onChange={this.getInputVal} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" placeholder="Password" name="pass" onChange={this.getInputVal} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <input id="submit" type="submit" value="Submit" className="form-control" name="submitForm" />
                                    </div>
                                </form>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        )
    }
}

export default Signup;