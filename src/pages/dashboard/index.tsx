import React, { useEffect } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/layouts/Dashboard'

const Dashboard = () => {

    useEffect(() => {

    }, [])

    return (
        <>
            <DashboardLayout pageTitle={''}>

                <section>
                    Hello
                </section>

            </DashboardLayout>
        </>
    )

}

export default Dashboard;