import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const navbarredirect = (des) =>{
        handleCloseNavMenu();
        navigate(`/${des}`)

    }


    return (
        <AppBar position="static" style={{ backgroundColor: 'rgb(24, 23, 23)' }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, cursor: 'pointer' }}
                        onClick={()=>navigate('/')}
                    >
                        Movies Watchlist App
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            <MenuItem onClick={()=>navbarredirect('')}>
                                <Typography textAlign="center">Home</Typography>
                            </MenuItem>
                            <MenuItem onClick={()=>navbarredirect('favorites')}>
                                <Typography textAlign="center">My Favorites</Typography>
                            </MenuItem>
                            <MenuItem onClick={()=>navbarredirect('search')}>
                                <Typography textAlign="center">Search</Typography>
                            </MenuItem>
                            <MenuItem onClick={()=>navbarredirect('about')}>
                                <Typography textAlign="center">About</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, cursor: 'pointer' }}
                        onClick={()=>navigate('/')}
                    >
                        Movies Watchlist App
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            onClick={()=>navbarredirect('')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Home
                        </Button>
                        <Button
                            onClick={()=>navbarredirect('favorites')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            My Favorites
                        </Button>

                        <Button
                            onClick={()=>navbarredirect('search')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Search
                        </Button>

                        <Button
                            onClick={()=>navbarredirect('about')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            About
                        </Button>

                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
