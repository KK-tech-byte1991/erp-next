"use client"
import React, { useEffect, useState } from 'react'
import './campusManagement.css';
import Image from 'next/image'
import {BackArrowIcon,BackArrowHoverIcon,EditIcon,EditHoverIcon,ConfigIcon,ConfigHoverIcon,PdfIcon
   ,PdfHoverIcon,ExcelIcon,ExcelHoverIcon,AddCircleOutline} from "../../assets/Images";


import Link from 'next/link';
import useSWR from 'swr';
import ActiveToggle from '@/app/components/common/ActiveToggleComponent/ActiveToggle';
import { useContext } from 'react';
import { CampusContext } from '../campus-provider';
import { ConfigEditIcon } from '@/app/assets/Images';
import { fetcher } from '@/app/components/helpers';


const CampusManagement = () => {
 

   const { data, error, isLoading } = useSWR("/trusts", fetcher)

   const [campusList, setCampusList] = useState<any[]>([])
   const campus: any = useContext(CampusContext)
   const campusDta = useSWR(campus.currentTrust > 0 ? "/trust/" + campus.currentTrust : null, fetcher)

   useEffect(() => {
      handleTrustChange(campus.currentTrust)  
     
   }, [])
   
   const handleTrustChange = (trust: number) => {
      trust > 0 && campus.setCurrentTrust(trust)
      trust > 0 && fetch(process.env.NEXT_PUBLIC_BASE_URL + "/trust/" + trust + "/campuses").then((res: any) => res.json().then((list: any) => {
         
         setCampusList([...list.campuses])
         campus.setCampusState([...list.campuses])
      }))
   }
 
   return (
      <>
         <div className="col-md-12">
            <div className="row">
               <div className="table-topBar">
                  <div className="flex-item">
                  <button type="button" className="Backicon-container"><span>
                        <Image src={BackArrowIcon} alt="IGI" />
                        <Image src={BackArrowHoverIcon} alt="IGI" /></span>
                        
                        BACK</button>
                  </div>
                  <div className="flex-item ">
                     <select className="classic pr-10 text-ellipsis  overflow-hidden ..." value = {campus.currentTrust} onChange={(e) => handleTrustChange(+e.target.value)}>
                        <option value={0}>Select Trust</option>
                        {data?.map((trust: any) => <option value={trust.id} key={trust.id}>{trust.trustName}</option>)}
                     </select>
                  </div>
                  <div className="flex-item">
                    <button type="button" className="pdfBtn"><span className="BtnIcon" style={{marginLeft:"-25px"}}><Image src={PdfIcon} alt="IGI" /></span> <span>PDF LIST</span></button>
                </div>
                <div className="flex-item">
                    <button type="button" className="pdfBtn"><span className="BtnIcon"><Image src={ExcelIcon} alt="IGI" /></span> EXCEL LIST</button>
                </div>
                  <div className="flex-item full-width text-right">
                     {campus.currentTrust !== 0 && <Link href={"campus/campusDetails/" + "new"} > 
                     <button type="button" className="addinstiBtn"><span><Image src={AddCircleOutline} alt="IGI" /></span>Add Campus</button></Link>}
                  </div>
               </div>
               <div className="col-md-12">
                  <div className="table-responsive">
                     <table className="institute-table">
                        <thead>
                           <tr>
                              <th> Sr.No </th>
                              <th className="text-left">  Campus Name</th>
                              <th className="text-left"> <p className="addImg">Address</p> </th>
                              <th className="text-left"><p className="esatateimg"> Estate Manager</p></th>
                              <th className="text-left" style={{ width: "150px", }}> <p className="wifiImg"> Status</p> </th>
                              <th className="text-center"> <p className="settingImg">Settings</p> </th>
                           </tr>
                        </thead>
                        <tbody>
                           {campusList.map((campus: any, index: number) => <tr key={campus.campusId}>
                              <td> {index + 1} </td>
                              <td className="text-left">  {campus.campusName} </td>
                              <td>  {campus.city} </td>
                              <td >{campus.estateManager}</td>
                              <td className="text-left" style={{ width: "130px"}}>  <ActiveToggle data={campus} case="campus" /> </td>
                              <td style={{ width: "220px", textAlign: "center" }}>
                              <div className="IconBox">
                                
                                   <div className="Tableicon-container">
                                        <Link href={{
                                    pathname: `/campus/campusDetails/${campus.campusId}`,
                                    query: campus
                                 }} title="Edit">
                                            <Image src={EditIcon} alt="IGI" className="front-img" />
                                            <Image src={EditHoverIcon} alt="igi" className="back-img" />
                                        </Link>
                                    </div>

                                 
                                 <div className="Tableicon-container">
                                        <Link href={{
                                    pathname: `/campus/campusConfig/${campus.campusId}`,
                                 }} title="CONFIG">
                                            <Image src={ConfigIcon} alt="IGI" />
                                            <Image src={ConfigHoverIcon} alt="igi" />
                                        </Link>
                                    </div>

                                <div className="Tableicon-container" >
                                        <Image src={PdfIcon} alt="IGI"  title="PDF"/>
                                        <Image src={PdfHoverIcon} alt="igi"  title="PDF"/>
                                    </div>
                                    <div className="Tableicon-container">
                                        <Image src={ExcelIcon} alt="IGI"   title="EXCEL" />
                                        <Image src={ExcelHoverIcon} alt="EXCEL"  title="EXCEL"  />
                                    </div>
                                 </div> </td>
                           </tr>)}
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>
         </div>


      </>
   );
}
export default CampusManagement;