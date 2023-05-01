import React, { useEffect, useContext, useState, useRef } from 'react'
import Link from 'next/link'
import DashboardLayout from '@/components/layouts/Dashboard'

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import storage from '@/helpers/storage';
import body from '@/helpers/body';
import MovieContext from '@/context/movie/movieContext';
import { IMovieContext } from '@/utils/types.util';
import Movie from '../../components/movies/Movie'
import MoviePanel from '../../components/movies/MoviePanel'
import Alert from '@/components/partials/Alert';
import Axios from 'axios';


const Dashboard = () => {

    const imgRef = useRef<any>(null)

    const movieContext = useContext<IMovieContext>(MovieContext);

    const [loading, setLoading] = useState<boolean>(false)
    const [animate, setAnimate] = useState(false)
    const [showPanel, setShowPanel] = useState(false)
    const [movie, setMovie] = useState<any>({})
    const [other, setOther] = useState<any>({
        genre: '',
        brand: ''
    })
    const [search, setSerach] = useState({
        key: '',
        type: 'title'
    })

    const [filter, setFilter] = useState({
        brand: '',
        year: '',
        genre: '',
        title: ''
    })

    const [alert, setAlert] = useState({
        type: '',
        show: false,
        message: ''
    });

    const [newMovie, setNewMovie] = useState({
        title: '',
        genre: '',
        brand: '',
        year: '',
        thumbnail: '',
        description: ''
    })

    useEffect(() => {

    }, [])

    const browseFile = (e: any) => {
        if (e) { e.preventDefault() }

        if (e.target.files && e.target.files[0]) {

            if (e.target.files[0].size > 5000000) {
                setAlert({ ...alert, type: "danger", show: true, message: 'file size cannot be greater than 5MB' })
                setTimeout(() => {
                    setAlert({ ...alert, show: false })
                }, 2500);
            }

            getFileSource(e.target.files[0])

        }
    }

    const getFileSource = (file: any) => {

        let reader = new FileReader()

        reader.onloadend = (e: any) => {

            setNewMovie({ ...newMovie, thumbnail: e.target.result })

        }

        reader.readAsDataURL(file)
    }

    const openDialogue = (e: any) => {

        if (e) { e.preventDefault() }
        
        imgRef.current.click()
    }

    const configTab = (e:any, val:any) => {

        if(e) { e.preventDefault(); }
        storage.keepLegacy('dboard-tab', val.toString())
    }

    const togglePanel = (e: any, d: any, t: string) => {
        if(e) e.preventDefault();

        if(t === 'open'){

            setShowPanel(!showPanel);
        
            setTimeout(() => {
                setAnimate(!animate);
            }, 130)
        }

        if(t === 'close'){
            setAnimate(!animate);
        
            setTimeout(() => {
                setShowPanel(!showPanel);
            }, 100)
        }

        setMovie(d);
        
    }

    const toggleSearchType = (e: any) => {

        if(e.target.checked){
            setSerach({ ...search, key: e.target.value })
        }

    }

    const searchMovies = (e: any) => {

        if(e){ e.preventDefault() }
        
        if(!search.key){
            movieContext.setSearch({ error: true, message: 'Enter search keyword', data: [] })
        }else{
            movieContext.searchData({ 
                type: search.type, 
                movie: {
                    title: search.type === 'title' ? search.key : '',
                    genre: search.type === 'genre' ? search.key : ''
                }, 
                limit: 9999, page: 1 
            })
        }

    }

    const toggleFilter = (e: any, type: string, val: string) => {

        if(e){ e.preventDefault() }

        if(type === 'genre'){
            if(filter.genre === val){
                setFilter({ ...filter, genre: '' })
            }else{
                setFilter({ ...filter, genre: val })
            }
        }

        if(type === 'brand'){

            if(filter.brand === val){
                setFilter({ ...filter, brand: '' })
            }else{
                setFilter({ ...filter, brand: val })
            }
            
        }

        if(type === 'year'){

            if(filter.year === val){
                setFilter({ ...filter, year: '' })
            }else{
                setFilter({ ...filter, year: val })
            }
        }

    }

    const filterMovies = (e: any) => {

        if(e){ e.preventDefault() }
        
        movieContext.filterData({ 
            type: 'title',
            movie: {
                title: filter.title,
                brand: filter.brand,
                genre: filter.genre,
                year: filter.year,
            }, 
            limit: 9999, 
            page: 1 
        })
    }

    const clearSearch = (e: any) => {
        if(e) { e.preventDefault() }
        movieContext.setSearch({ error: false, message: '', data: [] })
        setFilter({ ...filter, title: '', brand: '', year: '', genre: '' })
    }

    const pagiPrev = (e: any) => {

        if (e) { e.preventDefault() }
        movieContext.getAllMovies(movieContext.pagination.prev.limit, movieContext.pagination.prev.page);
    }

    const pagiNext = (e: any) => {

        if (e) { e.preventDefault() }
        console.log(movieContext.pagination)
        movieContext.getAllMovies(movieContext.pagination.next.limit, movieContext.pagination.next.page);
    }

    const calculatePage = () => {

        let result: number = 0;

        if(movieContext.pagination && body.isObjectEmpty(movieContext.pagination) === false){

            if(movieContext.pagination.next && !movieContext.pagination.prev){
                result = movieContext.pagination.next.page - 1;
            }else if(!movieContext.pagination.next && movieContext.pagination.prev){
                result = movieContext.pagination.prev.page + 1;
            }else if(movieContext.pagination.next && movieContext.pagination.prev){
                result = movieContext.pagination.next.page - 1;
            }

        }else{
            result = 1;
        }

        return result

    }


    const addNewMovie = async (e: any) => {

        if (e) { e.preventDefault() }

        if (!newMovie.title && !newMovie.genre && !newMovie.brand && !newMovie.year) {
            setAlert({ ...alert, type: "danger", show: true, message: 'All fields are required' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 2500)
        } else if (!newMovie.title ) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Title is required' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 2500)
        } else if (!newMovie.genre ) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Genre is required' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 2500)
        } else if (!newMovie.brand ) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Brand is required' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 2500)
        } else if (!newMovie.year ) {
            setAlert({ ...alert, type: "danger", show: true, message: 'Year is required' })
            setTimeout(() => {
                setAlert({ ...alert, show: false });
            }, 2500)
        }else {

            setLoading(true);

            await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/movies`, { ...newMovie }, storage.getConfigWithBearer())
            .then(async (resp) => {

                if (resp.data.error === false && resp.data.status === 200) {

                    if(movieContext.getUserType() === 'superadmin'){
                        movieContext.getMovies(20, 1)
                    }else{
                        movieContext.getUserMovies(20, 1)
                    }

                    movieContext.getBrands()
                    movieContext.getGenres()

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
            <DashboardLayout pageTitle={''}>

                <section className='section'>

                    <div className='container'>

                        <div className='ui-text-center mrgt2'>
                            <h1 className='font-satoshimedium fs-20 onwhite'>Your Dashboard</h1>
                        </div>

                        <div className='ui-separate'></div>

                        <Tabs className={'dboard-tab'} defaultIndex={0}>

                            <TabList>
                                <Tab onClick={(e) => { configTab(e, 0); }}>My Movies</Tab>
                                <Tab onClick={(e) => { configTab(e, 1); }}>New Movie</Tab>
                            </TabList>

                            <TabPanel tabIndex={0}>

                                {
                                    movieContext.loading &&
                                    <>
                                        <div className="empty-box xmd" style={{ backgroundColor: '#090724' }}>

                                            <div className="ui-text-center">
                                                <div className="row">
                                                    <div className="col-md-10 mx-auto">
                                                        <span className="gmd-loader"></span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </>
                                }

                                {
                                    !movieContext.loading &&
                                    <>
                                    
                                        <div className='row'>

                                            <div className='col-md-10 mx-auto'>

                                                <form className='search-box form mrgt2'>

                                                    <div className=''>
                                                        <h3 className='font-satoshimedium onwhite mrgb0 fs-17'>All movies available</h3>
                                                    </div>

                                                    <div className='ml-auto d-flex align-items-center'>
                                                        <div className='search-options d-flex align-items-center'>

                                                            <div className="custom-control custom-radio mt-1">
                                                                <input value={'title'} onChange={(e) => toggleSearchType(e)} defaultChecked={search.type === 'title' ? true: false} type="radio" className="custom-control-input" id="title" name="search-type" />
                                                                <label className="custom-control-label font-satoshimedium fs-13" style={{ color: '#C3C2FB' }} htmlFor="title">
                                                                    <span className='fs-13 ui-relative'>Title</span>
                                                                </label>
                                                            </div>
                                                            <span className='pdl1'></span>
                                                            <div className="custom-control custom-radio mt-1">
                                                                <input value={'genre'} onChange={(e) => toggleSearchType(e)} defaultChecked={search.type === 'genre' ? true: false} type="radio" className="custom-control-input" id="genre" name="search-type" />
                                                                <label className="custom-control-label font-satoshimedium fs-13" style={{ color: '#C3C2FB' }} htmlFor="genre">
                                                                    <span className='fs-13 ui-relative'>Genre</span>
                                                                </label>
                                                            </div>

                                                        </div>

                                                        <div className='search-input d-flex align-items-center'>

                                                            <div className="form-group mrgb0 pdr">
                                                                <input onChange={(e) => { setSerach({ ...search, key: e.target.value }) }} placeholder={`Search ${search.type} here`} type="text" className='form-control lg fs-14 font-satoshi onwhite' />
                                                            </div>

                                                            <Link href={''} onClick={(e) => { movieContext.search.data.length > 0 ? clearSearch(e) : searchMovies(e) }} 
                                                            className={`btn sm wd-min bgd-disable fs-14 ${movieContext.loading ? 'disabled-lt' : ''}`}>
                                                                { movieContext.loading ? <span className='gm-loader sm'></span> : movieContext.search.data.length > 0 ? <span className='fe fe-x fs-17 onwhite'></span> : <span className='font-satoshimedium onwhite fs-14'>Go</span> }
                                                            </Link>

                                                        </div>

                                                    </div>

                                                </form>

                                                {
                                                    movieContext.search.error === true &&
                                                    <div className='ui-text-right pdr2'>
                                                        <span className='onaliz fs-13 font-satoshi'>{ movieContext.search.mesaage }</span>
                                                    </div>
                                                }

                                                {
                                                    movieContext.search.data.length > 0 &&
                                                    <div className='search-clear d-flex align-items-center justify-content-center mrgt2'>
                                                        <Link onClick={(e) => clearSearch(e)} href={''} className='mrgb0 d-flex align-items-center'>
                                                            <span className='link-round sm' style={{ backgroundColor: '#3d4687' }}><i className='fe fe-x fs-15 onwhite'></i></span>
                                                            <span className='font-satoshi fs-13 pdl' style={{ color: '#c4cbff' }}>Clear search and/or filter</span>
                                                        </Link>
                                                    </div>
                                                }

                                                <div className='movies-box'>

                                                    {
                                                        movieContext.movies.length <= 0 &&
                                                        <div className="empty-box xmd" style={{ backgroundColor: '#090724' }}>

                                                            <div className="ui-text-center">
                                                                <div className="row">
                                                                    <div className="col-md-10 mx-auto">
                                                                        <span className="fs-13 onwhite font-satoshi">There are no movies at the moment</span>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    }



                                                    {
                                                        movieContext.movies.length > 0 &&
                                                        <>

                                                            {
                                                                movieContext.search.data.length > 0 &&
                                                                movieContext.search.data.map((movie, index) => 
                                                                <>
                                                                
                                                                    <Movie
                                                                    key={movie.movieId}
                                                                    title={movie.title}
                                                                    brand={movie.brand}
                                                                    year={movie.year}
                                                                    genre={movie.genre}
                                                                    description={movie.description}
                                                                    thumbnail={movie.thumbnail}
                                                                    data={movie}
                                                                    openPanel={togglePanel}
                                                                    />
                                                                
                                                                </>
                                                                )

                                                            }

                                                            {
                                                                movieContext.search.data.length <= 0 &&
                                                                movieContext.movies.map((movie, index) => 
                                                                <>
                                                                
                                                                    <Movie
                                                                    key={movie.movieId}
                                                                    title={movie.title}
                                                                    brand={movie.brand}
                                                                    year={movie.year}
                                                                    genre={movie.genre}
                                                                    description={movie.description}
                                                                    thumbnail={movie.thumbnail}
                                                                    data={movie}
                                                                    openPanel={togglePanel}
                                                                    />
                                                                
                                                                </>
                                                                )

                                                            }
                                                        
                                                        </>
                                                    }

                                                </div>

                                                <div className='pagination mrgt2 mrgb5'>
                                                    <h3 className='font-satoshi onwhite mrgb0 fs-13'>Page {calculatePage()}: Showing { movieContext.count } movies out of { movieContext.total } </h3>
                                                    <div className='nextprev'>
                                                        <Link onClick={(e) => pagiPrev(e)} href={''} className={`link-round smd bgd-disable onwhite ${movieContext.pagination && movieContext.pagination.prev ? '' : 'disabled-lt'}`}><span className='fe fe-chevron-left onwhite fs-15'></span></Link>
                                                        <span className='pdl fs-13 font-satoshi pdr onwhite'>--</span>
                                                        <Link onClick={(e) => pagiNext(e)} href={''} className={`link-round smd bgd-disable onwhite ${movieContext.pagination && movieContext.pagination.next ? '' : 'disabled-lt'}`}><span className='fe fe-chevron-right onwhite fs-15'></span></Link>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </>
                                }

                            </TabPanel>

                            <TabPanel tabIndex={1}>

                                <form className='form' onSubmit={(e) => { e.preventDefault() }}>

                                    <div className='row mrgt4'>

                                        <div className='col-md-5 mx-auto'>

                                            <Alert type={alert.type} show={alert.show} message={alert.message} />

                                            <div className='movie-banner mrgb1 ui-full-bg-norm ui-bg-center ui-relative' 
                                            style={{ backgroundImage: `url("${newMovie.thumbnail ? newMovie.thumbnail : '../../../images/assets/movietar.png'}")` }}>
                                                <input onChange={(e) => browseFile(e)} ref={imgRef} type="file" accept='image/*' className='ui-hide' name="course-cover" id="course-cover" />
                                                <Link onClick={(e) => openDialogue(e)} href={''} className='link-round smd ui-absolute' style={{ top: '1rem', right: '1rem' }}>
                                                    <span className='fe fe-edit-2 fs-16 onwhite'></span>
                                                </Link>
                                            </div>

                                            <div className='form-row mrgb'>
                                                <div className='col'>
                                                    <label className='mrgb0 font-satoshimedium onwhite fs-13'>Movie Title *</label>
                                                    <input 
                                                    defaultValue={''}
                                                    onChange={(e) => { setNewMovie({ ...newMovie, title: e.target.value }) }}
                                                    className='form-control mlg fs-14 font-satoshi onwhite'
                                                    placeholder='Ex. Spiderman Far Away From Home'
                                                    type='text' />
                                                </div>
                                            </div>

                                            <label className='mrgb0 font-satoshimedium onwhite fs-13'>Movie Genre *</label>
                                            <div className='form-row mrgb'>
                                                <div className='col'>
                                                    <select 
                                                    onChange={(e) => { setNewMovie({ ...newMovie, genre: e.target.value }); setOther({ ...other, genre: e.target.value }) }}
                                                    className='form-control mlg fs-14 font-satoshi onwhite'>
                                                        <option value={''} selected>Choose Genre</option>
                                                        {
                                                            movieContext.genres.length > 0 &&
                                                            movieContext.genres.map((genre, index) => 
                                                                <>
                                                                <option key={genre.id} value={genre.name}>{ body.captialize(genre.name) }</option>
                                                                </>
                                                            )
                                                        }
                                                        <option value={'other'}>Other</option>
                                                    </select>
                                                </div>

                                                <div className={`col ${other.genre === 'other' ? '' : 'disabled'}`}>
                                                    <input 
                                                    defaultValue={''}
                                                    onChange={(e) => { setNewMovie({ ...newMovie, genre: e.target.value }) }}
                                                    className='form-control mlg fs-14 font-satoshi onwhite'
                                                    placeholder='Ex. Action'
                                                    type='text' />
                                                </div>
                                            </div>

                                            <label className='mrgb0 font-satoshimedium onwhite fs-13'>Movie Brand *</label>
                                            <div className='form-row mrgb'>
                                                <div className='col'>
                                                    <select 
                                                    onChange={(e) => { setNewMovie({ ...newMovie, brand: e.target.value });  setOther({ ...other, brand: e.target.value }) }}
                                                    className='form-control mlg fs-14 font-satoshi onwhite'>
                                                        <option value={''} selected>Choose Brand</option>
                                                        {
                                                            movieContext.brands.length > 0 &&
                                                            movieContext.brands.map((brand, index) => 
                                                                <>
                                                                <option key={brand.id} value={brand.name}>{ body.captialize(brand.name) }</option>
                                                                </>
                                                            )
                                                        }
                                                        <option value={'other'}>Other</option>
                                                    </select>
                                                </div>

                                                <div className={`col ${other.brand === 'other' ? '' : 'disabled'}`}>
                                                    <input 
                                                    defaultValue={''}
                                                    onChange={(e) => { setNewMovie({ ...newMovie, brand: e.target.value }) }}
                                                    className='form-control mlg fs-14 font-satoshi onwhite'
                                                    placeholder='Ex. DC Studio'
                                                    type='text' />
                                                </div>
                                            </div>

                                            <div className='form-row mrgb'>
                                                <div className='col'>
                                                    <label className='mrgb0 font-satoshimedium onwhite fs-13'>Movie Year *</label>
                                                    <input 
                                                    defaultValue={''}
                                                    onChange={(e) => { setNewMovie({ ...newMovie, year: e.target.value.toString() }) }}
                                                    className='form-control mlg fs-14 font-satoshi onwhite'
                                                    placeholder='Ex. 2023'
                                                    type='number' />
                                                </div>
                                            </div>

                                            <div className='form-row mrgb2'>
                                                <div className='col'>
                                                    <label className='mrgb0 font-satoshimedium onwhite fs-13'>Movie Description</label>
                                                    <textarea 
                                                    defaultValue={''}
                                                    onChange={(e) => { setNewMovie({ ...newMovie, description: e.target.value }) }}
                                                    className='form-control xlg fs-14 font-satoshi onwhite'
                                                    placeholder='Type here' />
                                                </div>
                                            </div>

                                            <Alert type={alert.type} show={alert.show} message={alert.message} />

                                            <div className='form-row'>
                                                <div className='col ui-text-center'>
                                                    <Link 
                                                    href={''} 
                                                    onClick={(e) => addNewMovie(e)} 
                                                    className={`btn md wd-min bgd-red stretch ${loading ? 'disabled-lt' : ''}`}>
                                                        { loading ? <span className='gm-loader sm'></span> : <span className='font-satoshibold onwhite fs-14'>Add Movie</span>  }
                                                    </Link>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </form>

                                <div className='ui-separate'></div>
                                <div className='ui-separate'></div>

                            </TabPanel>


                        </Tabs>

                    </div>

                </section>

                <MoviePanel
                show={showPanel}
                display={'details'}
                animate={animate}
                close={togglePanel}
                data={movie}
                size={'xmd'}
                />

            </DashboardLayout>
        </>
    )

}

export default Dashboard;