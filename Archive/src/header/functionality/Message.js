import React from 'react';

const Message = () => {

    return (
        <li className="dropdown dropdown-extended dropdown-inbox" id="header_inbox_bar">
            <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                <i className="icon-envelope-open"></i>
                <span className="badge badge-default"> 4 </span>
            </a>
            <ul className="dropdown-menu">
                <li className="external">
                    <h3>You have
                                            <span className="bold">7 New</span> Messages</h3>
                    <a href="app_inbox.html">view all</a>
                </li>
                <li>
                    <ul className="dropdown-menu-list scroller" style={{ height: "275px" }} data-handle-color="#637283">
                        <li>
                            <a href="#">
                                <span className="photo">
                                    <img src="./assets/layouts/layout3/img/avatar2.jpg" className="img-circle" alt="" /> </span>
                                <span className="subject">
                                    <span className="from"> Lisa Wong </span>
                                    <span className="time">Just Now </span>
                                </span>
                                <span className="message"> Vivamus sed auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="photo">
                                    <img src="./assets/layouts/layout3/img/avatar3.jpg" className="img-circle" alt="" /> </span>
                                <span className="subject">
                                    <span className="from"> Richard Doe </span>
                                    <span className="time">16 mins </span>
                                </span>
                                <span className="message"> Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="photo"><img src="./assets/layouts/layout3/img/avatar1.jpg" className="img-circle" alt="" /></span>
                                <span className="subject">
                                    <span className="from"> Bob Nilson </span>
                                    <span className="time">2 hrs </span>
                                </span>
                                <span className="message"> Vivamus sed nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="photo">
                                    <img src="./assets/layouts/layout3/img/avatar2.jpg" className="img-circle" alt="" /> </span>
                                <span className="subject">
                                    <span className="from"> Lisa Wong </span>
                                    <span className="time">40 mins </span>
                                </span>
                                <span className="message"> Vivamus sed auctor 40% nibh congue nibh... </span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span className="photo">
                                    <img src="./assets/layouts/layout3/img/avatar3.jpg" className="img-circle" alt="" /> </span>
                                <span className="subject">
                                    <span className="from"> Richard Doe </span>
                                    <span className="time">46 mins </span>
                                </span>
                                <span className="message"> Vivamus sed congue nibh auctor nibh congue nibh. auctor nibh auctor nibh... </span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    )
}

export default Message;