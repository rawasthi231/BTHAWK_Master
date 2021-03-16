import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {

    return (
        
        
        <li className="dropdown dropdown-user" style={{padding: '0'}}>
            <Link to='/profile' style={{textDecoration:'none', display: 'inline-block', padding: '10px'}}>
                    <img alt="" className="img-circle" src="./assets/layouts/layout/img/avatar3_small.jpg" />
                    <span className="username username-hide-on-mobile">&nbsp; Profile </span>
            </Link>    
        </li> 
        
    )
}

export default Profile;