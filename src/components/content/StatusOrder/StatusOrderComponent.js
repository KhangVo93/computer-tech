import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from "axios";
import { Row, Breadcrumb, BreadcrumbItem, Label, Col } from "reactstrap"
//import { Button, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField } from "@mui/material"
import PaginationComponent from './PaginationComponent';
import DataStatusOrder from './DataStatusOrder';
import { Button, TextField } from '@mui/material';

function StatusOrderComponent({ idUser }) {


    const [aRROrderById, setArrOrderById] = useState([])
    const [arrForSearch, setArrOrderForSearch] = useState(0)
    const [page, setPage] = useState(1)
    const [nopage, setNoPage] = useState(0)

    const [search, setSearch] = useState('')
    const restApiGetOrderById = () => {
        axios.get(`https://computer-tech-be.herokuapp.com/customers/${idUser}/orders`)
            .then((data) => {
                //setArrOrderById(data.data.Order)
                setArrOrderForSearch(data.data.Order)
                setNoPage(Math.ceil(data.data.Order.length / 5))
                setArrOrderById(data.data.Order.slice((page - 1) * 5, page * 5))
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    const onChangeSearchOrder = (event) => {
        setSearch(event.target.value)
        if (event.target.value) {

            setArrOrderById(
                arrForSearch.filter(
                    (n) => ((n._id.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1)))
                    .slice((page - 1) * 5, page * 5)
            )

            setNoPage(Math.ceil(
                arrForSearch.filter(
                    (n) => ((n._id.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1))).length / 5)
            )
        }
        else {
            restApiGetOrderById()
        }
    }


    useEffect(() => {
        if (arrForSearch.length > 1) {
            setArrOrderById(
                arrForSearch.filter(
                    (n) => ((n._id.toLowerCase().indexOf(search.toLowerCase()) !== -1)))
                    .slice((page - 1) * 5, page * 5)
            )

            setNoPage(Math.ceil(
                arrForSearch.filter(
                    (n) => ((n._id.toLowerCase().indexOf(search.toLowerCase()) !== -1))).length / 5)
            )
        }
        else {
            restApiGetOrderById()
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [page])
    return (
        <>
            <Row className="p-2 mt-2">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                    <BreadcrumbItem>Đơn hàng của bạn</BreadcrumbItem>
                </Breadcrumb>
            </Row>
            <Row className="p-2 mt-2 text-center">
                <h2>Đơn hàng của bạn</h2>
            </Row>
            <Row className="p-2 mt-2">
                <Col xs='8'>
                    <Row className="p-2 mt-2">
                        <Col>
                            <Label>Nhập mã đơn hàng</Label>
                            <TextField variant='standard' value={search} onChange={onChangeSearchOrder} style={{ marginLeft: 10, maxWidth: 200 }}></TextField>
                            {/* {
                        search ?
                            <Button variant='contained' onClick={onClickSearch} style={{ maxWidth: 100, marginLeft: 10 }}>Tìm</Button>
                            :
                            null
                    } */}
                        </Col>
                    </Row>
                    <Row  className="p-2 mt-2">
                        {
                            search ?
                                <pre>
                                    Bạn đang tìm đơn hàng {search}
                                    {/* <Button color='error' onClick={restApiGetOrderById}>Xóa bộ lọc</Button> */}
                                </pre>
                                :

                                <pre>
                                    Bạn có tổng cộng {arrForSearch.length} đơn hàng
                                </pre>
                        }
                    </Row>
                </Col>
                <Col xs='4'>
                </Col>
            </Row>
            <Row className="p-2 mt-2">
                <DataStatusOrder aRROrderById={aRROrderById} />
            </Row>
            <Row>
                <PaginationComponent page={page} nopage={nopage} setPage={setPage} />
            </Row>
        </>
    )
}
export default StatusOrderComponent