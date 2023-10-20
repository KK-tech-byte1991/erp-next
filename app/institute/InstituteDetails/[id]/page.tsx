"use client";
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import ImageUploader from "../../../components/common/ImageUploader/ImageUploder";

import "./InstituteDetails.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation'
const fetcher = (url: string) => fetch(url).then(res => res.json())


const phoneNumberValidator = {
    maxLength: {
        value: 10,
        message: "Max 10 Characters required"
    },
    minLength: {
        value: 10,
        message: "Min 10 Characters required"
    },
}
const InstituteDetailsForm = (props: any) => {
    const router = useRouter();

    const { register, handleSubmit, watch, reset, getValues, formState: { errors } } = useForm({
        defaultValues: {
            id: props.data?.id || 0,
            instituteName: props.data?.instituteName || "",
            instituteAbbreviation: props.data?.instituteAbbreviation || "",
            header: props.data?.header || "",
            profilePic: "",
            email: props.data?.email || "",
            address: props.data?.address || "",
            website: props.data?.website || "",
            primaryContactNo: props.data?.primaryContactNo || "",
            indexNo: props.data?.indexNo || "",
            affiliations: props.data?.affiliations || "",
            medium: props.data?.medium || "",
            uDiseCode: props.data?.uDiseCode || "",
            instituteCode: props.data?.instituteCode || "",
            stateBoard: props.data?.stateBoard || "",

            is_active: props.data?.is_active || false
        }
    });


    const onSubmit = (data: any) => {

        if (props.data) {
            fetch(process.env.NEXT_PUBLIC_BASE_URL + "/trust", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then((res: any) => { router.push("/trust"); router.refresh(); })
        } else {
            fetch(process.env.NEXT_PUBLIC_BASE_URL + "/trust", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }).then((res: any) => { router.push("/trust"); router.refresh(); })
        }
    }

    return (


        <form onSubmit={handleSubmit(onSubmit)} >
            <div className=" w-full trustbg InnerPadding">
                <div className=" w-full box">
                    <p className=" looklikebtn">General Details</p>
                    <div className="grid grid-cols-4 gap-4">
                        <div className="w-full">
                            <label className="formlabel" htmlFor="instituteName">Institute Name:<span className="required-field"></span></label>
                            <input className="inputstyle" defaultValue="test" id="instituteName"
                                placeholder="Bachelor of Arts" type="text" {...register("instituteName",
                                    { required: "Institute Nameis required", maxLength: 80 })} />
                            {errors.instituteName && (
                                <p role="alert">{errors.instituteName?.message?.toString()}</p>
                            )}
                            <label className="formlabel" htmlFor="primarycontactno">Primary Contact No <span className="required-field"></span></label><br />
                            <input className="inputstyle" id="primarycontactno" placeholder="91+" type="number" {...register("primaryContactNo", {
                                required: "Primary Number is required.", ...phoneNumberValidator
                            })} />
                            {errors.primaryContactNo && (
                                <p role="alert">{errors.primaryContactNo.message?.toString()}</p>
                            )}



                        </div>

                        <div className="w-full">

                            <label className="formlabel" htmlFor="instituteAbbreviation">Abbreviation
                                <span className="required-field"></span></label><br />
                            <input className="inputstyle"
                                id="instituteAbbreviation" placeholder="BA" {...register("instituteAbbreviation", { required: "Abbreviation is Required", maxLength: 80 })} />
                            {errors?.instituteAbbreviation && (
                                <p role="alert">{errors.instituteAbbreviation?.message?.toString()}</p>
                            )}
                            <label className="formlabel" htmlFor="email">Email <span className="required-field"></span></label><br />
                            <input className="inputstyle" id="email" placeholder="email" type="email" {...register("email", { required: "email is required.", maxLength: 80 })} />
                            {errors.email && (
                                <p role="alert">{errors.email.message?.toString()}</p>
                            )}
                        </div>
                        <div className="w-full">

                            <label className="formlabel" htmlFor="header">Header:<span className="required-field"></span></label><br />
                            <input className="inputstyle" id="header"
                               
                                placeholder="Affiliations"
                                {...register("header", { required: "Header is required.", maxLength: 80 })} />
                            {errors.header && (
                                <p role="alert">{errors.header.message?.toString()}</p>
                            )}
                            <label className="formlabel" htmlFor="website">Website <span className="required-field"></span></label><br />
                            <input className="inputstyle" id="website" placeholder="Website" type="url" {...register("website", { required: "Website is required.", maxLength: 80 })} />
                            {errors.website && (
                                <p role="alert">{errors.website.message?.toString()}</p>
                            )}
                        </div>
                        <div className="pincodebox w-full row-span-2">
                            <ImageUploader />
                        </div>
                        <div className="col-span-2">
                            <div className="w-full col-span-12">
                                <label className="formlabel" htmlFor="address">
                                    Address <span className="required-field"></span></label><br />
                                <textarea className="inputstyle textareacss" id="address" rows={2}
                                    autoComplete="on"
                                    placeholder='HR55+2R3, Sukant Apartment, Iti Road, Aundh,Pune, Maharashtra 411007'

                                    {...register("address", {
                                        required: "Address is required.",
                                        maxLength: 100
                                    })}></textarea>
                                {errors.address && (
                                    <p
                                    >{errors.address.message?.toString()}</p>
                                )}
                            </div>
                        </div>
                    </div>





                    <p className="looklikebtn">Additional Info.</p>
                    <div className="grid grid-cols-4 gap-4">
                        <div >
                            <label className="formlabel" htmlFor="indexNo">Index No<span className="required-field"></span></label>
                            <input className="inputstyle" defaultValue="test" id="indexNo"
                                placeholder="INBOA1452" type="text" {...register("indexNo",
                                    { required: "Index No is required", maxLength: 80 })} />
                            {errors.indexNo && (
                                <p role="alert">{errors.indexNo?.message?.toString()}</p>
                            )}

                            <label className="formlabel" htmlFor="affiliations">Affiliations<span
                                className="required-field"></span></label>
                            <input className="inputstyle" defaultValue="test" id="affiliations"
                                placeholder="Affiliated by XYZ" type="text" {...register("indexNo",
                                    { required: "Affiliations is required", maxLength: 80 })} />
                            {errors.affiliations && (
                                <p role="alert">{errors.affiliations?.message?.toString()}</p>
                            )}

                        </div>

                        <div >

                            <label className="formlabel" htmlFor="medium">Medium
                                <span className="required-field"></span></label><br />
                            <input className="inputstyle"
                                id="medium" placeholder="English"
                                {...register("medium",
                                    { required: "Medium is Required", maxLength: 80 })} />
                            {errors?.medium && (
                                <p role="alert">{errors.medium?.message?.toString()}</p>
                            )}
                            <label className="formlabel" htmlFor="stateBoard">Maharashtra State Board H.S.C.
                                No.
                                <span className="required-field"></span></label><br />
                            <input className="inputstyle"
                                id="stateBoard" placeholder="English" type="number"
                                {...register("stateBoard",
                                    { required: "Maharashtra State Board H.S.C. No. is Required", maxLength: 80 })} />
                            {errors?.stateBoard && (
                                <p role="alert">{errors.stateBoard?.message?.toString()}</p>
                            )}
                        </div>
                        <div >

                            <label className="formlabel" htmlFor="uDiseCode">U Dise Code:<span className="required-field"></span></label><br />
                            <input className="inputstyle" id="uDiseCode"
                                placeholder="124536ondr"
                                {...register("uDiseCode", { required: "U Dise Code is required.", maxLength: 80 })} />
                            {errors.uDiseCode && (
                                <p role="alert">{errors.uDiseCode.message?.toString()}</p>
                            )}

                            <label className="formlabel" htmlFor="instituteCode">Institute Code<span className="required-field"></span></label><br />
                            <input className="inputstyle" id="instituteCode"
                                placeholder="02354"
                                {...register("instituteCode", { required: "instituteCode is required.", maxLength: 80 })} />
                            {errors.instituteCode && (
                                <p role="alert">{errors.instituteCode.message?.toString()}</p>
                            )}
                        </div>

                    </div>

                    <button type="submit" className="btnstyle  " >Save</button>
                    <button type="button" className="btnstyle btnstylebg1" onClick={() => {
                        reset({}, { keepDefaultValues: true });
                    }}>Reset</button>
                    <Link href="/institute"  > <button type="button" className="btnstyle btnstylebg2">Cancel</button></Link>

                </div>
            </div>
        </form>




    )
}

export default InstituteDetailsForm