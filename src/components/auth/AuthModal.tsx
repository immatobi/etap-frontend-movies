import React, { useState, useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Modal } from 'react-bootstrap';
import Cookies from 'universal-cookie'

// import Message from '../../../../layouts/partials/Message';

import Axios from 'axios';
import MovieContext from '@/context/movie/movieContext';
import storage from '@/helpers/storage';
import body from '@/helpers/body';
import { IAuthModal, IMovieContext } from '@/utils/types.util';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Alert from '../partials/Alert';


const AuthModal = ({ isShow, closeModal, modalTitle, flattened, stretch, slim, data, type }: Partial<IAuthModal>) => {

    // super@etap.com
    // #_suPAetap1/
    
    const router = useRouter()

    const cookie = new Cookies();
    const exp = new Date(
        Date.now() + 70 * 24 * 60 * 60 * 1000
    )

    const movieContext = useContext<IMovieContext>(MovieContext)

    const [step, setStep] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(false)
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
    });
    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const [alert, setAlert] = useState({
        type: '',
        show: false,
        message: ''
    });

    useEffect(() => {
        setStep(0)
        storage.setWindow(window)
    }, [])

    const closeX = (e: any = null) => {
        if (e) e.preventDefault();
        closeModal();

        setTimeout(() => {
            setStep(0)
        }, 400)
    }

    const configTab = (e:any, val:any) => {

        if(e) { e.preventDefault(); }
        storage.keepLegacy('auth-tab', val.toString())
    }

    const login = async (e: any) => {

        if (e) { e.preventDefault() }

        if (!loginData.email && !loginData.password) {
            setAlert({ ...alert, type: "danger", show: true, message: 'All fields are required' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 2500)
        } else if (!loginData.email) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Email is required' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 2500)
        } else if (!loginData.password) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Password is required' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 2500)
        } else {

            setLoading(true);

            await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { ...loginData }, storage.getConfig())
            .then(async (resp) => {

                if (resp.data.error === false && resp.data.status === 200) {

                    storage.saveCredentials(resp.data.token, resp.data.data.id);

                    cookie.set("userType", resp.data.data.userType , {
                        path: '/',
                        expires: exp
                    })

                    cookie.set("token", resp.data.token , {
                        path: '/',
                        expires: exp
                    })

                    router.push('/dashboard');
                    await movieContext.clearDefault()

                }

                setLoading(false);

            }).catch((err) => {

               if(err.response && err.response.data){

                setAlert({ ...alert, type: "danger", show: true, message: err.response.data.message })
                setTimeout(() => {
                    setAlert({ ...alert, show: false });
                }, 2500)

               }

                setLoading(false);

            });

        }
    }

    const register = async (e: any) => {

        if (e) { e.preventDefault() }

        if (!registerData.email && !registerData.password && !registerData.username) {
            setAlert({ ...alert, type: "danger", show: true, message: 'All fields are required' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 2500)
        } else if (!registerData.username) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Username is required' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 2500)
        } else if (registerData.username.split(' ').length > 1) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Spaces are not allowed in usernames' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 2500)
        } else if (!registerData.email) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Email is required' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 2500)
        } else if (!registerData.password) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Password is required' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 2500)
        } else {

            setLoading(true);

            await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, { ...registerData }, storage.getConfig())
            .then(async (resp) => {

                if (resp.data.error === false && resp.data.status === 200) {

                    storage.saveCredentials(resp.data.token, resp.data.data.id);

                    cookie.set("userType", resp.data.data.userType , {
                        path: '/',
                        expires: exp
                    })

                    cookie.set("token", resp.data.token , {
                        path: '/',
                        expires: exp
                    })

                    router.push('/dashboard');
                    await movieContext.clearDefault()
                }

                setLoading(false);

            }).catch((err) => {

               if(err.response && err.response.data){

                setAlert({ ...alert, type: "danger", show: true, message: err.response.data.message })
                setTimeout(() => {
                    setAlert({ ...alert, show: false });
                }, 2500)

               }

                setLoading(false);

            });

        }
    }

    return (
        <>

            <Modal show={isShow}
                onHide={() => closeX()}
                size="sm"
                fade={false}
                keyboard={false}
                aria-labelledby="medium-modal"
                centered
                className={`custom-modal ${slim ? slim : ''} ${stretch ? 'stretched' : ''} ${flattened ? 'flat' : ''} lg`}
            >

                <Modal.Body>

                    <div className="d-flex">

                        <div className="dm--dbx ui-full-bg-norm" style={{ backgroundImage: 'url("../../../images/assets/bg@auth01.jpg")' }}>
                            <div className="dm--d">
                                <div>
                                    {/* <img src="../../../images/assets/i" alt="icon" /> */}
                                </div>
                            </div>
                        </div>

                        <div className="dm--body form">

                            <div className="d-flex align-items-center mrgb1">
                                <h2 onClick={(e) => { console.log(cookie.get('token')) }} className="onwhite mrgb0 font-satoshimedium fs-18">
                                    {modalTitle}
                                </h2>
                                <div className="ml-auto">
                                    <Link href="" onClick={(e) => closeX(e)} className="link-round minix ui-icon-animate" style={{ backgroundColor: "#413AB9" }}>
                                        <span className="fe fe-x fs-14" style={{ color: '#fff' }}></span>
                                    </Link>
                                </div>
                            </div>

                            <div className="dm--ct">

                                <form className='form' onSubmit={(e) => { e.preventDefault() }}>

                                    <Tabs className={'auth-tab'} defaultIndex={0}>

                                        <TabList>
                                            <Tab onClick={(e) => { configTab(e, 0); }}>Sign In</Tab>
                                            <Tab onClick={(e) => { configTab(e, 1); }}>Sign Up</Tab>
                                        </TabList>

                                        <TabPanel tabIndex={0}>

                                            {

                                                step === 0 &&
                                                <>

                                                    <Alert type={alert.type} show={alert.show} message={alert.message} />

                                                    <div className='form-row mrgb0 mrgt'>
                                                        <div className='col'>
                                                            <label className='mrgb0 font-satoshimedium onwhite fs-13'>Your email</label>
                                                            <input 
                                                            defaultValue={''}
                                                            onChange={(e) => { setLoginData({ ...loginData, email: e.target.value }) }}
                                                            className='form-control mlg fs-14 font-satoshi onwhite'
                                                            placeholder='you@example.com'
                                                            type='email' />
                                                        </div>
                                                    </div>

                                                    <div className='form-row mrgb1'>
                                                        <div className='col'>
                                                            <label className='mrgb0 font-satoshimedium onwhite fs-13'>Your password</label>
                                                            <input 
                                                            defaultValue={''}
                                                            onChange={(e) => { setLoginData({ ...loginData, password: e.target.value }) }}
                                                            className='form-control mlg fs-14 font-satoshi onwhite'
                                                            placeholder='Type here'
                                                            type='password' />
                                                        </div>
                                                    </div>

                                                    <div className='form-row'>
                                                        <div className='col'>
                                                            <Link 
                                                            href={''} 
                                                            onClick={(e) => login(e)} 
                                                            className={`btn md wd-min bgd-red btn-block ${loading ? 'disabled-lt' : ''}`}>
                                                                { loading ? <span className='gm-loader sm'></span> : <span className='font-satoshibold onwhite fs-14'>Sign In</span>  }
                                                            </Link>
                                                        </div>
                                                    </div>


                                                </>
                                            }

                                            {
                                                step === 1 &&
                                                <>
                                                    
                                                    {/* <Message
                                                        title="Successful!"
                                                        displayTitle={false}
                                                        message={'Category saved successfully'}
                                                        action={closeX}
                                                        status="success"
                                                        lottieSize={200}
                                                        loop={false}
                                                        actionType="action"
                                                        buttonText='Okay'
                                                        setBg={false}
                                                        bgColor={'#fefefe'}
                                                        buttonPosition={'inside'}
                                                        slim={false}
                                                    /> */}

                                                </>
                                            }

                                        </TabPanel>

                                        <TabPanel tabIndex={0}>

                                            {

                                                step === 0 &&
                                                <>

                                                    <Alert type={alert.type} show={alert.show} message={alert.message} />

                                                    <div className='form-row mrgb0 mrgt'>
                                                        <div className='col'>
                                                            <label className='mrgb0 font-satoshimedium onwhite fs-13'>Your username</label>
                                                            <input 
                                                            defaultValue={''}
                                                            onChange={(e) => { setRegisterData({ ...registerData, username: e.target.value }) }}
                                                            className='form-control mlg fs-14 font-satoshi onwhite'
                                                            placeholder='yourusername'
                                                            type='email' />
                                                        </div>
                                                    </div>

                                                    <div className='form-row mrgb0 mrgt'>
                                                        <div className='col'>
                                                            <label className='mrgb0 font-satoshimedium onwhite fs-13'>Your email</label>
                                                            <input 
                                                            defaultValue={''}
                                                            onChange={(e) => { setRegisterData({ ...registerData, email: e.target.value }) }}
                                                            className='form-control mlg fs-14 font-satoshi onwhite'
                                                            placeholder='you@example.com'
                                                            type='email' />
                                                        </div>
                                                    </div>

                                                    <div className='form-row mrgb1'>
                                                        <div className='col'>
                                                            <label className='mrgb0 font-satoshimedium onwhite fs-13'>Your password</label>
                                                            <input 
                                                            defaultValue={''}
                                                            onChange={(e) => { setRegisterData({ ...registerData, password: e.target.value }) }}
                                                            className='form-control mlg fs-14 font-satoshi onwhite'
                                                            placeholder='Type here'
                                                            type='password' />
                                                        </div>
                                                    </div>

                                                    <div className='form-row'>
                                                        <div className='col'>
                                                            <Link 
                                                            href={''} 
                                                            onClick={(e) => register(e)} 
                                                            className={`btn md wd-min bgd-red btn-block ${loading ? 'disabled-lt' : ''}`}>
                                                                { loading ? <span className='gm-loader sm'></span> : <span className='font-satoshibold onwhite fs-14'>Sign Up</span>  }
                                                            </Link>
                                                        </div>
                                                    </div>


                                                </>
                                            }

                                            {
                                                step === 1 &&
                                                <>
                                                    
                                                    {/* <Message
                                                        title="Successful!"
                                                        displayTitle={false}
                                                        message={'Category saved successfully'}
                                                        action={closeX}
                                                        status="success"
                                                        lottieSize={200}
                                                        loop={false}
                                                        actionType="action"
                                                        buttonText='Okay'
                                                        setBg={false}
                                                        bgColor={'#fefefe'}
                                                        buttonPosition={'inside'}
                                                        slim={false}
                                                    /> */}

                                                </>
                                            }

                                        </TabPanel>

                                    </Tabs>
                                </form>

                            </div>

                        </div>

                    </div>

                </Modal.Body>

            </Modal>

        </>
    )

}

export default AuthModal