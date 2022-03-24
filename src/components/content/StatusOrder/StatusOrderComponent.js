import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from "axios";
import { Label, Row, Breadcrumb, BreadcrumbItem, Col } from "reactstrap"
import { Button, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField } from "@mui/material"

function StatusOrderComponent({ idUser }) {

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

    const [aRROrderById, setArrOrderById] = useState([])

    const [search, setSearch] = useState('')

    const restApiGetOrderById = () => {
        axios.get(`https://computer-tech-be.herokuapp.com/customers/${idUser}/orders`)
            .then((data) => {
                setArrOrderById(data.data.Order)
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    useEffect(() => {
        restApiGetOrderById()
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
    return (
        <>
            <Row className="p-2 mt-2">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem>Đơn hàng của bạn</BreadcrumbItem>
                </Breadcrumb>
            </Row>
            <Row className="p-2 mt-2">
                <TableContainer >
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow style={{ color: 'white', backgroundColor: 'darkgray' }}>
                                <TableCell width={'5%'} align='center'><h5>STT</h5></TableCell>
                                <TableCell width={'20%'} align="center"><h5>Mã đơn hàng</h5></TableCell>
                                <TableCell width={'25%'} align="center"><h5>Ngày đặt hàng</h5></TableCell>
                                <TableCell width={'25%'} align="center"><h5>Ngày giao hàng</h5></TableCell>
                                <TableCell width={'10%'} align="center"><h5>Trạng thái</h5></TableCell>
                                <TableCell width={'15%'} align="center"><h5>Chi tiết</h5></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                aRROrderById.map((item, index) => {
                                    return (
                                        <StyledTableRow key={index}>
                                            <StyledTableCell width={'5%'} align='center'><b>{index + 1}</b> </StyledTableCell>
                                            <StyledTableCell width={'20%'} align='center'><b>{item._id}</b> </StyledTableCell>
                                            <StyledTableCell width={'25%'} align='center'><b>{item.OrderDate}</b></StyledTableCell>
                                            <StyledTableCell width={'25%'} align='center'><b>{item.ShippedDate}</b></StyledTableCell>
                                            <StyledTableCell width={'10%'} align='center'><b>{item.Status}</b></StyledTableCell>
                                            <StyledTableCell width={'15%'} align='center'>
                                                <Link to={`/statusOrderDetail/${item._id}`}>
                                                    <Button variant="contained">Chi tiết</Button>
                                                </Link>
                                            </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Row>
        </>
    )
}
export default StatusOrderComponent