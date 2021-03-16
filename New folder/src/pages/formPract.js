import React, { Component } from 'react';
import $ from 'jquery';
import Animateinput from '../animate input/AnimateInput';
import { Link } from 'react-router-dom';


export default class Form extends Component{

    constructor(props){
        super(props);
        this.state={
            fname: '',
            lname: '',
            age: '',
            dob: '',
            fatherName: ''
        }
    }
    

    getInput = (evt) =>{
        
        this.setState({[evt.target.name]: evt.target.value});
    }

    saveData = e =>{
        $.ajax({
            url: 'http://localhost:5000/create',
            method: 'post', 
            data: this.state,
            contentType: 'application/x-www-form-urlencoded',
            success: function(res){
                console.log(res);
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
                                <span>&nbsp;Sub-Category</span>
                            </li>
                        </ul>
                    </div><hr />

                    <section>
                        <div className="form-group">
                            <Animateinput label="first name" attr={{type: 'text',name:'fname',onChange:(event)=>this.getInput(event)}} customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px',width:'50%'}} /> 
                        </div>
                        <div className="form-group">
                            <Animateinput label="Last name" attr={{type: 'text',name:'lname',onChange:(event)=>this.getInput(event)}} customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px',width:'50%'}} />
                        </div>
                        <div className="form-group">
                            <Animateinput label="Age" attr={{type: 'number',name:'age',onChange:(event)=>this.getInput(event)}} customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px',width:'50%'}} />
                        </div>
                        <div className="form-group">
                            <Animateinput label="dob" attr={{type: 'date',name:'dob',onChange:(event)=>this.getInput(event)}} customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px',width:'50%'}} />
                        </div>
                        <div className="form-group">
                            <Animateinput label="Father's Name" attr={{type: 'text',name:'fatherName',onChange:(event)=>this.getInput(event)}} customStyle={{fontSize:'14px',padding:'10px 0px 2px 10px',width:'50%'}} />
                        </div>
                            
                        <button onClick={this.saveData} className="btn btn-primary">Submit</button> 
                            
                    </section>
                    
                </div>
            </div>
        )
    }
}