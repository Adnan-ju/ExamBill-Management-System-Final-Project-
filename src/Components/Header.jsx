import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/header.css'

const Header = () => {
    return (
        <div>
            <nav class="navbar navbar-dark ">
            <div class="container-fluid">
                <p className='topic'>Exam Bill Management System</p>
            <form class="d-flex">
             <Link to ='/teachers'><button class="btn btn-outline-success p-3 " type="submit">Faculty Members</button></Link> 
             </form>
          </div>
            </nav>
        </div>
    );
};

export default Header;