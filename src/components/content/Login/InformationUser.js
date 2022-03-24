import { Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { useParams } from "react-router-dom"
import axios from 'axios'
import { useEffect, useState } from 'react'
import { FormControl, MenuItem, Select, Button } from '@mui/material'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function InformationUser() {

    const { userId } = useParams();
    const [objUser, setObjUser] = useState({})

    const [email, setEmail] = useState(null)
    const [city, setCity] = useState(null)
    const [district, setDistrict] = useState(null)
    const [phone, setPhone] = useState()
    const [address, setAddress] = useState('')

    // Mảng chứa dữ liệu trả về để kiểm tra có trùng dữ liệu trước khi đăng ký không
    const [arrSoDienThoai, setArrSoDienThoai] = useState([])
    const [arrEmail, setArrEmail] = useState([])

    let d = new Date()
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    const restApiGetUserById = () => {
        axios.get(`http://localhost:8888/customers/${userId}`)
            .then((data) => {
                setObjUser(data.data.customer)
                setEmail(data.data.customer.Email)
                setPhone(data.data.customer.PhoneNumber)
                setAddress(data.data.customer.Address)
                setCity(data.data.customer.City)
                setDistrict(data.data.customer.District)
            })
            .catch((err) => {
                console.log(err.response)
            })
    }

    const onChangeCity = (event) => {
        setCity(event.target.value)
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

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const validateData = () => {
        if (validatePhoneNumber(phone) == false) {
            toast.error('Bạn phải nhập số điện thoại');
            return false;
        }
        // Dành cho login userName
        if (objUser.Username !== "") {
            if (email) {
                if (checkEmail(email) == false) {
                    toast.error('Email sai định dạng');
                    return false;
                }
                else {
                    if (arrEmail.includes(email)) {
                        toast.error('Email đã có')
                        return false
                    }
                }
            }
        }
        if (address === "") {
            toast.error("Bạn chưa nhập địa chỉ")
            return false
        }
        if (!city) {
            toast.error("Bạn chưa chọn thành phố")
            return false
        }
        if (!district) {
            toast.error("Bạn chưa chọn quận")
            return false
        }
        return true
    }

    const checkEmail = (paramEmail) => {
        const vRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return vRE.test(String(paramEmail).toLowerCase());
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
                Email: email,
                TimeUpdated: `${day}/${month}/${year}`
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
        axios.put(`http://localhost:8888/customers/${userId}`, body.body, body.headers)
            .then(() => {
                toast.success('Cập nhật thành công');
                restApiGetUserById()
            })
            .catch(error => {
                toast.error('Cập nhật thất bại!!!');
                console.log(error.response);
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
            if (objUser.PhoneNumber === phone && (objUser.District !== district || objUser.Address !== address || objUser.Email !== email)) {
                if (valiData) {
                    restApiUpdateUser()
                }
            }
            // TH2 : Đổi sđt và đổi địa chỉ..
            else if (objUser.PhoneNumber !== phone && (objUser.District !== district || objUser.Address !== address || objUser.Email !== email)) {
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
            else if (objUser.PhoneNumber !== phone && (objUser.District === district || objUser.Address === address || objUser.Email === email)) {
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

    const restApiCheckData = () => {
        axios.get(`http://localhost:8888/customers/`)
            .then((data) => {
                for (let i in data.data.customer) {
                    let soDienThoai = data.data.customer[i].PhoneNumber
                    let email = data.data.customer[i].Email
                    arrSoDienThoai.push(soDienThoai)
                    arrEmail.push(email)

                }
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    const setDisable = () => {
        let switchDisable = false
        if (objUser.Username === "") {
            switchDisable = true
        }
        else {
            switchDisable = false
        }
        return switchDisable
    }
    useEffect(() => {
        restApiGetUserById()
        restApiCheckData()
    }, [])
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <Form className="form-signup">
                    <FormGroup>
                        <h2>Thông tin của bạn</h2>
                    </FormGroup>
                    <hr style={{ width: 300 }} />
                    <FormGroup>
                        <Row>
                            <Col xs='4' style={{ textAlign: 'left' }}>
                                <Label>Họ Tên</Label>
                            </Col>
                            <Col xs='8'>
                                <Input type='text' value={objUser.FullName} readOnly></Input>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xs='4' style={{ textAlign: 'left' }}>
                                <Label>Số điện thoại</Label>
                            </Col>
                            <Col xs='8'>
                                <Input type='text' onChange={onChangePhone} value={phone}></Input>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xs='4' style={{ textAlign: 'left' }}>
                                <Label>Email</Label>
                            </Col>
                            <Col xs='8'>
                                <Input type='text' value={email} disabled={setDisable()} onChange={onChangeEmail}></Input>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xs='4' style={{ textAlign: 'left' }}>
                                <Label>Địa chỉ</Label>
                            </Col>
                            <Col xs='8'>
                                <Input type='textarea' onChange={onChangeAddress} value={address}></Input>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xs='4' style={{ textAlign: 'left' }}>
                                <Label>Thành phố</Label>
                            </Col>
                            <Col xs='8'>
                                <FormControl >
                                    <Select labelId="select-standard-label-city" onChange={onChangeCity} style={{ width: 200 }} value={city}>
                                        <MenuItem value='tphcm'>TP. Hồ Chí Minh</MenuItem>
                                    </Select>
                                </FormControl>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xs='4' style={{ textAlign: 'left' }}>
                                <Label>Quận</Label>
                            </Col>
                            <Col xs='8'>
                                <FormControl >
                                    <Select
                                        labelId="select-standard-label-district" onChange={onChangeDistrict} style={{ width: 200 }} value={district}>
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
                    </FormGroup>
                    <FormGroup>
                        <Row className='mt-2 p-2'>
                            <Button variant='contained' onClick={onClickFixInfor}>Cập nhật</Button>
                        </Row>
                    </FormGroup>
                </Form>
                <ToastContainer />
            </div>
        </>
    )
}
export default InformationUser