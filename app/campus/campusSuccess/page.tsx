"use client"
import React from 'react'
import SuccessComponent from '@/app/components/common/SuccessComponent/SuccessComponent'
import { useRouter } from 'next/navigation'

const CampusSuccess = () => {
    const router = useRouter();
    const redirectToCampus = () => {
        setTimeout(() => {
            router.push("/campus")
        }, 3000)
    }

    return (<>
        {redirectToCampus()}
        <SuccessComponent title="CAMPUS CREATION COMPLETED" />
    </>
    )
}

export default CampusSuccess