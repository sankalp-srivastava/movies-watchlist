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


export default function Body() {
    const theme = createTheme();
    const [open, setOpen] = React.useState(false);
    const myRef = useRef(null)
    const matches = useMediaQuery(theme.breakpoints.up('sm'));
    const [currentTab, setCurrentTab] = useState(0);
    const [clearAll,setClearAll] =useState(false)
    const [currPage, setCurrPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [movies, setMovies] = useState(null);
    const [dialogCheckBox,setDialogCheckBox] = useState([]);
    const [filerGenre,setFilterGenre] = useState([]);

    let genreTreIds = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror',10762: 'Kids', 10402: 'Music', 9648: 'Mystery',10763: 'News',10764: 'Reality', 10749: 'Romance', 878: 'Sci-fi', 10766: 'Soap',10767: 'Talk', 53: 'Thriller',10770: 'TV', 10752: 'War', 37: 'Western' };
    let genreMovIds = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western' };
    let genreTvIds = { 10759: 'Action & Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 10762: 'Kids', 9648: 'Mystery', 10763: 'News', 10764: 'Reality', 10765: 'Sci-Fi & Fantasy', 10766: 'Soap', 10767: 'Talk', 10768: 'War & Politics', 37: 'Western' };
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const getMovies = async () => {
            var apiLink = ""
            if (currentTab == 0) {
                apiLink = (`https://api.themoviedb.org/3/trending/all/week?api_key=${process.env.REACT_APP_API_KEY}&page=${currPage}`)
            }
            else if (currentTab == 1) {
                apiLink = (`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_API_KEY}&page=${currPage}`)
            }
            else {
                apiLink = (`https://api.themoviedb.org/3/trending/tv/week?api_key=${process.env.REACT_APP_API_KEY}&page=${currPage}`)
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

    const handleAddDialog = async(e) =>{
        if (!e.target.checked){
            let parr=[]
            parr = dialogCheckBox.filter((element) => e.target.name!=element )
            await setDialogCheckBox([...parr])

        }else{
            await setDialogCheckBox([...dialogCheckBox,e.target.name])
        }
    }


    

    const handleClearAll = ()=>{
        setDialogCheckBox([])
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
                <Button variant="contained" startIcon={<FilterListIcon />} onClick={handleClickOpen} >Filter</Button>
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
                            
            <div style={{ display: 'flex', justifyContent: 'left', marginTop: '0.5rem',marginBottom:'0.5rem' }}>
                <Button variant="contained" startIcon={<CheckBoxOutlineBlankIcon />} onClick={handleClearAll}>Clear All</Button></div>

                            <FormGroup>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} direction="row" alignItems="center">
                                    {
                                        currentTab == 2 ? Object.keys(genreTvIds).map((key, index) => (
                                            <Grid item xs={6} md={4} key={index} >
                                                <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} color="default"
                                                    checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} name = {key} onClick={(e)=>handleAddDialog(e)} checked={dialogCheckBox.includes(key)}/>} label={genreTvIds[key]} />
                                            </Grid>
                                        )) : currentTab == 1 ? Object.keys(genreMovIds).map((key, index) => (
                                            <Grid item xs={6} md={4} key={index}>
                                                <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} color="default"
                                                    checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} name = {key} onClick={(e)=>handleAddDialog(e)} checked={dialogCheckBox.includes(key)} />}  label={genreMovIds[key]}  />
                                            </Grid>
                                        )) : Object.keys(genreTreIds).map((key,index)=>(
                                            <Grid item xs={6} md={4} key={index}>
                                                <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} color="default"
                                                    checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} name = {key} onClick={(e)=>handleAddDialog(e)} checked={dialogCheckBox.includes(key)} />} label={genreTreIds[key]}  />
                                            </Grid>
                                        ))
                                    }
                                </Grid>
                            </FormGroup>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" onClick={()=>{handleClearAll(); handleClose();}}>Cancel</Button>
                        <Button variant="contained" onClick={handleClose}>Apply Filter</Button>
                    </DialogActions>
                </Dialog>
            </div>
            {
                movies == null ? <div style={{ width: '100%', textAlign: 'center' }}><CircularProgress /></div> :
                    <div>
                        <div className="show-movies" {...swipeHandlers}>
                            <ThemeProvider theme={theme}>
                                {
                                    movies.map((movieObj, index) => (
                                        <Card sx={matches ? { width: 250, margin: '0.7rem' } : { width: 165, margin: '0.4rem' }} key={movieObj.id} >
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
