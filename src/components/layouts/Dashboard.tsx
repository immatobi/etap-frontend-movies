import { IDLayoutProps } from '@/utils/types.util';
import React, { useEffect } from 'react'
import TopBar from '../partials/TopBar'
import body from '@/helpers/body';
import { usePageRedirect } from '@/helpers/hooks';

const DashboardLayout = (props: any, { pageTitle }: Partial<IDLayoutProps>) => {

    useEffect(() => {

        body.changeBackground('bg-brand-black')

    }, [])

    usePageRedirect(['superadmin', 'admin', 'user'])

    return (
        <>
        
            {/* place components here */}

            <TopBar isFixed={true} />

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