import React, {PureComponent} from 'react';
import jsPDF from 'jspdf';

export default class categoryPDF extends PureComponent {
  constructor(props){
    super(props);
    this.state = {};
  }

  pdfGenerator(){
    var doc = new jsPDF('p', 'pt');
    doc.text(20,20, 'Default text');
    doc.setFont('courier');
    //doc.setFontType('normal');
    doc.text(20,30,'This is text with courier text');
    doc.save('categories.pdf');
  }

  render(){
    return (
      <div>
        <button onClick={this.pdfGenerator}>Generate</button>
      </div>
    )
  }
}

