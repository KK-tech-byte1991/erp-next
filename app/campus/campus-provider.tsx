'use client'

import { ReactNode, createContext } from 'react'
import React, { useState } from 'react';

interface CampusConfigurationInterface {
    campusConfId: number;
    missionVision: string;
    qualityPolicy: string;
    longTermGoal: string;
    shortTermGoal: string;
    governorsComposition: string;
}
interface CampusInterface {
    parentId: null | number;
    campusId: number;
    campusName: string;
    estateManager: string;
    address: string;
    pincode: string;
    country: string;
    state: string;
    city: string;
    campusDescription: string;
    isActive: boolean;
    campusConfiguration: CampusConfigurationInterface | null;
    trustId: number;
}
interface CampusContextType {
    campusState: CampusInterface[],
    currentTrust: number,
    isNew: boolean,
    setCampusState: Function,
    setCurrentTrust: Function,
    setIsNew: Function
}

const CampusContextDefaultValues: CampusContextType = {
    campusState: [],
    currentTrust: 0,
    isNew: false,
    setCampusState: () => { },
    setCurrentTrust: () => { },
    setIsNew: () => { }
}

export const CampusContext = createContext<CampusContextType>(CampusContextDefaultValues)
interface Props {
    children?: ReactNode
    // any props that come into the component
}

export default function CampusProvider({ children }: Props) {

    const [campusState, setCampusState] = useState<CampusInterface[]>([])
    const [currentTrust, setCurrentTrust] = useState<number>(0)
    const [isNew, setIsNew] = useState<boolean>(false)

    return <CampusContext.Provider value={{
        campusState: campusState,
        setCampusState: setCampusState,
        currentTrust: currentTrust,
        setCurrentTrust: setCurrentTrust,
        isNew: isNew, setIsNew: setIsNew
    }}>{children}</CampusContext.Provider>
}