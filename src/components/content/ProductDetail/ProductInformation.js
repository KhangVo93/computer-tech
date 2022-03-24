import { Button, Col, Input, Label, Row } from "reactstrap"
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { Link } from 'react-router-dom'
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
function ProductInformation({
    arrDetailProduct,
    idUser,
    idProduct,
    setCartLength,
    cartLength,
    aRRCart,
    setArrCart, }) {
    // Tạo mảng chứa hình ảnh truyền qua
    let arr = arrDetailProduct.ImageArr

    const [count, setCount] = useState(1)
    const setCountDecrease = () => {
        if (count === 1) {
            setCount(1)
        }
        else {
            setCount(count - 1)
        }
    }


    const restApiForCreateCart = () => {
        const body = {
            body: {
                productId: idProduct,
                amount: count,
                price: arrDetailProduct.PromotionPrice,
                name: arrDetailProduct.Name,
                imgAvatar: arrDetailProduct.ImageUrl,
                isChecked: true
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
        axios.post(`https://computer-tech-be.herokuapp.com/customers/${idUser}/${idProduct}/cart`, body.body, body.headers)
            .then(() => {
                //toast.success('Thêm vào giỏ thành công');
                setCartLength(cartLength + 1)
                getCartByIdUser()
                //window.location.assign(`/detailProduct/${idProduct}`)
            })
            .catch(error => {
                toast.error('Thêm vào giỏ thất bại!!!');
                console.log(error.response);
            })
    }

    const getCartByIdUser = async () => {
        axios.get(`https://computer-tech-be.herokuapp.com/customers/${idUser}/cart`)
            .then((data) => {
                setArrCart(data.data.Carts)
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    const restApiForUpdateCart = (paramCart) => {
        const body = {
            body: {
                amount: count,
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
        axios.put(`https://computer-tech-be.herokuapp.com/cart/${paramCart._id}`, body.body, body.headers)
            .then(() => {
                getCartByIdUser()
                //toast.success('cập nhật thành công');
                //window.location.assign(`/detailProduct/${idProduct}`)
            })
            .catch(error => {
                toast.error('cập nhật thất bại!!!');
                console.log(error.response);
            })
    }

    var checkIdProduct = false

    const onClickAddCartByCustomerId = () => {

        for (let i in aRRCart) {
            if (aRRCart[i].productId === idProduct) {
                checkIdProduct = true
                restApiForUpdateCart(aRRCart[i])
            }
        }
        if (checkIdProduct == false) {
            restApiForCreateCart()
        }
    }

    return (
        <>
            <div>
                <Row className="mt-4 p-4">
                    <Col xs='4'>
                        <Carousel autoPlay={true} showThumbs={true} showArrows={true} infiniteLoop={true}>
                            <div className="zoom">
                                <img src={arrDetailProduct.ImageUrl} alt='imageProduct' />
                            </div>
                            {   // Nếu mảng có dữ liệu thì map ra các hình ảnh của sản phẩm
                                arr ? arr.map((item, index) => {
                                    return (
                                        <div key={index} className="zoom">
                                            <img src={item} alt='imageProduct' />
                                        </div>
                                    )
                                })
                                    // Nếu không thì cho mảng trống 
                                    : <div>{arr = []}</div>
                            }
                        </Carousel>
                    </Col>
                    <Col xs='8'>
                        <Row className="mt-2">
                            <h1>{arrDetailProduct.Name}</h1>
                        </Row>
                        <hr />
                        <Row className="mt-2">
                            Giá niêm yết : <h3><del>{arrDetailProduct.BuyPrice ? arrDetailProduct.BuyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : arrDetailProduct.BuyPrice} VNĐ</del></h3>
                        </Row>
                        <Row className="mt-2">
                            Giá giảm: <h3><span className="promotion-price">{arrDetailProduct.PromotionPrice ? arrDetailProduct.PromotionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') : arrDetailProduct.PromotionPrice} VNĐ</span></h3>
                        </Row>
                        <Row className="mt-2 text-center">
                            <Button style={{ width: 42 }} onClick={() => setCount(count + 1)}>
                                <AddIcon />
                            </Button>
                            <Input value={count} className='text-center' style={{ width: 45 }} readOnly></Input>
                            <Button style={{ width: 42 }} onClick={setCountDecrease}>
                                <RemoveIcon />
                            </Button>
                        </Row>
                        <Row className="mt-2">

                            {
                                idUser ?
                                    <>
                                        {
                                            count < arrDetailProduct.Quantity ?
                                                <Button style={{ width: 150 }} id='btnButton1' className='btn-danger' onClick={onClickAddCartByCustomerId}>Thêm vào giỏ</Button>
                                                :
                                                <>
                                                <pre>(Hết hàng)</pre>
                                                <Button style={{ width: 150 }} id='btnButton1'  >Hết hàng</Button>
                                                </>

                                        }
                                    </>
                                    // <Link to={"/cart"} className="btn btn-danger" style={{ maxWidth: 150 }}>Thêm vào giỏ</Link>
                                    :
                                    <Link to={"/login"} className="btn btn-danger" style={{ width: 150 }}>Thêm vào giỏ</Link>
                            }
                        </Row>
                    </Col>
                </Row>
                <ToastContainer />
            </div>
        </>
    )
}
export default ProductInformation