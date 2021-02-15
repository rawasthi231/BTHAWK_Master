import React from 'react';
import './footer.css';

const Footer = () => {
    return(
        <div className="page-footer" >
            <div className="page-footer-inner"> 2016 &copy; Metronic Theme By
                <a target="_blank" href="http://keenthemes.com">Keenthemes</a> &nbsp;|&nbsp;
                <a href="http://themeforest.net/item/metronic-responsive-admin-dashboard-template/4021469?ref=keenthemes" title="Purchase Metronic just for 27$ and get lifetime updates for free" target="_blank">Purchase Metronic!</a>
            </div>
            <div className="scroll-to-top">
                <i className="icon-arrow-up"></i>
            </div>
        </div>
    )
}

export default Footer;