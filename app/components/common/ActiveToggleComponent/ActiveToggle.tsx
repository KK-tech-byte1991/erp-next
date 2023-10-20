"use client"
import React from 'react'
import { useState, useTransition } from 'react'
import "./styles.css"

function ActiveToggle(props: any) {
    const [isPending, startTransition] = useTransition();
    const [isFetching, setIsFetching] = useState(false);
    const [activeStatus, setActiveStatus] = useState<boolean>(props.data?.isActive)

    // Create inline loading UI
    const isMutating = isFetching || isPending;

    async function handleChange(e: { preventDefault: () => void; }) {
        e.preventDefault()
        setIsFetching(true);

        // Mutate external data source
        await fetch(process.env.NEXT_PUBLIC_BASE_URL + "/" + props.case, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...props.data, isActive: !activeStatus }),
        }).then(() => {
            setActiveStatus(!activeStatus)
            setIsFetching(false);

            startTransition(() => {
                // Refresh the current route and fetch new data from the server without
                // losing client-side browser or React state.
                // router.refresh();
            });
        })


    }

    return (
        <>
            <div className="tooltip">
                <div className="check-box" style={{ opacity: !isMutating ? 1 : 0.7 }} >
                    <input type="checkbox" checked={!activeStatus} onChange={handleChange} />

                </div>
                {activeStatus ? <span className="tooltiptext" style={{ background: "green" }}  >active</span>
                    : <span className="tooltiptext" style={{ background: "red" }} >Inactive</span>

                }
            </div>
        </>
    )
}

export default ActiveToggle