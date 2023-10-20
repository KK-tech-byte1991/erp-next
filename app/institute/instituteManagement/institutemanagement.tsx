"use client"
import React, { useState } from 'react'
import './instituteManagement.css';
import Image from 'next/image'
import IconPdf from "../../assets/Images/icon/pdf.svg";
import IconExcle from "../../assets/Images/icon/excle.svg";
import IconCircle from "../../assets/Images/icon/add-circle-outline.svg";
import IconLink from "../../assets/Images/icon/link.svg";
import IconEdit from "../../assets/Images/icon/edit.svg";
import AcademicIcon from "../../assets/Images/icon/d2.png";
import IconBackArrow from "../../assets/Images/icon/arrow_back-icon.svg";
import NonAcademicIcon from "../../assets/Images/icon/d3.png";
import Link from 'next/link'
import useSWR from 'swr';
const fetcher = (url: string) => fetch(url).then(res => res.json())
const InstituteManagement = () => {

   const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_BASE_URL + "/trusts", fetcher)
   const [campusList, setCampusList] = useState<any[]>([])
   const handleTrustChange = (trust: number) => {
      trust > 0 && fetch(process.env.NEXT_PUBLIC_BASE_URL + "/trust/" + trust+"/campuses").then((res: any) => res.json().then((list: any) => {
         setCampusList([...list.campuses])
      }))
   }
   return (
      <>
         <div className="w-full">
            <div className="row">
               <div className="table-topBar">
                  <div className="flex-item">
                     <button type="button" className="BackBtnIcon"><span className="imgBackWhite">
                        <Image src={IconBackArrow} alt="IGI" /></span>BACK</button>
                  </div>
                  <div className="flex-item ">
                  </div>
                  <div className="flex-item ">
                     <select className="classic pr-10 text-ellipsis  overflow-hidden ..." onChange={(e) => handleTrustChange(+e.target.value)} >
                        <option value={0}>Select Trust</option>
                        {data?.map((trust: any) => <option value={trust.id} key={trust.id}>{trust.trustName}</option>)}
                     </select>
                  </div>
                  <div className="flex-item ">
                     <select className="classic pr-10 text-ellipsis  overflow-hidden ..." >
                        <option value={0}>Select Campus</option>
                        {campusList?.map((campus: any) => <option value={campus.campusId} key={campus.campusId}>{campus.campusName}</option>)}
                     </select>
                  </div>

                  <div className="flex-item">
                     <button type="button" className="pdfBtn"><span className="imgBackWhite"><Image src={IconPdf} alt="IGI" /></span> PDF LIST</button>
                  </div>
                  <div className="flex-item">
                     <button type="button" className="pdfBtn"><span className="imgBackWhite"><Image src={IconExcle} alt="IGI" /></span> EXCEL LIST</button>
                  </div>
                  <div className="flex-item full-width text-right">
                     <Link href={"institute/InstituteDetails/" + "new"}> <button type="button" className="addinstiBtn">
                        <span><Image src={IconCircle} alt="IGI" /></span>Add Institute</button></Link>
                  </div>
               </div>
               <div className="table-responsive">
                  <table className="institute-table">
                     <thead>
                        <tr>
                           <th> Sr.No </th>
                           <th>  Institute Name </th>
                           <th>  Abbreviation </th>
                           <th> <p className="addImg">Address</p> </th>
                           <th className="text-center" > <p className="callImg"> Contact No.</p> </th>
                           <th className="text-center">  Department </th>
                           <th className="text-center"> <p className="globeImg">Web</p> </th>
                           <th style={{ width: "120px", textAlign: "center" }}> <p className="wifiImg"> Status</p> </th>
                           <th className="text-center"> <p className="settingImg">Settings</p> </th>
                        </tr>
                     </thead>
                     <tbody>
                        <tr>
                           <td> 001 </td>
                           <td>  Indira College of Arts Commerce and Science </td>
                           <td>  ICACS </td>
                           <td>  85/5-B, Samanvay IT Campus, New Pune,Mumbai Hwy, Tathawade, Pune, Maharashtra 411033 </td>
                           <td style={{ width: "130px", textAlign: "center" }}>  +91 9619455397 </td>
                           <td style={{ width: "120px", textAlign: "center" }}><span className="imgBackWhite"><Image src={NonAcademicIcon} alt="IGI" /></span><span className="imgBackWhite"><Image src={AcademicIcon} alt="IGI" /></span></td>
                           <td style={{ width: "100px", textAlign: "center" }}>  <span className="imgBackWhite"><Image src={IconLink} alt="IGI" /></span> </td>
                           <td style={{ width: "120px", textAlign: "center" }}>  <button className="activeBtn">Active</button> </td>
                           <td style={{ width: "160px", textAlign: "center" }}><span className="imgBackWhite"><Image src={IconEdit} alt="IGI" /></span><span className="imgBackWhite"><Image src={IconPdf} alt="IGI" /></span><span className="imgBackWhite"><Image src={IconExcle} alt="IGI" /></span></td>
                        </tr>
                        <tr>
                           <td> 001 </td>
                           <td>  Indira College of Arts Commerce and Science </td>
                           <td>  ICACS </td>
                           <td>  85/5-B, Samanvay IT Campus, New Pune,Mumbai Hwy, Tathawade, Pune, Maharashtra 411033 </td>
                           <td style={{ width: "130px", textAlign: "center" }}>  +91 9619455397 </td>
                           <td style={{ width: "120px", textAlign: "center" }}><span className="imgBackWhite"><Image src={NonAcademicIcon} alt="IGI" /></span><span className="imgBackWhite"><Image src={AcademicIcon} alt="IGI" /></span></td>
                           <td style={{ width: "100px", textAlign: "center" }}>  <span className="imgBackWhite"><Image src={IconLink} alt="IGI" /></span> </td>
                           <td style={{ width: "120px", textAlign: "center" }}>  <button className="activeBtn">Active</button> </td>
                           <td style={{ width: "160px", textAlign: "center" }}><span className="imgBackWhite"><Image src={IconEdit} alt="IGI" /></span><span className="imgBackWhite"><Image src={IconPdf} alt="IGI" /></span><span className="imgBackWhite"><Image src={IconExcle} alt="IGI" /></span></td>
                        </tr>
                     </tbody>
                  </table>
               </div>
            </div>
         </div>



      </>
   );
}
export default InstituteManagement;