import React from "react";
import logo from "../../../assets/Images/logo.png";
import managementIcon from "../../../assets/Images/ManagementIcon.svg";
import Link from 'next/link'
import Image from 'next/image'
import "./sidebar.css"

const Sidebar = () => {

    return (
        <>
            <div className="sidebar-container">
                <div>
                    <div className='sidebar'>
                        <Image
                            src={logo}
                            alt="igi logo"
                            width={100}
                            height={100}
                            priority={true}	
                           
                        />
                        <div className="col-md-12">
                            <div className="icon-container">
                                <Link href="/">
                                    <Image src={managementIcon} alt="icon" priority={true}	/> 
                                    <p className="link_text">Management</p></Link>

                            </div>
                            <div className="icon-container">
                                <Link href="/trust">
                                    <Image src={managementIcon} alt="icon"  priority={true}	/> 
                                    <p className="link_text">Trust</p>
                                </Link>
                            </div>
                            <div className="icon-container">
                                <Link href="/campus">
                                    <Image src={managementIcon} alt="icon" priority={true}	/> 
                                    <p className="link_text">Campus</p>
                                </Link>
                            </div>
                            <div className="icon-container">
                                <Link href="/institute">
                                    <Image src={managementIcon} alt="icon" priority={true}	 /> 
                                    <p className="link_text">Institute</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;