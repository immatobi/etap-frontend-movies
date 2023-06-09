import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import storage from '../../helpers/storage'
import body from '../../helpers/body'
import Axios from 'axios'
import MovieContext from '@/context/movie/movieContext'
import { IMovieContext, IMovieProps } from '@/utils/types.util'

const Movie = ({ title, genre, year, brand, description, thumbnail, data, openPanel }: IMovieProps) => {

    const movieContext = useContext<IMovieContext>(MovieContext)

    useEffect(() => {

    }, [])

    const firePanel = (e: any) => {
        if(e) { e.preventDefault() }
        openPanel(e, data, 'open')
    }

    return (
        <>
            <Link onClick={(e) => firePanel(e)} href={''} className='movie-box-link'>

                <div className='movie ui-full-bg-norm ui-bg-center' style={{ backgroundImage: `url("${thumbnail ? thumbnail : '../../../images/assets/movietar.png'}")` }}>

                    <div className='movie-overlay'>

                        <div className='movie-content ui-text-center'>

                            <h2 className='mrgb fs-25 font-satoshibold onwhite'>{ title ? title : '' }</h2>
                            <div className='d-flex align-items-center justify-content-center'>
                                <span className='font-satoshi onwhite fs-11'>{ genre ? body.captialize(genre) : '' }</span>
                                <span className='font-satoshi onwhite fs-14 pdl pdr'>.</span>
                                <span className='font-satoshi onwhite fs-11'>{ year }</span>
                                <span className='font-satoshi onwhite fs-14 pdl pdr'>.</span>
                                <span className='font-satoshi onwhite fs-11'>{ brand }</span>
                            </div>

                        </div>

                    </div>

                </div>

            </Link>

        </>
    )

}

export default Movie;