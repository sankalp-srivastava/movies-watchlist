import { CircularProgress } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { useSwipeable } from 'react-swipeable';

export default function Banner() {
    const [movie,setMovie] = useState(null);
    const [index,setIndex] = useState(0);
    const timeoutRef = useRef(null);

    function resetTimeout(){
        if(timeoutRef.current){
            clearTimeout(timeoutRef.current)
        }
    }

    useEffect(()=>{
        const res = axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}`).then((res)=>{
            let data =[...res.data.results].slice(0,6);
            setMovie(data)
        })
      
    },[])
    useEffect(()=>{
        resetTimeout();
        timeoutRef.current = setTimeout(()=> setIndex((prevIndex)=>
        prevIndex == 5?0:prevIndex+1
        ),4500)
        return ()=>{resetTimeout()};
    },[index]);

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            let nextIndex = index==5?0:index+1
            setIndex(nextIndex)
        },
        onSwipedRight:() => {
            let prevIndex = index==0?5:index-1
            setIndex(prevIndex) 
        },
        delta: 10,                            // min distance(px) before a swipe starts. *See Notes*
        preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
        trackTouch: true,                     // track touch input
        trackMouse: false,                    // track mouse input
        rotationAngle: 0
      });
  return (
          <>
          {movie == null?<div style={{width:'100%',textAlign:'center'}}><CircularProgress/></div>:
       <>

       <div className="slideshow" >
           <div className="slideshowslider " {...handlers} style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}>
               {movie.map((mov, index) => (<div className=" card banner-card slide " key={index}>
                   <img src={`https://image.tmdb.org/t/p/original${mov.backdrop_path}`} alt={mov.title} className="card-img-top banner-img" style={{ objectFit: 'cover' }}  />
                   <h1 className="card-title banner-title">{mov.media_type == 'tv' ? mov.name : mov.title}</h1>
                   <p className="card-text banner-text">{mov.overview}</p></div>))}
           </div>
           <div className="slideshowDots">
               {movie.map((_, idx) => (
                   <div key={idx} className={`slideshowDot${index === idx ? " active" : ""}`} 
                   onClick={()=>setIndex(idx)}></div>
               ))}
           </div>

       </div>





   </>
}</>
  )
}
