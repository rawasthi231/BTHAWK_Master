import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
    return (
        <div className="page-sidebar-wrapper">
            <div className="page-sidebar navbar-collapse collapse">
                <ul className="page-sidebar-menu  page-header-fixed page-sidebar-menu-light " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">

                    <li className="sidebar-toggler-wrapper hide">
                        <div className="sidebar-toggler">
                            <span></span>
                        </div>
                    </li>

                    <li className="nav-item master">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-home"></i>
                            <span className="title">Dashboard</span>
                            <span className="selected"></span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item start ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-cubes"></i>
                                    <span className="title">Distributor Stock</span>
                                </a>
                            </li>
                            <li className="nav-item start ">
                                <a href="#" className="nav-link ">
                                    <i className="icon-user"></i>
                                    <span className="title">FOS Sale Detail</span>
                                </a>
                            </li>
                            <li className="nav-item start ">
                                <a href="#" className="nav-link ">
                                    <i className="icon-user"></i>
                                    <span className="title">FOS Stock Detail</span>
                                </a>
                            </li>
                            <li className="nav-item start ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-exclamation-triangle"></i>
                                    <span className="title">Low Stock Details</span>
                                </a>
                            </li>
                            <li className="nav-item start ">
                                <a href="#" className="nav-link ">
                                    <i className="icon-graph"></i>
                                    <span className="title">Purchase Sale Target</span>
                                </a>
                            </li>
                            <li className="nav-item start ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-bar-chart"></i>
                                    <span className="title">FTD</span>
                                </a>
                            </li>
                            <li className="nav-item start ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-bar-chart"></i>
                                    <span className="title">MTD</span>
                                </a>
                            </li>
                            <li className="nav-item start ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-bar-chart"></i>
                                    <span className="title">YTD</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item master">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-user"></i>
                            <span className="title">Sales Executive</span>
                        </a>
                    </li>

                    <li className="nav-item  master">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="fa fa-user"></i>
                            <span className="title">Retailer</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="icon-user"></i>
                                    <span className="title">List</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-bars"></i>
                                    <span className="title">Beat List</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-arrows"></i>
                                    <span className="title">Add Beat</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-tag fa-lg"></i>
                                    <span className="title">Add Discount</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-user-plus"></i>
                                    <span className="title">Add New</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-plus"></i>
                                    <span className="title">Add Bulk</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-question"></i>
                                    <span className="title">Pending Creation</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-exchange"></i>
                                    <span className="title">FSE Bulk Retailer Movement</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-sticky-note-o"></i>
                                    <span className="title">Credit Note Detail</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="nav-item  master">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="fa fa-shopping-cart"></i>
                            <span className="title">Purchase</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="icon-user"></i>
                                    <span className="title">List</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-hand-o-right"></i>
                                    <span className="title">Generate Debit Note</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-hand-o-right"></i>
                                    <span className="title">Credit List</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-plus"></i>
                                    <span className="title">Add Party</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-shopping-cart"></i>
                                    <span className="title">Add Stock</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-hand-o-right"></i>
                                    <span className="title">Primary Order Placement</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <i className="fa fa-plus"></i>
                                    <span className="title">Add Payout</span>
                                </a>
                            </li>

                        </ul>
                    </li>
                    <li className="nav-item master ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-wallet"></i>
                            <span className="title">Product</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="elements_steps.html" className="nav-link ">
                                    <i className="icon-wallet"></i>
                                    <span className="title">List</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <Link to="/product-catagory" className="nav-link " style={{textDecoration: 'none'}}>
                                    <i className="fa fa-hand-o-right"></i>
                                    <span className="title">Catagory</span>
                                </Link>
                            </li>
                            <li className="nav-item  ">
                                <a href="elements_steps.html" className="nav-link ">
                                    <i className="fa fa-hand-o-right"></i>
                                    <span className="title">Sub-Catagory</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="elements_steps.html" className="nav-link ">
                                    <i className="fa fa-hand-o-right"></i>
                                    <span className="title">Pkt/Bag Configuration</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="elements_steps.html" className="nav-link ">
                                    <i className="fa fa-plus"></i>
                                    <span className="title">Add New</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="elements_steps.html" className="nav-link ">
                                    <i className="fa fa-plus"></i>
                                    <span className="title">Add Payout</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="elements_steps.html" className="nav-link ">
                                    <i className="fa fa-plus"></i>
                                    <span className="title">Waste/Damage Stock</span>
                                </a>
                            </li>
                        </ul>
                    </li>

                    <li className="heading">
                        <h3 className="uppercase">ACCOUNT MASTER</h3>
                    </li>

                    <li className="nav-item master ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-diamond"></i>
                            <span className="title">ITR Master</span>
                        </a>
                    </li>

                    <li className="heading">
                        <h3 className="uppercase">STOCK REQUEST</h3>
                    </li>

                    <li className="nav-item master ">
                        <a href="?p=" className="nav-link nav-toggle">
                            <i className="icon-diamond"></i>
                            <span className="title">Pending Request</span>
                        </a>
                    </li>

                    <li className="nav-item master ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-puzzle"></i>
                            <span className="title">Stock Transferred</span>
                        </a>
                    </li>

                    <li className="nav-item master ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="fa fa-times-circle-o"></i>
                            <span className="title">Cancelled Request</span>
                        </a>
                    </li>

                    <li className="nav-item master ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="fa fa-external-link"></i>
                            <span className="title">FSE Stock Transferred</span>
                        </a>
                    </li>

                    <li className="heading">
                        <h3 className="uppercase">SALE</h3>
                    </li>

                    <li className="nav-item master ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-layers"></i>
                            <span className="title">Generate Invoice</span>
                        </a>
                    </li>

                    <li className="nav-item master ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-layers"></i>
                            <span className="title">Generate Receipt</span>
                        </a>
                    </li>

                    <li className="nav-item master ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-layers"></i>
                            <span className="title">Invoice</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="layout_disabled_menu.html" className="nav-link ">
                                    <i className="icon-layers"></i>
                                    <span className="title">Bill Book</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="layout_disabled_menu.html" className="nav-link ">
                                    <i className="icon-layers"></i>
                                    <span className="title">Generate E-Way</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="layout_disabled_menu.html" className="nav-link ">
                                    <i className="icon-layers"></i>
                                    <span className="title">Challan Book</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="layout_disabled_menu.html" className="nav-link ">
                                    <i className="fa fa-hand-o-right"></i>
                                    <span className="title">Monthly Bill Book</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="layout_disabled_menu.html" className="nav-link ">
                                    <i className="fa fa-hand-o-right"></i>
                                    <span className="title">Retailer Layout</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="layout_disabled_menu.html" className="nav-link ">
                                    <i className="fa fa-hand-o-right"></i>
                                    <span className="title">Payout Invoice</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="layout_disabled_menu.html" className="nav-link ">
                                    <i className="fa fa-hand-o-right"></i>
                                    <span className="title">Sales Return</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    
                    <li className="nav-item master ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-star"></i>
                            <span className="title">Receipt Book</span>
                        </a>
                    </li>
                    
                    <li className="heading">
                        <h3 className="uppercase">PRODUCTION ASSEMBLING</h3>
                    </li>

                    <li className="nav-item master ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-link"></i>
                            <span className="title">Assembly Line List</span>
                        </a>
                    </li>

                    <li className="nav-item master ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-share-alt"></i>
                            <span className="title">Material Issue Request</span>
                        </a>
                    </li>

                    <li className="nav-item master ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="fa fa-reply-all"></i>
                            <span className="title">Material Received Request</span>
                        </a>
                    </li>

                    <li className="heading">
                        <h3 className="uppercase">REPORTS</h3>
                    </li>

                    <li className="nav-item master ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-screen-tablet"></i>
                            <span className="title">Reports</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar