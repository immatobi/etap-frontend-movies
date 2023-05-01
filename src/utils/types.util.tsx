export interface IMovieContext{
    movies: Array<any>,
    search: {
        error: boolean,
        mesaage: string,
        data: Array<any>
    }
    total: number,
    count: number,
    pagination: IPagination,
    loading: boolean,
    response: any,
    getAllMovies(limit: number, page: number): void,
    setSearch({ error, message, data }: Partial<ISearchProps>): void,
    searchData({ type, movie, limit, page }: Partial<ISearchProps>): void,
    filterData({ type, movie, limit, page }: Partial<ISearchProps>): void,
    logout(): void,
    setLoading(): void,
    unsetLoading(): void,
}

export interface ISearchProps {
    type: string,
    movie: Partial<{
        title: string,
        brand: string,
        year: string,
        genre: string
    }>,
    limit: number,
    page: number,
    key: string,
    error: boolean,
    message: string,
    data: Array<any>
}

export interface IPagination {
    next: { page: number, limit: number },
	prev: { page: number, limit: number },
}

export interface IDLayoutProps{
    pageTitle: string
}
export interface INavbarProps{
    isFixed: boolean, 
    backgroundColor: string, 
    doScroll: any
    display: string
}

export interface IMovieProps { 
    title: string, 
    genre: string, 
    description: string, 
    brand: string,
    year: string,
    thumbnail: string
}