import React, { Component } from 'react'
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import default_dp from '../default_dp.jpg'
import { Modal, Button, Card, Row, Col } from 'react-bootstrap'

export default class Movies extends Component {
    constructor() {
        super();
        this.state = {
            parr: [1],
            currPage: 1,
            movies: [],
            favourites: [],
            show: false,
            currMovie: '',
            cast: [],
            watchproviders: []
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
        // console.log(data)
        // console.log(res)
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
        // console.log(oldData)
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
            currMovie: "",
            watchproviders: []
        })
    }
    handleShow = (movieObj) => {
        this.setState({
            show: true,
            currMovie: movieObj
        }, this.getCast)
    }
    getCast = async () => {
        let url = `https://api.themoviedb.org/3/${this.state.currMovie.media_type}/${this.state.currMovie.id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;
        let providerurl = `https://api.themoviedb.org/3/${this.state.currMovie.media_type}/${this.state.currMovie.id}/watch/providers?api_key=${process.env.REACT_APP_API_KEY}`
        // console.log(url)
        const res = await axios.get(url)
        let data = (res.data.cast)
        // console.log(data)
        const res1 = await axios.get(providerurl)
        let provider = res1.data.results.IN;
        console.log(provider)
        let newa = []
        if (provider == null) {
            newa = [null]
        }
        else if ('rent' in provider) {
            console.log('rent true')
            newa = JSON.parse(JSON.stringify(provider['rent']))
        }
        else if ('flatrate' in provider) {
            console.log('flatrate true')
            newa = JSON.parse(JSON.stringify(provider['flatrate']))
        }
        else if ('buy' in provider) {
            console.log('buy true')
            newa = JSON.parse(JSON.stringify(provider['buy']))
        }
        else {
            console.log('else')
            newa = [null]
        }
        // console.log()
        this.setState({
            cast: [...data],
            watchproviders: [...newa]
        })
    }
    render() {
        let genreids = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
        let genretvids = { 10759: 'Action & Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 10762: 'Kids', 9648: 'Mystery', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi & Fantasy', 10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics', 37: 'Western' };
        let currgen = ''
        let currlang = ''
        if (this.state.currMovie != '') {
            if (this.state.currMovie.media_type == 'tv') {
                currgen = this.state.currMovie.genre_ids.map((gen) => genretvids[gen]).toString()
            }
            else {
                currgen = this.state.currMovie.genre_ids.map((gen) => genreids[gen]).toString()
            }
            currlang = (this.state.currMovie.original_language).toUpperCase()
        }
        return (
            <div style={{marginTop:'-28px'}}>
                {this.state.movies.length == 0 ? <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span></div> :
                    <div >
                        <h1 className='text-center'><strong>Trending Of The Week</strong></h1>
                        <div className='movies-list'>
                            {
                                this.state.movies.map((movieObj) => (

                                    <div key={movieObj.id} className="card movies-card">
                                        <img src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} onClick={() => this.handleShow(movieObj)} alt={movieObj.title} className="card-img-top movies-img" />
                                        {/* <div className="card-body"> */}
                                        <h5 className="card-title movies-title">{movieObj.media_type == 'tv' ? `${movieObj.name} (TV Show)` : `${movieObj.original_title} (Movie)`}</h5>
                                        {/* <p className="card-text movies-text">{movieObj.overview}</p> */}

                                        {/* </div> */}
                                    </div>

                                ))
                            }
                        </div>
                        <Modal show={this.state.show} onHide={this.handleClose} size="lg"
                            aria-labelledby="contained-modal-title-vcenter"
                            centered >
                            <Modal.Header closeButton >
                                <Modal.Title id="contained-modal-title-vcenter">{this.state.currMovie.media_type == 'tv' ? `${this.state.currMovie.name}` : `${this.state.currMovie.original_title}`}</Modal.Title>
                                <br />
                                <Button variant="primary" onClick={() => this.handleFavourite(this.state.currMovie)} className="btn-modal-right">
                                    {(this.state.favourites.includes(this.state.currMovie.id)) ? "Remove from Favourites" : "Add To Favourites"}

                                </Button>
                            </Modal.Header>
                            <Modal.Body style={{ padding: '1rem' }}>
                                <table className="table table-hover table-bordered" >
                                    <tbody className='align-middle'>
                                        <tr >
                                            <th >Title: </th>
                                            <td >{this.state.currMovie.media_type == 'tv' ? `${this.state.currMovie.name}` : `${this.state.currMovie.original_title}`}</td>
                                            <td rowSpan='2' style={{ width: '33%' }} ><img src={`https://image.tmdb.org/t/p/original${this.state.currMovie.backdrop_path}`} className='modal-cover-image' alt={this.state.currMovie.title} /></td>
                                        </tr>
                                        <tr>
                                            <th >Media Type: </th>
                                            <td >{this.state.currMovie.media_type == 'tv' ? "TV Show" : "Movie"}</td>

                                        </tr>

                                        <tr >
                                            <th >Genre: </th>
                                            <td colSpan='2'>{currgen}
                                            </td>
                                        </tr>
                                        <tr >
                                            <th >Overview: </th>
                                            <td colSpan='2' >{this.state.currMovie.overview}</td>
                                        </tr>
                                        <tr>
                                            <th>
                                                Rating:
                                            </th>
                                            <td colSpan='3' style={{display:'flex'}}> <ReactStars 
                                                count={5}
                                                size={20}
                                                edit={false}
                                                value={Math.round(this.state.currMovie.vote_average)/2}
                                                isHalf={true}
                                                activeColor="#ffd700"
                                            /> <div style={{marginLeft: '0.4rem', marginTop: '0.2rem'}}>({Math.round(this.state.currMovie.vote_average)/2})</div> </td>
                                        </tr>
                                        <tr >
                                            <th >Language: </th>
                                            <td colSpan='2'>{currlang}</td>
                                        </tr>
                                        <tr >
                                            <th >{this.state.currMovie.media_type == 'tv' ? "First Air Date: " : "Release Date: "}</th>
                                            <td colSpan='2'>{new Date(this.state.currMovie.media_type == 'tv' ? this.state.currMovie.first_air_date : this.state.currMovie.release_date).toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                                        </tr>
                                        <tr>
                                            <th>Watch Providers: </th>
                                            <td colSpan='2'>{this.state.watchproviders[0] == null ? "Currently Not Available To Stream In India" : this.state.watchproviders.map((obj) => (<>
                                                <img src={`https://image.tmdb.org/t/p/w45${obj.logo_path}`} alt={obj.provider_name} title={obj.provider_name} style={{ marginLeft: '0.3rem', marginRight: '0.3rem' }} />
                                                <small>{obj.provider_name}</small>
                                            </>
                                            ))}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div >
                                    <h3>Cast : </h3>

                                    <Row xs={2} md={3} lg={4} className="g-4" style={{ marginTop: '0.1rem', height: '62vh', overflowY: 'scroll' }}>
                                        {this.state.cast.map((castx) => (
                                            <Col key={castx.order}>
                                                <Card>
                                                    <Card.Img variant="top" src={castx.profile_path == null ? default_dp : `https://image.tmdb.org/t/p/w154/${castx.profile_path}`} />
                                                    <Card.Body>
                                                        <Card.Title>{castx.name}</Card.Title>
                                                        <Card.Text>
                                                            {castx.character}
                                                        </Card.Text>
                                                    </Card.Body>
                                                </Card>
                                            </Col>
                                        ))}
                                    </Row>

                                </div>
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

            </div>
        )
    }
}
