"use client"
import React from 'react'
import ConfigurationForm from '../../../components/common/ConfigurationForm/ConfigurationForm';
import { useRouter } from 'next/navigation'

import CampusConfigEdit from './CampusConfigEdit';
import { useContext } from 'react';
import { CampusContext } from '../../campus-provider';
const Campus = (props: any) => {
    const router = useRouter()
    const campusContextState = useContext(CampusContext)
    console.log(campusContextState, "campusContextState")

    const handleCampusConfig = (data: any) => {
        fetch(process.env.NEXT_PUBLIC_BASE_URL + "/campus", {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then((res: any) => {
            //@ts-ignore
            if (campusContextState.isNew) {
                campusContextState
                router.push("/campus/campusSuccess")
            }
            else {
                router.refresh();
                router.push("/campus");
            }
        })
    }
    if (props.params.id === "new") {
        return <ConfigurationForm
            handleConfigurationChanges={handleCampusConfig}
            mode="campus"
            isNew={campusContextState.isNew}
        />
    } else {
        //@ts-ignore
        let a = campusContextState?.campusState.find((campus: any) => campus.campusId === +props.params.id)
        return a ? <CampusConfigEdit
            params={{ ...a, "parentId": campusContextState.currentTrust }}
            handleConfigurationChanges={handleCampusConfig}
            isNew={campusContextState.isNew}
        /> : router.push("/campus")
    }

}

export default Campus