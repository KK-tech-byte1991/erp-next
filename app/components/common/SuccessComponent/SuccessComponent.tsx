import React from 'react';
import { Successbtn } from "@/app/assets/Images"
import Image from 'next/image'
import StepComponent from '../StepComponent/StepComponent';


function SuccessComponent(props: any) {
    return (
        <div className="InnerPadding SucessfullHeight">
            <StepComponent data={["General Details", "Configuration", "Success"]}
                active={3} />
            <div className="successpage">
                <Image src={Successbtn} alt="success-icon" width={200} />
                <h3>{props.title}</h3>
            </div>
        </div>

    );
}

export default SuccessComponent;