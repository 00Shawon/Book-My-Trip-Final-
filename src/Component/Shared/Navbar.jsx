import React from "react";

import { Link, NavLink } from "react-router";
import Logo from "./Logo";
// import useAuth from "../../Hooks/useAuth";


const Navbar = () => {
//   const {user,logOut} = useAuth();
  
// const handleLogOut = () => {
//   logOut()
//   .then()
//   .catch(err => console.log(err.code))
// }


const links = (
  <>
      <li>
        <NavLink>Item 3</NavLink>
      </li>
      <li>
        <NavLink to='/coverage'>Coverage</NavLink>
      </li>
      <li>
        <NavLink to='/send-parcel'>Send Parcel</NavLink>
      </li>
     
      {/* {
        user && <>
          <li>
        <NavLink to='/dashboard/my-parcels'>My Parcels</NavLink>
      </li>
        </>
      } */}
    </>
  );
  return (
    <div className="bg-base-100 mb-2 shadow-sm">
<div className="navbar w-11/12 mx-auto">
       <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex="-1"
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>
        <Logo></Logo>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>
      <div className="navbar-end">
     
       {/* {
        user?  <a onClick={handleLogOut} className="btn">Logout</a>: <Link to='/login' className="btn">Login</Link>
       } */}
       <Link to='/rider' className="btn bg-secondary mx-2">Be a Vendor</Link>  
        <Link to='/login' className="btn bg-primary">Login</Link>
        <Link to='/register' className="btn btn-outline ml-2
        text-primary">Register</Link>
      </div>
</div>
   

    </div>
  );
};

export default Navbar;
