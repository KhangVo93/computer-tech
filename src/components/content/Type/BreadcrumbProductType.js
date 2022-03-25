import { Link } from 'react-router-dom'
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
const BreadcrumbProductType = ({ typeProduct }) => {
    return (
        <>

            <Breadcrumb>
                <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/products'>Danh mục sản phẩm</Link></BreadcrumbItem>
                <BreadcrumbItem>{typeProduct}</BreadcrumbItem>
            </Breadcrumb>
        </>
    )
}

export default BreadcrumbProductType