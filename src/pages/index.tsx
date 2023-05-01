import React, { useEffect, useState, useContext } from 'react'
import Link from 'next/link'
import body from '../helpers/body'
import storage from '../helpers/storage'
import Navbar from '@/components/partials/Navbar'
import Axios from 'axios'
import MovieContext from '@/context/movie/movieContext'
import { IMovieContext } from '@/utils/types.util'
import Movie from '@/components/movies/Movie'

const Home = () => {

    const movieContext = useContext<IMovieContext>(MovieContext)
    const [search, setSerach] = useState({
        key: '',
        type: 'title'
    })

    const [filter, setFilter] = useState({
        brand: '',
        year: '',
        genre: ''
    })

    useEffect(() => {

        body.changeBackground('bg-brand-black')

        if(body.isArrayEmpty(movieContext.movies)){
            movieContext.getAllMovies(30, 1)
        }

    }, [])

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
                limit: 20, page: 1 
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
                title: filter.brand,
                brand: filter.brand,
                genre: filter.genre,
                year: filter.year,
            }, 
            limit: 20, 
            page: 1 
        })
    }

    return (
        <>
            <Navbar isFixed={true} />

            <section className='section pdt2 pdb2'>

                <div className='container'>

                    <div className='row'>

                        <div className='col-md-7 mx-auto ui-text-center'>

                            <h1 className='font-satoshibold fs-35 mrgb onwhite'>ETAP Movies</h1>
                            <p className='font-satoshi fs-15 onwhite'>Find amazing and exciting movies for your persue.</p>

                        </div>

                    </div>

                </div>

            </section>

            <section className='section'>

                <div className='container'>

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

                                <div className='col-md-2'>

                                    <div className='pdr2'>

                                        <form className='form'>

                                            <div className='mrgb2'>

                                                <h3 className='font-satoshimedium onwhite mrgb1 fs-15'>Filter by genres</h3>

                                                <div className='pill-list'>
                                                    <Link onClick={(e) => toggleFilter(e, 'genre', 'superhero')} href={''} className='pill'>
                                                        <span className='font-satoshi fs-13' style={{  color: '#9a9fff' }}>Superhero</span>
                                                        { filter.genre === 'superhero' && <span className='fe fe-check fs-12 onwhite ml-auto'></span> }
                                                    </Link>
                                                    <Link onClick={(e) => toggleFilter(e, 'genre', 'action')} href={''} className='pill'>
                                                        <span className='font-satoshi fs-13' style={{  color: '#9a9fff' }}>Action</span>
                                                        { filter.genre === 'action' && <span className='fe fe-check fs-12 onwhite ml-auto'></span> }
                                                    </Link>
                                                </div>

                                            </div>

                                            <div className='mrgb2'>
                                                
                                                <h3 className='font-satoshimedium onwhite mrgb1 fs-15'>Filter by brands</h3>

                                                <div className='pill-list'>
                                                    <Link onClick={(e) => toggleFilter(e, 'brand', 'marvel')} href={''} className='pill'>
                                                        <span className='font-satoshi fs-13' style={{  color: '#9a9fff' }}>Marvel</span>
                                                        { filter.brand === 'marvel' && <span className='fe fe-check fs-12 onwhite ml-auto'></span> }
                                                    </Link>
                                                    <Link onClick={(e) => toggleFilter(e, 'brand', 'dc studio')} href={''} className='pill'>
                                                        <span className='font-satoshi fs-13' style={{  color: '#9a9fff' }}>DC Studio</span>
                                                        { filter.brand === 'dc studio' && <span className='fe fe-check fs-12 onwhite ml-auto'></span> }
                                                    </Link>
                                                </div>

                                            </div>

                                            <div className='mrgb2'>
                                                
                                                <h3 className='font-satoshimedium onwhite mrgb1 fs-15'>Filter by year</h3>

                                                <div className='pill-list'>
                                                    <Link onClick={(e) => toggleFilter(e, 'year', '2011')} href={''} className='pill'>
                                                        <span className='font-satoshi fs-13' style={{  color: '#9a9fff' }} >2011</span>
                                                        { filter.year === '2011' && <span className='fe fe-check fs-12 onwhite ml-auto'></span> }
                                                    </Link>
                                                    <Link onClick={(e) => toggleFilter(e, 'year', '2022')} href={''} className='pill'>
                                                        <span className='font-satoshi fs-13' style={{  color: '#9a9fff' }}>2022</span>
                                                        { filter.year === '2022' && <span className='fe fe-check fs-12 onwhite ml-auto'></span> }
                                                    </Link>
                                                </div>

                                            </div>

                                            <Link 
                                            href={''} 
                                            onClick={(e) => filterMovies(e)} 
                                            className={`btn sm wd-min bgd-disable font-satoshimedium onwhite fs-12 ${(filter.brand || filter.genre || filter.year) ? '' : 'disabled-lt' }`}>Apply Filter</Link>

                                        </form>

                                    </div>


                                </div>

                                <div className='col-md-10'>

                                    <div className='pdl3'>

                                    <form className='search-box form'>

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

                                                <Link href={''} onClick={(e) => searchMovies(e)} 
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
                                            <Link href={''} className='link-round sm' style={{ backgroundColor: '#3d4687' }}>
                                                <span className='fe fe-x fs-15 onwhite'></span>
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
                                                        />
                                                    
                                                    </>
                                                    )

                                                }
                                            
                                            </>
                                        }

                                    </div>

                                    </div>

                                </div>

                            </div> 
                        
                        </>
                    }

                </div>

            </section>

        </>
    )

}

export default Home;