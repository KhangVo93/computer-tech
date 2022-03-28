import { Collapse } from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { Col, Row, Button, Breadcrumb } from "reactstrap";
import ProductConnection from "./ProductConnection";
import ProductDescription from "./ProductDescription";
import ProductInformation from "./ProductInformation";
import CommentProduct from "./CommentProduct";
import BreadcrumbProductDetail from './BreadcrumbProductDetail'
import axios from "axios";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
function ProductDetailComponent({ objResult, idUser, setCartLength, cartLength, aRRCart, setArrCart }) {
    // Lấy id sản phẩm trên url
    const { _id } = useParams();

    // Tạo mảng chứa sản phẩm khi rest api
    const [aRR, setARR] = useState([])

    // Mảng chứa các sản phẩm cùng loại
    const [aRRByType, setArrByType] = useState([])

    const [cmt, setCmt] = useState('')

    const [aRRComment, setArrComment] = useState([])

    // Hàm rest api lấy sản phẩm cùng loại
    const getDataByType = async (paramType) => {
        axios.get(`https://computer-tech-be.herokuapp.com/products/type/${paramType}`)
            .then((data) => {
                setArrByType(data.data.product)
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    // Hàm rest api lấy data
    const getDataById = async () => {
        axios.get(`https://computer-tech-be.herokuapp.com/products/${_id}`)
            .then((data) => {
                setARR(data.data.product)
                getDataByType(data.data.product.Type)
            })
            .catch((error) => {
                console.log(error.response);
            })
    }

    // Khi render đầu tiên, rest api lấy data, đặt hàm if nếu có dữ liệu thì rest api lấy sản phẩm cùng loại
    useEffect(() => {
        getDataById()
        restApiGetCommentProduct()

        if (aRR.length != 0) {
            getDataByType(aRR.Type)
        }
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }, [_id])

    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        });
    }, []);

    // This function will scroll the window to the top 
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    };

    const [checkCollapse, setChecked] = useState(false)

    const onClickBtnOpenCollapse = () => {
        setChecked(true)
        document.getElementById('btnCloseCollapse').style.display = 'block'
        document.getElementById('btnOpenCollapse').style.display = 'none'
    }

    const onClickBtnCloseCollapse = () => {
        setChecked(false)
        window.scrollTo({
            top: 500,
            behavior: "smooth"
        })
        document.getElementById('btnCloseCollapse').style.display = 'none'
        document.getElementById('btnOpenCollapse').style.display = 'block'
    }

    const restApiCreateCommentProduct = () => {
        const body = {
            body: {
                text: cmt,
                nameCustomer: objResult.displayName || objResult.FullName
            },
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        }
        axios.post(`https://computer-tech-be.herokuapp.com/products/${_id}/${idUser}/createComment`, body.body, body.headers)
            .then((data) => {
                restApiGetCommentProduct()
            })
            .catch(error => {
                console.log(error.response);
            })
    }

    const restApiGetCommentProduct = () => {
        axios.get(`https://computer-tech-be.herokuapp.com/products/${_id}/getComment`)
            .then((data) => {
                setArrComment(data.data.Comments)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    return (
        <>
            <Row className="mt-2 p-2">
                <BreadcrumbProductDetail arr={aRR} />
            </Row>
            <Row className="m-2 p-2">
                <ProductInformation setArrCart={setArrCart} arrDetailProduct={aRR} aRRCart={aRRCart} setCartLength={setCartLength} cartLength={cartLength} idUser={idUser} idProduct={_id} />
            </Row>
            <hr />
            <Row className="m-4 p-4">
                <Collapse in={checkCollapse} collapsedSize={750}>
                    <ProductDescription arrDetailProduct={aRR} />
                </Collapse>
            </Row>
            <Row className="m-2 p-2">
                <Col xs='5'></Col>
                <Col className="text-center" xs='2'>
                    <Button className='btn-dark' id='btnOpenCollapse' onClick={onClickBtnOpenCollapse} style={{ maxWidth: 150 }}>
                        <ArrowDownwardIcon />Xem thêm
                    </Button>
                    <Button className='btn-dark' id='btnCloseCollapse' onClick={onClickBtnCloseCollapse} style={{ maxWidth: 150, display: 'none' }}>
                        <ArrowUpwardIcon /> Thu gọn
                    </Button>
                </Col>
                <Col xs='5'></Col>
            </Row>
            <Row className="m-4 p-4">
                <Col><CommentProduct cmt={cmt} setCmt={setCmt} restApiGetCommentProduct={restApiGetCommentProduct} aRRComment={aRRComment} restApiCreateCommentProduct={restApiCreateCommentProduct} /></Col>
            </Row>
            <Row className="m-4 p-4">
                <ProductConnection arrByType={aRRByType} />
            </Row>
            {showButton && (
                <button onClick={scrollToTop} className="back-to-top">
                    &#8679;
                </button>
            )}
        </>
    )
}
export default ProductDetailComponent