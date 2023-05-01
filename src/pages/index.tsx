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
        genre: '',
        title: ''
    })

    useEffect(() => {

        body.changeBackground('bg-brand-black')

        if(body.isArrayEmpty(movieContext.movies)){
            movieContext.getAllMovies(3, 1)
        }

        if(body.isArrayEmpty(movieContext.brands)){
            movieContext.getBrands()
        }

        if(body.isArrayEmpty(movieContext.genres)){
            movieContext.getGenres()
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
                title: filter.title,
                brand: filter.brand,
                genre: filter.genre,
                year: filter.year,
            }, 
            limit: 20, 
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

        if(movieContext.pagination){

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

        return result.toString()

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
                                                    {
                                                        movieContext.genres.length > 0 &&
                                                        movieContext.genres.map((genre, index) => 
                                                        <>
                                                            <Link key={index} onClick={(e) => toggleFilter(e, 'genre', genre.name.toLowerCase())} href={''} className='pill'>
                                                                <span className='font-satoshi fs-13' style={{  color: '#9a9fff' }}>{ body.captialize(genre.name) }</span>
                                                                { filter.genre === genre.name.toLowerCase() && <span className='fe fe-check fs-12 onwhite ml-auto'></span> }
                                                            </Link>
                                                        </>
                                                        )
                                                    }
                                                </div>

                                            </div>

                                            <div className='mrgb2'>
                                                
                                                <h3 className='font-satoshimedium onwhite mrgb1 fs-15'>Filter by brands</h3>

                                                <div className='pill-list'>
                                                    {
                                                        movieContext.brands.length > 0 &&
                                                        movieContext.brands.map((brand, index) => 
                                                        <>
                                                            <Link key={index} onClick={(e) => toggleFilter(e, 'brand', brand.name)} href={''} className='pill'>
                                                                <span className='font-satoshi fs-13' style={{  color: '#9a9fff' }}>{ body.captialize(brand.name) }</span>
                                                                { filter.brand === brand.name && <span className='fe fe-check fs-12 onwhite ml-auto'></span> }
                                                            </Link>
                                                        </>
                                                        )
                                                    }
                                                </div>

                                            </div>

                                            {/* <div className='mrgb2'>
                                                
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

                                            </div> */}

                                            <Link 
                                            href={''} 
                                            onClick={(e) => { movieContext.search.data.length > 0 ? clearSearch(e) : filterMovies(e) }} 
                                            className={`btn sm wd-min bgd-disable ${(filter.brand || filter.genre || filter.year) ? '' : 'disabled-lt' }`}>

                                                { movieContext.search.data.length > 0 ? <span className='fe fe-x fs-16 onwhite'></span> : <span className='font-satoshimedium onwhite fs-12'>Apply Filter</span> }

                                            </Link>

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

                                        <div className='pagination'>
                                            <h3 className='font-satoshi onwhite mrgb0 fs-13'>Page {calculatePage()}: Showing { movieContext.count } movies out of { movieContext.total } </h3>
                                            <div className='nextprev'>
                                                <Link onClick={(e) => pagiPrev(e)} href={''} className={`link-round smd bgd-disable onwhite ${movieContext.pagination && movieContext.pagination.prev ? '' : 'disabled-lt'}`}><span className='fe fe-chevron-left onwhite fs-15'></span></Link>
                                                <span className='pdl fs-13 font-satoshi pdr onwhite'>--</span>
                                                <Link onClick={(e) => pagiNext(e)} href={''} className={`link-round smd bgd-disable onwhite ${movieContext.pagination && movieContext.pagination.next ? '' : 'disabled-lt'}`}><span className='fe fe-chevron-right onwhite fs-15'></span></Link>
                                            </div>
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