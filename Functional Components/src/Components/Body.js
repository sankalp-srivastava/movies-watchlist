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
import { Button, CardActionArea, CardContent, TablePagination } from '@mui/material';
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
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import default_dp from '../Icons/default_dp.jpg'
import posterna from '../Icons/posterna.jpg'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SortIcon from '@mui/icons-material/Sort';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

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

const BpIcon2 = styled('span')(({ theme }) => ({
    borderRadius: '50%',
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

const BpCheckedIcon2 = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    borderRadius:"50%",
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
  

function BpRadio(props) {
    return (
      <Radio
        sx={{
          '&:hover': {
            bgcolor: 'transparent',
          },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon2 />}
        icon={<BpIcon2 />}
        {...props}
      />
    );
  }


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
export default function Body() {
    const theme = createTheme();
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [open3, setOpen3] = React.useState(false);
    const myRef = useRef(null)
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [currentTab, setCurrentTab] = useState(0);
    const [currPage, setCurrPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [movies, setMovies] = useState(null);
    const [dialogCheckBox, setDialogCheckBox] = useState([]);
    const [filterGenre, setFilterGenre] = useState([]);
    const [modalObj, setModalObj] = useState(null);
    const [mediaType, setMediaType] = useState(null);
    const [trailer, setTrailer] = useState(null);
    const [cast, setCast] = useState([]);
    const [watchpro, setWatchpro] = useState([]);
    const [recommendation , setRecommendation] = useState([]);
    const [favorites,setFavorites] = useState([])
    const [currentSort,setCurrentSort] = useState(0)
    const [tempSort,setTempSort] = useState(0)

    let genreMovIds = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
    let genreTvIds = { 10759: 'Action & Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 10762: 'Kids', 9648: 'Mystery', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi & Fantasy', 10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics', 37: 'Western' };
    const sortOrder = ["Popularity","Title (A-Z)","Title(Z-A)","Rating (High To Low)","Rating (Low To High)"]
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 7,
            slidesToSlide:6
        },
        desktop: {
            breakpoint: { max: 3000, min: 900 },
            items: 6,
            slidesToSlide:5
        },
        tablet: {
            breakpoint: { max: 900, min: 700 },
            items: 4,
            slidesToSlide:3
        },
        middle:{
            breakpoint: { max: 700, min: 563 },
            items: 3,
            slidesToSlide:2
        },
        mobile: {
            breakpoint: { max: 563 , min: 0 },
            items: 2,
            slidesToSlide:2
        }
    };
    useEffect(()=>{
        const setDefaultVal =async()=>{
        await setCurrentSort(0);
        await setFilterGenre([])}
        setDefaultVal();
    },[currentTab])
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClickOpen2 = () => {
        setOpen2(true);
    };
    const handleClickOpen3 = () => {
        setOpen3(true);
        setTempSort(currentSort)
    };

    const handleClose = () => {
        setOpen(false);
        setDialogCheckBox([])
    };
    const handleClose3 = () => {
        setOpen3(false);
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
    

    useEffect(() => {
        const getMovies = async () => {
            var apiLink = ""
            if (currentTab == 0) {
                apiLink = (`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${currPage}`)
            }
            else if (currentTab == 1) {
                const sortkey = ["sort_by=popularity.desc","sort_by=title.asc","sort_by=title.desc","sort_by=vote_average.desc","sort_by=vote_average.asc"]
                apiLink = (`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${currPage}&with_genres=${filterGenre.join(",")}&vote_count.gte=50&${sortkey[currentSort]}`)
            }

            else {
                const sortkey = ["sort_by=popularity.desc","sort_by=name.asc","sort_by=name.desc","sort_by=vote_average.desc","sort_by=vote_average.asc"]
                apiLink = (`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&page=${currPage}&with_genres=${filterGenre.join(",")}&vote_count.gte=50&${sortkey[currentSort]}`)
            }
            const res = await axios.get(apiLink)
            let data = res.data.results
            await setTotalPages(Math.min(res.data.total_pages, 100))
            await setMovies([...data])
        }
        getMovies();
    }, [currentTab, currPage, filterGenre,currentSort])

    useEffect(() => {
        myRef.current.scrollIntoView({
            behavior: "smooth"
        })
    }, [currPage])

    useEffect(()=>{
        let fav = JSON.parse(localStorage.getItem('fav') || "[]")
        fav = fav.map((m) => m.id)
        setFavorites([...fav])
    },[])

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
    const handleSorting =()=>{
        setCurrentSort(tempSort)
        handleClose3();
    }


    const handleFiltergenre = () => {
        setFilterGenre([...dialogCheckBox])
        handleClose();
    }

    const showInfoModal = async (Obj) => {
        handleClickOpen2();
        let link = ""
        if ((currentTab == 0 && Obj.media_type == 'tv') || currentTab == 2) {
            link = `https://api.themoviedb.org/3/tv/${Obj.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,credits,watch/providers,recommendations`
            await setMediaType('tv')
        } else {
            link = `https://api.themoviedb.org/3/movie/${Obj.id}?api_key=${process.env.REACT_APP_API_KEY}&append_to_response=videos,credits,watch/providers,recommendations`
            await setMediaType('movie')
        }
        let res = await axios.get(link)
        let data = res.data
        await setModalObj(data)
        
        if (data.videos.results.filter(e => e.type == "Trailer")[0]){
            await setTrailer((data.videos.results.filter(e => e.type == "Trailer")[0]).key)
        }
        else{
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
        let recomm = data.recommendations.results.slice(0,6)
        if (recomm.length != 0){
            setRecommendation([...recomm])
        }
        
    }

    const openTrailer = () => {
        let win = window.open(`https://www.youtube.com/watch?v=${trailer}`)
        win.focus();
    }

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
                <Button variant="contained" startIcon={<SortIcon />} onClick={handleClickOpen3} style={currentTab == 0 ? { display: 'none' } : {}}>Sort By : {sortOrder[currentSort]}</Button>
                <Dialog
                    open={open3}
                    maxWidth={"md"}
                    TransitionComponent={Transition}
                    scroll={"paper"}
                    onClose={handleClose3}
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle style={{ margin: '2%', padding: '0px 9px' }}>
                        <Grid container justifyContent="space-between" alignItems="center">
                            <Typography variant="div">Sort Order</Typography>
                            <CloseIcon onClick={handleClose3} style={{ cursor: 'pointer' }} />
                        </Grid>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            <RadioGroup value={tempSort}>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }} direction="row" alignItems="center">
                                    {
                                        sortOrder.map((key, index) => (
                                            <Grid item xs={6} md={4} key={index} >
                                                <FormControlLabel value={index} control={<BpRadio onClick={(e) => setTempSort(e.target.value)} />} label={key} />
                                            </Grid>
                                        )) 
                                    }
                                </Grid>
                            </RadioGroup>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={() => {  handleClose(); }}>Cancel</Button>
                        <Button variant="contained" onClick={handleSorting}>Apply Filter</Button>
                    </DialogActions>
                </Dialog>
                <Button variant="contained" startIcon={<FilterListIcon />} onClick={handleClickOpen} style={currentTab == 0 ? { display: 'none' } : {marginLeft:'1rem'}}>Filter</Button>
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
                                        <StyledBadge badgeContent={movieObj.vote_average ? movieObj.vote_average : "N/A"} color={movieObj.vote_average ? movieObj.vote_average > 4.5 ? movieObj.vote_average > 7.4 ? "success" : "warning" : "error" : "error"} key={movieObj.id}>
                                            <Card sx={matches ? { width: 250, margin: '0.7rem' } : { width: 165, margin: '0.4rem' }}  >
                                                <CardActionArea onClick={() => showInfoModal(movieObj)} style={{ bottom: '0rem', right: '0rem' }}>
                                                    <CardMedia
                                                        height="80%"
                                                        width="100%"
                                                        component="img"
                                                        objectfit="fill"
                                                        image={movieObj.poster_path?`https://image.tmdb.org/t/p/original${movieObj.poster_path}`:posterna}
                                                    />
                                                    {movieObj.poster_path?<></>:<Typography variant='h5' className='movies-title' component="div">
                                                        {currentTab == 0 ? movieObj.media_type == 'tv' ? `${movieObj.name}` : `${movieObj.title}` : currentTab == 1 ? movieObj.title : movieObj.name}
                                                    </Typography>}

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
                                                            style={{display:'flex'}}
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
                                                        <td colSpan='2' style={{display:'flex'}}>{watchpro[0] == null ? "Currently Not Available To Stream In India" : watchpro.map((obj, index) => (<div key={index} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                                                            <img src={`https://image.tmdb.org/t/p/w45${obj.logo_path}`} alt={obj.provider_name} title={obj.provider_name} style={{ marginLeft: '0.3rem', marginRight: '0.3rem' }} />
                                                            <small>{obj.provider_name}</small>
                                                        </div>
                                                        ))}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            {cast.length!=0? <div>
                                                
                                            <Typography variant='h5' sx={{paddingBottom:'0.5rem'}}>
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
                                                style={{alignItems:'stretch',display:'flex'}}
    
                                            >
                                            
                                                
                                                {
                                                    cast.map((obj) => (
                                                        
                                                        <Card sx={{ height: 320,width:'9rem' }} key={obj.order} style={{marginRight:'0.5rem'}}>
                                                            <CardMedia
                                                                component="img"
                                                                alt=""
                                                                sx={{height:'9rem',width:'9rem'}}

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

                                           
                                            </Carousel></div>:<div></div>}
                                            { recommendation.length!=0?
                                            <div>
                                            <Typography variant='h5' sx={{paddingBottom:'0.5rem',paddingTop:"0.7rem"}}>
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
                                                style={{alignItems:'stretch',display:'flex'}}
    
                                            >
                                            
                                                
                                                {
                                                    recommendation.map((obj,index) => (
                                                        <Card sx={{ height: 320,marginBottom:'1rem',width:'9rem' }} key={index} style={{marginRight:'0.5rem'}}>
                                                            <CardMedia
                                                                component="img"
                                                                alt=""
                                                                sx={{height:'9rem',width:'9rem'}}

                                                                image={obj.poster_path == null ? posterna : `https://image.tmdb.org/t/p/w154/${obj.poster_path}`}
                                                            />
                                                            <CardContent>
                                                                <Typography variant="h6" component="div" align='left'>
                                                                    {obj.media_type=='movie'?obj.title:obj.name}
                                                                </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    ))
                                                }

                                           
                                            </Carousel>
                                            </div>
                                            :<div></div>}

                                        </div> : <CircularProgress />
                                    }
                                </DialogContent>
                                <DialogActions sx={{ paddingTop: '1rem' }}>
                                    <Button variant='contained' color="error" startIcon={<YouTubeIcon />} disabled={trailer == null} onClick={openTrailer} sx={matches?{ marginRight: '2rem' }:{}}>{trailer != null ? "Watch Trailer" : "No Trailer Available"}</Button>
                                    <Button variant='contained' color="primary" startIcon={modalObj!=null?(favorites.includes(modalObj.id)) ?<FavoriteIcon />:<FavoriteBorderIcon/>:<></>}  onClick={handleFav} sx={matches?{ marginRight: '2rem' }:{}}>{modalObj!=null?(favorites.includes(modalObj.id)) ? "Remove from Watch List" : "Add To My Watch List":""}</Button>
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
