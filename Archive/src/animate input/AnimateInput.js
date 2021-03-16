import React, {Component} from 'react';
import $ from 'jquery';
import './animate-input.css';

class Animateinput extends Component {

        state ={
            attr: this.props.attr
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

            // var res = [];
            // for (const [key,value] of Object.entries(this.state.attr)) {
            //     var firstTwo = key.split('').slice(0,2).join('');

            //     var prop = (firstTwo == 'on') ? key+'={(event)=>'+value+'}' : key+'="'+value+'"';    
            //     res.push(prop); 
            // }
           
            // console.log(...res);

            return(
                <div className="animateDiv">
                    <label htmlFor={this.props.label}>{this.props.label}</label>
                    <input onKeyUp={(event)=>this.props.functions(event)} type={this.props.type} onFocus={(event) => this.onFocus(event)} onBlur={(event) => this.onFocusOut(event)} className=" animateLabel" style={customStyle} />
                </div>
            )
        }
   
}

export default Animateinput;
