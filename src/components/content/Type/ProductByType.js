import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom'
import { Row } from "reactstrap"
import BreadcrumbProductType from "./BreadcrumbProductType"
import ProductListByType from "./ProductListByType"
import PaginationProductByType from "./PaginationProductByType"
import FilterProductByType from "./FilterProductByType"
const ProductByType = () => {

    const { type } = useParams();
    const [typeProduct, setTypeProduct] = useState('')
    const [aRRProductListByType, setArrProductListByType] = useState([])
    const [page, setPage] = useState(1)
    const [nopage, setNoPage] = useState(0)
    const [sortPrice, setSortPrice] = useState(null)

    const restApiGetProductByType = () => {
        axios.get(`https://computer-tech-be.herokuapp.com/products/type/${type}`)
            .then((data) => {
                setNoPage(Math.ceil(data.data.product.length / 9))
                setArrProductListByType(data.data.product.slice((page - 1) * 9, page * 9))
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    //  Hàm get data by Type có sắp xếp
    const restAptGetProductByTypeAndSort = (paramType, paramSort) => {
        axios.get(`https://computer-tech-be.herokuapp.com/products/type/${paramType}/${paramSort}`)
            .then((data) => {
                setNoPage(Math.ceil(data.data.product.length / 9))
                setArrProductListByType(data.data.product.slice((page - 1) * 9, page * 9))
            })
    }
    useEffect(() => {
        if (sortPrice == null) {
            restApiGetProductByType()
        }
        else {
            restAptGetProductByTypeAndSort(type, sortPrice)
        }

        switch (type) {
            case 'monitor': setTypeProduct('Màn hình'); break;
            case 'mouse': setTypeProduct('Chuột máy tính'); break;
            case 'vga': setTypeProduct('Card màn hình rời'); break;
            case 'ssd': setTypeProduct('Ổ cứng'); break;
            case 'keyboard': setTypeProduct('Bàn phím'); break;
            case 'headphone': setTypeProduct('Tai nghe'); break;
            case 'case': setTypeProduct('Case máy tính'); break;
            case 'mainboard': setTypeProduct('Mainboard'); break;
        }

        window.scrollTo({
            top: 0,
            behavior: 'smooth' // for smoothly scrolling
        });
    }, [type, page, sortPrice])
    return (
        <>
            <Row className="p-2 mt-2">
                <BreadcrumbProductType typeProduct={typeProduct} />
            </Row>
            <Row className="p-2 mt-2">
                <FilterProductByType sortPrice={sortPrice} setSortPrice={setSortPrice} restAptGetProductByTypeAndSort={restAptGetProductByTypeAndSort} type={type} />
            </Row>
            <Row className="mt-2 p-2">
                <ProductListByType aRRProductListByType={aRRProductListByType} />
            </Row>
            <Row>
                <PaginationProductByType setPage={setPage} nopage={nopage} page={page} />
            </Row>
        </>
    )
}
export default ProductByType