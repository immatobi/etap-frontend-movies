import React, { useEffect } from 'react'
import { useRouter } from 'next/router'

const Signup = () => {

    const router = useRouter()

    const { id } = router.query;

    useEffect(() => {

    }, [])

    return (
        <>
            <h1>Movie Details</h1>
            <span>{ id }</span>
        </>
    )

}

export default Signup;