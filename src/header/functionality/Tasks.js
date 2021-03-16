import React from 'react';

const Tasks = () => {

    return (
        <li className="dropdown dropdown-extended dropdown-tasks" id="header_task_bar">
            <a href="javascript:;" className="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
                <i className="icon-calendar"></i>
                <span className="badge badge-default"> 3 </span>
            </a>
            <ul className="dropdown-menu extended tasks">
                <li className="external">
                    <h3>You have
                                            <span className="bold">12 pending</span> tasks</h3>
                    <a href="app_todo.html">view all</a>
                </li>
                <li>
                    <ul className="dropdown-menu-list scroller" style={{ height: "275px" }} data-handle-color="#637283">
                        <li>
                            <a href="javascript:;">
                                <span className="task">
                                    <span className="desc">New release v1.2 </span>
                                    <span className="percent">30%</span>
                                </span>
                                <span className="progress">
                                    <span style={{ width: "40%" }} className="progress-bar progress-bar-success" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
                                        <span className="sr-only">40% Complete</span>
                                    </span>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <span className="task">
                                    <span className="desc">Application deployment</span>
                                    <span className="percent">65%</span>
                                </span>
                                <span className="progress">
                                    <span style={{ width: "65%" }} className="progress-bar progress-bar-danger" aria-valuenow="65" aria-valuemin="0" aria-valuemax="100">
                                        <span className="sr-only">65% Complete</span>
                                    </span>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <span className="task">
                                    <span className="desc">Mobile app release</span>
                                    <span className="percent">98%</span>
                                </span>
                                <span className="progress">
                                    <span style={{ width: "98%" }} className="progress-bar progress-bar-success" aria-valuenow="98" aria-valuemin="0" aria-valuemax="100">
                                        <span className="sr-only">98% Complete</span>
                                    </span>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <span className="task">
                                    <span className="desc">Database migration</span>
                                    <span className="percent">10%</span>
                                </span>
                                <span className="progress">
                                    <span style={{ width: "10%" }} className="progress-bar progress-bar-warning" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
                                        <span className="sr-only">10% Complete</span>
                                    </span>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <span className="task">
                                    <span className="desc">Web server upgrade</span>
                                    <span className="percent">58%</span>
                                </span>
                                <span className="progress">
                                    <span style={{ width: "58%" }} className="progress-bar progress-bar-info" aria-valuenow="58" aria-valuemin="0" aria-valuemax="100">
                                        <span className="sr-only">58% Complete</span>
                                    </span>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <span className="task">
                                    <span className="desc">Mobile development</span>
                                    <span className="percent">85%</span>
                                </span>
                                <span className="progress">
                                    <span style={{ width: "85%" }} className="progress-bar progress-bar-success" aria-valuenow="85" aria-valuemin="0" aria-valuemax="100">
                                        <span className="sr-only">85% Complete</span>
                                    </span>
                                </span>
                            </a>
                        </li>
                        <li>
                            <a href="javascript:;">
                                <span className="task">
                                    <span className="desc">New UI release</span>
                                    <span className="percent">38%</span>
                                </span>
                                <span className="progress progress-striped">
                                    <span style={{ width: "38%" }} className="progress-bar progress-bar-important" aria-valuenow="18" aria-valuemin="0" aria-valuemax="100">
                                        <span className="sr-only">38% Complete</span>
                                    </span>
                                </span>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </li>
    )
}

export default Tasks;