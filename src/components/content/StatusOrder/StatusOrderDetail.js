import { Label, Row, Breadcrumb, BreadcrumbItem, Col } from "reactstrap"
import { useState, useEffect } from 'react'
import axios from "axios";
import { Link, useParams } from 'react-router-dom'
import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableFooter, TableHead, TableRow } from "@mui/material"


function StatusOrderDetail() {
    // Lấy id Order trên url
    const { orderId } = useParams();

    const [aRROrderDetailById, setArrOrderDetailById] = useState([])

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

    for (let i in aRROrderDetailById) {
        priceProduct = aRROrderDetailById[i].PriceEach
        sumAmount += aRROrderDetailById[i].Quantity
        sumPrice += priceProduct
    }
    const restApiGetOrderDetailById = async () => {
        axios.get(`http://localhost:8888/orders/${orderId}/orderDetail`)
            .then((data) => {
                setArrOrderDetailById(data.data.Order)
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
        restApiGetOrderDetailById()
    }, [orderId])

    return (
        <>
            <Row className="p-2 mt-2">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem><Link to={`/statusOrder`}>Đơn hàng của bạn</Link></BreadcrumbItem>
                    <BreadcrumbItem>Chi tiết</BreadcrumbItem>
                </Breadcrumb>
            </Row>
            <Row className="p-2 mt-2 text-center">
                <Label><h3>Đơn hàng : {orderId}</h3></Label>
            </Row>
            <Row className="p-2 mt-2">
                <TableContainer >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ color: 'white', backgroundColor: 'darkgray' }}>
                                <TableCell width={'5%'} align="center"><h5>STT</h5></TableCell>
                                <TableCell width={'20%'} align="center"><h5>Mã sản phẩm</h5></TableCell>
                                <TableCell width={'20%'} align="center"><h5>Hình</h5></TableCell>
                                <TableCell width={'20%'} align="center"><h5>Tên sản phẩm</h5></TableCell>
                                <TableCell width={'10%'} align="center"><h5>Số lượng</h5></TableCell>
                                <TableCell width={'15%'} align="center"><h5>Giá</h5></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                aRROrderDetailById.map((item, index) => {
                                    return (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell align="center">{index + 1}</StyledTableCell>
                                            <StyledTableCell align="center">
                                                <Link to={`/detailProduct/${item.Product}`} style={{ textDecoration: 'none' }}>
                                                    {item.Product}
                                                </Link>
                                            </StyledTableCell>
                                            <StyledTableCell align="center"><img src={item.ImgUrl} style={{ width: '50%' }} alt='imgUrl' /></StyledTableCell>
                                            <StyledTableCell align="center">{item.Name}</StyledTableCell>
                                            <StyledTableCell align="center">{item.Quantity}</StyledTableCell>
                                            <StyledTableCell align="center">{item.PriceEach.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ</StyledTableCell>
                                        </StyledTableRow >
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </Row>
            <Row className="p-2 mt-2">
                <Col xs='6'>
                    <p>
                        <h3>Tổng thanh toán ( {sumAmount} sản phẩm): </h3>
                    </p>
                </Col>
                <Col xs='4'>
                    <h1 style={{ color: 'red' }}>{sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ</h1>
                </Col>
            </Row>
        </>
    )
}
export default StatusOrderDetail