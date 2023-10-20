import React from 'react'
import AdminIcon from "../../../assets/Images/admin-icon.svg"
import "./adminlogin.css"
import Image from 'next/image'
import SearchIcon from "../../../assets/Images/login/magnifer-search.svg"
import ChanakyaLogo from "../../../assets/Images/login/chanakya-logo.svg"

export const AdminLogin = () => {

    return (
        <div>
           <div className="grid grid-cols-2 gap-4">
                <div className="searchBox">
                  
                    <div className="searchIconBox">        
                    <Image src={SearchIcon} alt="icon"/>
                    </div> 
                    <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" />
   
   <button id="searchQuerySubmit" type="submit" >
     
   </button> 

                </div> 

                {/* <div classNameName="wrapper">
  <div classNameName="searchBar">
  <div classNameName="searchIconBox">  
  <Image src={SearchIcon} alt="icon"/>
  </div>
    <input id="searchQueryInput" type="text" name="searchQueryInput" placeholder="Search" value="" />
   
    <button id="searchQuerySubmit" type="submit" name="searchQuerySubmit">
      
    </button>
  </div>
</div> */}
                <div>
                  
                       {/* <div className="superAdminBg flex ... gap-5">
                            <div className="w-5/6">
                            <p>Super Admin</p>
                            </div>
                            <div className="w-1/6">
                            <Image src={ChanakyaLogo}  alt="icon" className="ChanakyaLogo" />
                            </div>
                </div> */}

            

<div className="dropdown">
  <input type="checkbox" id="my-dropdown" value="" name="my-checkbox" />
  <label htmlFor="my-dropdown"
     data-toggle="dropdown">
  Super Admin
  <span className="spanimg"> <Image src={ChanakyaLogo}  alt="icon" className="ChanakyaLogo" /></span>
  </label>
  <ul>
    <li><a href="#">Acedemic admin</a></li>
    <li><a href="#">Exam Admin</a></li>
    <li><a href="#">Acedemic admin</a></li>
    
  </ul>
</div>
                </div>
            </div>
        </div>
    )
}


export default AdminLogin