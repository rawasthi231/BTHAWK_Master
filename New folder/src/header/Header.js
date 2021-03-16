import React from 'react';
import './header.css';
import Notification from './functionality/Notification';
import Message from './functionality/Message';
import Tasks from './functionality/Tasks';
import Profile from './functionality/Profile';
import HeaderLogo from './HeaderLogo';

const Header = () => {
    return (
        <div className="page-header navbar navbar-fixed-top">

            <div className="page-header-inner ">

                <HeaderLogo />

                <a href="javascript:;" className="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
                    <span></span>
                </a>

                <div className="top-menu">
                    <ul className="nav navbar-nav pull-right">

                        
                        <Notification />
                        
                        <Message />
                        
                        <Tasks />
                        
                        <Profile />

                        <li className="dropdown dropdown-quick-sidebar-toggler">
                            <a href="javascript:;" className="dropdown-toggle">
                                <i className="icon-logout"></i>
                            </a>
                        </li>

                    </ul>
                </div>

            </div>

        </div>
    )
}

export default Header;