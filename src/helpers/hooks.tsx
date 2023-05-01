import React, { useEffect, useContext} from 'react'
import { useRouter } from 'next/router';
import Axios from 'axios';
import storage from './storage';
import body from './body';
import Cookies from 'universal-cookie';
import MovieContext from '@/context/movie/movieContext';
import { IMovieContext } from '@/utils/types.util';


const logout = async () => {
    const cookie = new Cookies();

    storage.clearAuth();
    localStorage.clear();

    // remove cookies
    cookie.remove('token');
    cookie.remove('userType');

    await Axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,{}, storage.getConfig());
}

export function useNetworkDetect(){

    
    const toggleNetwork = (e: any) => {
        
    }

    useEffect(() => {

        window.addEventListener(`offline`, toggleNetwork, false);
        window.addEventListener(`online`, () => { }, false);

    }, [])

}

export const usePageRedirect = (types: Array<string>) => {

    const movieContext = useContext<IMovieContext>(MovieContext)

    const navigate = useRouter();
    const cookie = new Cookies();

    const ut = cookie.get("userType");

    useEffect(() => {
        fireRedirect()
    }, [])

    const fireRedirect = async () => {

        if(!storage.checkToken() && !storage.checkUserID()){
            navigate.push('/');
            await logout()
        }else if(ut === '' || ut === undefined || ut === null){
            navigate.push('/');
            await logout()
        }else if(types.includes(ut) === false){
            navigate.push('/login');
            await logout()
        }else if(types.includes(ut) === true){

            movieContext.setUserType(ut);

            if(ut === 'superadmin'){

                if(body.isArrayEmpty(movieContext.movies)){
                    movieContext.getMovies(20, 1)
                }
                
            }else{

                if(body.isArrayEmpty(movieContext.movies)){
                    movieContext.getUserMovies(20, 1)
                }
                
            }

            if(body.isObjectEmpty(movieContext.user)){
                movieContext.getUser()
            }

            if(body.isArrayEmpty(movieContext.brands)){
                movieContext.getBrands()
            }

            if(body.isArrayEmpty(movieContext.genres)){
                movieContext.getGenres()
            }

        }

    }

}
