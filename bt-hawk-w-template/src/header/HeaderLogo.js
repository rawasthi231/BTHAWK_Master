import React from 'react';

const HeaderLogo = () => {

    return (
        <div className="page-logo" style={{background: "white"}}>
            <a href="index.html">
                <img src="./assets/layouts/layout/img/BTHAWK logo-02 (1).png" alt="logo" className="logo-default" /> 
            </a>
            <div className="menu-toggler sidebar-toggler" >
                <span></span>
            </div>
        </div>
    )
}

export default HeaderLogo;