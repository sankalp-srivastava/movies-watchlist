import React, { Component } from 'react'
import axios from 'axios';

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: "",
            parr: [1],
            currPage: 1,
            movies: [],
            favourites:[]
        }
    }
    async componentDidMount() {
        // console.log(process.env)
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${this.state.currPage}`)
        let data = res.data
        let fav = JSON.parse(localStorage.getItem('movies') || "[]")
        fav = fav.map((m)=>m.id)
        this.setState({
            movies: [...data.results],
            favourites: [...fav]
        })
        

    }

    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=943f1da70b706b77c610fa62d94e440b&language=en-US&page=${this.state.currPage}`)
        let data = res.data
        console.log(data)
        console.log(res)
        this.setState({
            movies: [...data.results]
        })
    }
    handleLeft = () => {
        if (this.state.currPage != 1) {
            this.setState({
                currPage: this.state.currPage - 1
            }, this.changeMovies)
        }
        window.scrollTo({ top: 0, behavior: 'smooth' })

    }
    handleRight = () => {
        let temparr = []
        for (let i = 1; i <= this.state.parr.length + 1; i++) {
            temparr.push(i)

        }
        this.setState({                 
            parr: [...temparr],
            currPage: this.state.currPage + 1
        }, this.changeMovies)            // because set state is async.so we say change state then call this func

        window.scrollTo({ top: 0, behavior: 'smooth' });

    }
    handleChange=(value)=>{
        if (value != this.state.currPage){
            this.setState({
                currPage:value
            },this.changeMovies)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    handleFavourite=(movie)=>{
        let oldData = JSON.parse(localStorage.getItem('movies')|| "[]")
        if (this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m)=>m.id!=movie.id)
        }else{
            oldData.push(movie)
        }
        localStorage.setItem('movies',JSON.stringify(oldData));
        console.log(oldData)
        this.handleFavouriteState();
    }
    handleFavouriteState(){
        let oldData = JSON.parse(localStorage.getItem('movies')|| "[]")
        let temp = oldData.map((m)=>m.id)
        this.setState({
            favourites:[...temp]
        })
    }

    render() {
        // let movie = movies.results
        return (
            <>
                {this.state.movies.length == 0 ? <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span></div> :
                    <div >
                        <h1 className='text-center'><strong>Trending</strong></h1>
                        <div className='movies-list'>
                            {
                                this.state.movies.map((movieObj) => (
                                    <div key={movieObj.id} className="card movies-card" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: "" })}>
                                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={movieObj.title} className="card-img-top movies-img" />
                                        {/* <div className="card-body"> */}
                                        <h5 className="card-title movies-title">{movieObj.original_title}</h5>
                                        {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                                        <div className="button-wrapper" style={{ display: 'flex', width: '100%', justifyContent: "center" }}>
                                            {
                                                this.state.hover == movieObj.id &&
                                                <a className="btn btn-primary movies-button" onClick={()=>this.handleFavourite(movieObj)}>{(this.state.favourites.includes(movieObj.id))?"Remove from Favourites":"Add To Favourites"}</a>
                                            }

                                        </div>
                                        {/* </div> */}
                                    </div>
                                ))
                            }
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li key='prev'className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                                    {this.state.parr.map((value) =>
                                        <li key={value}className="page-item"><a className="page-link" onClick={()=>this.handleChange(value)}>{value}</a></li>
                                    )}
                                    <li key='next' className="page-item"><a className="page-link" onClick={this.handleRight}>Next/Load More</a></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                }

            </>
        )
    }
}
