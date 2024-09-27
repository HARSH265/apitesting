import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { searchUser } from '../features/UserDetailsSlice';

const Navbar = () => {
  const [searchData,setSearchData]=useState()
  const allUsers = useSelector((state) => state.app.users); 
  const dispatch=useDispatch()

  useEffect(() => {
    dispatch(searchUser(searchData));  
  }, [searchData, dispatch]);


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Create Post
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/read' className='nav-link'>
                  All Post
                   ({allUsers?.length || 0})
                </Link>
              </li>
            </ul>
          </div>
          <input
            className="form-control me-2 w-50"
            type="search"
            placeholder="Search"
            area-lable='search'
            onChange={(e)=>setSearchData(e.target.value)}
          />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
