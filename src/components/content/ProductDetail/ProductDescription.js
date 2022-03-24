import { Row, Col, Button } from 'reactstrap'
function ProductDescription({ arrDetailProduct }) {
    let arrDescription = arrDetailProduct.Description
    let arrImage = arrDetailProduct.ImageArr
    return (
        <>
            <Row className='mt-2 p-2'>
                <Col>
                    <img src={arrDetailProduct.ImageUrl} className="style-img-detail" alt='imageProduct' />
                </Col>
            </Row>
            <Row className='mt-2 p-2'>
                <h2>Mô tả sản phẩm</h2>
            </Row>
            {
                arrDescription ? arrDescription.map((item, index) => {
                    return (
                        <Row className='mt-2 p-2' key={index}>
                            <h4>- {item}</h4>
                        </Row>
                    )
                }) : arrDescription = []
            }

            {
                arrImage ? arrImage.map((item, index) => {
                    return (
                        <Row className='mt-2 p-2' key={index}>
                            <Col>
                                <img src={item} className="style-img-detail" alt='imageProductDetail1' />
                            </Col>
                        </Row>
                    )
                }) : arrImage = []
            }
        </>
    )
}
export default ProductDescription