import { Link } from "react-router-dom";
import { Row } from "reactstrap";
function ViewAllComponent() {
    return (<>
        <div>
            <Row className="mt-2 p-4">
                <Link className="btn btn-dark" to='/products'>Xem thêm nhiều sản phẩm tại đây</Link>
            </Row>
        </div>
    </>);
}
export default ViewAllComponent