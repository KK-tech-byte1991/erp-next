"use client"
import Image from 'next/image'

import {
    IconLink, BackArrowIcon, BackArrowHoverIcon, LinkHoverIcon, EditIcon, EditHoverIcon, ConfigIcon, ConfigHoverIcon, PdfIcon
    , PdfHoverIcon, ExcelIcon, ExcelHoverIcon, AddCircleOutline
} from "../../assets/Images";



import "./trustManagement.css"
import ActiveToggle from '../../components/common/ActiveToggleComponent/ActiveToggle';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import useSWR from 'swr';
import { fetcher } from '@/app/components/helpers';

const TrustManagement = () => {
    const router = useRouter()
    const { data, error, isLoading } = useSWR("/trusts", fetcher)

    return (
        <>
            <div className="table-topBar">
                <div className="flex-item">
                    <button type="button" className="Backicon-container" onClick={() => router.push("/")}><span>
                        <Image src={BackArrowIcon} alt="IGI" />
                        <Image src={BackArrowHoverIcon} alt="IGI" /></span>

                        BACK</button>
                </div>


                <div className="flex-item">
                    <button type="button" className="pdfBtn"><span className="BtnIcon" style={{ marginLeft: "-25px" }}><Image src={PdfIcon} alt="IGI" /></span> <span>PDF LIST</span></button>
                </div>
                <div className="flex-item">
                    <button type="button" className="pdfBtn"><span className="BtnIcon"><Image src={ExcelIcon} alt="IGI" /></span> EXCEL LIST</button>
                </div>
                <div className="flex-item full-width text-right">
                    <Link href={"trust/trustDetails/" + "new"}>  <button type="button" className="addinstiBtn"><span><Image src={AddCircleOutline} alt="IGI" /></span>Add Trust </button></Link>
                </div>
            </div>
            <div className="mt-0 div-scroll">
                <table className="institute-table table-auto">

                    <thead>
                        <tr>
                            <th className="w-16 text-center ...">Sr.No</th>
                            <th className="w-32 text-center ...">  Trust Reg.No.</th>
                            <th className="w-32 text-left"> Trust Name</th>
                            <th className="w-96 text-left"> <p className="addImg">Address</p></th>
                            <th className="w-36 text-center ..."> <p className="callImg"> Contact No.</p></th>
                            <th className="w-24 text-left">  <p className="globeImg">Web</p> </th>
                            <th className="w-24 text-center">  <p className="wifiImg"> Status</p></th>
                            <th className="w-60 text-left"> <p className="settingImg">Settings</p> </th>
                        </tr>
                    </thead>
                    
                    {data && <tbody>

                        {data?.map((trust: Trust, index: number) => (<tr key={trust.id}>
                            <td className="w-16 text-center ..." >{index + 1}</td>
                            <td className="w-32 text-center ..."> {trust.trustRegNo}</td>
                            <td className="w-32 text-left"> {trust.trustName}</td>
                            <td className="w-96 text-left"> {trust.address}</td>
                            <td className="w-36 text-center ...">{trust.primaryContactNo}</td>
                            <td className="w-24 text-left"><span>


                                <div className="IconBox">

                                    <div className="Tableicon-container" >
                                        <Link href={trust.website} target="_blank" title="Link">
                                            <Image src={IconLink} alt="IGI" />
                                            <Image src={LinkHoverIcon} alt="igi" /></Link>


                                    </div>
                                </div>

                            </span></td>
                            <td className="w-24 text-center ..."><ActiveToggle data={trust} case="trust" />

                            </td>
                            <td className="w-56 text-left">
                                <div className="IconBox">


                                    <div className="Tableicon-container">
                                        <Link href={"trust/trustDetails/" + trust.id} title="Edit">
                                            <Image src={EditIcon} alt="IGI" className="front-img" />
                                            <Image src={EditHoverIcon} alt="igi" className="back-img" />
                                        </Link>
                                    </div>

                                    <div className="Tableicon-container">
                                        <Link href={"trust/trustConfig/" + trust.id} title="CONFIG">
                                            <Image src={ConfigIcon} alt="IGI" />
                                            <Image src={ConfigHoverIcon} alt="igi" />
                                        </Link>
                                    </div>
                                    <div className="Tableicon-container" >
                                        <Image src={PdfIcon} alt="IGI" title="PDF" />
                                        <Image src={PdfHoverIcon} alt="igi" title="PDF" />
                                    </div>
                                    <div className="Tableicon-container">
                                        <Image src={ExcelIcon} alt="IGI" title="EXCEL" />
                                        <Image src={ExcelHoverIcon} alt="EXCEL" title="EXCEL" />
                                    </div>
                                </div></td>

                        </tr>
                        ))}
                    </tbody>}
                    {/* {error && "An error occurred while fetching the data."} */}

                </table>
            </div>
        </>
    );
}
export default TrustManagement;