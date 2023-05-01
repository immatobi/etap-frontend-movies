export interface IMovieContext{
    user: any,
    userType: string,
    movies: Array<any>,
    brands: Array<any>,
    genres: Array<any>,
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
    getUser(): void,
    getUserType(): string,
    getAllMovies(limit: number, page: number): void,
    getMovies(limit: number, page: number): void,
    getUserMovies(limit: number, page: number): void,
    getBrands(): void,
    getGenres(): void,
    setUserType(type: string): void,
    clearDefault(): void,
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

export interface IPanelBoxProps {
    title: string,
    type: string,
    display: string, 
    show: boolean, 
    close: any, 
    animate: boolean, 
    data: any,
    size: string
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
    thumbnail: string,
    data: any,
    openPanel(e: any, d: any, t: string): void
}

export interface IModalProps{
    isShow: boolean,
    cover: boolean,
    closeModal: any, 
    modalTitle: string | undefined, 
    flattened: boolean, 
    stretch: boolean, 
    slim: string
}

export interface IAuthModal extends IModalProps{
    data: any,
    type: string
}
export interface IAlertProps{
    show: boolean,
    message: string,
    type: string
}
export interface INewMovieModal extends IModalProps{
    data: any,
    type: string
}