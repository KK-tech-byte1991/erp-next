"use client"
import React from 'react'
import { usePathname } from 'next/navigation'
import AdminLogin from '../AdminLogin/adminlogin';

function Header() {
    const router = usePathname();

    const path = router
    const getHeading = () => {
        switch (true) {
            case /^\/$/.test(path):
                return "HOME"
                break;
            case /^\/trust$/.test(path):
                return "TRUST MANAGEMENT"
                break;
            case /^\/trust\/trustDetails\/new$/.test(path):
                return "TRUST DETAILS"
                break;
            case /^\/trust\/trustDetails\/(.+)$/.test(path):
                return "EDIT DETAILS"
                break;

            case /^\/trust\/trustConfig\/(\d{1,2})-new$/.test(path):
                return "TRUST CONFIGURATION"
                break;

            case /^\/trust\/trustConfig\/(.+)$/.test(path):
                return "EDIT CONFIGURATION"
                break;

            case /^\/trust\/trustSuccess$/.test(path):
                return "TRUST SUCCESS"
                break;
            case /^\/campus$/.test(path):
                return "CAMPUS"
                break;
            case /^\/campus\/campusDetails\/new$/.test(path):
                return "CAMPUS DETAILS"
                break;
            case /^\/campus\/campusDetails\/(.+)$/.test(path):
                return "EDIT DETAILS"
                break;
            case /^\/campus\/campusConfig\/(\d{1,2})-new$/.test(path):
                return "CAMPUS CONFIGURATION"
                break;
            case /^\/campus\/campusConfig\/(.+)$/.test(path):
                return " Edit CONFIGURATION"
                break;


            case /^\/campus\/campusSuccess$/.test(path):
                return "CAMPUS SUCCESS"
                break;
            case /^\/institute$/.test(path):
                return "INSTITUTE MANAGEMENT"
                break;
            case /^\/institute\/InstituteDetails\/(.+)$/.test(path):
                return "INSTITUTE DETAILS"
                break;
            default:
                return "Page Heading"
                break;
        }


    }
    return (<>
        <div className="top_section">
            <div className="w-100 flex">
                <div className="w-3/5">
                    <h3>{getHeading()}</h3>
                </div>
                <div className="w-2/5">
                    <AdminLogin />
                </div>

            </div>
        </div>
    </>
    )
}

export default Header