import React from 'react';
import './sidebar.css';

const Sidebar = () => {
    return (
        <div className="page-sidebar-wrapper" style={{position: "fixed", overflowY: "scroll", height: "700px", zIndex: "1000"}}>
            <div className="page-sidebar navbar-collapse collapse">
                <ul className="page-sidebar-menu  page-header-fixed page-sidebar-menu-light " data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200" style={{paddingTop: "20px"}}>

                    <li className="sidebar-toggler-wrapper hide">
                        <div className="sidebar-toggler">
                            <span></span>
                        </div>
                    </li>

                    <li className="nav-item start active open">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-home"></i>
                            <span className="title">Dashboard</span>
                            <span className="selected"></span>
                            <span className="arrow open"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item start ">
                                <a href="#" className="nav-link ">
                                    <i className="icon-bar-chart"></i>
                                    <span className="title">Dashboard 1</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="heading">
                        <h3 className="uppercase"><b>Features</b></h3>
                    </li>
                    <li className="nav-item ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-diamond"></i>
                            <span className="title">UI Features</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Metronic Grid System</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Modals</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-puzzle"></i>
                            <span className="title">Components</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Date & Time Pickers</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Color Pickers</span>
                                    <span className="badge badge-danger">2</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Select2 Dropdowns</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Bootstrap Select</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Bootstrap Multiple Select</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Bootstrap Multiselect Dropdowns</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Select Splitter</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Clipboard</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Typeahead Autocomplete</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Bootstrap Tagsinput</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Bootstrap Switch</span>
                                    <span className="badge badge-success">6</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Bootstrap Maxlength</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Bootstrap File Input</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Bootstrap Touchspin</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Form Widgets & Tools</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Context Menu</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Markdown & WYSIWYG Editors</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Code Editors</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Ion Range Sliders</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">NoUI Range Sliders</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Knob Circle Dials</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-settings"></i>
                            <span className="title">Form Stuff</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Bootstrap Form
                                                <br />Controls</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="#" className="nav-link ">
                                    <span className="title">Material Design
                                                <br />Form Controls</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-bulb"></i>
                            <span className="title">Elements</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="elements_steps.html" className="nav-link ">
                                    <span className="title">Steps</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-briefcase"></i>
                            <span className="title">Tables</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="table_static_basic.html" className="nav-link ">
                                    <span className="title">Basic Tables</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="table_bootstrap.html" className="nav-link ">
                                    <span className="title">Bootstrap Tables</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="javascript:;" className="nav-link nav-toggle">
                                    <span className="title">Datatables</span>
                                    <span className="arrow"></span>
                                </a>
                                <ul className="sub-menu">
                                    <li className="nav-item ">
                                        <a href="table_datatables_managed.html" className="nav-link "> Managed Datatables </a>
                                    </li>
                                    <li className="nav-item ">
                                        <a href="table_datatables_buttons.html" className="nav-link "> Buttons Extension </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item  ">
                        <a href="?p=" className="nav-link nav-toggle">
                            <i className="icon-wallet"></i>
                            <span className="title">Portlets</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="portlet_boxed.html" className="nav-link ">
                                    <span className="title">Boxed Portlets</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-bar-chart"></i>
                            <span className="title">Charts</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="charts_amcharts.html" className="nav-link ">
                                    <span className="title">amChart</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="javascript:;" className="nav-link nav-toggle">
                                    <span className="title">HighCharts</span>
                                    <span className="arrow"></span>
                                </a>
                                <ul className="sub-menu">
                                    <li className="nav-item ">
                                        <a href="charts_highcharts.html" className="nav-link "> HighCharts </a>
                                    </li>
                                    <li className="nav-item ">
                                        <a href="charts_highstock.html" className="nav-link "> HighStock </a>
                                    </li>
                                    <li className="nav-item ">
                                        <a href="charts_highmaps.html" className="nav-link "> HighMaps </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-pointer"></i>
                            <span className="title">Maps</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="maps_google.html" className="nav-link ">
                                    <span className="title">Google Maps</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="maps_vector.html" className="nav-link ">
                                    <span className="title">Vector Maps</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="heading">
                        <h3 className="uppercase">Layouts</h3>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-layers"></i>
                            <span className="title">Page Layouts</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="layout_blank_page.html" className="nav-link ">
                                    <span className="title">Blank Page</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-feed"></i>
                            <span className="title">Sidebar Layouts</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="layout_sidebar_menu_light.html" className="nav-link ">
                                    <span className="title">Light Sidebar Menu</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-paper-plane"></i>
                            <span className="title">Horizontal Menu</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="layout_mega_menu_light.html" className="nav-link ">
                                    <span className="title">Light Mega Menu</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="layout_mega_menu_dark.html" className="nav-link ">
                                    <span className="title">Dark Mega Menu</span>
                                </a>
                            </li>
                            <li className="nav-item  ">
                                <a href="layout_full_width.html" className="nav-link ">
                                    <span className="title">Full Width Layout</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className=" icon-wrench"></i>
                            <span className="title">Custom Layouts</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="layout_disabled_menu.html" className="nav-link ">
                                    <span className="title">Disabled Menu Links</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="heading">
                        <h3 className="uppercase">Pages</h3>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-basket"></i>
                            <span className="title">eCommerce</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="ecommerce_index.html" className="nav-link ">
                                    <i className="icon-home"></i>
                                    <span className="title">Dashboard</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-docs"></i>
                            <span className="title">Apps</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="app_todo.html" className="nav-link ">
                                    <i className="icon-clock"></i>
                                    <span className="title">Todo 1</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-user"></i>
                            <span className="title">User</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="page_user_profile_1.html" className="nav-link ">
                                    <i className="icon-user"></i>
                                    <span className="title">Profile 1</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-social-dribbble"></i>
                            <span className="title">General</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="page_general_about.html" className="nav-link ">
                                    <i className="icon-info"></i>
                                    <span className="title">About</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item  ">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-settings"></i>
                            <span className="title">System</span>
                            <span className="arrow"></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item  ">
                                <a href="page_cookie_consent_1.html" className="nav-link ">
                                    <span className="title">Cookie Consent 1</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <a href="javascript:;" className="nav-link nav-toggle">
                            <i className="icon-folder"></i>
                            <span className="title">Multi Level Menu</span>
                            <span className="arrow "></span>
                        </a>
                        <ul className="sub-menu">
                            <li className="nav-item">
                                <a href="#" className="nav-link">
                                    <i className="icon-bar-chart"></i> Item 3 </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Sidebar