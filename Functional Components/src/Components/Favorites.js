import React, { useEffect, useRef, useState } from 'react'
import TablePagination from '@mui/material/TablePagination';
import { Button, CircularProgress } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import { IconButton, InputAdornment, TextField, CardActionArea } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from "@mui/material/Grid";
import Checkbox from '@mui/material/Checkbox';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { styled } from '@mui/material/styles';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { createTheme, } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import posterna from '../Icons/posterna.jpg'
import TableRow from '@mui/material/TableRow';

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

export default function Favorites() {

  const [genre, setGenre] = useState([])
  const [filterGenre, setFilterGenre] = useState([]);
  const [dialogCheckBox, setDialogCheckBox] = useState([]);
  const myRef = useRef(null)
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState([])
  const [movies, setMovies] = useState([])
  const [currPage, setCurrPage] = useState(0)
  const [filterarr, setFirterarr] = useState([])
  const theme = createTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const [rowsPerPageVal, setRowsPerPageVal] = useState(5)
  const [flag, setFlag] = useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setLoading(true)
    let data = JSON.parse(localStorage.getItem('fav') || "[]")
    let temp = [];
    if (data) {
      data.forEach((movieObj) => {
        movieObj.genres.forEach((genreitem) => {

          if (!temp.includes(genreitem.name)) {
            temp.push((genreitem.name))
          }
        })
      })
    }
    temp.sort()
    setMovies([...data])
    setSelectedMovie([...data])
    setGenre([...temp])
    setLoading(false)
  }, [])

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
    setFilterGenre([])
  }
  const openTrailer = (key) => {
    let win = window.open(`https://www.youtube.com/watch?v=${key}`)
    win.focus();
  }
  const handleFiltergenre = () => {
    setFilterGenre([...dialogCheckBox])
    handleClose();
  }

  useEffect(() => {
    if (filterGenre.length != 0) {
      let temp = [];
      let flag = false;
      movies.forEach((movieObj) => {
        movieObj.genres.forEach((genreitem) => {
          if (filterGenre.includes(genreitem.name)) {
            flag = true
          }
        })
        if (flag) {
          temp.push(movieObj)
          flag = false;
        }
      })

      setSelectedMovie([...temp])
    }
    else {
      setSelectedMovie([...movies])
    }
  }, [filterGenre, movies])

  const cleanup = () => {
    setSearchQuery("")
    setFlag(!flag)
  }


  const handleRowsperpage = (event) => {
    setCurrPage(0)
    if (event.target.value > filterarr.length) {
      setRowsPerPageVal(-1)
    }
    else {
      setRowsPerPageVal(event.target.value)
    }
  }


  useEffect(() => {
    let limit = rowsPerPageVal
    if (limit == -1) {
      limit = selectedMovie.length
    }
    let si = (currPage) * limit;
    let ei = si + parseInt(limit)
    if (searchQuery == "") {
      let arr = selectedMovie.slice(si, ei)
      setFirterarr(arr)
    }
    else {
      let arr = filterarr.slice(si, ei)
      setFirterarr(arr)
    }

  }, [currPage, rowsPerPageVal, selectedMovie, flag])

  useEffect(() => {
    if (searchQuery != "") {
      let arr = selectedMovie;
      arr = selectedMovie.filter((movieObj) => {
        if (movieObj.media_type == 'tv') {
          var title = movieObj.name.toLowerCase();
        }
        else {
          var title = movieObj.title.toLowerCase();
        }
        return title.includes(searchQuery.toLowerCase())
      })
      setFirterarr(arr)
    }
    else {
      setFlag(!flag)
    }

  }, [searchQuery])

  const handleDelete =(id)=>{
      let data = movies.filter((movieObj)=> movieObj.id != id)
      localStorage.setItem('fav',JSON.stringify(data))
      let temp = [];
      if (data) {
        data.forEach((movieObj) => {
          movieObj.genres.forEach((genreitem) => {
  
            if (!temp.includes(genreitem.name)) {
              temp.push((genreitem.name))
            }
          })
        })
      }
      temp.sort()
      setMovies([...data])
      setSelectedMovie([...data])
      setGenre([...temp])
  }



  return (

    <div ref={myRef}>{loading ? <CircularProgress /> :
      <div className="main" style={{ padding: '1rem' }}>
        <div className="row">

          <div className="col-lg-3 col-sm-12">
            <div style={{ width: '90%', display: 'flex', flexDirection: 'column' }}>

              {matches ? <><div><Button sx={{ marginRight: '0.2rem', marginBottom: '0.2rem' }} variant="contained" startIcon={<CheckBoxOutlineBlankIcon />} onClick={handleClearAll} >Cancel All</Button>
                <Button variant="contained" onClick={handleFiltergenre}>Apply Filter</Button></div>
                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} direction="column" alignItems="left" sx={{ maxHeight: '75vh', overflowY: 'scroll', display: 'block', marginTop: '0.7rem' }}>
                  {
                    (genre).map((key, index) => (
                      <Grid item xs={6} md={4} key={index} >
                        <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} color="default"
                          checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} name={key} onClick={(e) => handleAddDialog(e)} checked={dialogCheckBox.includes(key)} />} label={key} />
                      </Grid>
                    ))
                  }
                </Grid></> : <div style={{ display: 'flex', justifyContent: 'right', marginBottom: '0.7rem' }}><Button variant="contained" startIcon={<FilterListIcon />} onClick={handleClickOpen} >Filter</Button></div>}
            </div>
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
                        (genre).map((key, index) => (
                          <Grid item xs={6} md={4} key={index} >

                            <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} color="default"
                              checkedIcon={<BpCheckedIcon />} icon={<BpIcon />} name={key} onClick={(e) => handleAddDialog(e)} checked={dialogCheckBox.includes(key)} />} label={key} />
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
          <div className="col-lg-9 col-sm-12 favourite-table">
            <div className="row">
              <TextField label="Search"
                placeholder="Type your query here"
                type="text"
                sx={{ width: '70vw', margin: '1.2rem' }}
                variant="outlined"
                margin="normal"
                onChange={(e) => setSearchQuery(e.target.value)}
                value={searchQuery}
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
            </div>

            <div className="row">
              <table className="table table-hover ">
                <thead style={{ textAlign: 'center' }}>
                  <tr>
                    <th scope="col" colSpan="2">Title</th>
                    <th scope="col">Rating</th>
                    <th scope="col" >Trailer</th>
                    <th scope="col"  >Remove</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody >
                  {selectedMovie != null ? filterarr.map((movieObj, index) => (
                    <tr key={index}>

                      <td ><img src={movieObj.poster_path ? `https://image.tmdb.org/t/p/original${movieObj.poster_path}` : posterna} style={{ height: '4rem', width: '3rem' }} alt="Image" /></td>
                      <td>{movieObj.media_type == "tv" ? movieObj.name : movieObj.title}</td>
                      <td style={{ textAlign: 'center' }}>&#11088;{movieObj.vote_average}</td>
                      <td style={{ textAlign: 'center' }}><Button variant='contained' color="error" startIcon={<YouTubeIcon />} disabled={movieObj.trailer == null} onClick={() => openTrailer(movieObj.trailer)} sx={matches ? { marginRight: '2rem' } : {}}>{movieObj.trailer != null ? "Trailer" : "Trailer N/A"}</Button></td>
                      <td style={{ textAlign: 'center' }}><Button variant="contained" color="error" onClick={()=> handleDelete(movieObj.id)} >Remove</Button></td>

                    </tr>
                  )) : <></>}
                  <TableRow>
                    <TablePagination
                      sx={{ alignItems: 'center' }}
                      rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                      count={selectedMovie.length}
                      rowsPerPage={parseInt(rowsPerPageVal)}
                      showFirstButton={true}
                      showLastButton={true}
                      page={currPage}
                      SelectProps={{
                        inputProps: {
                          'aria-label': 'rows per page',
                        },
                        native: true,
                      }}
                      onPageChange={(e, v) => setCurrPage(v)}
                      onRowsPerPageChange={handleRowsperpage}
                    // ActionsComponent={TablePaginationActions}
                    />



                  </TableRow>
                </tbody>
              </table>
            </div>
            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {
                  // pagesArr.map((page) => (

                  //     <li className="page-item"><a className="page-link" onClick={() => this.handlePageChange(page)} >{page}</a></li>
                  // ))
                }

              </ul>
            </nav>
          </div>
        </div>
      </div>

    }</div>

  )
}
