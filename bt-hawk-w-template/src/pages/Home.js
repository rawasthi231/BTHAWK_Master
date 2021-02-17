import React, { Component} from 'react';
//const [isAuthenticated, userHasAuthenticated] = useState(false);
import $ from 'jquery'; 
import axios from 'axios';
//import ReactSession from 'react-client-session';

class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            uName: null,
            uPass: null,
            request : 'Web'
        }
    }
    
    getInputVal = e => {
        this.setState({[e.target.name] : e.target.value});
    } 
    
    submitForm = e => {
        e.preventDefault();
        const {uName, uPass, request} = this.state;
        var userData = {uName, uPass, request};
        $.ajax({
            url: 'http://localhost:5000/login',
            method: "POST",
            data: userData,
            contentType:"application/x-www-form-urlencoded",
            beforeSend : function(){
                $('#submit').val('Loading..');
            },
            success:function(res){
                $('#submit').val('Submit');
                var res = JSON.stringify(res);
                localStorage.setItem("res", res);
            },
            error:function(error){
                console.log(error);
            }
        })
    } 

    render(){
        // ReactSession.setStoreType("localStorage");
        // ReactSession.set("email", "test@email.com"); 
        return(
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
                    </div><hr />
                    <section>
                        <div className="card">
                            <div className="card-head">
                                <h2>Hello,Please Fill Form</h2>
                            </div>
                            <div className="card-body">
                                <form id="formm" onSubmit={this.submitForm}>
                                    <div className="form-group">
                                        <input type="text" placeholder="User Name" name="uName" onChange={this.getInputVal} className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" placeholder="Password" name="uPass" onChange={this.getInputVal}  className="form-control" />
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

export default Home;