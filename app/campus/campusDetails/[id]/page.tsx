"use client";
import React, { useContext, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import "./campusDetails.css";
import { Country, State, City } from 'country-state-city';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
import EditorText from '@/app/components/common/EditorComponent/Editor';
import { CampusContext } from '../../campus-provider';
import StepComponent from '@/app/components/common/StepComponent/StepComponent';
import { format } from 'date-fns';





const CampusCreation = (props: any) => {
    const router = useRouter();
    const campus: any = useContext(CampusContext)
    const campusDetails = props.searchParams


    console.log("campus", campus)


    const { register, handleSubmit, watch, reset, getValues, setValue, formState: { errors } } = useForm({
        defaultValues: {
            campusId: campusDetails?.campusId || 0,
            campusName: campusDetails?.campusName || "",
            estateManager: campusDetails?.estateManager || "",
            address: campusDetails?.address || "",
            country: campusDetails?.country || "IN",
            pincode: campusDetails?.pincode || "",
            state: campusDetails?.state || "MH",
            city: campusDetails?.city || "Pune",
            isActive: campusDetails?.isActive || false,
            parentId: campus.currentTrust,
            campusDescription: campusDetails?.campusDescription || ""
        }
    });
    const [country, setCountry] = useState<string>(campusDetails?.country || "IN")
    const [state, setState] = useState<string>(campusDetails?.state || "MH")
    const [city, setCity] = useState<string>(campusDetails.city || "Pune")
    const [editorValue, setEditorValue] = useState(campusDetails?.campusDescription || "")

    const onSubmit = (data: any) => {
        let campusDescription = { "campusDescription": editorValue, "modifiedTime": format(new Date(), 'yyyy-MM-dd HH:mm:ss') }

        let finalData = Object.assign(data, campusDescription)
        console.log("final Data", finalData)
        if (props.params.id !== "new") {
            fetch(process.env.NEXT_PUBLIC_BASE_URL + "/campus", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalData),
            }).then((res: any) => { router.push("/campus"); router.refresh(); })
        } else {
            fetch(process.env.NEXT_PUBLIC_BASE_URL + "/campus", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalData),
            }).then((res: any) => { res.json().then((x: any) => { campus.setIsNew(true); campus.setCampusState([...campus.campusState, x]); router.push("/campus/campusConfig/" + x.campusId) }) })
        }
    }

    const handlePincodeChange = (e: any) => {
        let pincode = e.target.value
        pincode?.length === 6 && fetch('https://api.postalpincode.in/pincode/' + pincode)
            .then(function (response) {
                // Handle the successful response here
                response.json().then(x => {
                    let pincodeData = x[0].PostOffice[0]
                    pincodeData && country === "IN" && setState(State.getStatesOfCountry("IN").filter((state) => state.name.split(" ")[0] === pincodeData?.State.split(" ")[0])[0]?.isoCode)
                    pincodeData && country === "IN" && setValue("state", State.getStatesOfCountry("IN").filter((state) => state.name.split(" ")[0] === pincodeData?.State.split(" ")[0])[0]?.isoCode)
                    pincodeData && country === "IN" && setValue("city", City.getCitiesOfState(country, state).filter((city) => city.name?.split(" ")[0] === pincodeData?.Division.split(" ")[0])[0]?.name)

                })

            })
            .catch(function (error) {
                // Handle any errors here
                console.error(error);
            });
    }
    // Redirect to campus management when currentTrust is equal to zero ie when tghe page is refreshed.
    useEffect(() => {
        campus.currentTrust === 0 && router.push("/campus")
    }, [campus.currentTrust])

    return (
        <div >
            {props.params.id === "new" && <StepComponent data={["General Details", "Configuration", "Success"]}
                active={0} backRoute={router.back} />}
            <form onSubmit={handleSubmit(onSubmit)} >
                <div className=" InnerPadding">
                    <p className=" looklikebtn w-48 min-w-full md:min-w-0">General Details</p>
                    <div className="grid grid-cols-4 gap-4">
                        <div >
                            <label className="formlabel" htmlFor="campusName">Campus Name <span className="required-field"></span></label><br />
                            <input className={errors.campusName ? "inputstyleError textareacss" : "inputstyle textareacss"} id="campusName" placeholder="Enter Campus Name"
                                {...register("campusName", { required: "Campus Name is Required", maxLength: 80 })} />
                            {errors?.campusName && (
                                <p role="alert">{errors.campusName?.message?.toString()}</p>
                            )}
                        </div>
                        <div >
                            <label className="formlabel" htmlFor="estateManager">Estate Manager <span className="required-field"></span></label><br />
                            <input className={errors.estateManager ? "inputstyleError textareacss" : "inputstyle textareacss"}
                                id="estateManager"
                                placeholder="Enter Estate Manager  Name"
                                {...register("estateManager",
                                    { required: "Estate Manager is Required", maxLength: 80 })} />
                            {errors?.estateManager && (
                                <p role="alert">{errors.estateManager?.message?.toString()}</p>
                            )}
                        </div>
                        <div >
                        </div>
                        <div >
                        </div>
                    </div>

                    <p className="looklikebtn w-48 min-w-full md:min-w-0">Location Details</p>
                <div className="grid grid-cols-4 gap-4">
                    <div className="">
                        <label className="formlabel" htmlFor="address">
                            Address <span className="required-field"></span></label><br />
                        <textarea className={errors.address ? "inputstyleError textareacss" : "inputstyle textareacss"} id="address" rows={6}
                            autoComplete="on"
                            placeholder='Enter Address Details'

                            {...register("address", {
                                required: "Address is required.",
                                maxLength: 100
                            })}></textarea>
                        {errors.address && (
                            <p role="alert"
                            >{errors.address.message?.toString()}</p>
                        )}
                    </div>

                    <div className="pincodebox">
                        <label className="formlabel" htmlFor="pincode">Pincode: <span className="required-field"></span></label><br />
                        <input className={errors.pincode ? "inputstyleError" : "inputstyle"} 
                        id="pincode" placeholder="Enter Pincode" type="number"
                            {...register("pincode", { required: "Pincode is required.", maxLength: { value: 6, message: "Max Length should be six" } })} onChange={handlePincodeChange} />
                        {errors.pincode && (
                            <p className="alertspecific" role="alert">{errors.pincode.message?.toString()}
                            </p>
                        )}

                        <br />
                        <label className="formlabel" htmlFor="country">Country <span className="required-field"></span></label>
                        <select id="country" autoComplete="country" className={errors.country ? "inputstyleError" : "inputstyle"} {...register("country")} onChange={(e) => setCountry(e.target.value)}>
                            {Country.getAllCountries().map((country) => <option key={country.isoCode} value={country.isoCode}>{country.name}</option>)}
                        </select>

                    </div>

                    <div className="paddingAbove">


                        <label className="formlabel" htmlFor="State">State <span className="required-field"></span></label>
                        <select id="State" className={errors.state ? "inputstyleError" : "inputstyle"} {...register("state")} onChange={(e) => setState(e.target.value)}>
                            {State.getStatesOfCountry(country)?.map((state) => <option key={state.isoCode} value={state.isoCode}>{state.name}</option>)}

                        </select>

                    </div>
                    <div className="paddingAbove">

                        <label className="formlabel" htmlFor="City">City <span className="required-field"></span></label>
                        <select id="City" className={errors.city ? "inputstyleError" : "inputstyle"}  {...register("city")}>
                            {City.getCitiesOfState(country, state)?.map(city => <option key={city.name} value={city.name}>{city.name}</option>)}
                        </select>
                    </div>
                </div>



                    <p className="looklikebtn w-48 min-w-full md:min-w-0">Campus Description:</p>
                    <EditorText
                        handleEditorValue={setEditorValue}
                        placeholder={'Write something...'}
                        text={editorValue}
                    />

                    <button type="submit" className="btnstyle">Save</button>
                    <button type="button" className="btnstyle btnstylebg1" onClick={() => {
                        reset({}, { keepDefaultValues: true });
                        setEditorValue(campusDetails?.campusDescription || "")
                    }}>Reset</button>
                    <Link href="/campus"> <button type="button" className="btnstyle btnstylebg2">Cancel</button></Link>

                </div>


            </form>
        </div>
    )
}

export default CampusCreation