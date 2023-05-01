import React, {useState, useEffect, useContext, useRef} from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import moment from 'moment'

import Axios from 'axios';
import MovieContext from '@/context/movie/movieContext';
import storage from '@/helpers/storage';
import { IMovieContext, IPanelBoxProps } from '@/utils/types.util';




const MoviePanel = ({ display, show, animate, data, close, size  }: Partial<IPanelBoxProps>) => {

    const imgRef = useRef<any>(null)
    const movieContext = useContext<IMovieContext>(MovieContext)

    useEffect(() => {

    }, [])

    const closeX = (e: any): void => {
        if (e) e.preventDefault();
        close(e, null, 'close');
    }

    return (
        <>

            <div className={`panel-box ${show ? '' : 'ui-hide'}`}>

                <div className={`display ${size} ${animate ? 'animate-box' : ''}`}>

                    {/* Panel head */}
                    <div className='d-flex align-items-center'>

                        <h4 className='font-satoshibold onwhite mrgb0 fs-15'>Movie Details</h4>

                        <div className='ml-auto'>
                            <Link onClick={(e) => closeX(e)} href="" className='link-round sm onwhite bgd-disable'>
                                <span className='fe fe-x fs-14'></span>
                            </Link>
                        </div>

                    </div>
                    {/* End Panel head */}

                    {/* Panel box body */}
                    <div className='panel-box-body'>

                        <div className='ui-separate-small'></div>

                        <div className='movie-banner mrgb1 ui-full-bg-norm ui-bg-center' style={{ backgroundImage: `url("${data && data.thumbnail ? data.thumbnail : '../../../images/assets/movietar.png'}")` }}>
                        </div>

                        <h3 className='font-satoshibold fs-24 onwhite ui-text-center mrgb1'>{ data ? data.title : '' }</h3>

                        <div className='details-list'>

                            <div className='d-flex align-items-center'>
                                <span className='font-satoshimedium fs-15 onwhite'>Movie Title: </span>
                                <span className='font-satoshi fs-15 onwhite ml-auto'>{ data ? data.title : '' }</span>
                            </div>
                            <div className='ui-line bg-silverlight'></div>
                            <div className='d-flex align-items-center'>
                                <span className='font-satoshimedium fs-15 onwhite'>Movie Genre: </span>
                                <span className='font-satoshi fs-15 onwhite ml-auto'>{ data ? data.genre : '' }</span>
                            </div>
                            <div className='ui-line bg-silverlight'></div>
                            <div className='d-flex align-items-center'>
                                <span className='font-satoshimedium fs-15 onwhite'>Movie Brand: </span>
                                <span className='font-satoshi fs-15 onwhite ml-auto'>{ data ? data.brand : '' }</span>
                            </div>
                            <div className='ui-line bg-silverlight'></div>
                            <div className='d-flex align-items-center'>
                                <span className='font-satoshimedium fs-15 onwhite'>Movie Year: </span>
                                <span className='font-satoshi fs-15 onwhite ml-auto'>{ data ? data.year : '' }</span>
                            </div>
                            <div className='ui-line bg-silverlight'></div>
                            <div className='d-flex align-items-center'>
                                <span className='font-satoshimedium fs-15 onwhite'>Added on: </span>
                                <span className='font-satoshi fs-15 onwhite ml-auto'>{ data ? moment(data.createdAt).format('Do MMM, YYYY') : '' }</span>
                            </div>
                            <div className='ui-line bg-silverlight'></div>

                        </div>

                    </div>
                    {/* End Panel box body */}

                </div>

            </div>
        
        </>
    )
  
}

export default MoviePanel