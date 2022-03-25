
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import { Carousel } from 'react-responsive-carousel';
import { Col, Row } from "reactstrap";
import { Link } from "react-router-dom";
function CarouselComponent({ dataArr }) {
    return (
        <>
            <Carousel
                autoPlay={true}
                showThumbs={false}
                showArrows={false}
                infiniteLoop={true}
            >
                {dataArr.map((element, index) => {
                    return (
                        <Link to={`/detailProduct/${element._id}`} key={index} style={{ textDecoration: 'none', color: 'black' }}>
                            <Row>
                                <Col>
                                    <Row className="mt-2 p-2">
                                        <h1> {element.Name}</h1>
                                    </Row>
                                    <Row className="mt-2 p-2">
                                        <h6>Giá niêm yết: <del>{element.BuyPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ</del></h6>
                                    </Row>
                                    <Row className="mt-2 p-2">
                                        <h2 style={{ color: 'red' }}>Giá giảm: {element.PromotionPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} VNĐ</h2>
                                    </Row>
                                </Col>
                                <Col>
                                    <img src={element.ImageUrl} style={{ width: 400 }} alt={element._id} />

                                </Col>
                            </Row>
                        </Link>
                    )
                })}
            </Carousel>
        </>

    );
}
export default CarouselComponent