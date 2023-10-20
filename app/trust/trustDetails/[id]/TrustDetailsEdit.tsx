"use client"
import React from 'react'
import useSWR from "swr";
import TrustDetailsForm from './TrustDetailsForm/TrustDetailsForm';
const fetcher = (url: string) => fetch(url).then(res => res.json())

function TrustDetailsEdit(props: any) {
    
    const { data, error, isLoading } =  useSWR(process.env.NEXT_PUBLIC_BASE_URL + "/trust/" + props.params.id, fetcher) 

   
        if (error) return "An error has occurred.";
        return isLoading ? "Loading..." : <TrustDetailsForm data={data} />
    
}

export default TrustDetailsEdit