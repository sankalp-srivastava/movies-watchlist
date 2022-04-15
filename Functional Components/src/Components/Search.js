import { Button, IconButton, InputAdornment, TextField, CardActionArea } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { CardContent } from '@mui/material';
import Typography from '@mui/material/Typography';
import searchnotfoundimg from '../Icons/searchnotfound.jpg'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ReactStars from "react-rating-stars-component";
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import default_dp from '../Icons/default_dp.jpg'
import Grid from "@mui/material/Grid";
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import posterna from '../Icons/posterna.jpg'
import Alert from '@mui/material/Alert';
import Pagination from '@mui/material/Pagination';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});


const StyledBadge = styled(Badge)({
  "& .MuiBadge-badge": {
    color: "white",
    padding: "0.4rem",
    fontSize: "0.9rem",
    top: '1.2rem',
    right: '1.5rem',
    textShadow: "\
    0.05em 0 black,\
    0 0.05em black,\
    -0.05em 0 black,\
    0 -0.05em black,\
    -0.05em -0.05em black,\
    -0.05em 0.05em black,\
    0.05em -0.05em black,\
    0.05em 0.05em black"

  }
});

export default function Search() {
  const theme = createTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [finalquery, setFinalQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResult, setTotalResult] = useState(0);
  const [searchDone, setSearchDone] = useState(false)
  const [open2, setOpen2] = React.useState(false);
  const [modalObj, setModalObj] = useState(null);
  const [mediaType, setMediaType] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [cast, setCast] = useState([]);
  const [watchpro, setWatchpro] = useState([]);
  const [error, setError] = useState(false)
  const [recommendation, setRecommendation] = useState([]);
  const [favorites, setFavorites] = useState([])
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
      slidesToSlide: 6
    },
    desktop: {
      breakpoint: { max: 3000, min: 900 },
      items: 5,
      slidesToSlide: 4
    },
    tablet: {
      breakpoint: { max: 900, min: 580 },
      items: 3,
      slidesToSlide: 2
    },
    mobile: {
      breakpoint: { max: 580, min: 0 },
      items: 2,
      slidesToSlide: 2
    }
  };
  useEffect(() => {
    let fav = JSON.parse(localStorage.getItem('fav') || "[]")
    fav = fav.map((m) => m.id)
    setFavorites([...fav])
  }, [])

  const handleFav = () =>{
    let oldData = JSON.parse(localStorage.getItem('fav') || "[]")
    if (favorites.includes(modalObj.id)) {
        oldData = oldData.filter((m) => m.id != modalObj.id)
    } else {
        oldData.push({...modalObj,media_type:mediaType,trailer:trailer})
    }
    localStorage.setItem('fav', JSON.stringify(oldData));
    // console.log(oldData)
    handleFavouriteState();
}

const handleFavouriteState = ()=>{
    let oldData = JSON.parse(localStorage.getItem('fav') || "[]")
    let temp = oldData.map((m) => m.id)
    setFavorites([...temp])
}


  const getmovies = async () => {
    if (searchQuery == "") {
      setError(true)
      setTimeout(() => {
        setError(false)
      }, 2500)
    } else {
      await setLoading(true)
      let res = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchQuery}&page=${currPage}`)
      let data = res.data
      await setTotalPages(data.total_pages)
      await setFinalQuery(searchQuery)
      let result = data.results
      await setTotalResult(data.total_results)
      await setResults([...result])
      await setLoading(false)
      setSearchDone(true)
    }
  }

  useEffect(() => {
    if (finalquery != "") {
      getmovies();
    }
  }, [currPage])

  const cleanup = () => {
    setLoading(false)
    setResults([])
    setSearchQuery("")
    setFinalQuery("")
    setSearchDone(false)
    setTotalPages(0)
  }

  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
    if (e.key === 'Enter') {
      getmovies();
    }
  }
  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
    setModalObj(null)
    setTrailer(null)
    setMediaType(null)
    setCast([])
    setWatchpro([])
    setRecommendation([])
  };

  const showInfoModal = async (Obj) => {
    handleClickOpen2();
    let link = ""
    if (Obj.media_type == 'tv') {
      link = `https://api.themoviedb.org/3/tv/${Obj.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,credits,watch/providers,recommendations`
      await setMediaType('tv')
    } else {
      link = `https://api.themoviedb.org/3/movie/${Obj.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,credits,watch/providers,recommendations`
      await setMediaType('movie')
    }
    let res = await axios.get(link)
    let data = res.data
    await setModalObj(data)
    if (data.videos.results.filter(e => e.type == "Trailer")[0]) {
      await setTrailer((data.videos.results.filter(e => e.type == "Trailer")[0]).key)
    }
    else {
      setTrailer(null)
    }
    await setCast([...data.credits.cast])
    let provider = data["watch/providers"].results.IN
    let newa = []
    if (provider == null) {
      newa = [null]
    }
    else if ('rent' in provider) {
      newa = JSON.parse(JSON.stringify(provider['rent']))
    }
    else if ('flatrate' in provider) {
      newa = JSON.parse(JSON.stringify(provider['flatrate']))
    }
    else if ('buy' in provider) {
      newa = JSON.parse(JSON.stringify(provider['buy']))
    }
    else {
      newa = [null]
    }
    await setWatchpro([...newa])
    let recomm = data.recommendations.results.slice(0, 6)
    if (recomm.length != 0) {
      setRecommendation([...recomm])
    }
  }

  const openTrailer = () => {
    let win = window.open(`https://www.youtube.com/watch?v=${trailer}`)
    win.focus();
  }

  return (
    <div>

      <div style={{ display: 'flex' }}>
        <TextField label="Search"
          placeholder="Type your query here"
          type="text"
          sx={{ width: '100%', margin: '1.2rem' }}
          variant="outlined"
          margin="normal"
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery}
          onKeyPress={handleKeypress}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: searchQuery && (
              <IconButton
                aria-label="toggle password visibility"
                onClick={cleanup}
              ><CancelIcon /></IconButton>
            )
          }}
        />

        <Button
          variant="contained"
          size={"large"}
          style={{ margin: "1.2rem", width: '8rem', height: '3.4rem' }}
          onClick={getmovies}
        >
          <SearchIcon fontSize="large" />
        </Button>
      </div>
      {error && <Alert severity="error" sx={{ marginLeft: '1.5rem', marginRight: '1.5rem' }}>Oops! It looks like you asked for a blank movie. I dont think we have those. Type something in the search box and lets try again</Alert>}
      {
        loading ? <div style={{ width: '100%', textAlign: 'center' }}><CircularProgress /></div> :
          results.length == 0 && searchDone ? <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '60%', justifyContent: 'center', alignItems: 'center' }}>
            <img src={searchnotfoundimg} alt="No results Found Image" style={{ width: '50%', height: '50%' }} />
            <Typography sx={{ margin: '1rem' }} variant="h5">No Results were found for {finalquery}</Typography>

          </div> :

            <div>
              <ThemeProvider theme={theme} >
                {results.length != 0 ? <Typography gutterBottom={true} sx={{ marginLeft: '1rem' }} variant={'h5'}>Found {totalResult} Results For {finalquery}  </Typography> : <></>}
                <div >

                {
                  results.map((movieObj) => (
                    <StyledBadge sx={matches?{}:{left:'1rem'}} badgeContent={movieObj.vote_average ? movieObj.vote_average : "N/A"} color={movieObj.vote_average ? movieObj.vote_average > 4 ? movieObj.vote_average > 8 ? "success" : "warning" : "error" : "error"} key={movieObj.id}>
                      <Card sx={matches ? { width: 250, margin: '0.7rem' } : { width: 165,margin:'0.4rem'}}  >
                        <CardActionArea style={{ bottom: '0rem', right: '0rem' }} onClick={() => showInfoModal(movieObj)}>
                          <CardMedia
                            height="80%"
                            width="100%"
                            component="img"
                            objectfit="fill"
                            image={movieObj.poster_path ? `https://image.tmdb.org/t/p/original${movieObj.poster_path}` : posterna}
                          />
                          <CardContent>
                            <Typography variant="h6" component="div" >
                              {movieObj.media_type == 'tv' ? movieObj.name : movieObj.title}
                            </Typography>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </StyledBadge>
                  ))
                }
                </div>
              </ThemeProvider>
              <Dialog
                open={open2}
                maxWidth={"lg"}
                TransitionComponent={Transition}
                scroll={"paper"}
                onClose={handleClose2}
              >
                <DialogTitle>  <Grid container justifyContent="space-between" alignItems="center">
                  <Typography variant='h5' component="div" sx={{ maxWidth: '80%' }}>
                    {modalObj != null ? mediaType == 'tv' ? `${modalObj.name}` : `${modalObj.title}` : "Loading..."}
                  </Typography>
                  <CloseIcon onClick={handleClose2} style={{ cursor: 'pointer' }} />
                </Grid>
                </DialogTitle>
                <DialogContent>
                  {modalObj != null ?
                    <div>
                      <table className="table table-hover table-bordered" >
                        <tbody className='align-middle'>
                          <tr >
                            <th >Title: </th>
                            <td >{mediaType == 'tv' ? `${modalObj.name}` : `${modalObj.title}`}</td>
                            <td rowSpan='2' style={{ width: '33%' }} ><img src={`https://image.tmdb.org/t/p/original${modalObj.backdrop_path}`} className='modal-cover-image' alt={modalObj.title} /></td>
                          </tr>
                          <tr>
                            <th >Media Type: </th>
                            <td >{mediaType == 'tv' ? "TV Show" : "Movie"}</td>

                          </tr>

                          <tr >
                            <th >Genre: </th>
                            <td colSpan='2'>{[...modalObj.genres.map(e => e.name)].join(",")}
                            </td>
                          </tr>
                          <tr >
                            <th >Overview: </th>
                            <td colSpan='2' >{modalObj.overview}</td>
                          </tr>
                          <tr>
                            <th>
                              Rating:
                            </th>
                            <td colSpan='3' style={{ display: 'flex' }}> <ReactStars
                              count={5}
                              size={20}
                              edit={false}
                              value={Math.round(modalObj.vote_average) / 2}
                              isHalf={true}
                              activeColor="#ffd700"
                            /> <div style={{ marginLeft: '0.4rem', marginTop: '0.2rem' }}>{modalObj.vote_average}</div> </td>
                          </tr>
                          <tr >
                            <th >Language: </th>
                            <td colSpan='2'>{(modalObj.original_language).toUpperCase()}</td>
                          </tr>
                          <tr >
                            <th >{mediaType == 'tv' ? "First Air Date: " : "Release Date: "}</th>
                            <td colSpan='2'>{new Date(mediaType == 'tv' ? modalObj.first_air_date : modalObj.release_date).toLocaleDateString("en-IN", { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                          </tr>
                          <tr>
                            <th>Watch Providers: </th>
                            <td colSpan='2' style={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>{watchpro[0] == null ? "Currently Not Available To Stream In India" : watchpro.map((obj, index) => (<div key={index}>
                              <img src={`https://image.tmdb.org/t/p/w45${obj.logo_path}`} alt={obj.provider_name} title={obj.provider_name} style={{ marginLeft: '0.3rem', marginRight: '0.3rem' }} />
                              <small>{obj.provider_name}</small>
                            </div>
                            ))}</td>
                          </tr>
                        </tbody>
                      </table>
                      {cast.length != 0 ? <div>
                        <Typography variant='h5' sx={{ paddingBottom: '0.5rem' }}>
                          Cast:
                        </Typography>
                        <Carousel
                          swipeable={true}
                          draggable={true}
                          showDots={false}
                          responsive={responsive}
                          ssr={false} // means to render carousel on server-side.
                          infinite={false}
                          autoPlay={false}
                          autoPlaySpeed={9000000}
                          keyBoardControl={true}
                          customTransition=" ease 930ms"
                          transitionDuration={930}
                          containerClass="carousel-container"
                          removeArrowOnDeviceType={[]}
                          dotListClass="custom-dot-list-style"
                          itemClass="carousel-item-padding-40-px"
                          style={{ alignItems: 'stretch', display: 'flex' }}
                        >
                          {
                            cast.map((obj) => (

                              <Card sx={{ height: 370 }} key={obj.order} style={{ marginRight: '0.5rem' }}>
                                <CardMedia
                                  component="img"
                                  alt=""
                                  sx={{ height: '14rem', width: '14rem' }}

                                  image={obj.profile_path == null ? default_dp : `https://image.tmdb.org/t/p/w154/${obj.profile_path}`}
                                />
                                <CardContent>
                                  <Typography variant="h6" component="div" >
                                    {obj.name}
                                  </Typography>
                                  <Typography variant="caption" color="text.secondary">
                                    {obj.character}
                                  </Typography>
                                </CardContent>
                              </Card>
                            ))
                          }
                        </Carousel></div> : <div></div>}
                      {recommendation.length != 0 ?
                        <div>
                          <Typography variant='h5' sx={{ paddingBottom: '0.5rem', paddingTop: "0.7rem" }}>
                            Recommendations:
                          </Typography>
                          <Carousel
                            swipeable={true}
                            draggable={true}
                            showDots={false}
                            responsive={responsive}
                            ssr={false} // means to render carousel on server-side.
                            infinite={false}
                            autoPlay={false}
                            autoPlaySpeed={9000000}
                            keyBoardControl={true}
                            customTransition=" ease 930ms"
                            transitionDuration={930}
                            containerClass="carousel-container"
                            removeArrowOnDeviceType={[]}
                            dotListClass="custom-dot-list-style"
                            itemClass="carousel-item-padding-40-px"
                            style={{ alignItems: 'stretch', display: 'flex' }}
                          >
                            {
                              recommendation.map((obj, index) => (
                                <Card sx={{ height: 330, marginBottom: '1rem' }} key={index} style={{ marginRight: '0.5rem' }}>
                                  <CardMedia
                                    component="img"
                                    alt=""
                                    sx={{ height: '14rem', width: '14rem' }}

                                    image={obj.poster_path == null ? posterna : `https://image.tmdb.org/t/p/w154/${obj.poster_path}`}
                                  />
                                  <CardContent>
                                    <Typography variant="h6" component="div" align='left'>
                                      {obj.media_type == 'movie' ? obj.title : obj.name}
                                    </Typography>
                                  </CardContent>
                                </Card>
                              ))
                            }
                          </Carousel>
                        </div>
                        : <div></div>}

                    </div> : <CircularProgress />
                  }
                </DialogContent>
                <DialogActions sx={{ paddingTop: '1rem' }}>
                  <Button variant='contained' color="error" startIcon={<YouTubeIcon />} disabled={trailer == null} onClick={openTrailer} sx={{ marginRight: '2rem' }}>{trailer != null ? "Watch Trailer" : "No Trailer Available"}</Button>
                  <Button variant='contained' color="primary" startIcon={modalObj != null ? (favorites.includes(modalObj.id)) ? <FavoriteIcon /> : <FavoriteBorderIcon /> : <></>} onClick={handleFav} sx={matches ? { marginRight: '2rem' } : {}}>{modalObj != null ? (favorites.includes(modalObj.id)) ? "Remove from Watch List" : "Add To My Watchlist" : ""}</Button>
                </DialogActions>
              </Dialog>
            </div>
      }

      {
        totalPages > 1 ? <Pagination count={totalPages} page={currPage} size="large" showFirstButton showLastButton shape="rounded" sx={{ justifyContent: "center", display: 'flex', marginBottom: '1rem' }}
          onChange={(event, value) => setCurrPage(value)} color="primary" /> : <></>
      }
    </div>
  )
}