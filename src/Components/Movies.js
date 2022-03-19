import React, { Component } from 'react'
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap'

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            hover: "",
            parr: [1],
            currPage: 1,
            movies: [],
            favourites: [],
            show: false,
            currMovie: ''
        }
    }
    async componentDidMount() {
        // console.log(process.env)
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${this.state.currPage}`)
        let data = res.data
        let fav = JSON.parse(localStorage.getItem('movies') || "[]")
        fav = fav.map((m) => m.id)
        this.setState({
            movies: [...data.results],
            favourites: [...fav]
        })


    }

    changeMovies = async () => {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${this.state.currPage}`)
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
    handleChange = (value) => {
        if (value != this.state.currPage) {
            this.setState({
                currPage: value
            }, this.changeMovies)
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    handleFavourite = (movie) => {
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]")
        if (this.state.favourites.includes(movie.id)) {
            oldData = oldData.filter((m) => m.id != movie.id)
        } else {
            oldData.push(movie)
        }
        localStorage.setItem('movies', JSON.stringify(oldData));
        console.log(oldData)
        this.handleFavouriteState();
    }
    handleFavouriteState() {
        let oldData = JSON.parse(localStorage.getItem('movies') || "[]")
        let temp = oldData.map((m) => m.id)
        this.setState({
            favourites: [...temp]
        })
    }
    handleClose = () => {
        this.setState({
            show: false,
            currMovie: ""
        })
    }
    handleShow = (movieObj) => {
        this.setState({
            show: true,
            currMovie: movieObj
        })
    }

    render() {
        // let movie = movies.results
        return (
            <>
                {this.state.movies.length == 0 ? <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span></div> :
                    <div >
                        <h1 className='text-center'><strong>Trending Of The Week</strong></h1>
                        <div className='movies-list'>
                            {
                                this.state.movies.map((movieObj) => (

                                    <div key={movieObj.id} className="card movies-card" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: "" })}>
                                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} onClick={() => this.handleShow(movieObj)} alt={movieObj.title} className="card-img-top movies-img" />
                                        {/* <div className="card-body"> */}
                                        <h5 className="card-title movies-title">{movieObj.media_type == 'tv' ? `${movieObj.original_name} (TV Show)` : `${movieObj.original_title} (Movie)`}</h5>
                                        {/* <p className="card-text movies-text">{movieObj.overview}</p> */}
                                        <div className="button-wrapper" style={{ display: 'flex', width: '100%', justifyContent: "center" }}>
                                            {
                                                this.state.hover == movieObj.id &&
                                                <a className="btn btn-primary movies-button" onClick={() => this.handleFavourite(movieObj)}>{(this.state.favourites.includes(movieObj.id)) ? "Remove from Favourites" : "Add To Favourites"}</a>
                                            }

                                        </div>
                                        {/* </div> */}
                                    </div>

                                ))
                            }
                        </div>
                        <Modal show={this.state.show} onHide={this.handleClose} size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered >
                            <Modal.Header closeButton>
                                <Modal.Title id="contained-modal-title-vcenter">{this.state.currMovie.media_type == 'tv' ? `${this.state.currMovie.original_name}` : `${this.state.currMovie.original_title}`}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{padding:'0',paddingLeft:'1rem'}}>
                                <table class="table table-hover table-bordered" >
                                    <tbody className='align-middle'>
                                        <tr >
                                            <th >Title: </th>
                                            <td >{this.state.currMovie.media_type == 'tv' ? `${this.state.currMovie.original_name}` : `${this.state.currMovie.original_title}`}</td>
                                            <td  rowSpan='2' style={{width:'33%'}} ><img src={`https://image.tmdb.org/t/p/original${this.state.currMovie.backdrop_path}` }className='modal-cover-image' alt={this.state.currMovie.title} /></td>
                                        </tr>
                                        <tr>
                                            <th >Media Type: </th>
                                            <td >{this.state.currMovie.media_type =='tv'? "TV Show":"Movie" }</td>
                                       
                                        </tr>
                                        <tr >
                                            <th >Overview: </th>
                                            <td colSpan='2'>{this.state.currMovie.overview}</td>
                                        </tr>
                                        <tr >
                                            <th >{this.state.currMovie.media_type=='tv'?"First Air Date: ":"Release Date: "}</th>
                                            <td colSpan='2'>{this.state.currMovie.media_type=='tv'?this.state.currMovie.first_air_date:this.state.currMovie.release_date}</td>
                                        </tr>
                                    </tbody>
                                </table>







                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <Button variant="primary" onClick={() => this.handleFavourite(this.state.currMovie)}>
                                    {(this.state.favourites.includes(this.state.currMovie.id)) ? "Remove from Favourites" : "Add To Favourites"}

                                </Button>
                            </Modal.Footer>
                        </Modal>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <nav aria-label="Page navigation example">
                                <ul className="pagination">
                                    <li key='prev' className="page-item"><a className="page-link" onClick={this.handleLeft}>Previous</a></li>
                                    {this.state.parr.map((value) =>
                                        <li key={value} className="page-item"><a className="page-link" onClick={() => this.handleChange(value)}>{value}</a></li>
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
