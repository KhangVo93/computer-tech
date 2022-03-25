import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
import { useEffect, useState } from 'react'
function BreadcrumbProductDetail({ arr }) {

    const [typeProduct, setTypeProduct] = useState('')
    useEffect(() => {
        switch (arr.Type) {
            case 'monitor': setTypeProduct('Màn hình'); break;
            case 'mouse': setTypeProduct('Chuột máy tính'); break;
            case 'vga': setTypeProduct('Card màn hình rời'); break;
            case 'ssd': setTypeProduct('Ổ cứng'); break;
            case 'keyboard': setTypeProduct('Bàn phím'); break;
            case 'headphone': setTypeProduct('Tai nghe'); break;
            case 'case': setTypeProduct('Case máy tính'); break;
            case 'mainboard': setTypeProduct('Mainboard'); break;
        }
    }, [arr])
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/products'>Danh mục sản phẩm</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to={`/productByType/${arr.Type}`}>{typeProduct}</Link></BreadcrumbItem>
                <BreadcrumbItem>{arr.Name}</BreadcrumbItem>
            </Breadcrumb>
        </>
    )
}
export default BreadcrumbProductDetail