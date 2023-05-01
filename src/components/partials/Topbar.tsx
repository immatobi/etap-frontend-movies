import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import body from '../../helpers/body'
import Cookies from 'universal-cookie';
import { IMovieContext, INavbarProps } from '@/utils/types.util';
import AuthModal from '../auth/AuthModal';
import MovieContext from '@/context/movie/movieContext';

const Topbar = ({ isFixed, backgroundColor, doScroll, display }: Partial<INavbarProps>) => {

    const router = useRouter();
    const cookie = new Cookies()
    const [show, setShow] = useState<boolean>(false)

    const movieContext = useContext<IMovieContext>(MovieContext)

    useEffect(() => {
        body.fixNav()
    }, [])

    const toggleAuth = (e: any) => {

        if(e) { e.preventDefault() }
        setShow(!show);

    }

    return (
        <>
            
            <header id="header" className={`header header-nav ${isFixed && isFixed === true ? 'stick' : 'bg-white blocked flat'}`} 
            style={{ backgroundColor: backgroundColor ? backgroundColor : '', borderBottom: display && display === 'onboard' ? '1px solid #211A4B' : '' }}>
                
                <div className="nav-body">
                
                    <div className={`navigation ${display}`}>
                        <div className="container-fluid">

                            <nav className="main-nav navbar navbar-right navbar-expand-md">

                            <Link href="/" className="navbar-brand logo"><img src="../../../images/assets/logo.svg" alt="" /></Link>
                                
                                <div className="ml-auto d-flex align-items-center ui-hide">
                                    <Link href="" className="sd-menu md-menu onblack"><span className={`fe fe-menu fs-30`}></span></Link>
                                </div>

                                <button className="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbar-collapse">
                                    <span className="menu_toggle">
                                    <span className="hamburger">
                                        <span />
                                        <span />
                                        <span />
                                    </span>
                                    <span className="hamburger-cross">
                                        <span />
                                        <span />
                                    </span>
                                    </span>
                                </button>
                            
                                <div id="navbar-collapse" className="navbar-collapse collapse">
                                    {/* left */}
                                    <ul className="nav left-nav navbar-nav pdl2 align-items-center">
                                        <li className="nav-item link"><Link onClick={(e) => { e.preventDefault(); movieContext.logout(); }} className="nav-link onwhite font-satoshimedium fs-14 tighten-text" href="/dashboard">My Dashboard</Link></li>
                                    </ul>

                                    {/* Right */}
                                    <ul className="nav navbar-nav right-nav ml-auto align-items-center">
                                        <li className="nav-item link"><Link href="/" className="nav-link onwhite font-satoshimedium fs-14 tighten-text">Logout</Link></li>
                                        <li className="nav-item">
                                            <Link className="nav-link nav-btn onwhite font-satoshiblack btn md bgd-red fs-14" href="">Addd Movie</Link>
                                        </li>
                                    </ul>
                                    
                                </div>

                            </nav>

                        </div>
                    </div>
                    
                </div>
            
            </header>

            <AuthModal 
            isShow={show}
            closeModal={toggleAuth}
            modalTitle={'Signup/Signin'}
            flattened={true}
            slim='slim'
            stretch={false}
            />

        </>
    )

}

export default Topbar;