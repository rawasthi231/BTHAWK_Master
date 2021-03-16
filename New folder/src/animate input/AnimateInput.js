import React, {Component} from 'react';
import $ from 'jquery';
import './animate-input.css';

class Animateinput extends Component {

        state ={
            class: ''
        }

        labelClick(evt){
            evt.target.nextSibling.focus();
        }

        onFocus(evt){
            $(evt.target).parent().find('label').addClass('active');
        }
           
        onFocusOut(evt) {
            if (!evt.target.value) {
                $(evt.target).parent().find('label').removeClass('active');
            }
        }

        render(){
            const customStyle = this.props.customStyle;

            return(
                <div className="animateDiv">
                    <label onClick={(event) => this.labelClick(event)} htmlFor={this.props.label}>{this.props.label}</label>
                    <input {...this.props.attr} onFocus={(event) => this.onFocus(event)} onBlur={(event) => this.onFocusOut(event)} className=" animateLabel" style={customStyle} />
                </div>
            )
        }
   
}

export default Animateinput;
