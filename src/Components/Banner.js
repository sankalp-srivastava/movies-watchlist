import React, { Component } from 'react'
import axios from 'axios';

export default class Banner extends Component {
    constructor() {
        super();
        this.state = {
            movie: [],
            index: 0
        }
    }
    async componentDidMount() {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}`)
        let data = res.data
        this.setState({
            movie: [...data.results].slice(0, 6)
        })
    }

    componentDidUpdate() {
        const delay = 4500;
        this.a = setTimeout(() => this.state.index == this.state.movie.length - 1 ? this.setState({
            index: 0
        }) : this.setState({
            index: this.state.index + 1
        }), delay);
    }
    render() {
        // console.log(this.props)
        console.log(this.a)
        return (
            <>
                {this.state.movie == '' ? <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div> : <>

                    <div className="slideshow">
                        <div className="slideshowslider " style={{ transform: `translate3d(${-this.state.index * 100}%, 0, 0)` }}>
                            {this.state.movie.map((mov, index) => (<div className=" card banner-card slide " key={index}>
                                <img src={`https://image.tmdb.org/t/p/original${mov.backdrop_path}`} alt={mov.title} className="card-img-top banner-img" style={{ objectFit: 'cover' }} />
                                <h1 className="card-title banner-title">{mov.original_title}</h1>
                                <p className="card-text banner-text">{mov.overview}</p></div>))}
                        </div>
                        <div className="slideshowDots">
                            {this.state.movie.map((_, idx) => (
                                <div key={idx} className={`slideshowDot${this.state.index === idx ? " active" : ""}`} onClick={() => {
                                    this.setState({
                                        index: idx
                                    }, clearTimeout(this.a));
                                }}></div>
                            ))}
                        </div>

                    </div>





                </>
                }
            </>
        )
    }
}
