"use client"
import React from 'react'
import useSWR from "swr";
import ConfigurationForm from '../../../components/common/ConfigurationForm/ConfigurationForm';
const fetcher = (url: string) => fetch(url).then(res => res.json())

function TrustDetailsEdit(props: any) {

    const { data, error, isLoading } = useSWR(process.env.NEXT_PUBLIC_BASE_URL + "/trust/" + props.params.id.split("-")[0], fetcher)
    if (error) return "An error has occurred.";
    return isLoading ? "Loading..." : data && <ConfigurationForm
        handleConfigurationChanges={props.handleConfigurationChanges}
        data={JSON.parse(JSON.stringify(data))}
        mode="trust"
        isNew={props.params.id.split("-")[1] === "new" ? true : false} />

}

export default TrustDetailsEdit