import { useEffect, useState } from 'react'
import { Col, Form, FormGroup, Input, Label, Row, Button } from 'reactstrap'
import axios from 'axios';
import { FormControl, MenuItem, Select, TextField } from '@mui/material'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function SignUpComponent() {
    // Các trường input
    const [tenDangNhap, setTenDangNhap] = useState(null)
    const [matKhau, setMatKhau] = useState(null)
    const [hoTen, setHoTen] = useState(null)
    const [soDienThoai, setSoDienThoai] = useState(null)
    const [email, setEmail] = useState(null)
    const [diaChi, setDiaChi] = useState(null)
    const [city, setCity] = useState(null)
    const [district, setDistrict] = useState(null)

    // Mảng chứa dữ liệu trả về để kiểm tra có trùng dữ liệu trước khi đăng ký không
    const [arrTenDangNhap, setArrUserName] = useState([]);
    const [arrSoDienThoai, setArrSoDienThoai] = useState([])
    const [arrEmail, setArrEmail] = useState([])

    const [disabledDistrict, setDisableDistrict] = useState(true) 
    let d = new Date()
    let day = d.getDate();
    let month = d.getMonth() + 1;
    let year = d.getFullYear();

    const onChangeTenDangNhap = (event) => {
        setTenDangNhap(event.target.value)
    }

    const onChangeMatKhau = (event) => {
        setMatKhau(event.target.value)
    }

    const onChangeHoTen = (event) => {
        setHoTen(event.target.value)
    }

    const onChangeSoDienThoai = (event) => {
        setSoDienThoai(event.target.value)
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value)
    }

    const onChangeDiaChi = (event) => {
        setDiaChi(event.target.value)
    }

    const onChangeCity = (event) => {
        setCity(event.target.value)
        setDisableDistrict(false)
    }

    const onChangeDistrict = (event) => {
        setDistrict(event.target.value)
    }

    const validateData = () => {
        if (!tenDangNhap) {
            toast.error('Bạn chưa nhập tên đăng nhập')
            return false
        }
        if (arrTenDangNhap.includes(tenDangNhap)) {
            toast.error('Tên đăng nhập đã có');
            return false
        }
        if (tenDangNhap.length < 8) {
            toast.error('Tên đăng nhập phải lớn hơn 8 ký tự')
            return false
        }
        if (!matKhau) {
            toast.error("Bạn chưa nhập mật khẩu")
            return false
        }
        if (matKhau.length < 8) {
            toast.error('Mật khẩu phải lớn hơn 8 ký tự')
            return false
        }
        if (!hoTen) {
            toast.error("Bạn chưa nhập họ tên")
            return false
        }
        if (!isNaN(hoTen)) {
            toast.error('Tên không được chứa số');
            return false;
        }
        if (validatePhoneNumber(soDienThoai) == false) {
            toast.error('Bạn phải nhập số điện thoại');
            return false;
        }
        if (arrSoDienThoai.includes(soDienThoai)) {
            toast.error("Số điện thoại đã có");
            return false
        }
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
        if (!diaChi) {
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

    const restApiCreateUser = () => {
        const body = {
            body: {
                FullName: hoTen,
                PhoneNumber: soDienThoai,
                Email: email,
                Address: diaChi,
                Username: tenDangNhap,
                Password: matKhau,
                District: district,
                City: city,
                TimeCreated: `${day}/${month}/${year}`,
                TimeUpdated: `${day}/${month}/${year}`
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
        axios.post('http://localhost:8888/customers', body.body, body.headers)
            .then(() => {
                toast.success('Đăng ký thành công');
                setTimeout(() => window.location.reload(), 3500)
            })
            .catch(error => {
                toast.error('Đăng ký thất bại thất bại!!!');
                console.log(error.response);
            })
    }

    const restApiCheckData = () => {
        axios.get(`http://localhost:8888/customers/checkdata`)
            .then((data) => {
                for (let i in data.data.customer) {
                    let tenDangNhap = data.data.customer[i].Username
                    let soDienThoai = data.data.customer[i].PhoneNumber
                    let email = data.data.customer[i].Email

                    arrEmail.push(email)
                    arrTenDangNhap.push(tenDangNhap)
                    arrSoDienThoai.push(soDienThoai)
                }
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    const onClickSignup = () => {
        let valiData = validateData()
        if (valiData) {
            restApiCreateUser()
        }
    }

    // Khi render lần đầu thì restApi để check
    useEffect(() => {
        restApiCheckData();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [])
    return (
        <>
            <div style={{ textAlign: 'center' }}>

                <Form className="form-signup">
                    <FormGroup>
                        <h2>Đăng ký người dùng</h2>
                    </FormGroup>
                    <hr />
                    <FormGroup>
                        <Row>
                            <Col xs='4' style={{ textAlign: 'left' }}>
                                <Label>Tên đăng nhập<span style={{ color: 'red' }}> (*)</span></Label>
                            </Col>
                            <Col xs='8'>
                                <TextField variant='standard' inputProps={{ maxLength: 12 }} onChange={onChangeTenDangNhap} ></TextField>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xs='4' style={{ textAlign: 'left' }}>
                                <Label>Mật khẩu<span style={{ color: 'red' }}> (*)</span></Label>
                            </Col>
                            <Col xs='8'>
                                <TextField variant='standard' inputProps={{ maxLength: 12 }} onChange={onChangeMatKhau} ></TextField>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xs='4' style={{ textAlign: 'left' }}>
                                <Label>Họ Tên<span style={{ color: 'red' }}> (*)</span></Label>
                            </Col>
                            <Col xs='8'>
                                <TextField variant='standard' onChange={onChangeHoTen} ></TextField>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xs='4' style={{ textAlign: 'left' }}>
                                <Label>Số điện thoại<span style={{ color: 'red' }}> (*)</span></Label>
                            </Col>
                            <Col xs='8'>
                                <TextField variant='standard' onChange={onChangeSoDienThoai} ></TextField>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xs='4' style={{ textAlign: 'left' }}>
                                <Label>Email</Label>
                            </Col>
                            <Col xs='8'>
                                <TextField variant='standard' onChange={onChangeEmail} ></TextField>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xs='4' style={{ textAlign: 'left' }}>
                                <Label>Địa chỉ<span style={{ color: 'red' }}> (*)</span></Label>
                            </Col>
                            <Col xs='8'>
                                <TextField variant='standard' onChange={onChangeDiaChi} ></TextField>
                            </Col>
                        </Row>
                    </FormGroup>

                    <FormGroup>
                        <Row>
                            <Col xs='4' style={{ textAlign: 'left' }}>
                                <Label>Thành phố <span style={{ color: 'red' }}> (*)</span></Label>
                            </Col>
                            <Col xs='8'>
                                <FormControl >
                                    <Select labelId="select-standard-label-city" variant='standard' style={{ width: 170 }} onChange={onChangeCity} value={city}>
                                        <MenuItem value='tphcm'>TP. Hồ Chí Minh</MenuItem>
                                    </Select>
                                </FormControl>
                            </Col>
                        </Row>
                    </FormGroup>
                    <FormGroup>
                        <Row>
                            <Col xs='4' style={{ textAlign: 'left' }}>
                                <Label>Quận <span style={{ color: 'red' }}> (*)</span></Label>
                            </Col>
                            <Col xs='8'>
                                <FormControl >
                                    <Select variant='standard'
                                        labelId="select-standard-label-district" 
                                        style={{ width: 170 }}
                                        onChange={onChangeDistrict} 
                                        value={district}
                                        disabled={disabledDistrict}
                                        >
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
                    <FormGroup style={{ textAlign: 'right' }}>
                        <Button className='btn-success' onClick={onClickSignup}>Đăng ký</Button>
                    </FormGroup>
                </Form>
            </div>
            <ToastContainer />
        </>
    )
}
export default SignUpComponent