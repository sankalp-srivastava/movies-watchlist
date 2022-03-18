import React, { Component } from 'react'
export default class Favourite extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            currgen: 'All Genres',
            movies: [],
            currtext: "",
            limit: 5,
            currPage: 1
        }
    }
    componentDidMount() {
        let data = JSON.parse(localStorage.getItem('movies') || "[]")
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let temp = [];
        data.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]])
            }
        }
        )
        temp.sort();
        temp.unshift('All Genres');
        this.setState({
            genres: [...temp],
            movies: [...data]
        })

    }
    handleGenreChange = (genre) => {
        this.setState({
            currgen: genre
        })
    }
    sortTitleAsc = () => {
        let temp = this.state.movies;
        temp.sort(function (a, b) {
            if (a.original_title.toLowerCase() > b.original_title.toLowerCase())
                return -1
            else
                return 1
        })
        this.setState({
            movies: [...temp]
        })
    }
    sortTitleDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (a, b) {
            if (a.original_title.toLowerCase() > b.original_title.toLowerCase())
                return 1
            else
                return -1
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortRatingDesc = () => {
        let temp = this.state.movies;
        temp.sort(function (a, b) {
            return b.popularity - a.popularity
        })
        this.setState({
            movies: [...temp]
        })
    }

    sortRatingAsc = () => {
        let temp = this.state.movies;
        temp.sort(function (a, b) {
            return a.popularity - b.popularity
        })
        this.setState({
            movies: [...temp]
        })
    }
    handlePageChange = (page) => {
        this.setState({
            currPage: page
        })
    }
    handleDelete=(id)=>{
        let newarr = this.state.movies.filter((movieObj)=> movieObj.id != id)
        localStorage.setItem('movies',JSON.stringify(newarr))
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let temp = [];
        newarr.forEach((movieObj) => {
            if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
                temp.push(genreids[movieObj.genre_ids[0]])
            }
        })
        temp.sort();
        temp.unshift('All Genres');
        this.setState({
            genres: [...temp],
            movies: [...newarr]
        })
        
    }
    render() {
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let filterarr = []
        if (this.state.currgen == 'All Genres') {
            filterarr = this.state.movies
        } else {
            filterarr = this.state.movies.filter((movieObj) => genreids[movieObj.genre_ids[0]] == this.state.currgen)
        }

        if (this.state.currtext != '') {
            filterarr = filterarr.filter((movieObj) => {
                let title = movieObj.original_title.toLowerCase();
                return title.includes(this.state.currtext.toLowerCase())
            })
        }
        let pages = Math.ceil(filterarr.length / this.state.limit)
        let pagesArr = [];
        for (let i = 1; i <= pages; i++) {
            pagesArr.push(i)
        }
        let si = (this.state.currPage - 1) * this.state.limit;
        let ei = si + this.state.limit
        filterarr = filterarr.slice(si, ei);
        return (
            <>
                <div className="main">
                    <div className="row">
                        <div className="col-lg-3 col-sm-12">
                            <ul className="list-group favourite-genres">
                                {
                                    this.state.genres.map((gen) => (
                                        this.state.currgen == gen ?
                                            <li className="list-group-item gen-table" style={{ backgroundColor: 'rgba(31, 30, 29,0.9)', color: 'white', fontWeight: 'bold' }}>{gen}</li> :
                                            <li className="list-group-item gen-table" onClick={() => this.handleGenreChange(gen)} >{gen}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="col-lg-9 col-sm-12 favourite-table">
                            <div className="row input-group rounded" >
                                <input type="search" className="form-control rounded col" placeholder="Search Bar" aria-label="Search" aria-describedby="search-addon" value={this.state.currtext} onChange={(e) => this.setState({ currtext: e.target.value })} />
                            </div>
                            <div className="row">
                                <label className="col form-control " style={{textAlign:'center',fontWeight:'bold',backgroundColor:'#e9ecef'}}>No. of rows to display (Default : 5) = </label>
                                <input type="number" className="input-group-text col-2" placeholder='No. of rows to display (Default : 5)' value={this.state.limit} onChange={(e) => {if (e.target.value != '' ){ this.setState({ limit: e.target.value})}}}  style={{position:'relative',left:'-1.4rem',backgroundColor:'white'}} />
                            
                            </div>
                            <div className="row">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col"><i className="fas fa-sort-up up" onClick={this.sortTitleDesc} />Title<i className="fas fa-sort-down down" onClick={this.sortTitleAsc}></i></th>
                                            <th scope="col">Genre</th>
                                            <th scope="col" >Popularity</th>
                                            <th scope="col" colSpan={2} className='text-center' ><i className="fas fa-sort-up up" onClick={this.sortRatingDesc} />Rating<i className="fas fa-sort-down down" onClick={this.sortRatingAsc}></i></th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            filterarr.map((movieObj) => (
                                                <tr>
                                                    <th className='col-6' scope="row"><img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} style={{ width: '5rem' }} /> {movieObj.title}</th>

                                                    {/* <td className='col'>{movieObj.genre_ids.map((genreid) => {
                                                        return `${genreids[genreid]}, `
                                                    })}</td> */}
                                                    <td className='col'>{genreids[movieObj.genre_ids[0]]}</td>
                                                    <td className='col-1'>{movieObj.popularity}</td>
                                                    <td className='col-2 text-center'>{movieObj.vote_average}</td>
                                                    <td className='col-1'><button type="button" className="btn btn-danger" onClick={()=>this.handleDelete(movieObj.id)}>Remove</button></td>
                                                </tr>

                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    {
                                        pagesArr.map((page) => (

                                            <li className="page-item"><a className="page-link" onClick={() => this.handlePageChange(page)} >{page}</a></li>
                                        ))
                                    }

                                </ul>
                            </nav>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
