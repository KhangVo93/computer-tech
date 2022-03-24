import { Modal, ModalFooter, ModalHeader, ModalBody, Label, Row, Col } from "reactstrap"
import { Button, styled, TableCell, tableCellClasses, TableRow } from "@mui/material"
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import ModalSuccess from "./ModalSuccess";
function ModalConfirmOrder({
    openModalOrder,
    setOpenModalOrder,
    aRRCart,
    sumAmount,
    sumPrice,
    setOpenModalInfor,
    orderId,
    setOrderId,
    idUser,
    setArrCart,
    setCartLength }) {

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

    // Bật/ Tắt Modal success
    const [openModalSuccess, setOpenModalSuccess] = useState(false)

    // Khi click Back quay về thì Mở lại Modal Infor, đóng modal Order và xóa orderId hiện tại
    const onClickBackModal = () => {
        setOpenModalInfor(true)
        setOpenModalOrder(false)
        restApiDeleteOrderById()
    }

    const restApiDeleteOrderById = () => {
        axios.delete(`https://computer-tech-be.herokuapp.com/customers/${idUser}/${orderId}/orders`)
            .then(() => {
                setOrderId(null)
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    const restApiCreateOrderDetail = (param) => {
        const body = {
            body: {
                Name: param.name,
                ImgUrl: param.imgAvatar,
                Quantity: param.amount,
                PriceEach: param.price * param.amount
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
        axios.post(`https://computer-tech-be.herokuapp.com/orders/${orderId}/${param.productId}/orderDetail`, body.body, body.headers)
            .then(() => {

            })
            .catch(error => {
                console.log(error.response);
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

    const restApiDeleteCartById = (paramID) => {
        axios.delete(`https://computer-tech-be.herokuapp.com/customers/${idUser}/${paramID._id}/cart`)
            .then(() => {
                getCartByIdUser()
            })
            .catch((error) => {
                console.log(error.response)
            })
    }

    // Rest API lấy số lượng sản phẩm hiện tại
    const restAPIGetQuantityProductById = (param) => {
        axios.get(`https://computer-tech-be.herokuapp.com/products/${param.productId}/quantity`)
            .then((data) => {
                if (param.amount > data.data.product.Quantity) {
                    toast.error('Không đủ số lượng sản phẩm')
                }
                else {
                    restApiCreateOrderDetail(param)
                    restApiDeleteCartById(param)
                    restApiUpdateQuantity(param, data.data.product.Quantity)

                    setOpenModalInfor(false)
                    setOpenModalOrder(false)
                    setOpenModalSuccess(true)
                }
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    // Rest API update số lượng sản phẩm sau khi khách mua
    const restApiUpdateQuantity = (param, paramQuantiy) => {
        const body = {
            body: {
                Quantity: paramQuantiy - param.amount,
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
        axios.put(`https://computer-tech-be.herokuapp.com/products/${param.productId}`, body.body, body.headers)
            .then(() => {
                //console.log('OK')
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    const onClickOrder = () => {
        for (let i in aRRCart) {
            restAPIGetQuantityProductById(aRRCart[i])
        }
    }
    return (
        <>
            <Modal isOpen={openModalOrder} size='lg'>
                <ModalHeader>Xác nhận đơn hàng</ModalHeader>
                <ModalBody>
                    <Row className="mt-2 p-2">
                        {
                            aRRCart.map((item, index) => {
                                return (
                                    <StyledTableRow key={index}>
                                        <StyledTableCell width={'25%'} align='center'>
                                            <img src={item.imgAvatar} style={{ maxWidth: '50%' }} alt='avatarproduct' />
                                        </StyledTableCell>
                                        <StyledTableCell width={'20%'} align='center'><b>{item.name}</b></StyledTableCell>
                                        <StyledTableCell width={'20%'} align='center'>
                                            <Label>
                                                <b>{item.amount}</b>
                                            </Label>
                                        </StyledTableCell>
                                        <StyledTableCell width={'10%'} align='center'><b>{(item.price * item.amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</b></StyledTableCell>
                                    </StyledTableRow>
                                )
                            })
                        }
                    </Row>
                    <Row className="mt-2 p-2">
                        <Col>
                            <Label>
                                <h2>Tổng sản phẩm : {sumAmount}</h2>
                            </Label>
                        </Col>
                        <Col>
                            <Label>
                                <h2>Thanh toán: <span style={{ color: 'red' }}>{sumPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</span></h2>
                            </Label>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Row className="mt-2 p-2">
                        <Col>
                            <Button variant="contained" style={{ width: 120 }} onClick={onClickOrder} >Đặt hàng</Button>
                        </Col>
                        <Col>
                            <Button variant="contained" style={{ width: 120 }} onClick={onClickBackModal}>Quay lại</Button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
            <ModalSuccess
                openModalSuccess={openModalSuccess}
                setOpenModalSuccess={setOpenModalSuccess}
                orderId={orderId}
                setOrderId={setOrderId} />
        </>
    )
}
export default ModalConfirmOrder