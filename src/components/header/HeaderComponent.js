import LogoComponent from "./LogoComponent";
import IconNavBarComponent from "./IconNavBarComponent";
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/js/all.js';
import { Input, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import * as React from 'react';
import { styled, alpha, AppBar, Box, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { ShoppingCart } from "@mui/icons-material";
import TagFacesIcon from '@mui/icons-material/TagFaces';
const Search = styled("div")(({ theme }) => ({
    display: "flex",
    position: "relative",
    borderRadius: 30,
    backgroundColor: "#ffffff",
    border: "1px",
    borderStyle: "solid",
    borderColor: "#55597d",
    // marginLeft: 10,
    flexGrow: 1,
    width: "auto",
    "& :first-child": {
        flexGrow: 1
    },
    ".MuiInputBase-root": {
        width: "100%"
    }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    // position: 'absolute',
    // pointerEvents: 'none',
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end"
    // backgroundColor: 'black',
    // width: "100%"
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));
function HeaderComponent({ objResult, logoutGoogle, aRRCart, cartLength, idUser }) {
    const [paramSearch, setParamSearch] = useState("")
    const onChangeInput = (event) => {
        setParamSearch(event.target.value)
    }
    //////////////////////////
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {
                objResult ?
                    <>
                        <MenuItem onClick={handleMenuClose}>
                            <b>{objResult.displayName || objResult.FullName}</b>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <Link to={`/user/${idUser}`} style={{ textDecoration: 'none', color: 'black', marginTop: 10, paddingLeft: 15 }}>
                                Thông tin của bạn
                            </Link>
                        </MenuItem>
                        <MenuItem onClick={handleMenuClose}>
                            <Link to={`/statusOrder`} style={{ textDecoration: 'none', color: 'black', marginTop: 10, paddingLeft: 15 }}>
                                Đơn hàng của bạn
                            </Link>
                        </MenuItem>
                        <hr />
                        <MenuItem onClick={handleMenuClose}>
                            <a role='button' href='/#' onClick={logoutGoogle} style={{ textDecoration: 'none' }}>
                                Thoát <i className="fa-solid fa-arrow-right-from-bracket" style={{ marginLeft: 10 }}></i>
                            </a>
                        </MenuItem>
                    </>
                    :
                    null
            }
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Link to={'/cart'}>
                    <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                        <Badge badgeContent={cartLength} color="error">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                </Link>
                <p>Cart</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    {
                        objResult ?
                            <>
                                {
                                    objResult.photoURL ? <img src={objResult.photoURL} alt='avatar' style={{ width: 25, height: 25, borderRadius: "50%" }} />
                                        : <TagFacesIcon />
                                }
                            </> :
                            <>
                                <AccountCircle />
                            </>
                    }
                </IconButton>
                {
                    objResult ?
                        <>
                            <p>{objResult.displayName || objResult.FullName}</p>
                        </> :
                        <>
                            <Link to={'/login'} style={{ textDecoration: 'none', color: 'black' }}>
                                <p>Login</p>
                            </Link>
                        </>
                }
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>
                            Shop-DEV247
                        </Link>
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} >
                        <Search sx={{ marginLeft: 5 }}>
                            <StyledInputBase
                                value={paramSearch}
                                inputProps={{ "aria-label": "search" }}
                                type="search"
                                name="s"
                                id="site-search"
                                placeholder="Search product"
                                onChange={onChangeInput} style={{ color: "#55597d" }}
                            />
                            <SearchIconWrapper>
                                <Link onClick={() => setParamSearch("")} to={`/search/${paramSearch}`}>
                                    <IconButton>
                                        <SearchIcon style={{ color: "#55597d" }} />
                                    </IconButton>
                                </Link>
                            </SearchIconWrapper>
                        </Search>
                    </Box>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {
                                objResult ?
                                    <>
                                        {
                                            objResult.photoURL ? <img src={objResult.photoURL} alt='avatar' style={{ width: 30, height: 30, borderRadius: "50%" }} />
                                                :
                                                <TagFacesIcon style={{ marginTop: 5 }} />
                                        }
                                    </>
                                    :
                                    <>
                                        <Link to={"/login"} style={{ color: 'white' }}>
                                            <AccountCircle />
                                        </Link>
                                    </>
                            }
                        </IconButton>
                        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={cartLength} color="error">
                                <Link to={'/cart'} style={{ textDecoration: 'none', color: 'white' }}>
                                    <ShoppingCart />
                                </Link>
                            </Badge>
                        </IconButton>
                    </Box>
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
        </Box>
    );
}
export default HeaderComponent