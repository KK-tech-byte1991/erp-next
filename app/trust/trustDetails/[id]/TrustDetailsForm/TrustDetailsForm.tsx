
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import ImageUploader from "@/app/components/common/ImageUploader/ImageUploder";
import { Country, State, City } from 'country-state-city';
import "./trustDetails.css";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import StepComponent from "@/app/components/common/StepComponent/StepComponent"
import { format } from 'date-fns';

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
const faxNumberValidator = {
    maxLength: {
        value: 6,
        message: "Max 6 Characters required"
    },
    minLength: {
        value: 6,
        message: "Min 6 Characters required"
    },
}




const TrustDetailsForm = (props: any) => {
    const router = useRouter();

    const { register, handleSubmit, watch, reset, getValues, setValue, formState: { errors } } = useForm({
        defaultValues: {
            id: props.data?.id || 0,
            trustRegNo: props.data?.trustRegNo || "",
            trustAbbreviation: props.data?.trustAbbreviation || "",
            trustName: props.data?.trustName || "",
            // profilePic: "",
            address: props.data?.address || "",
            country: props.data?.country || "IN",
            pincode: props.data?.pincode || "",
            state: props.data?.state || "MH",
            city: props.data?.city || "Pune",
            primaryContactNo: props.data?.primaryContactNo || "",
            alternateContactNo: props.data?.alternateContactNo || "",
            website: props.data?.website || "",
            faxNumber: props.data?.faxNumber || "",
            isActive: props.data?.isActive || true,

        }


    });

    const [country, setCountry] = useState<string>(props.data?.country || "IN")
    const [state, setState] = useState<string>(props.data?.state || "MH");
    const [pincodeDetails, setPincodeDetails] = useState<any>(null)

    useEffect(() => {
        reset(props.data)
    }, [props.data, reset])

    useEffect(() => {
        pincodeDetails && country === "IN" && setValue("city", City.getCitiesOfState(country, state).filter((city) => city.name?.split(" ")[0] === pincodeDetails?.Division.split(" ")[0])[0]?.name)
    }, [state, pincodeDetails])

    const onSubmit = (data: any) => {
        let finalData = Object.assign(data, { "modifiedTime": format(new Date(), 'yyyy-MM-dd HH:mm:ss') })
        if (props.data) {
            fetch(process.env.NEXT_PUBLIC_BASE_URL + "/trust", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalData),
            }).then((res: any) => {

                router.push("/trust"); router.refresh();
            })
        } else {
            fetch(process.env.NEXT_PUBLIC_BASE_URL + "/trust", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(finalData),
            }).then((res: any) => {
                router.replace
                res.json().then((x: any) => router.push("/trust/trustConfig/" + x + "-new"))

            })
        }


    }

    const handlePincodeChange = (e: any) => {
        let pincode = e.target.value
        pincode?.length === 6 && fetch('https://api.postalpincode.in/pincode/' + pincode)
            .then(function (response) {
                // Handle the successful response here
                response.json().then(x => {
                    x[0].PostOffice && setPincodeDetails(x[0].PostOffice[0])
                    let pincodeData = x[0].PostOffice ? x[0].PostOffice[0] : null
                    pincodeData && country === "IN" && setState(State.getStatesOfCountry("IN").filter((state) => state.name.split(" ")[0] === pincodeData?.State.split(" ")[0])[0]?.isoCode)
                    pincodeData && country === "IN" && setValue("state", State.getStatesOfCountry("IN").filter((state) => state.name.split(" ")[0] === pincodeData?.State.split(" ")[0])[0]?.isoCode)
                    // pincodeDetails && country === "IN" && setValue("city", City.getCitiesOfState(country, state).filter((city) => city.name?.split(" ")[0] === pincodeDetails?.Division.split(" ")[0])[0]?.name)
                })

            })
            .catch(function (error) {
                // Handle any errors here
                console.error(error);
            });
    }




    return (


        <form onSubmit={handleSubmit(onSubmit)} >

            {!props.data && <StepComponent data={["General Details", "Configuration", "Success"]}
                active={0} />}
            <div className="InnerPadding">



                <p className=" looklikebtn w-40 min-w-full md:min-w-0 ">General Details</p>
                <div className="grid grid-cols-4 gap-4">

                    <div>
                        <label className="formlabel" htmlFor="trustRegNo">Registration Number <span className="required-field"></span></label>
                        <input autoComplete="off" className={errors.trustRegNo ? "inputstyleError" : "inputstyle"} id="trustRegNo" placeholder="001" type="text"
                            {...register("trustRegNo", {
                                required: "Trust Registration Number is required", maxLength: 80
                                // , pattern: {
                                //     value: /^[a-zA-Z0-9]+$/,
                                //     message: "Only alphanumeric characters are allowed",
                                // }
                            })}
                        />
                        {errors.trustRegNo && (
                            <p role="alert">{errors.trustRegNo?.message?.toString()}</p>
                        )}</div>

                    <div><label className="formlabel" htmlFor="abbreviation">Abbreviation <span className="required-field"></span></label><br />
                        <input autoComplete="off" className={errors.trustAbbreviation ? "inputstyleError" : "inputstyle"} id="abbreviation" placeholder="Shree Chanakya education society" {...register("trustAbbreviation", {
                            required: "Abbreviation is Required", maxLength: 80
                            , pattern:
                            {
                                value: /^[a-zA-Z ]*$/,
                                message: "Only Alphabates characters are allowed",
                            }
                        })}
                        />
                        {errors?.trustAbbreviation && (
                            <p role="alert">{errors.trustAbbreviation?.message?.toString()}</p>
                        )}</div>
                    <div>   <label className="formlabel" htmlFor="trustName">Trust Name <span className="required-field"></span></label><br />
                        <input autoComplete="off" className={errors.trustName ? "inputstyleError" : "inputstyle"} id="trustName" placeholder="Shree Chanakya education society" {...register("trustName", {
                            required: "Trust Name is required.", maxLength: 80
                            , pattern:
                            {
                                value: /^[a-zA-Z ]*$/,
                                message: "Only Alphabates characters are allowed",
                            }
                        })}
                        />
                        {errors.trustName && (
                            <p role="alert">{errors.trustName.message?.toString()}</p>
                        )}</div>

                    <div style={{ position: "relative" }}>  <ImageUploader /></div>
                </div>


                <p className="looklikebtn w-40 min-w-full md:min-w-0">Location Details</p>
                <div className="grid grid-cols-4 gap-4">
                    <div className="">
                        <label className="formlabel" htmlFor="address">
                            Address <span className="required-field"></span></label><br />
                        <textarea className={errors.address ? "inputstyleError textareacss" : "inputstyle textareacss"} id="address" rows={6}
                            autoComplete="off"
                            placeholder='HR55+2R3, Sukant Apartment, Iti Road, Aundh,
                     Aundh, Pune, Maharashtra 411007'

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
                        <input autoComplete="off" className={errors.pincode ? "inputstyleError" : "inputstyle"} id="pincode" placeholder="411050" type="number"
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



                <p className="looklikebtn w-40 min-w-full md:min-w-0">Contact Details</p>
                <div className="grid grid-cols-4 gap-4">
                    <div>

                        <label className="formlabel" htmlFor="primarycontactno">Primary Contact No <span className="required-field"></span></label>
                        <br />
                        <input autoComplete="off" className={errors.primaryContactNo ? "inputstyleError" : "inputstyle"} id="primarycontactno" placeholder="91+" type="number" {...register("primaryContactNo", {
                            required: "Primary Number is required.", ...phoneNumberValidator
                        })} />
                        {errors.primaryContactNo && (
                            <p role="alert">{errors.primaryContactNo.message?.toString()}</p>
                        )}

                    </div>
                    <div>

                        <label className="formlabel" htmlFor="alternateContactNo">Alternate Contact No <span className="required-field"></span></label><br />
                        <input autoComplete="off" className={errors.alternateContactNo ? "inputstyleError" : "inputstyle"} id="alternateContactNo" placeholder="91+" type="number" {...register("alternateContactNo", { required: "Alternate Number is required.", ...phoneNumberValidator })} />
                        {errors.alternateContactNo && (
                            <p role="alert">{errors.alternateContactNo.message?.toString()}</p>
                        )}
                    </div>
                    <div>

                        <label className="formlabel" htmlFor="website">Website <span className="required-field"></span></label><br />
                        <input autoComplete="off" className={errors.website ? "inputstyleError" : "inputstyle"} id="website" placeholder="Website" type="url" {...register("website", { required: "Website is required.", maxLength: 80 })} />
                        {errors.website && (
                            <p role="alert">{errors.website.message?.toString()}</p>
                        )}
                    </div>
                    <div>

                        <label className="formlabel" htmlFor="faxno">Fax Number <span className="required-field"></span></label><br />
                        <input autoComplete="off" className={errors.faxNumber ? "inputstyleError" : "inputstyle"} id="faxno" placeholder="+91" type="number" {...register("faxNumber", { required: "Fax Number is required.", ...faxNumberValidator })} />
                        {errors.faxNumber && (
                            <p role="alert">{errors.faxNumber.message?.toString()}</p>
                        )}
                    </div>
                </div>

                <button type="submit" className="btnstyle  " >Save</button>


                <button type="button" className="btnstyle btnstylebg1" onClick={() => {
                    reset({}, { keepDefaultValues: true });
                }}>Reset</button>

                <Link href="/trust"  > <button type="button" className="btnstyle btnstylebg2">Cancel</button></Link>

            </div>

        </form>




    )
}

export default TrustDetailsForm
