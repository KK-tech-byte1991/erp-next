"use client"
import React from 'react';
import SuccessComponent from '@/app/components/common/SuccessComponent/SuccessComponent';
import { useRouter } from 'next/navigation';




function TrustSuccess() {
    const router = useRouter();
    const redirectToCampus = () => {
        setTimeout(() => {
            router.push("/trust")
        }, 3000)
    }
    return (<>
        {redirectToCampus()}
        <SuccessComponent title="TRUST CREATION COMPLETED" />
    </>
    );
}

export default TrustSuccess;