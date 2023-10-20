import React from 'react'
import Image from 'next/image'
import IconBackArrow from "../../../assets/Images/icon/arrow_back-icon.svg";
import IconBackArrowHover from "../../../assets/Images/icon/arrow_back-hover-icon.svg";
import "./styles.css"
import { useRouter } from 'next/navigation';



const StepComponent = (props: any) => {
    const router = useRouter()
    const getListClassName = (index: number) => {
        switch (true) {
            case index === props.active:
                return "flex flex-col steps-list-item colorActive"
                break;

            case index < props.active:
                return "flex flex-col steps-list-item completed"
                break;

            case index > props.active:
                return "flex flex-col steps-list-item colorPending"
                break
            default:
                return ""
        }

    }

    const getNumberClassName = (index: number) => {
        switch (true) {
            case index === props.active:
                return "mx-auto number numberActive"
                break;

            case index < props.active:
                return "mx-auto number"
                break;

            case index > props.active:
                return "mx-auto number numberPending"
                break

            default:
                return ""
        }
    }

    return (

        <div className="grid grid-cols-3 gap-4">
             <div className="... " >
             {props.active != 3 && <button type="button" className="Backicon-container" onClick={() => router.back()}><span>
                    <Image src={IconBackArrow} alt="IGI" />
                    <Image src={IconBackArrowHover} alt="IGI" /></span>

                    BACK</button>}
            </div>
            <div className="col-span-2 ...">
                <div className='flex '>
                    <ul className="flex flex-row gap-5 mx-aut0 steps-list">
                        {props.data.map((step: any, index: any) => (
                            <li className={getListClassName(index)} key={step} >
                                <span className={getNumberClassName(index)}>{index + 1}</span>
                                <span className="circle"></span>
                                <span className="">{step}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>

    )
}



export default StepComponent;