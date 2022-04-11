import React, { useEffect, useRef, useState } from 'react'
import { useSwipeable } from 'react-swipeable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TrendingIcon from '../Icons/trending.png';
import CameraIcon from '../Icons/camera.png';
import TvshowIcon from '../Icons/tv-show.png'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Body() {
    const theme = createTheme();
    const myRef = useRef(null)
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [currentTab, setCurrentTab] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [movies, setMovies] = useState(null)

    useEffect(() => {
        const getMovies = async () => {
            if (currentTab == 0) {
                var apiLink = (`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${currPage}`)
            }
            else if (currentTab == 1) {
                var apiLink = (`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&page=${currPage}`)
            }
            else {
                var apiLink = (`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_API_KEY}&page=${currPage}`)
            }
            const res = await axios.get(apiLink)
            let data = res.data.results
            await setTotalPages(res.data.total_pages)
            await setMovies([...data])
        }
        getMovies();
    }, [currentTab, currPage])

    useEffect(() => {
        myRef.current.scrollIntoView({
            behavior: "smooth"
        })
    }, [currPage])

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => {
            let nextTab = currentTab == 2 ? 0 : currentTab + 1
            setCurrentTab(nextTab);
            setCurrPage(1)
        },
        onSwipedRight: () => {
            let prevTab = currentTab == 0 ? 2 : currentTab - 1
            setCurrentTab(prevTab);
            setCurrPage(1)
        },
        delta: 10,                            // min distance(px) before a swipe starts. *See Notes*
        preventDefaultTouchmoveEvent: false,  // call e.preventDefault *See Details*
        trackTouch: true,                     // track touch input
        trackMouse: false,                    // track mouse input
        rotationAngle: 0
    });

    return (
        <div ref={myRef}>
            <Tabs
                value={currentTab}
                indicatorColor="primary"
                textColor="primary"
                style={{ paddingBottom: 5 }}
                onChange={(event, newValue) => {
                    setCurrentTab(newValue)
                    setCurrPage(1);
                }}
                variant="fullWidth"
            >
                <Tab icon={<img className="tabIcons" src={TrendingIcon} />} iconPosition="start" label="Trending" />
                <Tab icon={<img className="tabIcons" src={CameraIcon} />} iconPosition="start" label="Popular Movies" />
                <Tab icon={<img className="tabIcons" src={TvshowIcon} />} iconPosition="start" label="Popular TV Series" />
            </Tabs>
            {
                movies == null ? <div style={{ width: '100%', textAlign: 'center' }}><CircularProgress /></div> :
                    <div>
                        <div className="show-movies" {...swipeHandlers}>
                            <ThemeProvider theme={theme}>
                                {
                                    movies.map((movieObj, index) => (
                                        matches ?
                                            <Card sx={{ width: 250, margin: '0.7rem' }} key={movieObj.id} >
                                                <CardActionArea>
                                                    <CardMedia
                                                        height="300"
                                                        width="100%"
                                                        component="img"
                                                        image={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                                    />
                                                    <Typography variant='h5' className='movies-title' component="div">
                                                        {movieObj.media_type == 'tv' ? `${movieObj.name}` : `${movieObj.title}`}
                                                    </Typography>

                                                </CardActionArea>
                                            </Card> : <Card sx={{ width: 165, margin: '0.4rem' }} key={movieObj.id} >
                                                <CardActionArea>
                                                    <CardMedia
                                                        height="300"
                                                        width="100%"
                                                        component="img"
                                                        image={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                                    />
                                                    <Typography variant='h5' className='movies-title' component="div">
                                                        {movieObj.media_type == 'tv' ? `${movieObj.name}` : `${movieObj.title}`}
                                                    </Typography>

                                                </CardActionArea>
                                            </Card>
                                    ))
                                }
                            </ThemeProvider>
                        </div>
                        <Pagination count={totalPages} page={currPage} size="large" showFirstButton showLastButton shape="rounded" sx={{ justifyContent: "center", display: 'flex', marginBottom: '1rem' }}
                            onChange={(event, value) => setCurrPage(value)} color="primary" />
                    </div>
            }
        </div>
    )
} 
