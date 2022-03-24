import { Col, Row } from "reactstrap";
import Info1FooterComponent from "./Info1FooterComponent";
import Info2FooterComponent from "./Info2FooterComponent";
import Info3FooterComponent from "./Info3FooterComponent";
import PolicyComponent from "./PolicyComponent";
import SocialFooterComponent from "./SocialFooterComponent";
function FooterComponent() {
    return (
        <>
            <Row style={{ marginTop: 100 }} className='text-center p-4 bg-primary text-light' >
                <Col>
                    <Row className="p-2">
                        <PolicyComponent />
                    </Row>
                    <hr />
                    <Row className="p-2 mt-2">
                        <Col xs='4' className="policy">
                            <Info1FooterComponent />
                        </Col>
                        <Col xs='4' className="policy">
                            <Info2FooterComponent />
                        </Col>
                        <Col xs='4'>
                            <Info3FooterComponent />
                        </Col>
                    </Row>
                    <Row className="p-2 mt-2">
                        <SocialFooterComponent />
                    </Row>
                </Col>
            </Row>
        </>
    );
}
export default FooterComponent