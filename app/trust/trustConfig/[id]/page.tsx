"use client"
import React from 'react'

import TrustConfigForm from '../../../components/common/ConfigurationForm/ConfigurationForm';
import TrustConfigEdit from './TrustConfigEdit';
import { useRouter } from 'next/navigation';


function TrustConfiguration(params: any) {
    const router = useRouter()
console.log("Paramsssss",params)
    const handleTrustConfig = (data: any) => {
        fetch(process.env.NEXT_PUBLIC_BASE_URL + "/trust", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res: any) => {
            
            if (data.trustConfiguration.trustConfId) {
                router.refresh(); router.push("/trust");                
            } else {
                router.push("/trust/trustSuccess")
            }

        })
    }

    if (params.params.id === "new") {
        return <TrustConfigForm
            handleConfigurationChanges={handleTrustConfig}
            mode="trust"
            isNew={true}
        />
    } else {
        return <TrustConfigEdit
            params={params.params}
            handleConfigurationChanges={handleTrustConfig}
        />
    }
}

export default TrustConfiguration
