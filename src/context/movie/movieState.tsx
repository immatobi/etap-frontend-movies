import React, { useReducer } from 'react'
import { useRouter } from 'next/router'
import Cookies from 'universal-cookie';

import Axios, { AxiosResponse } from 'axios';
import storage from '../../helpers/storage'

import MovieContext from './movieContext';
import MovieReducer from './movieReducer';

import {
    GET_MOVIES,
    SET_LOADING,
    UNSET_LOADING,
    SET_PAGINATION_U,
    SET_TOTAL_U,
    SET_PAGINATION,
    SET_TOTAL,
    SET_COUNT,
    SET_RESPONSE,
    SET_SEARCH,
    GET_BRANDS,
    GET_GENRES,
} from "../types";
import { ISearchProps } from '@/utils/types.util';
import { SET_USERTYPE } from '../types';
import { GET_LOGGEDIN_USER } from '../types';

const MovieState = (props: any) => {

    const cookie = new Cookies();

    const exp = new Date(
        Date.now() + 70 * 24 * 60 * 60 * 1000
    )

    const router = useRouter()
    Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const initialState = {
        user: {},
        userType: '',
        movies: [],
        genres: [],
        brands: [],
        search: {
            error: false,
            message: '',
            data: []
        },
        response: {},
        loading: false,
        count: 0,
        _count: 0,
        total: 0,
        _total: 0,
        pagination: {},
        _pagination: {},
    }

    const [state, dispatch] = useReducer(MovieReducer, initialState);

    const logout = async () => {

        storage.clearAuth();
        await localStorage.clear()
        await cookie.remove('token');
        await cookie.remove('userType');

        router.push('/');
        await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,{}, storage.getConfig());
    }

    const getUser = async () => {

        setLoading()
            try {

                await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/${storage.getUserID()}?`, storage.getConfigWithBearer())
                .then((resp) => {

                    dispatch({
                        type: GET_LOGGEDIN_USER,
                        payload: resp.data.data
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.status === 401){
                        logout();
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not get loggedin user ${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        // loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get loggedin user ${err}`)
        
                    }

                    unsetLoading();
                    
                })
                
            } catch (err:any) {
                
                if(err && err.response && err.response.data && err.response.data.status === 401){

                    // logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get loggedin user ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    // loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get loggedin user ${err}`)
    
                }
                
            }

        

    }

    const getAllMovies = async (limit: number, page: number) => {

        const q = `take=${limit && limit !== 0 ? limit : '30'}&page=${page ? page : '1'}&order=asc`

        setLoading()
            try {

                await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/all?${q}`, storage.getConfig())
                .then((resp) => {

                    dispatch({
                        type: GET_MOVIES,
                        payload: resp.data.data
                    });

                    dispatch({
                        type: SET_PAGINATION,
                        payload: resp.data.pagination
                    })
    
                    dispatch({
                        type: SET_TOTAL,
                        payload: resp.data.total
                    });
    
                    dispatch({
                        type: SET_COUNT,
                        payload: resp.data.count
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.status === 401){
                        logout();
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not get movies ${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        // loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get movies ${err}`)
        
                    }

                    unsetLoading();
                    
                })
                
            } catch (err:any) {
                
                if(err && err.response && err.response.data && err.response.data.status === 401){

                    // logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get movies ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    // loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get movies ${err}`)
    
                }
                
            }

        

    }

    const getMovies = async (limit: number, page: number) => {

        const q = `take=${limit && limit !== 0 ? limit : '30'}&page=${page ? page : '1'}&order=asc`

        setLoading()
            try {

                await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies?${q}`, storage.getConfigWithBearer())
                .then((resp) => {

                    dispatch({
                        type: GET_MOVIES,
                        payload: resp.data.data
                    });

                    dispatch({
                        type: SET_PAGINATION,
                        payload: resp.data.pagination
                    })
    
                    dispatch({
                        type: SET_TOTAL,
                        payload: resp.data.total
                    });
    
                    dispatch({
                        type: SET_COUNT,
                        payload: resp.data.count
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.status === 401){
                        logout();
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not get movies ${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        // loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get movies ${err}`)
        
                    }

                    unsetLoading();
                    
                })
                
            } catch (err:any) {
                
                if(err && err.response && err.response.data && err.response.data.status === 401){

                    // logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get movies ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    // loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get movies ${err}`)
    
                }
                
            }

        

    }

    const getUserMovies = async (limit: number, page: number) => {

        const q = `take=${limit && limit !== 0 ? limit : '30'}&page=${page ? page : '1'}&order=asc`

        setLoading()
            try {

                await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/user/${storage.getUserID()}?${q}`, storage.getConfigWithBearer())
                .then((resp) => {

                    dispatch({
                        type: GET_MOVIES,
                        payload: resp.data.data
                    });

                    dispatch({
                        type: SET_PAGINATION,
                        payload: resp.data.pagination
                    })
    
                    dispatch({
                        type: SET_TOTAL,
                        payload: resp.data.total
                    });
    
                    dispatch({
                        type: SET_COUNT,
                        payload: resp.data.count
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.status === 401){
                        logout();
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not get movies ${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        // loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get movies ${err}`)
        
                    }

                    unsetLoading();
                    
                })
                
            } catch (err:any) {
                
                if(err && err.response && err.response.data && err.response.data.status === 401){

                    // logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get movies ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    // loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get movies ${err}`)
    
                }
                
            }

        

    }

    const getBrands = async () => {

        setLoading()
            try {

                await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/brands`, storage.getConfig())
                .then((resp) => {

                    dispatch({
                        type: GET_BRANDS,
                        payload: resp.data.data
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.status === 401){
                        logout();
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not get brands ${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        // loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get brands ${err}`)
        
                    }

                    unsetLoading();
                    
                })
                
            } catch (err:any) {
                
                if(err && err.response && err.response.data && err.response.data.status === 401){

                    // logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get brands ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    // loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get brands ${err}`)
    
                }
                
            }

        

    }

    const getGenres = async () => {

        setLoading()
            try {

                await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/genres`, storage.getConfig())
                .then((resp) => {

                    dispatch({
                        type: GET_GENRES,
                        payload: resp.data.data
                    });

                }).catch((err) => {

                    if(err && err.response && err.response.data && err.response.data.status === 401){
                        logout();
                    }else if(err && err.response && err.response.data){
        
                        console.log(`Error! Could not get genres ${err.response.data}`)
        
                    }else if(err && err.toString() === 'Error: Network Error'){
        
                        // loader.popNetwork();
        
                    }else if(err){
        
                        console.log(`Error! Could not get genres ${err}`)
        
                    }

                    unsetLoading();
                    
                })
                
            } catch (err:any) {
                
                if(err && err.response && err.response.data && err.response.data.status === 401){

                    // logout();
    
                }else if(err && err.response && err.response.data){
    
                    console.log(`Error! Could not get genres ${err.response.data}`)
    
                }else if(err && err.toString() === 'Error: Network Error'){
    
                    // loader.popNetwork();
    
                }else if(err){
    
                    console.log(`Error! Could not get genres ${err}`)
    
                }
                
            }

        

    }

    const searchData = async ({ type, movie, limit, page }: Partial<ISearchProps>) => {

        const q = `type=${type ? type : 'title'}&take=${limit && limit !== 0 ? limit : '30'}&page=${page ? page : '1'}&order=desc`

        let url: string = `${process.env.NEXT_PUBLIC_API_URL}/movies/search?${q}`;

        let data: any = {
            title: movie?.title,
            genre: movie?.genre,
            type: 'search'
        };
        
        setLoading()

        await Axios.post(url, { ...data }, storage.getConfigWithBearer())
        .then((resp) => {

            if (resp.data.error === false && resp.data.status === 200) {

                dispatch({
                    type: SET_SEARCH,
                    payload: { error: false, message: 'success', data: resp.data.data }
                })

                dispatch({
                    type: SET_PAGINATION,
                    payload: resp.data.pagination
                })

                dispatch({
                    type: SET_TOTAL,
                    payload: resp.data.total
                });

                dispatch({
                    type: SET_COUNT,
                    payload: resp.data.count
                });

            }

            unsetLoading()

        }).catch((err) => {

            if (err.response.data) {
                dispatch({
                    type: SET_SEARCH,
                    payload: { error: true, message: err.response.data, data: [] }
                })
            }
            unsetLoading()

        })

    }

    const setSearch = ({ error, message, data }: Partial<ISearchProps>) => {
        dispatch({
            type: SET_SEARCH,
            payload: { error, message, data }
        })
    }

    const filterData = async ({ type, movie, limit, page }: Partial<ISearchProps>) => {

        const q = `type=${type ? type : 'title'}&take=${limit && limit !== 0 ? limit : '30'}&page=${page ? page : '1'}&order=desc`

        let url: string = `${process.env.NEXT_PUBLIC_API_URL}/movies/search?${q}`;

        let data: any = {
            title: movie?.title,
            genre: movie?.genre,
            brand: movie?.brand,
            year: movie?.year,
            type: 'filter'
        };
        
        setLoading()

        await Axios.post(url, { ...data }, storage.getConfigWithBearer())
        .then((resp) => {

            if (resp.data.error === false && resp.data.status === 200) {

                dispatch({
                    type: SET_SEARCH,
                    payload: { error: false, message: 'success', data: resp.data.data }
                })

                dispatch({
                    type: SET_PAGINATION,
                    payload: resp.data.pagination
                })

                dispatch({
                    type: SET_TOTAL,
                    payload: resp.data.total
                });

                dispatch({
                    type: SET_COUNT,
                    payload: resp.data.count
                });
            }

            unsetLoading()

        }).catch((err) => {

            if (err.response.data) {
                dispatch({
                    type: SET_SEARCH,
                    payload: { error: true, message: err.response.data, data: [] }
                })
            }
            unsetLoading()

        })

    }

    const setLoading = () => {
        dispatch({
            type: SET_LOADING
        })
    }

    const unsetLoading = () => {
        dispatch({
            type: UNSET_LOADING,
        })
    }

    const setUserType = (type: string) => {
        dispatch({
            type: SET_USERTYPE,
            payload: type
        })
    }

    const getUserType = (): string => {

        const ut = cookie.get('userType')

        dispatch({
            type: SET_USERTYPE,
            payload: ut
        })

        return ut
    }

    const clearDefault = () => {

        dispatch({
            type: GET_MOVIES,
            payload: []
        })

        dispatch({
            type: SET_SEARCH,
            payload: { error: false, message: '', data: [] }
        })
    }

    return <MovieContext.Provider
    value={{
        user: state.user,
        userType: state.userType,
        movies: state.movies,
        brands: state.brands,
        genres: state.genres,
        search: state.search,
        count: state.count,
        total: state.total,
        pagination: state.pagination,
        response: state.response,
        loading: state.loading,
        getUser,
        getUserType,
        getAllMovies,
        getMovies,
        getUserMovies,
        clearDefault,
        getBrands, 
        getGenres,
        setUserType,
        searchData,
        filterData,
        setSearch,
        logout,
        setLoading,
        unsetLoading
    }}
>
    {props.children}

</MovieContext.Provider>

}

export default MovieState;