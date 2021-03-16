import React from 'react';
import { Link } from 'react-router-dom';

const HeaderLogo = () => {

    return (
        <div className="page-logo">
            <Link to="/">
                <img src="./assets/layouts/layout/img/BTHAWK logo-02 (1).png" alt="logo" className="logo-default" /> 
            </Link>
            <div className="menu-toggler sidebar-toggler" >
                <span></span>
            </div>
        </div>
    )
}

export default HeaderLogo;