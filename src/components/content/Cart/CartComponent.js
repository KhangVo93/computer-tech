//import { Button, TableContainer, Table, TableRow, TableCell, TableHead, TableBody, Checkbox } from "@mui/material"
import { Button, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import { Label, Row, Breadcrumb, BreadcrumbItem, Col } from "reactstrap"
import ModalInfor from "./ModalInfor"

function CartComponent({ aRRCart, setArrCart, idUser, setCartLength, objResult }) {
    // Chỉnh style cho table giỏ hàng 
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    let sumPrice = 0
    let sumAmount = 0
    let priceProduct = 0

    for (let i in aRRCart) {
        priceProduct = aRRCart[i].price * aRRCart[i].amount
        sumAmount += aRRCart[i].amount
        sumPrice += priceProduct
    }
    const onClickDeleteItem = (paramID) => {
        axios.delete(`https://computer-tech-be.herokuapp.com/customers/${idUser}/${paramID}/cart`)
            .then(() => {
                getCartByIdUser()
                //window.location.assign('/cart')
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    const getCartByIdUser = async () => {
        axios.get(`https://computer-tech-be.herokuapp.com/customers/${idUser}/cart`)
            .then((data) => {
                setArrCart(data.data.Carts)
                setCartLength(data.data.Carts.length)
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    const restApiAddQuantity = (paramCart) => {
        const body = {
            body: {
                amount: paramCart.amount + 1,
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
        axios.put(`https://computer-tech-be.herokuapp.com/cart/${paramCart._id}`, body.body, body.headers)
            .then(() => {
                getCartByIdUser()
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    const restApiDecreaseQuantity = (paramCart) => {
        if (paramCart.amount > 1) {
            const body = {
                body: {
                    amount: paramCart.amount - 1
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
            axios.put(`https://computer-tech-be.herokuapp.com/cart/${paramCart._id}`, body.body, body.headers)
                .then(() => {
                    getCartByIdUser()
                })
                .catch(error => {
                    console.log(error.response);
                })
        }
    }

    const [openModalInfor, setOpenModalInfor] = useState(false)
    return (

        <>
            <Row className="p-2 mt-2">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to='/products'>Danh mục sản phẩm</Link></BreadcrumbItem>
                    <BreadcrumbItem>Giỏ hàng</BreadcrumbItem>
                </Breadcrumb>
            </Row>
            <Row>
                {
                    aRRCart.length > 0 ?
                        <>
                            <TableContainer >
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow style={{ color: 'white', backgroundColor: 'darkgray' }}>
                                            <TableCell width={'25%'} align="center"><h5>Ảnh</h5></TableCell>
                                            <TableCell width={'20%'} align="center"><h5>Mã sản phẩm</h5></TableCell>
                                            <TableCell width={'20%'} align="center"><h5>Tên</h5></TableCell>
                                            <TableCell width={'20%'} align="center"><h5>Số lượng</h5></TableCell>
                                            <TableCell width={'10%'} align="center"><h5>Giá</h5></TableCell>
                                            <TableCell width={'5%'}></TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>

                                        {aRRCart.map((item, index) => {
                                            return (
                                                <StyledTableRow key={index}>
                                                    <StyledTableCell width={'25%'} align='center'>
                                                        <Link to={`/detailProduct/${item.productId}`}>
                                                            <img src={item.imgAvatar} style={{ maxWidth: '50%' }} alt='avatarproduct' />
                                                        </Link>
                                                    </StyledTableCell>
                                                    <StyledTableCell variant="body" width={'20%'} align='center'><b>{item.productId}</b></StyledTableCell>
                                                    <StyledTableCell width={'20%'} align='center'><b>{item.name}</b></StyledTableCell>
                                                    <StyledTableCell width={'20%'} align='center'>
                                                        <Button onClick={() => restApiAddQuantity(item)}><b>+</b></Button>
                                                        <Label>
                                                            <b>{item.amount}</b>
                                                        </Label>
                                                        <Button onClick={() => restApiDecreaseQuantity(item)}><b>-</b></Button>
                                                    </StyledTableCell>
                                                    <StyledTableCell width={'10%'} align='center'><b>{(item.price * item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</b></StyledTableCell>
                                                    <StyledTableCell width={'5%'} align='center'>
                                                        <Button onClick={() => onClickDeleteItem(item._id)}>
                                                            <DeleteIcon style={{ color: 'red' }} />
                                                        </Button>
                                                    </StyledTableCell>
                                                </StyledTableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </>
                        :
                        null
                }
            </Row>
            <Row style={{ textAlign: 'right', marginTop: 30 }}>
                {
                    aRRCart.length > 0 ?
                        <>
                            <Col xs='6'>
                                <h3>Tổng thanh toán ( {sumAmount} sản phẩm): </h3>
                            </Col>
                            <Col xs='4'>
                                <h1 style={{ color: 'red' }}>{sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</h1>
                            </Col>
                            <Col xs='2'>

                                <Button variant="contained" onClick={() => setOpenModalInfor(true)}>Mua hàng</Button>
                            </Col>
                        </>
                        :
                        <>

                            <Col xs='6'>
                                <h3>Giỏ hàng trống</h3>
                            </Col>
                        </>
                }
            </Row>
            <ModalInfor
                objResult={objResult}
                idUser={idUser}
                openModalInfor={openModalInfor}
                setOpenModalInfor={setOpenModalInfor}
                aRRCart={aRRCart}
                sumAmount={sumAmount}
                sumPrice={sumPrice}
                setArrCart={setArrCart}
                setCartLength={setCartLength}
            />
        </>
    )
}
export default CartComponent