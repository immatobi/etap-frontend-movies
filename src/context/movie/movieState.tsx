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
} from "../types";
import { ISearchProps } from '@/utils/types.util';

const MovieState = (props: any) => {

    const cookie = new Cookies();

    const exp = new Date(
        Date.now() + 70 * 24 * 60 * 60 * 1000
    )

    const router = useRouter()
    Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

    const initialState = {
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
        localStorage.clear()
        router.push('/login');
        cookie.remove('token');
        cookie.remove('userType');
        await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,{}, storage.getConfig());
    }

    const getAllMovies = async (limit: number, page: number) => {

        const q = `take=${limit && limit !== 0 ? limit : '30'}&page=${page ? page : '1'}&order=desc`

        setLoading()
            try {

                await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/all?${q}`, storage.getConfig())
                .then((resp) => {

                    dispatch({
                        type: GET_MOVIES,
                        payload: resp.data.data
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

    const getBrands = async (limit: number, page: number) => {

        const q = `take=${limit && limit !== 0 ? limit : '30'}&page=${page ? page : '1'}&order=desc`

        setLoading()
            try {

                await Axios.get(`${process.env.NEXT_PUBLIC_API_URL}/movies/all?${q}`, storage.getConfig())
                .then((resp) => {

                    dispatch({
                        type: GET_MOVIES,
                        payload: resp.data.data
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

    return <MovieContext.Provider
    value={{
        movies: state.movies,
        search: state.search,
        count: state.count,
        total: state.total,
        pagination: state.pagination,
        response: state.response,
        loading: state.loading,
        getAllMovies,
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