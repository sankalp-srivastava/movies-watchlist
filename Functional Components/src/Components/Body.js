import React, { useEffect, useRef, useState } from 'react'
import { useSwipeable } from 'react-swipeable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import FilterListIcon from '@mui/icons-material/FilterList';
import CircularProgress from '@mui/material/CircularProgress';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TrendingIcon from '../Icons/trending.png';
import CameraIcon from '../Icons/camera.png';
import TvshowIcon from '../Icons/tv-show.png'
import axios from 'axios';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea } from '@mui/material';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import useMediaQuery from '@mui/material/useMediaQuery';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Grid from "@mui/material/Grid";
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import ReactStars from "react-rating-stars-component";
import Badge from '@mui/material/Badge';
import YouTubeIcon from '@mui/icons-material/YouTube';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const BpIcon = styled('span')(({ theme }) => ({
    borderRadius: 3,
    width: 16,
    height: 16,
    boxShadow:
        theme.palette.mode === 'dark'
            ? '0 0 0 1px rgb(16 22 26 / 40%)'
            : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
    backgroundImage:
        theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
            : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '.Mui-focusVisible &': {
        outline: '2px auto rgba(19,124,189,.6)',
        outlineOffset: 2,
    },
    'input:hover ~ &': {
        backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
    },
    'input:disabled ~ &': {
        boxShadow: 'none',
        background:
            theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
    },
}));

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
        display: 'block',
        width: 16,
        height: 16,
        backgroundImage:
            "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
            " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
            "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
        content: '""',
    },
    'input:hover ~ &': {
        backgroundColor: '#106ba3',
    },
});

const StyledBadge = styled(Badge)({
    "& .MuiBadge-badge": {
      color: "white",
      padding: "0.4rem",
      fontSize: "0.9rem",
      top:'1.2rem',
      right:'1.5rem',
      textShadow:"\
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
export default function Body() {
    const theme = createTheme();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const myRef = useRef(null)
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [currentTab, setCurrentTab] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [movies, setMovies] = useState(null);
    const [dialogCheckBox, setDialogCheckBox] = useState([]);
    const [filterGenre, setFilterGenre] = useState([]);
    const [modalObj, setModalObj] = useState(null);
    const [mediaType,setMediaType] = useState(null);
    const [trailer ,setTrailer] = useState(null);

    let genreMovIds = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
    let genreTvIds = { 10759: 'Action & Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 10762: 'Kids', 9648: 'Mystery', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi & Fantasy', 10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics', 37: 'Western' };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpen2 = () => {
        setOpen2(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleClose2 = () => {
        setOpen2(false);
        setModalObj(null)
        setTrailer(null)
    };

    useEffect(() => {
        const getMovies = async () => {
            var apiLink = ""
            if (currentTab == 0) {
                apiLink = (`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${currPage}`)
            }
            else if (currentTab == 1) {
                apiLink = (`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${currPage}&with_genres=${filterGenre.join(",")}`)
            }
            else {
                apiLink = (`https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_API_KEY}&page=${currPage}&with_genres=${filterGenre.join(",")}`)
            }
            const res = await axios.get(apiLink)
            let data = res.data.results
            await setTotalPages(Math.min(res.data.total_pages,100))
            await setMovies([...data])
        }
        getMovies();
    }, [currentTab, currPage, filterGenre])

    useEffect(() => {
        myRef.current.scrollIntoView({
            behavior: "smooth"
        })
    }, [currPage])

    const handleAddDialog = async (e) => {
        if (!e.target.checked) {
            let parr = []
            parr = dialogCheckBox.filter((element) => e.target.name != element)
            await setDialogCheckBox([...parr])

        } else {
            await setDialogCheckBox([...dialogCheckBox, e.target.name])
        }
    }

    const handleClearAll = () => {
        setDialogCheckBox([])
    }

    const handleFiltergenre = () => {
        setFilterGenre([...dialogCheckBox])
        handleClose();
    }

    const showInfoModal = async (Obj) => {
        handleClickOpen2();
        let link =""
        if ((currentTab==0 && Obj.media_type=='tv')|| currentTab==2){
            link = `https://api.themoviedb.org/3/tv/${Obj.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
            await setMediaType('tv')
        }else{
            link = `https://api.themoviedb.org/3/movie/${Obj.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos`
            await setMediaType('movie')
        }
        let res = await axios.get(link)
        let data = res.data
        await setModalObj(data)
        setTrailer((data.videos.results.filter(e=>e.type=="Trailer")[0]).key)
       
    }

    const openTrailer = ()=>{
        let win = window.open(`https://www.youtube.com/watch?v=${trailer}`)
        win.focus();
    }

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
                <Tab icon={<img className="tabIcons" src={TrendingIcon} alt="" />} iconPosition="start" label="Trending" />
                <Tab icon={<img className="tabIcons" src={CameraIcon} alt="" />} iconPosition="start" label="Popular Movies" />
                <Tab icon={<img className="tabIcons" src={TvshowIcon} alt="" />} iconPosition="start" label="Popular TV Series" />
            </Tabs>
            <div style={{ display: 'flex', justifyContent: 'right', marginRight: '2rem', marginTop: '0.5rem' }}>
                <Button variant="contained" startIcon={<FilterListIcon />} onClick={handleClickOpen} style={currentTab == 0 ? { display: 'none' } : {}}>Filter</Button>
                <Dialog
                    open={open}
                    maxWidth={"lg"}
                    TransitionComponent={Transition}
                    scroll={"paper"}
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle style={{ margin: '2%', padding: '0px 9px' }}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="div">Filter By Genre</Typography>
                            <CloseIcon onClick={handleClose} style={{ cursor: 'pointer' }} />
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">

                            <div style={{ display: 'flex', justifyContent: 'left', marginTop: '0.5rem', marginBottom: '0.5rem' }}>
                                <Button variant="contained" startIcon={<CheckBoxOutlineBlankIcon />} onClick={handleClearAll}>Clear All</Button></div>

                            <FormGroup>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} direction="row" alignItems="center">
                                    {
                                        currentTab == 2 ? Object.keys(genreTvIds).map((key, index) => (
                                            <Grid item xs={6} md={4} key={index} >
                                                <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} color="default"
                                                    checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} name={key} onClick={(e) => handleAddDialog(e)} checked={dialogCheckBox.includes(key)} />} label={genreTvIds[key]} />
                                            </Grid>
                                        )) : Object.keys(genreMovIds).map((key, index) => (
                                            <Grid item xs={6} md={4} key={index}>
                                                <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} color="default"
                                                    checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} name={key} onClick={(e) => handleAddDialog(e)} checked={dialogCheckBox.includes(key)} />} label={genreMovIds[key]} />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </FormGroup>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={() => { handleClearAll(); handleClose(); }}>Cancel</Button>
                        <Button variant="contained" onClick={handleFiltergenre}>Apply Filter</Button>
                    </DialogActions>
                </Dialog>
            </div>
            {
                movies == null ? <div style={{ width: '100%', textAlign: 'center' }}><CircularProgress /></div> :
                    <div>
                        <div className="show-movies" {...swipeHandlers}>
                            <ThemeProvider theme={theme}>
                                {
                                    movies.map((movieObj) => (
                                                <StyledBadge badgeContent={movieObj.vote_average?movieObj.vote_average:"N/A"} color={movieObj.vote_average?movieObj.vote_average>4?movieObj.vote_average>8?"success":"warning":"error":"error"} key={movieObj.id}>
                                        <Card sx={matches ? { width: 250, margin: '0.7rem' } : { width: 165, margin: '0.4rem' }}  >
                                                <CardActionArea onClick={() => showInfoModal(movieObj)} style={{ bottom: '0rem', right: '0rem' }}>
                                                    <CardMedia
                                                        height="300"
                                                        width="100%"
                                                        component="img"

                                                        image={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                                    />
                                                    <Typography variant='h5' className='movies-title' component="div">
                                                        {currentTab == 0 ? movieObj.media_type == 'tv' ? `${movieObj.name}` : `${movieObj.title}` : currentTab == 1 ? movieObj.title : movieObj.name}
                                                    </Typography>

                                                </CardActionArea>
                                            </Card>
                                        </StyledBadge>
                                    ))
                                }
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
                                        <table className="table table-hover table-bordered" >
                                            <tbody className='align-middle'>
                                                <tr >
                                                    <th >Title: </th>
                                                    <td >{mediaType == 'tv' ? `${modalObj.name}` : `${modalObj.original_title}`}</td>
                                                    <td rowSpan='2' style={{ width: '33%' }} ><img src={`https://image.tmdb.org/t/p/original${modalObj.backdrop_path}`} className='modal-cover-image' alt={modalObj.title} /></td>
                                                </tr>
                                                <tr>
                                                    <th >Media Type: </th>
                                                    <td >{mediaType == 'tv' ? "TV Show" : "Movie"}</td>

                                                </tr>

                                                <tr >
                                                    <th >Genre: </th>
                                                    <td colSpan='2'>{[...modalObj.genres.map(e=>e.name)].join(",")}
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
                                                {/* <tr>
                                                <th>Watch Providers: </th>
                                                <td colSpan='2'>{this.state.watchproviders[0] == null ? "Currently Not Available To Stream In India" : this.state.watchproviders.map((obj) => (<>
                                                    <img src={`https://image.tmdb.org/t/p/w45${obj.logo_path}`} alt={obj.provider_name} title={obj.provider_name} style={{ marginLeft: '0.3rem', marginRight: '0.3rem' }} />
                                                    <small>{obj.provider_name}</small>
                                                </>
                                                ))}</td>
                                            </tr> */}
                                            </tbody>
                                        </table> : <CircularProgress />
                                    }
                                </DialogContent>
                                <DialogActions sx={{paddingTop:'1rem'}}>
                                <Button variant='contained' color="error" startIcon={<YouTubeIcon/>} disabled={trailer==null} onClick={openTrailer} sx={{marginRight:'2rem'}}>{trailer!=null?"Watch Trailer":"No Trailer Available"}</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                        <Pagination count={totalPages} page={currPage} size="large" showFirstButton showLastButton shape="rounded" sx={{ justifyContent: "center", display: 'flex', marginBottom: '1rem' }}
                            onChange={(event, value) => setCurrPage(value)} color="primary" />
                    </div>
            }
        </div>
    )
} 
