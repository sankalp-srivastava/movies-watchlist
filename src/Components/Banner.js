import React, { Component } from 'react'
import axios from 'axios';


export default class Banner extends Component {
    constructor(){
        super();
        this.state={
            movie:[]
        }
    }
    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=943f1da70b706b77c610fa62d94e440b`)
        let data = res.data
        this.setState({
            movie: [...data.results][0]
        })
    }
    render() {
        // console.log(this.props)
        return (
            <>
                {this.state.movie == '' ? <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> :
                    <div className="card banner-card">
                        <img src={`https://image.tmdb.org/t/p/original${this.state.movie.backdrop_path}`}   alt={this.state.movie.title} className="card-img-top banner-img" style={{objectFit: 'cover'}}/>
                            <h1 className="card-title banner-title">{this.state.movie.original_title}</h1>
                            <p className="card-text banner-text">{this.state.movie.overview}</p>
                    </div>
                }
            </>
        )
    }
}
