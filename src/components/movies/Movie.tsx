import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import storage from '../../helpers/storage'
import body from '../../helpers/body'
import Axios from 'axios'
import MovieContext from '@/context/movie/movieContext'
import { IMovieContext, IMovieProps } from '@/utils/types.util'

const Movie = ({ title, genre, year, brand, description, thumbnail }: IMovieProps) => {

    const movieContext = useContext<IMovieContext>(MovieContext)

    useEffect(() => {

    }, [])

    return (
        <>
            <div className='movie ui-full-bg-norm' style={{ backgroundImage: `url("${thumbnail ? thumbnail : '../../../images/assets/movietar.png'}")` }}>

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

        </>
    )

}

export default Movie;