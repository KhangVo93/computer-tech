import { Link } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem } from "reactstrap"

function BreadcrumbComponent({ arr }) {
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem><Link to='/'>Home</Link></BreadcrumbItem>
                <BreadcrumbItem><Link to='/products'>Danh mục sản phẩm</Link></BreadcrumbItem>
            </Breadcrumb>
        </>
    )
}
export default BreadcrumbComponent