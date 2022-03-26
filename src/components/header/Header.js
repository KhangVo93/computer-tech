import { Navbar, Container, Nav, Form, FormControl, Button, Row } from "react-bootstrap"
import { styled, alpha, AppBar, Box, Toolbar, IconButton, Typography, InputBase, Badge, MenuItem, Menu } from '@mui/material'
import { useState } from "react"
import { Link } from 'react-router-dom'
import * as React from 'react';
import { Col, Input } from 'reactstrap'
import SearchIcon from '@mui/icons-material/Search';
import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import MouseIcon from '@mui/icons-material/Mouse';
import KeyboardIcon from '@mui/icons-material/Keyboard';
import MemoryIcon from '@mui/icons-material/Memory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import LogoutIcon from '@mui/icons-material/Logout';
import InfoIcon from '@mui/icons-material/Info';
import ReorderIcon from '@mui/icons-material/Reorder';
const Header = ({ objResult, logoutGoogle, cartLength, idUser }) => {

    const BarStyling = { width: "15rem", background: "#F2F1F9", border: "none", padding: "0.5rem" };
    const [paramSearchProduct, setParamSearchProduct] = useState('')
    const onChangeSearch = (event) => {
        setParamSearchProduct(event.target.value)
    }
    const logout = () => {
        logoutGoogle();
    }
    return (
        <>
            <Navbar expand="lg" variant="light" bg="primary">
                <Container>
                    <Navbar.Brand >
                        <Link to={'/'} style={{ textDecoration: 'none' }}>
                            <h4 style={{ color: 'white' }}>
                                <ImportantDevicesIcon style={{ marginLeft: 20 }} />
                                <KeyboardIcon style={{ marginLeft: 10 }} />
                                <MouseIcon style={{ marginLeft: 10 }} />
                                <MemoryIcon style={{ marginLeft: 10, marginRight: 10 }} />
                                COMPUTER-TECH
                            </h4>
                        </Link>
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Box sx={{ flexGrow: 1 }} >
                            <Row>
                                <Col>
                                    <Input
                                        value={paramSearchProduct}
                                        onChange={onChangeSearch}
                                        style={BarStyling}
                                        key="random1"
                                        placeholder={"Bạn muốn tìm gì..."}
                                    />
                                </Col>
                                <Col>
                                    {
                                        paramSearchProduct !== '' ?

                                            <Link onClick={() => setParamSearchProduct("")} to={`/search/${paramSearchProduct}`}>
                                                <IconButton className='bg-danger' >
                                                    <SearchIcon style={{ color: 'white' }} />
                                                </IconButton>
                                            </Link>
                                            :
                                            null
                                    }
                                </Col>
                            </Row>
                        </Box>
                    </Nav>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                        </Nav>
                        <Form className="d-flex">
                            {
                                objResult ?
                                    <>
                                        <div className='dropdown'>
                                            {
                                                objResult.photoURL ? <img src={objResult.photoURL} alt='avatar' style={{ width: 35, height: 35, borderRadius: "50%" }} />
                                                    :
                                                    <SentimentVerySatisfiedIcon style={{ width: 35, height: 35, color: 'white' }} />
                                            }
                                            <div className='dropdown-content'>
                                                <b>{objResult.displayName || objResult.FullName}</b>
                                                <br />
                                                <Link to={`/user/${idUser}`} style={{ textDecoration: 'none', color: 'black', marginTop: 10, paddingLeft: 15 }}>
                                                    <InfoIcon /> Thông tin
                                                </Link>
                                                <br />
                                                <Link to={`/statusOrder`} style={{ textDecoration: 'none', color: 'black', marginTop: 10, paddingLeft: 15 }}>
                                                    <ReorderIcon /> Đơn hàng
                                                </Link>
                                                <hr />
                                                <a role='button' href='/#' onClick={logout} style={{ textDecoration: 'none' }}>
                                                    <LogoutIcon style={{ width: 25, height: 25 }} /> Thoát
                                                </a>
                                            </div>
                                        </div>
                                    </>
                                    :

                                    <Link to={"/login"} style={{ color: 'white' }}>
                                        <AccountCircleIcon style={{ width: 35, height: 35 }} />
                                    </Link>
                            }
                            <Link to={"/cart"} style={{ color: 'white', marginLeft: 15 }}>
                                <div className="cart-image">
                                    <ShoppingCartIcon style={{ width: 35, height: 35 }} />
                                    <div className="cart-count">{cartLength}</div>
                                </div>
                            </Link>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}
export default Header