import { Row, Label, Col, Input } from "reactstrap"
import { Card, CardMedia, Typography, CardContent, Grid, Tooltip } from '@mui/material'
import { Link } from 'react-router-dom'
const TypeProductComponent = () => {
    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "30px",
        slidesToShow: 3,
        speed: 500,
        rows: 2,
        slidesPerRow: 2
    };
    return (
        <>
            <Row>
                <Col style={{ textAlign: 'left' }}>
                    <Input value={"DANH MỤC SẢN PHẨM"} style={{ maxWidth: 200, textAlign: 'center', backgroundColor: 'red', color: 'white' }} readOnly />
                </Col>
            </Row>
            <Row className="mt-4 p-2">
                <Col className="mt-2 p-2 text-center" style={{ borderStyle: 'outset' }}>
                    <Link to={'/productByType/vga'} style={{ textDecoration: 'none', color: 'black' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/900/900304.png" alt='type' style={{ maxWidth: 90, maxHeight: 90 }} />
                        <h5>VGA</h5>
                    </Link>
                </Col>
                <Col className="mt-2 p-2 text-center" style={{ borderStyle: 'outset' }}>
                    <Link to={'/productByType/keyboard'} style={{ textDecoration: 'none', color: 'black' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/2867/2867522.png" alt='type' style={{ maxWidth: 90, maxHeight: 90 }} />
                        <h5>Bàn phím</h5>
                    </Link>
                </Col>
                <Col className="mt-2 p-2 text-center" style={{ borderStyle: 'outset' }}>
                    <Link to={'/productByType/mouse'} style={{ textDecoration: 'none', color: 'black' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/7181/7181156.png" alt='type' style={{ maxWidth: 90, maxHeight: 90 }} />
                        <h5>Chuột</h5>
                    </Link>
                </Col>
                <Col className="mt-2 p-2 text-center" style={{ borderStyle: 'outset' }}>
                    <Link to={'/productByType/monitor'} style={{ textDecoration: 'none', color: 'black' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/1055/1055679.png" alt='type' style={{ maxWidth: 90, maxHeight: 90 }} />
                        <h5>Màn hình</h5>
                    </Link>
                </Col>
                <Col className="mt-2 p-2 text-center" style={{ borderStyle: 'outset' }}>
                    <Link to={'/productByType/headphone'} style={{ textDecoration: 'none', color: 'black' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/3791/3791461.png" alt='type' style={{ maxWidth: 90, maxHeight: 90 }} />
                        <h5>Tai nghe</h5>
                    </Link>
                </Col>
                <Col className="mt-2 p-2 text-center" style={{ borderStyle: 'outset' }}>
                    <Link to={'/productByType/ssd'} style={{ textDecoration: 'none', color: 'black' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/2333/2333007.png" alt='type' style={{ maxWidth: 90, maxHeight: 90 }} />
                        <h5>SSD</h5>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-2 p-2">
                <Col className="mt-2 p-2 text-center" style={{ borderStyle: 'outset' }}>
                    <Link to={'/productByType/case'} style={{ textDecoration: 'none', color: 'black' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/1871/1871171.png" alt='type' style={{ maxWidth: 90, maxHeight: 90 }} />
                        <h5>Case</h5>
                    </Link>
                </Col>
                <Col className="mt-2 p-2 text-center" style={{ borderStyle: 'outset' }}>
                    <Link to={'/productByType/mainboard'} style={{ textDecoration: 'none', color: 'black' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/2287/2287974.png" alt='type' style={{ maxWidth: 90, maxHeight: 90 }} />
                        <h5>Bộ vi xử lý</h5>
                    </Link>
                </Col>
                <Col className="mt-2 p-2 text-center" style={{ borderStyle: 'outset' }}>
                    <Link to={'/productByType/ram'} style={{ textDecoration: 'none', color: 'black' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/908/908522.png" alt='type' style={{ maxWidth: 90, maxHeight: 90 }} />
                        <h5>Ram</h5>
                    </Link>
                </Col>
                <Col className="mt-2 p-2 text-center" style={{ borderStyle: 'outset' }}>
                    <Link to={'/productByType/speaker'} style={{ textDecoration: 'none', color: 'black' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/860/860367.png" alt='type' style={{ maxWidth: 90, maxHeight: 90 }} />
                        <h5>Loa</h5>
                    </Link>
                </Col>
                <Col className="mt-2 p-2 text-center" style={{ borderStyle: 'outset' }}>
                    <Link to={'/productByType/laptop'} style={{ textDecoration: 'none', color: 'black' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/610/610021.png" alt='type' style={{ maxWidth: 90, maxHeight: 90 }} />
                        <h5>Laptop</h5>
                    </Link>
                </Col>
                <Col className="mt-2 p-2 text-center" style={{ borderStyle: 'outset' }}>
                    <Link to={'/productByType/table'} style={{ textDecoration: 'none', color: 'black' }}>
                        <img src="https://cdn-icons-png.flaticon.com/512/717/717834.png" alt='type' style={{ maxWidth: 90, maxHeight: 90 }} />
                        <h5>Bàn/ Ghế Gaming</h5>
                    </Link>
                </Col>
            </Row>
        </>
    )
}

export default TypeProductComponent