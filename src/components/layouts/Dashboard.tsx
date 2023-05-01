import { IDLayoutProps } from '@/utils/types.util';
import React, { useEffect } from 'react'

const DashboardLayout = (props: any, { pageTitle }: Partial<IDLayoutProps>) => {

    useEffect(() => {

    }, [])

    return (
        <>
        
            {/* place components here */}

            <main>
                {/* place topbar here */}

                <div className='dashboard-body'>

                    <div className='dashboard-body-wrapper'>
                        { props.children }
                    </div>

                </div>

            </main>

        </>
    )

}

export default DashboardLayout;