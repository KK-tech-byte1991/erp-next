"use client"
import React from 'react'

import TrustDetailsForm from './TrustDetailsForm/TrustDetailsForm';
import TrustDetailsEdit from './TrustDetailsEdit';

function TrustDetails(params: any) {

    if (params.params.id === "new") {
        return <TrustDetailsForm />
    } else {
        return <TrustDetailsEdit params={params.params} />
    }
}

export default TrustDetails
