
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { useEffect, useState } from 'react'
import { ModalHeader, Modal, ModalBody, Label, Row, Col, ModalFooter } from 'reactstrap'
import axios from 'axios'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ModalConfirmOrder from './ModalConfirmOrder';
function ModalInfor({
    openModalInfor,
    setOpenModalInfor,
    objResult,
    idUser,
    aRRCart,
    sumAmount,
    sumPrice,
    setArrCart,
    setCartLength}) {

    const [city, setCity] = useState('')
    const [district, setDistrict] = useState('')

    const [disabled, setDisabled] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState('')


    // Mảng chứa dữ liệu trả về để kiểm tra có trùng dữ liệu trước khi đăng ký không
    const [arrSoDienThoai, setArrSoDienThoai] = useState([])

    // Obj chứa dữ liệu người dùng
    const [objUser, setObjUser] = useState([])

    // Switch Modal Xác nhận đơn hàng
    const [openModalOrder, setOpenModalOrder] = useState(false)

    // Biến chứa orderId khi tạo Order
    const [orderId, setOrderId] = useState(null)

    // Ngày tháng năm
    let d = new Date()
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();
    let toDay = `${day}/${month}/${year}`
    let shippedDay = `${day + 5}/${month}/${year}`;

    const onChangeCity = (event) => {
        setCity(event.target.value)
        setDisabled(false)
    }

    const onChangeDistrict = (event) => {
        setDistrict(event.target.value)
    }

    const onChangePhone = (event) => {
        setPhone(event.target.value)
    }

    const onChangeAddress = (event) => {
        setAddress(event.target.value)
    }

    const restApiCheckData = () => {
        axios.get(`http://localhost:8888/customers/`)
            .then((data) => {
                for (let i in data.data.customer) {
                    let soDienThoai = data.data.customer[i].PhoneNumber
                    arrSoDienThoai.push(soDienThoai)
                }
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    const validateData = () => {
        if (validatePhoneNumber(phone) == false) {
            toast.error('Bạn phải nhập số điện thoại');
            return false;
        }

        if (address === "") {
            toast.error("Bạn chưa nhập địa chỉ")
            return false
        }
        if (city === "") {
            toast.error("Bạn chưa chọn thành phố")
            return false
        }
        if (district === "") {
            toast.error("Bạn chưa chọn quận")
            return false
        }
        return true
    }

    const validatePhoneNumber = (paramPhone) => {
        // Kiểu số điện thoại
        var vTypePhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
        // Test chuỗi nhập vào 
        var vCheck = vTypePhone.test(paramPhone);

        return vCheck;
    }

    const restApiUpdateUser = () => {
        const body = {
            body: {
                PhoneNumber: phone,
                Address: address,
                City: city,
                District: district,
                TimeUpdated: `${day}/${month}/${year}`
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
        axios.put(`http://localhost:8888/customers/${idUser}`, body.body, body.headers)
            .then(() => {
                toast.success('Cập nhật thành công');
                restApiGetUserById()
                setOpenModalInfor(false)
            })
            .catch(error => {
                toast.error('Cập nhật thất bại!!!');
                console.log(error.response);
            })
    }

    const restApiGetUserById = () => {
        axios.get(`http://localhost:8888/customers/${idUser}`)
            .then((data) => {
                setName(data.data.customer.FullName)
                setEmail(data.data.customer.Email)
                setObjUser(data.data.customer)
                setPhone(data.data.customer.PhoneNumber)
                setAddress(data.data.customer.Address)
                setCity(data.data.customer.City)
                setDistrict(data.data.customer.District)
            })
            .catch((error) => {
                //console.log(error.response);
            })
    }

    const restApiCreateOrder = () => {
        const body = {
            body: {
                OrderDate : toDay,
                RequiredDate : toDay,
                TimeCreated: toDay,
                TimeUpdated: toDay,
                ShippedDate: shippedDay,
                Note: `Đơn hàng có ${sumAmount} sản phẩm`,
                Status: `Open`,
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
        axios.post(`http://localhost:8888/customers/${idUser}/orders`, body.body, body.headers)
            .then((data) => {
                /*  - Nếu userId đó chưa có đơn hàng nào thì khi tạo lúc này sẽ có 1 đơn hàng, 
                            ta sẽ dùng orderId đó thực hiện tiếp
                    - Nêu userId đó đã có đơn thì lấy mã đơn cuối là lúc rest API tạo ra*/
                let lastOrderId = data.data.order.Orders.length - 1
                if (data.data.order.Orders.length === 1) {
                    setOrderId(data.data.order.Orders[0])
                }
                else {
                    setOrderId(data.data.order.Orders[lastOrderId])
                }
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    const restApiDeleteOrderById = () => {
        axios.delete(`http://localhost:8888/customers/${idUser}/${orderId}/orders`)
            .then(() => {
                setOrderId(null)
            })
            .catch(error => {
                //console.log(error.response);
            })
    }

    const onClickFixInfor = () => {
        let valiData = validateData()
        // Nếu user chưa có số phone thì cập nhật 
        if (!objUser.PhoneNumber) {
            if (valiData) {
                if (arrSoDienThoai.includes(phone)) {
                    toast.error("Số điện thoại đã có");
                }
                else {
                    restApiUpdateUser()
                }
            }
        }
        else {
            // TH1 : Ko đổi số điện thoại và đổi địa chỉ
            if (objUser.PhoneNumber === phone && (objUser.District !== district || objUser.Address !== address)) {
                if (valiData) {
                    restApiUpdateUser()
                }
            }
            // TH2 : Đổi sđt và đổi địa chỉ..
            else if (objUser.PhoneNumber !== phone && (objUser.District !== district || objUser.Address !== address)) {
                if (valiData) {
                    if (arrSoDienThoai.includes(phone)) {
                        toast.error("Số điện thoại đã có");
                    }
                    else {
                        restApiUpdateUser()
                    }
                }
            }
            // TH3 : Chỉ Đổi Sđt
            else if (objUser.PhoneNumber !== phone && (objUser.District === district || objUser.Address === address)) {
                if (valiData) {
                    if (arrSoDienThoai.includes(phone)) {
                        toast.error("Số điện thoại đã có");
                    }
                    else {
                        restApiUpdateUser()
                    }
                }
            }
        }

    }

    const onClickConfirm = () => {
        let valiData = validateData()
        if (valiData) {
            restApiCreateOrder()
            setOpenModalOrder(true)
            setOpenModalInfor(false)

        }
    }

    const onClickBack = () => {
        setOpenModalInfor(false)
        restApiDeleteOrderById()
    }

    useEffect(() => {
        restApiCheckData()
        restApiGetUserById()
    }, [])

    return (
        <>
            <Modal isOpen={openModalInfor} toggle={() => setOpenModalInfor(false)} size='lg'>
                <ModalHeader>Xác nhận thông tin</ModalHeader>
                <ModalBody>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Row>
                                <Col xs='4'>
                                    <Label>Họ Tên</Label>
                                </Col>
                                <Col xs='8'>
                                    <TextField variant="standard" value={name} style={{ minWidth: 200 }} ></TextField >
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs='4'>
                                    <Label>Email</Label>
                                </Col>
                                <Col xs='8'>
                                    <TextField variant="standard" value={email} style={{ minWidth: 200 }} ></TextField >
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Row>
                                <Col xs='4'>
                                    <Label>Số điện thoại</Label>
                                </Col>
                                <Col xs='8'>
                                    <TextField variant="standard" value={phone} onChange={onChangePhone} style={{ minWidth: 200 }} ></TextField >
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs='4'>
                                    <Label>Địa chỉ</Label>
                                </Col>
                                <Col xs='8'>
                                    <TextField variant="standard" value={address} onChange={onChangeAddress} style={{ minWidth: 200 }} ></TextField >

                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Row>
                                <Col xs='4'>
                                    <Label>Thành phố</Label>
                                </Col>
                                <Col xs='8'>
                                    <FormControl variant="standard" >
                                        <InputLabel id='select-standard-label-city'>Chọn thành phố</InputLabel>
                                        <Select labelId="select-standard-label-city" onChange={onChangeCity} style={{ minWidth: 200 }} value={city}>
                                            <MenuItem value='tphcm'>TP. Hồ Chí Minh</MenuItem>
                                        </Select>

                                    </FormControl>
                                </Col>
                            </Row>
                        </Col>
                        <Col>
                            <Row>
                                <Col xs='4'>
                                    <Label>Quận</Label>
                                </Col>
                                <Col xs='8'>
                                    <FormControl variant="standard" >
                                        <InputLabel id='select-standard-label-district'>Chọn 1 quận</InputLabel>
                                        <Select
                                            labelId="select-standard-label-district" id='selectDistrict' disabled={disabled} onChange={onChangeDistrict} style={{ minWidth: 200 }} value={district}>
                                            <MenuItem value='quan1'>Quận 1</MenuItem>
                                            <MenuItem value='quan2'>Quận 2</MenuItem>
                                            <MenuItem value='quan3'>Quận 3</MenuItem>
                                            <MenuItem value='quan4'>Quận 4</MenuItem>
                                            <MenuItem value='quan5'>Quận 5</MenuItem>
                                            <MenuItem value='quan6'>Quận 6</MenuItem>
                                            <MenuItem value='quan7'>Quận 7</MenuItem>
                                            <MenuItem value='quan8'>Quận 8</MenuItem>
                                            <MenuItem value='quan9'>Quận 9</MenuItem>
                                            <MenuItem value='quan10'>Quận 10</MenuItem>
                                            <MenuItem value='quan11'>Quận 11</MenuItem>
                                            <MenuItem value='quan12'>Quận 12</MenuItem>
                                            <MenuItem value='quanBinhThanh'>Quận Bình Thạnh</MenuItem>
                                            <MenuItem value='quanBinhTan'>Quận Bình Tân</MenuItem>
                                            <MenuItem value='quanTanPhu'>Quận Tân Phú</MenuItem>
                                            <MenuItem value='quanGoVap'>Quận Gò Vấp</MenuItem>
                                            <MenuItem value='quanThuDuc'>Quận Thủ Đức</MenuItem>
                                            <MenuItem value='quanPhuNhuan'>Quận Phú Nhuận</MenuItem>
                                            <MenuItem value='huyenCuChi'>Huyện Củ Chi</MenuItem>
                                            <MenuItem value='huyenHocMon'>Huyện Hóc Môn</MenuItem>
                                            <MenuItem value='huyenBinhChanh'>Huyện Bình Chánh</MenuItem>
                                            <MenuItem value='huyenNhaBe'>Huyện Nhà Bè</MenuItem>
                                            <MenuItem value='huyenCanGio'>Huyện Cần Giờ</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                    <Row className='mt-2 p-2'>
                        <Col>
                            <Button variant="contained" color='success' style={{ width: 150 }} onClick={onClickFixInfor}>Sửa thông tin</Button>
                        </Col>
                    </Row>
                </ModalBody>
                <ModalFooter>
                    <Row className='mt-2 p-2'>
                        <Col>
                            {
                                objUser.PhoneNumber && objUser.Address && objUser.City && objUser.District?
                                    <Button variant="contained" style={{ width: 100 }} onClick={onClickConfirm} >Đồng ý</Button>
                                    :
                                    <Button variant="contained" style={{ width: 100 }} disabled={true} >Đồng ý</Button>
                            }
                        </Col>
                        <Col>
                            <Button variant="contained" style={{ width: 100 }} onClick={onClickBack}>Quay lại</Button>
                        </Col>
                    </Row>
                </ModalFooter>
            </Modal>
            <ModalConfirmOrder
                openModalOrder={openModalOrder}
                setOpenModalOrder={setOpenModalOrder}
                setOpenModalInfor={setOpenModalInfor}
                setOrderId={setOrderId}
                idUser={idUser}
                orderId={orderId}
                aRRCart={aRRCart}
                sumAmount={sumAmount}
                setArrCart={setArrCart}
                setCartLength={setCartLength}
                sumPrice={sumPrice} />
            <ToastContainer />
        </>
    )
}
export default ModalInfor